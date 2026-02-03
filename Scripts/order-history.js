import { Restaurants } from "./home.js";

function renderOrders() {
  const url = new URL(window.location.href);
  const userId = url.searchParams.get("userid");

  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  let userOrders = orders.filter(o => o.user_id === userId);

  const container = document.querySelector(".js-orders-container");

  if (userOrders.length === 0) {
    container.innerHTML = "<p>No orders yet.</p>";
    return;
  }

  let html = "";
  userOrders.forEach(order => {
    const restaurant = Restaurants.find(r => r.restaurant_id == order.restaurant_id);

    let itemsHTML = "";
    order.items.forEach(item => {
      itemsHTML += `
        <div>
          <p>${item.quantity} x ${item.name}</p>
          <p>Rs. ${item.price * item.quantity}</p>
        </div>
      `;
    });

    html += `
      <div class="order-card">
        <div class="order-header">
          <h2>${restaurant ? restaurant.name : "Unknown Restaurant"}</h2>
          <p>${new Date(order.date).toLocaleString()}</p>
        </div>
        <div class="order-items">${itemsHTML}</div>
        <div class="order-total">
          <p>Total</p>
          <p>Rs. ${order.subtotal}</p>
        </div>
        <div class="order-address">
          <p>Delivery Address: ${order.address ? order.address.street : "N/A"}, 
          Floor: ${order.address ? order.address.floor : ""}, 
          Note: ${order.address ? order.address.note : ""}</p>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

renderOrders();