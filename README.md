<div align="center">

# WEBCV ⁄ 001

**Write · See · PDF**

Type. See the printed sheet. Download. Nothing else.

<br/>

</div>

A tiny, fast resume builder that shows the **printed page while you type** — a live fidelity preview of the sheet you'll actually hand to a recruiter. No bloated dashboard, no templates maze. You write, you look, you fix, you export.

## Why

Most editors separate the messy form from the clean document. WEBCV collapses the distance: one screen, one page, zero surprises — what you see is what gets printed.

- **Live print fidelity** – the preview mirrors the final A4 sheet in real time
- **Just type** – content, not configuration
- **Instant PDF** – export the same page you've been looking at
- **Respects you** – reduced-motion aware, keyboard friendly, minimal chrome

## Stack

Built with the boring, reliable tools that ship fast and stay out of the way.

|               |                                           |
| ------------- | ----------------------------------------- |
| **Runtime**   | React 18 + TypeScript                     |
| **Framework** | Vite 6                                    |
| **Routing**   | TanStack Router                           |
| **Styling**   | Tailwind CSS v4 + hand-rolled CSS modules |
| **Motion**    | Motion (Spring · Scroll)                  |
| **Icons**     | react-icons                               |
| **Quality**   | Biome (lint + format) · Husky pre-commit  |
| **Deploy**    | Vercel + Speed Insights                   |

## Getting started

```bash
pnpm install
pnpm dev
```

Production build:

```bash
pnpm build
pnpm start
```

Quality gates:

```bash
pnpm check   # biome fix + format
```

## Project structure

```
src/
├── components/     # shared UI
├── pages/
│   ├── landing/    # marketing + sign-in experience
│   └── editor/     # the live resume editor
├── routes/         # TanStack Router file routes
├── hooks/          # session, motion, array-field logic
├── helpers/        # contrast, font-size, utils
└── constants.ts    # shared config
```

## License

Private — all rights reserved.
