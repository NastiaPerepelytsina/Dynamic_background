import chroma from "chroma-js";

const cools = document.querySelectorAll('.cool');

function generatRandomColor() {
    return chroma.random().hex();
}
document.addEventListener("keydown", function(e) {
    if (e.code.toLowerCase() === "space") {
        setRandomColor();
    }
});

document.addEventListener("click", function(e) {
    const button = e.target.closest('[data-type="lock"]');

    if (!button) return;

    const icon = button.querySelector("i");
    const isLocked = button.dataset.locked === "true";

    button.dataset.locked = String(!isLocked);
    icon.classList.toggle("fa-unlock", isLocked);
    icon.classList.toggle("fa-lock", !isLocked);
    button.setAttribute("aria-label", isLocked ? "Lock color" : "Unlock color");
});


function setRandomColor() {
    cools.forEach((cool)=>{
        if (cool.querySelector('[data-type="lock"]')?.dataset.locked === "true") {
            return;
        }

        cool.style.backgroundColor = generatRandomColor();
        const text = cool.text = cool.querySelector("h2")
        const button = cool.querySelector("button")
        const color =generatRandomColor()
        text.textContent = color
        cool.style.color = color
        setTextColor(text,color)
        setTextColor(button,color)
    })
}
console.log(cools)
setRandomColor()



function setTextColor(text,color){
    const luminance = chroma (color).luminance();
    text.style.color = luminance > 0.5 ? "black" : "white";

}


