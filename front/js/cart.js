let basketParse = JSON.parse(localStorage.getItem("basket"));
let basket = window.localStorage.basket;
// Presence du panier dans le local Storage ? //
console.log(basket);
function showBasket() {
  if (basket) {
    basketParse;
  } else {
    let titleCart = document.querySelector("h1");

    titleCart.textContent += " est vide !";
    console.log(titleCart);
  }
}

showBasket();
/*let basket = [];
if ((basketGet = null)) {
  let titleCart = document.querySelector("h1");
  //console.log(titleCart);
  titleCart.textcontent = "Votre panier est vide !";
  console.log(basketGet);
} else {
  basketParse;
  return basketParse;
}
//}

/*async function createBasketCart() {
  await showBasket();
  if (basket) {
    for (let i = 0; i < basket.length; i++) {
      await fetch("http://localhost:3000/api/products/" + basket[i].idUrl)
        .then(res => res.json())
        .then(article => {
          // creation de l'article //
          let cartItem = document.getElementById("cart__items");
          let cartArticle = document.createElement("article");
          cartItem.appendChild(cartArticle);
          cartArticle.className = "cart__item";
          cartArticle.setAttribute("data-id", basket[i].idUrl);
          cartArticle.setAttribute("data-color", basket[i].color);

          // création image //
          let imgCreate = document.createElement("img");
          let productImg = document.createElement("div");
          cartArticle.appendChild(productImg);
          productImg.className = "cart__item__img";
          productImg.appendChild(imgCreate);
          //imgCreate.setAttribute("src", basket[i].img);
        });
    }
  }
}
*/
//showBasket();
//console.log(showBasket());
