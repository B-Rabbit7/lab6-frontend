
const local_update_route = "http://localhost:8888/definition/"
const alert_create =
    "Both term and definition must be valid strings (letters only).";
const alert_get = "Term must be valid strings (letters only).";
const get_method = "GET";
const delete_method = "DELETE";
const regex = /^[\p{L}\s]+$/u;


function getItem(event) {
    event.preventDefault();
    const term = document.getElementById("search-term").value;
    if (!regex.test(term)) {
        alert(alert_get);
        return;
    }
    const xhttp = new XMLHttpRequest();
    xhttp.open(get_method, `${local_update_route}` + `${term}`, true);
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

function deleteItem() {
    const term = document.getElementById("search-term").value;
    const xhttp = new XMLHttpRequest();
    xhttp.open(delete_method, `${local_update_route}` + `${term}`, true);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                document.getElementById("result").innerHTML = `Term ${term} deleted successfully.`;
            } else {
                document.getElementById("result").innerHTML = `Error deleting term ${term}.`;
            }
        }
    };
}
