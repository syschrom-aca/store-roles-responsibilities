"use client";

import { UseFormReturn } from "react-hook-form";
import { StoreRolesForm } from "@/src/features/store-roles/types/storeRoles";
import { TextInput } from "@/src/components/ui/TextInput";

type Props = {
  form: UseFormReturn<StoreRolesForm>;
  field:
    | "usedCars.initialPricing"
    | "usedCars.priceChanges"
    | "newCars.ordering"
    | "newCars.pricing";
};

export function PersonRoleList({ form, field }: Props) {
  const items = form.watch(field) ?? [];

  return (
    <div>
      <div className="space-y-3">
        {items.map((_, index) => (
          <div key={index} className="flex gap-2">
            <TextInput
              type="text"
              placeholder="Name"
              {...form.register(
                `${field}.${index}.name` as const
              )}
            />

            <TextInput
              type="text"
              placeholder="Role"
              {...form.register(
                `${field}.${index}.role` as const
              )}
            />

            <button
              type="button"
              aria-label="Remove person"
              onClick={() => {
                const current =
                  (form.getValues(field) as Array<{
                    name: string;
                    role: string;
                  }>) ?? [];

                form.setValue(
                  field,
                  current.filter((_, i) => i !== index)
                );
              }}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-slate-300 text-slate-500 hover:bg-slate-50"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => {
          const current =
            (form.getValues(field) as Array<{
              name: string;
              role: string;
            }>) ?? [];

          if (current.length < 3) {
            form.setValue(field, [
              ...current,
              { name: "", role: "" },
            ]);
          }
        }}
        className="mt-3 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-100"
      >
        + Add another person
      </button>
    </div>
  );
}