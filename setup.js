/**
 * Template Setup Script
 *
 * This script automates the configuration of the TypeScript library template.
 * It updates package information, repository URLs, documentation settings,
 * and playground configuration without requiring any third-party dependencies.
 *
 * The script will automatically delete itself after completion.
 */

import { exec, execSync } from "node:child_process";
import { promisify } from "node:util";
import { promises as fs } from "node:fs";
import { createInterface } from "node:readline";
import path from "node:path";

const execAsync = promisify(exec);

// Clear the console
process.stdout.write("\u001Bc");

// Create readline interface for user input
const readline = createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Promisify readline question method
const question = (query, defaultValue = "", info = "", required = false) =>
  new Promise((resolve) => {
    const baseQuery = `   • ${query.replace(/:$/, "")}`;
    const defaultValueText = defaultValue ? ` ${DIM}(${defaultValue})${NC}` : "";
    const infoText = info ? ` ${DIM}(${info})${NC}` : "";
    const requiredText = required ? ` ${RED}(required)${NC}` : "";

    const formattedQuery = `${baseQuery}${infoText}${defaultValueText}${requiredText}: `;

    readline.question(formattedQuery, (answer) => {
      if (answer === "" && defaultValue === "") {
        process.stdout.write(`\u001B[1A\u001B[2K`);
        resolve(question(query, defaultValue, info, true)); // Ask again
      } else {
        const value = answer === "" ? defaultValue : answer;
        process.stdout.write(`\u001B[1A\u001B[2K\r${baseQuery}: ${GREEN}${value}${NC}\n`);
        resolve(value);
      }
    });
  });

// Function to confirm a question
const confirm = (query, defaultValue = true, info = "") =>
  new Promise((resolve) => {
    const baseQuery = `   • ${query.replace(/:$/, "")}`;
    const infoText = info ? ` ${DIM}(${info})${NC}` : "";
    const options = defaultValue ? `${DIM}[Y/n]${NC}` : `${DIM}[y/N]${NC}`;
    const formattedQuery = `${baseQuery}${infoText} ${options} `;

    readline.question(formattedQuery, (answer) => {
      const result = answer.toLowerCase() !== "n" && answer.toLowerCase() !== "no" ? true : false;
      process.stdout.write(
        `\u001B[1A\u001B[2K\r${baseQuery} ${GREEN}${result ? "Yes" : "No"}${NC}\n`,
      );
      resolve(result);
    });
  });

// Function to display an interactive selector
const select = async (query, options, defaultKey) => {
  return new Promise((resolve) => {
    const baseQuery = `   • ${query.replace(/:$/, "")}`;

    // Get keys and labels
    const keys = Object.keys(options);
    const labels = Object.values(options);

    // Set default index
    let selectedIndex = defaultKey ? keys.indexOf(defaultKey) : 0;
    if (selectedIndex < 0) selectedIndex = 0;

    // Original stdin settings to restore later
    const stdinIsRaw = process.stdin.isRaw;
    const stdinIsPaused = process.stdin.isPaused();

    // Function to render options
    const renderOptions = (firstRender = false) => {
      if (!firstRender) {
        // Move cursor up to the first line (question + number of options)
        process.stdout.write(`\u001B[${labels.length + 1}A\r`);
      }

      // Clear all lines from cursor down
      process.stdout.write("\u001B[J");

      // Show question
      process.stdout.write(`${baseQuery}\n`);

      // Show options
      for (const [index, label] of labels.entries()) {
        const indicator = index === selectedIndex ? ">" : " ";
        const highlight = index === selectedIndex ? CYAN : "";
        process.stdout.write(`     ${highlight}${indicator} ${label}${NC}\n`);
      }

      // Keep cursor at the start of the line after options
      process.stdout.write("\r");
    };

    // Create a flag to ensure cleanup happens only once
    let isCleanedUp = false;

    // Comprehensive cleanup function
    const cleanup = () => {
      if (isCleanedUp) return;
      isCleanedUp = true;

      // Restore stdin to original state
      if (process.stdin.isTTY) {
        if (stdinIsRaw !== process.stdin.isRaw) {
          process.stdin.setRawMode(stdinIsRaw);
        }

        if (stdinIsPaused && !process.stdin.isPaused()) {
          process.stdin.pause();
        } else if (!stdinIsPaused && process.stdin.isPaused()) {
          process.stdin.resume();
        }
      }

      // Remove all listeners we added
      process.stdin.removeListener("data", keyHandler);

      // Show cursor if it was hidden
      process.stdout.write("\u001B[?25h");
    };

    // Key handler function
    const keyHandler = (data) => {
      const key = data.toString();

      // Prevent any output for arrow keys at boundaries
      if (
        (key === "\u001B[A" && selectedIndex === 0) ||
        (key === "\u001B[B" && selectedIndex === labels.length - 1)
      ) {
        // Clear any potential character output
        process.stdout.write("\r\u001B[K");
        return;
      }

      switch (key) {
        case "\r":
        case "\n": {
          // Enter
          // Move cursor up to the start of our content
          process.stdout.write(`\u001B[${labels.length + 2}A\r`);
          // Clear everything
          process.stdout.write("\u001B[J");
          // Show final result
          process.stdout.write(`${baseQuery}: ${GREEN}${labels[selectedIndex]}${NC}\n`);

          // Clean up and resolve
          cleanup();
          resolve(keys[selectedIndex]);

          break;
        }

        case "\u0003": {
          // Ctrl+C
          cleanup();
          throw new Error("User aborted setup");
        }

        case "\u001B[A": {
          // Up arrow
          if (selectedIndex > 0) {
            selectedIndex--;
            renderOptions();
          }
          break;
        }

        case "\u001B[B": {
          // Down arrow
          if (selectedIndex < labels.length - 1) {
            selectedIndex++;
            renderOptions();
          }
          break;
        }

        default: {
          // Clear any unwanted character output
          process.stdout.write("\r\u001B[K");
          break;
        }
      }
    };

    // Setup
    if (process.stdin.isTTY) {
      // Save original state
      process.stdin.setRawMode(true);
    }

    // Initial render
    renderOptions(true);

    // Add listener with 'once: false' to ensure it stays active
    process.stdin.on("data", keyHandler);

    // Safety cleanup if process is about to exit
    process.on("beforeExit", cleanup);
  });
};

// Define ANSI colors
const RED = "\u001B[0;31m";
const GREEN = "\u001B[0;32m";
const YELLOW = "\u001B[1;33m";
const CYAN = "\u001B[1;36m";
const DIM = "\u001B[2m";
const NC = "\u001B[0m"; // Color reset
const UNDERLINE = "\u001B[4m";
const RESET = "\u001B[0m";

/**
 * Print a message with color to the console
 * @param {string} color - ANSI color code
 * @param {string} message - Message to print
 * @param {boolean} newLine - Whether to add a new line after the message
 */
function printColored(color, message, newLine = true) {
  process.stdout.write(`${color}${message}${NC}${newLine ? "\n" : ""}`);
}

/**
 * Create a spinner for loading indication
 * @param {Object} options - Options for the spinner
 * @param {string} options.text - Text to display with the spinner
 * @param {string} options.color - Color of the spinner
 * @param {number} options.interval - Interval for spinner animation
 */
function createSpinner({ color = YELLOW, interval = 80, text = "" } = {}) {
  const frames = ["◐", "◓", "◑", "◒"];
  let index = 0;
  let startTime = Date.now();
  let intervalId;

  const start = () => {
    intervalId = setInterval(() => {
      const frame = frames[(index = (index + 1) % frames.length)];
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      process.stdout.write(`\r   ${color}${frame} ${text}... ${DIM}(${elapsed}s)${NC}      `);
    }, interval);
  };

  const stop = (finalMessage) => {
    clearInterval(intervalId);
    const duration = Math.floor((Date.now() - startTime) / 1000);
    process.stdout.write(`\r   ${GREEN}✔${NC} ${finalMessage} ${DIM}(${duration}s)${NC}     \n`);
  };

  const fail = (errorMessage) => {
    clearInterval(intervalId);
    const duration = Math.floor((Date.now() - startTime) / 1000);
    process.stdout.write(`\r   ${RED}! ${errorMessage} ${DIM}(${duration}s)${NC}      \n`);
  };

  return { fail, start, stop };
}

/**
 * Run a task with progress indication
 * @param {string} titleLoading - Title for loading spinner
 * @param {string} titleSuccess - Title for success message
 * @param {Function} task - Task to be executed
 */
async function runTask(titleLoading, titleSuccess, task) {
  const spinner = createSpinner({ text: titleLoading });

  spinner.start();

  try {
    await task();
    spinner.stop(titleSuccess);
    return true;
  } catch (error) {
    spinner.fail(`${titleLoading}... [ERROR]`);
    process.stdout.write(`\r   ${RED}  ${error.message}\n`);
    return false;
  }
}

/**
 * Main setup function
 */
async function setup() {
  try {
    console.log(`${CYAN}
┌─────────────────────────────────────────────────────────────┐
│ TypeScript Library Template Setup                           │
└─────────────────────────────────────────────────────────────┘${NC}`);

    // Get information from Git if available
    const gitInfo = getGitInfo();

    // Collect information from user
    const libraryInfo = await collectLibraryInfo(gitInfo);

    printColored(CYAN, "\n\n🔧 Updating project files...\n");

    // Update package.json
    await runTask("Updating package.json", "Updated package.json", async () => {
      await updatePackageJson(libraryInfo);
    });

    // Update LICENSE
    await runTask("Updating LICENSE", "Updated LICENSE", async () => {
      await updateLicense(libraryInfo);
    });

    // Update VitePress config
    await (libraryInfo.includeVitePress
      ? runTask("Updating VitePress configuration", "Updated VitePress configuration", async () => {
          await updateVitePressConfig(libraryInfo);
        })
      : runTask("Removing VitePress documentation", "Removed VitePress documentation", async () => {
          await removeVitePress();
        }));

    // Update playground
    await runTask("Updating playground", "Updated playground", async () => {
      await updatePlaygroundTerminal(libraryInfo);
      await updatePlaygroundBrowser(libraryInfo);
    });

    // Clean README
    await runTask("Creating README.md", "Created README.md", async () => {
      await cleanReadme(libraryInfo);
    });

    // Update dependencies
    await runTask(
      "Updating & installing dependencies",
      "Updated & installed dependencies",
      async () => {
        await updateDependencies();
      },
    );

    // Configure browser support, if "both" is selected, nothing will be removed
    if (libraryInfo.environment === "node") {
      await runTask("Removing browser support", "Removed browser support", async () => {
        await removeBrowserSupport();
      });
    } else if (libraryInfo.environment === "browser") {
      await runTask("Removing node support", "Removed node support", async () => {
        await removeNodeSupport();
      });
    }

    // Publish library
    if (libraryInfo.publishLib) {
      await runTask("Publishing npm library", "Published npm library", async () => {
        await publishLibrary();
      });
    }

    // Commit changes
    if (libraryInfo.commitChanges) {
      await runTask("Committing changes", "Committed changes", async () => {
        await commitChanges();
      });
    }

    // Self-destruct script
    await runTask("Cleaning up setup script", "Cleaned up setup script", async () => {
      await selfDestruct();
    });

    // Success message
    printColored(GREEN, "\n   Setup completed successfully!");

    // Display next steps
    printColored(CYAN, "\n\n🚀 Next steps:");

    printColored(DIM, "\n   Finish setup\n");

    let stepCounter = 1;

    if (libraryInfo.includeVitePress) {
      console.log(
        `   ${stepCounter++}. Configure GitHub pages → ${UNDERLINE}https://shorturl.at/xuPq3${RESET}`,
      );
    }
    console.log(
      `   ${stepCounter++}. Configure Tokens       → ${UNDERLINE}https://shorturl.at/XvwKS${RESET}`,
    );
    if (!libraryInfo.publishLib) {
      console.log(`   ${stepCounter++}. Publish to npm         → npm publish`);
    }
    if (!libraryInfo.commitChanges) {
      console.log(
        `   ${stepCounter++}. Commit changes         → git commit -m "feat: update project information and configuration"`,
      );
    }
    console.log(`   ${stepCounter++}. Push to GitHub         → git push origin main`);
    if (libraryInfo.includeVitePress) {
      console.log(
        `   ${stepCounter++}. View online docs       → ${UNDERLINE}https://${libraryInfo.userName}.github.io/${libraryInfo.name}${RESET}`,
      );
    }

    printColored(DIM, "\n   Daily workflow\n");

    console.log(`   - Start development       → npm run dev`);
    console.log(`   - Test your library       → npm test`);
    console.log(`   - Try the playground      → npm run playground`);
    if (libraryInfo.includeVitePress) {
      console.log(`   - Preview docs            → npm run docs:dev\n`);
    }
    printColored(CYAN, "✨ Happy coding!\n");

    // Close readline interface
    readline.close();
  } catch (error) {
    printColored(RED, "\n[!] Setup failed: " + error.message);
    throw error;
  }
}

/**
 * Try to get information from Git configuration
 */
function getGitInfo() {
  try {
    const gitInfo = {
      author: "",
      email: "",
      repoName: "",
      repository: "",
      userName: "",
    };

    // Get user name and email from git config
    try {
      gitInfo.author = execSync("git config user.name").toString().trim();
      gitInfo.email = execSync("git config user.email").toString().trim();
    } catch {
      // Git user info not available, will prompt user
    }

    // Try to get repository URL from git remote
    try {
      const remoteUrl = execSync("git remote get-url origin").toString().trim();
      gitInfo.repository = remoteUrl;

      // Extract repo name from URL
      // Handle different formats: https://github.com/user/repo.git or git@github.com:user/repo.git
      const match = remoteUrl.match(/github\.com[/:](.*?)(\.git)?$/);

      if (match && match[1]) {
        const parts = match[1].split("/");
        gitInfo.userName = parts[0];
        gitInfo.repoName = parts.pop();
      }
    } catch {
      // Git remote info not available, will prompt user
    }

    return gitInfo;
  } catch {
    // Git not available or not initialized
    return { author: "", email: "", repoName: "", repository: "", userName: "" };
  }
}

/**
 * Collect library information from user
 */
async function collectLibraryInfo(gitInfo) {
  const info = {
    author: gitInfo.author || "",
    bugs: "",
    commitChanges: true,
    description: "",
    email: gitInfo.email || "",
    environment: "both",
    homepage: "",
    includeVitePress: true,
    keywords: [],
    license: "MIT",
    name: "",
    publishLib: true,
    repoName: gitInfo.repoName || path.basename(process.cwd()),
    repository: gitInfo.repository || "",
    userName: gitInfo.userName || "",
    year: new Date().getFullYear(),
  };

  printColored(CYAN, "\n📦 Please provide information about your library:\n");

  printColored(DIM, "   Basic Project Information\n");

  // Library name
  info.name = await question(`Library name:`, info.repoName);

  // Package description
  info.description = await question("Library description:");

  // Keywords
  const keywordsInput = await question("Keywords", "", "comma separated");
  info.keywords = keywordsInput
    .split(",")
    .map((k) => k.trim())
    .filter(Boolean);

  printColored(DIM, "\n   Author Details\n");

  // Author name
  info.author = await question(`Author name:`, info.author);

  // Author email
  info.email = await question(`Author email:`, info.email);

  // GitHub username
  if (!info.userName) {
    info.userName = await question(`GitHub username:`, gitInfo.userName);
  }

  // Repository, homepage and bugs URL
  if (!info.repository) {
    info.repository = await question(`Repository URL:`);
  }
  info.homepage = `https://github.com/${info.userName}/${info.repoName}#readme`;
  info.bugs = `https://github.com/${info.userName}/${info.repoName}/issues`;

  // Year for license
  info.year = new Date().getFullYear().toString();

  printColored(DIM, "\n   Configuration & Features\n");

  // Ask for supported environments
  const environmentOptions = {
    both: "Node.js and browser",
    browser: "Browser only",
    node: "Node.js only",
  };

  info.environment = await select(`Supported environments`, environmentOptions, "both");

  // VitePress Documentation
  info.includeVitePress = await confirm(`Include VitePress documentation?`);

  // Publish library
  info.publishLib = await confirm(
    `Publish library to npm?`,
    true,
    `Verifies name availability and prevents CI errors`,
  );

  // Commit changes
  info.commitChanges = await confirm(
    `Commit changes?`,
    true,
    `Initial commit with updated configuration`,
  );

  return info;
}

/**
 * Update package.json with the collected information
 */
async function updatePackageJson(info) {
  try {
    const packageJsonPath = "./package.json";
    const packageJson = JSON.parse(await fs.readFile(packageJsonPath, "utf8"));

    // Update package.json fields
    packageJson.name = info.name;
    packageJson.description = info.description;
    packageJson.keywords = info.keywords;

    // Update author field with name and email
    packageJson.author = info.author + (info.email ? ` <${info.email}>` : "");

    // Update repository, homepage, and bugs URLs
    packageJson.homepage = info.homepage;

    if (typeof packageJson.repository === "object") {
      packageJson.repository.url = info.repository.startsWith("git+")
        ? info.repository
        : `git+${info.repository}`;
    } else {
      packageJson.repository = {
        type: "git",
        url: info.repository.startsWith("git+") ? info.repository : `git+${info.repository}`,
      };
    }

    packageJson.bugs = {
      url: info.bugs,
    };

    // Write updated package.json
    await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, undefined, 2) + "\n", "utf8");
  } catch (error) {
    throw new Error(`Failed to update package.json: ${error.message}`);
  }
}

/**
 * Update LICENSE file with year and author
 */
async function updateLicense(info) {
  try {
    const licensePath = "./LICENSE";
    let licenseContent = await fs.readFile(licensePath, "utf8");

    // Update year and author in license
    licenseContent = licenseContent.replace(
      /Copyright \(c\) \d+ .*$/m,
      `Copyright (c) ${info.year} ${info.author}`,
    );

    await fs.writeFile(licensePath, licenseContent, "utf8");
  } catch (error) {
    throw new Error(`Failed to update LICENSE: ${error.message}`);
  }
}

/**
 * Update VitePress configuration
 */
async function updateVitePressConfig(info) {
  try {
    const configPath = "./docs/.vitepress/config.ts";
    let configContent = await fs.readFile(configPath, "utf8");

    // Extract repo name for base path
    let repoName = "";
    if (info.repository) {
      const repoMatch = info.repository.match(/github\.com[/:](.*?\/)(.*?)(?:\.git)?$/);
      if (repoMatch && repoMatch[2]) {
        repoName = repoMatch[2];
      }
    }

    // Create new base path
    const basePath = repoName ? `/${repoName}/` : "/";

    // Update base path
    configContent = configContent.replace(/base: ".*?"/, `base: "${basePath}"`);

    // Update title
    configContent = configContent.replace(/title: ".*?"/, `title: "${info.name}"`);

    // Update description
    configContent = configContent.replace(
      /description: ".*?"/,
      `description: "${info.description}"`,
    );

    // Update GitHub link if available
    if (info.homepage) {
      configContent = configContent.replace(
        /link: "https:\/\/github\.com\/.*?"/,
        `link: "${info.homepage.replace(/#.*$/, "")}"`,
      );
    }

    await fs.writeFile(configPath, configContent, "utf8");
  } catch (error) {
    throw new Error(`Failed to update VitePress config: ${error.message}`);
  }
}

/**
 * Update playground configuration
 */
async function updatePlaygroundTerminal(info) {
  try {
    // Update terminal playground package.json
    const playgroundPackagePath = "./playground/terminal/package.json";
    const playgroundPackage = JSON.parse(await fs.readFile(playgroundPackagePath, "utf8"));
    const oldDependencyName = Object.keys(playgroundPackage.dependencies)[0];
    playgroundPackage.dependencies = {
      [info.name]: "*",
    };

    await fs.writeFile(
      playgroundPackagePath,
      JSON.stringify(playgroundPackage, undefined, 2) + "\n",
      "utf8",
    );

    // Update terminal playground index.ts
    const indexPath = "./playground/terminal/src/index.ts";
    let indexContent = await fs.readFile(indexPath, "utf8");

    indexContent = indexContent.replaceAll(
      new RegExp(`from "${oldDependencyName}"`, "g"),
      `from "${info.name}"`,
    );

    await fs.writeFile(indexPath, indexContent, "utf8");

    // Update terminal playground tsconfig.json
    const tsconfigPath = "./playground/terminal/tsconfig.json";
    const tsconfig = JSON.parse(await fs.readFile(tsconfigPath, "utf8"));

    const oldPath = tsconfig.compilerOptions.paths[oldDependencyName];
    tsconfig.compilerOptions.paths = {
      [info.name]: [oldPath],
    };

    await fs.writeFile(tsconfigPath, JSON.stringify(tsconfig, undefined, 2) + "\n", "utf8");
  } catch (error) {
    throw new Error(`Failed to update playground: ${error.message}`);
  }
}

async function updatePlaygroundBrowser(info) {
  try {
    // Update browser playground package.json
    const playgroundPackagePath = "./playground/browser/package.json";
    const playgroundPackage = JSON.parse(await fs.readFile(playgroundPackagePath, "utf8"));
    const oldDependencyName = Object.keys(playgroundPackage.dependencies)[0];
    playgroundPackage.dependencies = {
      [info.name]: "*",
    };

    await fs.writeFile(
      playgroundPackagePath,
      JSON.stringify(playgroundPackage, undefined, 2) + "\n",
      "utf8",
    );

    // Update browser playground vite.config.js
    const viteConfigPath = "./playground/browser/vite.config.js";
    let viteConfigContent = await fs.readFile(viteConfigPath, "utf8");

    viteConfigContent = viteConfigContent.replaceAll(
      new RegExp(`"${oldDependencyName}"`, "g"),
      `"${info.name}"`,
    );

    await fs.writeFile(viteConfigPath, viteConfigContent, "utf8");

    // Update browser playground main.js
    const mainPath = "./playground/browser/src/main.js";
    let mainContent = await fs.readFile(mainPath, "utf8");

    mainContent = mainContent.replaceAll(
      new RegExp(`"${oldDependencyName}"`, "g"),
      `"${info.name}"`,
    );

    await fs.writeFile(mainPath, mainContent, "utf8");
  } catch (error) {
    throw new Error(`Failed to update browser playground: ${error.message}`);
  }
}

/**
 * Clean README.md with minimal content
 */
async function cleanReadme(info) {
  try {
    // Read package.json to get library info
    const packageJsonPath = "./package.json";
    const packageJson = JSON.parse(await fs.readFile(packageJsonPath, "utf8"));

    // Create a simple README content
    const readmeContent = `# ${packageJson.name}

${packageJson.description}

## Installation

\`\`\`bash
npm install ${packageJson.name}
\`\`\`

## Usage

\`\`\`typescript
import { add } from "${packageJson.name}";

console.log(add(1, 2)); // 3
\`\`\`

## Development

- \`npm run dev\`: Start development mode with auto-rebuild
- \`npm run playground\`: Start the playground
- \`npm test\`: Run tests
${info.includeVitePress ? "- `npm run docs:dev`: Preview documentation" : ""}

${info.includeVitePress ? "## Documentation" : ""}
${info.includeVitePress ? `- [VitePress Documentation](https://${info.username}.github.io/${info.repoName})` : ""}

## License

[${packageJson.license}](./LICENSE)
`;

    await fs.writeFile("./README.md", readmeContent, "utf8");
  } catch (error) {
    throw new Error(`Failed to clean README.md: ${error.message}`);
  }
}

/**
 * Remove VitePress if not needed
 */
async function removeVitePress() {
  try {
    // Remove docs folder
    await fs.rm("./docs", { force: true, recursive: true });

    // Remove deploy workflow
    await fs.rm("./.github/workflows/deploy.yml", { force: true });

    // Update package.json to remove VitePress related scripts and dependency
    const packageJsonPath = "./package.json";
    const packageJson = JSON.parse(await fs.readFile(packageJsonPath, "utf8"));

    // Remove VitePress scripts
    delete packageJson.scripts["docs:dev"];
    delete packageJson.scripts["docs:build"];
    delete packageJson.scripts["docs:preview"];

    // Remove VitePress from dependencies
    if (packageJson.devDependencies && packageJson.devDependencies.vitepress) {
      delete packageJson.devDependencies.vitepress;
    }

    // Save updated package.json
    await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, undefined, 2) + "\n", "utf8");
  } catch (error) {
    throw new Error(`Failed to remove VitePress: ${error.message}`);
  }
}

// Ask if the user wants to update dependencies
async function updateDependencies() {
  try {
    await execAsync("npx npm-check-updates -u -s", { stdio: "ignore" });
    await execAsync("npm install --prefer-offline --no-audit --no-fund", { stdio: "ignore" });
  } catch (error) {
    throw new Error(`Failed to update dependencies: ${error.message}`);
  }
}

// Ask if the user wants to publish the library
async function publishLibrary() {
  try {
    await execAsync("npm run build", { stdio: "ignore" });
  } catch (error) {
    const errorMessage = error.message || "";
    const error_ = errorMessage.includes("403")
      ? new Error(
          `Publishing failed: The package name is already taken on npm.\n   ${DIM}Please choose a different name for your library and update the configuration\n   and relaunch this assistant.${NC}`,
        )
      : new Error(`Publishing failed. Error details: ${error.message}`);
    throw error_;
  }
}

// Ask if the user wants to commit changes
async function commitChanges() {
  try {
    await execAsync("git add .", { stdio: "ignore" });
    await execAsync('git commit -m "feat: update project information and configuration"', {
      stdio: "inherit",
    });
  } catch (error) {
    throw new Error(
      `Failed to commit changes: ${error.message}. Please commit your changes manually.`,
    );
  }
}

/**
 * Remove browser support
 */
async function removeBrowserSupport() {
  try {
    // Simplify playground structure by moving terminal playground to root
    await fs.mkdir("./playground_temp", { recursive: true });
    await fs.cp("./playground/terminal", "./playground_temp", { recursive: true });
    await fs.rm("./playground", { force: true, recursive: true });
    await fs.rename("./playground_temp", "./playground");

    const viteConfigPath = "./playground/browser/vite.config.js";
    let viteConfigContent = await fs.readFile(viteConfigPath, "utf8");
    viteConfigContent = viteConfigContent.replaceAll(new RegExp(`"../../dist"`, "g"), `"../dist"`);
    await fs.writeFile(viteConfigPath, viteConfigContent, "utf8");

    // Simplify test structure by moving terminal tests to root
    await fs.mkdir("./test_temp", { recursive: true });
    await fs.cp("./test/core", "./test_temp", { recursive: true });
    await fs.cp("./test/terminal", "./test_temp", { recursive: true });
    await fs.rm("./test", { force: true, recursive: true });
    await fs.rename("./test_temp", "./test");

    // Update tsconfig.json
    const tsconfigPath = "./tsconfig.json";
    const tsconfig = JSON.parse(await fs.readFile(tsconfigPath, "utf8"));
    tsconfig.extends = "personal-style-guide/typescript/node";
    await fs.writeFile(tsconfigPath, JSON.stringify(tsconfig, undefined, 2) + "\n", "utf8");

    // Update eslint.config.js
    const eslintPath = "./eslint.config.js";
    let eslintContent = await fs.readFile(eslintPath, "utf8");
    eslintContent = eslintContent.replace(/import eslintBrowser from/, "import eslintNode from");
    eslintContent = eslintContent.replace(/\[\.\.\.eslintBrowser\]/, "[...eslintNode]");
    await fs.writeFile(eslintPath, eslintContent, "utf8");

    // Update vitest.config.ts
    const vitestPath = "./vitest.config.ts";
    let vitestContent = await fs.readFile(vitestPath, "utf8");
    vitestContent = vitestContent.replace(/workspace: \[\s*\{[\s\S]*?\}\s*\],/, "");
    vitestContent = vitestContent.replace(/environment: ".*?"/, 'environment: "node"');
    await fs.writeFile(vitestPath, vitestContent, "utf8");

    // Update tsup.config.ts
    const tsupPath = "./tsup.config.ts";
    let tsupContent = await fs.readFile(tsupPath, "utf8");
    tsupContent = tsupContent.replace(/platform: "neutral"/, 'platform: "node"');
    await fs.writeFile(tsupPath, tsupContent, "utf8");

    // Update package.json
    const packageJsonPath = "./package.json";
    const packageJson = JSON.parse(await fs.readFile(packageJsonPath, "utf8"));

    packageJson.workspaces = ["playground"];
    packageJson.scripts["playground"] = packageJson.scripts["play:terminal"].replace(
      "--workspace=playground/terminal",
      "--workspace=playground",
    );

    if (packageJson.scripts["play:browser"]) {
      delete packageJson.scripts["play:browser"];
    }
    if (packageJson.scripts["play:terminal"]) {
      delete packageJson.scripts["play:terminal"];
    }
    if (packageJson.devDependencies["jsdom"]) {
      delete packageJson.devDependencies["jsdom"];
    }

    await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, undefined, 2) + "\n", "utf8");

    // Update README to remove browser references
    const readmePath = "./README.md";
    let readmeContent = await fs.readFile(readmePath, "utf8");
    readmeContent = readmeContent.replace(/## Browser Support[\s\S]*?(?=##|$)/, "");
    readmeContent = readmeContent.replaceAll(
      /```javascript\s*\/\/ Browser environment[\s\S]*?```/g,
      "",
    );

    await fs.writeFile(readmePath, readmeContent, "utf8");
  } catch (error) {
    throw new Error(`Failed to remove browser support: ${error.message}`);
  }
}

/**
 * Remove node support
 */
async function removeNodeSupport() {
  try {
    // Simplify playground structure by moving browser playground to root
    await fs.mkdir("./playground_temp", { recursive: true });
    await fs.cp("./playground/browser", "./playground_temp", { recursive: true });
    await fs.rm("./playground", { force: true, recursive: true });
    await fs.rename("./playground_temp", "./playground");

    // Simplify test structure by moving browser tests to root
    await fs.mkdir("./test_temp", { recursive: true });
    await fs.cp("./test/browser", "./test_temp", { recursive: true });
    await fs.rm("./test", { force: true, recursive: true });
    await fs.rename("./test_temp", "./test");

    // Update vitest.config.ts
    const vitestPath = "./vitest.config.ts";
    let vitestContent = await fs.readFile(vitestPath, "utf8");
    vitestContent = vitestContent.replace(/workspace: \[\s*\{[\s\S]*?\}\s*\],/, "");
    await fs.writeFile(vitestPath, vitestContent, "utf8");

    // Update tsup.config.ts
    const tsupPath = "./tsup.config.ts";
    let tsupContent = await fs.readFile(tsupPath, "utf8");
    tsupContent = tsupContent.replace(/platform: "neutral"/, 'platform: "browser"');
    await fs.writeFile(tsupPath, tsupContent, "utf8");

    // Update package.json
    const packageJsonPath = "./package.json";
    const packageJson = JSON.parse(await fs.readFile(packageJsonPath, "utf8"));

    packageJson.workspaces = ["playground"];
    packageJson.scripts["playground"] = packageJson.scripts["play:browser"].replace(
      "--workspace=playground/browser",
      "--workspace=playground",
    );

    if (packageJson.scripts["play:browser"]) {
      delete packageJson.scripts["play:browser"];
    }
    if (packageJson.scripts["play:terminal"]) {
      delete packageJson.scripts["play:terminal"];
    }

    await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, undefined, 2) + "\n", "utf8");

    // Update README to remove node references
    const readmePath = "./README.md";
    let readmeContent = await fs.readFile(readmePath, "utf8");
    readmeContent = readmeContent.replace(/## Node Support[\s\S]*?(?=##|$)/, "");
    readmeContent = readmeContent.replaceAll(
      /```javascript\s*\/\/ Node environment[\s\S]*?```/g,
      "",
    );

    await fs.writeFile(readmePath, readmeContent, "utf8");
  } catch (error) {
    throw new Error(`Failed to remove node support: ${error.message}`);
  }
}

/**
 * Self-destruct this script
 */
async function selfDestruct() {
  const scriptPath = process.argv[1];

  try {
    await fs.unlink(scriptPath);
    return true;
  } catch (error) {
    throw new Error(
      `Could not remove setup script: ${error.message}. Please delete ${scriptPath} manually.`,
    );
  }
}

// Run the setup
await setup();
