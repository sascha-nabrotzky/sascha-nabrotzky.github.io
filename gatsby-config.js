/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: "Sascha Nabrotzky | Webdesigner",
    siteUrl: "https://sascha-nabrotzky.github.io",
    description:
      "Leidenschaft für Design und Technologie - Entwicklung von innovativen Lösungen, um Produkte zu schaffen, die die Erwartungen der Benutzer übertreffen. Webdesign aus Ladbergen im Münsterland.",
    url: "https://sascha-nabrotzky.github.io/",
    image: "../images/socMedImg.jpg",
    author: "Sascha Nabrotzky",
    keywords:
      "UX-Engineer, UX-Design, ux engineer, UI-Design, UI, React, Gatsby, Front-End Development, Frontend-Entwicklung, Webdesign, Frontend, Programmierung, Web, Webentwicklung, web developer",
  },

  plugins: [
    "gatsby-plugin-remove-fingerprints",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-plugin-postcss",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-svgr",
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          "gatsby-remark-relative-images",
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 960,
              withWebp: true,
              linkImagesToOriginal: false,
              quality: 80,
              loading: "lazy",
            },
          },
        ],
      },
    },
  ],
}
