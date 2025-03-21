let errorList = {};

async function loadErrors() {
    try {
        const response = await fetch('https://theerrorexe.dev/api/wiimart/errors.txt');
        const text = await response.text();
        parseErrors(text);
    } catch (error) {
        console.error("Error loading WiiMart error codes:", error);
    }
}

function parseErrors(text) {
    text.split('\n').forEach(line => {
        const match = line.match(/^([\dXx\-]+):\s*(.+)$/);
        if (match) errorList[match[1].trim()] = match[2].trim();
    });
}

function matchErrorCode(inputCode) {
    let results = [];
    for (let pattern in errorList) {
        let regex = new RegExp(`^${pattern.replace(/[Xx]/g, '\\d')}$`);
        if (regex.test(inputCode)) {
            results.push(`${pattern}: ${errorList[pattern]}`);
        }
    }
    return results;
}

function searchError() {
    const input = document.getElementById('errorCode').value.trim();
    if (!input) return;

    let results = matchErrorCode(input);
    let resultElement = document.getElementById('result');

    if (results.length === 0) {
        resultElement.innerText = "No matching error found!";
    } else if (results.length === 1) {
        resultElement.innerText = `Result: ${results[0]}`;
    } else {
        resultElement.innerText = results.join('\n');
    }
}

function showSuggestions(value) {
    const suggestionBox = document.getElementById("suggestions");
    suggestionBox.innerHTML = "";

    if (!value) return;

    let results = matchErrorCode(value);

    results.forEach(code => {
        const listItem = document.createElement("li");
        listItem.textContent = code;
        listItem.onclick = () => {
            document.getElementById("errorCode").value = code.split(":")[0];
            suggestionBox.innerHTML = "";
        };
        suggestionBox.appendChild(listItem);
    });
}

loadErrors();
