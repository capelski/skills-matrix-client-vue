export default {
    getRearest,
    getSkills
};

function getRearest() {
    return new Promise((resolve, reject) => {
        resolve([{"Id":72,"Name":"Apex","Employees":[]},{"Id":70,"Name":"AutoLISP","Employees":[]},{"Id":68,"Name":"Bash","Employees":[]},{"Id":67,"Name":"Boo","Employees":[]},{"Id":65,"Name":"Caml","Employees":[]}]);
    });
}

function getSkills() {
    return getRearest(); // Temporarily
}
