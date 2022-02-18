let countriesURL = 'https://xc-countries-api.herokuapp.com/api/countries/';

function populateDropdown(inputArray, elementName, nameColumn, valueColumn){
    inputArray.sort(function (a, b){
        console.log(a);
        console.log(b);
        if (a.name > b.name){
            return 1;
        }
        if (b.name > a.name ){
            return -1;
        }
        return 0;
    })
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
    fetch(countriesURL)
    .then((response) => response.json())
    .then((data) => {        
        let newCountryID = data.length;
        let newCountryName = document.getElementById("countryName").value;
        let newCountryCode = document.getElementById("countryCode").value;
        let newCountryEntry = '{"id":' + newCountryID + ',"code":"'+ newCountryCode + '","name":"' + newCountryName + '"}'
        console.log(newCountryEntry);
    })
    
}
