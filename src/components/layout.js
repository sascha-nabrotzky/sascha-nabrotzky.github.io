import React from "react"
import Footer from "../components/footer"
import Header from "../components/header"
import layoutStyles from "./layout.module.css"

export default function Layout({ children }) {
    return (
        <div className={layoutStyles.container}>
            <div className={layoutStyles.content}>
                <Header />
                {children}
            </div>
            <Footer />
        </div>
    )
}