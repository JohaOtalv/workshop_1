import './styles/style.css'
const API_URL = 'http://localhost:3000/Products'; /* JSON SERVER API */
let containerCards = document.querySelector('.container-cards');
let cart;
/* ----------------- FUNCTIONS  ---------------------*/

/* *******************  CART FUNCTIONS***************** */

/* - Function to add cart items */
const addToListCart = () => {
    console.log("ENTRO A LISTA");
    let containerList = document.querySelector('.container-list');
    let res = localStorage.getItem('cart')
    if (res != undefined || res != null) {
        let cart = JSON.parse(res)
        console.log(cart);
        containerList.innerHTML = ``
        cart.forEach((e) => {
            containerList.innerHTML += `
                <div class="details d-flex">
                 <img class="cart-image"src="${e.image}"alt="" style="width: 7rem; overflow-y: scroll;">
                    <div>
                      <p class="product-title">${e.name}</p>
                      <p class="price">$125 x3 <span>$${e.price}</span> </p>
                      <button class="numSub" onclick ="numSub(${e.price},${e.id})">-</button>
                      <input class="idNum${e.id}" type="text">
                      <button class="numAdd" onclick="numAdd(${e.price},${e.id})">+</button>
                    </div>
                <img class="delete" src="https://raw.githubusercontent.com/DiRenzoV/E-commerce/f6f8ebfe79e3e9bf93d78692aba607a016556261/src/images/icon-delete.svg"
                    alt="delete">
                </div>
                `
        })
    }

}

/* ----------------------- Adding effect show and hide to Modal ---------  */
let cartSection = document.querySelector(".cart-section")
let cartBtn = document.querySelector("#cart-button")
cartBtn.addEventListener("mouseover", () => {
    cartSection.style.display = "block"
    document.body.addEventListener('click', () => {
        cartSection.style.display = "none"
    });
})



/* --------------------------------------------------- */

/*  When click the card button add to LocalStorage items */
const addToCard = (_object) => {
    let res = localStorage.getItem('cart')

    if (res == undefined || res == null) {
        cart = []
    } else {
        cart = JSON.parse(res)
    }
    cart.push(_object);
    let cartJson = JSON.stringify(cart)
    localStorage.setItem('cart', cartJson);
    console.log('Añadido');
    /* CALL FUNCTIONS */
    addToListCart();
    notificationCart()
}

let numArr = [0, 0, 0, 0, 0, 0, 0, 0]
function numAdd(_price, _id) {
    numArr[_id - 1] = numArr[_id - 1] + 1
    document.querySelector(`.idNum${_id}`).value = numArr[_id - 1]

}
window.numAdd = numAdd;
function numSub(_price, _id) {
    if (numArr[_id - 1] > 0) {
        console.log("SIISISIS");
        numArr[_id - 1] = numArr[_id - 1] - 1
        document.querySelector(`.idNum${_id}`).value = numArr[_id - 1]
    }
}
window.numSub = numSub;

const notificationCart = () => {
    let res = localStorage.getItem('cart')
    let notification = document.querySelector(".notification")
    if (res != undefined || res != null) {
        console.log("PAsa condicion");
        let localParsed = JSON.parse(res)
        notification.innerText = localParsed.length
    }else{
        notification.innerText = '0';
    }
}

/* ----  CALL FUNCTIONS */
notificationCart()
addToListCart(); /* Call the function for show cart list items on start */
/* ******************* END CART FUNCTIONS***************** */


const irADetalles = (_object) => { /* EventListener to go details */
    localStorage.setItem("detalles", JSON.stringify(_object));
    window.location.href = "/details.html";
}

const logo = document.querySelector(".logo") /* EventListener to go index on click logo */
logo.addEventListener("click", event => {
    window.location.href = "/index.html";
})

const filtrado = (_tag) => { /*  Filter showed cards */
    containerCards.innerHTML = ``;
    console.log("ENTRO PERRO");
    if (_tag == 'men') {
        loaderCards(API_URL + "?type=" + 'male');
    } else if (_tag == 'women') {
        loaderCards(API_URL + "?type=" + 'female');
    } else {
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
                </div>
            </div>
            <a href="#" class="btn btn-primary" id="add${element.id}" >Add</a>

        `
            containerCards.appendChild(div);
            // funciones
            /* Click on add Product */
            const button = document.getElementById('add' + element.id);
            button.addEventListener('click', () => {
                console.log('me undiste');
                addToCard(element);
            })
            /* Click for go to details */
            const carta = document.getElementById('id' + element.id)
            carta.addEventListener('click', () => {
                irADetalles(element)
            })
        });

    } catch (error) {

    }
}

loaderCards(API_URL); /* Call the function */



