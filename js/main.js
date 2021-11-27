// define variables
let pizzaPrices = [
  { size: "large", price: 1000 },
  { size: "medium", price: 800 },
  { size: "small", price: 550 },
];

let crustPrices = [
  { name: "crispy", price: { large: 150, medium: 120, small: 100 } },
  { name: "stuffed", price: { large: 180, medium: 150, small: 120 } },
  { name: "gluten-free", price: { large: 100, medium: 80, small: 65 } },
];

let toppingPrices = [
  { name: "pepperoni", price: { large: 60, medium: 50, small: 40 } },
  { name: "mozzarella", price: { large: 80, medium: 60, small: 40 } },
  { name: "chicken-bbq", price: { large: 100, medium: 80, small: 60 } },
  { name: "cheese", price: { large: 60, medium: 50, small: 40 } },
  { name: "Pineapples", price: { large: 60, medium: 50, small: 40 } },
];

function Order(size, toppings, crust) {
  this.size = size;
  this.toppings = toppings;
  this.crust = crust;
}

//display price values
$("#large-price").text(pizzaPrices[0].price);
$("#medium-price").text(pizzaPrices[0].price);
$("#small-price").text(pizzaPrices[0].price);

//get toppings prices
let getToppingsPrices = (size) => {
  let toppingPricesPerSize = toppingPrices.map((item) => {
    return item.price[size];
  });
  console.log(toppingPricesPerSize);
};

// display toppings prices

let toggleToppingPrices = (checked) => {
  let activeSize = checked[0].value;
  let activeToppingPrices = getToppingsPrices(activeSize);
  let toppingsPricesSpans = $(".toppings-check span span");
  console.log(toppingsPricesSpans);
  for (i = 0; toppingsCheckboxes.length; i++) {
    toppingsId = toppingsCheckboxes[i].id;
    // toppingsPrice=toppingsPrice[]
    toppingsCheckboxes[i].text = activeToppingPrices[i];
  }
};

//event listener for size toggle
$("[name=sizeradio]").on("change", () => {
  console.log("size changed");
  let activeToppings = $("[name=sizeradio]:checked");
  toggleToppingPrices(activeToppings);
});
//get checkbox values
const getCheckboxValues = (selectedCheckboxes) => {
  let valueArray = [];
  for (i = 0; i < selectedCheckboxes.length; i++) {
    valueArray.push(selectedCheckboxes[i].value);
  }
  return valueArray;
};
//Receive form input

$("#form-order").submit((e) => {
  e.preventDefault();
  //get toppings selection
  let toppings = $(".toppings-check:checked");
  let crust = $("[name=crustradio]:checked").val();
  let size = $("[name=sizeradio]:checked").val();
  toppingsSelection = getCheckboxValues(toppings);
  console.log(toppingsSelection);
});
//dom ready
$(() => {
  $("header").height($(window).height());
});
