Follow the steps for every tailwind project. I will mention the modifications for each project in it's corresponding directory.

Prerequisite: Download and install Node.js

To run the application as part of tailwind-css, we need to first setup the necessary installation.
Open terminal in VSCode (in your project directory). Then follow the steps below:

1. Install Tailwind CSS     
        npm install -D tailwindcss postcss autoprefixer
        npx tailwindcss init

2. Add Tailwind to your PostCSS configuration
        module.exports = {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
            }
        }

3. Configure your template paths
Add the paths to all of your template files in your tailwind.config.js file.
        /** @type {import('tailwindcss').Config} */
        module.exports = {
        content: ["*"],
        theme: {
            extend: {},
        },
        plugins: [],
        }

4. Add the Tailwind directives to your CSS (main.css)
        @tailwind base;
        @tailwind components;
        @tailwind utilities;

5. Start your build process
Run your build process with npm run dev or whatever command is configured in your package.json file.
        npm run start (or) npm start
        
6. Start using Tailwind in your HTML
