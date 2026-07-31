type Props =
  React.InputHTMLAttributes<HTMLInputElement> & {
    hasError?: boolean;
  };

export function TextInput({
  hasError = false,
  ...props
}: Props) {
  return (
    <input
      {...props}
      className={`w-full rounded-md border text-slate-900 placeholder:text-slate-400 ${
        hasError
          ? "border-red-500"
          : "border-slate-300"
      } bg-white px-3 py-2 text-sm shadow-sm transition focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-100 ${
        props.className ?? ""
      }`}
    />
  );
}