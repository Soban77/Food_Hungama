import {Users} from "./index.js";
import { cartIconEvent } from "./general.js";

document.querySelector('.js-home-profile').addEventListener('click', () => {

  let url = new URL(window.location.href);
  let id = url.searchParams.get('id');

  window.location.href = `options.html?id=${id}`;

});

document.querySelector('.js-home-title').addEventListener('click', () => {

  let url = new URL(window.location.href);
  let id = url.searchParams.get('id');

  window.location.href = `home.html?id=${id}`;

});

document.querySelector('.js-home-favourite').addEventListener('click', () => {

  let url = new URL(window.location.href);
  let id = url.searchParams.get('id');

  window.location.href = `favourite.html?id=${id}`;

});

function profileRenderHTML() {

  let url = new URL(window.location.href);
  let id1 = url.searchParams.get('id'); 

  let username1;
  let address1;
  let mobile1;
  let email1;
  let wallet1;

  Users.forEach((user) => {

    if(user.id === id1)
    {
      username1 = user.name;
      address1 = user.address;
      mobile1 = user.phone;
      email1 = user.email;
      wallet1 = user.wallet_balance;
    }

  });

  // document.querySelector('.js-username').innerHTML = username1;
  document.querySelector('.js-username').innerHTML = username1 || "Not available";
  document.querySelector('.js-address').innerHTML = address1;
  document.querySelector('.js-mobile').innerHTML = mobile1;
  document.querySelector('.js-email').innerHTML = email1;
  document.querySelector('.js-wallet').innerHTML = wallet1 !== undefined ? `Rs. ${wallet1}` : "Rs. 0";
}

profileRenderHTML();
cartIconEvent();