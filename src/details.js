const mostrarDetalles = () =>{
  let datos = JSON.parse(localStorage.getItem("detalles"))
  console.log(datos)
  console.log("-------------------------------")
  const contenedorTexto = document.querySelector(".container-info");
  const contenedorImagen = document.querySelector(".container-images")
  const { id, name, image, price, description,quantity } = datos;
  /* -------------------------- TEXTO ------------------------------ */
  const divTexto = document.createElement("div");
  divTexto.setAttribute("class", "info");
  divTexto.innerHTML = `

                <div class="text-container">
                <h1 class="card-text">${name}</h3>
                <p>${description}</p>
                <h3 class="price">${"Price: $" + price+" USD"}</h3>
              </div>
        `;
  contenedorTexto.appendChild(div);
  /* -------------------------- IMAGENES ------------------------------ */
  const divImage = document.createElement("div");
  divImage.setAttribute("class", "info");
  divImage.innerHTML = `
              <section>
                <img class="card-img" src="${image}">
              </section>
              <section>
              <img class="card-img" src="${image}">
              <img class="card-img" src="${image}">
              <img class="card-img" src="${image}">
              <img class="card-img" src="${image}">
              </section>
        `;
  contenedorImagen.appendChild(div);
}
mostrarDetalles();

//---------------------------------------------
const logo = document.querySelector(".logo-link")
logo.addEventListener("click", event =>{
window.location.href = "/index.html";
})