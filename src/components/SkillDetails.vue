<template>
    <div>
        <div v-if="notFound">
            <h2>The selected skill does not exist</h2>
        </div>

        <div v-if="notFound == false">
            <div class="page-header">
                <h2>{{ skill.Name || 'Skill name' }}</h2>
            </div>

            <div class="form-group">
                <label for="Name">Name</label>
                <input class="form-control" v-model="skill.Name" :disabled="mode == 'read'" />
            </div>

            <h3>Employees</h3>
            <paginated-list
                :itemsFetcher="skillEmployees"
                :itemDrawer="ownedEmployeeDrawer"
                :itemOnClick="removeEmployee">
            </paginated-list>

            <paginated-list
                v-if="mode == 'edit'"
                :itemsFetcher="employeesFetcher"
                :itemDrawer="newEmployeeDrawer"
                :itemOnClick="addEmployee"
                :hasSearcher="true">
            </paginated-list>

            <div v-if="mode == 'read'">
                <button type="button" class="btn btn-primary" v-on:click="edit">Edit</button>
                <button type="button" class="btn btn-danger" v-on:click="remove">Delete</button>
            </div>

            <div v-if="mode == 'edit'">
                <button type="button" class="btn btn-primary"
                    v-on:click="save">Save</button>
                <button type="button" class="btn btn-default" v-on:click="discardChanges">Cancel</button>
            </div>
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
                notFound: false,
                skill: {
                    Id: 0,
                    Name: '',
                    Employees: []
                },
                skillEmployees: (keywords, page, pageSize) =>
                    Promise.resolve(paginatedListData(this.skill.Employees)),
                employeesFetcher: (keywords, page, pageSize) =>
                    keywords ?
                        this.employeeService.getAll(keywords, page, pageSize)
                        .then(paginatedContent => {
                            paginatedContent.Items =
                                Utils.leftOuterJoin(paginatedContent.Items, this.skill.Employees, 'Id');
                            return paginatedContent;
                        }) :
                        Promise.resolve([]),
                ownedEmployeeDrawer: employee => {
                    if (this.mode == 'read') {
                        return employee.Name;
                    }
                    return `<i class="fa fa-times text-danger"></i> ${employee.Name}`;
                },
                newEmployeeDrawer: employee => `<i class="fa fa-plus text-success"></i> ${employee.Name}`
            };
        },
        created() {
            this.skillService = getInstance('SkillService');
            this.employeeService = getInstance('EmployeeService');

            if (this.$route.path.indexOf('/edit/') > -1) {
                this.mode = 'edit';
            }

            var skillId = this.$route.params.id;
            if (skillId != 0) {
                this.skillService.getById(skillId)
                .then(skill => {
                    if (skill) {
                        this.skill = skill;
                        this.skillEmployees = (keywords, page, pageSize) =>
                            Promise.resolve(paginatedListData(this.skill.Employees));
                    }
                    else {
                        this.notFound = true;
                    }
                });
            }
        },
        methods: {
            addEmployee(employee) {
                this.skill.Employees.push(employee);
                return {
                    clearKeywords: true
                };
            },
            discardChanges() {
                if (this.skill.Id != 0) {
                    this.$router.push(`/skill/${this.skill.Id}`);
                }
                else {
                    this.$router.push('/skills');
                }
            },
            edit() {
                this.$router.push(`/skill/edit/${this.skill.Id}`);
            },
            removeEmployee(employee) {
                if (this.mode == 'edit') {
                    this.skill.Employees = this.skill.Employees.filter(s => s.Id != employee.Id);
                    this.skillEmployees = (keywords, page, pageSize) =>
                        Promise.resolve(paginatedListData(this.skill.Employees));
                }
                else {
                    this.$router.push(`/employee/${employee.Id}`);
                }
            },
            remove() {
                Utils.actionModal(
                    '<div>Are you sure you want to delete ' + this.skill.Name + '?</div>',
                    'Delete')
                .then(acceptance => {
                    console.log(acceptance)
                    if (acceptance) {
                        this.skillService.remove(this.skill.Id)
                        .then(skill => {
                            this.$router.push('/skills');
                        });
                    }
                });
            },
            save() {
                if (this.skill.Name && this.skill.Name.length > 2) {
                    this.skillService.save(this.skill).then(skill => {
                        this.$router.push(`/skill/${skill.Id}`);
                    });
                }
                else {
                    toastr.error(
                        'A skill must have a name with at least three characters',
                        'Invalid name',
                        {timeOut: 4000});
                }
            }
        }
    }
</script>
