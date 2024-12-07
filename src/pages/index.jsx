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
          Meine Leidenschaft für <strong>UX-Design </strong>und{" "}
          <strong>Frontend-Entwicklung </strong>motiviert mich, innovative und{" "}
          <strong>benutzerzentrierte Lösungen </strong>zu gestalten, die
          Funktionalität und Ästhetik vereinen. Mein Ziel ist es, Produkte zu
          schaffen, die nicht nur die Erwartungen der Nutzer übertreffen,
          sondern auch <strong>messbar zum Geschäftserfolg beitragen. </strong>
          Ich optimiere die Zusammenarbeit zwischen Design- und Entwicklerteams,
          indem ich Prototypen und UI-Komponenten direkt in produktionsreifen
          Code überführe.
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
            <Link to="https:/sascha-nabrotzky.de" target="_blank">
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
