import React, { useEffect, useState } from "react"
import * as style from "../styling/sidemenu.module.scss"

export default function Sidemenu() {
  const [listItem, setListItem] = useState("sidemenu")

  useEffect(() => {
    const headlines = document.querySelectorAll("h3")
    setListItem(Array.from(headlines))
  }, [setListItem])

  return (
    <ul className={style.sidemenu}>
      <li className={style.menuitem}>
        <a className={style.menulink} href={`#${listItem[0].id}`}>
          {" "}
          {listItem[0].innerText}
        </a>
      </li>
      <li className={style.menuitem}>
        <a className={style.menulink} href={`#${listItem[1].id}`}>
          {" "}
          {listItem[1].innerText}
        </a>
      </li>
      <li className={style.menuitem}>
        <a className={style.menulink} href={`#${listItem[2].id}`}>
          {" "}
          {listItem[2].innerText}
        </a>
      </li>
      <li className={style.menuitem}>
        <a className={style.menulink} href={`#${listItem[3].id}`}>
          {" "}
          {listItem[3].innerText}
        </a>
      </li>
    </ul>
  )
}
