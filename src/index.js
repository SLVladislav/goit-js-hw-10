import './css/styles.css';
import debounse from 'lodash.debounce';
import { refs } from './refs.';
import { fetchCountries } from './fetchCountries.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { showCountryList, showCountryCard } from './makeTemplates';
// import { countryСardTeemplate, countryListTemplate } from './makeTemplates';
const DEBOUNCE_DELAY = 300;

refs.inputRef.addEventListener('input', debounse(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
  e.preventDefault();
  const search = refs.inputRef.value.trim();
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
      } else if (counties.length > 2 && counties.length < 10) {
        const listMarkup = counties.map(country => showCountryList(country));
        refs.listRef.innerHTML = listMarkup.join('');
        refs.countryRef.innerHTML = '';
      } else {
        const markup = counties.map(country => showCountryCard(country));
        refs.countryRef.innerHTML = markup.join('');
        refs.listRef.innerHTML = '';
      }
    })
    .catch(error => {
      Notify.failure('Oops, there is no country with that name');
      // refs.countryRef.innerHTML = '';
      // refs.listRef.innerHTML = '';
      return error;
    });
}
