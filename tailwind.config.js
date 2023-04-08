/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                "my-blue": "#16182A",
                "my-bg": "#f5f5f5",
                "my-purple": "#2104ae",
                "my-light-blue": "#8AC7EA",
            },
            fontFamily: {
                cookie: ["Cookie", "cursive"],
            },
        },
    },
    plugins: [],
};
