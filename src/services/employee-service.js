export default {
    getMostSkilled,
    getEmployees
};

function getMostSkilled() {
    return new Promise((resolve, reject) => {
        resolve([{"Id":7,"Name":"Ewan MacColl","Skills":[{"Id":59,"Name":"ECMAScript","Employees":null},{"Id":66,"Name":"C++","Employees":null},{"Id":100,"Name":"Angelscript 4","Employees":null}]},{"Id":24,"Name":"Wizz Jones","Skills":[{"Id":1,"Name":"Angelscript","Employees":null},{"Id":100,"Name":"Angelscript 4","Employees":null}]},{"Id":15,"Name":"Adam Leonardo","Skills":[{"Id":1,"Name":"Angelscript","Employees":null}]},{"Id":1,"Name":"Adele","Skills":[{"Id":71,"Name":"Applescript","Employees":null}]},{"Id":62,"Name":"Andy Brown","Skills":[{"Id":62,"Name":"COMAL","Employees":null}]}]);
    });
}

function getEmployees() {
    return getMostSkilled(); // Temporarily
}