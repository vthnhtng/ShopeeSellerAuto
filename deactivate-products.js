chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "deactivateProducts" && request.quantityThreshold) {
        try {
            const tableBody = document.querySelector(".eds-react-table-container .eds-react-table-tbody");
            if (!tableBody) throw new Error("Table body not found.");

            const allRows = tableBody.querySelectorAll(".eds-react-table-expanded-row.eds-react-table-expanded-row-level-1");
            if (!allRows || allRows.length === 0) throw new Error("No rows found.");

            const lastProducts = allRows[0].querySelector(".eds-react-table-tbody").querySelectorAll("tr");
            if (!lastProducts || lastProducts.length === 0) throw new Error("No products found in the last row.");

            lastProducts.forEach(product => {
                const attributes = product.querySelectorAll("td");
                if (!attributes || attributes.length < 8) throw new Error("Product attributes are incomplete.");

                const quantity = Number(attributes[5].querySelector("div").textContent);
                if (isNaN(quantity)) throw new Error("Invalid quantity value.");

                if (quantity < request.quantityThreshold) {
                    const deactivateSwitch = attributes[7].querySelector(".eds-react-switch.eds-react-switch--open");
                    if (!deactivateSwitch) throw new Error("Deactivate switch not found.");
                    deactivateSwitch.click();
                }
            });

            sendResponse({ success: true });
        } catch (error) {
            console.error("Error in deactivateProducts:", error.message);
            sendResponse({ success: false, error: error.message });
        }
    }
});
