<template>
    <div class="paginated-list">
        <div :class="{ 'input-group searcher': true, 'visible': hasSearcher }">
            <span class="input-group-addon"><i class="fa fa-search"></i></span>
            <input class="form-control" />
            <span class="fa fa-times clear-icon"></span>
        </div>
        <ul>
            <li v-for="item in items" v-bind:key="itemKey(item)"
                v-on:click="itemOnClick(item)" v-html="itemDrawer(item)">
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        props: {
            itemsFetcher: {
                type: Function,
                default: () => Promise.resolve([])
            },
            itemKey: {
                type: Function,
                default: (item) => item.Id
            },
            itemOnClick: {
                type: Function,
                default: (item) => {}
            },
            itemDrawer: {
                type: Function,
                default: (item) => item
            },
            hasSearcher: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                keywords: undefined,
                page: 0,
                pageSize: 10,
                items: []
            };
        },
        created() {
            this.update();
        },
        methods: {
            update () {
                this.itemsFetcher(this.keywords, this.page, this.pageSize)
                    .then(items => this.items = items);
            }
        }
    };
</script>
