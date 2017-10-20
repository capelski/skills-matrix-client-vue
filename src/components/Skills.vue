<template>
    <div>
        <div class="page-header">
            <div class="row align-bottom">
                <div class="col-xs-6">
                    <h2>Skills</h2>
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

        <paginated-list :itemsFetcher="skillsFetcher"
            :itemDrawer="(skill) => skill.Name"
            :itemOnClick="(skill) => $router.push(`/skill/${skill.Id}`)"
            :hasSearcher="true">
        </paginated-list>

        <button type="button" v-on:click="$router.push('/home')">Return to home page</button>
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
                skillsFetcher: (keywords, page, pageSize) =>
                    this.skillService.getAll(keywords, page, pageSize)
                    .then(paginatedList => paginatedList.Items) // TODO Remove this transformation
            };
        },
        created() {
            this.skillService = getInstance('SkillService');
        }
    }
</script>
