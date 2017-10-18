import HttpBaseService from '@/services/http-base-service';

export default class EmployeeService extends HttpBaseService {

    getMostSkilled() {
        return this.getRequest('api/employee/getMostSkilled', null, []);
    }
    
    getAll(keywords, page, pageSize) {
        return this.getRequest('api/employee', { keywords, page, pageSize }, []);
    }
    
    getById(id) {
        return new Promise((resolve, reject) => {
            resolve({"Id":id,"Name":"Mock","Skills":[{"Id":1,"Name":"Mock","Employees":[]}]});
        });
    }
};
