import { UseFormReturn } from "react-hook-form";
import { StoreRolesForm } from "../types/storeRoles";

type Props = {
  form: UseFormReturn<StoreRolesForm>;
};

export function FormDebug({ form }: Props) {
  return (
    <pre className="mt-4 overflow-auto rounded bg-black p-4 text-xs text-green-400">
      {JSON.stringify(form.watch(), null, 2)}
    </pre>
  );
}
