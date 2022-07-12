//Recupération id via le produit de l'URL //

const fetchArticle = async () => {
  let aricle = [];
  const idUrl = new URL(window.location.href).searchParams.get("id");

  await fetch("http://localhost:3000/api/products/" + idUrl)
    .then(res => res.json())
    .then(data => (article = data))
    .then(aricle => {
      // élement du DOM que l'on va utiliser //
      let imgSelect = document.querySelector(".item__img");
      let titleSelect = document.querySelector("#title");
      let priceSelect = document.querySelector("#price");
      let descriptionSelect = document.querySelector("#description");
      let colorSelect = document.querySelector("#colors");
      let imgCreate = document.createElement("img");

      // Image de l'article //
      imgSelect.appendChild(imgCreate);
      imgCreate.setAttribute("src", aricle.imageUrl);
      imgCreate.setAttribute("alt", aricle.altTxt);

      // Nom du produit //
      titleSelect.textContent = aricle.name;
      // Prix du produit //
      priceSelect.textContent = aricle.price;
      // Description produit //
      descriptionSelect.textContent = aricle.description;
      // Couleur de l'article //
      for (let i = 0; i < article.colors.length; i++) {
        let colorOption = document.createElement("option");
        colorOption.setAttribute("value", article.colors[i]);
        colorSelect.appendChild(colorOption);
        colorOption.textContent = article.colors[i];
      }
    });

  console.log(article);
  console.table(article);
};

fetchArticle();
