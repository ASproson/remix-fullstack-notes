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
