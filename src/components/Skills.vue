<template>
    <div>
        <div class="page-header">
            <div class="row align-bottom">
                <div class="col-xs-6">
                    <h2>Skills</h2>
                </div>
                <div class="col-xs-6 text-right m-bottom-10">
                    <button 
                        v-on:click="() => $router.push('/skill/edit/0')"
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
            :itemsFetcher="skillsFetcher"
            :itemDrawer="(skill) => skill.Name"
            :itemOnClick="(skill) => $router.push(`/skill/${skill.Id}`)"
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
                skillsFetcher: (keywords, page, pageSize) =>
                    Utils.stallPromise(this.skillService.getAll(keywords, page, pageSize), 1000)
            };
        },
        created() {
            this.skillService = getInstance('SkillService');
        }
    }
</script>
