import React from "react"
import { Location } from "@reach/router"
import Footer from "./Footer"
import Header from "./Header"
import Hero from "./Hero"
import HeroSmall from "./HeroSmall"
import ToTopButton from "./ToTopButton"
import * as layoutStyles from "../styles/layout.module.scss"

const Layout = ({ children }) => {
  return (
    <div className={layoutStyles.container}>
      <Header />
      <Location>
        {({ location }) => {
          if (location.pathname === "/") return <Hero />
          return <HeroSmall />
        }}
      </Location>
      <main className={layoutStyles.content}>{children}</main>
      <ToTopButton />
      <Footer />
    </div>
  )
}

export default Layout
