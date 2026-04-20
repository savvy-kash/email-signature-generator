import { useEffect, useRef } from "react";
import { cn } from "../lib/utils.js";

export default function RichTextInput({ id, value, onChange, placeholder }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const incoming = value || "";
    if (el.innerHTML !== incoming) el.innerHTML = incoming;
  }, [value]);

  const emit = () => onChange(ref.current?.innerHTML || "");

  const exec = (cmd) => (e) => {
    e.preventDefault();
    if (document.activeElement !== ref.current) ref.current?.focus();
    document.execCommand(cmd);
    emit();
  };

  return (
    <div className="space-y-2">
      <div
        id={id}
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        onInput={emit}
        onBlur={emit}
        data-placeholder={placeholder}
        className={cn(
          "min-h-9 w-full rounded-md border border-input bg-transparent px-3 py-1.5 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
          "empty:before:pointer-events-none empty:before:text-muted-foreground empty:before:content-[attr(data-placeholder)]"
        )}
      />
      <div className="flex gap-1.5">
        <button
          type="button"
          onMouseDown={exec("bold")}
          aria-label="Bold selection"
          className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-input bg-background text-sm font-bold text-foreground transition-colors hover:bg-muted"
        >
          B
        </button>
        <button
          type="button"
          onMouseDown={exec("italic")}
          aria-label="Italicize selection"
          className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-input bg-background font-serif text-sm italic text-foreground transition-colors hover:bg-muted"
        >
          I
        </button>
      </div>
    </div>
  );
}
