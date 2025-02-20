chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "setProductPrices" && request.productPrice) {
        const tableBody = document.querySelector(".eds-react-table-container .eds-react-table-tbody");
        const allRows = tableBody.querySelectorAll(".eds-react-table-expanded-row.eds-react-table-expanded-row-level-1");
        const lastProducts = allRows[0].querySelector(".eds-react-table-tbody").querySelectorAll("tr");

        lastProducts.forEach(product => {
            const attributes = product.querySelectorAll("td");
            
            if (!product.querySelectorAll("td")[1].querySelector(".eds-react-input__inner.eds-react-input__inner--normal").classList.contains("disabled")) {
                var input = product.querySelectorAll("td")[1].querySelector("input");
                var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
                nativeInputValueSetter.call(input, request.productPrice);

                var ev2 = new Event('input', { bubbles: true});
                input.dispatchEvent(ev2);
            }
        });
    }
});
