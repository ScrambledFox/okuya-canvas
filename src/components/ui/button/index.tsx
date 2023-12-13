interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Button = ({ children, onClick, className, ...props }: ButtonProps) => {
  return (
    <button
      className={`bg-neutral-900 hover:bg-neutral-800 text-white font-bold py-2 px-4 rounded ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
