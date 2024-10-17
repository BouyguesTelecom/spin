# SSG Next frontend Application ⏭️

This is a starter template for building a static site generated (SSG) Next.js frontend application. It includes a basic setup for building a single-page application (SPA) with static site generation. This can be useful for improving SEO, reducing initial load times, and providing optimal accessibility for all users.

## Technologies

This application uses the following technologies:

- **Next.js** - Building static sites with built-in support for static site generation (SSG).
- **React** - A JavaScript library for building user interfaces

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
│   ├── api
│   │   └── revalidate      • Used to revalidate specific paths
│   ├── counter
│   │   └── page.tsx
│   ├── data
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
├── styles/
│   └── shared.css
├── next.config.js
├── server.js               • Used to write access logs into our console
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

## 🔁 Revalidate

Next.js added a powerful feature called Incremental Static Regeneration (ISR) which allows you to update your page data after your app has been built and deployed. This is great for when you need to simply update the data beings fetched without rebuilding the entire app.

To test ISR, enter this URL into your browser: `http://localhost:3000/api/revalidate?path=/data`. Just make sure to enter the exact path you wish to revalidate without omitting any slashes. After reloading the page, you should see the updated data.

## 🧠 Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
