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
  setTimeout(filtrado(tag), 2000)
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
              <div class="container">
                  <div class="img_container">
                   <img class="main_img card-img-principal" data-bs-toggle="modal" data-bs-target="#staticBackdrop" src="${image}" alt="" >
                  </div>
      
                  <div class="thumbnail_container">
                   <img class="thumbnail card-img  active" src="${image}" alt="">
                   <img class="thumbnail card-img" src="${image}" alt="">
                   <img class="thumbnail card-img" src="${image}" alt="">
                   <img class="thumbnail card-img" src="https://sevensevencolombia.vteximg.com.br/arquivos/ids/970419-524-707/Boxers-para-hombre-45000325-777_1.jpg?v=638068231202330000" alt="">
                  </div>
              </div>
        `;
  contenedorImagen.appendChild(divImage);

  const modal = document.querySelector(".modal-body");
  const main_img = document.querySelector('.main_img')
  const thumbnails = document.querySelectorAll('.thumbnail')
  /* ---------- INNER EN LA PRIMERA IMAGEN PRINCIPAL RENDERIZADA */
    modal.innerHTML = `
      <img class="img-modal" src="${main_img.src}"
      alt="">
    `
/* -------------  FUNCION QUE CAMBIA LAS MINIATURAS CUANDO SON SELECCIONADAS POR PRINCIPAL ----- */
  thumbnails.forEach(thumb => {
    thumb.addEventListener('click', function () {
      const active = document.querySelector('.active')
      active.classList.remove('active')
      thumb.classList.add('active')
      main_img.src = thumb.src
      /* --------- INNER CUANDO UNA IMAGEN ES CAMBIADA ------------- */
      modal.innerHTML = `
        <img class="img-modal" src="${main_img.src}"
        alt="">
        `
    })
  })



}
mostrarDetalles(); /* Call the function */

