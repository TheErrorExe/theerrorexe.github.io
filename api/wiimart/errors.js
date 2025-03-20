/*
(c) 2025. TheErrorExe

This Javascript Code is for WiiMart (https://wiimart.github.io)

TheErrorExe: https://theerrorexe.dev/

*/

    let errorList = {};

    async function loadErrors() {
        const response = await fetch('https://theerrorexe.dev/api/wiimart/errors.txt');
        const text = await response.text();
        parseErrors(text);
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
                results.push(errorList[pattern]);
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

    loadErrors();
