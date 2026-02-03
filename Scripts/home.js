export let Restaurants = [{
  restaurant_id: 1,
  owner_id: 2,
  name: 'Kababjees Fried Chicken',
  address: 'Falak Residency, Bathisland',
  phone: 3362509438,
  opening_hours: '7am-8pm',
  rating: 4.5,
  source: 'Images/Restaurants_Images/Kababjees-Fried-Chicken.jpg'
},
{
  restaurant_id: 2,
  owner_id: 7,
  name: 'Red Apple',
  address: 'Falak Residency, Bathisland',
  phone: 3343509438,
  opening_hours: '11am-11pm',
  rating: 4.0,
  source: 'Images/Restaurants_Images/Red-Apple.jpg'
},
{
  restaurant_id: 3,
  owner_id: 8,
  name: 'Broadway Pizza',
  address: 'Clifton',
  phone: 3381234567,
  opening_hours: '12pm-2am',
  rating: 4.9,
  source: 'Images/Restaurants_Images/broadway.webp'
},
{
  restaurant_id: 4,
  owner_id: 9,
  name: 'Broadway Pizza',
  address: 'Clifton',
  phone: 3381234567,
  opening_hours: '12pm-2am',
  rating: 4.9,
  source: 'Images/Restaurants_Images/broadway.webp'
}];

function homeRenderHTML() {
  let html = '';
  let count = 0;

  Restaurants.forEach((restaurant) => {

    html += `<div class="home-main-restaurants-part1 js-restaurants-part1" data-res-id="${restaurant.restaurant_id}">
          <img src="${restaurant.source}">
          <div class="home-main-restaurants-part2">
            <p class="home-main-restaurants-part2-1">${restaurant.name}</p>
            <div class="home-main-restaurants-part2-2">
              <img src="Images/Rating-Star.png">
              <p>${restaurant.rating}</p>
            </div>
          </div>
          <div class="home-main-restaurants-part3">
            <img src="Images/Delivery-bike.jpg">
            <p>Rs.140</p>
          </div>
        </div>`;

    count++;

  });

  if(document.querySelector('.js-home-main-restaurants'))
  {
    document.querySelector('.js-home-main-restaurants').innerHTML = html;
  }

  if(document.querySelector('.js-no-restaurants'))
  {
    document.querySelector('.js-no-restaurants').innerHTML = count;
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

  document.querySelectorAll('.js-restaurants-part1').forEach((resd) => {

    resd.addEventListener('click', () => {

      let url = new URL(window.location.href);
      let id = url.searchParams.get('id');

      const RId = resd.dataset.resId;
      
      window.location.href = `food.html?userid=${id}&resid=${RId}`; 

    });

  });

  // let search_img = document.querySelector('.js-search-img');
  
  // if(search_img)
  // {
  //   search_img.addEventListener('click', () => {

  //     let searched = document.querySelector('.js-home-search-input').value;

  //     let html = '';
  //     let count = 0;

  //     Restaurants.forEach((restaurant) => {

  //       if(restaurant.name.includes(searched))
  //       {
  //         html +=  `<div class="home-main-restaurants-part1 js-restaurants-part1" data-res-id="${restaurant.restaurant_id}">
  //                     <img src="${restaurant.source}">
  //                     <div class="home-main-restaurants-part2">
  //                       <p class="home-main-restaurants-part2-1">${restaurant.name}</p>
  //                       <div class="home-main-restaurants-part2-2">
  //                         <img src="Images/Rating-Star.png">
  //                         <p>${restaurant.rating}</p>
  //                       </div>
  //                     </div>
  //                     <div class="home-main-restaurants-part3">
  //                       <img src="Images/Delivery-bike.jpg">
  //                       <p>Rs.140</p>
  //                     </div>
  //                   </div>`;

  //         count++;
  //       }

  //     });

  //     document.querySelector('.js-home-main-restaurants').innerHTML = html;

  //     document.querySelector('.js-no-restaurants').innerHTML = count;

  //   });
  // }

}

function searching() {

  let search_img = document.querySelector('.js-search-img');
  
  if(search_img)
  {
    search_img.addEventListener('click', () => {

      let searched = document.querySelector('.js-home-search-input').value.toLowerCase();

      let html = '';
      let count = 0;

      Restaurants.forEach((restaurant) => {

        if(restaurant.name.toLowerCase().includes(searched))
        {
          html +=  `<div class="home-main-restaurants-part1 js-restaurants-part1-1" data-res-id="${restaurant.restaurant_id}">
                      <img src="${restaurant.source}">
                      <div class="home-main-restaurants-part2">
                        <p class="home-main-restaurants-part2-1">${restaurant.name}</p>
                        <div class="home-main-restaurants-part2-2">
                          <img src="Images/Rating-Star.png">
                          <p>${restaurant.rating}</p>
                        </div>
                      </div>
                      <div class="home-main-restaurants-part3">
                        <img src="Images/Delivery-bike.jpg">
                        <p>Rs.140</p>
                      </div>
                    </div>`;

          count++;
        }

      });

      document.querySelector('.js-home-main-restaurants').innerHTML = html;

      document.querySelector('.js-no-restaurants').innerHTML = count;

      document.querySelectorAll('.js-restaurants-part1-1').forEach((resd) => {

        resd.addEventListener('click', () => {

          let url = new URL(window.location.href);
          let id = url.searchParams.get('id');

          const RId = resd.dataset.resId;
          
          window.location.href = `food.html?userid=${id}&resid=${RId}`; 

        });
      });
    });
  }  
}

searching();
homeRenderHTML();