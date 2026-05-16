# Mole Rush

## Educational Purpose

This project was created primarily for **educational and learning purposes**.  
While it is well-structured and could technically be used in production, it is **not intended for commercialization**.  
The main goal is to explore and demonstrate best practices, patterns, and technologies in software development.

## Description

**Mole Rush** is a browser-based arcade game built on the classic Whac-A-Mole concept, reimagined with a rat as the target. The player is presented with a 5×5 grid of cells and has exactly 60 seconds to score as many points as possible by clicking on rats as they randomly pop up across the board.

Every 3 seconds a rat spawns in a random grid cell. The rat stays visible for 2 seconds before disappearing on its own — if the player clicks it before it vanishes, they earn one point and the rat is immediately removed. If they miss it, no point is awarded and the rat simply retreats. A live score counter and a countdown timer are always visible so the player knows exactly where they stand at any moment.

When the timer hits zero the game ends automatically: the grid disappears, the final score is displayed alongside a congratulatory message, and a **Play Again** button appears. Clicking it fully resets the board — score back to zero, timer back to 60 seconds, fresh grid — and a new round begins instantly without requiring a page reload.

Under the hood the game is written in pure vanilla TypeScript with zero runtime dependencies. State is managed through a custom generic pub/sub store (`Store<T>`) that notifies subscribers only when a value actually changes, keeping the UI in sync without any framework overhead. The DOM is built programmatically through thin factory functions (`GridItem`, `Mole`) and a helper (`fillGrid`) that populates the grid. The entire application lifecycle — spawning, timing, cleanup — is handled through native `setInterval` and `setTimeout` calls stored in the store so they can be reliably cleared on reset or game end.

## Technologies used

1. CSS3
2. Typescript
3. HTML5
4. Vite

## Libraries used

The project ships with **zero runtime dependencies** — everything below is tooling used only during development.

#### Dependencies

```
No production dependencies - Pure Vanilla TypeScript
```

#### devDependencies

```
"@eslint/js": "^9.39.2"
"@testing-library/dom": "^10.4.0"
"@testing-library/jest-dom": "^6.6.3"
"@testing-library/user-event": "^14.5.2"
"@types/jest": "^30.0.0"
"@types/node": "^22.0.0"
"eslint": "^9.39.2"
"eslint-config-prettier": "^10.1.8"
"eslint-plugin-prettier": "^5.5.5"
"globals": "^17.3.0"
"husky": "^9.1.7"
"jest": "^30.3.0"
"jest-environment-jsdom": "^30.3.0"
"lint-staged": "^16.2.7"
"prettier": "^3.8.1"
"ts-jest": "^29.4.6"
"typescript": "^5.2.2"
"typescript-eslint": "^8.54.0"
"vite": "^7.1.6"
```

## Getting Started

**Requires Node.js 22** (see `.nvmrc`). With the toolchain above installed, follow these steps to run the game locally:

1. Clone the repository
2. Navigate to the project folder
3. Execute: `npm install`
4. Execute: `npm run dev`

The application will open automatically at `http://localhost:3000`.

## Testing

Once the app is running locally, you can verify the game logic with the test suite:

1. Navigate to the project folder
2. Execute: `npm test`

For coverage report:

```bash
npm run test:coverage
```

## Continuous Integration

The repository ships with a **GitHub Actions** pipeline defined in [`.github/workflows/ci.yml`](.github/workflows/ci.yml). It runs automatically on every `push` and `pull_request` targeting the `main` branch.

### Pipeline overview

```
                      ┌─── PR or push to main ───┐
                      ▼                          ▼
┌──────────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│   lint-and-audit     │─▶│      testing     │─▶│      build       │
│ eslint · tsc --noEmit│  │  jest (jsdom)    │  │  tsc + vite build│
└──────────────────────┘  └──────────────────┘  └──────────────────┘
```

All three jobs run on `ubuntu-latest` and resolve the Node.js version from [`.nvmrc`](.nvmrc) (Node 22), with the npm cache enabled via `actions/setup-node`.

### Validation jobs (run on every PR and push)

1. **`lint-and-audit`** — installs dependencies with `npm ci`, then runs `npm run lint` (ESLint) and `npm run type-check` (`tsc --noEmit`). Fails the pipeline on any lint error or type error.
2. **`testing`** — depends on `lint-and-audit`. Reinstalls dependencies and runs `npm run test`, which executes the full Jest suite under `jest-environment-jsdom`.
3. **`build`** — depends on `testing`. Reinstalls dependencies and runs `npm run build`, which type-checks the project and produces the production Vite bundle. Acts as a smoke test that the app still bundles cleanly.

Each job re-checks out the repo and reinstalls dependencies independently, so a failure in one stage cannot leak partial state into the next.

### Where the build outputs live

| Output                                    | Location                                                    |
| ----------------------------------------- | ----------------------------------------------------------- |
| Validation logs (lint, type-check, tests) | **Actions** tab on GitHub                                   |
| Production bundle (`dist/`)               | Ephemeral, inside the runner — not published as an artifact |

> **Note:** This pipeline does not produce GitHub Releases or upload distributable artifacts; it is a validation pipeline only. If you need to deploy, run `npm run build` locally and publish `dist/` to your host of choice.

### Running the same checks locally

```bash
# lint-and-audit
npm run lint
npm run type-check

# testing
npm run test

# build
npm run build
```

## Security Audit

In addition to the test suite, check the dependency tree for known vulnerabilities:

### npm audit

```bash
npm audit
```

## Known Issues

None at the moment.

## Portfolio Link

[`https://www.diegolibonati.com.ar/#/project/mole-rush`](https://www.diegolibonati.com.ar/#/project/mole-rush)
