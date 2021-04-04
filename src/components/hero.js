import React from "react"
import * as heroStyles from "./hero.module.scss"

export default function Hero() {

    return(
        <section className={heroStyles.herocontainer}>
            <div className={heroStyles.overflowcontainer}><p>Frontend</p></div>
            <div className={heroStyles.overflowcontainer}><p>Entwicklung</p></div>
        </section>
    );
}