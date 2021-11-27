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

//dom ready
$(() => {
  $("header").height($(window).height());
});
