import React from "react"
import { Location } from '@reach/router'
import Footer from "./footer"
import Header from "./header"
import Hero from "./hero"
import HeroSmall from "./hero_small"
import ToTopButton from "./ToTopButton"
import Snowflakes from "../components/snowflakes"
import * as layoutStyles from "../styles/layout.module.scss"

export default function Layout({ children }) {

  return (
    <div className={layoutStyles.container}>
      <Header />
      <Location>
        {({ location }) => {
          if (location.pathname === '/') return <Hero />
          return <HeroSmall />
        }}
      </Location>
      <main className={layoutStyles.content}>{children}</main>
      <ToTopButton />
      <Footer />
    </div>
  )
}
