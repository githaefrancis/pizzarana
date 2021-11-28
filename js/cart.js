$(() => {
  // $('header').height($(document).height());
  // console.log(cart);
  const shoppingCart = JSON.parse(localStorage.getItem("cart"));
  // const shoppingCart=localStorage.getItem("cart");
  $("#items-count").text(shoppingCart.length);
  console.log(shoppingCart);
  console.log(shoppingCart.length);
  // let singleCartItem;
  for (i = 0; i < shoppingCart.length; i++) {
    console.log(shoppingCart.length);
    // console.log(i);
    $(".cart-body").append(`
    <div class="item row d-flex justify-content-start">
                <div class="col-lg-2 mx-lg-5 col-sm-3" id="item-index">${i+1}</div>
                <div class="col-lg-5 col-sm-6">
                  <div class="title">
                    <p id="item-name">Pepperoni Pizza</p>
                    <p>Size: <span class="badge bg-dark">large </span> Qty: <span class="badge bg-dark">1</span> Crust: <span class="badge bg-dark">Crispy</span></p>
                    <p class="fw-bold"><em>Toppings</em></p>
                    <ul id="toppings-list">
                      <li>Mushrooms</li>
                      <li>Pineapples</li>
                    </ul>
                  </div>
                </div>
                <div class="col-lg-2 col-sm-12">
                  <h2 class="badge bg-dark fs-4" id="item-total">Ksh 1310</h2>
                </div>
              </div>
    `);
    // $(".cart-body").append(singleCartItem);
  }
});
