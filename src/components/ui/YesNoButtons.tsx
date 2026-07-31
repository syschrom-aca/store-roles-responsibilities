type Props = {
  value?: boolean;
  onChange: (value: boolean) => void;
};

export function YesNoButtons({
  value,
  onChange,
}: Props) {
  return (
    <div className="flex gap-2">
      <button
        type="button"
        onClick={() => onChange(true)}
        className={`rounded-md px-5 py-2 text-sm font-semibold transition ${
          value === true
            ? "bg-red-600 text-white shadow-sm"
            : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
        }`}
      >
        Yes
      </button>

      <button
        type="button"
        onClick={() => onChange(false)}
        className={`rounded-md px-5 py-2 text-sm font-semibold transition ${
          value === false
            ? "bg-red-600 text-white shadow-sm"
            : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
        }`}
      >
        No
      </button>
    </div>
  );
}