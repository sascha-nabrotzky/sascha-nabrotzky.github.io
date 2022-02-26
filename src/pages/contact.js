import React from "react"
import Layout from "../components/layout"
import { Helmet } from "react-helmet"

import * as contactStyles from "../components/contact.module.scss"

export default function Contact() {
  return (
    <>
      <Helmet>
        <title>Kontakt | Sascha Nabrotzky</title>
        <meta
          name="title"
          content="Kontakt & Social Media | Sascha Nabrotzky"
        />
        <meta
          name="description"
          content="Schreib mich an oder erfahre mehr über mich"
        />
        <meta
          name="keywords"
          content="Kontakt, Social Media, Xing, Instagram, Twitter, Github"
        />
      </Helmet>
      <Layout>
        <h1>Verlink dich mit mir!</h1>
        <p>
          Hier sind die wichtigsten Stellen im Internet, unter denen man mich
          erreicht oder weitere Arbeiten von mir findet.
        </p>
        <div className={contactStyles.socialBtnWrapper}>
          <a
            className={contactStyles.socialBtn}
            href="https://www.linkedin.com/in/sascha-nabrotzky-b7429521a/"
            alt="LinkedIn-Profil"
            target="_blank"
            rel="noreferrer"
          >
            <p>LinkedIn</p>
          </a>
          <a
            className={contactStyles.socialBtn}
            href="https://www.xing.com/profile/Sascha_Nabrotzky/cv"
            alt="Xing-Profil"
            target="_blank"
            rel="noreferrer"
          >
            <p>Xing</p>
          </a>
          <a
            className={contactStyles.socialBtn}
            href="https://github.com/sascha-nabrotzky"
            alt="GitHub-Repositorys"
            target="_blank"
            rel="noreferrer"
          >
            <p>GitHub</p>
          </a>

          <a
            className={contactStyles.socialBtn}
            href="https://twitter.com/Arrow_Function0"
            alt="Meine News"
            target="_blank"
            rel="noreferrer"
          >
            <p>Twitter</p>
          </a>
          <a
            className={contactStyles.socialBtn}
            href="mailto:sascha.nabrotzky@online.de"
            alt="Schreiben Sie mir direkt"
          >
            <p>E-Mail</p>
          </a>
        </div>
      </Layout>
    </>
  )
}
