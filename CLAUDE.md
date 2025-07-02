# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TailorDS is a tool to build your own SCSS framework, empowering you to create, manage, and implement a Design System tailored to your project's needs. This is a TypeScript library that generates customizable SCSS frameworks.

## Key Architecture

- **Entry Point**: `src/index.ts` - Main module exports
- **Source Code**: `src/utilities.ts` - Core library functions
- **Testing**: Multi-environment testing setup with separate browser and terminal test workspaces
- **Playground**: Browser-based playground using Vite for testing library in browser environment
- **Documentation**: `docs/` directory with VitePress for documentation
- **Build System**: Tsup configured for browser compatibility with ESM/CommonJS dual output
- **Configuration**: Uses `personal-style-guide/browser` configs for browser-targeted development

## Development Commands

```bash
# Development with hot reload
npm run dev

# Build for production (creates dist/)
npm run build

# Type checking
npm run typecheck

# Linting
npm run lint

# Code formatting
npm run format

# Testing
npm test              # Run tests once
npm run test:watch    # Run tests in watch mode
npm run test:ui       # Run tests with UI
npm run test:coverage # Run tests with coverage

# Playground (browser testing)
npm run playground    # Start playground for browser testing

# Bundle size analysis
npm run size          # Check bundle size limits

# Documentation
npm run docs:dev      # Start docs dev server
npm run docs:build    # Build docs
npm run docs:preview  # Preview built docs

# Release (automated via semantic-release)
npm run semantic-release
```

## Code Quality & Standards

- **TypeScript**: Extends `personal-style-guide/typescript/browser` config
- **ESLint**: Uses `personal-style-guide/eslint/browser` ruleset
- **Prettier**: Configured via lint-staged for auto-formatting
- **Commitlint**: Enforces conventional commit messages with relaxed body length rules
- **Husky**: Git hooks for pre-commit quality checks
- **Size Limits**: Bundle size monitoring with 10kB limits for both ESM and CJS outputs

## Build Configuration

- **Tsup**: Builds both CommonJS and ESM formats with browser platform targeting
- **Output**: `dist/` directory with minified `.js`, `.cjs`, and `.d.ts` files
- **Entry**: Single entry point at `src/index.ts`
- **Features**: Tree shaking, source maps, TypeScript declarations
- **Target**: Browser-compatible builds with Node.js support

## Testing Setup

- **Framework**: Vitest with SWC for fast compilation
- **Multi-Environment**: Separate workspaces for browser (jsdom) and terminal (node) testing
- **Coverage**: V8 provider with text and lcov reports
- **Browser Tests**: `test/browser/**/*.test.ts` run in jsdom environment
- **Terminal Tests**: `test/core/**/*.test.ts` and `test/terminal/**/*.test.ts` run in Node.js
- **Mocking**: Auto-clear mocks enabled

## Release Process

- **Semantic Release**: Automated versioning based on conventional commits
- **Triggers**: Releases happen on main branch merges
- **Artifacts**: NPM package, GitHub release, changelog updates
- **Branches**: `main` is the release branch

## Workspace Configuration

- **Monorepo**: Uses npm workspaces with `playground` package
- **Playground**: Browser-based testing environment using Vite
- **Dependencies**: Playground links to main package via `"tailords": "*"`
- **Development**: Run `npm run playground` to test library in browser

## Documentation

- **VitePress**: Static site generator for documentation
- **Configuration**: `docs/.vitepress/config.ts` configured for `/tailords/` base path
- **Content**: Markdown files in `docs/` directory
- **Deployment**: Configured for GitHub Pages at `fvena.github.io/tailords`

## Common Development Workflow

1. Create feature branches with descriptive prefixes (`feature/`, `fix/`, `chore/`)
2. Make changes following conventional commit format
3. Test in both environments: `npm test` and `npm run playground`
4. Check bundle size: `npm run size`
5. Run full check: `npm run typecheck && npm run lint && npm test`
6. Create PR to main branch
7. Automated release happens on merge to main

## Important Notes

- This is a browser-first library for SCSS framework generation
- Use playground for interactive browser testing during development
- Bundle size is monitored and limited to 10kB for both formats
- Multi-environment testing ensures compatibility across Node.js and browser contexts
- Library exports are managed through `src/index.ts`
