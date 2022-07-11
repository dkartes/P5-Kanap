/* Recupération de la liste via l'API */

// Liste de la forme sous tableau des produit obtenus via l'API //
let kanap = [];
// Praticité //
let section = document.querySelector(".items");

// Récupération de la liste des objets de l'API //
const fetchKanap = async () => {
  await fetch("http://localhost:3000/api/products/")
    .then(res => res.json())
    .then(data => (kanap = data));
  console.log(kanap);
  console.table(kanap);
  kanapDisplay(kanap);
};

// Création des articles //

function kanapDisplay() {
  for (let i = 0; i < kanap.length; i++) {
    //Création de l'élément "a" //
    let itemLink = document.createElement("a");
    section.appendChild(itemLink);
    itemLink.href = `product.html?id=${kanap[i]._id}`;

    // création de l'élément "article" //
    let itemArticle = document.createElement("article");
    itemLink.appendChild(itemArticle);

    // création de l'élément "image" //
    let itemImg = document.createElement("img");
    itemArticle.appendChild(itemImg);
    itemImg.src = kanap[i].imageUrl;
    itemImg.alt = kanap[i].altTxt;

    // création de l'élément "h3" //
    let itemName = document.createElement("h3");
    itemArticle.appendChild(itemName);
    itemName.classList.add("productName");
    itemName.textContent = kanap[i].name;

    // création de l'élément "p" //
    let itemDescription = document.createElement("p");
    itemArticle.appendChild(itemDescription);
    itemDescription.classList.add("productDescription");
    itemDescription.textContent = kanap[i].description;
  }
}

fetchKanap();
