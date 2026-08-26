import { StoreRolesPayload } from "../types/storeRolesPayload";

const API_URL =
  "https://im-store-roles-app-f4frfve3ebb7b8cr.canadacentral-01.azurewebsites.net/api/submitstoreroles";

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

/**
 * Retrieves the authenticated user's email from the
 * Azure Static Web Apps auth endpoint (/.auth/me).
 * Returns null when running locally or when not authenticated.
 */
export async function getAuthenticatedEmail(): Promise<
  string | null
> {
  try {
    const response = await fetch("/.auth/me");

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    return data?.clientPrincipal?.userDetails ?? null;
  } catch {
    return null;
  }
}
