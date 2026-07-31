import { UseFormReturn } from "react-hook-form";
import { StoreRolesForm } from "../types/storeRoles";
import { Select } from "@/src/components/ui/Select";
import { FormError } from "@/src/components/ui/FormError";
import { QuestionCard } from "@/src/components/ui/QuestionCard";

type Props = {
  form: UseFormReturn<StoreRolesForm>;
};

export function LeadManagementSection({ form }: Props) {
  return (
    <section className="mt-6">
      <h3 className="text-xl font-bold text-slate-900">
        Lead Management
      </h3>

      <p className="mt-1 text-sm text-slate-600">
        Accountabilities for lead handling and follow-up.
      </p>

      <QuestionCard
        number={1}
        label="Lead distribution structure"
        required
      >
        <Select
          hasError={
            !!form.formState.errors.leadManagement
              ?.leadDistribution
          }
          {...form.register(
            "leadManagement.leadDistribution",
            {
              required: "Lead distribution is required",
            }
          )}
        >
          <option value="">Select</option>
          <option value="Round Robin">Round Robin</option>
          <option value="Shark Tank">Shark Tank</option>
          <option value="Presence-based">
            Presence-based
          </option>
          <option value="Performance-based">
            Performance-based
          </option>
        </Select>

        <FormError
          message={
            form.formState.errors.leadManagement
              ?.leadDistribution?.message
          }
        />
      </QuestionCard>

      <QuestionCard
        number={2}
        label="New payment presentation"
        required
      >
        <Select
          hasError={
            !!form.formState.errors.leadManagement
              ?.newPaymentPresentation
          }
          {...form.register(
            "leadManagement.newPaymentPresentation",
            {
              required:
                "New payment presentation is required",
            }
          )}
        >
          <option value="">Select a method</option>
          <option value="4-Square">4-Square</option>
          <option value="Menu">Menu</option>
          <option value="OTD">OTD</option>
        </Select>

        <FormError
          message={
            form.formState.errors.leadManagement
              ?.newPaymentPresentation?.message
          }
        />
      </QuestionCard>

      <QuestionCard
        number={3}
        label="Used payment presentation"
        required
      >
        <Select
          hasError={
            !!form.formState.errors.leadManagement
              ?.usedPaymentPresentation
          }
          {...form.register(
            "leadManagement.usedPaymentPresentation",
            {
              required:
                "Used payment presentation is required",
            }
          )}
        >
          <option value="">Select a method</option>
          <option value="4-Square">4-Square</option>
          <option value="Menu">Menu</option>
          <option value="OTD">OTD</option>
        </Select>

        <FormError
          message={
            form.formState.errors.leadManagement
              ?.usedPaymentPresentation?.message
          }
        />
      </QuestionCard>
    </section>
  );
}