import React from "react"
import heroStyles from "./hero.module.scss"

export default function Hero() {
    return(
        <div className={heroStyles.herocontainer}>
            <div><p>UX-Designer</p></div>
            <div><p>Front-Ender</p></div>
        </div>
    )

}