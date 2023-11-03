const create_route = 'https://comp4537-lab4-hb0k.onrender.com/create'
const search_route = 'https://comp4537-lab4-hb0k.onrender.com/search/?term='
const alert_create = "Both term and definition must be valid strings (letters only)."
const alert_get = "Term must be valid strings (letters only)."

function createItem(event) {
    event.preventDefault(); // stops the page from refreshing when a form is submitted.
    let regex = /^[a-zA-Z]+$/;
    let definitionRegex = /^[a-zA-Z\s]+$/; //make sure we only get alphabetic letters
    let term = document.getElementById("new-term").value; //get the value inputted into term
    let definition = document.getElementById("definition").value; //get value inputted into definition

    // alert if empty space, or weird term entered
    if (!regex.test(term) || !definitionRegex.test(definition)) {
        alert(alert_create);
        return;
    } 
    // data object
    let data = {
      "term": term,
      "definition": definition
    }
    //strigify
    let jsonData = JSON.stringify(data)
    // prep to send a POST request.
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST",create_route , true); // initialize request - true meaning asynchnorous
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); 
    xhttp.send(jsonData);
    // run when response was sent and server is responding and request changes
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4) { // state 4 means request is complete and response is available
          if (this.status == 201) { // 201 is success
              document.getElementById("result").innerHTML = JSON.parse(this.responseText).result;
          } else {
              document.getElementById("result").innerHTML = JSON.parse(this.responseText).error;
          }
      }
  }
}
// same thing but for GET
function getItem(event) {
    event.preventDefault();
    const regex = /^[a-zA-Z]+$/;
    const term = document.getElementById("search-term").value;
    if (!regex.test(term)) {
      alert(alert_get);
      return;
  }
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", `${search_route}`+`${term}`, true);
    xhttp.send();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4) {
          if (this.status == 200) {
              document.getElementById("result").innerHTML = JSON.parse(this.responseText).result;
          } else {
              document.getElementById("result").innerHTML = JSON.parse(this.responseText).error;
          }
      }
  }
}