import React from "react"
import { Location } from "@reach/router"
import * as style from "../styles/hero_small.module.scss"

const HeroSmall = () => {
  return (
    <section className={style.herocontainer}>
      <Location>
        {({ location }) => {
          return (
            <span className={style.heroSmallHeading}>{location.pathname}</span>
          )
        }}
      </Location>
    </section>
  )
}

export default HeroSmall
