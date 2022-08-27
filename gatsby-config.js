/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: "Sascha Nabrotzky | Frontend-Entwickler",
    description:
      "Entwicklung und Programmierung von responsiven TYPO3- und React-Websites mit durchdachtem Design",
    url: "https://sascha-nabrotzky.github.io/",
    image: "../images/socMedImg.jpg",
    author: "Sascha Nabrotzky",
    keywords:
      "TYPO3, React, Gatsby, CMS, Front-End Development, Frontend-Entwicklung, Webdesign, Frontend, Programmierung, Web, Webentwicklung, web developer",
  },

  plugins: [
    `gatsby-plugin-remove-fingerprints`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-relative-images`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 960,
              linkImagesToOriginal: false,
              quality: 85,
              loading: "lazy",
            },
          },
        ],
      },
    },
  ],
}
