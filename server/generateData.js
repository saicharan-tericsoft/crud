const database = { employees: []};
const NoOfEmployees = 3;

for (let i = 1; i<= NoOfEmployees; i++) {
    database.employees.push({
        id: i,
        name: "manoj",
        email: "manoj@gmail.com",
        phone: "99923232323",
        dob: "1995-01-01",
        gender: "male",
        hobbies: [ 'reading', 'gaming' ]
    });
}

console.log(JSON.stringify(database));
