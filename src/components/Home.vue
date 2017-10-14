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
                <ul>
                    <li v-for="employee in employees" v-bind:key="employee.Id"
                        v-on:click="$router.push(`/employee/${employee.Id}`)">
                        {{ employee.Name }}
                    </li>
                </ul>
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
                <ul>
                    <li v-for="skill in skills" v-bind:key="skill.Id"
                        v-on:click="$router.push(`/skill/${skill.Id}`)">
                        {{ skill.Name }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import EmployeeService from '@/services/employee-service';
    import SkillService from '@/services/skill-service';

    export default {
        data () {
            return {
                employees: [],
                skills: []
            };
        },
        created() {
            EmployeeService.getMostSkilled().then(mostSkilled => this.employees = mostSkilled);
            SkillService.getRearest().then(rearest => this.skills = rearest);
        }
    };
</script>
