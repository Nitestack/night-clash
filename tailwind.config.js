/** @type {import('tailwindcss')} */
module.exports = {
  content: [
    "./src/pages/**/*.tsx",
    "./src/components/**/*.tsx",
    "./src/modules/**/*.tsx"
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        cocgraybackground: "-webkit-linear-gradient(top, rgba(194, 198, 201, 0.8) 0%, rgba(176, 181, 187, 0.8) 49%, rgba(161, 168, 176, 0.8) 50%, rgba(157, 165, 176, 0.8) 100%)",
        cocgreenbackground: "linear-gradient(#7ED430 0%, #8ED838, #38A700 51%, #61BE1E)"
      },
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
        "coc": ["Supercell-Magic"],
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