import React from "react"
import Layout from "../components/layout"
import aboutStyle from "../components/about.module.scss"
import fotoVonMir from "../images/Sascha_Nabrotzky_sw.jpg"

export default function About() {

    return (
        <Layout> 
            <h1>Never stop learning!</h1>
            <p>Als verheirateter Familienvater mit zwei Kindern, lebe ich im ländlichen Ladbergen. Seit einigen Jahren ist die nutzerzentrierte Frontend-Entwicklung mein Interessengebiet, welches ich auch nebenberuflich für meine Weiterbildung betreibe. Um wirklich perfekte Websites und Werbemittel zu gestalten, wurde zusätzlich das UX-Design immer mehr angewandt und ist ein wichtiger Part in meiner Arbeit.</p>
            <p>Wenn ich mal nicht am PC sitze, dann bin ich häufig am fotografieren oder ich gehe mit dem Recurvebogen raus.</p>

            <div className={aboutStyle.timeLinePoint}>
                <div id="fotovonmir">
                    <img src={fotoVonMir} alt="Foto von Sascha Nabrotzky"/>
                </div>
            </div>
            
            <div className={aboutStyle.linie}></div>

            <div className={aboutStyle.timeLinePoint}>
                <div className={aboutStyle.circleImg}>
                    <p>2020</p>
                </div>
                <p>Website mit React JS, Gatsby JS, Git, Github, Node JS und npm programmiert | Weiterbildung in SCSS, React JS und JavaScript</p>
            </div>

            <div className={aboutStyle.linie}></div>

            <div className={aboutStyle.timeLinePoint}>
                <div className={aboutStyle.circleImg}>
                    <p>2019</p>
                </div>
                <p>Frontend-Entwickler/Mediengestalter bei einem Onlineshop eines Großhändlers |  Weiterbildung in UX/UI-Design, HTML5 und CSS3</p>
            </div>

            <div className={aboutStyle.linie}></div>

            <div className={aboutStyle.timeLinePoint}>
                <div className={aboutStyle.circleImg}>
                    <p>2017</p>
                </div>
                <p>Digitales Zeichnen: Licht und Farbe | Farbtheorie und Anwendung</p>
            </div>

            <div className={aboutStyle.linie}></div>

            <div className={aboutStyle.timeLinePoint}>
                <div className={aboutStyle.circleImg}>
                    <p>2016</p>
                </div>
                <p>Illustration von Kinderbüchern | digitale Fotos für iStock und Shutterstock |  Weiterbildung in Illustration | nutzerzentriertes Webdesign im Fokus</p>
            </div>

            <div className={aboutStyle.linie}></div>

            <div className={aboutStyle.timeLinePoint}>
                <div className={aboutStyle.circleImg}>
                    <p>2011</p>
                </div>
                <p>Websites in HTML, CSS und JQuery erstellt.</p>
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