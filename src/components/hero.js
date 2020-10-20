import React from "react"
import heroStyles from "./hero.module.scss"

export default function Hero() {
    return(
        <div className={heroStyles.herocontainer}>
            <div><p>Webdesign</p></div>
            <div><p>UX-Design</p></div>
        </div>
    )

}