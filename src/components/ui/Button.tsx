type Props = {
  children: React.ReactNode;
  type?: "button" | "submit";
  onClick?: () => void;
  variant?: "primary" | "success" | "secondary";
  disabled?: boolean;
};

export function Button({
  children,
  type = "button",
  onClick,
  variant = "primary",
  disabled = false,
}: Props) {
  const styles =
    variant === "success"
      ? "bg-green-600 text-white"
      : variant === "secondary"
        ? "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
        : "bg-red-600 text-white";

  const disabledStyles = disabled
    ? "cursor-not-allowed opacity-60"
    : variant === "secondary"
      ? ""
      : "hover:opacity-90 hover:shadow";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`rounded-md px-5 py-2.5 text-sm font-medium shadow-sm transition ${styles} ${disabledStyles}`}
    >
      {children}
    </button>
  );
}