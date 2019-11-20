"use strict";
document.addEventListener('DOMContentLoaded', initScript);

function initScript() {
    console.log('Gulp 4');
    
    const admin = new User(`Admin`, 20);

    admin.greet();
};

class User {
    constructor(name, age) {
        this.name = name;  
        this.age = age;  
    };

    greet() {
        console.log(`Hello, my name is ${this.name}, I'm ${this.age} years old`);
    };
};

