document.addEventListener("DOMContentLoaded", () => {
    const cardsList = document.getElementById("cards-list");
    const cardDetails = document.getElementById("card-details");
    const searchInput = document.createElement("input");
    const heading = document.querySelector(".container h1");
    const container = document.querySelector('.container');

    searchInput.type = "text";
    searchInput.id = "search-input";
    searchInput.placeholder = "Enter card name";
    heading.insertAdjacentElement("afterend", searchInput);

    // Fetch запрос для получения названий всех карточек
    async function fetchCards() {
        try {
            const response = await fetch("https://api.gwent.one/?key=data&version=1.0.0.15&response=json&language=en");
            const data = await response.json();
            const cards = Object.values(data.response);
    
            function renderCards(filteredCards) {
                cardsList.innerHTML = "";
                filteredCards.forEach((card) => {
                    const listItem = document.createElement("li");
                    listItem.textContent = card.name;
                    listItem.addEventListener("click", () => fetchCardDetails(card.id.card));
                    cardsList.appendChild(listItem);
                });
            }
    
            renderCards(cards);
    
            searchInput.addEventListener("input", () => {
                const query = searchInput.value.toLowerCase();
                const filtered = cards.filter((card) => card.name.toLowerCase().includes(query));
                renderCards(filtered);
            });
    
        } catch (error) {
            console.error("Ошибка при загрузке списка карт:", error);
        }
    }

    // Fetch запрос для получения информации про конкретную карточку по её id
    async function fetchCardDetails(cardId) {
        try {
            const response = await fetch(`https://api.gwent.one/?key=data&version=1.0.0.15&response=json&language=en&id=${cardId}`);
            const data = await response.json();
            const card = data.response[0];

            showCardDetails(card);
        } catch (error) {
            console.error("Ошибка при загрузке подробностей карты:", error);
        }
    }

    function showCardDetails(card) {
        const attrs = card.attributes;
        const artId = card.id.art;
        const artUrl = `https://gwent.one/image/gwent/assets/card/art/medium/${artId}.jpg`;

        cardDetails.innerHTML = `
        <h2 class="card-name">${card.name}</h2>
            <div class="card-detail-container">
                <div class="card-detail-image">
                    <img src="${artUrl}" alt="${card.name}" />
                </div>
                <div class="card-detail-info">
                    <div class="card-info-block">   
                        <h3><img src="https://gwent.one/img/icon/search/set/base.png" alt="category icon" width=50px> Category</h3>
                        <p>${card.category}</p>
                        <h3><img src="https://gwent.one/img/icon/search/faction/nilfgaard.png" alt="ability icon" width=50px> Ability</h3>
                        <p>${card.ability || "—"}</p>
                        <h3><img src="https://gwent.one/img/icon/search/set/thronebreaker.png" alt="flavor icon" width=50px> Flavor</h3>
                        <p><em>${card.flavor || "—"}</em></p>
                    </div>
                    <div class="card-info-block">
                        <h3><img src="https://gwent.one/img/icon/search/type/special.png" alt="type icon" width=50px> Type</h3>
                        <p>${attrs.type}</p>
                        <h3><img src="https://gwent.one/img/icon/search/faction/monster.png" alt="faction icon" width=50px> Faction</h3>
                        <p>${attrs.faction}</p>
                        ${attrs.factionSecondary ? `<h3>Доп. фракция</h3><p>${attrs.factionSecondary}</p>` : ""}
                        <h3><img src="https://gwent.one/img/icon/search/set/master_mirror.png" alt="color icon" width=50px> Color</h3>
                        <p>${attrs.color}</p>
                        <h3><img src="https://gwent.one/img/icon/search/type/stratagem.png" alt="set icon" width=50px> Set</h3>
                        <p>${attrs.set}</p>
                        <h3><img src="https://gwent.one/img/icon/search/rarity/legendary.png" alt="rarity icon" width=50px> Rarity</h3>
                        <p>${attrs.rarity}</p>
                        <h3><img src="https://gwent.one/img/icon/search/faction/northern_realms.png" alt="artist icon" width=50px> Artist</h3>
                        <p>${attrs.artist}</p>
                    </div>
                    <div class="card-info-block">
                        <h3><img src="https://gwent.one/img/icon/search/set/iron_judgment.png" alt="power icon" width=50px> Power</h3>
                        <p>${attrs.power}</p>
                        <h3><img src="https://gwent.one/img/icon/search/type/unit.png" alt="armor icon" width=50px> Armor</h3>
                        <p>${attrs.armor}</p>
                        <h3><img src="https://gwent.one/img/icon/search/type/artifact.png" alt="provision icon" width=50px> Provision</h3>
                        <p>${attrs.provision}</p>
                    </div>
                </div>
            </div>
        `;

        cardDetails.style.display = "flex";
        container.scrollTop = 0;
        container.scrollTo({
            top: cardDetails.offsetTop - 300,
            behavior: 'smooth'
        });
    }

    fetchCards();
});
