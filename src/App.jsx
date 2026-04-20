import { useMemo, useState } from "react";

import Sidebar from "./components/Sidebar.jsx";
import ThemeToggle from "./components/ThemeToggle.jsx";
import { Button } from "./components/ui/button.jsx";
import EmailPreview from "./components/EmailPreview.jsx";
import PreviewActions from "./components/PreviewActions.jsx";
import DetailsStep from "./components/steps/DetailsStep.jsx";
import ImagesStep from "./components/steps/ImagesStep.jsx";
import TemplatesStep from "./components/steps/TemplatesStep.jsx";
import StylesStep from "./components/steps/StylesStep.jsx";
import { templates } from "./templates.js";

const defaultData = {
  name: "Drew Pflaum",
  title: "Co-founder",
  company: "Savvywise",
  companyTagline: "AI for Tax Research (and more!)",
  phone: "+1 555 111 2222",
  linkedin: "linkedin.com/in/drew",
  twitter: "",
  facebook: "",
  customSocialName: "",
  customSocialUrl: "",
  photo: "",
  showDivider: true,
  themeColor: "#0a0a0a",
  textColor: "#0a0a0a",
  linkColor: "#0a0a0a",
  font: "Arial",
  fontSize: "Medium",
};

const tabOrder = ["details", "images", "templates", "styles"];

export default function App() {
  const [tab, setTab] = useState("details");
  const [templateKey, setTemplateKey] = useState("left");
  const [previewMode, setPreviewMode] = useState("light");
  const [data, setData] = useState(defaultData);

  const html = useMemo(
    () => templates[templateKey].render(data, "light", false),
    [templateKey, data]
  );

  const previewHtml = useMemo(
    () => templates[templateKey].render(data, previewMode, true),
    [templateKey, data, previewMode]
  );

  const idx = tabOrder.indexOf(tab);
  const prev = () => idx > 0 && setTab(tabOrder[idx - 1]);
  const next = () => idx < tabOrder.length - 1 && setTab(tabOrder[idx + 1]);

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar
        current={tab}
        onChange={setTab}
        footer={<ThemeToggle />}
      />

      <div className="grid min-h-screen flex-1 grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
        <section className="flex flex-col border-r px-8 py-10">
          <div className="mx-auto w-full max-w-xl flex-1">
            {tab === "details" && (
              <DetailsStep data={data} onChange={setData} />
            )}
            {tab === "images" && (
              <ImagesStep data={data} onChange={setData} />
            )}
            {tab === "templates" && (
              <TemplatesStep
                selected={templateKey}
                onSelect={setTemplateKey}
              />
            )}
            {tab === "styles" && (
              <StylesStep data={data} onChange={setData} />
            )}
          </div>

          <div className="mx-auto mt-10 flex w-full max-w-xl items-center justify-between">
            <Button variant="outline" onClick={prev} disabled={idx === 0}>
              Previous
            </Button>
            {idx < tabOrder.length - 1 ? (
              <Button onClick={next}>Next</Button>
            ) : (
              <span className="text-xs text-muted-foreground">
                You're all set — copy your signature →
              </span>
            )}
          </div>
        </section>

        <section className="flex flex-col gap-6 bg-muted/40 px-8 py-10">
          <EmailPreview
            html={previewHtml}
            mode={previewMode}
            onModeChange={setPreviewMode}
          />
          <PreviewActions html={html} />
        </section>
      </div>
    </div>
  );
}
