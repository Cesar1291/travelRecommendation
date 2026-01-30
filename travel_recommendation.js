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
    const opcion = "";
    //
    destinoDiv.innerHTML = '';
    displayDiv.innerHTML = ''; 
    destinoDiv.style.opacity = 1;
    displayDiv.style.opacity = 1;
    //
    if (input=="pais"&&input=="paises"&&input=="countrie"&&input=="countries"){
      opcion = "countries";
    }else if(input=="templo"&&input=="templos"&&input=="temples"&&input=="temple"){
      opcion = "temples";
    }else if(input=="playa"&&input=="playas"&&input=="beach"&&input=="beaches"){
      opcion = "beaches";
    }

    fetch('travel_recommendation_api.json')
      .then(response => response.json())
      .then(data => {
            //
            //const opciones = data.find(item => item.name.toLowerCase() === input);
            const opciones = data.find(item => item.toLowerCase() === opcion);
            if (opciones) {
              console.log("opcion valida");
              displayDiv.innerHTML = 'Destino no encontrado';
            }else {
              console.log("opcion valida");
               displayDiv.innerHTML = 'opcion no valida';
            }

            //const countries = data.countries.find(item => item.name.toLowerCase() === input);
            //if (countries) { 
            //  const Ciudades = countries.cities;
            //  destinoDiv.innerHTML += `<h1 class="ttleMessage">${countries.name}</h1>`;
            //  for(var i=0; i<Ciudades.length; i++){
            //    displayDiv.innerHTML += `<p><strong>Ciudad::</strong> ${Ciudades[i].name}</p>`; 
            //    displayDiv.innerHTML += `<p><strong>Descripción:</strong>${Ciudades[i].description}</p>`;    
            //    displayDiv.innerHTML += `<img src="${Ciudades[i].imageUrl}" width=50% height=auto alt="imagen-no-encontrada"><br><br>`; 
            //  }   
            //} else {
            //  displayDiv.innerHTML = 'Destino no encontrado';
            //}
    })
    .catch(error => {
      console.error('Error:', error);
      displayDiv.innerHTML = 'A ocurrido un error al recuperar el destino';
    });
 }
 btnSearch.addEventListener('click', searchDestiny);