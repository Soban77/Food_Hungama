import { cart,foodRenderHTML,renderItemHTML,itemAndCategoryHTML } from "./food.js";
import { Restaurants } from "./home.js";

export function renderGeneralHTML()
{
  let html = '';
  let resIds = [];

  cart.forEach((carts) => {

    let isFound = false;

    resIds.forEach((r) => {

      if(r.res_id == carts.restaurant_id)
      {
        isFound = true;
      }

    });

    if(isFound === false)
    {
      let index = Restaurants.findIndex(res => res.restaurant_id == carts.restaurant_id);

      resIds.push({
        res_id: carts.restaurant_id,
        rating: Restaurants[index].rating,
        source: Restaurants[index].source,
        name: Restaurants[index].name
      });
    }

  });

  resIds.forEach((r) => {

    html += `
      <div class="All-carts-2-a">
        <div class="All-carts-2-a-1">
          <div class="All-carts-2-a-11">
            <img src="${r.source}">
            <div>
              <h1>${r.name}</h1>
              <div>
                <img src="Images/Rating-Star.png">
                <p>${r.rating}</p>
              </div>
            </div>
            <i class="fa fa-trash js-trash" data-res-id="${r.res_id}"></i>
          </div>

          <div class="All-carts-2-a-12">`;

    let total = 0;

    cart.forEach((carts) => {

      if(r.res_id == carts.restaurant_id)
      {
        html += `<img src="${carts.source}">`;

        total += carts.quantity*carts.price;
      }
      
    });

    html += `<p class="js-cart-change" data-res-id="${r.res_id}">+</p>
              </div>

              <div class="All-carts-2-a-13">
                <p class="All-p1">Total</p>
                <p class="All-p2">Rs. ${total}</p>
              </div>

              <div class="All-carts-2-a-14"> 
                <button>Go to Checkout</button>
              </div>
            </div>
          </div>
        `;

  });

  let AllCarts2 = document.querySelector('.js-All-carts-2');

  if(AllCarts2)
  {
    AllCarts2.innerHTML = html;

    if(html === '')
    {

      let ecar = document.querySelector('.js-Empty-cart');

      if(ecar)
      {
        ecar.style.display = "flex";
      }
    }
  }
}

export function cartIconEvent() {

  let html = '';
  let resIds = [];

  cart.forEach((carts) => {

    let isFound = false;

    resIds.forEach((r) => {

      if(r.res_id == carts.restaurant_id)
      {
        isFound = true;
      }

    });

    if(isFound === false)
    {
      let index = Restaurants.findIndex(res => res.restaurant_id == carts.restaurant_id);

      resIds.push({
        res_id: carts.restaurant_id,
        rating: Restaurants[index].rating,
        source: Restaurants[index].source,
        name: Restaurants[index].name
      });
    }

  });

  resIds.forEach((r) => {

    html += `
      <div class="All-carts-2-a">
        <div class="All-carts-2-a-1">
          <div class="All-carts-2-a-11">
            <img src="${r.source}">
            <div>
              <h1>${r.name}</h1>
              <div>
                <img src="Images/Rating-Star.png">
                <p>${r.rating}</p>
              </div>
            </div>
            <i class="fa fa-trash js-trash" data-res-id="${r.res_id}"></i>
          </div>

          <div class="All-carts-2-a-12">`;

    let total = 0;

    cart.forEach((carts) => {

      if(r.res_id == carts.restaurant_id)
      {
        html += `<img src="${carts.source}">`;

        total += carts.quantity*carts.price;
      }
      
    });

    html += `<p class="js-cart-change" data-res-id="${r.res_id}">+</p>
              </div>

              <div class="All-carts-2-a-13">
                <p class="All-p1">Total</p>
                <p class="All-p2">Rs. ${total}</p>
              </div>

              <div class="All-carts-2-a-14"> 
                <button>Go to Checkout</button>
              </div>
            </div>
          </div>
        `;

  });

  let AllCarts2 = document.querySelector('.js-All-carts-2');

  if(AllCarts2)
  {
    AllCarts2.innerHTML = html;

    if(html === '')
    {
      let ecar = document.querySelector('.js-Empty-cart');

      if(ecar)
      {
        ecar.style.display = "flex";
      }
    }
  }

  let url = new URL(window.location.href);
  let user_id;
  
  if(url.pathname.includes('food.html') || url.pathname.includes('payment.html'))
  {
    user_id = url.searchParams.get('userid');
  }
  else
  {
    user_id = url.searchParams.get('id');
  }

  const cartIcon = document.querySelector('.js-home-cart');

  if(cartIcon)
  {
    cartIcon.addEventListener('click', () => {

      const AllCa = document.querySelector('.js-All-carts');

      if(AllCa)
      {
        AllCa.style.display = "flex";
      }

    });
  }

  const cartCross = document.querySelector('.js-cart-cross');

  if(cartCross)
  {
    cartCross.addEventListener('click', () => {

      const AllCa = document.querySelector('.js-All-carts');

      if(AllCa)
      {
        AllCa.style.display = "none";
      }

    });
  }

  document.querySelectorAll('.js-cart-change').forEach((events) => {

    events.addEventListener('click', () => {

      let resId = events.dataset.resId;
      console.log(user_id);

      window.location.href = `food.html?userid=${user_id}&resid=${resId}`;

    });

  });

  document.querySelectorAll('.js-trash').forEach((events) => {

    events.addEventListener('click', () => {

      let resId = events.dataset.resId;
      let cnt = 0;

      cart.forEach((carts) => {

        if(carts.restaurant_id == resId && carts.user_id == user_id)
        {
          cnt++;
        }

      });

      if(cnt>0)
      {
        // let index = cart.findIndex(cart => cart.restaurant_id == resId && cart.user_id == user_id);
        
        // cart.splice(index,cnt);

        // localStorage.setItem('carts',JSON.stringify(cart));

        // renderGeneralHTML();
        // foodRenderHTML();
        // itemAndCategoryHTML();
        // renderItemHTML();
        // checkEmpty2();

        cart = cart.filter(c => !(c.restaurant_id == resId && c.user_id == user_id));
        localStorage.setItem('carts', JSON.stringify(cart));
        renderGeneralHTML();
        foodRenderHTML();
        itemAndCategoryHTML();
        renderItemHTML();
        checkEmpty2();
      }

    });

  });

  document.querySelectorAll('.All-carts-2-a-14 button').forEach((btn) => {

    btn.addEventListener('click', () => {

      let resId = btn.closest('.All-carts-2-a').querySelector('.js-trash').dataset.resId;

      window.location.href = `payment.html?userid=${user_id}&resid=${resId}`;
    });
    
  });

}

export function checkEmpty2()
{
  let html = '';
  let AllCarts2 = document.querySelector('.js-All-carts-2');

  if(AllCarts2)
  {
     html = AllCarts2.innerHTML;

    if(html === '')
    {
      let ecar = document.querySelector('.js-Empty-cart');

      if(ecar)
      {
        ecar.style.display = "flex";
      }
    }
    else
    {
      let ecar = document.querySelector('.js-Empty-cart');

      if(ecar)
      {
        ecar.style.display = "none";
      }
    }
  }
}