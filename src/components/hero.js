import React from "react"
import heroStyles from "./hero.module.scss"
import changeHeroText from "../components/changeHeroText"

export default function Hero() {
    return(
        <div className={heroStyles.herocontainer}>
            <div><p>Frontend</p></div>
            <div><p>Entwicklung</p></div>
        </div>
    );
}

setInterval(() => {
    changeHeroText();
}, 8000); 
