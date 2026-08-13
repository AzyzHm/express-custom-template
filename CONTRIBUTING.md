# Contributing

Thanks for your interest in improving this template! Contributions are welcome.

## Getting Started

1. Fork the repository and clone your fork.
2. Install dependencies:
   ```
   npm install
   ```
3. Copy the example environment file and adjust as needed:
   ```
   cp .env.example .env
   ```
4. Create a branch for your change:
   ```
   git checkout -b feat/short-description
   ```

## Development Workflow

- Run the dev server: `npm run dev`
- Run the full test suite: `npm test`
- Run a single test tier: `npm run test:unit`, `npm run test:integration`, `npm run test:e2e`
- Run lint: `npm run lint` (or `npm run lint:fix` to auto-fix)
- Run formatting check: `npm run format:check` (or `npm run format` to auto-format)

A pre-commit hook (via Husky + lint-staged) will automatically lint and format
staged files before each commit.

## Commit Guidelines

- Keep commits focused and descriptive.
- Reference related issues in your commit message or PR description where relevant.

## Pull Requests

1. Ensure `npm run lint` and `npm test` both pass locally.
2. Update documentation (README, comments) if your change affects usage.
3. Fill out the PR template completely.
4. A maintainer will review your PR and may request changes before merging.

## Reporting Issues

Please use the provided issue templates (Bug report / Feature request) so we
have the context needed to help.

## Code of Conduct

By participating in this project, you agree to abide by the
[Code of Conduct](CODE_OF_CONDUCT.md).
