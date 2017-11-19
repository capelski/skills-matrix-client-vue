<template>
    <div class="navigation-section">
        <div class="row">
            <div class="col-xs-12">
                <div class="page-header">
                    <h2>Skills matrix</h2>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-xs-12">
                <p>
                    Suspendisse et metus ligula. Nulla laoreet imperdiet magna, quis egestas sem rhoncus vitae. In non maximus sem, eget accumsan risus. Nam porttitor lorem at purus mollis dictum. Vestibulum eleifend lorem non est consectetur, vel dignissim eros cursus. Aenean magna tortor, fringilla vitae vulputate sit amet, ornare et eros. Vestibulum eget suscipit elit
                </p>
                <img src="static/images/skills.png" class="responsive-img" />
            </div>
        </div>

        <div class="row">
            <div class="col-sm-6">
                <div class="row align-bottom">
                    <div class="col-xs-9">
                        <h2>Most skilled employees</h2>  
                    </div>
                    <div class="col-xs-3 m-bottom-10 text-right">
                        <button type="button" v-on:click="$router.push('/employees')">View all</button>
                    </div>
                </div>
                <paginated-list
                    :itemsFetcher="employeesFetcher"
                    :itemDrawer="employeeDrawer"
                    :itemOnClick="(employee) => $router.push(`/employee/${employee.Id}`)">
                </paginated-list>
            </div>
            <div class="col-sm-6">
                <div class="row align-bottom">
                    <div class="col-xs-9">
                        <h2>Rearest skills</h2>
                    </div>
                    <div class="col-xs-3 m-bottom-10 text-right">
                        <button type="button" v-on:click="$router.push('/skills')">View all</button>
                    </div>
                </div>
                <paginated-list
                    :itemsFetcher="skillsFetcher"
                    :itemDrawer="skillDrawer"
                    :itemOnClick="(skill) => $router.push(`/skill/${skill.Id}`)">
                </paginated-list>
            </div>
        </div>
    </div>
</template>

<script>
    import { getInstance } from '@/service-locator';
    import PaginatedList from '@/components/PaginatedList';

    export default {
        components: {
            PaginatedList
        },
        data () {
            return {
                employeesFetcher: (keywords, page, pageSize) =>
                    this.employeeService.getMostSkilled()
                    .then(employees => {
                            return {
                            CurrentPage: 0,
                            Items: employees,
                            TotalPages: 1,
                            TotalRecords: 5
                        };
                    }),
                employeeDrawer (employee) {
                    return `${ employee.Name }
                        <span class="badge floating">${ employee.Skills.length }</span>`;
                },
                skillsFetcher: (keywords, page, pageSize) =>
                    this.skillService.getRearest()
                    .then(skills => {
                            return {
                            CurrentPage: 0,
                            Items: skills,
                            TotalPages: 1,
                            TotalRecords: 5
                        };
                    }),
                skillDrawer (skill) {
                    return `${ skill.Name }
                        <span class="badge floating">${ skill.Employees.length }</span>`;
                }
            };
        },
        created() {
            this.employeeService = getInstance('EmployeeService');
            this.skillService = getInstance('SkillService');
        }
    };
</script>
