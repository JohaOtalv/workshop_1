import './styles/style.scss';
import * as bootstrap from 'bootstrap';
const API_URL = 'https://my-json-server.typicode.com/moralesvictorr/jsonserverSprint1/Products'; /* JSON SERVER API */
let containerCards = document.querySelector('.container-cards');
let cart;
/* ----------------- FUNCTIONS  ---------------------*/

/* *******************  CART FUNCTIONS***************** */

/* - Function to add cart items */
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
            // Funciones
            /* Click on add Product */
            const button = document.getElementById('add' + element.id);
            button.addEventListener('click', () => {
                element.cantidadComprar = 0;
                addToCart(element);

            })
            /* Click for go to details */
            const carta = document.getElementById('id' + element.id)
            carta.addEventListener('click', () => {
                element.cantidadComprar = 0;
                irADetalles(element)
            })
        });

    } catch (error) {

    }
}
const showCartOnModal = () => { /* Load Cart Items on modal */
    let containerList = document.querySelector('.container-list');
    let res = localStorage.getItem('cart')
    try {
        if (res != undefined || res != null) {
            let cart = JSON.parse(res)
            containerList.innerHTML = ``
            cart.forEach((e) => {

                const div = document.createElement('div');
                div.setAttribute('class', 'details d-flex align-items-center efecto');
                div.innerHTML = `
                    <div class="details d-flex align-items-center efecto">
                     <img class="cart-image"src="${e.image}"alt="" style="width: 7rem; overflow-y: scroll;">
                        <div>
                          <p class="product-title">${e.name}</p>
                          <p class="price"><b>$${e.price}</b> x${e.cantidadComprar} </p>
                          <div class="input-group">
                            <button id="btnSub${e.id}" class="numSub btn btns-cart">-</button>
                            <input class="idNum${e.id} form-control" type="number" value="${e.cantidadComprar}" readonly>
                            <button id="btnAdd${e.id}" class="numAdd btn btns-cart">+</button>
                          </div>
                        </div>
                    <img class="delete" src="https://raw.githubusercontent.com/DiRenzoV/E-commerce/f6f8ebfe79e3e9bf93d78692aba607a016556261/src/images/icon-delete.svg"
                        alt="delete" onclick="eraseCartItem(${e.id})">
                    </div>
                    `
                containerList.appendChild(div);
                // Funciones
                /* Click on add Product */
                const buttonAdd = document.getElementById('btnAdd' + e.id);
                buttonAdd.addEventListener('click', () => {
                    console.log("me ejecuto");
                    addToCart(e);
                })

                const buttonSub = document.getElementById('btnSub' + e.id)
                buttonSub.addEventListener('click', () => {
                    console.log("Me ejectuo restar");
                    subToCart(e);
                })
            });
        }
    } catch (error) {

    }
}

/* ----------------------- Adding effect show and hide to Modal ---------  */
let efecto = document.querySelector(".efecto")
let cartSection = document.querySelector(".cart-section")
let cartBtn = document.querySelector("#cart-button")
let status = true;

/* ---------- Change modal display when click in Cart Icon */
const handleModalDisplay = () => {
    if (status) {
        cartSection.style.display = "block";
        status = !status

    } else {
        cartSection.style.display = "none";
        status = !status
    }
}
/* ---------- AddEventListener when touch cart Icon */
cartBtn.addEventListener("click", () => {
    handleModalDisplay()
})

/* --------------------------------------------------- */

/*  on click add -> LocalStorage the items */
const addToCart = (_object) => {
    let res = localStorage.getItem('cart')

    if (res == undefined || res == null) {/* NO ENCONTRO CART EN LS */
        cart = []
        _object.cantidadComprar = 1
        cart.push(_object);

    } else { /*  SI ECONTRO CART EN EL LOCAL STORAGE */
        cart = JSON.parse(res)
        let flag = false;
        /* RECORRO CART BUSCANDO ID */
        cart.forEach((e) => {
            /* SI ENCUENTRA ESTE ID EN EL CARRITO SOLO LE AÑADE 1 */
            if (e.id == _object.id) {
                flag = true
                e.cantidadComprar++;
            }
        })
        /* SI HAY CARRITO PERO NO ESTA AÑADIDO ESTE ID LO AÑADE POR PRIMERA VEZ */
        if (!flag) {
            _object.cantidadComprar = 1;
            console.log("NO estaba el id añadi 1");
            cart.push(_object)
        }
    }
    let cartJson = JSON.stringify(cart)
    localStorage.setItem('cart', cartJson);

    /* CALL FUNCTIONS */
    showCartOnModal();
    notificationCart();

}
window.addToCart = addToCart;
/* ---------------   Add an Remove from Cart with LocalStorage --------- */

const eraseCartItem = (id) => {
    let localData = localStorage.getItem("cart")
    cart = JSON.parse(localData) // Parseo para tenerlo listo en los if's inferiores

    if (cart.some((product) => product.id === id)) {  //Esta condiciÃ³n compara si ya existe el elemento en el Local Storage
        localStorage.removeItem("cart") // Esto elimina todo del cartJSON

        const toastLiveExample = document.getElementById('show-toast')
        const toast = new bootstrap.Toast(toastLiveExample)
        toast.show()

        let filterCart = cart.filter((element) => {
            return element.id != id
        })

        let cartJSON = JSON.stringify(filterCart)
        localStorage.setItem("cart", cartJSON)
        notificationCart()
    }
    showCartOnModal();
    return filterCart;
}
window.eraseCartItem = eraseCartItem;

function subToCart(_object) {
    let res = localStorage.getItem('cart')
    cart = JSON.parse(res)
    /* RECORRO CART BUSCANDO ID */
    cart.forEach((product) => {
        if (product.id === _object.id) {
            if (product.cantidadComprar > 1) {
                product.cantidadComprar--;
            } else if(product.cantidadComprar == 1){
                cart = (eraseCartItem(product.id))
            }
        }
    })

    let cartJson = JSON.stringify(cart)
    localStorage.setItem('cart', cartJson);

    /* CALL FUNCTIONS */
    showCartOnModal();
}
window.subToCart = subToCart; /* Adding this function to global scope */

/* -------------  Notification pop up ------------ */
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

/* ******************* END CART FUNCTIONS***************** */

/* ----------- Go details ------------- */
const irADetalles = (_object) => { /* EventListener to go details */
    localStorage.setItem("detalles", JSON.stringify(_object));
    window.location.href = "/details.html";
}

/*  ---------- Click on logo -> index.html ----------- */
const logo = document.querySelector(".logo") /* EventListener to go index on click logo */
logo.addEventListener("click", event => {
    window.location.href = "/index.html";
})

/* -----------     Filter database -------------- */
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

/* ----  CALL FUNCTIONS at the beginning */
notificationCart()
showCartOnModal(); /* Call the function for show cart list items on start */
loaderCards(API_URL); /* Call the function */



