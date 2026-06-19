/** Default local user for the portfolio simulator (no auth required). */
export const DEMO_USER_ID = "demo-user";

export async function requireUserId(): Promise<string> {
  return DEMO_USER_ID;
}
