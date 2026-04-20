import { Input } from "./ui/input.jsx";
import { cn } from "../lib/utils.js";

export default function ColorField({ value, onChange, placeholder }) {
  return (
    <div
      className={cn(
        "flex h-9 items-center gap-2 rounded-md border border-input bg-background pl-1.5 shadow-sm focus-within:ring-1 focus-within:ring-ring"
      )}
    >
      <input
        type="color"
        value={value || "#000000"}
        onChange={(e) => onChange(e.target.value)}
        className="h-6 w-8 cursor-pointer rounded"
      />
      <Input
        type="text"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-full border-0 bg-transparent px-2 shadow-none focus-visible:ring-0"
      />
    </div>
  );
}
