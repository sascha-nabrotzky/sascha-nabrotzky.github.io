import React from "react"
import Layout from "../components/layout"
import aboutStyle from "../components/about.module.scss"

export default function About() {
    return (
        <Layout> 
            <h1>Hallo!</h1>
            <p>Ich bin Sascha Nabrotzky und meine berufliche Passion ist das Entwicklen von Websites. Ich wurde in den 90ern zum Schriftsetzer/Mediengestalter ausgebildet und kam nach und nach zum Webdesign, als ich immer deutlicher merkte, wie flexibel die digitale Gestaltung war und der Printbereich immer mehr zurückgedrängt wurde.</p>

            <div className={aboutStyle.timeLinePoint}>
                <div className={aboutStyle.circleImg}>
                    2020
                </div>
                <p>Erste Schritte mit React, GatsbyJS, Git, Github , NodeJS und npm </p>
            </div>

            <div className={aboutStyle.linie}></div>

            <div className={aboutStyle.timeLinePoint}>
                <div className={aboutStyle.circleImg}>
                    2019
                </div>
                <p>Frontend-Entwickler/Mediengestalter bei einem Großhändler</p>
            </div>

            <div className={aboutStyle.linie}></div>

            <div className={aboutStyle.timeLinePoint}>
                <div className={aboutStyle.circleImg}>
                    2017
                </div>
                <p>Erste Schritte in JavaScript und weitere Online-Kurse belegt</p>
            </div>

            <div className={aboutStyle.linie}></div>

            <div className={aboutStyle.timeLinePoint}>
                <div className={aboutStyle.circleImg}>
                    2008
                </div>
                <p>Nebenberuflich als Frontend-Entwickler. Erste Seiten in HTML, CSS und Jquery erstellt.</p>
            </div>

            <div className={aboutStyle.linie}></div>

            <div className={aboutStyle.timeLinePoint}>
                <div className={aboutStyle.circleImg}>
                    2000
                </div>
                <p>Mediengestalter bei einem Verlag</p>
            </div>

            <div className={aboutStyle.linie}></div>

            <div className={aboutStyle.timeLinePoint}>
                <div className={aboutStyle.circleImg}>
                1997
                </div>
                <p>Ausbildung zum Schriftsetzer</p>
            </div>
        </Layout>
    )
}