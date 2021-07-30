"use strict";

const baseURL = "http://localhost:8080"

const getAllSection = document.querySelector("#getAllSection");


const getAllWorkouts = () => {
axios.get(`${baseURL}/getAllWorkouts`)
.then(res => {
    const workouts = res.data;
    getAllSection.innerHTML = ""
    workouts.forEach(workout => renderWorkout(workout, getAllSection));
}).catch(err => console.log(err));
}


const renderWorkout = (workout, outputDiv) => {
    const newWorkout = document.createElement('div');

    const DayOfWeek = document.createElement('h3');
    DayOfWeek.innerText = `Day:  ${workout.dayOfWeek}`;
    newWorkout.appendChild(DayOfWeek)

    const workoutID = document.createElement('h4');
    workoutID.innerText = `ID: ${workout.id}`;
    newWorkout.appendChild(workoutID)

    const HoursOfExercise = document.createElement("p");
   HoursOfExercise.innerText = `Hours: ${workout.hoursOfExercise}`;
    newWorkout.appendChild(HoursOfExercise)

    const TypeOfExercise= document.createElement("p");
   TypeOfExercise.innerText = `Type of Exercise: ${workout.typeOfExercise}`;
    newWorkout.appendChild(TypeOfExercise)

    const Goal = document.createElement("p");
    Goal.innerText = `Goal: ${workout.goal}`;
    newWorkout.appendChild(Goal)

    const deleteButton = document.createElement('button');
    deleteButton.innerText = "Delete";

    deleteButton.addEventListener('click', () => deleteWorkout(workout.id));

    newWorkout.appendChild(deleteButton);

    outputDiv.appendChild(newWorkout);
}
// DELETE
const deleteWorkout = id => {
    axios.delete(`${baseURL}/deleteWorkout/${id}`)
        .then(res => {
            console.log(res);
            getAllWorkouts();
        }).catch(err => console.log(err));
}

//GET BY ID
const getByIDSection = document.querySelector("#getByIdSection");
const WorkoutID = document.querySelector("#WorkoutID")

const getByID = () => {
    axios.get(`${baseURL}/getWorkout/${WorkoutID.value}`).then(res => {
        const workout = res.data;
    
        renderWorkout(workout,getByIDSection);
    }
    ).catch(err => console.log(err));
}

// POST - CREATE

document.querySelector("section#postSection > form").addEventListener('submit', (e) => {
    e.preventDefault(); //stops the form from submitting the default way 

    const form = e.target;

    const data = {
        dayOfWeek: form.dayOfWeek.value,
        hoursOfExercise: form.hoursOfExercise.value,
        typeOfExercise: form.typeOfExercise.value,
        goal: form.goal.value
    }

    console.log("DATA: ", data);

    axios.post(`${baseURL}/createWorkout`, data)
    .then((res) => {
        console.log(res);

        window.confirm("Thank you for submitting a workout");
        getAllWorkouts();

        form.reset(); //resets form
        form.dayOfWeek.focus(); // selects the name input
    }).catch(err => console.log(err));

});
    //UPDATE 

 document.querySelector("section#updateSection > form#updateWorkout").addEventListener('submit', (e) => {
 e.preventDefault(); 

        const form = e.target;
    
        const data = {
            id: form.updatedId.value,
            dayOfWeek: form.updatedDayOfWeek.value,
            hoursOfExercise: form.updatedHoursOfExercise.value,
            typeOfExercise: form.updatedTypeOfExercise.value,
            goal: form.updatedGoal.value
        }
        
    
        axios.put(`${baseURL}/replaceWorkout/${data.id}`,data)
        .then((res) => {
            console.log(res);
            getAllWorkouts();
    
            form.reset(); 
            form.updatedId.focus();
            alert("Workout updated successfully")
        }).catch(err => console.log(err));
  });
