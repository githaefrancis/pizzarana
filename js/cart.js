$(()=>{

  $('header').height($(document).height());
  // console.log(cart);
  const shoppingCart=JSON.parse(localStorage.getItem("cart"));
  console.log(shoppingCart);
})