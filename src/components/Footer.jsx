import React from "react"
import { Link } from "gatsby"
import * as styles from "../styles/footer.module.css"

function Footer() {
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
      </ul>
    </footer>
  )
}

export default Footer
