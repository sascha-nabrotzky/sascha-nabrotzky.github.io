"use strict";(self.webpackChunksascha_nabrotzky_github_io=self.webpackChunksascha_nabrotzky_github_io||[]).push([[615],{5550:function(e,t,n){n.d(t,{Z:function(){return L}});var a=n(7294),l=n(7896),r=n(4160),c="footer-module--activeFooterNavLink--27d69",o="footer-module--footerNavLink--66b52",m="footer-module--footerNavList--42137";function s(){return a.createElement("footer",null,a.createElement("ul",{className:m},a.createElement("li",null,a.createElement(r.rU,{className:o,activeClassName:c,to:"/impressum"},"Impressum")),a.createElement("li",null,a.createElement(r.rU,{className:o,activeClassName:c,to:"/datenschutz"},"Datenschutz"))))}var i="header-module--activeNavLink--c8e4e",u="header-module--author--b2dce",d="header-module--circle1--3b2c6",E="header-module--circle2--9f984",h="header-module--header--48f8f",f="header-module--logo--37af0",g="header-module--logowrapper--4d9ce",k="header-module--navLink--de88a",N="header-module--navList--6293d";function p(){const e=(0,r.K2)("2748089671");return a.createElement("header",{className:h},a.createElement("div",{className:g},a.createElement(r.rU,{className:f,to:"/"},a.createElement("div",{className:d}),a.createElement("div",{className:E}),a.createElement("p",null,"s/n")),a.createElement("p",{className:u},e.site.siteMetadata.author)),a.createElement("nav",null,a.createElement("ul",{className:N},a.createElement("li",null,a.createElement(r.rU,{className:k,activeClassName:i,to:"/"},"About")),a.createElement("li",null,a.createElement(r.rU,{className:k,activeClassName:i,to:"/skills"},"Skills")),a.createElement("li",null,a.createElement(r.rU,{className:k,activeClassName:i,to:"/projects"},"Projekte")),a.createElement("li",null,a.createElement(r.rU,{className:k,activeClassName:i,to:"/contact"},"Kontakt")))))}var v="hero-module--herocontainer--14437",b="hero-module--overflowcontainer--77f1e";function w(){const e=["Fullstack-","Frontend-","Grafik /"],t=["Design","Entwicklung","Illustration"];let{0:n,1:l}=(0,a.useState)(e[0]),{0:r,1:c}=(0,a.useState)(t[0]);return(0,a.useEffect)((()=>{setInterval((()=>{e.forEach(((e,t)=>{setTimeout((()=>{l(e)}),1500*t)})),t.forEach(((e,t)=>{setTimeout((()=>{c(e)}),1500*t)}))}),4500)}),[]),a.createElement("section",{className:v},a.createElement("div",{className:b},a.createElement("p",{dangerouslySetInnerHTML:{__html:n}})),a.createElement("div",{className:b},a.createElement("p",{dangerouslySetInnerHTML:{__html:r}})))}var y="hero_small-module--heroSmallHeading--72ccf",S="hero_small-module--herocontainer--14b18";function j(){return a.createElement("section",{className:S},a.createElement(l.Location,null,(e=>{let{location:t}=e;return a.createElement("h3",{className:y},t.pathname)})))}var z="ToTopButton-module--buttonHidden--f2710";var T=function(){const{0:e,1:t}=(0,a.useState)(""+z);function n(){window.scrollTo({top:0,left:0,behavior:"smooth"})}return(0,a.useEffect)((()=>{window.addEventListener("scroll",(()=>{t(window.scrollY>200?"ToTopButton-module--totopbutton--54df5":""+z)})),window.addEventListener("keydown",(e=>{"Enter"===e.key&&n()}))})),a.createElement("button",{className:e,onClick:n,"aria-label":"Scroll to top"},a.createElement("div",{className:"ToTopButton-module--icon--b5f3e"}))};var _="layout-module--container--24dc1",I="layout-module--content--bb822";function L(e){let{children:t}=e;return a.createElement("div",{className:_},a.createElement(p,null),a.createElement(l.Location,null,(e=>{let{location:t}=e;return"/"===t.pathname?a.createElement(w,null):a.createElement(j,null)})),a.createElement("main",{className:I},t),a.createElement(T,null),a.createElement(s,null))}},1383:function(e,t,n){n.r(t),n.d(t,{Head:function(){return h},default:function(){return E}});var a=n(7294),l=n(4160),r=n(5550),c="sidemenu-module--menuitem--f4252",o="sidemenu-module--menulink--df955",m="sidemenu-module--sidemenu--31bdc",s="sidemenu-module--sidemenuHeader--2d382";function i(){const{0:e,1:t}=(0,a.useState)("sidemenu");return(0,a.useEffect)((()=>{const e=document.querySelectorAll("h3"),n=Array.from(e).map((e=>a.createElement("li",{className:c,key:e.id},a.createElement("a",{className:o,href:"#"+e.id},e.innerText))));t(n)}),[t]),a.createElement("ul",{className:m},a.createElement("li",{className:s},a.createElement("strong",null,"Projektemenü")),e)}var u=n(207),d="projects-module--projects--cf5d3";function E(){const e=(0,l.K2)("753870196");return a.createElement(a.Fragment,null,a.createElement(r.Z,null,a.createElement("h1",null,"Meine Projekte"),a.createElement("p",null,"Hier ist eine Auswahl meiner Projekte, bei denen mir gute",a.createElement("strong",null," Nutzererfahrung "),"wichtig war und auch das"," ",a.createElement("strong",null,"UI-Design")," planen und umsetzen konnte. Mir ist es immer wichtig auf einer guten qualitativen und quantitativen Daten-/Informationslage das Design zu erstellen und mit modernsten Technologien zu ",a.createElement("strong",null,"programmieren.")," Grundsätzlich teste ich alle Seiten und Änderungen mit Hilfe von"," ",a.createElement("strong",null,'"Heuristic Markup"')," und dem"," ",a.createElement("strong",null,"5-Sekunden-Test.")," Bei einigen Projekten habe ich weitere ",a.createElement("strong",null,"Werbemittel")," und"," ",a.createElement("strong",null,"Illustrationen")," erstellt."),a.createElement("ol",null,e.allMarkdownRemark.edges.map((e=>a.createElement("li",{className:d,key:e.node.id.toString()},a.createElement("h3",{id:e.node.id.toString()},e.node.frontmatter.title),a.createElement("div",{dangerouslySetInnerHTML:{__html:e.node.html}})))))),a.createElement(i,null))}const h=()=>a.createElement(a.Fragment,null,a.createElement("html",{lang:"de"}),a.createElement("title",null,"Projekte | Sascha Nabrotzky"),a.createElement("meta",{name:"title",content:"Projekte | Sascha Nabrotzky"}),a.createElement("meta",{name:"description",content:"Hier ist eine Auswahl meiner Projekte, bei denen mir gute\r Nutzererfahrung wichtig war und auch das UI-Design planen und umsetzen konnte."}),a.createElement("meta",{name:"keywords",content:"Projekte, Projects, React, Gatsby, JavaScript, UI/UX-Design"}),a.createElement("meta",{name:"image",content:u.Z}),a.createElement("meta",{name:"twitter:card",content:"summary"}),a.createElement("meta",{name:"twitter:title",content:"Projekte | Sascha Nabrotzky"}),a.createElement("meta",{name:"twitter:image",content:u.Z}),a.createElement("meta",{property:"og:title",content:"Projekte | Sascha Nabrotzky"}),a.createElement("meta",{property:"og:description",content:"Hier ist eine Auswahl meiner Projekte, bei denen mir gute\r Nutzererfahrung wichtig war und auch das UI-Design planen und umsetzen konnte."}),a.createElement("meta",{property:"og:image",content:u.Z}),a.createElement("meta",{property:"og:type",content:"website"}))},207:function(e,t,n){t.Z=n.p+"static/socMedImg-feedb5d237e34a6dd6c814764911caa1.jpg"}}]);
//# sourceMappingURL=component---src-pages-projects-jsx.js.map