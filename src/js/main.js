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

        cvList.appendChild(listItem); // Slå ihop allt
    });
}

showApi(); //Kör funktionen
});

