type Props = {
  children: React.ReactNode;
  required?: boolean;
  className?: string;
};

export function FormLabel({
  children,
  required = false,
  className = "",
}: Props) {
  return (
    <label
      className={`mb-1 block font-medium text-slate-900 ${className}`}
    >
      {children}

      {required && (
        <span className="ml-1 text-red-500">
          *
        </span>
      )}
    </label>
  );
}