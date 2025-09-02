function Button({
  text,
  onClick,
  icon,
  border,
}: {
  text: string;
  onClick?: () => void;
  icon?: string;
  border?: boolean;
}) {
  return (
    <button
      className={`landing-button ${border ? 'border' : ''}`}
      onClick={onClick}
    >
      {text}
      <span className="landing-button__icon">
        {icon && <img src={icon} alt="icon" />}
      </span>
    </button>
  );
}

export default Button;
