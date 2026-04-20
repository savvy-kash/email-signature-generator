import { useState } from "react";
import { Button } from "./ui/button.jsx";

function stripTags(html) {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || "";
}

const CopyIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="9" y="9" width="13" height="13" rx="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

export default function PreviewActions({ html }) {
  const [copiedKind, setCopiedKind] = useState(null);

  const copyRich = async () => {
    try {
      const blob = new Blob([html], { type: "text/html" });
      const text = new Blob([stripTags(html)], { type: "text/plain" });
      await navigator.clipboard.write([
        new ClipboardItem({ "text/html": blob, "text/plain": text }),
      ]);
    } catch {
      await navigator.clipboard.writeText(html);
    }
    setCopiedKind("signature");
    setTimeout(() => setCopiedKind(null), 1500);
  };

  const copyHtml = async () => {
    await navigator.clipboard.writeText(html);
    setCopiedKind("html");
    setTimeout(() => setCopiedKind(null), 1500);
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Button onClick={copyRich}>
        <CopyIcon />
        {copiedKind === "signature" ? "Copied!" : "Copy signature"}
      </Button>
      <Button variant="outline" onClick={copyHtml}>
        <CopyIcon />
        {copiedKind === "html" ? "Copied HTML" : "Copy HTML"}
      </Button>
    </div>
  );
}
