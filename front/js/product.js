const productLocation = window.location.search.split("?").join("");
console.log(productLocation);
let productId = [];

const fetchProduct = async () => {
    await fetch(`http://localhost:3000/api/products/${productLocation}`).then((res) =>
    res.json(),
    ).then((promise) => {
        console.log(promise);
    })
};

fetchProduct();