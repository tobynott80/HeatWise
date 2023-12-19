# HeatWise - Group 6 CM6311

![Badge](https://img.shields.io/badge/PlayWright_Tests-Passing-green)
[Test Status (Connect to VPN)](https://c21048229.gitpages.cardiff.ac.uk/cm6311-group-6/)

Heatwise is a project to visualise spatial-temporal heat demand across England and Wales, as gathered by The Centre for Integrated Renewable Energy Generation and Supply (CIREGS) at Cardiff University's School of Engineering. Details on how this data was gathered is available in [the research paper](https://www.nature.com/articles/s41597-022-01356-9)

## Wiki

Our [wiki](https://git.cardiff.ac.uk/c21048229/cm6311-group-6/-/wikis/home) is kept upto date with essential onboarding information and important links

## Onboarding

Please see the [onboarding page on our wiki](https://git.cardiff.ac.uk/c21048229/cm6311-group-6/-/wikis/Onboarding-Setup)

### Development Server

To run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Next.js will host the dev server at [http://localhost:3000](http://localhost:3000)

## Production Server

We deploy Heatwise to Vercel. Details on best practice for this is available [here](https://nextjs.org/learn-pages-router/basics/deploying-nextjs-app/deploy). If you wish to deploy elsewhere:

1. Ensure Node.js is installed and the project is cloned.
2. Run the build script once, which builds the production application in the .next folder

   ```bash
   npm run build
   ```

3. After building, the start script starts a Node.js server that supports hybrid pages, serving both statically generated and server-side rendered pages, and API Routes

   ```bash
   npm run start
   ```

## Tests

We use [Playwright](https://playwright.dev/) for testing our frontend and api endpoints. All tests are located in the `/tests` folder and are run on every commit via our GitLab CICD

To run tests locally, first install [playwright dependencies](https://playwright.dev/docs/browsers) and build the project:

```bash
npm run build
npx playwright install
```

And then run the tests. Playwright will automatically run the build server and genereate a HTML report once completed:

```bash
npx playwright test
```

Optional: When writing new tests, playwright's UI mode has better debugging tools:

```bash
npx playwright test --ui
```

## Authors

[Christopher Dixon](dixonc5@cardiff.ac.uk)

[Tobiah Nott](NottTJ@cardiff.ac.uk)

[Sanil Jalan](jalans1@cardiff.ac.uk)

[Antonio De Rosa](derosaa@cardiff.ac.uk)

[George Hampton](hamptong1@cardiff.ac.uk)

[Laurence Maynard](maynardl1@cardiff.ac.uk)
