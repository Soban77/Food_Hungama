import { favourite } from "./food.js";
import { Restaurants } from "./home.js";
import { cartIconEvent } from "./general.js";

function renderFavouriteHTML() {

  let html = '';

  let url = new URL(window.location.href);
  let id = url.searchParams.get('id');

  if(favourite.length !== 0)
  {
    let rendered = false;

    favourite.forEach((fav) => {

      Restaurants.forEach((res) => {

        if(res.restaurant_id == fav.restaurant_id && fav.user_id == id)
        {
          rendered = true;

          html += `<div class="home-main-restaurants-part1 js-restaur" data-res-id="${res.restaurant_id}">
              <img src="${res.source}">
              <div class="home-main-restaurants-part2">
                <p class="home-main-restaurants-part2-1">${res.name}</p>
                <div class="home-main-restaurants-part2-2">
                  <img src="Images/Rating-Star.png">
                  <p>${res.rating}</p>
                </div>
              </div>
              <div class="home-main-restaurants-part3">
                <img src="Images/Delivery-bike.jpg">
                <p>Rs.140</p>
              </div>
            </div>`;
        }

      }); 

    });

    if(rendered)
    {
      document.querySelector('.js-favourite-restaurants').innerHTML = html;
    }
    else {
      const noFav = document.querySelector('.js-No-favourite-container');

      noFav.style.display = "flex";
    }
  }
  else if(favourite.length === 0)
  {
    const noFav = document.querySelector('.js-No-favourite-container');

    noFav.style.display = "flex";
  }
}

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

function clickRestaurant()
{
  document.querySelectorAll('.js-restaur').forEach((resd) => {

    resd.addEventListener('click', () => {

      let url = new URL(window.location.href);
      let id = url.searchParams.get('id');

      const RId = resd.dataset.resId;
      
      window.location.href = `food.html?userid=${id}&resid=${RId}`; 

    });

  });

}

renderFavouriteHTML();
clickRestaurant();
cartIconEvent();
