import React from "react";
import Layout from "../components/layout";
import * as aboutStyle from "../components/about.module.scss";
import fotoVonMir from "../images/Sascha_Nabrotzky_sw.jpg";
import TimeLineJSON from '../components/timeline.json';

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
            
            {TimeLineJSON.jahrtaetigkeit.map( (point) => {
                return (
                    <section key={point.jahr.toString()}>
                        <div className={aboutStyle.linie}></div>

                        <div className={aboutStyle.timeLinePoint}>
                            <div className={aboutStyle.circleImg}>
                                <p dangerouslySetInnerHTML={{ __html: point.jahr}}></p>
                            </div>
                            <p dangerouslySetInnerHTML={{ __html: point.taetigkeit}}></p>
                        </div>
                    </section>
                    )
                }) 
            }
        </Layout>
    )
}