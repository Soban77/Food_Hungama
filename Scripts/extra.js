const orderHistoryIcon = document.querySelector(".js-home-order-history");
if (orderHistoryIcon) {
  orderHistoryIcon.addEventListener("click", () => {
    const url = new URL(window.location.href);
    const userId = url.searchParams.get("id");
    window.location.href = `order-history.html?userid=${userId}`;
  });
}