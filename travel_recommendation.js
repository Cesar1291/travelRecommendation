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
    var opcion = "";
    var opcionEs = "";
    var opcionId = 0;
    
    destinoDiv.innerHTML = '';
    displayDiv.innerHTML = ''; 
    destinoDiv.style.opacity = 1;
    displayDiv.style.opacity = 1;
    
    if (input=="pais"||input=="paises"||input=="countrie"||input=="countries"){
      opcion = "countries";
      opcionEs = "Paises"
      opcionId = 0;
    }else if(input=="templo"||input=="templos"||input=="temples"||input=="temple"){
      opcion = "temples";
      opcionEs = "Templos"
      opcionId = 1;
    }else if(input=="playa"||input=="playas"||input=="beach"||input=="beaches"){
      opcion = "beaches";
      opcionEs = "Playas"
      opcionId = 2;
    }
    
    destinoDiv.innerHTML += `<h1 class="ttleMessage">${opcionEs}</h1>`;

    fetch('travel_recommendation_api.json')
      .then(response => response.json())
      .then(data => {
              if (opcionId===0){
                const countries = data.countries;
                for(var i=0;i<countries.length;i++){
                    const Ciudades = countries[i].cities;
                      //displayDiv.innerHTML += `<p><strong>Ciudad::</strong> ${countries.name}</p>`; 
                      displayDiv.innerHTML += `<p><strong>Pais::</strong> ${countries[i].name}</p>`; 
                    for(var j=0; j<Ciudades.length; j++){
                      displayDiv.innerHTML += `<p><strong>Ciudad::</strong> ${Ciudades[j].name}</p>`; 
                      displayDiv.innerHTML += `<p><strong>Descripción:</strong>${Ciudades[j].description}</p>`;    
                      displayDiv.innerHTML += `<img src="${Ciudades[j].imageUrl}" width=50% height=auto alt="imagen-no-encontrada"><br><br>`; 
                    }
                }
              }else if (opcionId===1){
                  displayDiv.innerHTML += `<p>Trabajando en tus destinos</p>`;   
              }else if (opcionId===2){
                  displayDiv.innerHTML += `<p>Trabajando en tus destinos</p>`;   
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