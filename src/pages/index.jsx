import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Layout from "../components/Layout"
import TimeLine from "../components/TimeLine"
import TypewriterText from "../components/TypewriterText"
import socMedImg from "../images/socMedImg.jpg"

const Home = () => {
  return (
    <Layout>
      <h1>Design und Programmierung von responsiven Websites</h1>
      <TypewriterText text="Ausgebuchte Plätze durch gelungene Umsetzung der Website" />
      <p>
        Ich bin Sascha Nabrotzky, verheiratet und als Familienvater mit zwei
        Kindern lebe ich im ländlichen Ladbergen. Als{" "}
        <strong>UX-Engineer</strong> mit Schwerpunkt auf{" "}
        <strong>Frontend-Entwicklung</strong> und <strong>UI/UX-Design</strong>{" "}
        habe ich umfangreiche Erfahrung in der Gestaltung und Entwicklung
        responsiver Apps und PWAs für die Steuerung von Saunen, Küchen- und
        Kassensystemen per Touchscreen und Tablet.
      </p>

      <p>
        Meine Fähigkeiten umfassen die Entwicklung von{" "}
        <strong>interaktiven Highfidelity-Prototypen</strong> sowie die{" "}
        <strong>Optimierung der Nutzererfahrung</strong> in einem
        interdisziplinären Team. In meiner Rolle als Frontend-Entwickler habe
        ich maßgeschneiderte Lösungen entwickelt, um sicherzustellen, dass die
        Benutzeroberflächen reibungslos funktionieren und auf verschiedenen
        Geräten und Bildschirmgrößen optimal angezeigt werden. Dabei habe ich
        moderne Technologien wie{" "}
        <strong>HTML, CSS, JavaScript und React</strong> eingesetzt, um
        ansprechende und benutzerfreundliche Apps zu erstellen.
      </p>
      <p>
        Darüber hinaus habe ich umfangreiche Erfahrung im UI/UX-Design
        gesammelt. Ich habe interaktive Highfidelity-Prototypen erstellt, um das
        Designkonzept zu visualisieren und die Benutzererfahrung zu optimieren.
        Dabei habe ich eng mit einem interdisziplinären Team zusammengearbeitet,
        um sicherzustellen, dass das Design den Anforderungen der Benutzer
        entspricht und gleichzeitig die Geschäftsziele unterstützt. Dabei setze
        ich auch auf <strong>KI-gestützte User-Research,</strong> um die
        Bedürfnisse der Nutzer optimal zu verstehen.
      </p>
      <p>
        <strong>Meine Leidenschaft für Design und Technologie</strong> treibt
        mich dazu an, innovative Lösungen zu entwickeln, die sowohl funktional
        als auch ästhetisch ansprechend sind. Ich bin stets bestrebt, die
        neuesten Designtrends und Technologien zu erlernen und anzuwenden, um
        Produkte zu schaffen, die die{" "}
        <strong>Erwartungen der Benutzer übertreffen.</strong>
      </p>
      <TimeLine />
    </Layout>
  )
}

export default Home

export const Head = () => {
  const data = useStaticQuery(graphql`
    query SEOQuery {
      site {
        siteMetadata {
          title
          description
          author
          image
          url
        }
      }
    }
  `)

  return (
    <>
      <html lang="de" />
      <title>{data.site.siteMetadata.title}</title>
      <meta name="title" content={data.site.siteMetadata.title} />
      <meta name="description" content={data.site.siteMetadata.description} />
      <meta name="author" content={data.site.siteMetadata.author} />
      <meta name="keywords" content={data.site.siteMetadata.keywords} />
      <meta name="image" content={socMedImg} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={data.site.siteMetadata.title} />
      <meta name="twitter:image" content={socMedImg} />
      <meta property="og:title" content={data.site.siteMetadata.title} />
      <meta
        property="og:description"
        content={data.site.siteMetadata.description}
      />
      <meta property="og:image" content={socMedImg} />
      <meta property="og:url" content={data.site.siteMetadata.url} />
      <meta property="og:type" content="website" />
    </>
  )
}
