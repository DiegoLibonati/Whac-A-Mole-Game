# MoleRush

## Educational Purpose

This project was created primarily for **educational and learning purposes**.  
While it is well-structured and could technically be used in production, it is **not intended for commercialization**.  
The main goal is to explore and demonstrate best practices, patterns, and technologies in software development.

## Getting Started

1. Clone the repository
2. Navigate to the project folder
3. Execute: `npm install`
4. Execute: `npm run dev`

The application will open automatically at `http://localhost:3000`

## Description

**MoleRush** is a browser-based arcade game built on the classic Whac-A-Mole concept, reimagined with a rat as the target. The player is presented with a 5×5 grid of cells and has exactly 60 seconds to score as many points as possible by clicking on rats as they randomly pop up across the board.

Every 3 seconds a rat spawns in a random grid cell. The rat stays visible for 2 seconds before disappearing on its own — if the player clicks it before it vanishes, they earn one point and the rat is immediately removed. If they miss it, no point is awarded and the rat simply retreats. A live score counter and a countdown timer are always visible so the player knows exactly where they stand at any moment.

When the timer hits zero the game ends automatically: the grid disappears, the final score is displayed alongside a congratulatory message, and a **Play Again** button appears. Clicking it fully resets the board — score back to zero, timer back to 60 seconds, fresh grid — and a new round begins instantly without requiring a page reload.

Under the hood the game is written in pure vanilla TypeScript with zero runtime dependencies. State is managed through a custom generic pub/sub store (`Store<T>`) that notifies subscribers only when a value actually changes, keeping the UI in sync without any framework overhead. The DOM is built programmatically through thin factory functions (`GridItem`, `Mole`) and a helper (`fillGrid`) that populates the grid. The entire application lifecycle — spawning, timing, cleanup — is handled through native `setInterval` and `setTimeout` calls stored in the store so they can be reliably cleared on reset or game end.

## Technologies used

1. CSS3
2. Typescript
3. HTML5
4. Vite

## Libraries used

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

## Portfolio Link

[`https://www.diegolibonati.com.ar/#/project/mole-rush`](https://www.diegolibonati.com.ar/#/project/mole-rush)

## Testing

1. Navigate to the project folder
2. Execute: `npm test`

For coverage report:

```bash
npm run test:coverage
```

## Security

### npm audit

Check for vulnerabilities in dependencies:

```bash
npm audit
```

## Known Issues

None at the moment.
