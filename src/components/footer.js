import React from "react"
import { Link } from "gatsby"
import footerStyles from "./footer.module.css"

export default function Footer() {
    return (
        <footer> 
            <ul className={footerStyles.footerNavList}>
                <li>
                    <Link className={footerStyles.footerNavLink} activeClassName={footerStyles.activeFooterNavLink} to="/">Impressum</Link>
                </li>
                <li>
                    <Link className={footerStyles.footerNavLink} activeClassName={footerStyles.activeFooterNavLink} to="/">Datenschutz</Link>
                </li>
            </ul>
        </footer>
    )
}