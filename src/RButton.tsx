interface Props {
  className?: string;
  children: React.ReactNode;
  onClick: () => void;
}

const RButton: React.FC<Props> = ({ children, className, onClick }) => {
  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  );
};

export default RButton;
