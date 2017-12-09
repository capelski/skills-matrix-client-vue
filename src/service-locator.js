import EmployeeService from '@/services/employee-service';
import SkillService from '@/services/skill-service';

const services = [
    {
        name: 'EmployeeService',
        instance: new EmployeeService()
    },
    {
        name: 'SkillService',
        instance: new SkillService()
    }
];

function getInstance(serviceName) {
    var instance;
    var service = services.find(s => s.name == serviceName);
    if (service) instance = service.instance;
    return instance;
}

export {
    getInstance
};
