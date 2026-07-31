import { UseFormReturn } from "react-hook-form";
import { StoreRolesForm } from "../types/storeRoles";
import { STORE_OPTIONS } from "../constants/storeOptions";
import { TextInput } from "@/src/components/ui/TextInput";
import { Select } from "@/src/components/ui/Select";
import { FormError } from "@/src/components/ui/FormError";
import { QuestionCard } from "@/src/components/ui/QuestionCard";

type Props = {
  form: UseFormReturn<StoreRolesForm>;
};

export function StoreDetailsSection({ form }: Props) {
  return (
    <section className="mt-6">
      <h3 className="text-xl font-bold text-slate-900">
        Store Details
      </h3>

      <p className="mt-1 text-sm text-slate-600">
        Tell us which store this report is for and who&apos;s submitting it.
      </p>

      <QuestionCard
        number={1}
        label="Store / dealership name"
        required
      >
        <Select
          hasError={
            !!form.formState.errors.storeDetails?.storeName
          }
          {...form.register("storeDetails.storeName", {
            required: "Store name is required",
          })}
        >
          <option value="">Select a store</option>

          {STORE_OPTIONS.map((store) => (
            <option key={store} value={store}>
              {store}
            </option>
          ))}
        </Select>

        <FormError
          message={
            form.formState.errors.storeDetails?.storeName
              ?.message
          }
        />
      </QuestionCard>

      <QuestionCard number={2} label="Your name" required>
        <TextInput
          type="text"
          placeholder="First and last name"
          hasError={
            !!form.formState.errors.storeDetails?.submitter
          }
          {...form.register("storeDetails.submitter", {
            required: "Your name is required",
          })}
        />

        <FormError
          message={
            form.formState.errors.storeDetails?.submitter
              ?.message
          }
        />
      </QuestionCard>

      <QuestionCard number={3} label="Your role" required>
        <TextInput
          type="text"
          placeholder="e.g. General Manager"
          hasError={
            !!form.formState.errors.storeDetails?.role
          }
          {...form.register("storeDetails.role", {
            required: "Your role is required",
          })}
        />

        <FormError
          message={
            form.formState.errors.storeDetails?.role
              ?.message
          }
        />
      </QuestionCard>
    </section>
  );
}