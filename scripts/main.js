//setExercices(3);
document.addEventListener('DOMContentLoaded', () => {
    if(document.getElementById('index')) {
        setSeance();
    }
})


document.addEventListener('DOMContentLoaded', () => {
    if(document.getElementById('seance')) {
        let btnLaunch = document.getElementById("launch");
        btnLaunch.addEventListener("click", () => {
            testTimer();
        })
    }
})