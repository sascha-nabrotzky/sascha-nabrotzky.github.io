import React from "react"
import { Link } from "gatsby"
import * as styles from "../styles/footer.module.css"

const Footer = () => {
  return (
    <footer>
      <ul className={styles.footerNavList}>
        <li>
          <Link
            className={styles.footerNavLink}
            activeClassName={styles.activeFooterNavLink}
            to="/impressum"
          >
            Impressum
          </Link>
        </li>
        <li>
          <Link
            className={styles.footerNavLink}
            activeClassName={styles.activeFooterNavLink}
            to="/datenschutz"
          >
            Datenschutz
          </Link>
        </li>
        <li>
          <span className={styles.copyright}>&copy; 2024 Sascha Nabrotzky</span>
        </li>
      </ul>
    </footer>
  )
}

export default Footer
