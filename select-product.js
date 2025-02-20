chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getProductInfo") {
        const tableBody = document.querySelector(".eds-react-table-container .eds-react-table-tbody");
        const allRows = tableBody.querySelectorAll(".src-ESP-components-DetailTableForm---editableTableRow--3bJpN");
        const lastProductInfo = allRows[0].querySelectorAll("td")[1];

        if (lastProductInfo) {
            lastProductInfo.scrollIntoView();

            sendResponse({
                success: true,
                productInfo: {
                    productName: lastProductInfo.querySelector(".ellipsis-content.single").textContent,
                    productImageSrc: lastProductInfo.querySelector(".eds-react-avatar img").src,
                    productCode: lastProductInfo.querySelector(".src-ESP-components-DetailTableForm-components-ItemInfoCell---itemId--GgAP1").textContent
                }
            });
        } else {
            sendResponse({ success: false, message: "No product found" });
        }
    }
});
