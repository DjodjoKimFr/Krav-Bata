function randomise(niveauDifficulte) {
  // Filtrer les exercices par difficulté
  const exercicesFiltres = exercices.filter(exercice => exercice.difficulty === niveauDifficulte);
  // Tirer un index aléatoire parmi les exercices filtrés
  const indexAleatoire = Math.floor(Math.random() * exercicesFiltres.length);
  // Accéder à l'exercice au hasard
  const exerciceAleatoire = exercicesFiltres[indexAleatoire];
  return exerciceAleatoire;
}



//function made for make the same number of options as the number of repetitions in the HTML page.
//It takes the object "exercices" in the config.js for better addition of exercices
function setExercices(reps) {
  const zoneChoixExercices = document.getElementById("zoneChoixExercices");
  let btnSeance = document.getElementById("depart");
  btnSeance.disabled = true;
  
  const existingSelects = zoneChoixExercices.querySelectorAll('select');
  existingSelects.forEach(select => select.remove());//Initialize the number of select

  let selectedOptionsList = [];
  //let restTime = sessionStorage.getItem('restTime')

  // sort the exercices by difficukty (1 = easy, 4 = hard)
  // exercices object in config.js
  exercices.sort((a, b) => a.difficulty - b.difficulty);

  for (let i = 1; i <= reps; i++) {
    const select = document.createElement("select");
    select.name = "exercices";
    select.id = `selectExercice${i}`;

// create the firt option title
    const firstOption = document.createElement("option");
    firstOption.value = "";
    firstOption.textContent = `Exercice N°${i}`;
    select.appendChild(firstOption);

    // add the options, sorted by difficulty
    exercices.forEach(exercice => {
      const option = document.createElement("option");
      option.value = exercice.name;
      option.textContent = `${exercice.name} (Difficulté ${exercice.difficulty})`;

      // Associer l'attribut pour le son à l'option
      option.setAttribute('data-sound', exercice.sound);

      select.appendChild(option);
    });

    // Créer l'option "Exercice au hasard"
    const randomOption = document.createElement("option");
    randomOption.value = "random1";  // Valeur spéciale pour l'option au hasard
    randomOption.textContent = "Exercice niveau 1 au hasard";
    select.appendChild(randomOption);


    select.addEventListener('change', function() {
      const selectedOption = select.value;  // Récupérer la valeur de l'option sélectionnée

      // Si l'option "Exercice au hasard" est sélectionnée
  if (selectedOption === "random1") {
    const niveauDifficulte = 1; // Par exemple, on prend la difficulté du premier exercice, mais tu peux ajuster en fonction de l'option choisie
    const exerciceAleatoire = randomise(niveauDifficulte);
    
    // Mettre l'exercice aléatoire dans le select
    select.value = exerciceAleatoire.name;

    // Ajouter l'exercice sélectionné à la liste
    selectedOptionsList[i - 1] = exerciceAleatoire.name;
  } else {
    selectedOptionsList[i - 1] = selectedOption;  // Ajouter l'exercice sélectionné manuellement
  }

      // Vérifier si toutes les options ont été sélectionnées
      const allSelected = [...zoneChoixExercices.querySelectorAll('select')].every(select => select.value !== "");
      btnSeance.disabled = !allSelected;

      // Convertir le tableau en chaîne JSON et le stocker dans sessionStorage
      sessionStorage.setItem('storageSelectedOptionList', JSON.stringify(selectedOptionsList));

    });
    zoneChoixExercices.appendChild(select);
  }
}

function showTotalTime(reps, workTime, restTime){
  let totalTime = 20+reps*workTime+reps*restTime+20;
  let minutes = Math.floor(totalTime / 60);
  let seconds = totalTime - minutes * 60;
  const setZoneTotalTime = document.querySelector(".tempsTotal span");
  setZoneTotalTime.innerText = ("Temps d'entraînement : "+minutes+" minutes et "+seconds+" secondes");
}



// Function made to set a number of repetion for the exercices
function setReps () {
  let btnLessRep = document.getElementById("moinsRep");
  let btnMoreRep = document.getElementById("plusRep");
  let setZoneRep = document.querySelector(".zoneChoixRep span");
  // Take the reps value from sessionStorage, or set it at 3 if not set.
  let reps = sessionStorage.getItem('reps') ? parseInt(sessionStorage.getItem('reps')) : 3;
  setZoneRep.innerText = reps;


  btnLessRep.addEventListener("click", () => {
    reps--;
    setZoneRep.innerText = reps;
    sessionStorage.setItem('reps', reps); //Save the new valor of reps
    if(reps <= 2){
      btnLessRep.disabled = true;
    }
    else {
      btnLessRep.disabled = false;
      btnMoreRep.disabled = false;
    }
    setExercices(reps);
    let restTime = sessionStorage.getItem('restTime');
    let workTime = sessionStorage.getItem('workTime');
    showTotalTime(reps,workTime,restTime);
  })

  btnMoreRep.addEventListener("click", () => {
    reps++;
    setZoneRep.innerText = reps;
    sessionStorage.setItem('reps', reps); //Save the new valor of reps
    if(reps >= 20){
      btnMoreRep.disabled = true;
    }
    else {
      btnLessRep.disabled = false;
      btnMoreRep.disabled = false;
    }
    setExercices(reps);
    let restTime = sessionStorage.getItem('restTime');
    let workTime = sessionStorage.getItem('workTime');
    showTotalTime(reps,workTime,restTime);
  })
}

function setRestTime () {
  let btnLessRest = document.getElementById("moinsTempsRepos");
  let btnMoreRest = document.getElementById("plusTempsRepos");
  let setZoneRestTime = document.querySelector(".zoneChoixTempsRepos span");

  // Récupérer la valeur de restTime depuis sessionStorage, ou la définir à 15 si non définie
  let restTime = sessionStorage.getItem('restTime') ? parseInt(sessionStorage.getItem('restTime')) : 15;
  setZoneRestTime.innerText = restTime;

  btnLessRest.addEventListener("click", () => {
    restTime = restTime - 5;
    setZoneRestTime.innerText = restTime;
    sessionStorage.setItem('restTime', restTime); // Sauvegarder la nouvelle valeur de restTime
    if(restTime <= 10){
      btnLessRest.disabled = true;
    }
    else {
      btnLessRest.disabled = false;
      btnMoreRest.disabled = false;
    }
    let reps = sessionStorage.getItem('reps');
    let workTime = sessionStorage.getItem('workTime');
    showTotalTime(reps,workTime,restTime);
  })

  btnMoreRest.addEventListener("click", () => {
    restTime = restTime + 5;
    setZoneRestTime.innerText = restTime;
    sessionStorage.setItem('restTime', restTime); // Sauvegarder la nouvelle valeur de restTime
    if(restTime >= 45){
      btnMoreRest.disabled = true;
    }
    else {
      btnLessRest.disabled = false;
      btnMoreRest.disabled = false;
    }
    let reps = sessionStorage.getItem('reps');
    let workTime = sessionStorage.getItem('workTime');
    showTotalTime(reps,workTime,restTime);
  })
}

function setWorkTime () {
  let btnLessWork = document.getElementById("moinsTempsExercice");
  let btnMoreWork = document.getElementById("plusTempsExercice");
  let setZoneWorkTime = document.querySelector(".zoneChoixTempsExercice span");

  // Récupérer la valeur de workTime depuis sessionStorage, ou la définir à 20 si non définie
  let workTime = sessionStorage.getItem('workTime') ? parseInt(sessionStorage.getItem('workTime')) : 20;
  setZoneWorkTime.innerText = workTime;

  btnLessWork.addEventListener("click", () => {
    workTime = workTime - 5;
    setZoneWorkTime.innerText = workTime;
    sessionStorage.setItem('workTime', workTime); // Sauvegarder la nouvelle valeur de workTime
    if(workTime <= 10){
      btnLessWork.disabled = true;
    }
    else {
      btnLessWork.disabled = false;
      btnMoreWork.disabled = false;
    }
    let reps = sessionStorage.getItem('reps');
    let restTime = sessionStorage.getItem('restTime');
    showTotalTime(reps,workTime,restTime);
  })

  btnMoreWork.addEventListener("click", () => {
    workTime = workTime + 5;
    setZoneWorkTime.innerText = workTime;
    sessionStorage.setItem('workTime', workTime); // Sauvegarder la nouvelle valeur de workTime
    if(workTime >= 45){
      btnMoreWork.disabled = true;
    }
    else {
      btnLessWork.disabled = false;
      btnMoreWork.disabled = false;
    }
    let reps = sessionStorage.getItem('reps');
    let restTime = sessionStorage.getItem('restTime');
    showTotalTime(reps,workTime,restTime);
  })
}




function playSound(audioPath) {
  // Créer un nouvel élément audio
  const audio = new Audio(audioPath);
  // Lire l'audio
  audio.play().catch(error => {
      console.error('Erreur de lecture automatique :', error);
  });
  // Ajouter un écouteur d'événement pour détecter la fin de la lecture
  audio.addEventListener('ended', () => {
      console.log('La lecture de ' + audioPath + ' est terminée.');
  });
}



// Initialiser le chronomètre avec une durée donnée (en secondes)
function startTimer() {

  let beginTime = 20;
  const timerZone = document.querySelector(".zoneTimer time");
  const textTimer = document.querySelector(".zoneTimer p");
  const selectedOptionsList = JSON.parse(sessionStorage.getItem('storageSelectedOptionList'));
  let exercieIndex = 0;
  let selectedExerciceName = selectedOptionsList[exercieIndex];
  let exercice = exercices.find(e =>e.name === selectedExerciceName);


  return new Promise( resolve => {

  // Afficher le temps restant (facultatif)
  //console.log("Temps restant : " + beginTime + "s");

  playSound('sounds/intro.mp3');

  // Mettre en place un intervalle pour réduire le temps restant chaque seconde
    let timer = setInterval(() => {
      beginTime--;
      //console.log("Temps restant : " + beginTime + "s");
      textTimer.innerText = "Préparez-vous !"
      timerZone.innerText = beginTime;
      const textFutureWork = document.querySelector(".exerciceSuivant p");
      textFutureWork.innerText = selectedOptionsList[exercieIndex];

      // Si le temps est écoulé, arrêter le chronomètre
      if (beginTime <= 0) {
        clearInterval(timer);
        console.log("Début de la séance !");
        resolve();
        return;
      }

      if(beginTime === 12){
        if (exercice && exercice.sound) {
          // If there's a sound for the exercice, play it
          const audio = new Audio(exercice.sound);
          audio.play();
        }
      }

      if (beginTime === 5){
        playSound('sounds/timer.mp3');
        console.log('Musique du timer StarTimer');
      }

    }, 1000); // Exécution toutes les secondes
  });
}


function workTimer() {
  let workTime = sessionStorage.getItem('workTime');
  let restTime = sessionStorage.getItem('restTime');
  let reps = sessionStorage.getItem('reps');
  const timerZone = document.querySelector(".zoneTimer time");
  const textTimer = document.querySelector(".zoneTimer p");
  const textWork = document.querySelector(".exerciceEnCours p");
  const textFutureWork = document.querySelector(".exerciceSuivant p");
  let exercieIndex = 0;
  const selectedOptionsList = JSON.parse(sessionStorage.getItem('storageSelectedOptionList'));
  //let exercice = exercices.find(e =>e.name === selectedExerciceName);

  function runWorkTimer() {
    return new Promise(resolve => {

      let currentWorkTime = Number(workTime) + 1;
      let selectedExerciceName = selectedOptionsList[exercieIndex+1];

      console.log("exerciceIndex de runWorkTimer: " + exercieIndex)
      console.log("exercice de runWorkTimer: " + selectedOptionsList[exercieIndex]);

      let timer = setInterval(() => {
        currentWorkTime--;
        //console.log("Temps restant : " + currentWorkTime + "s");
        textTimer.innerText = "GO !";
        textWork.innerText = selectedOptionsList[exercieIndex];
        if(selectedOptionsList[exercieIndex+1] === undefined){
          textFutureWork.innerText = "Fin de séance !";
        }
        else {
          textFutureWork.innerText = selectedOptionsList[exercieIndex+1];
        }
        timerZone.innerText = currentWorkTime;

        if (currentWorkTime === 5){
          playSound('sounds/stop.mp3');
          console.log('Musique du timer StarTimer');
        }

        if (currentWorkTime <= 0) {
          clearInterval(timer);
          console.log("Fin de l'effort !");
          resolve();
        }
      }, 1000);
    });
  }

  function runRestTimer() {
    return new Promise(resolve => {

      //playSound('sounds/stop.mp3');

      let currentRestTime = Number(restTime) + 1;
      let timer = setInterval(() => {
        currentRestTime--;
        let selectedExerciceName = selectedOptionsList[exercieIndex];
        let exercice = exercices.find(e =>e.name === selectedExerciceName);
        //console.log("Temps de repos restant : " + currentRestTime + "s");
        textTimer.innerText = "REPOS !";
        textWork.innerText = "Repos en cours...";
        timerZone.innerText = currentRestTime;



        if (currentRestTime === 9) {
          //playSound('sounds/timer.mp3');
          if (exercice && exercice.sound) {
            // If there's a sound for the exercice, play it
            let audio = new Audio(exercice.sound);
            audio.play();
            console.log('son du runRestTimer');
            console.log("exerciceIndex de runRestTimer: " + exercieIndex)
            console.log("exercice de runRestTimer: " + selectedExerciceName);
          }
      }

        if (currentRestTime === 5  && exercieIndex!=reps){
          playSound('sounds/timer.mp3');
          console.log('Musique du timer StarTimer');
        }

        if (currentRestTime <= 0) {
          clearInterval(timer);
          console.log("Fin du repos !");
          resolve();
        }
      }, 1000);
      exercieIndex++;
    });
  }

  function runAllReps() {
    let promiseChain = Promise.resolve();
    for (let i = 0; i < reps; i++) {
        promiseChain = promiseChain
            .then(() => runWorkTimer())
            .then(() => runRestTimer());
    }
    return promiseChain;
}

  return runAllReps();
}


function endTimer() {
  let endTime = 21;
  const timerZone = document.querySelector(".zoneTimer time");
  const textTimer = document.querySelector(".zoneTimer p");
  // Afficher le temps restant (facultatif)
  //console.log("Temps restant : " + endTime + "s");

  playSound('sounds/outro.mp3')

  // Mettre en place un intervalle pour réduire le temps restant chaque seconde
  timer = setInterval(() => {
    endTime--;
    //console.log("Temps restant : " + endTime + "s");
    timerZone.innerText = endTime;
    textTimer.innerText = "Bien joué !"


    // Si le temps est écoulé, arrêter le chronomètre
    if (endTime <= 0) {
      clearInterval(timer);
      console.log("Fin de la séance !");
    }
  }, 1000); // Exécution toutes les secondes
}





  


function setSeance () {
      setReps();
      setRestTime();
      setWorkTime();
}

function testTimer(){

  let workTime = sessionStorage.getItem('workTime');
  let restTime = sessionStorage.getItem('restTime');
  let reps = sessionStorage.getItem('reps');
  const timerZone = document.querySelector(".zoneTimer time");
  const textTimer = document.querySelector(".zoneTimer p");
  const textWork = document.querySelector(".exerciceEnCours p");
  const textFutureWork = document.querySelector(".exerciceSuivant p");
  const selectedOptionsList = JSON.parse(sessionStorage.getItem('storageSelectedOptionList'));

      startTimer()
      .then(() => workTimer())
      .then(() => endTimer())
}