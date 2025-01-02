chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "deactivateProducts" && request.quantityThreshold) {
        const tableBody = document.querySelector(".eds-react-table-container .eds-react-table-tbody");
        const allRows = tableBody.querySelectorAll(".eds-react-table-expanded-row.eds-react-table-expanded-row-level-1");
        const lastProducts = allRows[allRows.length - 1].querySelector(".eds-react-table-tbody").querySelectorAll("tr");

        lastProducts.forEach(product => {
            const attributes = product.querySelectorAll("td");

            if (Number(attributes[5].querySelector("div").textContent) < request.quantityThreshold) {
                attributes[7].querySelector(".eds-react-switch.eds-react-switch--open").click();
            }
        });

        sendResponse({ success: true });
    }
});
