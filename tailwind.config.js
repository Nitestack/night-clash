module.exports = {
  content: [
    "./src/pages/**/*.tsx",
    "./src/components/**/*.tsx",
    "./src/modules/**/*.tsx"
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        //Background of the whole page
        lightmodebackground: "#f1f5f9",
        darkmodebackground: "#1f2937",

        //Text
        lightmodeheader: "#0f172a",
        lightmodetext: "#111827",
        darkmodeheader: "#f1f5f9",
        darkmodetext: "#d1d5db",

        //Background
        lightmodeprimary: "#fafafa",
        lightmodesecondary: "#a3a3a3",
        darkmodeprimary: "#111827",
        darkmodesecondary: "#1f2937",

        //Some global colors regardless of light or dark mode
        primary: "#4f46e5",

        //The contrast to the primary color
        primarycontrast: "#22c55e",

        //Some global colors for hovers regardless of light or dark mode
        hoverbackground: "#374151",
        hovertext: "#d1d5db"
      },
      fontFamily: {
        'coc-description': ["CCBackBeat"],
        'cr-description': ["Clash Text"],
        'bs': ["Lilita One", "cursive"],
        "bb": ["BadaBoom BB"]
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms')
  ]
};