import Card from './Card.js';
import Game from './Game.js';
import TaskQueue from './TaskQueue.js';
import SpeedRate from './SpeedRate.js';

class Creature extends Card {
    constructor(name, power) {
        super(name, power, "");
    }

    getDescriptions(){
        return [getCreatureDescription(), super.getDescriptions()];
    }
}


class Duck extends Creature{
    constructor(name="Мирная утка", power=2){
        super(name, power);
    }
    
    quck() {
        console.log("quck");
    }

    swim(){
        console.log("swim");
    }
}

class Dog extends Creature {
    constructor(name="Собакен", power=3) {
        super(name, power);
    }
}

class Gatling extends Creature {
    constructor(name = "Гатлинг", power = 6) {
        super(name, power);
    }

    
    attack(gameContext, continuation) {
        const taskQueue = new TaskQueue();

        const { currentPlayer, oppositePlayer, position, updateView } = gameContext;

        taskQueue.push((onDone) => this.view.showAttack(onDone));
        taskQueue.push((onDone) => {  
            
            while (position >= 0){
                const oppositeCard = oppositePlayer.table[position];
                if (oppositeCard) {
                  console.log(position);
                  this.dealDamageToCreature(
                    this.currentPower,
                    oppositeCard,
                    gameContext,
                    onDone
                  );
                } else {
                  this.dealDamageToPlayer(1, gameContext, onDone);
                }
                position--;
            }
            
        });

        taskQueue.continueWith(continuation);
    }
}


class Trasher extends Dog {
    constructor(name = "Громила", power = 5) {
        super(name, power);
    }
    
    modifyTakenDamage = function (value, fromCard, gameContext, continuation) {
        this.view.signalAbility(() => continuation(value - 1));
    };
}

class Lad extends Dog {
    constructor(name = "Браток", power = 2) {
        super(name, power);
    }

    static inGameCount;
    static getInGameCount() { return this.inGameCount || 0; }
    static setInGameCount(value) { this.inGameCount = value; }

    doAfterComingIntoPlay(gameContext, continuation) {
        const ladsCount = Lad.getInGameCount();
        Lad.setInGameCount(ladsCount + 1);
        continuation();
    };

    doBeforeRemoving(continuation) {
        const ladsCount = Lad.getInGameCount();
        Lad.setInGameCount(ladsCount - 1);
        continuation();
    }

    static getBonus() { 
        return this.getInGameCount() * (this.getInGameCount() + 1) / 2;
    }

    modifyDealedDamageToCreature(value, toCard, gameContext, continuation) {
        continuation(value + Lad.getBonus());
    };
0
    modifyTakenDamage(value, fromCard, gameContext, continuation) {
        continuation(value - Lad.getBonus());
    };

    getDescriptions(){
        return [this.getLadDescription(), super.getDescriptions()];
    }

    getLadDescription() {
        return "Чем их больше, тем они сильнее";
    }
}

// Отвечает является ли карта уткой.
function isDuck(card) {
    return card instanceof Dog;
    //return card && card.quacks && card.swims;
}

// Отвечает является ли карта собакой.
function isDog(card) {
    return card instanceof Dog;
}

function isLad(card) {
    return card instanceof Lad;
}

// Дает описание существа по схожести с утками и собаками
function getCreatureDescription(card) {
    if (isDuck(card) && isDog(card)) {
        return 'Утка-Собака';
    }
    if (isDuck(card)) {
        return 'Утка';
    }
    if (isDog(card)) {
        return 'Собака';
    }
    return 'Существо';
}



// // Основа для утки.
// function Duck() {
//     this.quacks = function () { console.log('quack') };
//     this.swims = function () { console.log('float: both;') };
// }


// // Основа для собаки.
// function Dog() {
// }


const seriffStartDeck = [
    new Duck(),
    new Gatling(),
    new Trasher()
];

// Колода Бандита, верхнего игрока.
const banditStartDeck = [new Dog(), new Dog(), new Dog(), new Dog()];


// Создание игры.
const game = new Game(seriffStartDeck, banditStartDeck);
new Game(seriffStartDeck, banditStartDeck);
new Game(seriffStartDeck, banditStartDeck);

// Глобальный объект, позволяющий управлять скоростью всех анимаций.
SpeedRate.set(1);

// Запуск игры.
game.play(false, (winner) => {
    alert('Победил ' + winner.name);
});
