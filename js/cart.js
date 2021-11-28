$(()=>{

  $('header').height($(document).height());
  // console.log(cart);
  const shoppingCart=JSON.parse(localStorage.getItem("cart"));
  // const shoppingCart=localStorage.getItem("cart");
  $('#items-count').text(shoppingCart.length);
  console.log(shoppingCart);
  console.log(shoppingCart.length);
  let singleCartItem;
  for(i=0;i<shoppingCart.length;i++){
    singleCartItem=`
    <div class="item row d-flex justify-content-start">
                <div class="col-lg-2 mx-lg-5 col-sm-3" id="item-index">1</div>
                <div class="col-lg-5 col-sm-6">
                  <div class="title">
                    <p id="item-name">Pepperoni Pizza</p>
                    <ul id="toppings-list">
                      <li>Mushrooms</li>
                      <li>Pineapples</li>
                    </ul>
                  </div>
                </div>
                <div class="col-lg-2 col-sm-12">
                  <h3 class="" id="item-total">Ksh 1310</h3>
                </div>
              </div>
    `
    $('.cart-body').append(singleCartItem);
  }
})
