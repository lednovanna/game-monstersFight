

// Игрок
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

    // атака
    attack(monster) {
        const damage = Math.floor(Math.random() * this.strength) + 5;
        monster.health -= damage;
        logMessage(`${this.name} dealt ${damage} damage to ${monster.type}.`);
    }

    // лечение
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

    // переход на новый уровень
    levelUp() {
        this.level++;
        this.maxHealth += 30;
        this.health = this.maxHealth;
        this.strength += 10;
        logMessage(`🎉 ${this.name} leveled up to ${this.level}!`);
    }

    // добавление инвентаря
    addItem(item) {
        this.inventory.push(item);
        logMessage(`📦 ${this.name} found an item: ${item.name}!`);
    }

    // использование инвенторя
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

// Монстер
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


class Item {
    constructor(name, type, effect) {
        this.name = name;
        this.type = type;
        this.effect = effect;
    }
}


function updateHealthBar(element, currentHealth, maxHealth) {
    element.value = Math.max(0, currentHealth);
    element.max = maxHealth;
}


function updateUI() {
    document.getElementById('playerName').textContent = `${player.name} (Level: ${player.level})`;
    updateHealthBar(document.getElementById('playerHealth'), player.health, player.maxHealth);

    document.getElementById('monsterName').textContent = `${currentMonster.type}`;
    updateHealthBar(document.getElementById('monsterHealth'), currentMonster.health, currentMonster.maxHealth);
}


function logMessage(message) {
    const log = document.getElementById('gameLog');
    log.innerHTML += message + '<br>'; 
    log.scrollTop = log.scrollHeight;
}

// генерация рандомного монстра
function getRandomMonster() {
    const monsters = [
        new Monster('Goblin', 50, 10),
        new Monster('Giant', 80, 15),
        new Monster('Dragon', 120, 20)
    ];
    return monsters[Math.floor(Math.random() * monsters.length)];
}


function getRandomItem() {
    const items = [
        new Item('Life Elixir', 'potion', 50),
        new Item('Hero’s Sword', 'weapon', 15),
        new Item('Shield of Protection', 'armor', 20)
    ];
    return items[Math.floor(Math.random() * items.length)];
}

//Проверяем закончилась ли игра
function checkGameOver() {
    if (player.health <= 0) {
        logMessage('💀 Game Over. You lost!');
        disableButtons();
    }
}

// Дективация кнопок если игра закончина
function disableButtons() {
    document.getElementById('attackBtn').disabled = true;
    document.getElementById('healBtn').disabled = true;
    document.getElementById('inventoryBtn').disabled = true;
}

// Атаки
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
    updateUI(); 
    checkGameOver();
});

// Лечение
document.getElementById('healBtn').addEventListener('click', () => {
    player.heal();
    currentMonster.attack(player);
    updateUI(); 
    checkGameOver();
});

// Использование инвентаря
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
    updateUI(); 
    checkGameOver();
});

// Начало игры
const player = new Player(prompt("Enter player's name:") || 'Hero');
let currentMonster = getRandomMonster();
logMessage(`👤 ${player.name} encounters ${currentMonster.type}!`);
updateUI(); 

