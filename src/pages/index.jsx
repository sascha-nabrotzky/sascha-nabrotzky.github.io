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
        <TypewriterText text="Ich vereine Design und Entwicklung ..." />
        <p className={styles.introtext}>
          ... um nahtlose und benutzerzentrierte digitale Erlebnisse zu
          schaffen. Mit meinem tiefen Verständnis für UX-Design und meiner
          Expertise in Frontend-Technologien wie React und CSS{" "}
          <strong>
            überbrücke ich die Lücke zwischen kreativer Vision und technischer
            Umsetzung.
          </strong>
        </p>

        <div className={styles.advantagesWrapper}>
          <div className={styles.advantage}>
            <h3 className={styles.advantageTitle}>Effizienz:</h3>
            <p className={styles.advantageText}>
              Ich optimiere die Zusammenarbeit zwischen Design- und
              Entwicklerteams, indem ich Prototypen und UI-Komponenten direkt in
              produktionsreifen Code überführe. <br />
              <strong>
                Das spart Zeit, reduziert Fehlerquellen und beschleunigt den
                Go-to-Market-Prozess.
              </strong>
            </p>
          </div>

          <div className={styles.advantage}>
            <h3 className={styles.advantageTitle}>Benutzerzentrierung:</h3>
            <p className={styles.advantageText}>
              Meine Arbeit basiert auf fundierter Nutzerforschung, um
              <strong> Produkte mit echten Mehrwerten </strong>
              zu entwickeln, die nicht nur ästhetisch ansprechend, sondern auch
              intuitiv und zugänglich sind.
            </p>
          </div>

          <div className={styles.advantage}>
            <h3 className={styles.advantageTitle}>Innovation:</h3>
            <p className={styles.advantageText}>
              Durch den Einsatz modernster Technologien wie React und Tools zur
              Erstellung dynamischer Interfaces bringe ich Ideen schneller zum
              Leben und sorge für interaktive Erlebnisse, die überzeugen.
              <br />
              <strong>
                So entstehen interaktive Erlebnisse, die Ihre Zielgruppe
                langfristig binden.
              </strong>
            </p>
          </div>

          <div className={styles.advantage}>
            <h3 className={styles.advantageTitle}>Strategischer Mehrwert:</h3>
            <p className={styles.advantageText}>
              Ich unterstütze Unternehmen dabei, Design-Systeme und skalierbare
              Komponentenbibliotheken zu entwickeln, die Effizienz und
              Konsistenz langfristig sichern.
              <br />
              <strong>
                Das ermöglicht Ihnen, Ressourcen gezielt einzusetzen und
                schneller auf Marktanforderungen zu reagieren.
              </strong>
            </p>
          </div>
        </div>

        <button onClick={openModal} className={styles.aboutMeBtn}>
          Mehr über mich &rarr;
        </button>

        <div className={styles.projectBtnWrapper}>
          <Link to="/projects" className={styles.projectBtn}>
            Zu meinen Projekten
          </Link>
        </div>
      </Layout>

      <dialog ref={modalRef1}>
        <header>
          <button onClick={closeModal} aria-label="close modal">
            <CloseIcon />
          </button>
        </header>
        <div>
          <p>
            Ich bin <strong>Sascha Nabrotzky,</strong> verheiratet und als
            Familienvater mit zwei Kindern lebe ich im ländlichen Ladbergen.{" "}
            <br />
            Wenn ich mal nicht am programmieren bin oder Designs entwickle, dann
            bin ich entweder für meine Familie da oder stehe als Bogenschütze
            auf dem Trainingsplatz &minus; und eine weitere Leidenschaft, die
            mich beruflich häufig begleitet und erfolgreich unterstützt hat, ist
            das{" "}
            <Link to="https://sascha-nabrotzky.de/" target="_blank">
              Illustrieren.
            </Link>
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
