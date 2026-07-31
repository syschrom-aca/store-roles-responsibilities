import { StoreRolesForm } from "../types/storeRoles";
import { StoreRolesPayload } from "../types/storeRolesPayload";

export function mapStoreRolesFormToPayload(
  form: StoreRolesForm
): StoreRolesPayload {
  return {
    submittedAt: new Date().toISOString(),

    store: form.storeDetails.storeName,

    submitter: {
      name: form.storeDetails.submitter,
      role: form.storeDetails.role,
    },

    usedCars: form.usedCars,

    newCars: form.newCars,

    leadManagement: form.leadManagement,
  };
}