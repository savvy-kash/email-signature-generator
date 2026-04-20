import { Switch } from "./ui/switch.jsx";
import { Label } from "./ui/label.jsx";

export default function SwitchRow({ id, label, description, checked, onCheckedChange }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-md border bg-card p-4">
      <div className="min-w-0 space-y-1">
        <Label htmlFor={id} className="text-sm font-medium">
          {label}
        </Label>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </div>
      <Switch id={id} checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
}
