
const changeMode = $(".light-change-mode");

function light() {
    var element = document.body;
    element.classList.toggle("light-mode");
}

changeMode.on("click", function () {
    light();
});