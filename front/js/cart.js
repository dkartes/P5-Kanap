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
  }
}
function saveBasket(basket) {
  localStorage.setItem("basket", JSON.stringify(basket));
}

async function getBasket(index) {
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
          let div2 = document.createElement("div");
          let div3 = document.createElement("div");
          let h2Content = document.createElement("h2");
          let colorContent = document.createElement("p");
          let priceContent = document.createElement("p");
          let cartContent = document.querySelector(".cart__item__content");
          cartArticle.appendChild(div2);
          div2.className = "cart__item__content";
          div2.appendChild(div3);
          div3.className = "cart__item__content__description";
          div3.appendChild(h2Content).textContent = choice.name;
          div3.appendChild(colorContent).textContent = choice.color;
          div3.appendChild(priceContent).textContent = choice.price + " €";

          // création des settings //
          let div4 = document.createElement("div");
          let div5 = document.createElement("div");
          let qtyContent = document.createElement("p");
          let inputContent = document.createElement("input");

          div2.appendChild(div4);
          div4.className = "cart__item__content__settings";
          div4.appendChild(div5);
          div5.className = "cart__item__content__settings__quantity";
          div5.appendChild(qtyContent);
          div5.appendChild(inputContent);
          inputContent.setAttribute("type", "number");
          inputContent.className = "itemQuantity";
          inputContent.setAttribute("name", "itemQuantity");
          inputContent.setAttribute("min", "1");
          inputContent.setAttribute("max", "100");
          inputContent.setAttribute("value", choice.quantity);

          // creation de la partie delete //
          let div6 = document.createElement("div");
          let deleteItem = document.createElement("p");
          div4.appendChild(div6);
          div6.className = "cart__item__content__settings__delete";
          div6.appendChild(deleteItem).textContent = "Supprimer";
          deleteItem.className = "deleteItem";
          // evenement au clic sur le boutton supprimer //
          deleteItem.addEventListener("click", e => {
            e.preventDefault;
            // enregistre id et couleur par le boutton supprimer //
            basket = basket.filter(
              p => p.idUrl != choice.idUrl || p.color != choice.color
            );
            // sauvegarde dans le panier du localStorage //
            alert("votre article a été supprimé du panier");
            saveBasket(basket);
            // refresh de la page //
            location.reload();
          });

          // création de la case cart__price //
          let cartPrice = document.querySelector(".cart__price");
          let totalQtyContent = document.getElementById("totalQuantity");
          let getTotalClassQty =
            document.getElementsByClassName("itemQuantity");
          let lengthTotalQty = getTotalClassQty.length;
          let total = 0;
          //console.log(lengthTotalQty);

          // application du bouton supprimer //
          // remobreFromBasket (choice);

          /*cartPrice.appendChild(totalQtyContent);
          for (let i = 0; i < lengthTotalQty; i++) {
            total += lengthTotalQty[i].valueAsNumber;
          }

          totalQtyContent.textContent = total;
*/
          //console.log(total);
        }
      }
    }
  }
}

showBasket();
