type Props = {
  number: number;
  label: string;
  required?: boolean;
  children: React.ReactNode;
};

export function QuestionCard({
  number,
  label,
  required = false,
  children,
}: Props) {
  return (
    <div className="mt-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center gap-2">
        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-200 text-xs font-semibold text-slate-700">
          {number}
        </div>

        <span className="font-semibold text-slate-900">
          {label}
          {required && (
            <span className="ml-1 text-red-500">*</span>
          )}
        </span>
      </div>

      {children}
    </div>
  );
}