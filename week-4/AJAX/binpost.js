/* portions of the code are borrowed from the CS290 AJAX Interactions lecture */
document.addEventListener("DOMContentLoaded", bindButtons);

function bindButtons() {
  document.getElementById('submitText').addEventListener('click', function(event){
    var req = new XMLHttpRequest();
    var sentText = document.getElementById('inputText').value;

    req.open("POST", "http://httpbin.org/post", true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load', function() {
      if(req.status >= 200 && req.status < 400) {
        console.log(JSON.parse(req.responseText));
        var response = JSON.parse(req.responseText);
        document.getElementById('returnText').textContent = response.data;
      } else {
        console.log("Error in network request: " + request.statusText);
      }
    })
    req.send(JSON.stringify(sentText));
    event.preventDefault();
  });
}
