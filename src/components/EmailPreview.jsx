import { Button } from "./ui/button.jsx";

const SunIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
  </svg>
);

const MoonIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

export default function EmailPreview({ html, mode, onModeChange }) {
  const dark = mode === "dark";
  const colors = dark
    ? {
        body: "#111111",
        chrome: "#1a1a1a",
        border: "#262626",
        text: "#fafafa",
        subtle: "#a1a1a1",
        placeholder: "#525252",
        bar: "#1f1f1f",
        pillBg: "#222437",
        pillText: "#a0a3ff",
      }
    : {
        body: "#ffffff",
        chrome: "#f6f7f8",
        border: "#e5e7eb",
        text: "#0a0a0a",
        subtle: "#737373",
        placeholder: "#9ca3af",
        bar: "#f1f3f5",
        pillBg: "#eef1ff",
        pillText: "#3b3f8f",
      };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between rounded-md border bg-card px-4 py-2.5 shadow-sm">
        <div className="text-sm font-semibold tracking-tight">
          Email preview
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onModeChange(dark ? "light" : "dark")}
          aria-label="Toggle preview mode"
        >
          {dark ? <MoonIcon /> : <SunIcon />}
        </Button>
      </div>

      <div
        className="overflow-hidden rounded-md border shadow-sm"
        style={{ borderColor: colors.border, background: colors.body }}
      >
        <div
          className="flex items-center gap-1.5 border-b px-3 py-2.5"
          style={{ borderColor: colors.border, background: colors.chrome }}
        >
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
        </div>
        <div className="p-6" style={{ color: colors.text }}>
          <div className="flex items-baseline gap-2 text-[13px]">
            <span style={{ color: colors.subtle }}>To:</span>
            <span
              className="inline-flex items-center rounded-full px-2 py-0.5 text-[12px]"
              style={{ background: colors.pillBg, color: colors.pillText }}
            >
              Your Recipient
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2 text-[13px]">
            <span style={{ color: colors.subtle }}>Subject:</span>
            <span style={{ color: colors.placeholder }}>
              Check out my new email signature
            </span>
          </div>
          <div className="mt-5 space-y-2">
            <div
              className="h-1.5 w-full rounded"
              style={{ background: colors.bar }}
            />
            <div
              className="h-1.5 w-[85%] rounded"
              style={{ background: colors.bar }}
            />
          </div>
          <div
            className="mt-6 border-t pt-6"
            style={{ borderColor: colors.border }}
          >
            <div dangerouslySetInnerHTML={{ __html: html }} />
          </div>
        </div>
      </div>
    </div>
  );
}
