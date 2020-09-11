import React from "react"
import Layout from "../components/layout"
import aboutStyle from "../components/about.module.scss"

export default function About() {

    return (
        <Layout> 
            <h1>Hallo!</h1>
            <p>Ich bin Sascha Nabrotzky und meine berufliche Passion ist das Programmieren von nutzerzentrierten Websites mit vorhergehendem analysieren der Gesamtsituation und dem Prototyping der Website. Seit einigen Jahren ist die Frontend-Entwicklung mein liebstes Interessengebiet und ich bildete mich dafür im Bereich UX-Design zusätzlich weiter.</p>

            <div className={aboutStyle.timeLinePoint}>
                <div className={aboutStyle.circleImg}>
                    <p>2020</p>
                </div>
                <p>Website mit ReactJS, GatsbyJS, Git, Github, NodeJS und npm programmiert. Weiterbildung in SCSS, ReactJS und JavaScript</p>
            </div>

            <div className={aboutStyle.linie}></div>

            <div className={aboutStyle.timeLinePoint}>
                <div className={aboutStyle.circleImg}>
                    <p>2019</p>
                </div>
                <p>Frontend-Entwickler/Mediengestalter bei einen Onlineshop eines Großhändlers. Weiterbildung in UX/UI-Design, HTML5 und CSS3</p>
            </div>

            <div className={aboutStyle.linie}></div>

            <div className={aboutStyle.timeLinePoint}>
                <div className={aboutStyle.circleImg}>
                    <p>2017</p>
                </div>
                <p>Erste Schritte in JavaScript</p>
            </div>

            <div className={aboutStyle.linie}></div>

            <div className={aboutStyle.timeLinePoint}>
                <div className={aboutStyle.circleImg}>
                    <p>2008</p>
                </div>
                <p>Nebenberuflich als Frontend-Entwickler. Websites in HTML, CSS und JQuery erstellt.</p>
            </div>

            <div className={aboutStyle.linie}></div>

            <div className={aboutStyle.timeLinePoint}>
                <div className={aboutStyle.circleImg}>
                    <p>2000</p>
                </div>
                <p>Mediengestalter bei einem Verlag</p>
            </div>

            <div className={aboutStyle.linie}></div>

            <div className={aboutStyle.timeLinePoint}>
                <div className={aboutStyle.circleImg}>
                <p>1997</p>
                </div>
                <p>Ausbildung zum Schriftsetzer</p>
            </div>
        </Layout>
    )
}