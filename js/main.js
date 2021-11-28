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
  { name: "Pineapples", price: { large: 60, medium: 50, small: 40 } },
  { name: "mozzarella", price: { large: 80, medium: 60, small: 40 } },
];

function Order(size, toppings, crust, quantity) {
  this.size = size;
  this.toppings = toppings;
  this.crust = crust;
  this.quantity = quantity;
  this.total;
  this.basePrice;
  this.toppingsTotal = 0;
  this.crustTotal=0;
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
  console.log(pizzaPrices.length);
  for (i = 0; i < pizzaPrices.length; i++) {
    if (pizzaPrices[i].size === this.size) {
      this.basePrice = pizzaPrices[i].price;
      break;
    } else {
      this.basePrice = 0;
    }
  }
  this.total = (this.basePrice + this.toppingsTotal + this.crustTotal) * this.quantity;
  console.log(this.total);
  return this.total;
};
Order.prototype.getToppingsTotal = function () {
  console.log(typeof this.toppings);
  if (this.toppings.length < 1) {
    console.log("no toppings found");
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
    console.log(totalPrice);
    return totalPrice;
  }
  console.log(this.toppings);
};

Order.prototype.getCrustTotal=function(){
let crustPrice=0;
for(i=0;i<crustPrices.length;i++){
  if(crustPrices[i].name===this.crust){
    crustPrice=crustPrices[i].price[this.size];
  }
}
console.log(crustPrice);
this.crustTotal=crustPrice;
return crustPrice;
}
let cart = [];
let orderItem;

//dom ready
$(() => {
  $("header").height($(window).height());
  //display price values
  $("#large-price").text(pizzaPrices[0].price);
  $("#medium-price").text(pizzaPrices[1].price);
  $("#small-price").text(pizzaPrices[2].price);

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
    // console.log(activeToppingPrices);
    let toppingsCheckboxes = $(".toppings-check");

    // console.log(toppingsPricesSpans);
    for (i = 0; i < toppingsCheckboxes.length; i++) {
      toppingsId = toppingsCheckboxes[i].id;
      priceSpanId = "#" + toppingsId + "-price";
      $(priceSpanId).text(activeToppingPrices[i]);
      // toppingsPrice=toppingsPrice[]
      // toppingsCheckboxes[i].text = activeToppingPrices[i];
    }
  };

  // display crust prices
  let toggleCrustPrices = (checked) => {
    let activeSize = checked[0].value;
    let activeCrustPrices = getCrustPrices(activeSize);
    console.log(activeCrustPrices);
    for (i = 0; i < 3; i++) {
      crustInputId = $("[name=crustradio]");
      console.log(crustInputId);
      console.log(crustInputId[i].id);
      crustPriceSpanId = "#" + crustInputId[i].id + "-price";
      console.log(crustPriceSpanId);
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
    orderItem.updateQuantity(quantity);
    orderItem.getTotal();
    $("#total").text(orderItem.getTotal());
    console.log(quantity);
  });
  //Reduce quantity

  $("#minus").on("click", () => {
    let quantityInput = $("#qty");
    let quantity = parseInt(quantityInput.val());
    if (quantity > 0) {
      quantity -= 1;
      quantityInput.val(quantity);
      console.log(quantity);
    } else {
      return;
    }
  });

  //Receive form input

  $("#form-order").submit((e) => {
    e.preventDefault();
    //get toppings selection
    let toppings = $(".toppings-check:checked");
    let crust = $("[name=crustradio]:checked").val();
    let size = $("[name=sizeradio]:checked").val();
    toppingsSelection = getCheckboxValues(toppings);
    console.log(toppingsSelection);
    console.log(crust);
    console.log(size);
  });
  let orderItemCount = 0;
  $("#order-now").on("click", () => {
    orderItemCount += 1;
    orderItem = new Order("large", ["pepperoni", "chicken-bbq"], "crispy", 1);
    console.log(orderItem);
    console.log(orderItem.getTotal());
    orderItem.getToppingsTotal();
    orderItem.getCrustTotal();
    //set the total button value
    $("#total").text(orderItem.getTotal());
  });

  //update the price per the number of pizzas
  $("#qty").on("change",()=>{
    console.log($("#qty").text());
  });

});
