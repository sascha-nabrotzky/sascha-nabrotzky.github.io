import React from "react"
import { Location } from '@reach/router'
import * as style from "../styles/hero_small.module.scss"

export default function Hero() {

  return (
    <section className={style.herocontainer}>
      <h3 className={style.heroSmallHeading}>
      <Location>
        {({ location }) => {
              return <h3>{location.pathname}</h3>
        }}
      </Location>

      </h3>
    </section>
  )
}
