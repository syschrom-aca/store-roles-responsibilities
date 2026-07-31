"use client";

import { useForm } from "react-hook-form";
import { StoreRolesForm } from "../types/storeRoles";

export function useStoreRolesForm() {
  return useForm<StoreRolesForm>({
    defaultValues: {
      storeDetails: {
        storeName: "",
        submitter: "",
        role: "",
      },

      usedCars: {
        usedManager: undefined,
        dedicatedMerchandiser: undefined,
        usedBuyer: undefined,

        usedManagerName: "",
        merchandiserName: "",
        usedBuyerName: "",

        merchandiserRoles: [],
        usedBuyerRoles: [],

        initialPricing: [],
        priceChanges: [],
      },

      newCars: {
        ordering: [],
        pricing: [],
      },

      leadManagement: {
        leadDistribution: "",
        newPaymentPresentation: "",
        usedPaymentPresentation: "",
      },
    },

    mode: "onChange",
    reValidateMode: "onChange",
  });
}