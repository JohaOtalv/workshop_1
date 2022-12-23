import './styles/style.css'
const API_URL = 'http://localhost:3000/Products'; /* JSON SERVER API */
let containerCards = document.querySelector('.container-cards');
let cart = [];
let num = 0;

/* ----------------- FUNCTIONS  ---------------------*/
const addToListCart = () => { /* PROBANDOOOOOOOOOOOOOOOOO */
    console.log("ENTRO A LISTA");
    let containerList = document.querySelector('.container-list');
    let res = localStorage.getItem('cart')

    if (res !== undefined) {
        console.log("Bien o que LIST")
        let cart = JSON.parse(res)
        console.log(cart);
        containerList.innerHTML = ``
        cart.forEach((e) => {
            containerList.innerHTML += `
                <div class="details d-flex">
                <img class="cart-image"
                    src="${e.image}"
                    alt="" style="width: 7rem">
                <div>
                    <p class="product-title">${e.name}</p>
                    <p class="price">$125 x3 <span>$${e.price}</span> </p>
                    <button class="numSub" onclick ="numSub(${e.price},${e.id})">-</button>
                        <input class="idNum${e.id}" type="text">
                    <button class="numAdd" onclick="numAdd(${e.price},${e.id})">+</button>
                </div>
                <img class="delete"
                    src="https://raw.githubusercontent.com/DiRenzoV/E-commerce/f6f8ebfe79e3e9bf93d78692aba607a016556261/src/images/icon-delete.svg"
                    alt="delete">
                </div>
                `
        })
    }

}
let carts = document.querySelector(".cart-section")

let cartb = document.querySelector("#cart-button")
cartb.addEventListener("click", () => {
    carts.style.display = "block"
})

const addToCard = (_object) => { /* Add item to cart */
    let res = localStorage.getItem('cart')

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
    console.log('Añadido');
    addToListCart();
}

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

            /*             const carta = document.getElementById('id' + element.id)
                        carta.addEventListener('click', () => {
                            irADetalles(element)
                        }) */
        });

    } catch (error) {

    }

}

loaderCards(API_URL); /* Call the function */

function numAdd(_price, _id) {
    num = num + 1
    document.querySelector(`.idNum${_id}`).value = num
    let total = num * _price
    let _total = document.querySelector(`#totalPrice${_id}`)
    _total.innerText = total
    valorOrden = valorOrden + total
}

function numSub(_price, _id) {
    num = num - 1
    document.querySelector(`.idNum${_id}`).value = num
    let total = num * _price
    let _total = document.querySelector(`#totalPrice${_id}`)
    num < 0 ? num = 0 :
        _total.innerText = total
    valorOrden = valorOrden + total
}

// const notificationCart = () => {

//     let notification = document.querySelector(".notification")
//     let localData = localStorage.getItem("cart")
//     let localParsed = JSON.parse(localData)
//     notification.innerText = localParsed.length
// }
// notificationCart()