import { cart } from "./food.js";
import { Restaurants } from "./home.js";
// import { Users } from "./index.js";

let Users = JSON.parse(localStorage.getItem('user')) || [];

function renderPayment() {
  let html = '';

  const url = new URL(window.location.href);
  const rest_id = url.searchParams.get('resid');
  const us_id = url.searchParams.get('userid');
  let cost = 0;

  Restaurants.forEach((rest) => {

    if(rest.restaurant_id == rest_id)
    {
      document.querySelector('.js-main-2-p').innerHTML = rest.name;
    }

  });

  cart.forEach((carts) => {

    if(carts.restaurant_id == rest_id)
    {
      html += `
        <div>
          <p>${carts.quantity} x ${carts.name}</p>
          <p>Rs. ${convertToString(carts.quantity*carts.price)}</p>
        </div>
      `;

      cost += carts.quantity*carts.price;

      // if(document.querySelector('.js-main-2-div-1'))
      // {
      //   document.querySelector('.js-main-2-div-1').innerHTML = html;
      // }
    }

  });

  if (document.querySelector('.js-main-2-div-1')) {
    document.querySelector('.js-main-2-div-1').innerHTML = html;
  }

  if(document.querySelector('.js-subtotal'))
  {
    document.querySelector('.js-subtotal').innerHTML = convertToString(cost);
  }

  cost += 224+15;

  if(document.querySelector('.js-Total'))
  {
    document.querySelector('.js-Total').innerHTML = convertToString(cost);
  }

  let htmm = '';

  Users.forEach((user) => {

    if(us_id == user.id)
    {
      htmm = `<p class="Name">${user.name}</p>
              <p class="Email">${user.email}</p>
              <p class="Phone">${user.phone}</p>
              `;
    }

  });

  if(document.querySelector('.js-payment-review-main-1-detail-1'))
  {
    document.querySelector('.js-payment-review-main-1-detail-1').innerHTML = htmm;
  }

  renderAddresses(us_id);

  setupAddressSaving(us_id);

  const placeOrderBtn = document.querySelector('.Place-Order');
  if (placeOrderBtn) {
    placeOrderBtn.addEventListener('click', () => {
      let orders = JSON.parse(localStorage.getItem('orders')) || [];

      orders.push({
        order_id: crypto.randomUUID(),
        user_id: us_id,
        restaurant_id: rest_id,
        items: cart.filter(c => c.restaurant_id == rest_id && c.user_id == us_id),
        subtotal: cost,
        // total,
        date: new Date().toISOString(),
        address: JSON.parse(localStorage.getItem("selectedAddress")) || null
      });

      localStorage.setItem('orders', JSON.stringify(orders));

      const newCart = cart.filter(c => !(c.restaurant_id == rest_id && c.user_id == us_id));
      localStorage.setItem('carts', JSON.stringify(newCart));

      // Redirect to order history
      window.location.href = `order-history.html?userid=${us_id}`;
    });
  }
}

function applyVoucher(code, total) {
  if (code === "DISCOUNT10") {
    return total * 0.9; // 10% off
  }
  return total;
}

// function initMap() {
  
//   let location = {lat: -25.363, lng: 131.044};
//   let map = new google.maps.Map(document.getElementById('map'), {
//     zoom: 4,
//     center: location
//   });
// }

function initMap() {
  // Default location (Karachi)
  const location = { lat: 24.8607, lng: 67.0011 };

  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 14,
    center: location,
  });

  // Add a marker
  const marker = new google.maps.Marker({
    position: location,
    map: map,
    draggable: true, // allow user to drag marker
    title: "Delivery Location",
  });

  // Save marker position when moved
  google.maps.event.addListener(marker, 'dragend', function(event) {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    localStorage.setItem("selectedLocation", JSON.stringify({ lat, lng }));
    alert(`Location saved: ${lat}, ${lng}`);
  });
}


function convertToString(num) {

  let str = num.toString();

  let newStr = '';
  let count = 1;

  for(let i=str.length-1;i>-1;i--)
  {
    if(count%4 === 0)
    {
      newStr += ',';
    }

    count++;
    
    newStr += str[i];
  }

  const ReverseStr = newStr.split('').reverse().join('');
  
  return ReverseStr;
}

function renderAddresses(userId) {

  let addresses = JSON.parse(localStorage.getItem("addresses")) || [];
  let userAddresses = addresses.filter(a => a.user_id === userId);

  let html = "";
  userAddresses.forEach((addr, index) => {
    html += `
      <div class="saved-address js-select-address" data-index="${index}">
        <p><strong>${addr.street}</strong>, Floor: ${addr.floor}</p>
        <p>${addr.note}</p>
      </div>
    `;
  });

  const container = document.querySelector(".js-saved-addresses");
  if (container) {
    container.innerHTML = html || "<p>No saved addresses yet</p>";
  }

  // Allow selecting an address
  document.querySelectorAll(".js-select-address").forEach(div => {
    div.addEventListener("click", () => {

      document.querySelectorAll(".saved-address").forEach(d => d.classList.remove("selected"));
      
      div.classList.add("selected");

      let index = div.dataset.index;
      let selected = userAddresses[index];
      localStorage.setItem("selectedAddress", JSON.stringify(selected));
      alert(`Selected address: ${selected.street}, Floor ${selected.floor}`);
    });
  });
}

function setupAddressSaving(userId) {
  const saveBtn = document.querySelector(".js-save-address");
  if (saveBtn) {
    saveBtn.addEventListener("click", () => {
      const street = document.querySelector(".js-street").value;
      const floor = document.querySelector(".js-floor").value;
      const note = document.querySelector(".js-note").value;

      if (!street) {
        alert("Street is required");
        return;
      }

      let addresses = JSON.parse(localStorage.getItem("addresses")) || [];
      addresses.push({ user_id: userId, street, floor, note });

      localStorage.setItem("addresses", JSON.stringify(addresses));
      renderAddresses(userId);
    });
  }
}

renderPayment();