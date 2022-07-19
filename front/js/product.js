//Recupération id via le produit de l'URL //

const idUrl = new URL(window.location.href).searchParams.get("id");

const fetchArticle = async () => {
  let article = [];
  await fetch("http://localhost:3000/api/products/" + idUrl)
    .then(res => res.json())
    .then(data => (article = data))
    .then(article => {
      // élement du DOM que l'on va utiliser //
      let imgSelect = document.querySelector(".item__img");
      let titleSelect = document.querySelector("#title");
      let priceSelect = document.querySelector("#price");
      let descriptionSelect = document.querySelector("#description");
      let colorSelect = document.querySelector("#colors");
      let imgCreate = document.createElement("img");

      // Image de l'article //
      imgSelect.appendChild(imgCreate);
      imgCreate.setAttribute("src", article.imageUrl);
      imgCreate.setAttribute("alt", article.altTxt);

      // Nom du produit //
      titleSelect.textContent = article.name;
      // Prix du produit //
      priceSelect.textContent = article.price;
      // Description produit //
      descriptionSelect.textContent = article.description;
      // Couleur de l'article //
      for (let i = 0; i < article.colors.length; i++) {
        let colorOption = document.createElement("option");
        colorOption.setAttribute("value", article.colors[i]);
        colorSelect.appendChild(colorOption);
        colorOption.textContent = article.colors[i];
      }
    });
  // un click pour le panier //
  addToCart.addEventListener("click", basketTotal);
};

// ajout d'articles au panier //

function basketTotal() {
  let colorChoice = document.getElementById("colors");
  let quantityChoice = document.getElementById("quantity");

  //nos objets iront dans client choice//
  let clientChoice = {};
  clientChoice.idUrl = idUrl;
  console.log(clientChoice);

  let colorValue = colorChoice.value;
  let quantityValue = quantityChoice.value;

  //Regex//

  if (
    quantityChoice.value > 0 &&
    quantityChoice.value <= 100 &&
    colorChoice.value != 0
  ) {
  } else {
    alert("Veuillez saisir une couleur ET un nombre de canapé entre 1 et 100");
  }
  // Choix du client //
  clientChoice.color = colorValue;
  clientChoice.quantity = quantityValue;
  console.log(clientChoice);
  // Local Storage //
  let kanapBasket = JSON.parse(localStorage.getItem("basket"));

  if (kanapBasket == null) {
    kanapBasket = [];
    kanapBasket.push(clientChoice);
    localStorage.setItem("basket", JSON.stringify(kanapBasket));
  }
  console.log(kanapBasket);

  return (localStorage.basketStock = JSON.stringify(clientChoice));
  console.log(basketStock);

  function otherBasketTotal() {
    let temporaryProducts = [];
    let pushedProducts = [];
    temporaryProducts.push(clientChoice);
    //concaténation des tableaux de kanapBasket et temporaryProducts avec le spread selector//
    pushedProducts = [...kanapBasket, ...temporaryProducts];

    return (localStorage.basketStockTotal = JSON.stringify(pushedProducts));
  }
}

fetchArticle();
