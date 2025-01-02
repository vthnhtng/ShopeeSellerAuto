const selectProductButton = document.getElementById("select-product-button");
const deactivateProductButton = document.getElementById("deactivate-product-button");

selectProductButton.addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTab = tabs[0].id;

        chrome.scripting.executeScript({
            target: { tabId: activeTab },
            files: ["select-product.js"]
        }, () => {
            chrome.tabs.sendMessage(activeTab, { action: "getProductInfo" }, (response) => {
                const productInfo = document.querySelector(".selected-product .product-info");
                if (response) {
                    if (response.success) {
                        const productCard = document.createElement("div");
                        productCard.classList.add("product-card");
                            
                        const productImage = document.createElement("img");
                        productImage.src = response.productInfo.productImageSrc;
                        productImage.alt = response.productInfo.productName;
                        
                        const productName = document.createElement("h3");
                        productName.textContent = response.productInfo.productName;
                        
                        const productCode = document.createElement("p");
                        productCode.textContent = response.productInfo.productCode;
                        
                        productCard.appendChild(productImage);
                        productCard.appendChild(productName);
                        productCard.appendChild(productCode);
                        
                        productInfo.innerHTML = "";
                        productInfo.appendChild(productCard);
                    } else {
                        productInfo.innerHTML = response.message;
                    }
                } else {
                    productInfo.innerHTML = "Unable to fetch product details";
                }
            });
        });
    });
});

deactivateProductButton.addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTab = tabs[0].id;

        // Get the value of the input field
        const quantityThreshold = document.querySelector('#quantity-threshold').value;

        console.log("Quantity Threshold:", quantityThreshold);
        
        chrome.scripting.executeScript({
            target: { tabId: activeTab },
            files: ["deactivate-products.js"]
        }, () => {
            chrome.tabs.sendMessage(
                activeTab,
                {
                    action: "deactivateProducts",
                    quantityThreshold: quantityThreshold
                },
                (response) => {
                    if (response) {
                        console.log("Response received:", response);
                    } else {
                        console.error("No response received or an error occurred.");
                    }
                }
            );
        });
    });
});
