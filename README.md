# Email Signature Generator

A React + Vite app for building email signatures that render consistently across Gmail, Outlook, and Apple Mail. Live preview, one-click copy, light/dark simulation.

## Features

- Step-based editor: details, image, template, styles
- Rich-text tagline with inline bold/italic on selected text
- Custom colors for name, text, and links
- Dark-mode preview that simulates how the signature renders on dark backgrounds
- Fixed 300px width with table-based layout for Outlook compatibility
- Text-based divider (`─`) that inherits color naturally in dark-mode clients
- Copy-to-clipboard preserves formatting when pasted into any mail client

## Run locally

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

## Tech

React 19, Vite 8, Tailwind 3, shadcn UI primitives.
