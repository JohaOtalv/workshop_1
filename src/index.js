import './styles/style.css'
import  logo from './img/logo.png';
const API_URL_MALE = 'http://localhost:3000/maleProducts';
const API_URL_FEMALE = 'http://localhost:3000/femaleProducts';

let containerCards = document.querySelector('.container-cards');

const loaderCards = async(API)=>{
    const respuesta = await fetch(API)
    const datos = await respuesta.json()
    console.log(datos);
    
    try {
        containerCards.innerHTML += ``
        datos.forEach(element => {
            
            
        const div = document.createElement('div');
        div.setAttribute('class', 'card cartas');
        div.innerHTML =`
        <img src="${element.image}" class="card-img-top" alt="...">
        <div class="card-body">
        <h2> ${element.name}</h2>
          <h5 class="card-title">$${element.price}</h5>
          <a href="#" class="btn btn-primary" id="add${element.id}" >Add</a>
        `
        containerCards.appendChild(div);
        // funciones
        const button = document.getElementById('add'+ element.id);
        button.addEventListener('click',()=>{
            addToCard(element.id);
        })
        });
        
    } catch (error) {
        
    }
}
loaderCards(API_URL_MALE);
loaderCards(API_URL_FEMALE);

const getData = async (id) => {
    const respuesta = await fetch(API_URL_MALE + "?id=" + id);
    const datos = await respuesta.json();
    let objeto = datos[0]
    let cont = 0;
    return objeto;
  }
const addToCard = (_id)=>{
let data = getData(_id)
let res = localStorage.getItem('cart')
if(res== undefined || res ==null){
let cart =[]
} else{
    cart = JSON.parse(res)
}
cart.push(data);
let cartJson = JSON.stringify(cart)
localStorage.setItem('cart',cartJson);
console.log('add');
}
