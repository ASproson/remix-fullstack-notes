import type { LinksFunction } from "@remix-run/node";
import { Links, LiveReload, Scripts } from "@remix-run/react";

import stylesheet from "~/tailwind.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  {
    rel: "icon",
    type: "image/svg+xml",
    href: "/favicon.svg",
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
        <h1 className="text-red-500">hello world</h1>
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
