import './css/styles.css';
import debounse from 'lodash.debounce';
import { fetchCountries } from './fetchCountries.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

  const refs = {
   inputRef: document.querySelector('#search-box'),
   countryRef: document.querySelector('.country-info'),
   listRef: document.querySelector('.country-list'),
 };


refs.inputRef.addEventListener('input', debounse(onSearch, DEBOUNCE_DELAY));

 function showCountryList({ flags, name }) {
  return `
    <li class = country-item>
    <img class = 'country-list__flags' src="${flags.svg}" alt="${name.official}" width=50/>
    <h2 class = country-list__name>${name.official}</h2>
    </li>
    `;
}

 function showCountryCard({
  flags,
  name,
  capital,
  population,
  languages,
}) {
  return `
    <div class="country">
      <img class = "c" src="${flags.svg}" alt="${
    name.official
  }" width = 100/>
      <h2 class = "country-title">Country: ${name.official}</h2>
      <p class = "country-text">Capital: ${capital}</p>
      <p class="country-text">Population: ${population}</p>
      <p class="country-text">Languages: ${Object.values(languages)}</p>
    </div>
    `;
}

function onSearch(e) {
  e.preventDefault();
  let search = refs.inputRef.value.trim();
  if (search === '') {
    refs.countryRef.innerHTML = '';
    refs.listRef.innerHTML = '';
    return;
  }
  fetchCountries(search)
    .then(counties => {
      if (counties.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        refs.countryRef.innerHTML = '';
        refs.listRef.innerHTML = '';
        return;
      }
      if (counties.length <= 10) {
        const listMarkup = counties.map(country => showCountryList(country));
        refs.listRef.innerHTML = listMarkup.join('');
        refs.countryRef.innerHTML = '';
      }
      if (counties.length === 1) {
        const markup = counties.map(country => showCountryCard(country));
        refs.countryRef.innerHTML = markup.join('');
        refs.listRef.innerHTML = '';
      }
    })
    .catch(error => {
      error.Notify.failure('Oops, there is no country with that name');
      refs.countryRef.innerHTML = '';
      refs.listRef.innerHTML = '';
      return error;
    });
 
}


