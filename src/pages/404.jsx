import React from "react"
import Layout from "../components/Layout"

export default function About() {
  return (
    <Layout>
      <div>
        <h1>I can't find your Page!</h1>
        <p>This Page and Website is sometimes under construction!</p>
      </div>
    </Layout>
  )
}

export function Head() {
  return (
    <>
      <title>404 | Sascha Nabrotzky</title>
      <meta name="title" content="404 | Sascha Nabrotzky" />
      <meta name="description" content="404" />
      <meta name="keywords" content="404" />
      <html lang="de" />
    </>
  )
}
