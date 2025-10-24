function Button({ children, className = "" }) {
  const base = "w-fit px-4 py-2.5 rounded-lg font-medium transition";
  const styles =  "bg-purple-600 text-white hover:bg-transparent hover:border-white border border-transparent";

  return (
    <button className={`${base} ${styles} ${className}`}>
      {children}
    </button>
  );
}

export default Button;
