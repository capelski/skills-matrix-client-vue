<template>
    <div>
        <div class="page-header">
            <div class="row align-bottom">
                <div class="col-xs-6">
                    <h2>Employees</h2>
                </div>
                <div class="col-xs-6 text-right m-bottom-10">
                    <a class="btn btn-primary" href="#">
                        Create
                    </a>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-xs-12">
                <p>
                    Suspendisse et metus ligula. Nulla laoreet imperdiet magna, quis egestas sem rhoncus vitae. In non maximus sem, eget accumsan risus. Nam porttitor lorem at purus mollis dictum. Vestibulum eleifend lorem non est consectetur, vel dignissim eros cursus. Aenean magna tortor, fringilla vitae vulputate sit amet, ornare et eros. Vestibulum eget suscipit elit
                </p>
            </div>
        </div>

        <ul>
            <li v-for="employee in employees" v-bind:key="employee.Id">
                {{ employee.Name }}
            </li>
        </ul>
    </div>
</template>

<script>
    import EmployeeService from '@/services/employee-service';

    export default {
        data () {
            return {
                employees: []
            };
        },
        created() {
            EmployeeService.getEmployees().then(employees => this.employees = employees);
        }
    }
</script>
