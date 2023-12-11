# Create Spin App 🌀

[![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/package/create-spin-app)

**Create Spin App** is a command-line interface (**CLI**) tool that is based on the Atro CLI. It allows you to easily generate a new application using [different templates](../../examples):

○ Standalone webapp, powered by Astro <br />
○ Astro Frontend app (Astro / React) <br />
○ Micro-frontend app (React) <br />
○ Micro-frontend app (VanillaJS) <br />
○ Micro-frontend app (Shell) <br />
○ Next Frontend app ( Next SSG ) <br />
○ Next Frontend app ( Next SSR ) <br />
○ Remix Frontend app ( Remix js SSR ) <br />
○ Astro Frontend app (Astro / React SSR) <br />
○ Static website (with Caddy) <br />
○ Static website (with nginx) <br />

## Usage

To use Create Spin App, you need to have **Node.js** and **npm (Node Package Manager)** installed on your machine.

To create a new application using Create Spin App, you can run the following command:

```shell
npx create-spin@latest
```

- This will launch the CLI and prompt you to choose a template for your application. Simply select the desired template and follow the instructions to generate your new application.

- `create spin` runs in interactive mode by default, but it also provides the option to specify **additional templates from a remote repository** by passing the URL

   ```shell
   npx create-spin@latest -- --additionnalTemplate https://github.com/mdn/html-examples
   ```

## Design

**꩜ Spin is a common platform for developing, delivering and hosting frontends.**

### Templates / Starter kits

- Create Spin App provides a set of templates that are designed to enhance the developer experience (DX) by providing a ready-to-use project structure with essential configurations.

- By leveraging these templates, developers can quickly set up their projects with **essential tools and configurations**, allowing them to focus on building their applications.

[Check out the full list](../../examples) of example templates, available on GitHub.

![](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![](https://img.shields.io/badge/Astro-0C1222?style=for-the-badge&logo=astro&logoColor=FDFDFE)
![](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![](https://img.shields.io/badge/Shell_Script-121011?style=for-the-badge&logo=gnu-bash&logoColor=white)
![](https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white)
![](https://img.shields.io/badge/next%20js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![](https://img.shields.io/badge/remix-000000?style=for-the-badge&logo=remix&logoColor=white)

## Implementation

We try to bring this codebase to some high standards.

> ℹ️ Spin development key criteria are: functional, performant & elegant.

Part of the codebase structure [and code](https://github.com/withastro/astro/tree/d8bae784b4a3b555c213febe6334373d89c7e089/packages/create-astro) has been borrowed from the amazing [`Astro`](https://github.com/withastro/astro) project.

## CLI Flags

May be provided in place of prompts

| Name                         | Description                                            |
|:-----------------------------|:-------------------------------------------------------|
| `--additionnalTemplate`      | Specify url of remote repository.                      |
| `--template <name>`          | Specify your template.                                 |
| `--install` / `--no-install` | Install dependencies (or not).                         |
| `--git` / `--no-git`         | Initialize git repo (or not).                          |
| `--yes` (`-y`)               | Skip all prompt by accepting defaults.                 |
| `--no` (`-n`)                | Skip all prompt by declining defaults.                 |
| `--dry-run`                  | Walk through steps without executing.                  |
| `--skip-houston`             | Skip Houston animation.                                |
| `--typescript <option>`      | TypeScript option: `strict` / `strictest` / `relaxed`. |

