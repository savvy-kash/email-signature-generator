import FormField from "../FormField.jsx";
import { Input } from "../ui/input.jsx";
import RichTextInput from "../RichTextInput.jsx";
import StepHeader from "../StepHeader.jsx";
import SwitchRow from "../SwitchRow.jsx";
import { Separator } from "../ui/separator.jsx";

const identity = [
  { key: "name", label: "Name", placeholder: "Jane Doe", required: true },
  { key: "title", label: "Title", placeholder: "Co-founder" },
  { key: "company", label: "Company/Department", placeholder: "Savvywise" },
];

const contact = [
  { key: "phone", label: "Office phone", placeholder: "+1 555 111 2222" },
];

const socials = [
  { key: "linkedin", label: "LinkedIn URL", placeholder: "linkedin.com/in/..." },
  { key: "facebook", label: "Facebook URL", placeholder: "facebook.com/..." },
  { key: "twitter", label: "Twitter / X URL", placeholder: "x.com/..." },
];

export default function DetailsStep({ data, onChange }) {
  const set = (key) => (e) => {
    const value = typeof e === "object" && e?.target ? e.target.value : e;
    onChange({ ...data, [key]: value });
  };

  return (
    <div>
      <StepHeader
        step="1"
        title="Enter your signature details"
        subtitle="* indicates a required field"
      />

      <div className="space-y-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {identity.map((f) => (
            <FormField
              key={f.key}
              id={f.key}
              label={f.label}
              required={f.required}
            >
              <Input
                id={f.key}
                value={data[f.key] || ""}
                onChange={set(f.key)}
                placeholder={f.placeholder}
              />
            </FormField>
          ))}
        </div>

        <FormField
          id="companyTagline"
          label="Company tagline"
          hint="Highlight text then click B or I to format just that portion."
        >
          <RichTextInput
            id="companyTagline"
            value={data.companyTagline || ""}
            onChange={set("companyTagline")}
            placeholder="AI for Tax Research (and more!)"
          />
        </FormField>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {contact.map((f) => (
            <FormField key={f.key} id={f.key} label={f.label}>
              <Input
                id={f.key}
                value={data[f.key] || ""}
                onChange={set(f.key)}
                placeholder={f.placeholder}
              />
            </FormField>
          ))}
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-sm font-semibold tracking-tight">
            Display settings
          </h3>
          <div className="space-y-3">
            <SwitchRow
              id="show-divider"
              label="Show divider line"
              description="Display a thin line above contact information"
              checked={data.showDivider !== false}
              onCheckedChange={(v) => set("showDivider")(v)}
            />
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <div className="flex items-baseline gap-2">
            <h3 className="text-sm font-semibold tracking-tight">
              Social media
            </h3>
            <span className="text-xs font-normal text-muted-foreground">
              Optional
            </span>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField id="customSocialName" label="Custom link label">
              <Input
                id="customSocialName"
                value={data.customSocialName || ""}
                onChange={set("customSocialName")}
                placeholder="Portfolio"
              />
            </FormField>
            <FormField id="customSocialUrl" label="Custom link URL">
              <Input
                id="customSocialUrl"
                value={data.customSocialUrl || ""}
                onChange={set("customSocialUrl")}
                placeholder="https://..."
              />
            </FormField>
            {socials.map((f) => (
              <FormField key={f.key} id={f.key} label={f.label}>
                <Input
                  id={f.key}
                  value={data[f.key] || ""}
                  onChange={set(f.key)}
                  placeholder={f.placeholder}
                />
              </FormField>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
