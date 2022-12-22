import './styles/style.css'
import logo from './img/logo.png';
const API_URL = 'http://localhost:3000/Products';


let containerCards = document.querySelector('.container-cards');


// const getData = async (id) => {
//     const respuesta = await fetch("http://localhost:3000/Products?id=" + id);
//     const datos = await respuesta.json();
//     let objeto = datos[0]
//     return objeto;
//   }
let cart; 
const addToCard = (_object) => {
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


const loaderCards = async (API) => {
    const respuesta = await fetch(API)
    const datos = await respuesta.json()
    console.log(datos);

    try {
        containerCards.innerHTML += ``
        datos.forEach(element => {


            const div = document.createElement('div');
            div.setAttribute('class', 'card cartas');
            div.innerHTML = `
        <img src="${element.image}" class="card-img-top" alt="...">
        <div class="card-body">
        <h2> ${element.name}</h2>
          <h5 class="card-title">$${element.price}</h5>
          <a class="btn btn-primary" id="add${element.id}" >Add</a>
        `
            containerCards.appendChild(div);
            // funciones
            const button = document.getElementById('add' + element.id);
            button.addEventListener('click', () => {
                console.log('me undiste');
                addToCard(element);

            })
        });

    } catch (error) {

    }

}

loaderCards(API_URL);
