import type { ComponentProps } from "react";
import type { SignIn } from "@clerk/nextjs";

type ClerkAppearance = NonNullable<ComponentProps<typeof SignIn>["appearance"]>;

/**
 * Flat SlotWise styling for Clerk auth components — no drop shadows,
 * soft periwinkle accents, Manrope-friendly radii.
 */
export const clerkAuthAppearance: ClerkAppearance = {
  variables: {
    colorPrimary: "#7B68C7",
    colorPrimaryForeground: "#ffffff",
    colorForeground: "#17171c",
    colorMutedForeground: "#6b7280",
    colorMuted: "#f0ecfb",
    colorBackground: "#ffffff",
    colorInput: "#ffffff",
    colorInputForeground: "#17171c",
    colorNeutral: "#6b7280",
    colorBorder: "#ebe7f5",
    colorRing: "#7B68C7",
    colorShadow: "transparent",
    borderRadius: "1rem",
    fontFamily: "var(--font-manrope), ui-sans-serif, system-ui, sans-serif",
    fontFamilyButtons: "var(--font-manrope), ui-sans-serif, system-ui, sans-serif",
  },
  elements: {
    rootBox: "mx-auto w-full",
    cardBox: "shadow-none! w-full",
    card: [
      "shadow-none!",
      "bg-white",
      "ring-1",
      "ring-[#ebe7f5]",
      "rounded-[1.5rem]",
    ].join(" "),
    headerTitle: "text-[#17171c] font-bold tracking-tight",
    headerSubtitle: "text-[#6b7280]",
    socialButtonsBlockButton: [
      "shadow-none!",
      "bg-white",
      "ring-1",
      "ring-[#ebe7f5]",
      "hover:bg-[#f7f5fc]",
    ].join(" "),
    formButtonPrimary: [
      "shadow-none!",
      "bg-[#7B68C7]",
      "hover:bg-[#6854b5]",
      "rounded-full",
    ].join(" "),
    formFieldInput: [
      "shadow-none!",
      "rounded-2xl",
      "ring-1",
      "ring-[#ebe7f5]",
      "focus:ring-[#7B68C7]",
    ].join(" "),
    footer: "bg-transparent shadow-none!",
    footerAction: "bg-transparent",
    identityPreview: "shadow-none! ring-1 ring-[#ebe7f5]",
    alternativeMethodsBlockButton: "shadow-none! ring-1 ring-[#ebe7f5]",
  },
};
