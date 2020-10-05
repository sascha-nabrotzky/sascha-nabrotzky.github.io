/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: "UX-Design & Frontend-Entwicklung | Sascha Nabrotzky",
    description: "Analyse, Kreation und Optimierung der Nutzererfahrung - Komplexe Systeme auf eine Website gebracht!",
    url: "https://sascha-nabrotzky.github.io/",
    image: "https://www.xn--kindertagespflege-lwenzahn-uvc.de/images/SocialMedHeader.jpg",
    author: "Sascha Nabrotzky",
    keywords: "UX-Design, UI-Design, Webdesign, Frontend-Development"
  },

  plugins: [
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
              maxWidth: 800,
              linkImagesToOriginal: false,
            }
          }
        ]
      }
    }
    
  ],
}
