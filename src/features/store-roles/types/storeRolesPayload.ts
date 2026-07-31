import { StoreRolesForm } from "./storeRoles";

export interface StoreRolesPayload {
  submittedAt: string;

  store: string;

  submitter: {
    name: string;
    role: string;
  };

  usedCars: StoreRolesForm["usedCars"];

  newCars: StoreRolesForm["newCars"];

  leadManagement: StoreRolesForm["leadManagement"];
}