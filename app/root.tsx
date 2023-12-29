import type { LinksFunction } from "@remix-run/node";
import { Links, LiveReload, Scripts } from "@remix-run/react";
import faviconAssetUrl from "./assets/favicon.svg";
import fontStylesStyleSheetUrl from "./styles/font.css";
import tailwindStyleSheet from "./styles/tailwind.css";

/**
 * @returns `<link>` tags to be inserted into the `<head>` on route transitions
 */
export const links: LinksFunction = () => [
  { rel: "stylesheet", href: tailwindStyleSheet },
  {
    rel: "icon",
    type: "image/svg+xml",
    href: faviconAssetUrl,
  },
  {
    rel: "stylesheet",
    href: fontStylesStyleSheetUrl,
  },
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Links />
      </head>
      <body>
        <h1>Hello world</h1>
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
