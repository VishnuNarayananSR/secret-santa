/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        "fade-in": "fadeIn 1.5s ease-in-out",
        "slide-up": "slideUp 1s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        slideUp: {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            default: {
              50: "#fafafa",
              100: "#f3f3f3",
              200: "#ececec",
              300: "#e5e5e5",
              400: "#dedede",
              500: "#d7d7d7",
              600: "#b1b1b1",
              700: "#8c8c8c",
              800: "#666666",
              900: "#414141",
              foreground: "#000",
              DEFAULT: "#d7d7d7",
            },
            primary: {
              50: "#f7e4e4",
              100: "#ebbebf",
              200: "#df9799",
              300: "#d37173",
              400: "#c74b4e",
              500: "#bb2528",
              600: "#9a1f21",
              700: "#7a181a",
              800: "#591213",
              900: "#380b0c",
              foreground: "#fff",
              DEFAULT: "#bb2528",
            },
            secondary: {
              50: "#e0ede7",
              100: "#b3d4c5",
              200: "#87bba3",
              300: "#5ba182",
              400: "#2f8860",
              500: "#036f3e",
              600: "#025c33",
              700: "#024828",
              800: "#01351d",
              900: "#012113",
              foreground: "#fff",
              DEFAULT: "#036f3e",
            },
            success: {
              50: "#f3f6f0",
              100: "#e2e9db",
              200: "#d0ddc6",
              300: "#bfd0b1",
              400: "#aec49c",
              500: "#9db787",
              600: "#82976f",
              700: "#667758",
              800: "#4b5740",
              900: "#2f3729",
              foreground: "#000",
              DEFAULT: "#9db787",
            },
            warning: {
              50: "#fef1ea",
              100: "#fddecc",
              200: "#fbcbaf",
              300: "#fab891",
              400: "#f8a574",
              500: "#f79256",
              600: "#cc7847",
              700: "#a15f38",
              800: "#754529",
              900: "#4a2c1a",
              foreground: "#000",
              DEFAULT: "#f79256",
            },
            danger: {
              50: "#fde4e7",
              100: "#fabdc5",
              200: "#f797a2",
              300: "#f57080",
              400: "#f24a5e",
              500: "#ef233c",
              600: "#c51d32",
              700: "#9b1727",
              800: "#72111d",
              900: "#480b12",
              foreground: "#000",
              DEFAULT: "#ef233c",
            },
            background: "#fffbf6",
            foreground: {
              50: "#f3e3e2",
              100: "#e1bcba",
              200: "#d09591",
              300: "#bf6e69",
              400: "#ad4740",
              500: "#9c2018",
              600: "#811a14",
              700: "#651510",
              800: "#4a0f0b",
              900: "#2f0a07",
              foreground: "#fff",
              DEFAULT: "#9c2018",
            },
            content1: {
              DEFAULT: "#fffbf6",
              foreground: "#000",
            },
            content2: {
              DEFAULT: "#fff2e0",
              foreground: "#000",
            },
            content3: {
              DEFAULT: "#ffe9cc",
              foreground: "#000",
            },
            content4: {
              DEFAULT: "#ffd7a3",
              foreground: "#000",
            },
            focus: "#fb776e",
            overlay: "#000000",
            divider: "#111111",
          },
        },
        dark: {
          colors: {
            default: {
              50: "#151215",
              100: "#241f24",
              200: "#322b32",
              300: "#413841",
              400: "#6c656c",
              500: "#979297",
              600: "#c1bec1",
              700: "#ecebec",
              foreground: "#fff",
              DEFAULT: "#322b32",
            },
            primary: {
              50: "#3d0c0d",
              100: "#671416",
              200: "#911d1f",
              300: "#bb2528",
              400: "#ca5658",
              500: "#da8789",
              600: "#e9b8b9",
              700: "#f8e9ea",
              foreground: "#fff",
              DEFAULT: "#911d1f",
            },
            secondary: {
              50: "#012414",
              100: "#023d22",
              200: "#025630",
              300: "#036f3e",
              400: "#3c8f69",
              500: "#74b095",
              600: "#add0c0",
              700: "#e6f1ec",
              foreground: "#fff",
              DEFAULT: "#025630",
            },
            success: {
              50: "#333b2c",
              100: "#56654a",
              200: "#7a8e69",
              300: "#9db787",
              400: "#b3c7a2",
              500: "#c9d7bd",
              600: "#dfe8d8",
              700: "#f5f8f3",
              foreground: "#000",
              DEFAULT: "#7a8e69",
            },
            warning: {
              50: "#502f1c",
              100: "#88502f",
              200: "#bf7143",
              300: "#f79256",
              400: "#f9ab7c",
              500: "#fbc3a2",
              600: "#fcdcc8",
              700: "#fef4ee",
              foreground: "#000",
              DEFAULT: "#bf7143",
            },
            danger: {
              50: "#4e0b13",
              100: "#831321",
              200: "#b91b2f",
              300: "#ef233c",
              400: "#f35568",
              500: "#f68694",
              600: "#fab8c0",
              700: "#fde9ec",
              foreground: "#fff",
              DEFAULT: "#b91b2f",
            },
            background: "#20161F",
            foreground: {
              50: "#40341f",
              100: "#6c5735",
              200: "#997b4a",
              300: "#c59f60",
              400: "#d2b584",
              500: "#dfcaa8",
              600: "#ece0cb",
              700: "#f9f5ef",
              foreground: "#000",
              DEFAULT: "#997b4a",
            },
            content1: {
              DEFAULT: "#20161F",
              foreground: "#fff",
            },
            content2: {
              DEFAULT: "#2c1f2b",
              foreground: "#fff",
            },
            content3: {
              DEFAULT: "#3e2b3c",
              foreground: "#fff",
            },
            content4: {
              DEFAULT: "#50374d",
              foreground: "#fff",
            },
            focus: "#fb776e",
            overlay: "#ffffff",
            divider: "#ffffff",
          },
        },
      },
      layout: {
        fontSize: {
          tiny: "0.75rem",
          small: "0.875rem",
          medium: "1rem",
          large: "1.125rem",
        },
        lineHeight: {
          tiny: "1rem",
          small: "1.25rem",
          medium: "1.5rem",
          large: "1.75rem",
        },
        radius: {
          small: "0.5rem",
          medium: "0.75rem",
          large: "0.875rem",
        },
        borderWidth: {
          small: "1px",
          medium: "2px",
          large: "3px",
        },
        disabledOpacity: "0.5",
        dividerWeight: "1",
        hoverOpacity: "0.9",
      },
    }),
  ],
};
