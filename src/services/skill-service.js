import HttpBaseService from '@/services/http-base-service';

export default class SkillService extends HttpBaseService {

    getRearest() {
        return this.getRequest('api/skill/getRearest', null, []);
    }
    
    getAll(keywords, page, pageSize) {
        return this.getRequest('api/skill', { keywords, page, pageSize }, []);
    }
    
    getById(id) {
        return this.getRequest('api/skill/getById', { id }, null);
    }
    
    remove(skillId) {
        return this.removeEntity(`api/skill?id=${skillId}`);
    }
    
    save(skill) {
        return this.saveEntity('api/skill', skill);
    }
};
