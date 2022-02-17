let countriesURL = 'https://xc-countries-api.herokuapp.com/api/countries/';
let statesURL = '';
// fetch call
fetch(countriesURL)
    .then((response) => {console.log(response.json());})
    .then((data) => {console.log(data);})