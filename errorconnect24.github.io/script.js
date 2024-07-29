const serverUrl = 'http://theerrorexe.duckdns.org:12345'; // Update with your server URL

function logOutput(message) {
    const output = document.getElementById('output-text');
    output.textContent += message + '\n';
}

async function register() {
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;

    try {
        const response = await fetch(`${serverUrl}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json();
        logOutput(`Register: ${JSON.stringify(data)}`);
    } catch (error) {
        logOutput(`Register Error: ${error}`);
    }
}

async function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    try {
        const response = await fetch(`${serverUrl}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json();
        logOutput(`Login: ${JSON.stringify(data)}`);
    } catch (error) {
        logOutput(`Login Error: ${error}`);
    }
}

async function matchmaking() {
    const token = document.getElementById('matchmaking-token').value;
    const gameId = document.getElementById('matchmaking-game').value;

    try {
        const response = await fetch(`${serverUrl}/matchmaking`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token, game_id: gameId })
        });
        const data = await response.json();
        logOutput(`Matchmaking: ${JSON.stringify(data)}`);
    } catch (error) {
        logOutput(`Matchmaking Error: ${error}`);
    }
}

async function getGameInfo() {
    const token = document.getElementById('game-info-token').value;
    const gameId = document.getElementById('game-info-game').value;

    try {
        const response = await fetch(`${serverUrl}/game_info`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token, game_id: gameId })
        });
        const data = await response.json();
        logOutput(`Game Info: ${JSON.stringify(data)}`);
    } catch (error) {
        logOutput(`Game Info Error: ${error}`);
    }
}
