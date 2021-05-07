import React, { useState, useEffect } from "react"
import * as gitProjectStyles from '../components/githubprojects.module.scss';

export default function FetchGithubProjects(props) {

    let [ data, setData ] = useState(null); //data auf null setzen, danach mit Funkt. setData die commits fetchen und Projektdaten mappen

   useEffect(async () => {
    let responseFromUrl = await fetch('https://api.github.com/users/sascha-nabrotzky/repos');
    let commits = await responseFromUrl.json();
    setData(commits);
   }, []);

    if (!data) return <p>Loading ...</p>;

   return (
        <section>
            <h3>Projekte auf Github</h3>
            <div className={gitProjectStyles.projectsWrapper}>
            {data.map( (project) => {
                return (
                    <a href={project.clone_url} rel="noreferrer noopener" target="_blank">
                        <div className={gitProjectStyles.projectsBox} key={project.id}>
                            <h4 dangerouslySetInnerHTML={{ __html: project.name }}></h4>
                            <p dangerouslySetInnerHTML={{ __html: project.description }}></p>
                            <div className={gitProjectStyles.updated}>
                                <p>Updated at:</p>
                                <date dangerouslySetInnerHTML={{ __html: project.updated_at }}></date>
                            </div>
                        </div>
                    </a>
                )
            })}
            </div>
        </section>
        );
}