import './css/styles.css';
import coutryCardTpl from "./templates/cards-country.hbs";

const DEBOUNCE_DELAY = 300;
fetch('https://restcountries.com/v2/all')
  .then(response => {
    return response.json('');
  })

  .then(all => {
    console.log(capital);
    const markup = coutryCardTpl(all);
    console.log(markup)
  })
  .catch(error => {
    console.log(error);
  });
