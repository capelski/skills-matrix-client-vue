import HttpBaseService from '@/services/http-base-service';

export default class SkillService extends HttpBaseService {

    getRearest() {
        return this.getRequest('api/skill/getRearest', null, []);
    }
    
    getAll(keywords, page, pageSize) {
        return this.getRequest('api/skill', { keywords, page, pageSize }, []);
    }
    
    getById(id) {
        return new Promise((resolve, reject) => {
            resolve({"Id":id,"Name":"Mock","Employees":[{"Id":1,"Name":"Mock","Skills":[]}]});
        });
    }
};
