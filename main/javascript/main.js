let countriesURL = 'https://xc-countries-api.herokuapp.com/api/countries/';

function sortCountriesAndStatesByName(inputArray){
    inputArray.sort(function (a, b){
        if (a.name > b.name){
            return 1;
        }
        if (b.name > a.name ){
            return -1;
        }
        return 0;
    })
    return inputArray;
}

function populateDropdown(inputArray, elementName, nameColumn, valueColumn){
    inputArray = sortCountriesAndStatesByName(inputArray);

    for (let i = 0; i < inputArray.length; i++){
        var select = document.getElementById(elementName);
        var option = document.createElement('option');
        option.innerHTML = inputArray[i][nameColumn]
        option.value = inputArray[i][valueColumn]
        select.appendChild(option);
    }
}

fetch(countriesURL)
    .then((response) => response.json())
    .then((data) => {  
        populateDropdown(data, "dropdownCountry", "name", "code")
        populateDropdown(data, "parentCountry", "name", "id")
    })

function openDropdownStates(){
    let select = document.getElementById("dropdownCountry");
    let countryCode = select.value;
    let statesURL = 'https://xc-countries-api.herokuapp.com/api/countries/' + countryCode + '/states/';
    fetch(statesURL)
    .then((response) => response.json())
    .then((data) => {
        var select = document.getElementById("dropdownStates");
        while (select.firstChild){
            select.removeChild(select.firstChild);
        }
        populateDropdown(data, "dropdownStates", "name", "code")
    })
}

function addNewCountry(){
    
    fetch(countriesURL, {
        method: "POST",
    
        body: JSON.stringify({
            code: document.getElementById("countryCode").value,
            name: document.getElementById("countryName").value
        }),

    headers: {
        "Content-type": "application/json; charset=UTF-8"
        }
    })
    
    .then(response => response.json())
    .then(json => console.log(json));
    
}

function addNewState(){
    let statesURL = 'https://xc-countries-api.herokuapp.com/api/states/';
    fetch(statesURL, {
        method: "POST",
    
        body: JSON.stringify({
            code: document.getElementById("stateCode").value,
            name: document.getElementById("stateName").value,
            countryId: document.getElementById("parentCountry").value
        }),

    headers: {
        "Content-type": "application/json; charset=UTF-8"
        }
    })
    
    .then(response => response.json())
    .then(json => console.log(json));
    
}
