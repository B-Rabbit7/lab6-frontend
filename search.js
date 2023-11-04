const local_search_route = "http://localhost:8888/definition/?word=";
const alert_create =
  "Both term and definition must be valid strings (letters only).";
const alert_get = "Term must be valid strings (letters only).";
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
    xhttp.open("GET", `${local_search_route}` + `${term}`, true);
    xhttp.send();
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