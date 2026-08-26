"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { StoreDetailsSection } from "./StoreDetailsSection";
import { UsedCarsSection } from "./UsedCarsSection";
import { NewCarsSection } from "./NewCarsSection";
import { LeadManagementSection } from "./LeadManagementSection";
import { FormProgress } from "./FormProgress";
import { FormStepper } from "./FormStepper";

import { useStoreRolesForm } from "../hooks/useStoreRolesForm";
import { mapStoreRolesFormToPayload } from "../services/storeRolesMapper";
import {
  submitStoreRoles,
  getAuthenticatedEmail,
} from "../services/storeRolesApi";

import { StoreRolesForm } from "../types/storeRoles";
import {
  FormSection,
  SECTION_ORDER,
} from "../types/sections";

import { Button } from "@/src/components/ui/Button";

export function StoreRolesPage() {
  const form = useStoreRolesForm();
  const [submitted, setSubmitted] = useState(false);
  const [submittedAt, setSubmittedAt] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string | null>(
    null
  );
  const [activeSection, setActiveSection] =
    useState<FormSection>("store-details");
  const [visitedSections, setVisitedSections] = useState<
    FormSection[]
  >(["store-details"]);
  const [showNewCarsErrors, setShowNewCarsErrors] =
    useState(false);
  const [showUsedCarsErrors, setShowUsedCarsErrors] =
    useState(false);

  useEffect(() => {
    getAuthenticatedEmail().then(setUserEmail);
  }, []);

  const hasValidPersonRole = (
    items?: Array<{ name: string; role: string }>
  ) => {
    return (items ?? []).some(
      (item) =>
        item.name.trim() !== "" && item.role.trim() !== ""
    );
  };

  const hasAnyText = (value?: string) => !!value?.trim();

  const hasAnyRole = (roles?: string[]) =>
    (roles ?? []).some((role) => role.trim() !== "");

  const goToSection = async (
    section: FormSection
  ): Promise<boolean> => {
    if (activeSection === "store-details") {
      const isValid = await form.trigger([
        "storeDetails.storeName",
        "storeDetails.submitter",
        "storeDetails.role",
      ]);
      if (!isValid) {
        return false;
      }
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
    setActiveSection(section);
    return true;
  };

  const goToNextSection = async () => {
    if (activeSection === "store-details") {
      const moved = await goToSection("used-cars");
      if (!moved) return;
      setVisitedSections((prev) =>
        prev.includes("used-cars")
          ? prev
          : [...prev, "used-cars"]
      );
      return;
    }
    if (activeSection === "used-cars") {
      const usedManager = form.getValues(
        "usedCars.usedManager"
      );
      const usedManagerName = form.getValues(
        "usedCars.usedManagerName"
      );
      const merchandiser = form.getValues(
        "usedCars.dedicatedMerchandiser"
      );
      const merchandiserName = form.getValues(
        "usedCars.merchandiserName"
      );
      const merchandiserRoles = form.getValues(
        "usedCars.merchandiserRoles"
      );
      const usedBuyer = form.getValues(
        "usedCars.usedBuyer"
      );
      const usedBuyerName = form.getValues(
        "usedCars.usedBuyerName"
      );
      const usedBuyerRoles = form.getValues(
        "usedCars.usedBuyerRoles"
      );
      const initialPricing = form.getValues(
        "usedCars.initialPricing"
      );
      const priceChanges = form.getValues(
        "usedCars.priceChanges"
      );
      const isValid =
        (usedManager === true
          ? hasAnyText(usedManagerName)
          : usedManager === false) &&
        (merchandiser === true
          ? hasAnyText(merchandiserName)
          : merchandiser === false
            ? hasAnyRole(merchandiserRoles)
            : false) &&
        (usedBuyer === true
          ? hasAnyText(usedBuyerName)
          : usedBuyer === false
            ? hasAnyRole(usedBuyerRoles)
            : false) &&
        hasValidPersonRole(initialPricing) &&
        hasValidPersonRole(priceChanges);
      if (!isValid) {
        setShowUsedCarsErrors(true);
        return;
      }
      setShowUsedCarsErrors(false);
      setShowNewCarsErrors(false);
      const moved = await goToSection("new-cars");
      if (!moved) return;
      setVisitedSections((prev) =>
        prev.includes("new-cars")
          ? prev
          : [...prev, "new-cars"]
      );
      return;
    }
    if (activeSection === "new-cars") {
      const hasOrdering = hasValidPersonRole(
        form.getValues("newCars.ordering")
      );
      const hasPricing = hasValidPersonRole(
        form.getValues("newCars.pricing")
      );
      if (!hasOrdering || !hasPricing) {
        setShowNewCarsErrors(true);
        return;
      }
      setShowNewCarsErrors(false);
      const moved = await goToSection("lead-management");
      if (!moved) return;
      setVisitedSections((prev) =>
        prev.includes("lead-management")
          ? prev
          : [...prev, "lead-management"]
      );
      return;
    }
  };

  const goToPreviousSection = () => {
    if (activeSection === "lead-management") {
      setActiveSection("new-cars");
      return;
    }
    if (activeSection === "new-cars") {
      setActiveSection("used-cars");
      return;
    }
    if (activeSection === "used-cars") {
      setActiveSection("store-details");
      return;
    }
  };

  const handleSubmit = async (data: StoreRolesForm) => {
    const payload = mapStoreRolesFormToPayload(
      data,
      userEmail
    );
    const result = await submitStoreRoles(payload);
    console.log(result);
    setSubmitted(true);
    setSubmittedAt(new Date().toLocaleString());
  };

  const values = form.watch();
  const storeDetailsAnswered = [
    values.storeDetails.storeName,
    values.storeDetails.submitter,
    values.storeDetails.role,
  ].filter(Boolean).length;
  const leadManagementAnswered = [
    values.leadManagement.leadDistribution,
    values.leadManagement.newPaymentPresentation,
    values.leadManagement.usedPaymentPresentation,
  ].filter(Boolean).length;
  const newCarsAnswered = [
    hasValidPersonRole(values.newCars.ordering),
    hasValidPersonRole(values.newCars.pricing),
  ].filter(Boolean).length;
  const usedManagerComplete =
    values.usedCars.usedManager === false ||
    (values.usedCars.usedManager === true &&
      !!values.usedCars.usedManagerName?.trim());
  const merchandiserComplete =
    values.usedCars.dedicatedMerchandiser === true
      ? !!values.usedCars.merchandiserName?.trim()
      : values.usedCars.dedicatedMerchandiser === false
        ? (values.usedCars.merchandiserRoles ?? []).some(
            (role) => role.trim() !== ""
          )
        : false;
  const usedBuyerComplete =
    values.usedCars.usedBuyer === true
      ? !!values.usedCars.usedBuyerName?.trim()
      : values.usedCars.usedBuyer === false
        ? (values.usedCars.usedBuyerRoles ?? []).some(
            (role) => role.trim() !== ""
          )
        : false;
  const usedCarsAnswered = [
    values.usedCars.usedManager !== undefined,
    usedManagerComplete,
    values.usedCars.dedicatedMerchandiser !== undefined,
    merchandiserComplete,
    values.usedCars.usedBuyer !== undefined,
    usedBuyerComplete,
    hasValidPersonRole(values.usedCars.initialPricing) &&
      hasValidPersonRole(values.usedCars.priceChanges),
  ].filter(Boolean).length;
  const totalAnswered =
    storeDetailsAnswered +
    usedCarsAnswered +
    newCarsAnswered +
    leadManagementAnswered;
  const totalRequired = 3 + 7 + 2 + 3;
  const sectionNumber =
    SECTION_ORDER.indexOf(activeSection) + 1;
  const totalSections = SECTION_ORDER.length;

  if (submitted) {
    return (
      <div className="mx-auto max-w-4xl rounded-lg bg-white p-8 shadow">
        <div className="mb-8">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Submitted
            </span>
            <span className="text-sm font-bold text-red-600">
              100%
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-slate-200">
            <div className="h-full w-full rounded-full bg-red-600" />
          </div>
        </div>
        <div className="text-center">
          <div className="mb-6 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <span className="text-4xl text-green-600">
                ✓
              </span>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-slate-900">
            Report submitted
          </h2>
          <p className="mt-3 text-slate-600">
            Thank you for completing the survey.
          </p>
          <p className="mt-6 text-sm text-slate-500">
            Submitted on {submittedAt}
          </p>
          <div className="mt-8">
            <Button
              variant="primary"
              onClick={() => {
                form.reset();
                setSubmitted(false);
                setSubmittedAt("");
                setActiveSection("store-details");
                setVisitedSections(["store-details"]);
                setShowNewCarsErrors(false);
                setShowUsedCarsErrors(false);
              }}
            >
              Submit another response
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="mb-2 flex justify-center sm:hidden">
        <Image
          src="/autocanada-icon.png"
          alt="AutoCanada"
          width={32}
          height={32}
          priority
        />
      </div>
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">
            Store Roles &amp; Responsibilities
          </h2>
          <p className="mt-2 text-slate-600">
            Store accountability survey
          </p>
        </div>
        <div className="hidden sm:block">
          <Image
            src="/autocanada-logo.png"
            alt="AutoCanada"
            width={210}
            height={32}
            priority
          />
        </div>
      </div>
      <FormStepper
        activeSection={activeSection}
        storeDetailsAnswered={storeDetailsAnswered}
        leadManagementAnswered={leadManagementAnswered}
        newCarsAnswered={newCarsAnswered}
        usedCarsAnswered={usedCarsAnswered}
        visitedSections={visitedSections}
        onSectionClick={(section) => {
          void goToSection(section);
        }}
      />
      <FormProgress
        answered={totalAnswered}
        total={totalRequired}
      />
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (activeSection === "lead-management") {
            form.handleSubmit(handleSubmit)();
          }
        }}
      >
        {activeSection === "store-details" && (
          <StoreDetailsSection form={form} />
        )}
        {activeSection === "used-cars" && (
          <UsedCarsSection
            form={form}
            showValidation={showUsedCarsErrors}
          />
        )}
        {activeSection === "new-cars" && (
          <NewCarsSection
            form={form}
            showValidation={showNewCarsErrors}
          />
        )}
        {activeSection === "lead-management" && (
          <LeadManagementSection form={form} />
        )}
        <div className="mt-8 flex items-center justify-between border-t border-slate-200 pt-6">
          <div>
            {activeSection !== "store-details" && (
              <Button
                type="button"
                variant="secondary"
                onClick={goToPreviousSection}
              >
                Back
              </Button>
            )}
          </div>
          <div className="text-sm text-slate-500">
            Section {sectionNumber} of {totalSections}
          </div>
          <div>
            {activeSection !== "lead-management" ? (
              <Button
                type="button"
                onClick={goToNextSection}
              >
                Next
              </Button>
            ) : (
              <Button
                type="button"
                variant="primary"
                disabled={form.formState.isSubmitting}
                onClick={() => {
                  form.handleSubmit(handleSubmit)();
                }}
              >
                {form.formState.isSubmitting
                  ? "Submitting..."
                  : "Submit Report"}
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
