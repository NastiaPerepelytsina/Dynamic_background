import chroma from "chroma-js";

const columns = document.querySelectorAll('.column');

function generateRandomColor() {
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
    button.setAttribute("aria-label", isLocked ? "Unlock color" : "Lock color");
});


function setRandomColor() {
    columns.forEach((column)=>{
        if (column.querySelector('[data-type="lock"]')?.dataset.locked === "true") {
            return;
        }

        const color = generateRandomColor();
        const text = column.querySelector("h2");
        const button = column.querySelector("button");
        column.style.backgroundColor = color;
        text.textContent = color;
        setTextColor(text, color);
        setTextColor(button, color);
    })
}
setRandomColor()

setInterval(setRandomColor, 1000);



function setTextColor(text,color){
    const luminance = chroma (color).luminance();
    text.style.color = luminance > 0.5 ? "black" : "white";

}


