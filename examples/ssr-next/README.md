# SSR Next frontend Application ⏭️

This is a starter template for building a server-side rendered (SSR) Next.js frontend application. It includes a basic setup for building a single-page application (SPA) with server-side rendering. This can be useful for improving SEO, reducing initial load times, and providing optimal accessibility for all users.

## Technologies

This application uses the following technologies:

* **Next.js** - Building server-side rendered (SSR) SPAs
* **React** - A JavaScript library for building user interfaces

## Installation

Clone this code repository to your local machine 💻

1. Open a terminal and navigate to the application directory 📁
2. Run the command ```npm install``` to install the necessary dependencies 📦
3. Run the command ```npm start``` to start the application in development mode 🚀
4. Open a web browser and navigate to the address <http://localhost:3000> 🖥️

## 🚀 Project Structure

Inside of your Spin project, you'll see the following folders and files:

```raw
├── .build/
│   ├── next
│   └── styles
├── app/
│   ├── counter
│   │   └── page.tsx
│   ├── redirect
│   │   ├── [result]
│   │   │   └── page.tsx
│   │   └── page.tsx
│   ├── layout.tsx
│   └── page.tsx
├── src/
│   ├── components
│   │   └── navabar.tsx
│   └── styles
│   │   └── shared.scss
├── public/
│   └── favicon.ico
├── next.config.js
├── server.js               • Used to write access logs into the console
└── package.json
```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command         | Action                      |
|:----------------|:----------------------------|
| `npm run dev`   | Start the app locally       |
| `npm run build` | Build the app distribuables |
| `npm start`     | Serve the app distribuable  |

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## 🧠 Learn More

To learn more about Next.js, take a look at the following resources:

* [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
* [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
