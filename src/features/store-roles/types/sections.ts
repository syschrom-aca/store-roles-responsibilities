export const FORM_SECTIONS = [
  "store-details",
  "used-cars",
  "new-cars",
  "lead-management",
  "tech-stack",
] as const;

export type FormSection =
  (typeof FORM_SECTIONS)[number];

export const SECTION_ORDER: FormSection[] = [
  "store-details",
  "used-cars",
  "new-cars",
  "lead-management",
  "tech-stack",
];