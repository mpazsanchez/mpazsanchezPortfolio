let form = document.getElementById("form");
    
async function handleSubmit(event) {
  event.preventDefault();
  var status = document.getElementById("my-form-status");
  var data = new FormData(event.target);
  
  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
        'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      status.innerHTML = " Thank for your message! The form was successfully submitted";
      form.reset();

      setTimeout(function(){
        status.innerHTML = "";
        }, 5000);

      console.log('El formulario ha sido enviado correctamente', response);

    } else {
      response.json().then(data => {
        if (Object.hasOwn(data, 'errors')) {
          status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
        } else {
          status.innerHTML = "Oops! Something went wrong. Please try again."
        }
      })
    }
  }).catch(error => {
    status.innerHTML = "Oops! Something went wrong. Please try again."
  });
}

form.addEventListener("submit", handleSubmit)
