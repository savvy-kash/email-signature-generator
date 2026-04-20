export default function StepHeader({ step, title, subtitle }) {
  return (
    <div className="mb-8 space-y-1.5">
      <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        Step {step}
      </div>
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      {subtitle && (
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      )}
    </div>
  );
}
