const Button = ({
  children,
  type = "button",
  className = "",
  loading = false,
  ...props
}) => {
  return (
    <button
      type={type}
      disabled={loading}
      className={`w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 ${className}`}
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

export default Button;