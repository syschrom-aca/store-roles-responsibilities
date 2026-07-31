type Props = {
  message?: string;
};

export function FormError({
  message,
}: Props) {
  if (!message) {
    return null;
  }

  return (
    <p className="mt-1 flex items-center gap-1 text-sm text-red-600">
      <span>⚠</span>
      <span>{message}</span>
    </p>
  );
}