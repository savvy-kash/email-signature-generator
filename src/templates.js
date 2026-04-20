const escape = (str = "") =>
  String(str).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[c]));

const RICH_ALLOWED = new Set(["B", "I", "STRONG", "EM", "BR"]);

const sanitizeRich = (html = "") => {
  if (!html || typeof document === "undefined") return "";
  const root = document.createElement("div");
  root.innerHTML = String(html);
  const walk = (node) => {
    Array.from(node.childNodes).forEach((child) => {
      if (child.nodeType !== 1) return;
      if (!RICH_ALLOWED.has(child.tagName)) {
        const frag = document.createDocumentFragment();
        while (child.firstChild) frag.appendChild(child.firstChild);
        walk(frag);
        child.replaceWith(frag);
      } else {
        Array.from(child.attributes).forEach((a) => child.removeAttribute(a.name));
        walk(child);
      }
    });
  };
  walk(root);
  return root.innerHTML;
};

const linkify = (url) => {
  if (!url) return "";
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
};

const FONT_STACKS = {
  Arial: "Arial, Helvetica, sans-serif",
};

const FONT_SIZES = {
  Small: { name: 13, title: 15, meta: 12 },
  Medium: { name: 15, title: 17, meta: 13 },
  Large: { name: 17, title: 19, meta: 14 },
};

const socialEntries = (data) =>
  [
    { label: data.customSocialName || "Link", url: data.customSocialUrl },
    { label: "LinkedIn", url: data.linkedin },
    { label: "Twitter", url: data.twitter },
    { label: "Facebook", url: data.facebook },
  ].filter((s) => s.url);

const parseHex = (hex = "") => {
  const m = /^#?([a-f\d]{6})$/i.exec(hex.trim());
  if (!m) return null;
  const n = parseInt(m[1], 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};

const isDark = (hex = "") => {
  const rgb = parseHex(hex);
  if (!rgb) return false;
  const [r, g, b] = rgb;
  return (0.299 * r + 0.587 * g + 0.114 * b) < 128;
};

const toHex = (n) => n.toString(16).padStart(2, "0");

const soften = (hex, amt = 0.4) => {
  const rgb = parseHex(hex);
  if (!rgb) return hex;
  const target = isDark(hex) ? 255 : 0;
  const mix = (c) => Math.round(c + (target - c) * amt);
  return `#${rgb.map((c) => toHex(mix(c))).join("")}`;
};

const buildContext = (data, previewMode = "light") => {
  const dark = previewMode === "dark";
  const flip = (c, fallback) => (dark && isDark(c) ? "#ffffff" : c || fallback);
  const accent = flip(data.themeColor, "#0a0a0a");
  const text = flip(data.textColor, "#0a0a0a");
  const link = flip(data.linkColor, accent);
  const textSoft = soften(text);
  const linkSoft = soften(link);
  const fontStack = FONT_STACKS[data.font] || FONT_STACKS.Arial;
  const sizes = FONT_SIZES[data.fontSize] || FONT_SIZES.Medium;
  const showDivider = data.showDivider !== false;
  return { accent, text, link, textSoft, linkSoft, fontStack, sizes, showDivider };
};

const contactRow = (kind, value, ctx, isLink = false) => {
  if (!value) return "";
  const href = kind === "phone"
    ? `tel:${value.replace(/[^+\d]/g, "")}`
    : linkify(value);
  const inner = isLink
    ? `<a href="${escape(href)}" style="color:${ctx.link};text-decoration:underline;">${escape(value)}</a>`
    : `<span style="color:${ctx.text};">${escape(value)}</span>`;
  return `<div style="font-size:${ctx.sizes.meta}px;line-height:1.8;color:${ctx.text};">${inner}</div>`;
};

const socialsRow = (data, ctx, align = "left") => {
  const items = socialEntries(data);
  if (!items.length) return "";
  const sep = `&nbsp;&nbsp;<span style="color:${ctx.textSoft};">•</span>&nbsp;&nbsp;`;
  const html = items
    .map(
      (s) =>
        `<a href="${escape(linkify(s.url))}" style="color:${ctx.link};text-decoration:underline;">${escape(s.label)}</a>`
    )
    .join(sep);
  return `<div style="margin-top:2px;text-align:${align};font-size:${ctx.sizes.meta}px;line-height:1.5;">${html}</div>`;
};

const photoImg = (data, size = 80, radius = 50, placeholder = false) => {
  if (data.photo) {
    return `<img src="${escape(data.photo)}" width="${size}" height="${size}" alt="" style="display:block;border-radius:${radius}%;object-fit:cover;" />`;
  }
  if (!placeholder) return "";
  return `<div style="width:${size}px;height:${size}px;border-radius:${radius}%;background:rgba(127,127,127,0.12);border:1px dashed rgba(127,127,127,0.4);box-sizing:border-box;"></div>`;
};

const nameBlock = (data, ctx, align = "left") => {
  const nameLine = `<div style="font-size:${ctx.sizes.title}px;font-weight:700;color:${ctx.accent};line-height:1.2;">${escape(data.name || "Your Name")}</div>`;
  const hasTitle = Boolean(data.title);
  const hasCompany = Boolean(data.company);
  const dot = `&nbsp;&nbsp;<span style="color:#F59E0B;font-size:${ctx.sizes.title}px;line-height:1;vertical-align:-2px;">•</span>&nbsp;&nbsp;`;
  const titleCompany =
    hasTitle || hasCompany
      ? `<div style="font-size:${ctx.sizes.name}px;color:${ctx.text};line-height:1.5;">${
          hasTitle ? escape(data.title) : ""
        }${hasTitle && hasCompany ? dot : ""}${hasCompany ? escape(data.company) : ""}</div>`
      : "";
  const taglineHtml = sanitizeRich(data.companyTagline);
  const tagline = taglineHtml
    ? `<div style="font-size:${ctx.sizes.meta}px;color:${ctx.textSoft};line-height:1.5;">${taglineHtml}</div>`
    : "";
  return `<div style="text-align:${align};">${nameLine}${titleCompany}${tagline}</div>`;
};

const contactBlock = (data, ctx) => `
  ${contactRow("phone", data.phone, ctx)}
`;

const divider = (ctx) =>
  ctx.showDivider
    ? `<div style="color:${ctx.textSoft};font-size:${ctx.sizes.meta}px;line-height:1;margin:3px 0;overflow:hidden;white-space:nowrap;">${"─".repeat(40)}</div>`
    : "";

const wrap = (inner, ctx, extra = "") =>
  `<div style="font-family:${ctx.fontStack};width:300px;max-width:300px;${extra}">${inner}</div>`;

const leftAligned = (data, previewMode, placeholder) => {
  const ctx = buildContext(data, previewMode);
  const photo = photoImg(data, 80, 50, placeholder);
  const pad = data.tightPhoto ? 0 : 16;
  const cellWidth = data.tightPhoto ? 80 : 96;
  const photoCell = photo
    ? `<td style="padding-right:${pad}px;vertical-align:top;width:${cellWidth}px;" width="${cellWidth}">${photo}</td>`
    : "";
  return wrap(
    `<table cellpadding="0" cellspacing="0" border="0" width="300" style="width:300px;table-layout:fixed;border-collapse:collapse;">
      <tr>
        ${photoCell}
        <td style="vertical-align:top;word-wrap:break-word;overflow-wrap:break-word;">
          ${nameBlock(data, ctx, "left")}
          ${divider(ctx)}
          ${contactBlock(data, ctx)}
          ${socialsRow(data, ctx, "left")}
        </td>
      </tr>
    </table>`,
    ctx
  );
};

const minimal = (data, previewMode) => {
  const ctx = buildContext(data, previewMode);
  return wrap(
    `<div>
      ${nameBlock(data, ctx, "left")}
      ${divider(ctx)}
      ${contactBlock(data, ctx)}
      ${socialsRow(data, ctx, "left")}
    </div>`,
    ctx
  );
};

export const templates = {
  left: { label: "Left Aligned", render: leftAligned },
  minimal: { label: "Minimal", render: minimal },
};

export const FONT_OPTIONS = Object.keys(FONT_STACKS);
export const FONT_SIZE_OPTIONS = Object.keys(FONT_SIZES);
