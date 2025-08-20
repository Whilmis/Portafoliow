import useInView from "../../../hooks/useInView";
import "./reveal.css";

export default function Reveal({
  as: Tag = "div", // elemento HTML o componente que se va a renderizar
  variant = "fade-up",
  delay = 0,
  duration = 700,
  className = "",
  children,
  ...rest
}) {
  const { ref, inView } = useInView({ threshold: 0.15 });

  const style = {
    "--reveal-delay": `${delay}ms`,
    "--reveal-duration": `${duration}ms`,
  };

  return (
    <Tag
      ref={ref}
      className={`reveal ${variant} ${inView ? "is-inview" : ""} ${className}`}
      style={style}
      {...rest}
    >
      {children}
    </Tag>
  );
}
