import "./index.less";

interface BoardItemProps {
  id: string;
  width?: string;
  cssClasses?: string;
  children: string;
  onClick?: () => void;
  dataCy?: string;
}

const Button = ({
  width,
  children,
  cssClasses,
  id,
  onClick,
  dataCy,
}: BoardItemProps) => {
  const buttonWidth = width ? ` ${width}px` : "";
  return (
    <button
      id={id}
      className={`${cssClasses}${buttonWidth}`}
      onClick={onClick}
      data-cy={dataCy}
    >
      {children}
    </button>
  );
};

export default Button;
