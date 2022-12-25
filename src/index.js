import './styles/style.css'
const API_URL = 'http://localhost:3000/Products'; /* JSON SERVER API */
let containerCards = document.querySelector('.container-cards');
let cart;
/* ----------------- FUNCTIONS  ---------------------*/

/* *******************  CART FUNCTIONS***************** */

/* - Function to add cart items */
const addToListCart = () => {
    let containerList = document.querySelector('.container-list');
    let res = localStorage.getItem('cart')
    if (res != undefined || res != null) {
        let cart = JSON.parse(res)
        containerList.innerHTML = ``
        cart.forEach((e) => {
            containerList.innerHTML += `
                <div class="details d-flex align-items-center efecto">
                 <img class="cart-image"src="${e.image}"alt="" style="width: 7rem; overflow-y: scroll;">
                    <div>
                      <p class="product-title">${e.name}</p>
                      <p class="price">$125 x3 <b>$${e.price}</b> </p>
                      <div class="input-group">
                        <button class="numSub btn btns-cart" onclick ="numSub(${e.price},${e.id})">-</button>
                        <input class="idNum${e.id} form-control" type="number">
                        <button class="numAdd btn btns-cart" onclick="numAdd(${e.price},${e.id})">+</button>
                      </div>
                    </div>
                <img class="delete" src="https://raw.githubusercontent.com/DiRenzoV/E-commerce/f6f8ebfe79e3e9bf93d78692aba607a016556261/src/images/icon-delete.svg"
                    alt="delete" onclick="eraseCartItem(${e.id})">
                </div>
                `
        })
    }

}

/* ----------------------- Adding effect show and hide to Modal ---------  */
let efecto = document.querySelector(".efecto")
let cartSection = document.querySelector(".cart-section")
let cartBtn = document.querySelector("#cart-button")
let status = true;

const showCart = ()=>{
    console.log("Entro a funcion");
    if (status){
        cartSection.style.display = "block";
        status =!status

    } else{
        cartSection.style.display = "none";
        status =!status
    }
}

cartBtn.addEventListener("click", ()=>{
    showCart()
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
    /* CALL FUNCTIONS */
    addToListCart();
    notificationCart()
}

let numArr = [0, 0, 0, 0, 0, 0, 0, 0]
let numArrJSON = JSON.stringify(numArr);
localStorage.setItem('arrayCantidadProductos',numArrJSON)

function numAdd(_price, _id) {
    let array = localStorage.getItem('arrayCantidadProductos')
    numArr[_id - 1] = numArr[_id - 1] + 1
    document.querySelector(`.idNum${_id}`).value = numArr[_id - 1]

}
window.numAdd = numAdd;
function numSub(_price, _id) {
    if (numArr[_id - 1] > 0) {
        numArr[_id - 1] = numArr[_id - 1] - 1
        document.querySelector(`.idNum${_id}`).value = numArr[_id - 1]
    }
}
window.numSub = numSub;

const notificationCart = () => {
    let res = localStorage.getItem('cart')
    let notification = document.querySelector(".notification")
    if (res != undefined || res != null) {
        let localParsed = JSON.parse(res)
        notification.innerText = localParsed.length
    } else {
        notification.innerText = '0';
    }
}
const eraseCartItem = (id) => {
    let localData = localStorage.getItem("cart")

    cart = JSON.parse(localData) // Parseo para tenerlo listo en los if's inferiores
    if (localData == undefined || localData == null) {
        cart = []
    }
    if (cart.some((product) => product.id === id)) {  //Esta condiciÃ³n compara si ya existe el elemento en el Local Storage
        localStorage.removeItem("cart") // Esto elimina todo del cartJSON

        /*         const toastLiveExample = document.getElementById('show-toast')
                const toast = new bootstrap.Toast(toastLiveExample)
                toast.show() */

        let filterCart = cart.filter((element) => {
            return element.id != id
        })
        console.log(filterCart)

        let cartJSON = JSON.stringify(filterCart)
        localStorage.setItem("cart", cartJSON)
        notificationCart()
    }
    addToListCart();
}
window.eraseCartItem = eraseCartItem;

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

export const filtrado = (_tag) => { /*  Filter showed cards */
    /* window.location.href = "/index.html"; */
    containerCards.innerHTML = ``;
    if (_tag == 'men') {
        loaderCards(API_URL + "?type=" + 'male');
        console.log("MALE");
    } else if (_tag == 'women') {
        loaderCards(API_URL + "?type=" + 'female');
        console.log("MALE");
    } else {
        loaderCards(API_URL);
    }
}
window.filtrado = filtrado; /* Adding this function to GLOBAL SCOPE */

const loaderCards = async (API) => { /* Load all cards in Collections */
    const respuesta = await fetch(API)
    const datos = await respuesta.json()

    try {
        containerCards.innerHTML = ``
        datos.forEach(element => {


            const div = document.createElement('div');
            div.setAttribute('class', 'card_cartas');
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
            <a href="#" class="btn btn-primary btn-add" id="add${element.id}" >Add</a>

        `
            containerCards.appendChild(div);
            // funciones
            /* Click on add Product */
            const button = document.getElementById('add' + element.id);
            button.addEventListener('click', () => {
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



