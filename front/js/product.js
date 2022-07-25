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
  addToCart.addEventListener("click", basketChoice);
};

////////////////////// PANIER ///////////////////

function basketChoice() {
  let colorChoice = document.getElementById("colors");
  let quantityChoice = document.getElementById("quantity");

  //nos objets iront dans client choice//
  let clientChoice = {};
  clientChoice.idUrl = idUrl;
  let colorValue = colorChoice.value;
  let quantityValue = quantityChoice.value;

  //Regex//
  if (
    quantityChoice.value > 0 &&
    quantityChoice.value <= 100 &&
    colorChoice.value != 0
  ) {
    // Choix du client //
    clientChoice.color = colorValue;
    clientChoice.quantity = quantityValue;
    console.log(clientChoice);

    /// Cas ou kanap identique et couleur identique ///

    // création du panier //

    let basket = JSON.parse(localStorage.getItem("basket"));
    // si le panier existe déjà //
    if (basket) {
      // s'il y a déjà un produit avec l'ID et la couleur sélectionnée //
      for (let choice of basket) {
        if (choice.idUrl === idUrl && choice.color === colorValue) {
          let additionQty = parseInt(choice.quantity) + parseInt(quantityValue);
          choice.quantity = JSON.stringify(additionQty);
          return (localStorage.basket = JSON.stringify(basket));
        }
      }
      // ajout du nouveau produit dans le panier ou modif de la quantité si produit déjà identique avec meme couleur //
      basket.push(clientChoice);
      localStorage.setItem("basket", JSON.stringify(basket));
      // si le panier n'existe pas //
    } else {
      basket = [];
      basket.push(clientChoice);
      localStorage.setItem("basket", JSON.stringify(basket));
    }
  } else {
    alert("Veuillez saisir une couleur ET un nombre de canapé entre 1 et 100");
  }
}

fetchArticle();
