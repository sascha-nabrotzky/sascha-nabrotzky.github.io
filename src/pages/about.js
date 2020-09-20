import React from "react"
import Layout from "../components/layout"
import aboutStyle from "../components/about.module.scss"

export default function About() {

    return (
        <Layout> 
            <h1>Never stop learning!</h1>
            <p>Als verheirateter Familienvater mit zwei Kindern, lebe ich in einem Einfamilienhaus im ländlichen Ladbergen. Seit einigen Jahren ist die Frontend-Entwicklung mein Interessengebiet, welches ich nebenberuflich für meine Weiterbildung betreibe und der Bereich UX-Design kam noch dazu, da ich professionell perfekt überlegte Entscheidungen treffen wollte.</p>
            <p><strong>Ich liebe es im Großen und Ganzen zu denken und Zusammenhänge zu erkennen.</strong></p>
            <p>Wenn ich mal nicht am PC sitze, dann bin ich häufig am fotografieren, am liebsten analog oder im Garten beim Grillen, zu selten beim Joggen.</p>

            <div className={aboutStyle.linie}></div>

            <div className={aboutStyle.timeLinePoint}>
                <div className={aboutStyle.circleImg}>
                    <p>2020</p>
                </div>
                <p>Website mit ReactJS, GatsbyJS, Git, Github, NodeJS und npm programmiert  Weiterbildung in SCSS, ReactJS und JavaScript</p>
            </div>

            <div className={aboutStyle.linie}></div>

            <div className={aboutStyle.timeLinePoint}>
                <div className={aboutStyle.circleImg}>
                    <p>2019</p>
                </div>
                <p>Frontend-Entwickler/Mediengestalter bei einen Onlineshop eines Großhändlers |  Weiterbildung in UX/UI-Design, HTML5 und CSS3</p>
            </div>

            <div className={aboutStyle.linie}></div>

            <div className={aboutStyle.timeLinePoint}>
                <div className={aboutStyle.circleImg}>
                    <p>2017</p>
                </div>
                <p>Digitales Zeichnen: Licht und Farbe - für Farbshemen</p>
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