# Spin App 🌀

[![npm](https://img.shields.io/npm/v/create-spin-app?style=for-the-badge&logo=npm&logoColor=white&color=CB3837)](https://www.npmjs.com/package/create-spin-app)

Common platform for developing, delivering and hosting frontends.

Spin is a mono repository that includes a command-line interface (**CLI**) package hosted on npm ( 👉 [Create Spin App](https://github.com/BouyguesTelecom/spin/tree/main/examples)) , which allows you to easily generate a new application using [different templates](https://github.com/BouyguesTelecom/spin/blob/main/examples/README.md)

In addition, Spin also includes a set of Helm templates, based on our [The Spin Helm subchart](https://github.com/BouyguesTelecom/charts/tree/main/bouyguestelecom/spin) included in the project structure and available on the [Docker Hub registry 🐳](https://hub.docker.com/r/bouyguestelecomcharts/spin).

This dependency can be used for deploying your applications on Kubernetes easily.

## Project Architecture

```
├── examples/ # Example templates
|   ├── csr-astro-react/
|   ├── csr-micro-frontend-react/
|   ├── micro-frontend-es/
|   ├── micro-frontend-shell/
|   ├── ssg-next/
|   ├── ssr-astro-react/
|   ├── ssr-astro-shell-app/
|   ├── ssr-next/
|   ├── ssr-remix/
|   ├── static-caddy/
|   ├── static-nginx/
|   ├── vanillajs-frontend/
├── helms/ # Helm templates
├── packages/
|   ├── create-spin/ # CLI package

```

## Usage

To use Create Spin App, you need to have **Node.js** and **npm (Node Package Manager)** installed on your machine.

To create a new application using Create Spin App, you can run the following command:

```shell
npx create-spin-app@latest
```

- This will launch the CLI and prompt you to choose a template for your application. Simply select the desired template and follow the instructions to generate your new application.

- `create spin` runs in interactive mode by default, but it also provides the option to specify **additional templates from a remote repository** by passing the URL

```shell
npx create-spin-app@latest -- --additionnalTemplate https://github.com/mdn/html-examples
```

### Templates / Starter kits

- Create Spin App provides a set of templates that are designed to enhance the developer experience (DX) by providing a ready-to-use project structure with essential configurations.

- By leveraging these templates, developers can quickly set up their projects with **essential tools and configurations**, allowing them to focus on building their applications.

1. **Prettier**: A code formatter that helps maintain consistent code style.
2. **EditorConfig**: A configuration file that ensures consistent coding styles across different editors and IDEs.
3. **Helm Chart**: A folder structure that includes a Helm subchart for easy deployment and management of the application.

[Check out the full list](https://github.com/BouyguesTelecom/spin/blob/main/examples/README.md) of example templates, available on GitHub.


### Spin Helm Subchart

[The Spin Helm subchart](https://github.com/BouyguesTelecom/charts/tree/main/bouyguestelecom/spin) included in the project structure is available on the Docker Hub registry. You can find more information about the subchart in [the chart repository 🐳](https://hub.docker.com/r/bouyguestelecomcharts/spin).

## Implementation

We try to bring this codebase to some high standards.

> ℹ️ Spin development key criteria are: functional, performant & elegant.

Part of the codebase structure [and code](https://github.com/withastro/astro/tree/d8bae784b4a3b555c213febe6334373d89c7e089/packages/create-astro) has been borrowed from the amazing [`Astro`](https://github.com/withastro/astro) project.
