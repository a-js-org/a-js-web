if (window._defaultAObjectName==undefined) {
	import("./a.js")
}

function copyCode(button, codeId) {
    const code = document.getElementById(codeId).innerText;
    navigator.clipboard.writeText(code).then(() => {
        button.textContent = "Copied!";
        setTimeout(() => (button.textContent = "Copy"), 2000);
    });
}