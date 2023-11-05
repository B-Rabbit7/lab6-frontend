
const create_route = storeStrings.apiRoutes.create;
const search_route = storeStrings.apiRoutes.search;
const languages_route = storeStrings.apiRoutes.languages;

const local_languages_route = storeStrings.apiRoutes.localLanguages;
const local_create_route = storeStrings.apiRoutes.localCreate;
const local_search_route = storeStrings.apiRoutes.localSearch;
const local_update_route = storeStrings.apiRoutes.localUpdate;

const word_exists_confirmation = storeStrings.prompts.wordExistsConfirmation;
const alert_create = storeStrings.prompts.createAlert;
const alert_get = storeStrings.prompts.getAlert;
const GET = storeStrings.requestMethods.GET;
const POST = storeStrings.requestMethods.POST;
const PATCH = storeStrings.requestMethods.PATCH;
const fetch_error = storeStrings.messages.fetchError;

let regex = storeStrings.regexPatterns.word;
let languageRegex = storeStrings.regexPatterns.language;

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