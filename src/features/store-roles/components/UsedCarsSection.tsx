import { UseFormReturn } from "react-hook-form";
import { useEffect } from "react";

import { StoreRolesForm } from "../types/storeRoles";

import { PersonRoleList } from "@/src/components/forms/PersonRoleList";
import { StringList } from "@/src/components/forms/StringList";

import { TextInput } from "@/src/components/ui/TextInput";
import { FormError } from "@/src/components/ui/FormError";
import { YesNoButtons } from "@/src/components/ui/YesNoButtons";
import { QuestionCard } from "@/src/components/ui/QuestionCard";
import { NestedCard } from "@/src/components/ui/NestedCard";

type Props = {
  form: UseFormReturn<StoreRolesForm>;
  showValidation?: boolean;
};

export function UsedCarsSection({
  form,
  showValidation = false,
}: Props) {
  const hasUsedManager = form.watch("usedCars.usedManager");
  const hasMerchandiser = form.watch(
    "usedCars.dedicatedMerchandiser"
  );
  const hasUsedBuyer = form.watch("usedCars.usedBuyer");

  const merchandiserRoles =
    form.watch("usedCars.merchandiserRoles") ?? [];
  const usedBuyerRoles =
    form.watch("usedCars.usedBuyerRoles") ?? [];
  const initialPricing =
    form.watch("usedCars.initialPricing") ?? [];
  const priceChanges =
    form.watch("usedCars.priceChanges") ?? [];

  useEffect(() => {
    if (hasUsedManager !== true) {
      form.setValue("usedCars.usedManagerName", undefined);
    }
  }, [hasUsedManager, form]);

  useEffect(() => {
    if (hasMerchandiser === true) {
      form.setValue("usedCars.merchandiserRoles", undefined);
    }

    if (hasMerchandiser === false) {
      form.setValue("usedCars.merchandiserName", undefined);

      const currentRoles = form.getValues(
        "usedCars.merchandiserRoles"
      );

      if (!currentRoles || currentRoles.length === 0) {
        form.setValue("usedCars.merchandiserRoles", [""]);
      }
    }
  }, [hasMerchandiser, form]);

  useEffect(() => {
    if (hasUsedBuyer === true) {
      form.setValue("usedCars.usedBuyerRoles", undefined);
    }

    if (hasUsedBuyer === false) {
      form.setValue("usedCars.usedBuyerName", undefined);

      const currentRoles = form.getValues(
        "usedCars.usedBuyerRoles"
      );

      if (!currentRoles || currentRoles.length === 0) {
        form.setValue("usedCars.usedBuyerRoles", [""]);
      }
    }
  }, [hasUsedBuyer, form]);

  return (
    <section className="mt-6">
      <h3 className="text-xl font-bold text-slate-900">
        Used Cars
      </h3>

      <p className="mt-1 text-sm text-slate-600">
        Accountabilities for the used-vehicle operation.
      </p>

      <QuestionCard
        number={1}
        label="Do you have a Used Manager?"
        required
      >
        <YesNoButtons
          value={hasUsedManager}
          onChange={(value) => {
            form.setValue("usedCars.usedManager", value, {
              shouldDirty: true,
              shouldTouch: true,
            });
          }}
        />

        {showValidation && hasUsedManager === undefined && (
          <FormError message="Please select Yes or No" />
        )}
      </QuestionCard>

      {hasUsedManager === true && (
        <NestedCard>
          <div className="mb-2 font-semibold text-slate-900">
            Name of Used Car Manager
            <span className="ml-1 text-red-500">*</span>
          </div>

          <TextInput
            type="text"
            placeholder="First and last name"
            {...form.register("usedCars.usedManagerName")}
          />

          {showValidation &&
            !form.watch("usedCars.usedManagerName") && (
              <FormError message="Manager name is required" />
            )}
        </NestedCard>
      )}

      <QuestionCard
        number={2}
        label="Do you have a dedicated Merchandiser?"
        required
      >
        <YesNoButtons
          value={hasMerchandiser}
          onChange={(value) => {
            form.setValue(
              "usedCars.dedicatedMerchandiser",
              value,
              {
                shouldDirty: true,
                shouldTouch: true,
              }
            );
          }}
        />

        {showValidation && hasMerchandiser === undefined && (
          <FormError message="Please select Yes or No" />
        )}
      </QuestionCard>

      {hasMerchandiser === true && (
        <NestedCard>
          <div className="mb-2 font-semibold text-slate-900">
            Merchandiser Name
            <span className="ml-1 text-red-500">*</span>
          </div>

          <TextInput
            type="text"
            placeholder="First and last name"
            {...form.register("usedCars.merchandiserName")}
          />

          {showValidation &&
            !form.watch("usedCars.merchandiserName") && (
              <FormError message="Merchandiser name is required" />
            )}
        </NestedCard>
      )}

      {hasMerchandiser === false && (
        <NestedCard>
          <div className="mb-2 font-semibold text-slate-900">
            What role handles merchandising?
            <span className="ml-1 text-red-500">*</span>
          </div>

          <StringList
            form={form}
            field="usedCars.merchandiserRoles"
          />

          {showValidation &&
            merchandiserRoles.every(
              (role) => role.trim() === ""
            ) && (
              <FormError message="At least one role is required" />
            )}
        </NestedCard>
      )}

      <QuestionCard
        number={3}
        label="Do you have a Used Buyer?"
        required
      >
        <YesNoButtons
          value={hasUsedBuyer}
          onChange={(value) => {
            form.setValue("usedCars.usedBuyer", value, {
              shouldDirty: true,
              shouldTouch: true,
            });
          }}
        />

        {showValidation && hasUsedBuyer === undefined && (
          <FormError message="Please select Yes or No" />
        )}
      </QuestionCard>

      {hasUsedBuyer === true && (
        <NestedCard>
          <div className="mb-2 font-semibold text-slate-900">
            Used Buyer Name
            <span className="ml-1 text-red-500">*</span>
          </div>

          <TextInput
            type="text"
            placeholder="First and last name"
            {...form.register("usedCars.usedBuyerName")}
          />

          {showValidation &&
            !form.watch("usedCars.usedBuyerName") && (
              <FormError message="Used Buyer name is required" />
            )}
        </NestedCard>
      )}

      {hasUsedBuyer === false && (
        <NestedCard>
          <div className="mb-2 font-semibold text-slate-900">
            What role handles buying?
            <span className="ml-1 text-red-500">*</span>
          </div>

          <StringList
            form={form}
            field="usedCars.usedBuyerRoles"
          />

          {showValidation &&
            usedBuyerRoles.every(
              (role) => role.trim() === ""
            ) && (
              <FormError message="At least one role is required" />
            )}
        </NestedCard>
      )}

      <QuestionCard
        number={4}
        label="Who does initial pricing?"
        required
      >
        <PersonRoleList
          form={form}
          field="usedCars.initialPricing"
        />

        {showValidation &&
          !initialPricing.some(
            (item) =>
              item.name.trim() !== "" &&
              item.role.trim() !== ""
          ) && (
            <FormError message="At least one person is required" />
          )}
      </QuestionCard>

      <QuestionCard
        number={5}
        label="Who does price changes?"
        required
      >
        <PersonRoleList
          form={form}
          field="usedCars.priceChanges"
        />

        {showValidation &&
          !priceChanges.some(
            (item) =>
              item.name.trim() !== "" &&
              item.role.trim() !== ""
          ) && (
            <FormError message="At least one person is required" />
          )}
      </QuestionCard>
    </section>
  );
}