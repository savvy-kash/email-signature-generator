import StepHeader from "../StepHeader.jsx";
import { cn } from "../../lib/utils.js";

const previews = {
  left: (
    <svg viewBox="0 0 200 110" className="h-full w-full">
      <circle cx="35" cy="55" r="22" fill="currentColor" opacity="0.15" />
      <rect x="72" y="34" width="90" height="8" rx="2" fill="currentColor" />
      <rect x="72" y="48" width="70" height="5" rx="2" fill="currentColor" opacity="0.4" />
      <rect x="72" y="60" width="80" height="4" rx="2" fill="currentColor" opacity="0.3" />
      <rect x="72" y="70" width="60" height="4" rx="2" fill="currentColor" opacity="0.3" />
    </svg>
  ),
  minimal: (
    <svg viewBox="0 0 200 110" className="h-full w-full">
      <rect x="30" y="30" width="120" height="8" rx="2" fill="currentColor" />
      <rect x="30" y="46" width="100" height="5" rx="2" fill="currentColor" opacity="0.4" />
      <rect x="30" y="60" width="140" height="4" rx="2" fill="currentColor" opacity="0.3" />
      <rect x="30" y="70" width="120" height="4" rx="2" fill="currentColor" opacity="0.3" />
      <rect x="30" y="80" width="80" height="4" rx="2" fill="currentColor" opacity="0.3" />
    </svg>
  ),
};

const items = [
  { key: "left", label: "Left Aligned", description: "Classic layout with image on left" },
  { key: "minimal", label: "Minimal", description: "Clean text-focused design" },
];

export default function TemplatesStep({ selected, onSelect }) {
  return (
    <div>
      <StepHeader
        step="3"
        title="Select your template"
        subtitle="Choose a layout. You can tweak colors and fonts in the next step."
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {items.map((item) => {
          const active = selected === item.key;
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => onSelect(item.key)}
              className={cn(
                "group relative overflow-hidden rounded-md border bg-card p-4 text-left transition-colors",
                active
                  ? "border-primary ring-1 ring-primary"
                  : "hover:border-primary/40"
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="text-sm font-semibold">{item.label}</div>
                  <div className="mt-0.5 text-xs text-muted-foreground">
                    {item.description}
                  </div>
                </div>
                <span
                  className={cn(
                    "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors",
                    active
                      ? "border-foreground bg-foreground text-background"
                      : "border-input bg-background"
                  )}
                >
                  {active && (
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </span>
              </div>
              <div className="mt-4 flex h-[110px] items-center justify-center rounded border bg-background text-foreground">
                {previews[item.key]}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
