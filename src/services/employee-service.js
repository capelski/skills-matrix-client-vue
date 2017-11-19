import HttpBaseService from '@/services/http-base-service';

export default class EmployeeService extends HttpBaseService {

    getMostSkilled() {
        return this.getRequest('api/employee/getMostSkilled', null, []);
    }
    
    getAll(keywords, page, pageSize) {
        return this.getRequest('api/employee', { keywords, page, pageSize }, []);
    }
    
    getById(id) {
        return this.getRequest('api/employee/getById', { id }, {});
    }

    save(employee) {
        return this.saveEntity('api/employee', employee);
    }
};
