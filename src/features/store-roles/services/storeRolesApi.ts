import { StoreRolesPayload } from "../types/storeRolesPayload";

const API_URL =
  "https://im-store-roles-app-f4frfve3ebb7b8cr.canadacentral-01.azurewebsites.net/api/submitStoreRoles";

export async function submitStoreRoles(
  payload: StoreRolesPayload
) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to submit form");
  }

  return response.json();
}