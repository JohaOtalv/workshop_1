import './styles/style.css'
const API_URL = 'http://localhost:3000/Products'; /* JSON SERVER API */
let containerCards = document.querySelector('.container-cards');
let cart; 

/* ----------------- FUNCTIONS  ---------------------*/
const addToCard = (_object) => { /* Add item to cart */
    let res = localStorage.getItem('cart')

    console.log(res);
    if (res == undefined || res == null) {
         cart = []
        let cartJson = JSON.stringify(cart)
        localStorage.setItem('cart', cartJson);
    } else {
       let cart = JSON.parse(res)
    }
    cart.push(_object);
    let cartJson = JSON.stringify(cart)
    localStorage.setItem('cart', cartJson);
    console.log('add');
}

const irADetalles = (_object) => { /* EventListener to go details */
    localStorage.setItem("detalles", JSON.stringify(_object));
    window.location.href = "/details.html";
  }

  const logo = document.querySelector(".logo") /* EventListener to go index on click logo */
logo.addEventListener("click", event =>{
window.location.href = "/index.html";
})

const filtrado = (_tag) => { /*  Filter showed cards */
    containerCards.innerHTML = ``;
    console.log("ENTRO PERRO");
    if (_tag == 'men') {
        loaderCards(API_URL + "?type=" + 'male');
    }else if (_tag == 'women') {
        loaderCards(API_URL + "?type=" + 'female');
    }else{
        loaderCards(API_URL);
    }
}
window.filtrado = filtrado; /* Adding this function to GLOBAL SCOPE */

const loaderCards = async (API) => { /* Load all cards in Collections */
    const respuesta = await fetch(API)
    const datos = await respuesta.json()
    console.log(datos);

    try {
        containerCards.innerHTML += ``
        datos.forEach(element => {


            const div = document.createElement('div');
            div.setAttribute('class', ' card_cartas ');
            div.innerHTML = `
             <div id="id${element.id}">
            <div class="card_image">
            <img src="${element.image}" class="card-img-top" alt="...">
            </div>
            <div class="card-body">
            <h2> ${element.name}</h2>
            <h5 class="card-title">$${element.price}</h5>
            <a href="#" class="btn btn-primary" id="add${element.id}" >Add</a>
            </div>
        `
            containerCards.appendChild(div);
            // funciones
            const button = document.getElementById('add' + element.id);
            button.addEventListener('click', () => {
                console.log('me undiste');
                addToCard(element);
            })
            
            const carta = document.getElementById('id'+ element.id)
            carta.addEventListener('click', () =>{
                irADetalles(element)
            })
        });

    } catch (error) {

    }

}

loaderCards(API_URL); /* Call the function */
