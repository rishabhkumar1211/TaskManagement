This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Task Management App

This is a simple Task Management App built with Next.js and React.js that helps you organize tasks based on their priority and completion status. The app supports adding, editing, deleting, and searching tasks, with tasks categorized as either completed or incomplete. Data is persisted through localStorage for a seamless experience across sessions.
Features
• Add new tasks with title, description, and priority.
• Sort tasks automatically based on priority: High > Medium > Low.
• Toggle between completed and pending status.
• Search bar to filter tasks by title or description.
• Data persistence using localStorage.
• Server-side rendering of initial tasks using Next.js.

## Approach (Sorting Tasks by Priority)

In the code, we define a helper function to ensure that tasks are sorted by priority. This function maps each priority level to a numeric value and sorts tasks in descending order:

- High → 3
- Medium → 2
- Low → 1
  const sortTasksByPriority = (tasksToSort) => {
  const priorityOrder = { high: 3, medium: 2, low: 1 };
  return [...tasksToSort].sort(
  (a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]
  );
  };

## Project Setup Instructions

1. Prerequisites
   • Install Node.js (LTS version recommended): https://nodejs.org/
   • A code editor, like Visual Studio Code.
2. Clone the Repository
   Open a terminal and run the following commands:
   git clone https://github.com/rishabhkumar1211/TaskManagement.git
   cd <repository-folder>
3. Install Dependencies
   Run the following command in your project directory:
   npm install
4. Run the Development Server
   Start the server with:
   npm run dev
   Open http://localhost:3000 in your browser to view the app.
5. Build and Export for Production
   For production, use:
   npm run build
   npm run start
   Page Routing
   This project only includes the home page ('/'), which is defined in the `index.js` file inside the `pages/` directory. As the app grows, more routes can be added following Next.js’s file-based routing approach.
   Project Structure
   📂 project-root/
   ┣ 📂 pages/ # Contains index.js (Main page rendering the app)
   ┣ 📂 public/ # Static assets (if needed)
   ┣ 📂 styles/ # CSS files for styling
   ┣ 📜 package.json # Dependencies and scripts
   ┗ 📜 README.md # Project documentation


## Stats

<!-- BADGES:START -->
<!-- BADGES:END -->


## Changelog

<!-- CHANGELOG:START -->
<!-- CHANGELOG:END -->
