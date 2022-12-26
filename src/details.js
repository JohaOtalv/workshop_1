import './styles/style.scss'
import './styles/styleDetails.scss'
import { filtrado } from "./index";
import * as bootstrap from 'bootstrap'
/* ----------------- FUNCTIONS  ---------------------*/

const logo = document.querySelector(".logo") /* EventListener to go index on click logo */
logo.addEventListener("click", event => {
  window.location.href = "/index.html";
})

const redirect = (tag) => {
  window.location.href = "/index.html";
  setTimeout( filtrado(tag),2000)
}
window.redirect = redirect; /* Adding this function to GLOBAL SCOPE */


const mostrarDetalles = () => {
  let datos = JSON.parse(localStorage.getItem("detalles"))
  const contenedorTexto = document.querySelector(".container-info");
  const contenedorImagen = document.querySelector(".container-images")
  const { id, name, image, price, description, quantity } = datos;
  /* -------------------------- TEXTO ------------------------------ */
  const divTexto = document.createElement("div");
  divTexto.setAttribute("class", "info");
  divTexto.innerHTML = `
                <div class="text-container">
                <h1 class="card-text">${name}</h3>
                <p>${description}</p>
                <h3 class="price">${"Price: $" + price}</h3>
              </div>
        `;
  contenedorTexto.appendChild(divTexto);

  /* -------------------------- IMAGENES ------------------------------ */
  const divImage = document.createElement("div");
  divImage.setAttribute("class", "media");
  divImage.innerHTML = `
              <section>
                <img class="card-img-principal" data-bs-toggle="modal" data-bs-target="#staticBackdrop"" src="${image}">
              </section>
              <section>
              <img class="card-img" src="${image}">
              <img class="card-img" src="${image}">
              <img class="card-img" src="${image}">
              <img class="card-img" src="${image}">
              </section>
        `;
  contenedorImagen.appendChild(divImage);

  const modal = document.querySelector(".modal-body");
  modal.innerHTML = `
  <img class="img-modal" src="${image}"
  alt="">
  `
}
mostrarDetalles(); /* Call the function */

