// 👤 Клас Гравця 
/*
class Player {
    constructor(name) {
        this.name = name;
        this.health = 100;
        this.strength = 20;
        this.level = 1;
        this.potions = 3;
        this.inventory = [];
    }

    // ⚔️ Атака монстра
    attack(monster) {
        const damage = Math.floor(Math.random() * this.strength) + 5;
        monster.health -= damage;
        logMessage(`${this.name} завдав ${damage} шкоди ${monster.type}.`);
    }

    // 💊 Лікування
    heal() {
        if (this.potions > 0) {
            const healAmount = Math.floor(Math.random() * 30) + 20;
            this.health += healAmount;
            this.potions--;
            logMessage(`${this.name} відновив ${healAmount} здоров'я. (Ліків залишилось: ${this.potions})`);
        } else {
            logMessage('❌ У вас немає ліків!');
        }
    }

    // 📊 Підвищення рівня
    levelUp() {
        this.level++;
        this.health += 30;
        this.strength += 10;
        logMessage(`🎉 ${this.name} піднявся на ${this.level} рівень!`);
    }

    // 📦 Додавання предмету
    addItem(item) {
        this.inventory.push(item);
        logMessage(`📦 ${this.name} знайшов предмет: ${item.name}!`);
    }

    // 📜 Використання предмету
    useItem(index) {
        if (index >= 0 && index < this.inventory.length) {
            const item = this.inventory.splice(index, 1)[0];
            if (item.type === 'weapon') {
                this.strength += item.effect;
                logMessage(`⚔️ ${this.name} використовує ${item.name} (+${item.effect} сила)!`);
            } else if (item.type === 'potion') {
                this.health += item.effect;
                logMessage(`💊 ${this.name} випив ${item.name} (+${item.effect} здоров'я)!`);
            } else if (item.type === 'armor') {
                this.health += item.effect;
                logMessage(`🛡️ ${this.name} використовує ${item.name} (+${item.effect} здоров'я)!`);
            }
        } else {
            logMessage('❌ Невірний вибір предмета.');
        }
    }
}

// 👹 Клас Монстра
class Monster {
    constructor(type, health, strength) {
        this.type = type;
        this.health = health;
        this.strength = strength;
    }

    attack(player) {
        const damage = Math.floor(Math.random() * this.strength) + 5;
        player.health -= damage;
        logMessage(`${this.type} завдав ${damage} шкоди ${player.name}.`);
    }
}

// 🧰 Клас Предмета
class Item {
    constructor(name, type, effect) {
        this.name = name;
        this.type = type;
        this.effect = effect;
    }
}

   // 📊 Оновлення здоров'я
   function updateHealthBar(element, currentHealth, maxHealth) {
    element.value = Math.max(0, currentHealth); // Не дозволяємо опуститися нижче 0
    element.max = maxHealth;
}

// 📊 Оновлення інформації про гравця і монстра
function updateUI() {
    document.getElementById('playerName').textContent = `${player.name} (Рівень: ${player.level})`;
    updateHealthBar(document.getElementById('playerHealth'), player.health, player.maxHealth);
    
    document.getElementById('monsterName').textContent = `${currentMonster.type}`;
    updateHealthBar(document.getElementById('monsterHealth'), currentMonster.health, currentMonster.maxHealth);
}


// 📜 Функція логування повідомлень
function logMessage(message) {
    const log = document.getElementById('gameLog');
    log.innerHTML += message + '<br>'; // Додаємо <br> для нового рядка
    log.scrollTop = log.scrollHeight;  // Автопрокрутка до останнього повідомлення
}

// 🎲 Генерація випадкового монстра
function getRandomMonster() {
    const monsters = [
        new Monster('Гоблін', 50, 10),
        new Monster('Велетень', 80, 15),
        new Monster('Дракон', 120, 20)
    ];
    return monsters[Math.floor(Math.random() * monsters.length)];
}

// 🎲 Генерація випадкового предмета
function getRandomItem() {
    const items = [
        new Item('Еліксир життя', 'potion', 50),
        new Item('Меч героя', 'weapon', 15),
        new Item('Захисний щит', 'armor', 20)
    ];
    return items[Math.floor(Math.random() * items.length)];
}

// 🛑 Перевірка завершення гри
function checkGameOver() {
    if (player.health <= 0) {
        logMessage('💀 Гра закінчена. Ви програли!');
        disableButtons();
    }
}

// 🔴 Вимкнути кнопки після завершення гри
function disableButtons() {
    document.getElementById('attackBtn').disabled = true;
    document.getElementById('healBtn').disabled = true;
    document.getElementById('inventoryBtn').disabled = true;
}

// 🕹️ Логіка атаки
document.getElementById('attackBtn').addEventListener('click', () => {
    if (player.health > 0 && currentMonster.health > 0) {
        player.attack(currentMonster);
        if (currentMonster.health <= 0) {
            logMessage(`💀 ${currentMonster.type} переможений!`);
            player.levelUp();
            const item = getRandomItem();
            player.addItem(item);
            currentMonster = getRandomMonster();
            logMessage(`👹 Новий монстр: ${currentMonster.type}!`);
        } else {
            currentMonster.attack(player);
        }
    }
    updateUI();
    checkGameOver();
});

// 💊 Логіка лікування
document.getElementById('healBtn').addEventListener('click', () => {
    player.heal();
    currentMonster.attack(player);
    updateUI();
    checkGameOver();
});

// 📦 Використання інвентаря
document.getElementById('inventoryBtn').addEventListener('click', () => {
    if (player.inventory.length > 0) {
        const itemList = player.inventory.map((item, index) => `${index + 1}: ${item.name}`).join('\n');
        const choice = prompt(`Інвентар:\n${itemList}\nВведіть номер предмета для використання:`);

        const itemIndex = parseInt(choice, 10) - 1;
        if (!isNaN(itemIndex)) {
            player.useItem(itemIndex);
        } else {
            alert('❌ Введіть коректний номер!');
        }
    } else {
        alert('📦 Ваш інвентар порожній!');
    }
    currentMonster.attack(player);
    updateUI();
    checkGameOver();
});

function checkGameOver() {
    if (player.health <= 0) {
        logMessage('💀 Гра закінчена. Ви програли!');
        disableButtons();
    }
}

// 📊 Початок гри
const player = new Player(prompt('Введіть ім\'я гравця:') || 'Герой');
let currentMonster = getRandomMonster();
logMessage(`👤 ${player.name} зустрічає ${currentMonster.type}!`);

*/

// 👤 Player Class
class Player {
    constructor(name) {
        this.name = name;
        this.health = 100;
        this.maxHealth = 100;
        this.strength = 20;
        this.level = 1;
        this.potions = 3;
        this.inventory = [];
    }

    // ⚔️ Attack the monster
    attack(monster) {
        const damage = Math.floor(Math.random() * this.strength) + 5;
        monster.health -= damage;
        logMessage(`${this.name} dealt ${damage} damage to ${monster.type}.`);
    }

    // 💊 Heal
    heal() {
        if (this.potions > 0) {
            const healAmount = Math.floor(Math.random() * 30) + 20;
            this.health = Math.min(this.health + healAmount, this.maxHealth); // Prevent overheal
            this.potions--;
            logMessage(`${this.name} restored ${healAmount} health. (Potions left: ${this.potions})`);
        } else {
            logMessage('❌ No potions left!');
        }
    }

    // 📊 Level Up
    levelUp() {
        this.level++;
        this.maxHealth += 30;
        this.health = this.maxHealth;
        this.strength += 10;
        logMessage(`🎉 ${this.name} leveled up to ${this.level}!`);
    }

    // 📦 Add an item to inventory
    addItem(item) {
        this.inventory.push(item);
        logMessage(`📦 ${this.name} found an item: ${item.name}!`);
    }

    // 📜 Use an item
    useItem(index) {
        if (index >= 0 && index < this.inventory.length) {
            const item = this.inventory.splice(index, 1)[0];
            if (item.type === 'weapon') {
                this.strength += item.effect;
                logMessage(`⚔️ ${this.name} used ${item.name} (+${item.effect} strength)!`);
            } else if (item.type === 'potion') {
                this.health = Math.min(this.health + item.effect, this.maxHealth);
                logMessage(`💊 ${this.name} drank ${item.name} (+${item.effect} health)!`);
            } else if (item.type === 'armor') {
                this.health = Math.min(this.health + item.effect, this.maxHealth);
                logMessage(`🛡️ ${this.name} used ${item.name} (+${item.effect} health)!`);
            }
        } else {
            logMessage('❌ Invalid item choice.');
        }
    }
}

// 👹 Monster Class
class Monster {
    constructor(type, health, strength) {
        this.type = type;
        this.health = health;
        this.maxHealth = health;
        this.strength = strength;
    }

    attack(player) {
        const damage = Math.floor(Math.random() * this.strength) + 5;
        player.health -= damage;
        logMessage(`${this.type} dealt ${damage} damage to ${player.name}.`);
    }
}

// 🧰 Item Class
class Item {
    constructor(name, type, effect) {
        this.name = name;
        this.type = type;
        this.effect = effect;
    }
}

// 📊 Update health bar
function updateHealthBar(element, currentHealth, maxHealth) {
    element.value = Math.max(0, currentHealth);
    element.max = maxHealth;
}

// 📊 Update UI
function updateUI() {
    document.getElementById('playerName').textContent = `${player.name} (Level: ${player.level})`;
    updateHealthBar(document.getElementById('playerHealth'), player.health, player.maxHealth);

    document.getElementById('monsterName').textContent = `${currentMonster.type}`;
    updateHealthBar(document.getElementById('monsterHealth'), currentMonster.health, currentMonster.maxHealth);
}

// 📜 Log messages
function logMessage(message) {
    const log = document.getElementById('gameLog');
    log.innerHTML += message + '<br>'; // Ensuring new lines
    log.scrollTop = log.scrollHeight;
}

// 🎲 Generate a random monster
function getRandomMonster() {
    const monsters = [
        new Monster('Goblin', 50, 10),
        new Monster('Giant', 80, 15),
        new Monster('Dragon', 120, 20)
    ];
    return monsters[Math.floor(Math.random() * monsters.length)];
}

// 🎲 Generate a random item
function getRandomItem() {
    const items = [
        new Item('Life Elixir', 'potion', 50),
        new Item('Hero’s Sword', 'weapon', 15),
        new Item('Shield of Protection', 'armor', 20)
    ];
    return items[Math.floor(Math.random() * items.length)];
}

// 🛑 Check if game is over
function checkGameOver() {
    if (player.health <= 0) {
        logMessage('💀 Game Over. You lost!');
        disableButtons();
    }
}

// 🔴 Disable buttons after game over
function disableButtons() {
    document.getElementById('attackBtn').disabled = true;
    document.getElementById('healBtn').disabled = true;
    document.getElementById('inventoryBtn').disabled = true;
}

// 🕹️ Attack logic
document.getElementById('attackBtn').addEventListener('click', () => {
    if (player.health > 0 && currentMonster.health > 0) {
        player.attack(currentMonster);
        if (currentMonster.health <= 0) {
            logMessage(`💀 ${currentMonster.type} was defeated!`);
            player.levelUp();
            const item = getRandomItem();
            player.addItem(item);
            currentMonster = getRandomMonster();
            logMessage(`👹 A new monster appears: ${currentMonster.type}!`);
        } else {
            currentMonster.attack(player);
        }
    }
    updateUI(); // Ensure health bars update
    checkGameOver();
});

// 💊 Healing logic
document.getElementById('healBtn').addEventListener('click', () => {
    player.heal();
    currentMonster.attack(player);
    updateUI(); // Ensure health bars update
    checkGameOver();
});

// 📦 Inventory usage
document.getElementById('inventoryBtn').addEventListener('click', () => {
    if (player.inventory.length > 0) {
        const itemList = player.inventory.map((item, index) => `${index + 1}: ${item.name}`).join('\n');
        const choice = prompt(`Inventory:\n${itemList}\nEnter item number to use:`);

        const itemIndex = parseInt(choice, 10) - 1;
        if (!isNaN(itemIndex)) {
            player.useItem(itemIndex);
        } else {
            alert('❌ Enter a valid number!');
        }
    } else {
        alert('📦 Your inventory is empty!');
    }
    currentMonster.attack(player);
    updateUI(); // Ensure health bars update
    checkGameOver();
});

// 📊 Start game
const player = new Player(prompt("Enter player's name:") || 'Hero');
let currentMonster = getRandomMonster();
logMessage(`👤 ${player.name} encounters ${currentMonster.type}!`);
updateUI(); // Ensure UI updates at the start

