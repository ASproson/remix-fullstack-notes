import type { LinksFunction } from "@remix-run/node";
import { Links, LiveReload, Scripts } from "@remix-run/react";
import faviconAssetUrl from "./assets/favicon.svg";
import fontStylesStyleSheetUrl from "./styles/font.css";
import tailwindStyleSheet from "./styles/tailwind.css";
import { Index } from "./routes";

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
    <html lang="en" className="h-full overflow-x-hidden">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Links />
      </head>
      <body className="flex h-full flex-col justify-between">
        <header className="container mx-auto py-6">
          <nav className="flex justify-between">
            <NavFooter />
          </nav>
        </header>

        <div className="flex-1">
          <Index />
        </div>

        <footer className="container mx-auto flex justify-between">
          <NavFooter />
        </footer>
        <div className="h-5" />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

const NavFooter = () => {
  return (
    <div>
      <div className="font-light">fullstack</div>
      <div className="font-bold">notes</div>
    </div>
  );
};
