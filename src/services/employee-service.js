export class EmployeeService {

    apiUrl = process.env.baseApiUrl;
    corsMode = process.env.corsMode;

    getMostSkilled() {        
        var options = {
            method: 'GET',
            mode: 'cors',
            cache: 'default'
        };
        
        return fetch(this.apiUrl + 'api/employee/getMostSkilled', options)
        .then(response => response.json())
        .catch(error => {
            // Notify the error through Toastr
            return [];
        });
    }
    
    getAll() {
        return this.getMostSkilled(); // Temporarily
    }
    
    getById(id) {
        return new Promise((resolve, reject) => {
            resolve({"Id":id,"Name":"Mock","Skills":[{"Id":1,"Name":"Mock","Employees":[]}]});
        });
    }
};
