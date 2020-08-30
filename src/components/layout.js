import React from "react"
import Footer from "../components/footer"
import Header from "../components/header"
import Hero from "./herohome"

import layoutStyles from "./layout.module.scss"

export default function Layout({ children }) {
    return (
        <div className={layoutStyles.container}>
            <Header />
            <Hero />
            <div className={layoutStyles.content}>
                {children}
            </div>
            <Footer />
        </div>
    )
}