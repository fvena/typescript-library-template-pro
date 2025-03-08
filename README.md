<br /><!-- markdownlint-disable-line -->

<p align="right">
  ⭐ &nbsp;&nbsp;<strong>to the project if you like it</strong> ↗️:
</p>

<p align="center">

  <h1 align="center">TypeScript Library Template Pro</h1>
  <div align="center">A simple, professional, and modern template for building and maintaining TypeScript libraries. This template integrates the best tools, workflows, and practices to help you focus on developing your library without worrying about setup.</div>
</p>

<br/>

<div align="center">

<!-- markdownlint-disable MD042 -->

![GitHub package.json version](https://img.shields.io/github/package-json/v/fvena/typescript-library-template-pro)
[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![Build Status](https://github.com/fvena/typescript-library-template-pro/workflows/CI%2FCD/badge.svg)]()

<!-- markdownlint-enable MD042 -->

</div>

<details open="true">
  <summary><strong>Table of Contents</strong></summary>
  <ol>
    <li>
      <a href="#-motivation">💡 Motivation</a>
    </li>
    <li><a href="#-features">🚀 Features</a></li>
    <li>
      <a href="#-getting-started">📦 Getting Started</a>
    </li>
    <li><a href="#-scripts-overview">📑 Scripts Overview</a></li>
    <li><a href="#-development-workflow">🔄 Development Workflow</a></li>
    <li><a href="#-releasing-a-version">📦 Releasing a Version</a></li>
    <li><a href="#-documentation">📖 Documentation</a></li>
    <li><a href="#-check-your-library">🧪 Check your library</a></li>
    <li>
      <a href="#-faqs">🧩 FAQs</a>
      <ul>
        <li><a href="#errors-when-publishing-the-package-to-npm">Errors when publishing the package to npm</a></li>
        <li><a href="#how-do-i-adapt-the-library-for-browser-usage">How do I adapt the library for browser usage?</a></li>
        <li><a href="#how-do-i-add-test-coverage">How do I add test coverage?</a></li>
        <li><a href="#how-do-i-disable-documentation">How do I disable documentation?</a></li>
        <li><a href="#how-can-i-set-up-github-issue-templates">How can I set up GitHub issue templates?</a></li>
      </ul>
    </li>
    <li><a href="#-contributing">🤝 Contributing</a></li>
  </ol>
</details>

## 💡 Motivation

Creating a TypeScript library from scratch can be a daunting task. Setting up tooling, ensuring code quality, and managing processes like testing, building, and releasing take a lot of effort before you even start writing the actual library code.

This template aims to simplify the process, providing you with a pre-configured, professional environment so you can focus on what really matters: developing your library.

### Why use this template?

- **Saves Time**: Start with everything you need to write, test, and publish a TypeScript library.
- **Proven Best Practices**: Includes widely accepted tools and workflows, ensuring high-quality code and reliable processes.
- **Scalable**: Designed for individual developers and small teams alike, with features like automated CI/CD pipelines, conventional commits, and documentation generation.
- **Customizable**: Easily extend or tweak configurations to match your project's needs.

## 🚀 Features

- **TypeScript First**: Provides full support for modern TypeScript features, ensuring strict typing.
- **Effortless Build**: Uses [Tsup](https://tsup.egoist.dev) for fast and simple builds. Supports both ESM and CommonJS.
- **Code Quality**: Preconfigured [ESLint](https://eslint.org) and [Prettier](https://prettier.io)ensure a clean, maintainable codebase.
- **Testing Ready**: Includes [Vitest](https://vitest.dev) for fast, reliable unit testing.
- **Conventional Commits**: Enforces commit message standards with [Commitlint](https://commitlint.js.org) and [Husky](https://typicode.github.io/husky/).
- **Documentation**: Powered by [Vitepress](https://vitepress.dev) for easy and interactive documentation.
- **Automated Releases**: Handles versioning and changelogs with [Release-it](https://github.com/release-it/release-it).
- **CI/CD Pipelines**: Configured with [GitHub Actions](https://github.com/features/actions) for linting, testing, publishing, and deploying docs.
- **Dependabot Integration**: Keeps your dependencies updated automatically.

## 📦 Getting Started

### 1. Create Your Repository

You can start using this template by clicking the green "Use this template" button or cloning the repository:

```bash
git clone https://github.com/fvena/typescript-library-template.git
cd typescript-library-template
```

### 2. Reset Git History

Reset the git history and initialize a fresh repository for your project:

**note**: This step is only necessary if you cloned this repository directly. If you used the template, the history is already reset.

```bash
rm -rf .git
git init
```

### 3. Remove `package-lock.json` and update packages

Update the packages to the latest versions and remove the `package-lock.json` file:

```bash
rm package-lock.json

npx npm-check-updates --interactive --format group
npm install // only if you have not updated the dependencies
```

### 4. Update Project Information

Make sure to update the following files:

- `package.json`: Update `name`, `version`, `description`, `author`, `repository`and other relevant fields.
- `LICENSE`: Update the copyright year and author information.
- `README.md`: Replace this file with this [`README_TEMPLATE.md`](https://gist.github.com/fvena/b53eed2c878f16d3d589f85b10ab3e5c) and update the content.
- `docs/.vitepress/config.ts`: update the base option in the VitePress configuration file with your repository name:

  ```typescript
  export default defineConfig({
    ...
    base: '/typescript-library-template-pro/',
  });
  ```

The next step is committing the changes:

```bash
git commit -am "chore: update project information and configuration"
```

Finally, push the changes to your repository:

```bash
git push
```

### 5. Get your GitHub personal access token if you don't have one

> You don't need to do this every time you create a new repository, only the first time. But you need save the token in a secure place, to use it in the next repositories.

1. Go to your GitHub account settings
1. Click on `Developer settings` > `Personal access tokens` > `Fine-grained tokens`
1. Click on `Generate new token (classic)`
1. Set the token name (ex: semantic-release)
1. Select the expiration date (no expiration date is recommended for personal projects)
1. In Repository access select `All repositories`
1. In Permissions select:

   - Commit statuses -> `Read & write`
   - Contents -> `Read & write`
   - Environments -> `Read-only`
   - Issues -> `Read & write`
   - Metadata -> `Read-only`
   - Pull requests -> `Read & write`
   - Secrets -> `Read-only`
   - Variables -> `Read-only`
   - Workflows -> `Read & write`

1. Click on `Generate token`
1. Copy the generated token and save it in a secure place. You won't be able to see it again.

### 6. Get your NPM token

1. Go to the [npm website](https://www.npmjs.com)
1. Log in to your account
1. In your avatar dropdown, click on `Access Tokens`
1. Click on `Generate New Token`
1. Set the token name (ex: library name)
1. Select `Automation` type and click on `Generate Token`
1. Copy the generated token

### 7. Add tokens to the GitHub repository secrets

To enable the CI/CD pipeline and publish your library to NPM, you'll need to set up a GitHub and NPM token:

1. Go to your GitHub repository
1. Click on `Settings` tab
1. Click on `Secrets and variables` > `Actions` in the left sidebar
1. Click on `New repository secret`
1. Use the `GH_TOKEN` and `NPM_TOKEN` as the secret name and paste the token value
1. Click on `Add secret`

### 8. Setup GitHub Pages for documentation

1. Go to your GitHub repository
1. Click on `Settings` tab
1. Click on `Pages` in the left sidebar
1. Select `GitHub Actions` in `Build and deployment` source

### 9. Protect the `main` branch

To ensure that the `main` branch remains stable, production-ready, and secure, you can set up branch protection rules:

1. Go to **Settings > Branches > Add Ruleset** in your repository.
1. Set the **Ruleset name** to `Protect main branch`.
1. In **Enforcement status**, select `Active`.
1. Add target `default` in **Target branches**.
1. Configure the following rules:
   - Enable **Restrict deletions** - this prevents the branch from being deleted.
   - Enable **Require linear history** - this ensures that the branch history is linear.
   - Enable **Require signed commits** - this ensures that all commits are signed.
   - Enable **Require a pull request before merging** - this ensures that all changes are reviewed.
     - Disable `Merge` from the list of allowed merge methods.
   - Enable **Require status checks to pass** - this ensures that all workflows pass.
     - Enable **Require branches to be up to date before merging** - this ensures that the branch is up to date.
     - Add the `lint`, `test` and `build` jobs to the list of required **status checks** and select `GitHub Actions` as the source.
   - Enable **Block force push** - this prevents force pushes to the branch.

With these rules in place:

- The `main` branch will only accept changes via Pull Requests that pass all workflows.
- Developers cannot push directly to `main`, reducing the risk of accidental changes.

## 📑 Scripts Overview

<!-- prettier-ignore -->
| Script             | Description                                                                 |
| ------------------ | --------------------------------------------------------------------------- |
| `dev`              | Starts `tsup` in watch mode for development. Automatically rebuilds on file changes. |
| `build`            | Bundles the library for production.                                         |
| `format`           | Format the code with Prettier.                                              |
| `typecheck`        | Check types with TypeScript.                                                |
| `lint`             | Lints the codebase with ESLint.                                             |
| `test`             | Run tests with Vitest.                                                      |
| `test:watch`       | Run tests in watch mode for development.                                    |
| `test:ui`          | Run tests with the Vitest UI.                                               |
| `test:coverage`    | Run tests with coverage reports.                                            |
| `check-exports`    | Check type accuracy for published packages.                                 |
| `semantic-release` | Release a new version, updates the changelog, and pushes tags to the repository. |
| `doc:dev`          | Starts a local server for VitePress documentation.                          |
| `doc:build`        | Build the documentation for production.                                     |
| `doc:preview`      | Preview the built documentation locally.                                    |

## 🔄 Development Workflow

This template follows a Git branching model based on the [Gitflow Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow). Here's how it works:

1. **Create branches for tasks** using descriptive prefixes such as:

   - `feature/` for new features (e.g., `feature/add-login-page`).
   - `fix/` for bug fixes (e.g., `fix/header-alignment`).
   - `chore/` for maintenance tasks (e.g., `chore/update-dependencies`).
   - `docs/` for documentation updates (e.g., `docs/update-readme`).
   - 'refactor/' for code refactoring (e.g., 'refactor/update-logic').
   - 'test/' for test updates (e.g., 'test/update-unit-tests').

     ```bash
     git checkout -b feature/new-feature
     git checkout -b fix/bug-fix
     ```

1. **Work on your branch**:

   - Make small, meaningful commits:

     ```bash
     git commit -m "Add input validation"
     git commit -m "Fix JSON serializer issue"
     ```

1. **Keep your branch updated**:

   - Before pushing or creating a PR, rebase your branch onto the latest `main`:

     ```bash
     git fetch origin
     git rebase origin/main
     ```

1. **Resolve conflicts if necessary**:

   - Edit conflicting files and mark them as resolved:

     ```bash
     git add conflicting-file.ts
     ```

   - Continue the rebase:

     ```bash
     git rebase --continue
     ```

1. **Push your changes**:

   - If your branch has already been pushed, use `--force-with-lease` to avoid merge commits:

     ```bash
     git push --force-with-lease
     ```

1. **Create a Pull Request (PR)**:

   - Open a PR from your branch to `main` on GitHub.
   - Ensure all automated checks pass.

1. **Rebase and Merge**: After the PR is approved, merge it into `main`:

   - `Rebase and merge` the PR to keep the commit history clean.
   - Delete the branch after merging both locally and remotely:

     ```bash
     git checkout main
     git pull
     git branch -d feature/new-feature
     ```

## 📦 Releasing a Version

Releases are automated using `semantic-release` and are triggered when a Pull Request is merged into the `main` branch. Here's what happens during a release:

1. **Commit Analysis:** Uses commit messages to determine the next semantic version (major, minor, or patch) based on the [Conventional Commits](https://www.conventionalcommits.org/) specification.
1. **Release Notes Generation:** Automatically generates release notes using the commit messages.
1. **Changelog Update:** Appends the new release information to the `CHANGELOG.md` file.
1. **Version Bump:** Updates the version in `package.json` and creates a new Git tag for the release.
1. **Publish to NPM:** Publishes the updated package to the NPM registry.
1. **Commit Changes:** Commits the updated `CHANGELOG.md` and `package.json` back to the repository
1. **Create GitHub Release:** Creates a release on GitHub with the release notes and associated artifacts.

## 📖 Documentation

This template includes a preconfigured docs folder powered by VitePress. To start writing documentation:

1. Edit or add markdown files in the docs folder.
1. Start a local preview with:

   ```bash
   npm run docs:dev
   ```

## 🧪 Check your library

### How do I check my library in a separate project?

> This method is ideal for testing your library in a completely separate project environment.

- Link your library to the global npm environment:

  1. Run `npm link` in your library's root directory.
  1. In the project where you want to use your library, run `npm link <your-library-name>`

- Unlink your library (optional):

  1. In the test project run `npm unlink <your-library-name>`.
  1. Run `npm unlink` in your library root.

- For more details, refer to the [npm link documentation](https://docs.npmjs.com/cli/v7/commands/npm-link).

### How do I check my library within the same repository?

> This approach is useful for quickly testing your library without setting up a separate project.

If you'd like to test your library directly within the same project, the best approach is to create a playground environment where you can link your library as a dependency. This allows you to test your library as if it were a published package.

### Generic Steps to Test a Library

1. **Create a testing environment**: Set up a playground folder in your project root (e.g., playground, examples, or similar).

1. **Configure the Testing Environment**: Depending on your library, set up the appropriate tooling in the playground (Vite, Vue, Vanilla, ...).

1. **Set the module type**: Update the `playground/package.json` to use ESM modules:

   ```json
   {
     "type": "module"
   }
   ```

1. **Add the playground as a workspace**: You need install all dependencies with the `npm install` command in the root folder, to pass the CI/CD pipeline.

   ```json
   {
     "workspaces": ["playground"]
   }
   ```

   **Important**: You need to build the library before running the linting and testing scripts. Update the `ci.yml` file to include the build step before running the tests:

   ```yaml
   - run: npm ci --ignore-scripts
   - run: npm run build
   - run: npm run lint
   - run: npm run typecheck
   ```

1. **Link the Library**: Add your library as a dependency in the `playground/package.json`. For example:

   ```json
   {
     "dependencies": {
       "typescript-library-template-pro": "file:../"
     }
   }
   ```

   **Important**: After editing the package.json, install the dependencies:

   ```bash
   npm install
   ```

### Example for a Vanilla TypeScript Library

This example demonstrates how to set up a playground to test a TypeScript library. Follow these steps:

1. **Create a Playground Folder**

   ```bash
   mkdir playground
   cd playground
   npm init -y
   ```

1. **Set the module type**: Update the `playground/package.json` to use ESM modules:

   ```json
   {
     "type": "module"
   }
   ```

1. **Link the Library**: Add your library as a dependency.

   ```json
   {
     "dependencies": {
       "typescript-library-template-pro": "file:../"
     }
   }
   ```

   Then, install the dependencies:

   ```bash
   npm install
   ```

1. **Install TypeScript and Watcher**

   ```bash
    npm install typescript tsc-watch --save-dev
   ```

1. **Update Scripts**: Add the following scripts to the `playground/package.json` file:

   ```json
   {
    ...
    "scripts": {
      "dev": "tsc-watch --noClear --onSuccess \"node ./dist/index.js\"",
      "build": "tsc"
    },
   }
   ```

1. **Test your library**: Add a file, `index.ts`, in the `playground` folder:

   ```typescript
   import { add } from "typescript-library-template-pro";

   console.log(add(1, 2));
   ```

1. **Run both projects**: Run the library and the playground in separate terminals in watch mode:

   ```bash
    npm run dev
   ```

### Example for a Browser Library

This example demonstrates how to set up a playground to test a library that works in a browser environment. Follow these steps:

1. **Create a Playground Using Vite**: Use the Vite assistant to scaffold a new project. In the root folder, run:

   ```bash
   npm create vite@latest playground
   ```

1. **Link the Library**: Add your library as a dependency in the `playground/package.json`:

   ```json
   {
     "dependencies": {
       "typescript-library-template-pro": "file:../"
     }
   }
   ```

   Then, install the dependencies:

   ```bash
    npm install
   ```

1. **Test your library**: Add library imports to the playground code, where you can test it:

   ```typescript
   import { add } from "typescript-library-template-pro";
   ```

1. **Run both projects**: Run the library and the playground in separate terminals in watch mode:

   ```bash
    npm run dev
   ```

## 🧩 FAQs

<details id="errors-when-publishing-the-package-to-npm">
  <summary><strong>Errors when publishing the package to npm</strong></summary>

- `npm ERR! code E403`: This error occurs when your email is not verified in npm or if the package name is already taken.

- `npm error code ENEEDAUTH`: This error occurs when the npm token is not set up correctly.

</details>

<details id="updating-dependencies">
  <summary><strong>How do I update dependencies?</strong></summary>

- To update dependencies, run the following command:

  ```bash
  npx npm-check-updates  --interactive --format group
  ```

  This will display a summary of packages that can be updated along with their current and latest versions. For more control, use the interactive mode to review and update dependencies one by one.

  - After updating the dependencies, commit the changes:

  ```
  git commit -m 'chore(dependencies): update dependencies to latest versions'
  ```

</details>

<details id="how-do-i-adapt-the-library-for-browser-usage">
  <summary><strong>How do I adapt the library for browser usage?</strong></summary>

> By default, this template is optimized for Node.js, but it can be easily adapted for browser environments. Follow these steps:

1. **Update TypeScript Configuration**: Add browser-specific settings to your `tsconfig.json` file:

   ````json
   {
     "compilerOptions": {
       "lib": ["ESNext", "DOM"],
       "target": "ESNext",
       "module": "ESNext",
       "moduleResolution": "node",
       "outDir": "./dist",
       "rootDir": "./src",
       "types": ["node"]
     }
   }

   ```json
   {
      "extends": "personal-style-guide/typescript/browser"
   }
   ````

1. **Configure EsLint**: If your library uses browser-specific APIs, update the ESLint configuration to include the browser environment:

   ```javascript
   import eslintBrowser from "personal-style-guide/eslint/browser";

   export default [...eslintBrowser];
   ```

1. **Configure Testing Environment**: If your library uses browser-specific APIs, set up `jsdom` as your testing environment:

   ```bash
    npm install jsdom --save-dev
   ```

   Then, configure Vitest to use `jsdom` in the `vitest.config.ts` file:

   ```typescript
   import { defineConfig } from "vitest/config";

   export default defineConfig({
     test: {
       environment: "jsdom",
       globals: true,
     },
   });
   ```

1. **Test in Browser Environment**: You can now test your library in a browser environment. For example, you can test the `localStorage` API:

   ```typescript
   test("localStorage works in browser environment", () => {
     localStorage.setItem("key", "value");
     expect(localStorage.getItem("key")).toBe("value");
   });
   ```

</details>

<details id="how-do-i-disable-documentation">
  <summary><strong>How do I disable documentation?</strong></summary>

- If you don't need documentation:

  1. Remove the `docs` folder and related `docs:*` scripts from `package.json`.
  1. Remove `vitepress` from the `devDependencies`.
  1. Delete the `.github/workflowsdeploy.yml` workflow.

</details>

<details id="how-can-i-set-up-github-issue-templates">
  <summary><strong>How can I set up GitHub issue templates?</strong></summary>

- You can find a complete set of customizable templates and settings in this [GitHub gist](https://gist.github.com/fvena/2876b888b9f9375683a866dbb6c52886). It includes:

  - Predefined issue templates for bugs, feature requests, and general questions.
  - A repository configuration file to set default options and labels.
  - Contribution guidelines (`CONTRIBUTING.md`) and a code of conduct (`CODE_OF_CONDUCT.md`).

- Simply copy the files to your repository's `.github/` directory, customize them as needed, and push them to GitHub. For more details, refer to the documentation in the gist.

</details>

<br>
If your question isn’t answered here, feel free to open an issue on our GitHub repository.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
1. Create a new branch (git checkout -b feature/my-feature).
1. Make your changes and write tests.
1. Commit your changes using a [conventional commit message](<(https://gist.github.com/fvena/9e42792ad951b47ad143ba7e4bfedb5a)>).
1. Push your branch and open a Pull Request.

## 📜 License

This template is licensed under the MIT License, which allows you to use, modify, and distribute the code freely, as long as the original license is included.

For more details, see the [LICENSE](./LICENSE) file included in this repository.

## 🌟 Star Support

Your ⭐️ helps others discover this template and motivates continued development and improvements.

Special thanks to the open-source community for inspiring and supporting this template.
