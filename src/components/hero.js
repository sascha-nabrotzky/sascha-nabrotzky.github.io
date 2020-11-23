import React from "react"
import heroStyles from "./hero.module.scss"

export default function Hero() {
    return(
        <div className={heroStyles.herocontainer}>
            <div><p>Frontend</p></div>
            <div><p>Development</p></div>
        </div>
    )

}