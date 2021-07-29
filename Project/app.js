"use strict";

const baseURL = "http://localhost:8080"

const getAllSection = document.querySelector("#getAllSection");

const CaptureAll= () => {
axios.get(`${baseURL}/getAllWorkouts`)
.then(res => {
    const workouts = res.data;
    getAllSection.innerHTML = ""
    workouts.forEach(workout => renderWorkout(workout, getAllSection));
}).catch(err => console.log(err));
}

const renderPuppy = (puppy, outputDiv) => {
    const newPuppy = document.createElement('div');

    const puppyName = document.createElement('h3');
    puppyName.innerText = puppy.name;
    newPuppy.appendChild(puppyName)

    const puppyID = document.createElement('h4');
    puppyID.innerText = `ID: ${puppy.id}`;
    newPuppy.appendChild(puppyID)

    const puppyAge = document.createElement("p");
    puppyAge.innerText = `Age: ${puppy.age}`;
    newPuppy.appendChild(puppyAge)

    const puppyBreed = document.createElement("p");
    puppyBreed.innerText = `Breed: ${puppy.breed}`;
    newPuppy.appendChild(puppyBreed)

    const puppyCuteness = document.createElement("p");
    puppyCuteness.innerText = `Cuteness: ${puppy.cuteness}`;
    newPuppy.appendChild(puppyCuteness)

    const deleteButton = document.createElement('button');
    deleteButton.innerText = "DELETE";

    deleteButton.addEventListener('click', () => deletePuppy(puppy.id));

    newPuppy.appendChild(deleteButton);

    outputDiv.appendChild(newPuppy);
}

