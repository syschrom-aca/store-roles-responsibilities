import { UseFormReturn } from "react-hook-form";
import { StoreRolesForm } from "../types/storeRoles";
import { PersonRoleList } from "@/src/components/forms/PersonRoleList";
import { FormError } from "@/src/components/ui/FormError";
import { QuestionCard } from "@/src/components/ui/QuestionCard";

type Props = {
  form: UseFormReturn<StoreRolesForm>;
  showValidation?: boolean;
};

export function NewCarsSection({
  form,
  showValidation = false,
}: Props) {
  const ordering = form.watch("newCars.ordering") ?? [];
  const pricing = form.watch("newCars.pricing") ?? [];

  return (
    <section className="mt-6">
      <h3 className="text-xl font-bold text-slate-900">
        New Cars
      </h3>

      <p className="mt-1 text-sm text-slate-600">
        Accountabilities for the new-vehicle operation.
      </p>

      <QuestionCard
        number={1}
        label="Who does the ordering of new cars?"
        required
      >
        <PersonRoleList form={form} field="newCars.ordering" />

        {showValidation &&
          !ordering.some(
            (item) =>
              item.name.trim() !== "" &&
              item.role.trim() !== ""
          ) && (
            <FormError message="At least one completed person and role is required" />
          )}
      </QuestionCard>

      <QuestionCard
        number={2}
        label="Who does the pricing of new cars?"
        required
      >
        <PersonRoleList form={form} field="newCars.pricing" />

        {showValidation &&
          !pricing.some(
            (item) =>
              item.name.trim() !== "" &&
              item.role.trim() !== ""
          ) && (
            <FormError message="At least one completed person and role is required" />
          )}
      </QuestionCard>
    </section>
  );
}