import FormField from "../FormField.jsx";
import ColorField from "../ColorField.jsx";
import StepHeader from "../StepHeader.jsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select.jsx";
import { FONT_OPTIONS, FONT_SIZE_OPTIONS } from "../../templates.js";

export default function StylesStep({ data, onChange }) {
  const set = (key) => (value) => onChange({ ...data, [key]: value });

  return (
    <div>
      <StepHeader
        step="4"
        title="Style your signature"
        subtitle="Set the accent, text, and link colors, plus font and size."
      />

      <div className="space-y-6">
        <FormField id="theme-color" label="Name color">
          <ColorField
            value={data.themeColor || "#0a0a0a"}
            onChange={set("themeColor")}
            placeholder="#0a0a0a"
          />
        </FormField>

        <FormField id="text-color" label="Text color">
          <ColorField
            value={data.textColor || "#0a0a0a"}
            onChange={set("textColor")}
            placeholder="#0a0a0a"
          />
        </FormField>

        <FormField id="link-color" label="Link color">
          <ColorField
            value={data.linkColor || data.themeColor || "#0a0a0a"}
            onChange={set("linkColor")}
            placeholder="#0a0a0a"
          />
        </FormField>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField id="font" label="Font">
            <Select value={data.font || "Geist"} onValueChange={set("font")}>
              <SelectTrigger id="font">
                <SelectValue placeholder="Select font" />
              </SelectTrigger>
              <SelectContent>
                {FONT_OPTIONS.map((opt) => (
                  <SelectItem key={opt} value={opt}>
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
          <FormField id="fontSize" label="Font size">
            <Select
              value={data.fontSize || "Medium"}
              onValueChange={set("fontSize")}
            >
              <SelectTrigger id="fontSize">
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                {FONT_SIZE_OPTIONS.map((opt) => (
                  <SelectItem key={opt} value={opt}>
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
        </div>
      </div>
    </div>
  );
}
