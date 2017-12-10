import HttpBaseService from '@/services/http-base-service';

export default class EmployeeService extends HttpBaseService {

    getAll(keywords, page, pageSize) {
        return this.getRequest('api/employee', { keywords, page, pageSize }, []);
    }
    
    getById(id) {
        return this.getRequest('api/employee/getById', { id }, null);
    }

    getMostSkilled() {
        return this.getRequest('api/employee/getMostSkilled', null, []);
    }
    
    remove(employeeId) {
        return this.removeEntity(`api/employee?id=${employeeId}`);
    }

    save(employee) {
        return this.saveEntity('api/employee', employee);
    }
};
