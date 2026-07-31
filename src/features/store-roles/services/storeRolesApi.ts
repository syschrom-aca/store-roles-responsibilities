import { StoreRolesPayload } from "../types/storeRolesPayload";

export async function submitStoreRoles(
  payload: StoreRolesPayload
) {
  console.log("Submitting payload...");
  console.log(payload);

  return {
    success: true,
  };
}