<template>
    <div class="loader-wrapper">
        <div class="loader-animation">
            <div class="sk-chasing-dots">
                <div class="sk-child sk-dot1"></div>
                <div class="sk-child sk-dot2"></div>
            </div>
        </div>

        <div :class="{ 'loaded-content': true, 'loading': loading}">
            <div v-if="notFound">
                <h2>The selected skill does not exist</h2>
            </div>
            
            <div v-if="notFound == false">
                <div class="page-header">
                    <h2>{{ employee.Name || 'Employee name' }}</h2>
                </div>

                <div class="form-group">
                    <label for="Name">Name</label>
                    <input class="form-control" v-model="employee.Name" :disabled="mode == 'read'" />
                </div>

                <h3>Skills</h3>

                <paginated-list
                    v-if="mode == 'edit'"
                    :itemsFetcher="skillsFetcher"
                    :itemDrawer="newSkillDrawer"
                    :itemOnClick="addSkill"
                    :hasSearcher="true">
                </paginated-list>
                
                <paginated-list
                    :itemsFetcher="employeeSkills"
                    :itemDrawer="ownedSkillDrawer"
                    :itemOnClick="removeSkill">
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
                loading: true,
                employee: {
                    Id: 0,
                    Name: '',
                    Skills: []
                },
                employeeSkills: (keywords, page, pageSize) => 
                    Promise.resolve(paginatedListData(this.employee.Skills)),
                skillsFetcher: (keywords, page, pageSize) =>
                    keywords ?
                        Utils.stallPromise(this.skillService.getAll(keywords, page, pageSize), 500)
                        .then(paginatedContent => {
                            paginatedContent.Items =
                                Utils.leftOuterJoin(paginatedContent.Items, this.employee.Skills, 'Id');
                            return paginatedContent;
                        }) :
                        Promise.resolve([]),
                ownedSkillDrawer: skill => {
                    if (this.mode == 'read') {
                        return skill.Name;
                    }
                    return `<i class="fa fa-times text-danger"></i> ${skill.Name}`;
                },
                newSkillDrawer: skill => `<i class="fa fa-plus text-success"></i> ${skill.Name}`
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
                Utils.stallPromise(this.employeeService.getById(employeeId), 1000)
                .then(employee => {
                    if (employee) {
                        this.employee = employee;
                        this.employeeSkills = (keywords, page, pageSize) =>
                            Promise.resolve(paginatedListData(this.employee.Skills));
                    }
                    else {
                        this.notFound = true;
                    }
                    this.loading = false;
                });
            }
            else {
                this.loading = false;
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
                Utils.actionModal(
                    '<div>Are you sure you want to delete ' + this.employee.Name + '?</div>',
                    'Delete')
                .then(acceptance => {
                    if (acceptance) {
                        this.employeeService.remove(this.employee.Id)
                        .then(employee => {
                            this.$router.push('/employees');
                        });
                    }
                });
            },
            save() {
                if (this.employee.Name && this.employee.Name.length > 2) {
                    this.employeeService.save(this.employee).then(employee => {
                        this.$router.push(`/employee/${employee.Id}`);
                    });
                }
                else {
                    toastr.error(
                        'An employee must have a name with at least three characters',
                        'Invalid name',
                        {timeOut: 4000});
                }
            }
        }
    }
</script>
