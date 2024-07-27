document.addEventListener('DOMContentLoaded', function () {
    fetch('games.json')
        .then(response => response.json())
        .then(data => {
            const gameList = document.getElementById('game-list');

            data.forEach(game => {
                const gameElement = document.createElement('div');
                gameElement.className = 'game';

                gameElement.innerHTML = `
                    <img src="${game.cover}" alt="${game.name} Cover">
                    <h2>${game.name}</h2>
                    <p>${game.description}</p>
                    <p class="id">ID: ${game.id}</p>
                `;

                gameList.appendChild(gameElement);
            });
        })
        .catch(error => {
            console.error('Fehler beim Abrufen der Spieldaten:', error);
        });
});
