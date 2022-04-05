var object = {
    name: 'Bob',
    age: 50
};

class Person {
    name;
    age;

    constructor(name, age) {
        this.name;
        this.age;
    }

    getlegal() {
        return this.age > 18;
    }

}// end class person

console.log(new Person('Bob', 50));