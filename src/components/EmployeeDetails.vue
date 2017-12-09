<template>
    <div>
        <div class="page-header">
            <h2>{{ employee.Name }}</h2>
        </div>

        <form class="form-horizontal">

            <div class="form-group no-margin">
                <label for="Name">Name</label>
                <input class="form-control" v-model="employee.Name" :disabled="mode == 'read'" />
            </div>

            <h3>Skills</h3>
            <paginated-list
                :itemsFetcher="employeeSkills"
                :itemDrawer="(skill) => skill.Name"
                :itemOnClick="removeSkill">
            </paginated-list>

            <paginated-list
                v-if="mode == 'edit'"
                :itemsFetcher="skillsFetcher"
                :itemDrawer="(skill) => skill.Name"
                :itemOnClick="addSkill"
                :hasSearcher="true">
            </paginated-list>

            <!-- Read actions -->
            <div v-if="mode == 'read'">
                <button type="button" class="btn btn-primary" v-on:click="edit">Edit</button>
                <button type="button" class="btn btn-danger" v-on:click="remove">Delete</button>
            </div>

            <!-- Edit actions -->
            <div v-if="mode == 'edit'">
                <button type="button" class="btn btn-primary"
                    v-on:click="save">Save</button>
                <button type="button" class="btn btn-default" v-on:click="discardChanges">Cancel</button>
            </div>
        </form>
        
        <hr />
        <div v-if="employee.Id != 0">
            <button type="button" v-on:click="$router.push('/employees')">Employees list</button>
        </div>
    </div>
</template>

<script>
    import Utils from '@/utils';
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
                mode: 'read',
                employee: {
                    Id: 0,
                    Name: 'Employee name',
                    Skills: []
                },
                employeeSkills: (keywords, page, pageSize) => Promise.resolve(paginatedListData()),
                skillsFetcher: (keywords, page, pageSize) =>
                    keywords ?
                        this.skillService.getAll(keywords, page, pageSize)
                        .then(paginatedContent => {
                            paginatedContent.Items =
                                Utils.leftOuterJoin(paginatedContent.Items, this.employee.Skills, 'Id');
                            return paginatedContent;
                        }) :
                        Promise.resolve([])
            };
        },
        created() {
            this.employeeService = getInstance('EmployeeService');
            this.skillService = getInstance('SkillService');

            if (this.$route.path.indexOf('/edit/') > -1) {
                this.mode = 'edit';
            }

            var employeeId = this.$route.params.id;
            if (employeeId != 0) {
                this.employeeService.getById(employeeId)
                .then(employee => {
                    this.employee = employee;
                    this.employeeSkills = (keywords, page, pageSize) =>
                        Promise.resolve(paginatedListData(employee.Skills));
                });
            }
        },
        methods: {
            addSkill(skill) {
                this.employee.Skills.push(skill);
                return {
                    clearKeywords: true
                };
            },
            discardChanges() {
                if (this.employee.Id != 0) {
                    this.$router.push(`/employee/${this.employee.Id}`);
                }
                else {
                    this.$router.push('/employees');
                }
            },
            edit() {
                this.$router.push(`/employee/edit/${this.employee.Id}`);
            },
            removeSkill(skill) {
                if (this.mode == 'edit') {
                    this.employee.Skills = this.employee.Skills.filter(s => s.Id != skill.Id);
                    this.employeeSkills = (keywords, page, pageSize) =>
                        Promise.resolve(paginatedListData(this.employee.Skills));
                }
                else {
                    this.$router.push(`/skill/${skill.Id}`);
                }
            },
            remove() {
                this.employeeService.remove(this.employee.Id).then(employee => {
                    this.$router.push('/employees');
                });
            },
            save() {
                this.employeeService.save(this.employee).then(employee => {
                    this.$router.push(`/employee/${this.employee.Id}`);
                });
            }
        }
    }
</script>
