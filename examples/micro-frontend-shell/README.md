# Micro-frontend shell app 🐚

## Installation

Clone this code repository to your local machine 💻

1. Open a terminal and navigate to the application directory 📁
2. Run the command ```npm install``` to install the necessary dependencies 📦
3. Run the command ```npm start``` to start the application in development mode 🚀
4. Open a web browser and navigate to the address <http://localhost:3000> 🖥️

### Features

- ✅ Micro-Frontend shell app

### 🚀 Project Structure

Inside of your Spin project, you'll see the following folders and files:

```raw
├── src/
│   ├── components/
│   ├── pages/
│   │   └── index.astro     • App entrypoint
│   └── utils/
└── package.json
```

This shell app is an [Astro](https://astro.build/)-powered [deno](https://deno.land/)-serving web app that supports out-of-the-box Server-Side-Rendering (SSR) of micro-frontends (MFEs).

It works by loading MFEs as remote modules, and by loading their `manifest.json` metadata files.

Each of these MFEs are assembled and composed at runtime.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command         | Action                      |
| :-------------- | :-------------------------- |
| `npm run dev`   | Start the app locally       |
| `npm run build` | Build the app distribuables |
| `npm start`     | Serve the app distribuable  |
