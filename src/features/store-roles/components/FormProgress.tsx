type Props = {
  answered: number;
  total: number;
};

export function FormProgress({ answered, total }: Props) {
  const progress =
    total > 0 ? Math.round((answered / total) * 100) : 0;

  return (
    <div className="mt-6">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Overall Progress
        </span>

        <span className="text-sm font-bold text-red-600">
          {progress}%
        </span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-red-600 transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}