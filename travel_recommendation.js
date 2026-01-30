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

    fetch('travel_recommendation_api.json')
      .then(response => response.json())
      .then(data => {
            //console.log(data);
            const countries = data.countries.find(item => item.name.toLowerCase() === input);
            //console.log(countries);
            if (countries) { 
              const Ciudades = countries.cities;
              console.log(countries.name);
              var nameCiudad = Ciudades.name;
              //var descripcion = Ciudades.descripcion; 
              destinoDiv.innerHTML += `<h1>${countries.name}</h1>`;
              displayDiv.innerHTML += `<p><strong>Ciudad::</strong> ${Ciudades.name}</p>`; 
              //displayDiv.innerHTML += `<p><strong>Descripción:</strong> ${descripcion}</p>`;    
              displayDiv.innerHTML += `<img src="${Ciudades.imagesrc}" alt="imagen-no-encontrada">`;          
            } else {
              //displayDiv.innerHTML = 'Destino no encontrado';
            }
    })
    .catch(error => {
      console.error('Error:', error);
      displayDiv.innerHTML = 'A ocurrido un error al recuperar el destino';
    });
 }
 btnSearch.addEventListener('click', searchDestiny);