import "./index.less";

interface BoardItemProps {
  id: string;
  width?: string;
  cssClasses?: string;
  children: string;
}

const Button = ({ width, children, cssClasses, id }: BoardItemProps) => {
  const buttonWidth = width ? ` ${width}px` : "";
  return (
    <button id={id} className={`${cssClasses}${buttonWidth}`}>
      {children}
    </button>
  );
};

export default Button;
