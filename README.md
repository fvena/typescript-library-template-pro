<br />
<p align="right">
  ⭐ &nbsp;&nbsp;<strong>to the project if you like it</strong> ↗️:
</p>

<p align="center">

  <h1 align="center">TypeScript Library Template Pro</h1>
  <div align="center">A simple, professional, and modern template for building and maintaining TypeScript libraries. This template integrates the best tools, workflows, and practices to help you focus on developing your library without worrying about setup.</div>
</p>

<br/>

<div align="center">

![GitHub package.json version](https://img.shields.io/github/package-json/v/fvena/typescript-library-template-pro)
[![Status](https://img.shields.io/badge/status-active-success.svg)]()

</div>

<details open="true">
  <summary><strong>Table of Contents</strong></summary>
  <ol>
    <li>
      <a href="#💡-motivation">💡 Motivation</a>
    </li>
    <li><a href="#🚀-features">🚀 Features</a></li>
    <li>
      <a href="#📦-getting-started">📦 Getting Started</a>
    </li>
    <li><a href="#📑-scripts-overview">📑 Scripts Overview</a></li>
    <li><a href="#🔄-development-workflow">🔄 Development Workflow</a></li>
    <li><a href="#📦-releasing-a-version">📦 Releasing a Version</a></li>
    <li><a href="#📖-documentation">📖 Documentation</a></li>
    <li>
      <a href="#🧩-faqs">🧩 FAQs</a>
      <ul>
        <li><a href="#errors-when-publishing-the-package-to-npm">Errors when publishing the package to npm</a></li>
        <li><a href="#how-do-i-check-my-library-in-a-separate-project">How do I check my library in a separate project?</a></li>
        <li><a href="#how-do-i-check-my-library-within-the-same-repository">How do I check my library within the same repository?</a></li>
        <li><a href="#how-do-i-adapt-the-library-for-browser-usage">How do I adapt the library for browser usage?</a></li>
        <li><a href="#how-do-i-add-test-coverage">How do I add test coverage?</a></li>
        <li><a href="#how-do-i-disable-documentation">How do I disable documentation?</a></li>
        <li><a href="#how-can-i-set-up-github-issue-templates">How can I set up GitHub issue templates?</a></li>
      </ul>
    </li>
    <li><a href="#🤝-contributing">🤝 Contributing</a></li>
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

```bash
rm -rf .git
git init
```

### 3. Install dependencies

**Important**: install the dependencies after updating the repository.

```bash
npm install
```

### 4. Update Project Information

Make sure to update the following files:

- `package.json`: Update `name`, `version`, `description`, `author`, `repository`and other relevant fields.
- `LICENSE`: Update the copyright year and author information.
- `README.md`: Replace this file with `README_TEMPLATE.md` and update the content.
- `docs/.vitepress/config.ts`: update the base option in the VitePress configuration file with your repository name:

  ```typescript
  export default defineConfig({
    ...
    base: '/typescript-library-template-pro/',
  });
  ```

### 5. Setup NPM token

To publish your library to NPM, you'll need to set up an NPM token:

#### Get your NPM token

1. Go to the [npm website](https://www.npmjs.com)
1. Log in to your account
1. In your avatar dropdown, click on `Access Tokens`
1. Click on `Generate New Token`
1. Set the token name (ex: library name)
1. Select `Automation` type and click on `Generate Token`
1. Copy the generated token

#### Add the NPM token to the GitHub repository secrets

1. Go to your GitHub repository
1. Click on `Settings` tab
1. Click on `Secrets and variables` > `Actions` in the left sidebar
1. Click on `New repository secret`
1. Use the `NPM_TOKEN` as the secret name and paste the token value
1. Click on `Add secret`

### 6. Setup GitHub Pages for documentation

1. Go to your GitHub repository
1. Click on `Settings` tab
1. Click on `Pages` in the left sidebar
1. Select `GitHub Actions` in `Build and deployment` source

## 📑 Scripts Overview

| Script          | Description                                        |
| --------------- | -------------------------------------------------- |
| `dev`           | Starts `tsup` in watch mode for development. Automatically rebuilds on file changes.       |
| `build`         | Bundles the library for production.                |
| `format`        | Format the code with Prettier.                     |
| `typecheck`     | Check types with TypeScript.                       |
| `lint`          | Lints the codebase with ESLint.                    |
| `test`          | Run tests with Vitest.                             |
| `test:watch`    | Run tests in watch mode for development.           |
| `test:ui`       | Run tests with the Vitest UI.                      |
| `check-exports` | Check type accuracy for published packages.        |
| `release`       | Release a new version, updates the changelog, and pushes tags to the repository.                             |
| `doc:dev`       | Starts a local server for VitePress documentation. |
| `doc:build`     | Build the documentation for production.            |
| `doc:preview`   | Preview the built documentation locally.           |

## 🔄 Development Workflow

This template is set up with a single branch workflow. This means that you will make changes directly in the `main` branch. This approach works best for small projects and solo developers:

1. Make changes directly in the `main` branch.
1. Use [conventional commit messages](https://gist.github.com/fvena/9e42792ad951b47ad143ba7e4bfedb5a).
1. Push changes to trigger the CI pipeline for linting and testing.

For larger projects or teams, consider adopting a feature-branch workflow with pull requests for better collaboration.

## 📦 Releasing a Version

1. Run the release script locally to bump the version and generate a changelog. The release script will:

   - Uses commit messages to determine the semantic version bump.
   - Generate a changelog.
   - Create a new git tag.
   - Pushes changes and tags to the remote repository.

   ```bash
   npm run release
   ```

1. The CI/CD pipeline will publish the new version to NPM and deploy updated documentation to GitHub Pages.

## 📖 Documentation

This template includes a preconfigured docs folder powered by VitePress. To start writing documentation:

1. Edit or add markdown files in the docs folder.
2. Start a local preview with:

   ```bash
   npm run docs:dev
   ```

## 🧩 FAQs

<details id="errors-when-publishing-the-package-to-npm">
  <summary><strong>Errors when publishing the package to npm</strong></summary>

- `npm ERR! code E403`: This error occurs when your email is not verified in npm or if the package name is already taken.

- `npm error code ENEEDAUTH`: This error occurs when the npm token is not set up correctly.

</details>

<details id="how-do-i-check-my-library-in-a-separate-project">
  <summary><strong>How do I check my library in a separate project?</strong></summary>

> This method is ideal for testing your library in a completely separate project environment.

- Link your library to the global npm environment:

  1. Run `npm link` command in your library's root directory.
  1. In the project where you want to use your library, run `npm link <your-library-name>`

- Unlink your library (optional):

  1. In the test project run `npm unlink <your-library-name>`.
  1. Run `npm unlink` in your library root.

- For more details, refer to the [npm link documentation](https://docs.npmjs.com/cli/v7/commands/npm-link).

</details>

<details id="how-do-i-check-my-library-within-the-same-repository">
  <summary><strong>How do I check my library within the same repository?</strong></summary>

> This approach is useful for quickly testing your library without setting up a separate project.

- If you'd like to test your library directly within the same project, you can set up a local testing environment. Follow these steps:

  1. **Create a testing environment**: Inside your project root, create a playground folder for writing test code:

     ```bash
     mkdir playground
     ```

  1. **Initialize a local NPM project**: Navigate to the `playground` folder and set up an npm environment:

     ```bash
     cd playground
     npm init -y
     ```

  1. **Set the module type**: Update the `package.json` in `playground`folder to use ESM modules:

     ```json
     {
      ...
      "type": "module",
     }
     ```

  1. **Install TypeScript and Watcher**: Install TypeScript and `tsc-watch` as development dependencies to compile TypeScript files:

     ```bash
      npm install typescript tsc-watch --save-dev
      ```

  1. **Update Scripts**: Add the following scripts to the `package.json` file:

     ```json
     {
      ...
      "scripts": {
        "dev": "tsc-watch --noClear --onSuccess \"node ./dist/index.js\"",
        "build": "tsc"
      },
     }
     ```

  1. **Test your library**: Create a test file, such as `index.ts`, in the `playground` folderand import your library to run tests:

     ```typescript
     import { add } from 'typescript-library-template-pro'

     console.log(add(1, 2));
     ```

  1. **Add a Eslint Configuration**: If you want to lint the playground code, create an `eslint.config.js` file in the `playground` directory and extend the library's configuration:

     ```typescript
     import config from "../../eslint.config.js";

     export default [...config];
     ```

  1. **Run the Playground**: Start the TypeScript watcher to compile the code and run the test file:

     ```bash
      npm run dev
     ```

</details>

<details id="how-do-i-adapt-the-library-for-browser-usage">
  <summary><strong>How do I adapt the library for browser usage?</strong></summary>

  > By default, this template is optimized for Node.js, but it can be easily adapted for browser environments. Follow these steps:

  1. **Update TypeScript Configuration**: Add browser-specific settings to your `tsconfig.json` file by including the `dom` and `dom.iterable` libraries:

     ```json
     {
       "compilerOptions": {
         ...,
         "lib": ["es2022", "dom", "dom.iterable"]
       }
     }
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

<details id="how-do-i-add-test-coverage">
  <summary><strong>How do I add test coverage?</strong></summary>

1. **Install `c8`**: Vitest uses c8 to generate coverage reports. Install it as a development dependency:

   ```bash
   npm i -D @vitest/coverage-v8
   ```

1. **Run Tests with Coverage**: To generate coverage reports, use the --coverage flag when running Vitest. Add the following script to your `package.json`:

   ```json
   {
     "scripts": {
       "test:coverage": "vitest run --coverage"
     }
   }
   ```

</details>

<details id="how-do-i-disable-documentation">
  <summary><strong>How do I disable documentation?</strong></summary>

- If you don't need documentation:

  1. Remove the `docs` folder and related `docs:*` scripts from `package.json`.
  1. Remove `vitepress` from the `devDependencies`.
  1. Delete the `buildDocs` and `deployDocs` jobs from the `.github/workflows/ci.yml` file.

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
1. Commit your changes using a [conventional commit message]((https://gist.github.com/fvena/9e42792ad951b47ad143ba7e4bfedb5a)).
1. Push your branch and open a Pull Request.

## 📜 License

This template is licensed under the MIT License, which allows you to use, modify, and distribute the code freely, as long as the original license is included.

For more details, see the [LICENSE](./LICENSE) file included in this repository.

## 🌟 Star Support

Your ⭐️ helps others discover this template and motivates continued development and improvements.

Special thanks to the open-source community for inspiring and supporting this template.
