## Purpose of the `links` function

By using [`<Links />`](root.tsx) from Remix we gain the ability to insert links,
modules, and lots of other things into our `<head>` tag. Currently we insert our
Tailwind stylesheet, our fonts, and our custom SVG file

## Why we store the favicon in `app/assets`

Originally the favicon was stored in [`/public`](../public/), which worked
great. Every time we loaded the app the favicon was present and was stored in
the disk cache:

1. `chrome dev tools` >
2. `network` >
3. `favicon.svg` >
4. `Status Code: 🟢 200 OK (from disk cache)`

But what if we update or change the favicon? By default it gets stored for one
hour, but we want our new favicon immediately. To do this we moved our favicon
out of `/public` into [`/app/assets`](/app/assets). We then imported the favicon
into `root.tsx` and called it as part of our `links` function:

```TypeScript
export const links: LinksFunction = () => [
  ...,
  {
    rel: "icon",
    type: "image/svg+xml",
    href: faviconAssetUrl,
  },
  ...
];
```

Now, whenever we update the favicon it will be updated immediately due to
Remix's 'fingerprinting', by importing the module Remix can detect if and when
the import's values change. If a change is detected (the fingerprints don't
match), Remix will load our updated asset

When we come to build our app for production Remix will _automatically_ create a
public version of this favicon and store it in [`public`](../public/)
