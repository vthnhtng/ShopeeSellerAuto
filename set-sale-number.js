chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "setSaleNumber") {
        const tableBody = document.querySelector(".eds-react-table-container .eds-react-table-tbody");
        const allRows = tableBody.querySelectorAll(".eds-react-table-expanded-row.eds-react-table-expanded-row-level-1");
        const lastProducts = allRows[0].querySelector(".eds-react-table-tbody").querySelectorAll("tr");

        lastProducts.forEach(product => {
            const attributes = product.querySelectorAll("td");
            
            if (!attributes[3].querySelector(".eds-react-input__inner.eds-react-input__inner--normal").classList.contains("disabled")) {
                var quantity = Number(attributes[5].querySelector("div").textContent);
                var input = attributes[3].querySelector("input");
                var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
                var saleNumber = 0;
                if (quantity >= 20) {
                    saleNumber = 20;
                } else if (quantity >= 15 && quantity < 20) {
                    saleNumber = 15;
                } else if (quantity >= 10 && quantity < 15) {
                    saleNumber = 10;
                } else if (quantity >= 5 && quantity < 10) {
                    saleNumber = 5;
                } else if (quantity == 4) {
                    saleNumber = 4;
                }

                nativeInputValueSetter.call(input, saleNumber);
                var ev2 = new Event('input', { bubbles: true});
                input.dispatchEvent(ev2);
            }
        });
    }
});
