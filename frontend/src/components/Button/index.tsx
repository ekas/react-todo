import "./index.less";

interface BoardItemProps {
  id: string;
  width?: string;
  cssClasses?: string;
  children: string;
  onClick?: () => void;
}

const Button = ({
  width,
  children,
  cssClasses,
  id,
  onClick,
}: BoardItemProps) => {
  const buttonWidth = width ? ` ${width}px` : "";
  return (
    <button id={id} className={`${cssClasses}${buttonWidth}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
