$(() => {
  // $('header').height($(document).height());
  // console.log(cart);
  const shoppingCart = JSON.parse(localStorage.getItem("cart"));
  // const shoppingCart=localStorage.getItem("cart");

  console.log(shoppingCart);
  console.log(shoppingCart);

  //Get total price of the cart
  const getGrandTotal=()=>{
    let grandTotal=0;
    for (i = 0; i < shoppingCart.length; i++) {
    grandTotal+=shoppingCart[i].total;
    console.log(grandTotal);
    return grandTotal;
    }
  }
  // let singleCartItem;
  if (shoppingCart !== null) {
    $("#items-count").text(shoppingCart.length);
    
    for (i = 0; i < shoppingCart.length; i++) {
      console.log(shoppingCart.length);
      // console.log(i);
      $(".cart-body").append(`
    <div class="item row d-flex justify-content-start mt-5">
                <div class="col-lg-2 mx-lg-5 col-sm-3" id="item-index">${
                  i + 1
                }</div>
                <div class="col-lg-5 col-sm-6">
                  <div class="title">
                    <p id="item-name">Pepperoni Pizza</p>
                    <p>Size: <span class="badge bg-dark">${
                      shoppingCart[i].size
                    } </span> Qty: <span class="badge bg-dark">${
        shoppingCart[i].quantity
      }</span> Crust: <span class="badge bg-dark">${
        shoppingCart[i].crust
      }</span></p>
                    <p class="fw-bold"><em>Toppings</em></p>
                    <ul id="toppings-list" type="square">
                      <li class="d-inline-block px-1">Mushrooms</li>
                      <li class="d-inline-block px-1">Pineapples</li>
                    </ul>
                  </div>
                </div>
                <div class="col-lg-2 col-sm-12">
                  <h2 class="badge bg-dark fs-4" id="item-total">Ksh ${
                    shoppingCart[i].total
                  }</h2>
                </div>
              </div>
              <hr class="mx-lg-5 mx-sm-1" />
    `);
    }
    $(".cart-body").append(`<div class="cart-totals">
  <div class="card">
    <div class="card-title">
      <div class="row d-flex justify-content-start align-items-end">
        <div class="col-lg-7 mx-lg-5">
          <h2>Sub-Total</h2>
        </div>
        <div class="col-lg-2">
          <span class="badge bg-dark"
            ><h3 id="grand-total">Ksh ${getGrandTotal()}</h3></span
          >
        </div>
      </div>
      <div class="row d-flex justify-content-start">
        <div class="col-lg-7 mx-lg-5 col-sm-2">
          <h2>
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                role="switch"
                id="delivery"
                name="delivery"
              />
              <label
                class="form-check-label"
                id="delivery"
                for="delivery"
                >Delivery</label
              >
            </div>
          </h2>
        </div>
        <div class="col-lg-2">
          <span class="delivery-cost d-none badge bg-dark"
            ><h3>Ksh 150</h3></span
          >
          <h3 id="display-location" class="d-none">
            <i
              class="fa fa-map-marker text-success"
              aria-hidden="true"
            ></i>
            <span
              id="location"
              class="fst-italic badge bg-success"
            ></span>
          </h3>
        </div>
      </div>
      <div class="place-order d-flex justify-content-center">
        <button
          class="btn btn-success btn-sm align-self-center"
          id="place-order"
        >
          Place Order
        </button>
      </div>
    </div>
  </div>
</div>`);
  } else {
    $(".cart-body").append("Your cart seems empty. Get some Pizza");
  }

  let deliveryLocation;
  $("[name=delivery]").on("change", () => {
    let deliveryToggle = $("[name=delivery]:checked");
    // console.log(this);
    if (deliveryToggle.length > 0) {
      deliveryLocation = prompt("Please provide the delivery location");
      $(".delivery-cost").removeClass("d-none");
      $("#location").text(deliveryLocation);
      $("#display-location").removeClass("d-none");
    } else {
      $(".delivery-cost").addClass("d-none");
      $("#delivery-display").addClass("d-none");
    }
  });

  $("#place-order").on("click", () => {
    if (confirm("Please confirm that you want to place the order now")) {
      // console.log("Hooray, we have a new order guys");
      if (deliveryLocation) {
        alert(
          `Congratulations!Your order has been placed. It will be delivered to ${deliveryLocation}`
        );
      } else {
        alert(
          `Congratulations!Your order has been placed successfully.Thank you`
        );
      }
      localStorage.removeItem("cart");
      location.reload();
    } else {
      return;
    }
  });
});
