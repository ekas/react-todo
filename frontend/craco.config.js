const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            javascriptEnabled: true,
            modifyVars: {
              "@swatch_1": "#e0e8e7",
              "@swatch_2": "#bccac1",
              "@swatch_3": "#6aa7b3",
              "@swatch_4": "#5f5f5f",
              "@swatch_5": "#787b85",
              "@swatch_6": "#2f3433",
              "@swatch_7": "#f04c0f",
              "@swatch_8": "#fff",
            },
          },
        },
      },
    },
  ],
};
