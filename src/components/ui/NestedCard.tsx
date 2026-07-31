type Props = {
  children: React.ReactNode;
};

export function NestedCard({ children }: Props) {
  return (
    <div className="mt-3 rounded-lg border border-red-200 border-l-4 border-l-red-500 bg-white p-4">
      {children}
    </div>
  );
}