# CSR Micro Front-End React Application with Vite.js ⚡

Client-side rendered React application using micro front-end architecture. Built with Vite JS for fast development and optimized builds

### Technologies

This application uses the following technologies:

- **React** - A JavaScript library for building user interfaces
- **ViteJS** - Fast and opinionated build tool that enables quick web development by providing instant feedback during the development process.

### Installation

Clone this code repository to your local machine 💻

1. Open a terminal and navigate to the application directory 📁
2. Run the command ```npm postinstall``` to install the necessary dependencies 📦
3. Run the command ```npm run dev``` to start the application in development mode 🚀
4. Open a web browser and navigate to the address <http://localhost:3000> 🖥️

The application is a basic demonstration of the CSR pattern and can be extended to fit your needs.

## 🚀 Project Structure

Inside of your Spin project, you'll see the following folders and files:

```raw
├── server/
│   └── server.mjs          • Server entrypoint
├── src/
│   ├── App.css
│   ├── App.jsx
│   ├── main.jsx
│   └── MicroFrontend.jsx   • App entrypoint
├── index.html              • HTML template
└── package.json
```

This micro-frontend (MFE) is [⚡vite](https://vitejs.dev/)-powered ESM bundles, loaded server-side by a shell app.

The MFE is built in a [`dist`](./dist) folder containing the main entry file, assets and a [`manifest.json`](./dist/manifest.json) metadata file.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command         | Action                      |
| :-------------- | :-------------------------- |
| `npm run dev`   | Start the app locally       |
| `npm run build` | Build the app distribuables |
| `npm start`     | Serve the app distribuable  |
