import React from "react"
import Layout from "../components/layout"
import SocialButton from "../styled-components/social-button"
import MailToButton from "../styled-components/mailto-button"
import { Helmet } from "react-helmet"

import * as contactStyles from "../styling/contact.module.scss"

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
        <html lang="de" />
      </Helmet>
      <Layout>
        <h1>Verlink dich mit mir!</h1>
        <p>
          Hier sind die wichtigsten Stellen im Internet, unter denen man mich
          erreicht oder weitere Arbeiten von mir findet.
        </p>
        <div className={contactStyles.socialBtnWrapper}>
          <SocialButton
            href="https://www.linkedin.com/in/sascha-nabrotzky-b7429521a/"
            alttext="LinkedIn-Profil"
            label="LinkedIn"
          />
          <SocialButton
            href="https://www.xing.com/label/Sascha_Nabrotzky/cv"
            alttext="Xing-Profil"
            label="Xing"
          />
          <SocialButton
            href="https://github.com/sascha-nabrotzky"
            alttext="GitHub-Repositorys"
            label="GitHub"
          />
          <SocialButton
            href="https://twitter.com/Arrow_Function0"
            alttext="Meine News"
            label="Twitter"
          />
          <SocialButton
            href="https://www.instagram.com/sascha_nabrotzky"
            alttext="Meine Illustrationen"
            label="Instagram"
          />
          <MailToButton
            href="mailto:sascha.nabrotzky@online.de"
            alttext="Schreiben Sie mir direkt"
            label="E-Mail"
          />
        </div>
      </Layout>
    </>
  )
}
