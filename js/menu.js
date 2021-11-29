$(()=>{
  let activePizza="Chicken-BBQ Pizza";
  localStorage.setItem("activePizza",activePizza.toString())
  function updateActivePizza(active){
    localStorage.setItem("activePizza",active.toString())
  }
  $("#menu-carousel").on("slide.bs.carousel",()=>{
    console.log("slid again");
    activeFlavour=($(".carousel-item.active").attr("id"));
    if(activeFlavour=="chicken-p"){
      $("#pizzaFlavour").text("Chicken-BBQ")
      updateActivePizza("Chicken-BBQ Pizza");
    }
    else if(activeFlavour=="pepperoni-p"){
      $("#pizzaFlavour").text("Pepperoni");
      updateActivePizza("Pepperoni Pizza")
    }
    else if(activeFlavour=="cheese-p"){
      $("#pizzaFlavour").text("Cheese");
      updateActivePizza("Cheese Pizza");
    }
    console.log(localStorage.getItem("activePizza"));
  })
})