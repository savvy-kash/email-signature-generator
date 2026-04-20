import { Label } from "./ui/label.jsx";
import { cn } from "../lib/utils.js";

export default function FormField({
  id,
  label,
  hint,
  required,
  className,
  children,
}) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={id} className="text-xs font-medium text-muted-foreground">
        {label}
        {required && <span className="ml-0.5 text-foreground">*</span>}
      </Label>
      {children}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}
