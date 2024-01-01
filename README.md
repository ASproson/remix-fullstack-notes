# Fullstack Notes App

> [!NOTE]
> This is a work in progress

## Running Locally

```sh
git clone https://github.com/ASproson/remix-fullstack-notes.git
npm i
npm run dev
```

This starts the app in development mode and rebuilds assets on file changes

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `remix build`

- `build/`
- `public/build/`

### Packages used

- Tailwind
- Autoprefixer
- PostCSS

#### Tailwind

[Tailwind](https://tailwindcss.com/) is a package that enables the developer to add compact styling right into the `JSX` for the specific element that is being styled. Additionally, Tailwind will purge any unused CSS and rarely ships with a package larger than 15kb

#### Autoprefixer

[Autoprefixer](https://www.npmjs.com/package/autoprefixer) automatically adds vendor prefixes to our CSS rules so that our styling works across different browsers without any issue (especially older browser versions)

#### PostCSS

[PostCSS](https://postcss.org/) works hand-in-hand with Autoprefixer and allows us to write more maintainable and modular styles
