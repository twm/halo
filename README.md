# Halo

A picture frame stock and cutlist calculator.

## Checkout

Clone this repository as usual.

Install [Git LFS](https://git-lfs.com/) and run `git lfs init`.

## Developing

Once you've installed dependencies with `npm install`, start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

## Testing

Run the unit tests with:

```bash
npm run test:unit
```

The integration tests use Playwright and can be run with:

```bash
npm run test:integration
```

To update screenshots, run:

```bash
npx playwright test -u
```

If the screenshots taken in CI don't match you can download the report by running:

```bash
just pr-playwright-report
```
