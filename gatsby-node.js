// Hier wird das Tiny-Slider-Modul während des Build-Prozesses gegen
// ein Dummy-Modul ausgetauscht, da sonst "window" erwartet wird und das
// ist noch nicht da.
exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html" || stage === "develop-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /tiny-slider/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}
