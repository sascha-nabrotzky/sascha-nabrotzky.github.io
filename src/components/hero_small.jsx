import React from "react"
import { Location } from '@reach/router'
import * as style from "../styles/hero_small.module.scss"

export default function Hero() {

  return (
    <section className={style.herocontainer}>
      <Location>
        {({ location }) => {
              return <h3 className={style.heroSmallHeading}>{location.pathname}</h3>
        }}
      </Location>
    </section>
  )
}
