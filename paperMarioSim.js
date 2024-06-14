class Character {
    name = null;
    image = null;
    damagedImg = null;
    hp = null;
    attack = null;
    defense = null;

    constructor(name, image, damagedImg, hp, attack, defense) {
        this.name = name;
        this.image = image;
        this.damagedImg = damagedImg;
        this.hp = hp;
        this.attack = attack;
        this.defense = defense;
    }
}

class Partner {
    name = null;
    image = null;
    attackImg = null;
    fainted = null;
    hp = null;
    attack = null;
    defense = null;

    constructor(name, image, attackImg, fainted, hp, attack, defense) {
        this.name = name;
        this.image = image;
        this.fainted = fainted;
        this.attackImg = attackImg;
        this.hp = hp;
        this.attack = attack;
        this.defense = defense;
    }
}

class Enemy {
    name = null;
    image = null;
    damagedImg = null;
    hp = null;
    attack = null;
    defense = null;

    constructor(name, image, damagedImg, hp, attack, defense) {
        this.name = name;
        this.image = image;
        this.damagedImg = damagedImg;
        this.hp = hp;
        this.attack = attack;
        this.defense = defense;
    }
}

const mario = new Character('Mario', 'https://static.wikia.nocookie.net/papermario/images/6/6c/Super_Paper_Mario_icon.png/revision/latest?cb=20100227144823&path-prefix=es', 'https://raw.githubusercontent.com/Xavtols/images/main/D.png?token=GHSAT0AAAAAACS6UTOBOXXYD2RNCPPRTDSCZTJYEYQ', 30, 5, 2)
const bobbery = new Partner('Bobbery', 'https://mario.wiki.gallery/images/1/1e/PMTTYD_Admiral_Bobbery_Sprite.png', 'https://mario.wiki.gallery/images/thumb/1/14/PMTTYD_Bobbery_Artwork.png/800px-PMTTYD_Bobbery_Artwork.png', 'https://mario.wiki.gallery/images/thumb/1/14/PMTTYD_Bobbery_Artwork.png/800px-PMTTYD_Bobbery_Artwork.png', 30, 6, 0)
const yoshi = new Partner('Yoshi', 'https://mario.wiki.gallery/images/3/3d/Mini-Yoshi_Trophy_-_Super_Smash_Bros._for_Wii_U.png', 'https://mario.wiki.gallery/images/4/48/TTYD_NS_MiniYoshi.png', 'https://mario.wiki.gallery/images/4/48/TTYD_NS_MiniYoshi.png', 25, 4, 1)
const vivian = new Partner('Vivian', 'https://mario.wiki.gallery/images/thumb/8/88/PMTTYD_Vivian_Alternate_Artwork.png/800px-PMTTYD_Vivian_Alternate_Artwork.png', 'https://mario.wiki.gallery/images/thumb/4/43/PMTTYD_Vivian_Main_Artwork.png/800px-PMTTYD_Vivian_Main_Artwork.png', 'https://mario.wiki.gallery/images/2/25/Viviandefeated.png', 30, 5, 1)
const bowser = new Enemy('Bowser', 'https://static.wikia.nocookie.net/papermario/images/7/71/Bowser.png/revision/latest?cb=20151103052158', 'https://static.wikia.nocookie.net/papermario/images/6/65/SPMBowser.png/revision/latest?cb=20190603034956', 50, 30, 1)

const jumpAttack = document.querySelector('#jumpAttack')
const hammerAttack = document.querySelector('#hammerAttack')
const partnerAttack = document.querySelector('#partnerAttack')

const marioHp = document.querySelector('#marioHp')
const partnerHp = document.querySelector('#partnerHp')
const enemyHp = document.querySelector('#enemyHp')

const enemyImg = document.querySelector('#enemyimg')
const marioImg = document.querySelector('#mario-img')
const partnerImg = document.querySelector('#partnerImg')

let partnerSelector = document.querySelector('#partnerSelector')

partnerSelector.addEventListener('change', swapPartner)

document.getElementById('jumpAttack').addEventListener('click', function () {
    marioAction('jumpAttack', bowser, currentPartner)
});

document.getElementById('hammerAttack').addEventListener('click', function () {
    marioAction('hammerAttack', bowser, currentPartner)
});

document.getElementById('partnerAttack').addEventListener('click', function () {
    partnerAction(currentPartner, 'partnerAttack', mario, bowser)
})

function hpDisplay() {
    marioHp.textContent = ` ${mario.hp}`
    partnerHp.textContent = `${currentPartner.hp}`
    enemyHp.textContent = ` ${bowser.hp}`
}

let currentPartner = Partner;

function swapPartner(e) {
    const value = e.target.value;
    let currentPartner;

    if (value === 'bobbery') {
        currentPartner = bobbery
        partnerHp.textContent = `${bobbery.hp}`
        partnerImg.setAttribute('src', bobbery.image)
        console.log('Bob')
        activeButton(currentPartner)
    }

    if (value === 'yoshi') {
        currentPartner = yoshi
        partnerHp.textContent = `${yoshi.hp}`
        partnerImg.setAttribute('src', yoshi.image)
        console.log('YOSHI')
        activeButton(currentPartner)
    }

    if (value === 'vivian') {
        currentPartner = vivian
        partnerHp.textContent = `${vivian.hp}`
        partnerImg.setAttribute('src', vivian.image)
        console.log('vIVIAN')
        activeButton(currentPartner)
    }

    currentPartner.currentPartner = true;

}


let currentTurn = 'player';
let gameOver = false;
let partnerAlive = true;

function marioAction(button, enemy, partner) {


    const attackChance = Math.floor(Math.random() * 10) + 1;

    if (currentTurn != 'player') {
        console.log(`It's ${partner.name}'s turn`);
        return;
    }

    if (button == 'jumpAttack' && enemy.hp > 0 && attackChance > 4) {
        enemy.hp = enemy.hp - mario.attack + enemy.defense
        console.log(`Mario dealt ${mario.attack} damage with his jump`)
        swapAttackImage('mario-img', 'https://mario.wiki.gallery/images/thumb/4/4c/PMTTYD_Mario_Jumping_Artwork.png/800px-PMTTYD_Mario_Jumping_Artwork.png', 500)
        swapAttackImage('enemyimg', enemy.damagedImg, 700)
        hpDisplay()
    } else if (button == 'hammerAttack' && enemy.hp > 0 && attackChance > 5) {
        enemy.hp = enemy.hp - mario.attack - 2 + enemy.defense
        console.log(`Mario dealt ${mario.attack + 2} damage with the hammer`)
        swapAttackImage('mario-img', 'https://mario.wiki.gallery/images/thumb/3/3d/PMTTYD_Mario_Swinging_Hammer_Artwork.png/800px-PMTTYD_Mario_Swinging_Hammer_Artwork.png', 500)
        swapAttackImage('enemyimg', enemy.damagedImg, 700)
        hpDisplay()
    }

    else {
        console.log('Mario/s attack missed!')
    }


    setTurnDelay(() => {
        if (!gameOver && partner.hp > 0) {
            currentTurn = 'partner';
            partnerAction();
        } else if (!gameOver && partner.hp <= 0) {
            currentTurn = 'enemy';
            partnerAttack.disabled = true;
            console.log(`${partner.name} can't act anymore`)
            enemyAttack(mario, bowser, currentPartner);
        }
    }, 1000);


    if (enemy.hp <= 0) {
        disableButtons(mario, currentPartner, bowser);
        enemyImg.src = 'https://static.wikia.nocookie.net/villains/images/0/0f/PMTTYDNS_Paper_Bowser_Artwork.png/revision/latest/scale-to-width-down/1000?cb=20240420163330'
        gameOver = true;
        alert('Victory!')
        return;
    }
}


function partnerAction(partner, button, character, enemy) {


    const attackChance = Math.floor(Math.random() * 10) + 1;

    if (currentTurn != 'partner') {
        console.log(`It is ${character.name}'s turn`);
        return;
    }

    if (button == 'partnerAttack' && enemy.hp > 0 && attackChance >= 4) {
        enemy.hp = enemy.hp - partner.attack + enemy.defense
        swapAttackImage('partnerImg', currentPartner.attackImg, 700)
        swapAttackImage('enemyimg', enemy.damagedImg, 700)
        console.log(`${partner.name} dealt ${partner.attack} damage with their attack`)
        hpDisplay()
    }

    else {
        console.log(`${partner.name} attack missed!`)
    }


    setTurnDelay(() => {
        if (!gameOver) {
            currentTurn = 'enemy';
            enemyAttack(mario, bowser, currentPartner);
        }
    }, 1500);


    if (enemy.hp <= 0) {
        disableButtons(mario, currentPartner, bowser);
        enemyImg.src = 'https://static.wikia.nocookie.net/villains/images/0/0f/PMTTYDNS_Paper_Bowser_Artwork.png/revision/latest/scale-to-width-down/1000?cb=20240420163330'
        gameOver = true;
        alert('Victory!')
        return;
    }
}



function setTurnDelay(callback, delay) {
    setTimeout(callback, delay);
}



function enemyAttack(character, enemy, partner) {

    console.log('Bowser turn')

    const enemyAttackChance = Math.floor(Math.random() * 12) + 1;

    if (currentTurn !== 'enemy') {
        console.log(`Its ${character.name}/s turn`);
        return;
    }

    if (character.hp > 0 && partner.hp > 0 && enemyAttackChance > 10) {
        character.hp = character.hp - enemy.attack + character.defense
        swapAttackImage('enemyimg', 'https://static.wikia.nocookie.net/papermario/images/6/6c/Bowserfire.png/revision/latest/scale-to-width-down/1000?cb=20190603035320', 900)
        swapAttackImage('mario-img', character.damagedImg, 900)
        console.log(`${enemy.name} dealt ${enemy.attack} damage to ${character.name}`)
        hpDisplay()
    } else if (character.hp > 0 && partner.hp > 0 && enemyAttackChance <= 9) {
        partner.hp = partner.hp - enemy.attack + partner.defense
        swapAttackImage('enemyimg', 'https://static.wikia.nocookie.net/papermario/images/6/6c/Bowserfire.png/revision/latest/scale-to-width-down/1000?cb=20190603035320', 900)
        console.log(`${enemy.name} dealt ${enemy.attack} damage to ${partner.name}`)
        hpDisplay()
    } else if (partner.hp <= 0 && enemyAttackChance >= 5) {
        character.hp = character.hp - enemy.attack + character.defense
        swapAttackImage('enemyimg', 'https://static.wikia.nocookie.net/papermario/images/6/6c/Bowserfire.png/revision/latest/scale-to-width-down/1000?cb=20190603035320', 900)
        swapAttackImage('mario-img', character.damagedImg, 900)
        console.log(`${enemy.name} dealt ${enemy.attack} damage to ${character.name}`)
        hpDisplay()
    } else {
        console.log(`${enemy.name} missed!`)
    }



    setTurnDelay(() => {
        if (!gameOver) {
            currentTurn = 'player';
        }
    }, 1000);


    if (partner.hp <= 0) {
        // partnerAlive == false;
        disableButtons(mario, currentPartner, bowser)
        partnerImg.src = partner.fainted
    }


    if (character.hp <= 0) {
        disableButtons(mario, currentPartner, bowser);
        marioImg.src = 'https://mario.wiki.gallery/images/thumb/2/28/Mariofaint.png/1600px-Mariofaint.png'
        gameOver = true;
        alert('Defeat')
        return;
    }

}

function swapAttackImage(imageId, newSrc, delay) {

    const imageElement = document.getElementById(imageId);
    const originalSrc = imageElement.src;

    imageElement.src = newSrc;

    setTimeout(() => {
        imageElement.src = originalSrc;
    }, delay);
}

function disableButtons(character, partner, enemy) {

    if (character.hp <= 0 || enemy.hp <= 0) {
        jumpAttack.disabled = true
        jumpAttack.style.opacity = '50%';

        hammerAttack.disabled = true
        hammerAttack.style.opacity = '50%';
    }

    if (partner.hp <= 0 || enemy.hp <= 0 || character.hp <= 0) {
        partnerAttack.disabled = true
        partnerAttack.style.opacity = '50%';
    }
}

function activeButton(partner) {
    if (partner.hp > 0) {
        partnerAttack.disabled = false
    } else {
        partnerAttack.disabled = true
        currentTurn = 'mario';
    }
}



function checkNextTurn(character, partner) {
    if (currentTurn === 'player') {
        if (character.hp > 0) {
            currentTurn = 'player';
        }
    }
    if (currentTurn === 'partner') {
        if (partner.hp > 0) {
            currentTurn = 'partner';
        }
    } else if (partner.hp <= 0) {
        currentTurn = 'enemy';
    }
}