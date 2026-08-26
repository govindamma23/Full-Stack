class Employee {
    work() {
        console.log("Employee is working");
    }
}

class Developer extends Employee {
    code() {
        console.log("Developer is writing code");
    }
}

class Manager extends Employee {
    manage() {
        console.log("Manager is managing the team");
    }
}

const developer = new Developer();
developer.work();
developer.code();

const manager = new Manager();
manager.work();
manager.manage();