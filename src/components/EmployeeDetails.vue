<template>
    <div>
        <div class="page-header">
            <h2>{{ employee.Name }}</h2>
        </div>

        <form class="form-horizontal">

            <div class="form-group no-margin">
                <label for="Name">Name</label>
                <input id="employee-model-name" value="" class="form-control"/>
            </div>

            <h3>Skills</h3>
            <paginated-list :itemsFetcher="skillsFetcher"
                :itemDrawer="(skill) => skill.Name"
                :itemOnClick="(skill) => $router.push(`/skill/${skill.Id}`)">
            </paginated-list>

            <div id="employee-details-skills"></div>
            <div id="employee-details-add-skills"></div>

            <!-- Read actions -->
            <a id="employee-edit-button" class="btn btn-primary" href="#">Edit</a>
            <button id="employee-delete-button" type="button" class="btn btn-danger">Delete</button>

            <!-- Edit actions -->
            <button id="employee-save-button" type="button" class="btn btn-primary">Save</button>
            <a id="employee-cancel-button" class="btn btn-default" href="#">Cancel</a>
        </form>
        
        <hr />
        <button type="button" v-on:click="$router.push('/employees')">Employees list</button>
    </div>
</template>

<script>
    import { getInstance } from '@/service-locator';
    import PaginatedList from '@/components/PaginatedList';

    function paginatedListData(items) {
        return {
            CurrentPage: 0,
            Items: items || [],
            TotalPages: 1,
            TotalRecords: (items || []).length
        };
    }

    export default {
        components: {
            PaginatedList
        },
        data() {
            return {
                employee: {},
                skillsFetcher: (keywords, page, pageSize) => Promise.resolve(paginatedListData())
            };
        },
        created() {
            this.employeeService = getInstance('EmployeeService');
            this.employeeService.getById(this.$route.params.id)
            .then(employee => {
                this.employee = employee;
                this.skillsFetcher = (keywords, page, pageSize) =>
                    Promise.resolve(paginatedListData(employee.Skills));
            });
        }
    }
</script>
