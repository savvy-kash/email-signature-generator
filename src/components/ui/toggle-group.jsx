import * as React from "react";
import { cn } from "../../lib/utils.js";

const ToggleGroup = React.forwardRef(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center gap-1 rounded-md border border-input bg-background p-1",
        className
      )}
      {...props}
    />
  )
);
ToggleGroup.displayName = "ToggleGroup";

const ToggleGroupItem = React.forwardRef(
  ({ className, active, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      data-state={active ? "on" : "off"}
      className={cn(
        "inline-flex h-7 items-center justify-center rounded-sm px-2.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-foreground data-[state=on]:text-background data-[state=on]:shadow-sm",
        className
      )}
      {...props}
    />
  )
);
ToggleGroupItem.displayName = "ToggleGroupItem";

export { ToggleGroup, ToggleGroupItem };
