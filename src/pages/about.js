import React from "react"
import Layout from "../components/layout"
import aboutStyle from "../components/about.module.scss"
import fotoVonMir from "../images/Sascha_Nabrotzky_sw.jpg"

export default function About() {

    return (
        <Layout> 
            <h1>Never stop learning!</h1>
            <p>Als verheirateter Familienvater mit zwei Kindern, lebe ich im ländlichen Ladbergen. Seit Jahren ist die <strong>nutzerzentrierte Frontend-Entwicklung mein Interessengebiet,</strong> welches ich hauptberuflich und nebenberuflich betreibe.</p>
            <p>Ich habe mir das Erstellen von Websites 2009 selber beigebracht und lerne ständig durch verschiedene Projekte in meiner Freizeit dazu, dadurch kann ich mich sehr zielgerichtet und schnell weiterbilden oder Probleme in Projekten lösen. Es gibt aber noch sehr viel zu lernen.</p>
            <p>Wenn ich mal nicht am PC sitze, dann bin ich häufig am fotografieren oder ich gehe mit dem Recurvebogen raus.</p>

            <div className={aboutStyle.timeLinePoint}>
                <div id="fotovonmir">
                    <img src={fotoVonMir} alt="Foto von Sascha Nabrotzky"/>
                </div>
            </div>
            
            <div className={aboutStyle.linie}></div>

            <div className={aboutStyle.timeLinePoint}>
                <div className={aboutStyle.circleImg}>
                    <p>2021</p>
                </div>
                <p>React-App | PHP | Web-Apps mit ReactJS und GraphQL</p>
            </div>
            
            <div className={aboutStyle.linie}></div>

            <div className={aboutStyle.timeLinePoint}>
                <div className={aboutStyle.circleImg}>
                    <p>2020</p>
                </div>
                <p>Weiterbildung in JavaScript, ReactJS, GatsbyJS, GraphQL, Github, npm, und SCSS</p>
            </div>

            <div className={aboutStyle.linie}></div>

            <div className={aboutStyle.timeLinePoint}>
                <div className={aboutStyle.circleImg}>
                    <p>2019</p>
                </div>
                <p>Mediengestalter digital (Frontend-Entwickler) bei einem Onlineshop eines Großhändlers | Weiterbildung in UX/UI-Design | mehrere Website-Projekte</p>
            </div>

            <div className={aboutStyle.linie}></div>

            <div className={aboutStyle.timeLinePoint}>
                <div className={aboutStyle.circleImg}>
                    <p>2017</p>
                </div>
                <p>Template-Entwicklung für Joomla! | Animationen mit CSS3</p>
            </div>

            <div className={aboutStyle.linie}></div>

            <div className={aboutStyle.timeLinePoint}>
                <div className={aboutStyle.circleImg}>
                    <p>2016</p>
                </div>
                <p>nutzerzentriertes Webdesign und HTML5 | Illustration</p>
            </div>

            <div className={aboutStyle.linie}></div>

            <div className={aboutStyle.timeLinePoint}>
                <div className={aboutStyle.circleImg}>
                    <p>2009</p>
                </div>
                <p>Portfolio-Websites mit Animationen in HTML, CSS3 und JQuery erstellt.</p>
            </div>

            <div className={aboutStyle.linie}></div>

            <div className={aboutStyle.timeLinePoint}>
                <div className={aboutStyle.circleImg}>
                    <p>2000</p>
                </div>
                <p>Mediengestalter bei einem großen Zeitungsverlag</p>
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