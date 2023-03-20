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
    constructor(name, power){
        super(name, power, "");
    }
    
    quck() {
        console.log("quck");
    }

    swim(){
        console.log("swim");
    }
}

class Dog extends Creature {
    constructor(name, power) {
        super(name, power, "");
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


// Колода Шерифа, нижнего игрока.
const seriffStartDeck = [
    new Duck("Mirnaya utka", 2),
    new Duck("Mirnaya utka", 2),
    new Duck("Mirnaya utka", 2),
];

// Колода Бандита, верхнего игрока.
const banditStartDeck = [new Dog('Sobaken', 3)];


// Создание игры.
const game = new Game(seriffStartDeck, banditStartDeck);

// Глобальный объект, позволяющий управлять скоростью всех анимаций.
SpeedRate.set(1);

// Запуск игры.
game.play(false, (winner) => {
    alert('Победил ' + winner.name);
});