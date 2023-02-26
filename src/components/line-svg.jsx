import React, { useEffect, useState } from "react"
import * as style from "../styling/line-svg.module.scss"

export default function LineSvg() {
  const length = 2183.94189453125

  const [pathOffset, setOffset] = useState(length)
  const [currentColor, setColor] = useState("rgba(35, 166, 213, 0)")

  useEffect(() => {
    const svgImage = document.querySelector("svg")
    window.addEventListener("scroll", () => {
      let bounding = svgImage.getBoundingClientRect()
      if (bounding.top >= 0 && bounding.bottom < window.innerHeight - 100) {
        setOffset(0)
        setTimeout(() => {
          setColor("rgba(35, 166, 213,1)")
        }, 1500)
      }
    })
  }, [])

  return (
    <svg
      className={style.pathSvg}
      viewBox="0 0 800 240"
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit="1.5"
    >
      <path
        id="pathFill"
        className={style.pathFill}
        style={{ fill: `${currentColor}` }}
        d="M348.578 173.172c-.98-2.989-2.454-5.782-3.517-7.376-1.017-1.522-3.373-5.109-1.123-6.236 3.143-1.576 7.129-1.758 10.576-1.96 7.53-.44 16.048-.575 23.25 2.027 2.194.792 3.993 2.014 5.671 3.612 1.063 1.01 2.205 2.746 3.84 2.796 1.799.055 3.62-1.382 4.984-2.392 3.4-2.52 6.35-5.946 10.04-8.043 11.65-6.623 26.572 2.116 27.558 15.394.308 4.151-2.612 7.25-6.732 5.141-2.631-1.346-4.238-3.819-6.342-5.78-2.808-2.618-6.978-4.403-10.8-4.691-11.09-.838-17.723 12.8-29.436 10.675-6.501-1.18-10.305-6.663-16.104-9.22-2.927-1.29-6.7-1.674-9.037.955-1.433 1.61-2.343 3.326-2.828 5.098.997 3.042 1.483 6.285.5 8.67 2.243 6.69 8.073 13.098 12.666 16.82a50.37 50.37 0 0 0 6.104 4.225c2.454 1.45 4.908 2.888 7.336 4.381.807.496 2.23 1.519 3.24 1.279 6.322-1.502-.34-8.73-3.102-9.89-1.21-.506-2.789-.483-3.886-1.176-.804-.508-.461-1.416.005-2.053 5.256-7.168 14.97 1.35 21.321-.627 3.526-1.097 9.808-5.732 13.652-4.08 2.24.962 2.257 3.154.558 4.647-3.04 2.673-6.954 2.149-9.1 6.013-2.519 4.533 1.671 7.792 5.96 7.071 11.768-1.98 14.93-18.741 20.445-27.163 2.097-3.204 5.19-5.509 7.686-8.377 1.704-1.958 2.86-4.345 4.307-6.489 2.527-3.743 6.113-6.679 10.359-8.186 1.687-.599 3.833-1.645 5.392-.271 2.063 1.818 4.206 6.236 1.804 7.148-9.675 3.67-7.94 7.201-7.277 15.189.627 7.555-1.777 13.7-4.878 20.576-6.25 13.853-10.533 25.223-26.913 29.588-8.758 2.333-25.974 9.905-34.51 8.136-8.73-1.81-11.176-1.251-17.508-6.025-5.983-4.51-10.337-11.34-15.374-16.606-9.768-10.217-17.797-22.765-27.295-33.244-2.575-3.034-5.296-7.014-5.13-11.199.243-6.078 8.277-9.634 13.596-8.714 7.397 1.278 9.971 9.611 11.63 15.907.574 2.184 1.88 7.169 4.958 6.37 2.09-.542 3.325-1.719 3.955-3.25-.973-2.903-1.271-5.858-.501-8.67Zm-40.142-64.512c0 3.195.661 6.68 2.83 9.156 2.382 2.72 5.966 3.202 8.273.01.676-.934 1.175-1.974 1.556-3.059 1.684-4.796.742-9.853.499-14.793-.202-4.118 1.075-8.203.79-12.315-.51-7.353-3.055-16.118-1.405-23.355 1.766-7.744 8.595-12.815 13.655-18.397 4.272-4.712 7.124-10.081 13.945-11.16 5.305-.837 10.239 2.21 14.932 4.165 3.646 1.519 7.363 2.473 11.298 2.852 10.512 1.011 21.024.732 31.393-1.11 5.905-1.047 10.933-5.546 16.797-6.157 2.209-.23 4.197 1.147 6.018 2.19 3.744 2.142 7.106 4.31 9.53 7.99 2.562 3.892 5.202 8.645 6.293 13.193 2.906 12.1.368 25.392 2.445 37.696.762 4.518 2.002 8.902 3.227 13.308.12.43.674 3.98 1.162 4.072 1.343.255 3.173-3.025 3.603-3.972 2.03-4.464.807-10.672.753-15.431-.086-7.662-.842-15.076-1.52-22.698-.41-4.61-.297-9.271-1.33-13.81-.912-4.003-2.943-7.564-4.257-11.421-1.278-3.754-2.406-7.747-4.32-11.237-3.385-6.175-9.54-10.044-15.137-14.03-4.611-3.285-8.492-8.273-13.575-10.777-6.813-3.357-14.919-3.578-22.226-5.424-5.778-1.46-13.54-4.905-19.49-3.995C364.03 1.7 357.472 4.996 348.28 9.256c-4.41 2.045-12.112 7.244-16.523 9.248-5.182 2.353-9.646 6.543-13.241 10.878-6.193 7.468-8.08 18.514-9.537 27.83-.764 4.887-3.48 9.26-4.011 14.263-.618 5.825 1.014 11.574 1.542 17.333.657 7.15.514 12.787 1.925 19.852Z"
      />
      <path
        id="pathLine"
        className={style.pathLine}
        style={{ strokeDashoffset: `${pathOffset}` }}
        d="M0 141.853c9.188-3.078 25.36.664 34.763 2.037 28.045 4.09 55.345 14.976 83.45 17.831 17.501 1.778 35.05 2.615 52.565.51 16.679-2.006 32.664-7.719 49.179-10.482 18.22-3.05 39.035-.717 53.217-.63 10.564.065 28.348 7.21 31.868 1.15 2.078-3.576-.27-9.173-1.76-12.597-3.077-7.067-6.89-15.142-5.491-23.055 1.54-8.717 9.841-1.63 11.298-2.634.153-.105-1.245-4.16-1.333-4.49-.793-2.986-1.3-5.996-1.345-9.09-.204-14.456-.511-29.333.516-43.756 1.546-21.683 14.134-30.836 31.3-41.489 17.668-10.965 36.239-19.564 59.735-10.404 9.054 3.53 17.68 3.173 24.875 8.984 7.72 6.233 16.036 12.796 21.44 21.254 11.113 17.39 15.99 55.895 12.131 76.056-.155.813.928-1.371 1.396-2.053 1.268-1.85 1.257-2.397 3.324-1.828 5.675 1.564 8.232 5.29 7.87 11.03-.735 11.706-1.258 30.469-7.838 40.375-3.793 5.713-11.752 4.872-14.585 11.433-2.615 6.053 1.038 12.523-.052 18.752-2.94 16.798-18.106 37.35-34.392 42.646-11.281 3.669-28.91 9.414-40.723 6.313-7.734-2.03-13.323-9.577-18.24-15.35-9.217-10.825-18.56-21.481-27.829-32.283-4.331-5.049-11.21-12.044-12.329-18.867-1.415-8.634 4.29-16.75 5.131-25.131 1.545-15.397-10.038-31.15 6.934-42.644 12.964-8.78 28.556-6.544 40.918 1.576 2.266 1.489 12.518 7.147 11.182 10.561-3.809 9.736-19.312 7.316-27.279 6.594-1.815-.165-8.982-.373-9.825-2.462-.17-.425 2.95-2.916 3.336-3.217 4.25-3.314 8.81-4.098 14.069-4.198 8.811-.172 17.233 2.52 25.978 2.633 10.009.13 20.956-2.952 30.889-4.359 3.584-.508 15.249-2.714 17.607 1.964 2.046 4.057-8.275 9.139-10.676 9.702-17.966 4.206-34.808-12.941-11.535-22.153 3.78-1.497 8-2.633 12.06-2.973 30.92-2.598 27.681 38.346 27.027 58.663-.202 6.246.73 13.537-1.046 19.587-4.271 14.552-23.714 8.455-31.41 1.612-1.622-1.442-4.827-8.302-6.502-8.771-6.602-1.85-22.008 6.948-30.524 6.727-6.087-.157-13.146-2.211-18.74-4.538-2.11-.878-6.995-3.98-9.246-3.63-1.04.162-.911 4.216-.809 4.893.698 4.601 3.228 9.264 6.991 12.046 12.145 8.983 29.133 6.308 42.02.63 4.36-1.92 11-4.502 12.818-9.41 3.255-8.783-3.749-15.122-11.872-15.6-12.833-.752-20.541 6.944-32.34-2.556-2.431-1.955-5.476-5.013-6.052-8.23-.256-1.426 3.838-3.341 4.706-3.695 5.04-2.059 10.33-1.06 12.855-6.776 2.958-6.696-.784-19.419 4.378-24.552 1.606-1.596 5.92.042 7.549.85 6.94 3.443 11.713 9.53 13.308 17.166.704 3.369-.637 6.907.03 10.104.792 3.785 4.236 6.834 3.471 10.932-.879 4.707-7.232 7.575-6.337 12.9.597 3.553 5.832 5.883 8.437 7.767 8.72 6.308 20.314 15.202 31.86 13.25 8.968-1.518 15.896-9.783 23.852-13.659 13.885-6.766 28.983-10.385 44.376-11.356 11.717-.738 23.72-.74 35.192 2.092 7.162 1.77 13.766 5.254 21.084 6.623 16.354 3.06 33.15 3.781 49.692 1.934 26.73-2.983 50.537-16.155 76.308-22.91 12.966-3.398 25.786-3.581 39.134-3.634 8.347-.033 17.396-.834 25.604 1.12 16.987 4.047 26.253 7.772 42.384 8.753"
      />
    </svg>
  )
}