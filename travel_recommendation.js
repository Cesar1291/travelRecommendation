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

        fetch('./recommendation_api.json')
          .then(response => response.json())
          .then(data => {
            const countries = data.countries.find(item => item.name.toLowerCase() === input);

            if (countries) { 
              const Ciudades = countries.symptoms.join(', '); 
              const description = countries.description;
              destinoDiv.innerHTML += `<h2>${countries.name}</h2>`;
              destinoDiv.innerHTML += `<img src="${countries.imagesrc}" alt="hjh">`;
              displayDiv.innerHTML += `<p><strong>Ciudad::</strong> ${Ciudades}</p>`; 
              displayDiv.innerHTML += `<p><strong>Descripción:</strong> ${description}</p>`;
              
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