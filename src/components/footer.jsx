import React from "react"
import { Link } from "gatsby"
import * as footerStyles from "../styles/footer.module.scss"

export default function Footer() {
  return (
    <footer>
      <ul className={footerStyles.footerNavList}>
        <li>
          <Link
            className={footerStyles.footerNavLink}
            activeClassName={footerStyles.activeFooterNavLink}
            to="/impressum"
          >
            Impressum
          </Link>
        </li>
        <li>
          <Link
            className={footerStyles.footerNavLink}
            activeClassName={footerStyles.activeFooterNavLink}
            to="/datenschutz"
          >
            Datenschutz
          </Link>
        </li>
      </ul>
    </footer>
  )
}
