import HttpBaseService from '@/services/http-base-service';

export default class SkillService extends HttpBaseService {

    getRearest() {
        return this.getRequest('api/skill/getRearest', null, []);
    }
    
    getAll(keywords, page, pageSize) {
        return this.getRequest('api/skill', { keywords, page, pageSize }, []);
    }
    
    getById(id) {
        return this.getRequest('api/skill/getById', { id }, []);
    }
};
