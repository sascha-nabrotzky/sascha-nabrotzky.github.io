import React, { useRef } from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import Layout from "../components/Layout"
import TypewriterText from "../components/TypewriterText"
import socMedImg from "../images/socMedImg.jpg"
import { ReactComponent as CloseIcon } from "../icons/close.svg"
import * as styles from "../styles/index.module.css"

const Index = () => {
  const modalRef1 = useRef(null)

  const openModal = () => {
    if (modalRef1.current != null) {
      modalRef1.current.showModal()
    }
  }
  const closeModal = () => {
    if (modalRef1.current != null) {
      modalRef1.current.close()
    }
  }

  return (
    <>
      <Layout>
        <TypewriterText text="Leidenschaft für Design und Technologie" />
        <p className={styles.introtext}>
          Meine <strong>Leidenschaft </strong>für <strong>UX-Design </strong>und{" "}
          <strong>Frontend-Entwicklung </strong>
          treibt mich dazu an, innovative Lösungen zu entwickeln, die sowohl
          funktional als auch ästhetisch ansprechend sind, um Produkte zu
          schaffen, die die{" "}
          <strong>Erwartungen der Benutzer übertreffen</strong> und{" "}
          <strong>Umsätze steigert.</strong>{" "}
          <button onClick={openModal} className={styles.openModalBtn}>
            Mehr über mich &rarr;
          </button>
        </p>
        <div className={styles.btnWrapper}>
          <Link to="/projects" className={styles.ctaBtn}>
            Zu meinen Projekten
          </Link>
        </div>
      </Layout>

      <dialog ref={modalRef1}>
        <div>
          <button onClick={closeModal} aria-label="close modal">
            <CloseIcon />
          </button>
        </div>
        <div>
          <p>
            Ich bin <strong>Sascha Nabrotzky,</strong> verheiratet und als
            Familienvater mit zwei Kindern lebe ich im ländlichen Ladbergen.{" "}
            <br />
            Mit Fokus auf <strong>UX-Design </strong> und{" "}
            <strong>Frontend-Entwicklung</strong> habe ich umfangreiche
            Erfahrung in der Gestaltung und Entwicklung responsiver Apps und
            PWAs für die Steuerung von Saunen, Küchen und Kassensystemen per
            Touchscreen und Tablet. <br />
            Meine Fähigkeiten umfassen die Entwicklung von interaktiven
            Prototypen sowie die Optimierung der Nutzererfahrung in einem
            interdisziplinären Team. In meiner Rolle als "UX-Engineer" habe ich
            moderne Technologien wie{" "}
            <strong>HTML, CSS, JavaScript, React und TYPO3 </strong>
            eingesetzt, um ansprechende und benutzerfreundliche Apps zu
            erstellen.
          </p>
        </div>
      </dialog>
    </>
  )
}

export default Index

export function Head() {
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
