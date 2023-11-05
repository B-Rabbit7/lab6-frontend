
const local_update_route = searchStrings.apiRoutes.localUpdate;
const alert_create = searchStrings.messages.alertInvalidChar;
const alert_get = searchStrings.messages.alertGet;
const get_method = searchStrings.methods.GET;
const delete_method = searchStrings.methods.DELETE;
const regex = searchStrings.regexPatterns.regex;


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
                document.getElementById("result").innerHTML = searchStrings.messages.deleteSuccess(term);
            } else {
                document.getElementById("result").innerHTML = searchStrings.messages.deleteError(term);
            }
        }
    };
}
