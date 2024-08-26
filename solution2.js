const apiUrl = 'https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees';

async function getEmployeeData() {
    try {
        const { default: fetch } = await import('node-fetch'); 
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log('Fetched employee data:', data);  
        return data;
    } catch (error) {
        console.error('Error fetching employee:', error);
    }
}

function Employee(name, age, salary) {
    this.name = name;
    this.age = age;
    this.salary = salary;
}

Employee.prototype.displayName = function () {
    return this.name;
};

Employee.prototype.displayAge = function () {
    return this.age;
};

Employee.prototype.increaseAge = function () {
    this.age += 1;
    return this.age;
};

Employee.prototype.displaySalary = function () {
    return this.salary;
};

function Manager(name, age, salary, department) {
    Employee.call(this, name, age, salary);
    this.department = department;
}

Manager.prototype = Object.create(Employee.prototype);

Manager.prototype.displayDepartment = function () {
    return this.department;
};

Manager.prototype.increaseSalary = function (employee, amount) {
    employee.salary += amount;
    return employee.salary;
};

Manager.prototype.decreaseSalary = function (employee, amount) {
    employee.salary -= amount;
    return employee.salary;
};

Manager.prototype.constructor = Manager;

async function main() {
    const employeeData = await getEmployeeData(); 
    if (employeeData && employeeData.data) {
        
        const employee = new Employee(employeeData.data.name, employeeData.data.age, employeeData.data.salary);
        console.log("Employee Name:", employee.displayName());
        console.log("Employee Age:", employee.displayAge());
        console.log("Employee Salary:", employee.displaySalary());
        
        employee.increaseAge();
        console.log("Updated Age:", employee.displayAge());

        const manager = new Manager('Jane Smith', 40, 70000, 'Sales');
        console.log("Manager Department:", manager.displayDepartment());

        manager.increaseSalary(employee, 5000);
        console.log("Updated Salary:", employee.displaySalary());
    }
}

main();
