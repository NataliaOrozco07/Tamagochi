const petNameInput = prompt("Enter your pet's name:");
const petNameElement = document.getElementById("petName");

petNameElement.textContent = petNameInput ? petNameInput : "Virtual Pet";

const pet = {
    maxHealth: 100,
    maxStamina: 100,
    health: 100,
    stamina: 100,

    feed: function () {
        if (this.health < this.maxHealth) {
            this.health += 20;
        }
        this.stamina -= 10;
        this.clampValues();
    },

    play: function () {
        if (this.stamina >= 10) {
            this.stamina -= 10;
            this.health -= 5;
            this.clampValues();
        }
    },

    sleep: function () {
        if (this.stamina < this.maxStamina) {
            this.stamina += 50;
        }
        this.health += 5;
        this.clampValues();
    },

    clampValues: function () {
        this.health = Math.max(0, Math.min(this.health, this.maxHealth));
        this.stamina = Math.max(0, Math.min(this.stamina, this.maxStamina));
    },

};



const healthbar = document.querySelector("#healthbar .bar");
const staminabar = document.querySelector("#staminabar .bar");
const healthPercentageElement = document.querySelector("#healthbar .percentage");
const staminaPercentageElement = document.querySelector("#staminabar .percentage");

function updateBars() {
    healthbar.style.width = (pet.health / pet.maxHealth) * 100 + "%";
    staminabar.style.width = (pet.stamina / pet.maxStamina) * 100 + "%";

    const healthPercentage = Math.round((pet.health / pet.maxHealth) * 100);
    const staminaPercentage = Math.round((pet.stamina / pet.maxStamina) * 100);

    healthPercentageElement.textContent = healthPercentage + "%";
    staminaPercentageElement.textContent = staminaPercentage + "%";
}

updateBars();

const HEALTH_DECREASE_INTERVAL = 1000;
const STAMINA_DECREASE_INTERVAL = 1000;

setInterval(function () {
    if (pet.health > 0) {
        pet.health -= 1;
        updateBars();
    } else {
        alert("¡Tu mascota ha muerto!");
        const newPetName = prompt("Enter a new pet name:");
        if (newPetName) {
            pet.health = pet.maxHealth;
            pet.stamina = pet.maxStamina;
            petNameElement.textContent = newPetName;
            updateBars();
        }
    }
}, HEALTH_DECREASE_INTERVAL);

setInterval(function () {
    if (pet.stamina > 0) {
        pet.stamina -= 1;
        updateBars();
    } else {
        alert("¡Tu mascota está cansada!");
    }
}, STAMINA_DECREASE_INTERVAL);

document.getElementById("feed").addEventListener("click", function () {
    pet.feed();
    updateBars();
});

document.getElementById("play").addEventListener("click", function () {
    pet.play();
    updateBars();
});

document.getElementById("sleep").addEventListener("click", function () {
    pet.sleep();
    updateBars();
});