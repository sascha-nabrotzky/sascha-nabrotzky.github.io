import React from "react"
import Layout from "../components/layout"

import contactStyles from "../components/contact.module.scss"

export default function Contact() {
    return (
        <Layout> 
            <h1>Verlink dich mit mir!</h1>
            <p>Hier sind die wichtigsten Stellen im Internet, bei denen man mich erreicht oder weitere Arbeiten von mir findet. Physisch hier: <strong>Koldefeld 11, 49549 Ladbergen.</strong></p>
            <div className={contactStyles.socialBtnWrapper}>
            <a className={contactStyles.socialBtn} href="mailto:sascha.nabrotzky@online.de" alt="Schreiben Sie mir direkt">
                    <p>E-Mail</p>
            </a>
            <a className={contactStyles.socialBtn} href="https://github.com/sascha-nabrotzky" alt="GitHub-Repositorys" target="_blank" rel="noreferrer">
                    <p>GitHub</p>
            </a>
            <a className={contactStyles.socialBtn} href="https://www.xing.com/profile/Sascha_Nabrotzky/cv" alt="Xing-Profil" target="_blank" rel="noreferrer">
                    <p>Xing</p>
            </a>
            <a className={contactStyles.socialBtn} href="https://www.instagram.com/arrow_function0/" alt="Instagram - Blick hinter die Kulissen" target="_blank" rel="noreferrer">
                    <p>Instagram</p>
            </a>
            <a className={contactStyles.socialBtn} href="https://twitter.com/Arrow_Function0" alt="Meine News" target="_blank" rel="noreferrer">
                    <p>Twitter</p>
            </a>
                
            </div>
        </Layout>
    )
}