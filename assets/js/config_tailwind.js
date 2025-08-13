tailwind.config = {
        theme: {
          extend: {
            fontFamily: {
              sans: ["Poppins", "sans-serif"],
            },
            colors: {
              "mono-dark": "#0a0a0a",
              "mono-surface": "#18181b", // zinc-900
              "mono-border": "#3f3f46", // zinc-700
              "mono-accent": "#ffffff",
              "mono-text": "#d4d4d8", // zinc-300
              "mono-subtle": "#71717a", // zinc-500
            },
            animation: {
              "fade-in-up": "fadeInUp 0.8s ease-out forwards",
              glitch: "glitch 0.25s ease-out",
            },
            keyframes: {
              fadeInUp: {
                "0%": { opacity: "0", transform: "translateY(30px)" },
                "100%": { opacity: "1", transform: "translateY(0)" },
              },
              glitch: {
                "0%": { transform: "translateX(0)", opacity: 1 },
                "20%": {
                  transform: "translateX(-2px) skewX(5deg)",
                  opacity: 0.8,
                },
                "40%": {
                  transform: "translateX(2px) skewX(-5deg)",
                  opacity: 1,
                },
                "60%": {
                  transform: "translateX(-1px) skewX(2deg)",
                  opacity: 0.9,
                },
                "80%": {
                  transform: "translateX(1px) skewX(-2deg)",
                  opacity: 1,
                },
                "100%": { transform: "translateX(0) skewX(0deg)", opacity: 1 },
              },
            },
          },
        },
      };