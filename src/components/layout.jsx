import React from "react"
import Footer from "./footer"
import Header from "./header"
import Hero from "./hero"
import ToTopButton from "./ToTopButton"
import Snowflakes from "../components/snowflakes"
import * as layoutStyles from "../styles/layout.module.scss"

export default function Layout({ children }) {
  return (
    <div className={layoutStyles.container}>
      <Snowflakes />
      <Header />
      <Hero />
      <main className={layoutStyles.content}>{children}</main>
      <ToTopButton />
      <Footer />
    </div>
  )
}
