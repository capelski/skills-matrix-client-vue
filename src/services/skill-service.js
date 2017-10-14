export default {
    getRearest,
    getAll,
    getById
};

function getRearest() {
    return new Promise((resolve, reject) => {
        resolve([{"Id":72,"Name":"Apex","Employees":[]},{"Id":70,"Name":"AutoLISP","Employees":[]},{"Id":68,"Name":"Bash","Employees":[]},{"Id":67,"Name":"Boo","Employees":[]},{"Id":65,"Name":"Caml","Employees":[]}]);
    });
}

function getAll() {
    return getRearest(); // Temporarily
}

function getById(id) {
    return new Promise((resolve, reject) => {
        resolve({"Id":id,"Name":"Mock","Employees":[{"Id":1,"Name":"Mock","Skills":[]}]});
    });
}