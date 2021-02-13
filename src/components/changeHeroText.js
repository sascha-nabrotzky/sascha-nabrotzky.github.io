export default function changeHeroText() {
    
    const textArray = ["UI/UX-Design", "Logo", "Frontend"];
    const heroModuleP = document.querySelector(".hero-module--herocontainer--1nK9l div > p");

        textArray.forEach((items, i) => {
            setTimeout(() => {
                heroModuleP.innerText = (items);
            }, i * 1500);
        });
    
}