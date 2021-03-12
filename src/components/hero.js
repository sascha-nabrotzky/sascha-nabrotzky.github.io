import React from "react"
import heroStyles from "./hero.module.scss"
import changeHeroText from "../components/changeHeroText"

export default function Hero() {
    return(
        <div className={heroStyles.herocontainer}>
            <div className={heroStyles.overflowcontainer}><p>Frontend</p></div>
            <div className={heroStyles.overflowcontainer}><p>Entwicklung</p></div>
        </div>
    );
}

setInterval(() => {
    changeHeroText();
}, 6000); 
