"use strict"

const url = 'https://backend-moment3-mongobd.onrender.com/experience'; //URl till api

document.addEventListener('DOMContentLoaded', function() {
    //Hämta api
async function getApi() {
    try {
        const response = await fetch (url);
        if (!response.ok) { //IFall inte respons == status 200
            throw new Error("Kunde inte hämta data") 

        }
        const data = await response.json(); //Svaret
        return data; //returnerar svaret

    } catch (error) {
        console.error("Kunde inte hämta data " + error);
        return []; //Returnera tomt
    }
}

//Läsa ut från apiet till webbplats
async function showApi() {
    const data = await getApi();
    const cvList = document.getElementById('cv-list')

    //rensa listan fösta för att undvika dubbletter
    cvList.innerHTML=""; 

    data.forEach(experience => {
        const listItem = document.createElement('li'); //Skapa Li 

        const companyNameLabel = document.createElement('h4'); //Skapa h4 till Företagsnamn
        companyNameLabel.textContent = `Företagsnamn: ${experience.companyname}`;
        listItem.appendChild(companyNameLabel);

        const jobTitleLabel = document.createElement('p'); 
        jobTitleLabel.textContent = `Arbetstitel: ${experience.jobtitle}`; //Skapa p till jobtitel
        listItem.appendChild(jobTitleLabel);

        const locationLabel = document.createElement('p'); 
        locationLabel.textContent = `Plats: ${experience.location}`; //Skapa p till plats
        listItem.appendChild(locationLabel);

        const descriptionLabel = document.createElement('p'); 
        descriptionLabel.textContent = `Beskrivning: ${experience.description}`; //Skapa p till beskrivning
        listItem.appendChild(descriptionLabel);

        const deleteButton = document.createElement('button'); //Skapar delete knapp
        deleteButton.textContent = 'Ta bort'; //Knappens innehåll
        deleteButton.addEventListener('click', () => deleteExperience(experience._id)); //Eventlistner för knapp att ta bort, om klickad körs funktion för att ta bort
        listItem.appendChild(deleteButton); //Slår ihop

        cvList.appendChild(listItem); // Slå ihop allt
    });
}
//Funktion för att ta bort från listan
async function deleteExperience(id) {
    try {
        const response = await fetch(`${url}/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error("Det gick inte att ta bort erfarenheten");
        } 
        location.reload(); //Ladda om sidan för att visa uppdaterad lista
    } catch (error) {
        console.error("Fel vid radering", error);
    }
}



showApi(); //Kör funktionen showAPI

//För att lÄgga till i API/lista

const addExperienceForm = document.getElementById('add-experience-form');
const errorMessage = document.getElementById('error-message');

addExperienceForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const jobtitle = document.getElementById('jobtitle').value.trim(); // Hämta data från form med value, Trim för att ta bort blanksteg
  const companyname = document.getElementById('companyname').value.trim(); // Hämta data från form med value, Trim för att ta bort blanksteg
  const location = document.getElementById('location').value.trim(); // Hämta data från form med value, Trim för att ta bort blanksteg
  const description = document.getElementById('description').value.trim(); // Hämta data från form med value, Trim för att ta bort blanksteg

  // Kontrollera om någon av inputfälten är tomma eller bara innehåller mellanslag
  if (!jobtitle || !companyname || !location || !description) {
    errorMessage.style.display = 'block'; //Visa felmeddelande
    return;
  }

  errorMessage.style.display = 'none'; //Dölj felmeddelande

  const formData = { //Objekt med insamlad data
    jobtitle,
    companyname,
    location,
    description
  };

  try {
    const response = await fetch(url, {
      method: 'POST', //POst för att lägga till
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData) //OMvandlar objekt till json
    });

    if (!response.ok) {
      throw new Error('Kunde inte lägga till erfarenhet'); //OM inte status = 200
    }

    // Skickas till index för att se tillagd erfarenhet
    window.location.href = 'index.html';
  } catch (error) {
    console.error('Fel vid lägg till erfarenhet', error); //Felmeddelande
  }
});



});

