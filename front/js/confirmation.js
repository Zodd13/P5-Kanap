showOrderId = () => {
    const queryString  = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const orderId = urlParams.get("orderId")
    const targetOrderId = document.querySelector('#orderId')
    targetOrderId.textContent = `${orderId}`
}

showOrderId();

deleteLocalStorage = () => {
    const targetLocalStorage = window.localStorage;
    targetLocalStorage.clear();
}

deleteLocalStorage();