$(() => {

  const shoppingCart = JSON.parse(localStorage.getItem("cart"));
  

  //Get total price of the cart
  const getGrandTotal = () => {
    let grandTotal = 0;
    for (i = 0; i < shoppingCart.length; i++) {
      grandTotal += shoppingCart[i].total;  
    }
  
      return grandTotal;
  };
  //Display toppings
  let getToppings = (toppings) => {
    let li="";
    if(toppings.length>0){
    for (k = 0; k < toppings.length; k++) {
      li += `<li class="d-inline-block px-1">${toppings[k]}</li>`;
    }}
    else{
      li+=`<li class="d-inline-block px-1">No Toppings</li>`;
    }
    return li;
  };
  // let singleCartItem;
  if (shoppingCart !== null) {
    $("#items-count").text(shoppingCart.length);

    for (i = 0; i < shoppingCart.length; i++) {
      
      $(".cart-body").append(`
    <div class="item row d-flex justify-content-start mt-5">
                <div class="col-lg-2 mx-lg-5 col-sm-3" id="item-index">${
                  i + 1
                }</div>
                <div class="col-lg-5 col-sm-6">
                  <div class="title">
                    <p id="item-name">${shoppingCart[i].flavor}</p>
                    <p>Size: <span class="badge bg-dark">${
                      shoppingCart[i].size
                    } </span> Qty: <span class="badge bg-dark">${
        shoppingCart[i].quantity
      }</span> Crust: <span class="badge bg-dark">${
        shoppingCart[i].crust
      }</span></p>
                    <p class="fw-bold"><em>Toppings</em></p>
                    <ul id="toppings-list" type="square">
                      ${getToppings(shoppingCart[i].toppings)}
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
      <div class="row d-flex justify-content-start align-items-end py-2">
        <div class="col-lg-7 mx-lg-5">
          <h2>Sub-Total</h2>
        </div>
        <div class="col-lg-2">
          <span 
            ><h3 id="sub-total" class="badge bg-dark fs-4">Ksh ${getGrandTotal()}</h3></span
          >
        </div>
      </div>
      <div class="row d-flex justify-content-start">
        <div class="col-lg-2 mx-lg-5 col-sm-2">
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

        <!--delivery location-->
        <div class="col-lg-5">
          <h3 id="display-location" class="delivery-cost d-none">
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
        <!--delivery location-->
        <div class="col-lg-2">
          <span class="delivery-cost d-none "
            ><h2 class="badge bg-dark fs-4">Ksh 150</h2></span
          >
        </div>
      </div>

      <!--Total -->
      <div class="row d-flex justify-content-start align-items-end py-2">
        <div class="col-lg-7 mx-lg-5">
          <h2>Total</h2>
        </div>
        <div class="col-lg-2">
          <span 
            ><h3 id="grand-total" class="badge bg-dark fs-4">Ksh ${getGrandTotal()}</h3></span
          >
        </div>
      </div>
      <!--Total -->
      <div class="place-order d-flex justify-content-around">
      <button
          class="btn btn-secondary btn-sm align-self-center"
          id="clear"
        >
          Clear Cart
        </button>
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
    if (deliveryToggle.length > 0) {
      deliveryLocation = prompt("Please provide the delivery location");
      $(".delivery-cost").removeClass("d-none");
      $("#location").text(deliveryLocation);
      $("#display-location").removeClass("d-none");
      $("#grand-total").text(`Ksh ${getGrandTotal() + 150}`);
    } else {
      $(".delivery-cost").addClass("d-none");
      $("#grand-total").text(`Ksh ${getGrandTotal()}`);
    }
  });

  $("#place-order").on("click", () => {
    if (confirm("Please confirm that you want to place the order now")) {
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

  //clear cart
  $("#clear").on("click", () => {
    localStorage.removeItem("cart");
    location.reload();
  });
});
