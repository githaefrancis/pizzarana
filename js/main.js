// define variables

const pizzaPrices = [
  { size: "large", price: 1000 },
  { size: "medium", price: 800 },
  { size: "small", price: 550 },
];

const crustPrices = [
  { name: "crispy", price: { large: 150, medium: 120, small: 100 } },
  { name: "stuffed", price: { large: 180, medium: 150, small: 120 } },
  { name: "gluten-free", price: { large: 100, medium: 80, small: 65 } },
];

const toppingPrices = [
  { name: "pepperoni", price: { large: 60, medium: 50, small: 40 } },
  { name: "chicken-bbq", price: { large: 100, medium: 80, small: 60 } },
  { name: "cheese", price: { large: 60, medium: 50, small: 40 } },
  { name: "pineapples", price: { large: 60, medium: 50, small: 40 } },
  { name: "mozzarella", price: { large: 80, medium: 60, small: 40 } },
];

function Order(flavor, size, toppings, crust, quantity) {
  this.size = size;
  this.toppings = toppings;
  this.crust = crust;
  this.quantity = quantity;
  this.total;
  this.basePrice;
  this.toppingsTotal = 0;
  this.crustTotal = 0;
  this.flavor = flavor;
}

//method to update the size of pizza
Order.prototype.updateSize = function (newSize) {
  this.size = newSize;
  return this.size;
};
//update toppings array
Order.prototype.updateToppings = function (newToppings) {
  this.toppings = newToppings;
  return this.toppings;
};
Order.prototype.updateQuantity = function (newQuantity) {
  this.quantity = newQuantity;
  return this.quantity;
};
Order.prototype.updateCrust = function (newCrust) {
  this.crust = newCrust;
  return this.crust;
};

Order.prototype.getTotal = function () {
  this.getToppingsTotal();
  this.getCrustTotal();
  for (i = 0; i < pizzaPrices.length; i++) {
    if (pizzaPrices[i].size === this.size) {
      this.basePrice = pizzaPrices[i].price;
      break;
    } else {
      this.basePrice = 0;
    }
  }
  this.total =
    (this.basePrice + this.toppingsTotal + this.crustTotal) * this.quantity;
  return this.total;
};
Order.prototype.getToppingsTotal = function () {
  if (this.toppings.length < 1) {
    console.log("no toppings found");
    this.toppingsTotal=0;
    return 0;
  } else {
    totalPrice = 0;
    for (i = 0; i < this.toppings.length; i++) {
      for (j = 0; j < toppingPrices.length; j++) {
        if (toppingPrices[j].name === this.toppings[i]) {
          totalPrice += toppingPrices[j].price[this.size];
          break;
        }
      }
    }
    this.toppingsTotal = totalPrice;
    // this.getTotal();
    
    return totalPrice;
  }
  
};

Order.prototype.getCrustTotal = function () {
  let crustPrice = 0;
  for (i = 0; i < crustPrices.length; i++) {
    if (crustPrices[i].name === this.crust) {
      crustPrice = crustPrices[i].price[this.size];
    }
  }
  
  this.crustTotal = crustPrice;
  return crustPrice;
};
let cart = [];
// let orderItem;
let orderItem = [];

//dom ready
$(() => {
  $("header").height($(window).height());
  //display price values
  $("#large-price").text(pizzaPrices[0].price);
  $("#medium-price").text(pizzaPrices[1].price);
  $("#small-price").text(pizzaPrices[2].price);

  let shoppingCart = JSON.parse(localStorage.getItem("cart"));
  
  if (shoppingCart !== null) {
    $("#items-count").text(shoppingCart.length);
    $("#items-count-mobile").text(shoppingCart.length);
    $("#items-count-button").text(shoppingCart.length);
  } else {
    $("#items-count").text(0);
    $("#items-count-mobile").text(0);
    $("#items-count-button").text(0);
  }
  //get toppings prices
  let getToppingsPrices = (size) => {
    let toppingPricesPerSize = toppingPrices.map((item) => {
      return item.price[size];
    });
    return toppingPricesPerSize;
  };

  //get crust prices
  let getCrustPrices = (size) => {
    let crustPricesPerSize = crustPrices.map((item) => {
      return item.price[size];
    });
    return crustPricesPerSize;
  };
  // display toppings prices

  let toggleToppingPrices = (checked) => {
    let activeSize = checked[0].value;
    let activeToppingPrices = getToppingsPrices(activeSize);
    let toppingsCheckboxes = $(".toppings-check");

    
    for (i = 0; i < toppingsCheckboxes.length; i++) {
      toppingsId = toppingsCheckboxes[i].id;
      priceSpanId = "#" + toppingsId + "-price";
      $(priceSpanId).text(activeToppingPrices[i]);
    
    }
  };

  // display crust prices
  let toggleCrustPrices = (checked) => {
    let activeSize = checked[0].value;
    let activeCrustPrices = getCrustPrices(activeSize);
    
    for (i = 0; i < 3; i++) {
      crustInputId = $("[name=crustradio]");
      crustPriceSpanId = "#" + crustInputId[i].id + "-price";
      $(crustPriceSpanId).text(activeCrustPrices[i]);
    }
  };
  // set default toppings prices
  toggleToppingPrices($("[name=sizeradio]"));

  //set default crust prices
  toggleCrustPrices($("[name=sizeradio]"));
  //event listener for size toggle
  $("[name=sizeradio]").on("change", () => {
    let activeSize = $("[name=sizeradio]:checked");
    toggleToppingPrices(activeSize);
    toggleCrustPrices(activeSize);
    orderItem[orderItem.length - 1].updateSize(activeSize[0].value);
    orderItem[orderItem.length - 1].getTotal();
    $("#total").text(orderItem[orderItem.length - 1].getTotal());
  });

  //event listener for change in crust type
  $("[name=crustradio]").on("change", () => {
    let activeCrust = $("[name=crustradio]:checked");
    orderItem[orderItem.length - 1].updateCrust(activeCrust[0].value);
    orderItem[orderItem.length - 1].getTotal();
    $("#total").text(orderItem[orderItem.length - 1].getTotal());
  });
  //get checkbox values
  const getCheckboxValues = (selectedCheckboxes) => {
    let valueArray = [];
    for (i = 0; i < selectedCheckboxes.length; i++) {
      valueArray.push(selectedCheckboxes[i].value);
    }
    return valueArray;
  };

  //Increase the quantity
  $("#add").on("click", () => {
    let quantityInput = $("#qty");
    let quantity = parseInt(quantityInput.val()) + 1;
    quantityInput.val(quantity);
    orderItem[orderItem.length - 1].updateQuantity(quantity);
    orderItem[orderItem.length - 1].getTotal();
    $("#total").text(orderItem[orderItem.length - 1].getTotal());
    
  });
  //Reduce quantity

  $("#minus").on("click", () => {
    let quantityInput = $("#qty");
    let quantity = parseInt(quantityInput.val());
    if (quantity > 0) {
      quantity -= 1;
      quantityInput.val(quantity);
      
      orderItem[orderItem.length - 1].updateQuantity(quantity);
      orderItem[orderItem.length - 1].getTotal();
      $("#total").text(orderItem[orderItem.length - 1].getTotal());
      
    } else {
      return;
    }
  });

  let getLocalStorageState = () => {
    shoppingCart = JSON.parse(localStorage.getItem("cart"));
    
    if (shoppingCart !== null) {
      return shoppingCart;
    } else return [];
  };
  //Receive form input
  $("#form-order").on("submit", (e) => {
    e.preventDefault();
    newCart = getLocalStorageState();
    newCart.push(orderItem[orderItem.length - 1]);
    
    
    cart = newCart;

    $("#items-count").text(cart.length);
    $("#items-count-mobile").text(cart.length);
    $("#items-count-button").text(cart.length);
    //add to cart array
    localStorage.setItem("cart", JSON.stringify(cart));
    $("#order-modal").modal("hide");
    alert("Item added successfully to cart");
    
  });
  //listen for changes in topping checkboxes
  $(".toppings-check").on("change", (e) => {
    //get toppings selection
    let toppings = $(".toppings-check:checked");
    let crust = $("[name=crustradio]:checked").val();
    let size = $("[name=sizeradio]:checked").val();
    toppingsSelection = getCheckboxValues(toppings);
    orderItem[orderItem.length - 1].updateToppings(toppingsSelection);
    $("#total").text(orderItem[orderItem.length - 1].getTotal());

  });

  let selectedPizza;
  $("#order-now").on("click", () => {
    selectedPizza = localStorage.getItem("activePizza");
    $("#order-modal-title").text(selectedPizza);
    orderItem.push(
      new Order(
        selectedPizza,
        "large",
        [],
        "crispy",
        1
      )
    );

    orderItem[orderItem.length - 1].getToppingsTotal();
    orderItem[orderItem.length - 1].getCrustTotal();
    //set the total button value
    $("#total").text(orderItem[orderItem.length - 1].getTotal());
  });

  //update the price per the number of pizzas
  $("#qty").on("change", () => {
    
  });

  
});
