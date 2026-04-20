import { cn } from "../lib/utils.js";

const Icon = {
  details: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </svg>
  ),
  images: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="8.5" cy="9.5" r="1.5" />
      <path d="m21 15-5-5L5 21" />
    </svg>
  ),
  templates: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  styles: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2a10 10 0 1 0 10 10c0-1.7-1.3-3-3-3h-2a2 2 0 0 1-2-2V5a3 3 0 0 0-3-3Z" />
      <circle cx="7.5" cy="10.5" r="1" />
      <circle cx="12" cy="7.5" r="1" />
      <circle cx="16.5" cy="10.5" r="1" />
      <circle cx="8.5" cy="15.5" r="1" />
    </svg>
  ),
};

const tabs = [
  { id: "details", label: "Details" },
  { id: "images", label: "Images" },
  { id: "templates", label: "Templates" },
  { id: "styles", label: "Styles" },
];

export default function Sidebar({ current, onChange, footer }) {
  return (
    <aside className="flex w-[88px] shrink-0 flex-col items-center justify-between border-r bg-card py-3">
      <nav className="flex w-full flex-col items-stretch gap-1 px-2">
        {tabs.map((tab) => {
          const active = current === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange(tab.id)}
              className={cn(
                "flex h-[68px] w-full flex-col items-center justify-center gap-1.5 rounded-md px-2 text-[11px] font-medium transition-colors",
                active
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {Icon[tab.id]}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>
      {footer && <div className="px-2 pb-1">{footer}</div>}
    </aside>
  );
}
