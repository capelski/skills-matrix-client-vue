<template>
    <div>
        <div class="page-header">
            <div class="row align-bottom">
                <div class="col-xs-6">
                    <h2>Employees</h2>
                </div>
                <div class="col-xs-6 text-right m-bottom-10">
                    <button 
                        v-on:click="() => $router.push('/employee/edit/0')"
                        class="btn btn-primary">
                        Create
                    </button>
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

        <paginated-list
            :itemsFetcher="employeesFetcher"
            :itemDrawer="(employee) => employee.Name"
            :itemOnClick="(employee) => $router.push(`/employee/${employee.Id}`)"
            :hasSearcher="true"
            :hasPagination="true">
        </paginated-list>
    </div>
</template>

<script>
    import Utils from '@/utils';
    import { getInstance } from '@/service-locator';
    import PaginatedList from '@/components/PaginatedList';

    export default {
        components: {
            PaginatedList
        },
        data () {
            return {
                employeesFetcher: (keywords, page, pageSize) =>
                    Utils.stallPromise(this.employeeService.getAll(keywords, page, pageSize), 1000)
            };
        },
        created() {
            this.employeeService = getInstance('EmployeeService');
        }
    }
</script>
