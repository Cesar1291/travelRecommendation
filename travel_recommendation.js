const btnSearch = document.getElementById('btnSearch');
const clrSearch = document.getElementById('clrSearch');

function resetForm() {
    document.getElementById("srcDestiny").value = "";
    document.getElementById('divDestino').innerHTML = '';
    document.getElementById('divDisplay').innerHTML = '';
}    
clrSearch.addEventListener("click", resetForm);     

function searchDestiny() {
    const input = document.getElementById('srcDestiny').value.toLowerCase();
    const destinoDiv = document.getElementById('divDestino');
    const displayDiv = document.getElementById('divDisplay');
    destinoDiv.innerHTML = '';
    displayDiv.innerHTML = ''; 
    destinoDiv.style.opacity = 1;
    displayDiv.style.opacity = 1;

    fetch('travel_recommendation_api.json')
      .then(response => response.json())
      .then(data => {
            const countries = data.countries.find(item => item.name.toLowerCase() === input);
            if (countries) { 
              const Ciudades = countries.cities;
              destinoDiv.innerHTML += `<h1 class="ttleMessage">${countries.name}</h1>`;
              for(var i=0; i<Ciudades.length; i++){
                displayDiv.innerHTML += `<p><strong>Ciudad::</strong> ${Ciudades[i].name}</p>`; 
                displayDiv.innerHTML += `<p><strong>Descripción:</strong>${Ciudades[i].description}</p>`;    
                displayDiv.innerHTML += `<img src="${Ciudades[i].imageUrl}" width=50% height=auto alt="imagen-no-encontrada"><br><br>`; 
              }   
            } else {
              displayDiv.innerHTML = 'Destino no encontrado';
            }
    })
    .catch(error => {
      console.error('Error:', error);
      displayDiv.innerHTML = 'A ocurrido un error al recuperar el destino';
    });
 }
 btnSearch.addEventListener('click', searchDestiny);