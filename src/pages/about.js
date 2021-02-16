import React from "react"
import Layout from "../components/layout"
import aboutStyle from "../components/about.module.scss"
import fotoVonMir from "../images/Sascha_Nabrotzky_sw.jpg"

export default function About() {

    return (
        <Layout> 
            <h1>Never stop learning!</h1>
            <p>Als verheirateter Familienvater mit zwei Kindern, lebe ich im ländlichen Ladbergen. Seit Jahren ist die <strong>nutzerzentrierte Frontend-Entwicklung mein Interessengebiet,</strong> welches ich hauptberuflich und nebenberuflich betreibe.</p>
            <p>Ich habe mir das Erstellen von Websites 2009 selber beigebracht und lerne zusätzlich durch Onlinekurse und vielen Büchern dazu, um fehlendes Wissen schnell und effektiv auch in freien Minuten anzueignen. <strong>Das ermöglicht es mir sehr zielgerichtet und zügig Probleme zu lösen.</strong></p>
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
                <p>PHP | SQL</p>
            </div>
            
            <div className={aboutStyle.linie}></div>

            <div className={aboutStyle.timeLinePoint}>
                <div className={aboutStyle.circleImg}>
                    <p>2020</p>
                </div>
                <p>Weiterbildung in JavaScript, React.js, Gatsby.js, Git, Github, Node.js, npm, und SCSS</p>
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
                <p>nutzerzentriertes Webdesign und HTML5 | Illustration von Kinderbüchern</p>
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