const id = new URL(window.location.href).searchParams.get("id");
console.log(id);

const orderId = document.getElementById("orderId");
orderId.textContent = id;

console.log(window.location);
