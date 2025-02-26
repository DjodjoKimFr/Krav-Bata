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
        let btnReturn = document.getElementById("retour");
        btnReturn.addEventListener("click", () => {
            let reps = sessionStorage.setItem('reps', 3);
            let restTime = sessionStorage.setItem('restTime', 15);
            let workTime = sessionStorage.setItem('workTime', 20);

            sessionStorage.setItem('storageSelectedOptionList', []);
        })
    }
})