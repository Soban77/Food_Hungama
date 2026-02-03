import { Restaurants } from "./home.js";
import { cartIconEvent,renderGeneralHTML,checkEmpty2 } from "./general.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

export let cart = JSON.parse(localStorage.getItem('carts')) || [];
export let favourite = JSON.parse(localStorage.getItem('favourite')) || [];

let Delivery = JSON.parse(localStorage.getItem('Delivery')) || [];

let Review = JSON.parse(localStorage.getItem('reviews')) || [];

let Users = JSON.parse(localStorage.getItem('user')) || [];


let food = [{
  item_id: 1,
  restaurant_id: 1,
  name: 'Spicy Gigantic Burrito',
  description: 'A warm tortilla wrapped around a mouthwatering medley of crispy',
  price: 550,
  category: 'Burrito',
  availability: true,
  source: 'Images/Food_Item_Images/Spicy_burrito.jpg'
},
{
  item_id: 2,
  restaurant_id: 1,
  name: 'Crunchy Cheesy Overloaded Fries',
  description: 'A mountain of crispy fries loaded with crunchy chicken bites, smothered in',
  price: 550,
  category: 'Fries',
  availability: true,
  source: 'Images/Food_Item_Images/Crunchy_cheesy_overloaded_fries.jpg'
},
{
  item_id: 3,
  restaurant_id: 3,
  name: 'Tarzan Tikka',
  description: 'Chicken tikka, onions, marinara and mozzarella',
  price: 399,
  category: 'Pizza',
  availability: true,
  source: 'Images/Food_Item_Images/Tarzan-Tikka-broadway.jpg'
}];

let category = [{
  category_id: 1,
  name: 'Burrito',
  description: 'A warm tortilla wrapped around a mouthwatering medley of crispy'
},
{
  category_id: 2,
  name: 'Fries',
  description: 'A mountain of crispy fries loaded with crunchy chicken bites, smothered in'
},
{
  category_id: 3,
  name: 'Pizza',
  description: 'Chicken tikka, onions, marinara and mozzarella'
}];

let order_details = [];

document.querySelector('.js-home-profile').addEventListener('click', () => {

  let url = new URL(window.location.href);
  let id = url.searchParams.get('userid');

  window.location.href = `options.html?id=${id}`;

});

document.querySelector('.js-home-title').addEventListener('click', () => {

  let url = new URL(window.location.href);
  let id = url.searchParams.get('userid');

  window.location.href = `home.html?id=${id}`;

});

document.querySelector('.js-home-favourite').addEventListener('click', () => {

  let url = new URL(window.location.href);
  let id = url.searchParams.get('userid');

  window.location.href = `favourite.html?id=${id}`;

});

export function foodRenderHTML() {

  let html = '';

  let url = new URL(window.location.href);
  let res_id = url.searchParams.get('resid');

  Restaurants.forEach((restaurant) => {

    let r_id = restaurant.restaurant_id;

    if(r_id == res_id)
    {
      html = `
        <div class="food-main-restaurant-img">
          <img src="${restaurant.source}">
        </div>
        <div class="food-main-restaurant-detail">
          <h1>${restaurant.name}</h1>
          <div class="food-main-restaurant-detail-1">
            <img src="Images/Delivery-bike.jpg">
            <p>Rs. 140</p>
          </div>
          <div class="food-main-restaurant-detail-2">
            <img src="Images/Rating-Star.png">
            <p>${restaurant.rating}/5 (<span>1000</span>)</p>
            <a class="js-Review-change">See reviews</a>
          </div>
        </div>`;
    }

  });

  if(document.querySelector('.js-food-main-restaurant'))
  {
    document.querySelector('.js-food-main-restaurant').innerHTML = html;
  }

  window.addEventListener('scroll', () => {

    let div = document.querySelector('.js-food-main-item-2');

    if(window.scrollY>350) {

      if(div)
      {
        div.style.position = "fixed";
        div.style.top = "100px";
      }
    }
    else {
      
      if(div)
      { 
        div.style.position = "static";
      }
    }

  });
}

export function itemAndCategoryHTML() {

  let url = new URL(window.location.href);
  let res_id = url.searchParams.get('resid');
  let check = 0;

  let html = '';
  let count = 0;

  category.forEach((cg) => {

    let ctg = cg.name;
    let ht = '';
    let gt = '';


    food.forEach((fd) => {

      if(fd.restaurant_id == res_id && ctg === fd.category)
      {
        gt = `<h1>${ctg}</h1>
        <div class="food-main-item-1">`;

        ht += `
            <div class="item-1-container">
              <div class="item-1-container-1">
                <h1>${fd.name}</h1>
                <p class="item-1-container-1-p1">Rs. ${fd.price}</p>
                <p class="item-1-container-1-p2">${fd.description}</p>
              </div>
              <div class="item-1-container-2">
                <img src="${fd.source}">
              </div>
              <div class="add-to-cart">
                <div class="add-to-cart-minus js-minus-${fd.restaurant_id}" data-item-id="${fd.item_id}">-</div>
                <div class="add-to-cart-count js-count-${fd.item_id}">0</div>
                <div class="add-to-cart-plus js-plus-${fd.restaurant_id}" data-item-id="${fd.item_id}">+</div>
              </div>
            </div>`;

          count++;
      }

    });

    html += gt + ht + '</div>';

  });

  if(count !== 0)
  {
    if(document.querySelector('.js-food-main-item-start'))
    {
      document.querySelector('.js-food-main-item-start').innerHTML = html;
    }
  }
  else {

    let pay = document.querySelector('.js-food-main-item-2');

    if(pay)
    {
      pay.style.display = "none";
    }

    let empty = document.querySelector('.js-food-empty-container');

    if(empty)
    {
      empty.style.display = "flex";
    }
  }

  // document.querySelectorAll('.js-plus').forEach((plus) => {

  //   plus.addEventListener('click', () => {

  //     let itemId = plus.dataset.itemId;
  //     let ct;

  //     if(document.querySelector(`.js-count-${itemId}`))
  //     {
  //       ct = Number(document.querySelector(`.js-count-${itemId}`).innerHTML);
  //     }

  //     ct++;

  //     html = '';

  //     if(ct == 1)
  //     {
  //       food.forEach((fd) => {

  //         if(fd.item_id == itemId) {
            
  //           html = `<div class="item-1 js-item-1" data-item-id="${itemId}">
  //                 <img src="${fd.source}">
  //                 <div class="item-1-1">
  //                   <p class="item-1-1-p">${fd.name}</p>
  //                   <div class="item-1-1-1">
  //                     <p>Rs. ${fd.price}</p>
  //                     <div class="add-to-cart-1">
                        
  //                       <div class="add-to-cart-count js-count-${fd.item_id}-1">${ct}</div>
                        
  //                     </div>
  //                   </div>
  //                 </div>
  //               </div>`;
  //         }

  //       });

  //       let HTML = document.querySelector('.js-food-main-item-2-2-start').innerHTML;

  //       document.querySelector('.js-food-main-item-2-2-start').innerHTML = HTML + html;
  //     }
  //     else
  //     {
  //       document.querySelector(`.js-count-${itemId}-1`).innerHTML = ct;
  //     }

  //     document.querySelector(`.js-count-${itemId}`).innerHTML = ct;

  //   });
  
  // });


  // document.querySelectorAll('.js-minus').forEach((plus) => {

  //   plus.addEventListener('click', () => {

  //     let itemId = plus.dataset.itemId;
  //     let ct;

  //     if(document.querySelector(`.js-count-${itemId}`))
  //     {
  //       ct = Number(document.querySelector(`.js-count-${itemId}`).innerHTML);
  //     }

  //     if(ct>0)
  //     { 
  //       ct--;

  //       html = '';

  //       if(ct == 0)
  //       {
  //         renderTotalHTML(itemId);
  //       }
  //       else
  //       {
  //         document.querySelector(`.js-count-${itemId}-1`).innerHTML = ct;
  //       }
  //     }

  //     document.querySelector(`.js-count-${itemId}`).innerHTML = ct;

  //   });

  // });

  url = new URL(window.location.href);
  let user_id1 = url.searchParams.get('userid');

  document.querySelectorAll(`.js-plus-${res_id}`).forEach((plus) => {

    plus.addEventListener('click', () => {

      let itemId = plus.dataset.itemId;

      let isFound = false;

      cart.forEach((carts) => {

        if(carts.item_id == itemId)
        {
          carts.quantity++;
          document.querySelector(`.js-count-${itemId}`).innerHTML = carts.quantity;
          isFound = true;

          localStorage.setItem('carts',JSON.stringify(cart));

          renderItemHTML();
          renderGeneralHTML();
          cartIconEvent();
          checkEmpty2();
        }

      });

      if(isFound === false)
      {
        food.forEach((fd) => {

          if(fd.item_id == itemId)
          {
            cart.push({
              cart_id: crypto.randomUUID(),
              user_id: user_id1,
              item_id: itemId,
              restaurant_id: res_id,
              name: fd.name,
              quantity: 1,
              price: fd.price,
              source: fd.source
            });

            localStorage.setItem('carts',JSON.stringify(cart));

            renderItemHTML();
            renderGeneralHTML();
            cartIconEvent();
            checkEmpty2();
          }

        });
      }

    });
  
  });

  document.querySelectorAll(`.js-minus-${res_id}`).forEach((plus) => {

    plus.addEventListener('click', () => {

      let itemId = plus.dataset.itemId;
      let ct;

      if(document.querySelector(`.js-count-${itemId}`))
      {
        ct = Number(document.querySelector(`.js-count-${itemId}`).innerHTML);
      }

      if(ct>0)
      { 
        ct--;
        
        cart.forEach((carts) => {

          if(carts.item_id == itemId)
          {
            if(ct == 0)
            {
              let index = cart.findIndex(cart => cart.item_id == itemId);

              if(index>-1)
              {
                cart.splice(index,1);
              }

              document.querySelector(`.js-count-${itemId}`).innerHTML = 0;
            }
            else
            {
              carts.quantity--;
            }

            localStorage.setItem('carts',JSON.stringify(cart));
            renderItemHTML();
            renderGeneralHTML();
            cartIconEvent();
            checkEmpty2();
          }

        });
        
      }

    });

  });

  const bt = document.querySelector('.js-review-payment-button');

  if(bt)
  {
    bt.addEventListener('click', () => {

      let url = new URL(window.location.href);
      let id = url.searchParams.get('userid');
      
      let ridd = url.searchParams.get('resid');

      window.location.href = `payment.html?userid=${id}&resid=${ridd}`;

    });
  }

}

export function renderItemHTML()
{
  let html = '';
  let total = 0;

  let url = new URL(window.location.href);
  let res_id = url.searchParams.get('resid');

  if(cart)
  {
    cart.forEach((carts) => {

      if(carts.restaurant_id == res_id)
      {
        html += `<div class="item-1 js-item-1" data-item-id="${carts.item_id}">
                      <img src="${carts.source}">
                      <div class="item-1-1">
                        <p class="item-1-1-p">${carts.name}</p>
                        <div class="item-1-1-1">
                          <p>Rs. ${carts.price}</p>
                          <div class="add-to-cart-1">
                            
                            <div class="add-to-cart-count js-count-${carts.item_id}-1">${carts.quantity}</div>
                            
                          </div>
                        </div>
                      </div>
                    </div>`;

        if(document.querySelector(`.js-count-${carts.item_id}`))
        {
          document.querySelector(`.js-count-${carts.item_id}`).innerHTML = carts.quantity;
        }

        total += carts.price*carts.quantity;
      }

    });
  }

  if(document.querySelector('.js-food-main-item-2-2-start'))
  {
    document.querySelector('.js-food-main-item-2-2-start').innerHTML = html;
  }
  
  if(document.querySelector('.js-total-price'))
  {
    document.querySelector('.js-total-price').innerHTML = total;
  }

}

function responseFavourite() {

  const fav = document.querySelector('.js-food-main-favourite');

  let url = new URL(window.location.href);
  let id = url.searchParams.get('userid');

  url = new URL(window.location.href);
  let res_id = url.searchParams.get('resid');

  if(fav)
  { 
    fav.addEventListener('click', () => {

      const image_f = document.querySelector('.js-favourite-image');

      if(image_f.src.includes('Images/heart-black-full-icon.jpg'))
      {
        image_f.src = "Images/heart-black-empty-icon.jpg";

        document.querySelector('.js-favourite-p').innerText = 'Added to favourites';

        const today = dayjs();
        const dateString = today.format('dddd, MMMM D');

        favourite.push({
          favourite_id: crypto.randomUUID(),
          user_id: id,
          restaurant_id: res_id,
          added_date: dateString
        });

        localStorage.setItem('favourite',JSON.stringify(favourite));
      }
      else
      {
        image_f.src = "Images/heart-black-full-icon.jpg";

        document.querySelector('.js-favourite-p').innerText = 'Add to favourites';

        favourite.forEach((fav) => {

          if(fav.restaurant_id == res_id && fav.user_id == id)
          {
            let index = favourite.findIndex(favourite => favourite.restaurant_id == res_id && favourite.user_id == id);

            favourite.splice(index,1);
          }

        });

        localStorage.setItem('favourite',JSON.stringify(favourite));
      }

    });
  }

  const favImg = document.querySelector('.js-favourite-image');
  const favP = document.querySelector('.js-favourite-p');

  if(favImg && favP)
  {
    favourite.forEach((fav) => {

      if(fav.restaurant_id == res_id && fav.user_id == id)
      {
        favImg.src = "Images/heart-black-empty-icon.jpg";
        favP.innerText = 'Added to favourites';
      }

    });
  }
}

function renderReviewHTML() {

  let cross = document.querySelector('.js-Review-cross');

  if(cross)
  {
    cross.addEventListener('click',() => {

      if(document.querySelector('.js-Review-page'))
      {
        if(document.querySelector('.js-Review-page').style.display === "flex")
        {
          document.querySelector('.js-Review-page').style.display = "none";

          document.querySelector('.js-food-main').style.filter = "brightness(1)";
          document.body.style.background = "none";

          if(document.querySelector('.js-home-nav'))
          {
            document.querySelector('.js-home-nav').style.filter = "brightness(1)";
          }
        }
      }

    });
      
  }

  document.addEventListener('click', (event) => {

    if(document.querySelector('.js-Review-page'))
    {
      if(document.querySelector('.js-Review-page').style.display === "flex")
      {
        const rect = document.querySelector('.js-Review-page').getBoundingClientRect();

        if(event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom)
        {

        }
        else
        {
          document.querySelector('.js-Review-page').style.display = "none";

          document.querySelector('.js-food-main').style.filter = "brightness(1)";
          document.body.style.background = "none";

          if(document.querySelector('.js-home-nav'))
          {
            document.querySelector('.js-home-nav').style.filter = "brightness(1)";
          }
        }
      }
    }

  });

  cross = document.querySelector('.js-Review-cross-2');

  if(cross)
  {
    cross.addEventListener('click',() => {

      if(document.querySelector('.js-Review-page'))
      {
        if(document.querySelector('.js-Review-page').style.display === "flex")
        {
          document.querySelector('.js-Review-page').style.display = "none";

          document.querySelector('.js-food-main').style.filter = "brightness(1)";
          document.body.style.background = "none";

          if(document.querySelector('.js-home-nav'))
          {
            document.querySelector('.js-home-nav').style.filter = "brightness(1)";
          }
        }
      }

    });
      
  }
  
  const Review_Change = document.querySelector('.js-Review-change');

  if(Review_Change)
  {
    Review_Change.addEventListener('click',() => {

      if(document.querySelector('.js-Review-page'))
      {
        document.querySelector('.js-Review-page').style.display = "flex";

        document.querySelector('.js-food-main').style.filter = "brightness(0.6)";
        document.body.style.background = "rgba(0,0,0,0.4)";

        if(document.querySelector('.js-home-nav'))
        {
          document.querySelector('.js-home-nav').style.filter = "brightness(0.6)";
        }

        onlyRenderReview();
      }

    });
  }

  const header_R = document.querySelector('.js-Reviews-page-header-2');
  const header_R2 = document.querySelector('.js-Reviews-page-header-1');
  const main_R = document.querySelector('.js-Review-page');

  if(main_R && header_R && header_R2)
  {
    main_R.addEventListener('scroll', () => {

      if(main_R.scrollTop > 20)
      {
        header_R.style.display = "flex";
        header_R2.style.display = "none";
      }
      else
      {
        header_R2.style.display = "flex";
        header_R.style.display = "none";
      }

    });
  }

  let url2 = new URL(window.location.href);
  let ressd = url2.searchParams.get('resid');

  let Html = '';

  Restaurants.forEach((rest) => {

    if(rest.restaurant_id == ressd)
    {
      let dpa = document.querySelector('.js-Review-page-p');

      if(dpa)
      {
        dpa.innerHTML = rest.name;
      }

      dpa = document.querySelector('.js-Review-rating');

      if(dpa)
      {
        dpa.innerHTML = rest.rating;
      }

      let rting = rest.rating;
      rting = (rting*10);

      let fl = rting%5;

      rting = rting-fl;

      const imr = document.querySelector('.js-Review-img-r');

      if(imr)
      {
        imr.src = `Images/ratings/rating-${rting}.png`;
      }
    }

  });

  let us_id = url2.searchParams.get('userid');

  if(ressd) renderReviews(ressd);

  const user = Users.find(u => u.id == us_id); // assuming you have Users array
  if (user && ressd) {
    setupReviewForm(ressd, us_id, user.name);
  }


  onlyRenderReview();
}

function onlyRenderReview() {

  let url2 = new URL(window.location.href);
  let ressd = url2.searchParams.get('resid');

  let Html = '';

  Restaurants.forEach((rest) => {

    if(rest.restaurant_id == ressd)
    {
      let dpa = document.querySelector('.js-Review-page-p');

      if(dpa)
      {
        dpa.innerHTML = rest.name;
      }

      dpa = document.querySelector('.js-Review-rating');

      if(dpa)
      {
        dpa.innerHTML = rest.rating;
      }

      let rting = rest.rating;
      rting = (rting*10);
      let fl = rting%5;
      rting = rting-fl;

      const imr = document.querySelector('.js-Review-img-r');

      if(imr)
      {
        imr.src = `Images/ratings/rating-${rting}.png`;
      }
    }

  });

  // renderReviewList(ressd);
  renderReviews(ressd);
}

// function renderReviewList(resId) {
//   const reviewContainer = document.querySelector('.js-Review-page-div2');
//   if (!reviewContainer) return;

//   const reviews = Review.filter(r => r.restaurant_id == resId);
//   let html = '';

//   reviews.forEach(r => {
//     html += `
//       <div class="Review-page-div2-1">
//         <h1>${r.username}</h1>
//         <div>
//           <img src="Images/ratings/rating-${r.rating * 10}.png">
//           <p>${dayjs(r.date).fromNow()}</p>
//         </div>
//         <p>${r.comment}</p>
//       </div>`;
//   });

//   reviewContainer.innerHTML = html || "<p>No reviews yet</p>";
// }

// function updateReviewHeader(rest) {
//   const nameEl = document.querySelector('.js-Review-page-p');
//   const ratingEl = document.querySelector('.js-Review-rating');
//   const starImg = document.querySelector('.js-Review-img-r');

//   if (nameEl) nameEl.innerHTML = rest.name;
//   if (ratingEl) ratingEl.innerHTML = rest.rating;

//   const ratingValue = Math.round(rest.rating * 10);
//   if (starImg) starImg.src = `Images/ratings/rating-${ratingValue}.png`;
// }

function renderReviews(resId) {
  let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
  let resReviews = reviews.filter(r => r.restaurant_id == resId);

  // Average rating
  let avg = resReviews.length
    ? (resReviews.reduce((sum, r) => sum + r.rating, 0) / resReviews.length).toFixed(1)
    : "0.0";

  if(document.querySelector(".js-Review-page-p")) document.querySelector(".js-Review-page-p").textContent = Restaurants.find(r => r.restaurant_id == resId)?.name || "Restaurant";
  if(document.querySelector(".js-Review-rating")) document.querySelector(".js-Review-rating").textContent = avg;
  if(document.querySelector(".js-Review-count")) document.querySelector(".js-Review-count").textContent = resReviews.length + " Reviews";
  // document.querySelector(".js-Review-page-p").textContent = resReviews.length + " Reviews";

  // Render list
  let html = "";
  resReviews.forEach(r => {
    html += `
      <div class="Review-page-div2-1">
        <h1>${r.user}</h1>
        <div>
          <img src="Images/ratings/rating-${r.rating}0.png">
          <p>${new Date(r.date).toLocaleDateString()}</p>
        </div>
        <p>${r.text}</p>
      </div>
    `;
  });

  if(document.querySelector(".Review-page-div2")) document.querySelector(".Review-page-div2").innerHTML = html || "<p>No reviews yet.</p>";
}

function setupReviewForm(resId, userId, userName) {
  const starsDiv = document.querySelector(".js-stars");
  let selectedRating = 0;

  if(starsDiv)
  {
    // Make stars clickable
    starsDiv.innerHTML = "";
    for (let i = 1; i <= 5; i++) {
      const star = document.createElement("span");
      star.textContent = "★";
      star.dataset.value = i;
      star.addEventListener("click", () => {
        selectedRating = i;
        document.querySelectorAll(".js-stars span").forEach(s => s.classList.remove("selected"));
        star.classList.add("selected");
      });
      starsDiv.appendChild(star);
    }
  }

  // Submit review
  if(document.querySelector(".js-submit-review")) document.querySelector(".js-submit-review").addEventListener("click", () => {

    const text = document.querySelector(".js-review-text").value;
    if (!selectedRating || !text) {
      alert("Please select a rating and write a review.");
      return;
    }

    let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    reviews.push({
      restaurant_id: resId,
      user_id: userId,
      user: userName,
      rating: selectedRating,
      text,
      date: new Date().toISOString()
    });

    localStorage.setItem("reviews", JSON.stringify(reviews));
    document.querySelector(".js-review-text").value = "";
    selectedRating = 0;
    renderReviews(resId);
  });
}

foodRenderHTML();
itemAndCategoryHTML();
renderItemHTML();
responseFavourite();
cartIconEvent();
renderReviewHTML();

/*function cartButton() {
  document.querySelectorAll('.js-minus-2').forEach((minus) => {

    minus.addEventListener('click', () => {

      console.log('yes');

      let itemId = minus.dataset.itemId;
      let ct;

      if(document.querySelector(`.js-count-${itemId}-1`))
      {
        ct = Number(document.querySelector(`.js-count-${itemId}-1`).innerHTML);
      }

      if(ct>0)
      { 
        ct--;

        html = '';

        if(ct == 0)
        {
          renderTotalHTML(itemId);
        }
        else
        {
          document.querySelector(`.js-count-${itemId}-1`).innerHTML = ct;
        }
      }

      document.querySelector(`.js-count-${itemId}`).innerHTML = ct;

    });

  });

  document.querySelectorAll('.js-plus-2').forEach((plus) => {

    plus.addEventListener('click', () => {

      let itemId = plus.dataset.itemId;
      let ct;

      if(document.querySelector(`.js-count-${itemId}`))
      {
        ct = Number(document.querySelector(`.js-count-${itemId}`).innerHTML);
      }

      ct++;
      
      document.querySelector(`.js-count-${itemId}-1`).innerHTML = ct;

      document.querySelector(`.js-count-${itemId}`).innerHTML = ct;

    });
  
  });
}*/

/*function renderTotalHTML(itemId) {

  let html = '';

  document.querySelectorAll('.js-item-1').forEach((pt) => {

    if(food && pt)
    {
      food.forEach((fd) => {

        if(pt.dataset.itemId != itemId && fd.item_id == pt.dataset.itemId)
        {
          html += `
                  <div class="item-1 js-item-1" data-item-id="${itemId}">
                    <img src="${fd.source}">
                    <div class="item-1-1">
                      <p class="item-1-1-p">${fd.name}</p>
                      <div class="item-1-1-1">
                        <p>Rs. ${fd.price}</p>
                        <div class="add-to-cart-1">
                          
                          <div class="add-to-cart-count js-count-${fd.item_id}-1">${returnCount(pt.dataset.itemId)}</div>
                          
                        </div>
                      </div>
                    </div>
                  </div>`;
        }

      });
    }

  });

  document.querySelector('.js-food-main-item-2-2-start').innerHTML = html;
}

function returnCount(itemId) {

  if(document.querySelector(`.js-count-${itemId}-1`))
  {
    return document.querySelector(`.js-count-${itemId}-1`).innerHTML;
  }
}*/

//cartButton();

/*<h1>Burrito</h1>
          <div class="food-main-item-1">

            <div class="item-1-container">
              <div class="item-1-container-1">
                <h1>Spicy Gigantic Burrito</h1>
                <p class="item-1-container-1-p1">Rs. 550</p>
                <p class="item-1-container-1-p2">A warm tortilla wrapped around a mouthwatering medley of crispy</p>
              </div>
              <diV class="item-1-container-2">
                <img src="Images/Food_Item_Images/Spicy_burrito.jpg">
              </diV>
            </div>

            <div class="item-1-container">
              <div class="item-1-container-1">
                <h1>Spicy Gigantic Burrito</h1>
                <p class="item-1-container-1-p1">Rs. 550</p>
                <p class="item-1-container-1-p2">A warm tortilla wrapped around a mouthwatering medley of crispy</p>
              </div>
              <diV class="item-1-container-2">
                <img src="Images/Food_Item_Images/Spicy_burrito.jpg">
              </diV>
            </div>

            <div class="item-1-container">
              <div class="item-1-container-1">
                <h1>Spicy Gigantic Burrito</h1>
                <p class="item-1-container-1-p1">Rs. 550</p>
                <p class="item-1-container-1-p2">A warm tortilla wrapped around a mouthwatering medley of crispy</p>
              </div>
              <diV class="item-1-container-2">
                <img src="Images/Food_Item_Images/Spicy_burrito.jpg">
              </diV>
            </div>

            <div class="item-1-container">
              <div class="item-1-container-1">
                <h1>Spicy Gigantic Burrito</h1>
                <p class="item-1-container-1-p1">Rs. 550</p>
                <p class="item-1-container-1-p2">A warm tortilla wrapped around a mouthwatering medley of crispy</p>
              </div>
              <diV class="item-1-container-2">
                <img src="Images/Food_Item_Images/Spicy_burrito.jpg">
              </diV>
            </div>
 
          </div>
          <h1>Burgers</h1>
          <div class="food-main-item-1">

            <div class="item-1-container">
              <div class="item-1-container-1">
                <h1>Spicy Gigantic Burrito</h1>
                <p class="item-1-container-1-p1">Rs. 550</p>
                <p class="item-1-container-1-p2">A warm tortilla wrapped around a mouthwatering medley of crispy</p>
              </div>
              <diV class="item-1-container-2">
                <img src="Images/Food_Item_Images/Spicy_burrito.jpg">
              </diV>
            </div>

            <div class="item-1-container">
              <div class="item-1-container-1">
                <h1>Spicy Gigantic Burrito</h1>
                <p class="item-1-container-1-p1">Rs. 550</p>
                <p class="item-1-container-1-p2">A warm tortilla wrapped around a mouthwatering medley of crispy</p>
              </div>
              <diV class="item-1-container-2">
                <img src="Images/Food_Item_Images/Spicy_burrito.jpg">
              </diV>
            </div>

            <div class="item-1-container">
              <div class="item-1-container-1">
                <h1>Spicy Gigantic Burrito</h1>
                <p class="item-1-container-1-p1">Rs. 550</p>
                <p class="item-1-container-1-p2">A warm tortilla wrapped around a mouthwatering medley of crispy</p>
              </div>
              <diV class="item-1-container-2">
                <img src="Images/Food_Item_Images/Spicy_burrito.jpg">
              </diV>
            </div>

            <div class="item-1-container">
              <div class="item-1-container-1">
                <h1>Spicy Gigantic Burrito</h1>
                <p class="item-1-container-1-p1">Rs. 550</p>
                <p class="item-1-container-1-p2">A warm tortilla wrapped around a mouthwatering medley of crispy</p>
              </div>
              <diV class="item-1-container-2">
                <img src="Images/Food_Item_Images/Spicy_burrito.jpg">
              </diV>
            </div>
 
          </div>*/

//<div class="add-to-cart-minus js-minus-2" data-item-id="${fd.item_id}">-</div>
//<div class="add-to-cart-plus js-plus-2" data-item-id="${fd.item_id}">+</div>