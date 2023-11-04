const create_route = "https://lab6-backend.onrender.com/create";
const search_route = "https://lab6-backend.onrender.com/search/?term=";
const languages_route = "https://lab6-backend.onrender.com/languages";

const local_languages_route = "http://localhost:8888/languages";
const local_create_route = "http://localhost:8888/definition";
const local_search_route = "http://localhost:8888/definition/?word=";
const local_update_route = "http://localhost:8888/definition/"
const word_exists_confirmation = "The word already exists. Do you want to update the definition?";
const alert_create =
  "Both term and definition must be valid strings (letters only).";
const alert_get = "Term must be valid strings (letters only).";
const GET = "GET";
const POST = "POST";
const PATCH = "PATCH";
const fetch_error = "Error fetching languages:";
let regex = /^[\p{L}\s]+$/u;
let languageRegex = /^[\p{L}]+$/u;

function populateLanguageDropdowns() {
  const termLanguageDropdown = document.getElementById("term-language");
  const definitionLanguageDropdown = document.getElementById(
    "definition-language"
  );
  const xhttp = new XMLHttpRequest();
  xhttp.open(GET, local_languages_route, true);
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        const languages = JSON.parse(this.responseText);
        languages.forEach((language) => {
          const option = document.createElement("option");
          option.value = language;
          option.textContent = language;
          termLanguageDropdown.appendChild(option);
        });
        languages.forEach((language) => {
          const option = document.createElement("option");
          option.value = language;
          option.textContent = language;
          definitionLanguageDropdown.appendChild(option);
        });
      } else {
        console.error(
          fetch_error,
          JSON.parse(this.responseText).error
        );
      }
    }
  };
  xhttp.send();
}

function createNewEntry(term, termLanguage, definition, definitionLanguage) {
  let data = {
    term: term,
    term_language: termLanguage,
    definition: definition,
    definition_language: definitionLanguage,
  };

  let jsonData = JSON.stringify(data);

  const xhttp = new XMLHttpRequest();
  xhttp.open(POST, local_create_route, true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(jsonData);

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 201) {
        document.getElementById("result").innerHTML = JSON.parse(
          this.responseText
        ).result;
      } else {
        document.getElementById("result").innerHTML = JSON.parse(
          this.responseText
        ).error;
      }
    }
  };
}

function updateDefinition(term, definition, term_language, definition_language) {
  let data = {
    definition: definition,
    definitionLanguage: definition_language,
    termLanguage:term_language
  };
  let jsonData = JSON.stringify(data);
  const xhttp = new XMLHttpRequest();
  xhttp.open(PATCH, `${local_update_route}` + `${term}`, true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(jsonData);

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        document.getElementById("result").innerHTML = JSON.parse(
          this.responseText
        ).result;
      } else {
        document.getElementById("result").innerHTML = JSON.parse(
          this.responseText
        ).error;
      }
    }
  };
}

function createItem(event) {
  event.preventDefault();
  let term = document.getElementById("new-term").value;
  let definition = document.getElementById("definition").value;
  let termLanguage = document.getElementById("term-language").value;
  let definitionLanguage = document.getElementById("definition-language").value;
  if (!regex.test(term) || !regex.test(definition)) {
    alert(alert_create);
    return;
  }
  const xhttp = new XMLHttpRequest();
  xhttp.open(GET, `${local_update_route}` + `${term}`, true);
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        const response = JSON.parse(this.responseText);
        if (response.exists) {
          const userWantsToUpdate = confirm(word_exists_confirmation);
          if (userWantsToUpdate) {
            updateDefinition(term, definition, termLanguage, definitionLanguage);
          }
        }
      } else if (this.status == 404) {
        createNewEntry(term, termLanguage, definition, definitionLanguage);
      }
    }
  };

  xhttp.send();
}

populateLanguageDropdowns();