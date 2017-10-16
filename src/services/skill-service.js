export class SkillService {

    apiUrl = process.env.baseApiUrl;
    corsMode = process.env.corsMode;

    getRearest() {
        var options = {
            method: 'GET',
            mode: 'cors',
            cache: 'default'
        };
        
        return fetch(this.apiUrl + 'api/skill/getRearest', options)
        .then(response => response.json())
        .catch(error => {
            // Notify the error through Toastr
            return [];
        });
    }
    
    getAll() {
        return this.getRearest(); // Temporarily
    }
    
    getById(id) {
        return new Promise((resolve, reject) => {
            resolve({"Id":id,"Name":"Mock","Employees":[{"Id":1,"Name":"Mock","Skills":[]}]});
        });
    }
};
