import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Reveal from "../../common/Reveal/Reveal.jsx";
import SecretCanvas from "./SecretCanvas.jsx";
import AiTerminal from "../AiTerminal/AiTerminal.jsx";
import "./AiPuzzle.css";

const NODES_ORDER = ["data", "process", "model", "output"];
const NODE_WIDTH = 170;
const NODE_HEIGHT = 70; // approx height

const pipelineStages = [
  { step: "// 01 INGEST", title: "Raw Ingestion", sub: "Kafka / Webhooks", id: "data" },
  { step: "// 02 EMBED", title: "Vector Embedding", sub: "Chunk & Tokenize", id: "process" },
  { step: "// 03 STORE", title: "Qdrant / PgVector", sub: "Cosine Indexing", id: "model" },
  { step: "// 04 SERVE", title: "API Production", sub: "Real-time Query", id: "output" }
];

export default function AiPuzzle() {
  const { t } = useTranslation();
  
  const [gameState, setGameState] = useState("playing");
  const [connections, setConnections] = useState([]);
  const [draggingFrom, setDraggingFrom] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [errorLine, setErrorLine] = useState(false);
  
  const containerRef = useRef(null);

  // Use percentages for positioning, but calculate exact port offsets
  const [nodes] = useState([
    { id: "data", x: 6, y: 18, type: "Data Source", icon: true },
    { id: "process", x: 44, y: 35, type: "Transform", icon: true },
    { id: "model", x: 14, y: 68, type: "Neural Net", icon: true },
    { id: "output", x: 68, y: 72, type: "Deployment", icon: true },
  ]);

  const handleMouseMove = (e) => {
    if (!draggingFrom || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseUp = () => {
    if (draggingFrom) {
      setDraggingFrom(null);
      setErrorLine(false);
    }
  };

  const startDrag = (e, nodeId) => {
    e.stopPropagation();
    if (gameState !== "playing") return;
    
    const expectedFrom = connections.length === 0 ? "data" : NODES_ORDER[connections.length];
    if (nodeId !== expectedFrom) return;

    setDraggingFrom(nodeId);
    
    if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        let clientX = e.clientX || (e.touches && e.touches[0].clientX);
        let clientY = e.clientY || (e.touches && e.touches[0].clientY);
        setMousePos({ x: clientX - rect.left, y: clientY - rect.top });
    }
  };

  const completeDrag = (e, targetId) => {
    e.stopPropagation();
    if (!draggingFrom || draggingFrom === targetId || gameState !== "playing") return;
    
    const expectedTo = NODES_ORDER[connections.length + 1];
    
    if (targetId === expectedTo) {
      const newConnections = [...connections, { from: draggingFrom, to: targetId }];
      setConnections(newConnections);
      setDraggingFrom(null);
      
      if (newConnections.length === NODES_ORDER.length - 1) {
        setTimeout(() => setGameState("terminal"), 600);
      }
    } else {
      setErrorLine(true);
      setTimeout(() => {
        setDraggingFrom(null);
        setErrorLine(false);
      }, 300);
    }
  };

  const runFullPipeline = () => {
    setConnections([
      { from: "data", to: "process" },
      { from: "process", to: "model" },
      { from: "model", to: "output" }
    ]);
    setTimeout(() => setGameState("terminal"), 600);
  };

  const resetPipeline = () => {
    setConnections([]);
    setGameState("playing");
    setTerminalLines([]);
  };

  const getPortPosition = (nodeId, type) => {
    const node = nodes.find(n => n.id === nodeId);
    if (!node || !containerRef.current) return { x: 0, y: 0 };
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    
    const nodeLeft = (node.x / 100) * width;
    const nodeTop = (node.y / 100) * height;
    
    if (type === "out") {
      return { x: nodeLeft + NODE_WIDTH, y: nodeTop + (NODE_HEIGHT / 2) };
    } else {
      return { x: nodeLeft, y: nodeTop + (NODE_HEIGHT / 2) };
    }
  };

  const createBezierPath = (p1, p2) => {
    const dx = Math.abs(p2.x - p1.x);
    const controlOffset = Math.max(dx * 0.5, 40);
    return `M ${p1.x} ${p1.y} C ${p1.x + controlOffset} ${p1.y}, ${p2.x - controlOffset} ${p2.y}, ${p2.x} ${p2.y}`;
  };

  const [terminalLines, setTerminalLines] = useState([]);
  
  useEffect(() => {
    if (gameState === "terminal") {
      const sequence = [
        t("aiPuzzle.terminal.connecting", { defaultValue: "[SYS_INIT] Connecting to neural pipeline cluster..." }),
        t("aiPuzzle.terminal.connected", { defaultValue: "[AUTH_OK] Nodes synchronized with 0ms latency" }),
        t("aiPuzzle.terminal.auth", { defaultValue: "[VECTOR_DB] Cosine distance index built successfully" }),
        t("aiPuzzle.terminal.granted", { defaultValue: "[INFERENCE] Neural model ready for queries" }),
        t("aiPuzzle.terminal.decrypting", { defaultValue: "[SUCCESS] Pipeline active. Opening developer console..." })
      ];
      
      let i = 0;
      const interval = setInterval(() => {
        if (i < sequence.length) {
          setTerminalLines(prev => [...prev, sequence[i]]);
          i++;
        } else {
          clearInterval(interval);
          setTimeout(() => setGameState("easterEgg"), 1000);
        }
      }, 700);
      return () => clearInterval(interval);
    }
  }, [gameState, t]);

  return (
    <section className="ai-puzzle-section" id="ai-puzzle">
      <div className="container">
        {/* Header matching screenshot */}
        <div className="pipeline-header-block">
          <Reveal variant="fade-up">
            <div className="tech-eyebrow">// DEEP TECH SHOWCASE</div>
            <h2 className="section-title">
              AUTONOMOUS DATA PIPELINE<span className="dot">.</span>
            </h2>
            <p className="pipeline-subtitle">
              SIMULATED NEURAL ORCHESTRATION: RAW DATA &rarr; REAL-TIME TRANSFORM &rarr; VECTOR DB &rarr; PRODUCTION DEPLOYMENT
            </p>
          </Reveal>
        </div>

        {/* 4 Pipeline Stage Cards Row */}
        <Reveal variant="fade-up" delay={80}>
          <div className="pipeline-stages-row">
            {pipelineStages.map((st, idx) => {
              const isNodeActive = connections.some(c => c.from === st.id || c.to === st.id);
              return (
                <div key={idx} className={`pipeline-stage-card ${isNodeActive ? 'active' : ''}`}>
                  <div className="stage-top-meta">
                    <span className="stage-step-code">{st.step}</span>
                    <span className="stage-pulse-dot"></span>
                  </div>
                  <h4 className="stage-title">{st.title}</h4>
                  <span className="stage-sub">{st.sub}</span>
                </div>
              );
            })}
          </div>
        </Reveal>

        {/* Interactive Neural Canvas */}
        <Reveal variant="fade-up" delay={120}>
          <div className="pipeline-interactive-wrap">
            <div className="pipeline-controls-bar">
              <span className="controls-label">
                <span className="status-indicator"></span> INTERACTIVE NEURAL ORCHESTRATOR
              </span>
              <div className="pipeline-actions-group">
                <button type="button" onClick={runFullPipeline} className="pipeline-btn-auto">
                  ⚡ EXECUTE PIPELINE
                </button>
                {connections.length > 0 && (
                  <button type="button" onClick={resetPipeline} className="pipeline-btn-reset">
                    RESET
                  </button>
                )}
              </div>
            </div>

            <div 
              className="ai-puzzle-container" 
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchMove={handleMouseMove}
              onTouchEnd={handleMouseUp}
            >
              {/* SVG Lines */}
              <svg className="puzzle-svg">
                <defs>
                  <linearGradient id="line-gradient-valid" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#e50914" />
                    <stop offset="100%" stopColor="#ff333f" />
                  </linearGradient>
                </defs>
                
                {connections.map((conn, idx) => {
                  const from = getPortPosition(conn.from, "out");
                  const to = getPortPosition(conn.to, "in");
                  return (
                    <path 
                      key={idx} 
                      d={createBezierPath(from, to)} 
                      className="puzzle-connection valid" 
                    />
                  );
                })}
                
                {draggingFrom && (
                  <path 
                    d={createBezierPath(getPortPosition(draggingFrom, "out"), mousePos)} 
                    className={`puzzle-connection ${errorLine ? "error" : ""}`} 
                  />
                )}
              </svg>

              {/* Nodes */}
              {nodes.map(node => {
                const isConnectedOut = connections.some(c => c.from === node.id);
                const isConnectedIn = connections.some(c => c.to === node.id);
                const isFullyConnected = isConnectedOut || (connections.length === NODES_ORDER.length - 1 && node.id === NODES_ORDER[NODES_ORDER.length - 1]);
                
                return (
                  <div
                    key={node.id}
                    className={`puzzle-node ${isFullyConnected ? "connected" : ""}`}
                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                  >
                    <div className="node-header">
                      <div className="node-icon"></div>
                      {node.type}
                    </div>
                    <div className="node-body">
                      {t(`aiPuzzle.nodes.${node.id}`, { defaultValue: node.type })}
                    </div>

                    {/* Input Port */}
                    {node.id !== "data" && (
                      <div 
                        className={`node-port port-in ${isConnectedIn ? "port-active" : ""}`}
                        onMouseUp={(e) => completeDrag(e, node.id)}
                        onTouchEnd={(e) => completeDrag(e, node.id)}
                        title="Connect here"
                      />
                    )}

                    {/* Output Port */}
                    {node.id !== "output" && (
                      <div 
                        className={`node-port port-out ${isConnectedOut ? "port-active" : ""}`}
                        onMouseDown={(e) => startDrag(e, node.id)}
                        onTouchStart={(e) => startDrag(e, node.id)}
                        title="Drag to connect next stage"
                      />
                    )}
                  </div>
                );
              })}

              {/* Terminal Overlay */}
              {gameState === "terminal" && (
                <div className="terminal-overlay">
                  {terminalLines.map((line, idx) => (
                    <div key={idx} className="terminal-line">{line}</div>
                  ))}
                  <span className="terminal-line" style={{ animation: "none", opacity: 1, marginTop: "1rem" }}>_</span>
                </div>
              )}

              {/* Easter Egg */}
              {gameState === "easterEgg" && (
                <>
                  <SecretCanvas />
                  <AiTerminal />
                </>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
