let basketKey = window.localStorage.basket;
const idUrl = new URL(window.location.href).searchParams.get("id");

// Presence du panier dans le local Storage + appel de l'api ? //
function showBasket() {
  if (basketKey) {
    fetch("http://localhost:3000/api/products")
      .then(res => res.json())
      .then(objetProduits => {
        getBasket(objetProduits);
        console.log(objetProduits);
      })
      .catch(err => {
        console.log(err);
      });
  } else {
    let titleCart = document.querySelector("h1");
    titleCart.textContent += " est vide !";
    console.log(titleCart);
  }
}

function getBasket(index) {
  let basket = JSON.parse(localStorage.getItem("basket"));
  if (basket.length != 0) {
    for (let choice of basket) {
      console.log(choice);
      for (let i = 0, h = index.length; i < h; i++) {
        if (choice.idUrl === index[i]._id) {
          // création et ajout de valeurs à panier qui vont servir pour les valeurs dataset
          choice.name = index[i].name;
          choice.price = index[i].price;
          choice.image = index[i].imageUrl;
          choice.description = index[i].description;
          choice.alt = index[i].altTxt;
          // creation de l'id article //
          let cartItem = document.getElementById("cart__items");
          let cartArticle = document.createElement("article");
          cartItem.appendChild(cartArticle);
          cartArticle.className = "cart__item";
          cartArticle.setAttribute("data-id", choice.idUrl);
          cartArticle.setAttribute("data-color", choice.color);
          // création image //
          let imgCreate = document.createElement("img");
          let div = document.createElement("div");
          cartArticle.appendChild(div);
          div.className = "cart__item__img";
          div.appendChild(imgCreate);
          imgCreate.setAttribute("src", choice.image);
          imgCreate.setAttribute("alt", choice.alt);
          // création du content de l'article //
          let h2Content = document.createElement("h2");
          let colorContent = document.createElement("p");
          let cartContent = document.querySelector(".cart__item__content");
          div;
          (div.setAttribute = "class"), cart__item__content;
          div.appendChild(h2Content).textContent = choice.name;
          div.appendChild(colorContent).textContent = choice.color;
          div.appendChild(colorContent).textContent = choice.price;
        }
      }
    }
  }
}

showBasket();
/*async function createBasketCart() {
  await showBasket();
  if (basket) {
    for (let i = 0; i < basket.length; i++) {
      await fetch("http://localhost:3000/api/products/" + basket[i].idUrl)
        .then(res => res.json())
        .then(article => {
        

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
