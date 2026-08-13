![Express Template Banner](public/banner.png)

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-20+-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Express-4-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Jest-tested-C21325?style=for-the-badge&logo=jest&logoColor=white" alt="Jest" />
  <img src="https://img.shields.io/badge/GitHub_Actions-CI-2088FF?style=for-the-badge&logo=githubactions&logoColor=white" alt="GitHub Actions" />
</p>

A minimal, well-structured, production-ready **Express** backend template with fully
typed, layered (routes → controllers → services → repositories → models),
test-covered, and CI-ready out of the box.

> This is a custom template made by **AzyzHm**.

## Features

- **Express** with a fully typed TypeScript codebase
- **MongoDB** via **Mongoose**, with a repository layer isolating the ORM from business logic
- **Layered architecture**: routes → controllers → services (business logic) → repositories (data access) → models
- **class-validator / class-transformer** DTOs for request validation
- **Joi**-validated environment variables, fail-fast on startup
- **Pino** structured logging (pretty-printed in development, JSON in production)
- **Centralized error handling** via a typed `AppError` hierarchy and Express error middleware
- **Full test suite**: unit, integration, and e2e tests in separate folders, backed by an
  isolated in-memory MongoDB instance (`mongodb-memory-server`), no external DB needed to run tests
- **GitHub Actions CI**: lint (ESLint + Prettier) + tests (all three tiers, with coverage) + build on every push/PR
- **Husky + lint-staged** pre-commit hook to keep the codebase clean
- **Dependabot** with grouped dependency updates
- **No authentication included** : kept minimal on purpose, so you can plug in whatever
  auth strategy fits your project (JWT, OAuth2, session-based, etc.)

## Project Structure

```
express-template/
├── .github/
│   ├── workflows/ci.yml        # CI: lint + test + build on push/PR
│   ├── ISSUE_TEMPLATE/         # Bug report & feature request templates
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── dependabot.yml          # Grouped dependency updates
├── src/
│   ├── server.ts                # Entry point: connects DB, starts HTTP server, graceful shutdown
│   ├── app.ts                   # Express app factory: middleware, routes, error handling
│   ├── config/                  # Env validation (Joi) and logger (Pino) setup
│   ├── db/                      # Mongoose connection helpers
│   ├── api/
│   │   └── v1/
│   │       ├── routes/          # Route definitions, mounted per resource
│   │       └── controllers/     # Request/response handling, no business logic
│   ├── dtos/                    # class-validator request DTOs
│   ├── services/                # Business logic layer, above the repository
│   ├── repositories/            # Data access layer, the only place touching Mongoose
│   ├── models/                  # Mongoose schemas/models
│   ├── middlewares/             # Validation, not-found, and centralized error middleware
│   └── exceptions/               # AppError hierarchy (BadRequest, NotFound, etc.)
├── tests/
│   ├── setup/                    # Shared test helpers: in-memory Mongo, env bootstrap
│   ├── unit/                     # Isolated logic tests (services), mocked repositories
│   ├── integration/               # Full HTTP-route tests against the in-memory test DB
│   └── e2e/                      # Multi-step scenario tests across several endpoints
├── public/                       # Static assets (banner.png generated separately)
├── .env.example
├── eslint.config.js              # Flat config using typescript-eslint
├── jest.config.js                # Three Jest "projects": unit / integration / e2e
├── tsconfig.json
└── package.json
```

## Getting Started

### 1. Clone and install dependencies

```
git clone https://github.com/AzyzHm/express-custom-template.git
cd express-custom-template
npm install
```

### 2. Configure environment variables

```
cp .env.example .env
# then edit .env with your local MONGO_URI, etc.
```

### 3. Run MongoDB

Make sure a MongoDB instance is running and reachable via the `MONGO_URI` in your `.env`
(e.g. a local install, Docker container, or Atlas cluster).

### 4. Run the app

```
npm run dev
```

The API will be available at `http://localhost:3000`, with a health check at
`http://localhost:3000/health`.

## Running Tests

Integration and e2e tests run against an isolated in-memory MongoDB instance
(`mongodb-memory-server`) no external database needed.

```
# All tests
npm test

# By type
npm run test:unit
npm run test:integration
npm run test:e2e

# With coverage (same as CI)
npm run test:cov
```

## Linting & Formatting

```
npm run lint
npm run format:check
```

`eslint` (via the unified `typescript-eslint` package) and `prettier` are also run
automatically on staged files before each commit via Husky + lint-staged.

## Continuous Integration

Every push and pull request to `main` triggers `.github/workflows/ci.yml`, which:

1. Installs dependencies
2. Runs lint checks (ESLint + Prettier)
3. Runs the full test suite (unit → integration → e2e) with coverage, uploaded as a build artifact
4. Builds the TypeScript project

## Adding a New Resource

A typical new resource (e.g. `Order`) touches these layers:

1. `src/models/order.model.ts`: Mongoose schema/model
2. `src/dtos/order.dto.ts` — `CreateOrderDto` / `UpdateOrderDto` with class-validator
3. `src/repositories/order.repository.ts`: data access methods
4. `src/services/order.service.ts`: business logic on top of the repository
5. `src/api/v1/controllers/order.controller.ts`: request handlers
6. `src/api/v1/routes/order.routes.ts`: route definitions, registered in `src/api/v1/routes/index.ts`
7. Add tests under `tests/unit`, `tests/integration`, and (if part of a bigger flow) `tests/e2e`

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for setup steps
and PR guidelines, and note that this project follows a [Code of Conduct](CODE_OF_CONDUCT.md).

## Security

Found a vulnerability? Please see [SECURITY.md](SECURITY.md) for how to report it responsibly.

## License

This project is licensed under the [MIT License](LICENSE).

---

Made with care by **AzyzHm**.
