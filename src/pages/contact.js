import React from "react"
import Layout from "../components/layout"

import contactStyles from "../components/contact.module.scss"

export default function Contact() {
    return (
        <Layout> 
            <h1>Sie wollen noch mehr sehen?</h1>
            <p>Hier sind die wichtigsten Stellen im Internet, bei denen man weitere Arbeiten von mir findet oder etwas hinter die Kulissen blicken kann.</p>
            <div className={contactStyles.socialBtnWrapper}>
            <a className={contactStyles.socialBtn} href="https://github.com/sascha-nabrotzky" alt="GitHub-Repositorys" target="_blank">
                    <p>GitHub</p>
            </a>
            <a className={contactStyles.socialBtn} href="https://www.xing.com/profile/Sascha_Nabrotzky/cv" alt="Xing-Profil" target="_blank">
                    <p>Xing</p>
            </a>
            <a className={contactStyles.socialBtn} href="https://www.instagram.com/frontenddev_design/" alt="Instagram - Blick hinter die Kulissen" target="_blank">
                    <p>Instagram</p>
            </a>
            <a className={contactStyles.socialBtn} href="https://twitter.com/FrontendDevSN" alt="Meine News" target="_blank">
                    <p>Twitter</p>
            </a>
                
            </div>
        </Layout>
    )
}