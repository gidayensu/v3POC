export const ONBOARDING_URL = "https://onboardinguat.itcsrvc.com/"

/**
 * Seeds a placeholder onboarding application (so it shows up in Businesses)
 * and hands the user off to the external onboarding portal.
 */
export function startExternalOnboarding() {
  const existing = localStorage.getItem("transflow-onboarding")
  if (!existing)
    localStorage.setItem(
      "transflow-onboarding",
      JSON.stringify({
        name: "New business application",
        status: "Onboarding incomplete",
        progress: 42,
        updatedAt: new Date().toISOString(),
        stages: ["Business details", "Representatives"],
      })
    )
  window.open(ONBOARDING_URL, "_blank", "noopener,noreferrer")
}
