import HttpBaseService from '@/services/http-base-service';

export default class EmployeeService extends HttpBaseService {

    getMostSkilled() {
        return this.getRequest('api/employee/getMostSkilled', []);
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
