function Employee(name,age,salary){
    this.name = name;
    this.age = age;
    this.salary = salary;
}

Employee.prototype.displayName = function(){
    return this.name;

};

Employee.prototype.displayAge = function(){
    return this.age;
};

Employee.prototype.increaseAge = function(){
    this.age += 1;
    return this.age;

};

Employee.prototype.displaySalary = function(){
    return this.salary;

};

function Manager(name,age,salary,department){
    Employee.call(this,name,age,salary);
    this.department = department;
}

Manager.prototype = Object.create(Employee.prototype);

Manager.prototype.displayDepartment = function(){
    return this.department;

};

Manager.prototype.increaseSalary = function(employee, amount){
    employee.salary += amount;
    return employee.salary;
};

Manager.prototype.decreaseSalary = function(employee, amount){
    employee.salary -= amount;
    return employee.salary;
};

Manager.prototype.constructor = Manager;



const emp1 = new Employee('John Doe', 30, 50000);
console.log(emp1.displayName()); // "John Doe"
console.log(emp1.displayAge()); // 30


const mgr1 = new Manager('Jane Smith', 40, 70000, 'Sales');
console.log(mgr1.displayDepartment()); // "Sales"
console.log(mgr1.displaySalary()); // 70000


mgr1.increaseSalary(emp1, 5000);
console.log(emp1.displaySalary()); // 55000

