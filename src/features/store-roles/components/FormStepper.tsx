import {
  FormSection,
  SECTION_ORDER,
} from "../types/sections";

type Props = {
  activeSection: FormSection;
  storeDetailsAnswered: number;
  leadManagementAnswered: number;
  newCarsAnswered: number;
  usedCarsAnswered: number;
  visitedSections: FormSection[];
  onSectionClick: (section: FormSection) => void;
};

export function FormStepper({
  activeSection,
  storeDetailsAnswered,
  leadManagementAnswered,
  newCarsAnswered,
  usedCarsAnswered,
  visitedSections,
  onSectionClick,
}: Props) {
  const sections = [
    { id: "store-details", label: "Store Details" },
    { id: "used-cars", label: "Used Cars" },
    { id: "new-cars", label: "New Cars" },
    { id: "lead-management", label: "Lead Management" },
    { id: "tech-stack", label: "Tech Stack" },
  ] as const;

  const activeIndex = SECTION_ORDER.indexOf(activeSection);

  return (
    <div className="mb-6 flex flex-wrap gap-3">
      {sections.map((section, index) => {
        const isActive = activeSection === section.id;
        const isDisabled = section.id === "tech-stack";
        const isVisited = visitedSections.includes(
          section.id as FormSection
        );
        const isLocked = !isVisited && !isDisabled;
        const sectionIndex = index;

        let status = "Not started";

        if (isLocked) status = "Locked";
        if (sectionIndex < activeIndex) status = "Complete";
        if (sectionIndex === activeIndex) status = "In progress";
        if (section.id === "tech-stack") status = "Coming Soon";

        let extraInfo = "";

        if (
          section.id === "store-details" &&
          storeDetailsAnswered > 0
        ) {
          extraInfo = `${storeDetailsAnswered} of 3 answered`;
        }

        if (section.id === "used-cars" && usedCarsAnswered > 0) {
          extraInfo = `${usedCarsAnswered} of 7 answered`;
        }

        if (section.id === "new-cars" && newCarsAnswered > 0) {
          extraInfo = `${newCarsAnswered} of 2 answered`;
        }

        if (
          section.id === "lead-management" &&
          leadManagementAnswered > 0
        ) {
          extraInfo = `${leadManagementAnswered} of 3 answered`;
        }

        const displayStatus = extraInfo || status;

        return (
          <div
            key={section.id}
            onClick={() => {
              if (!isDisabled && isVisited) {
                onSectionClick(section.id as FormSection);
              }
            }}
            className={`min-w-[180px] cursor-pointer rounded-lg border px-4 py-3 transition-all ${
              isDisabled
                ? "cursor-not-allowed opacity-70"
                : isLocked
                  ? "opacity-60"
                  : isActive
                    ? "border-red-500 bg-white shadow-md"
                    : "border-slate-200 bg-white"
            }`}
          >
            <div className="flex items-center gap-2">
              <div
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                  status === "Complete"
                    ? "bg-green-600 text-white"
                    : isActive
                      ? "bg-red-600 text-white"
                      : "bg-slate-200 text-slate-700"
                }`}
              >
                {status === "Complete"
                  ? "✓"
                  : section.id === "tech-stack"
                    ? "–"
                    : index + 1}
              </div>

              <div>
                <div className="text-sm font-bold text-slate-900">
                  {section.label}
                </div>

                <div
                  className={`text-xs ${
                    section.id === "tech-stack"
                      ? "text-amber-500"
                      : "text-slate-500"
                  }`}
                >
                  {displayStatus}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}