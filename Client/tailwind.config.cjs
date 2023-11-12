/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx}"],
    theme: {
        extend: {
            colors: {
                "general-background": "#18191a",
                "general-button-color": "#3a3b3c",
                "general-button-hover": "#606060",
                "general-icon-color": "#bbbbbb",
                "general-text-color": "#e4e6eb",
                "small-text-color": "#adadad",
                "icon-hover": "#ffffff",
                "text-hover": "#ffffff",
                "level-1": "#303030",
                "level-2": "#545454",
                "level-3": "#818181",
            },
        },
    },
    variants: {
        extend: {
            display: ["group-hover"],
        },
    },
    plugins: [],
};
