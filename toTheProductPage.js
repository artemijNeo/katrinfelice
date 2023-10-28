const products = document.querySelectorAll(".product-item")

let url

for (let i = 0; i < products.length; i++) {
    products[i].addEventListener("click", (event) => {
        url = event.target.getAttribute("id")
        let target = event.target
        while (!url) {
            target = target.parentNode
            url = target.getAttribute("id")
        }
        window.location.href= "http://localhost/index2page.html?"+url
    }) 
}