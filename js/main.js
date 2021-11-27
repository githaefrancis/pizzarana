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

let crustPrices = [];

function Order(size, toppings, crust) {
  this.size = size;
  this.toppings = toppings;
  this.crust = crust;
}

//dom ready
$(() => {
  $("header").height($(window).height());
});
