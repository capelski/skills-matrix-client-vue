import HttpBaseService from '@/services/http-base-service';

export default class SkillService extends HttpBaseService {

    getRearest() {
        return this.getRequest('api/skill/getRearest', []);
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
