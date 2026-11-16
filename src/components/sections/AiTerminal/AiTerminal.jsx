import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import './AiTerminal.css';

const TypewriterText = ({ text, onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');
  const onCompleteRef = useRef(onComplete);
  
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    let i = 0;
    setDisplayedText('');
    const interval = setInterval(() => {
      setDisplayedText(text.substring(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        if (onCompleteRef.current) onCompleteRef.current();
      }
    }, 20); // typing speed
    
    return () => clearInterval(interval);
  }, [text]);

  return <span>{displayedText}</span>;
};

export default function AiTerminal() {
  const { t } = useTranslation();
  
  const [history, setHistory] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const terminalBodyRef = useRef(null);

  // Initialize terminal only once
  useEffect(() => {
    setHistory(prev => prev.length === 0 ? [
      { id: 'init', type: 'system', text: t('aiTerminal.initialMessage') }
    ] : prev);
  }, [t]);

  // Scroll to bottom when history changes
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTo({
        top: terminalBodyRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [history, isTyping, inputValue]);

  const handleCommand = (cmd) => {
    if (isTyping) return;
    
    const command = cmd.trim().toLowerCase();
    if (!command) return;

    if (command === 'clear') {
      setHistory([]);
      setInputValue('');
      return;
    }

    // Add user command
    const newHistory = [...history, { id: Date.now().toString(), type: 'user', text: command }];
    setHistory(newHistory);
    setInputValue('');
    setIsTyping(true);

    // Get response
    setTimeout(() => {
      const responseText = t(`aiTerminal.commands.${command}`, { defaultValue: t('aiTerminal.commands.error') });
      setHistory([...newHistory, { id: Date.now().toString() + 'sys', type: 'system', text: responseText, animate: true }]);
    }, 400); // small delay to simulate processing
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCommand(inputValue);
  };

  const suggestedCommands = ['whoami', 'skills', 'projects', 'contact', 'clear'];

  return (
    <div className="terminal-window fade-in">
      {/* Fake Window Header */}
      <div className="terminal-topbar">
              <div className="terminal-buttons">
                <span className="btn close"></span>
                <span className="btn minimize"></span>
                <span className="btn maximize"></span>
              </div>
              <div className="terminal-title">user@whilmis-agent: ~</div>
            </div>

            {/* Terminal Body */}
            <div className="terminal-body" ref={terminalBodyRef}>
              <div className="terminal-history">
                {history.map((entry) => (
                  <div key={entry.id} className={`history-entry ${entry.type}`}>
                    {entry.type === 'user' && <span className="prompt">root@guest:~$ </span>}
                    {entry.type === 'system' && <span className="prompt sys">&gt; </span>}
                    
                    {entry.type === 'system' && entry.animate ? (
                      <TypewriterText text={entry.text} onComplete={() => setIsTyping(false)} />
                    ) : (
                      <span className="text-content">{entry.text}</span>
                    )}
                  </div>
                ))}
                
                {!isTyping && (
                  <form onSubmit={handleSubmit} className="terminal-input-row">
                    <span className="prompt">root@guest:~$ </span>
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder={t('aiTerminal.inputPlaceholder')}
                      autoComplete="off"
                      spellCheck="false"
                      className="terminal-input"
                      autoFocus
                    />
                    <span className="blinking-cursor"></span>
                  </form>
                )}
              </div>
            </div>

            {/* Suggested Commands Footer */}
            <div className="terminal-footer">
              {suggestedCommands.map(cmd => (
                <button
                  key={cmd}
                  className="suggested-cmd"
                  onClick={() => handleCommand(cmd)}
                  disabled={isTyping}
                >
                  {cmd}
                </button>
              ))}
      </div>
    </div>
  );
}
