<template>
    <div class="paginated-list">
        <div :class="{ 'input-group searcher': true, 'visible': hasSearcher }">
            <span class="input-group-addon"><i class="fa fa-search"></i></span>
            <input class="form-control" v-model="keywords" v-on:keyup="search" />
            <span class="fa fa-times clear-icon"></span>
        </div>
        <ul>
            <li v-for="item in data.Items" v-bind:key="itemKey(item)"
                v-on:click="itemOnClick(item)" v-html="itemDrawer(item)">
            </li>
        </ul>
        <div :class="{ 'pagination-bar': true, 'visible': hasPagination }">
            <ul class="pagination clickable">
                <li :class="[pageOffset - pages.length >= 0 ? 'enabled' : 'disabled']">
                    <span class="page-button" v-on:click="pageUpdated('previous')">&laquo;</span>
                </li>
                <li v-for="pageNumber in pages" v-bind:key="pageNumber" v-on:click="pageUpdated(pageNumber)"
                    :class="[currentPage == pageNumber ? 'active' : 'enabled']">
                        <span class="page-button"> {{ pageOffset + pageNumber }}</span>
                </li>
                <li :class="[pageOffset + pages.length < data.TotalPages ? 'enabled' : 'disabled']">
                    <span class="page-button" v-on:click="pageUpdated('next')">&raquo;</span>
                </li>
            </ul>
            <div class="dropup pull-right">
                <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1"
                data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                    <span id="${listHtmlId}-page-size">10</span>
                    <span class="caret"></span>
                </button>
                <ul id="${listHtmlId}-page-size-dropdown" class="dropdown-menu"
                aria-labelledby="dropdownMenu1">
                </ul>
            </div>
            <div class="clearfix"></div>
        </div>
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
            },
            hasPagination: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                keywords: undefined,
                searcherTimeout: undefined,
                
                pages: [1, 2, 3, 4, 5],
                currentPage: 1,
                pageOffset: 0,

                pageSize: 10,

                data: {
                    CurrentPage: 0,
                    Items: [],
                    TotalPages: 1,
                    TotalRecords: 10
                }
            };
        },
        created() {
            this.update();
        },
        methods: {
            update () {
                this.itemsFetcher(this.keywords, this.currentPage - 1 + this.pageOffset, this.pageSize)
                    .then(paginatedData => this.data = paginatedData);
            },
            search() {
                if (this.searcherTimeout) {
                    clearTimeout(this.searcherTimeout);
                }
                this.searcherTimeout = setTimeout(this.update, 400);
            },
            pageUpdated (newPageNumber) {
                var isPageChange = false;
                if (!isNaN(newPageNumber)) {
                    isPageChange = this.currentPage != newPageNumber;
                    this.currentPage = newPageNumber;
                }
                else if (newPageNumber === 'previous' && (this.pageOffset - this.pages.length) >= 0) {
                    isPageChange = true;
                    this.currentPage = 1;
                    this.pageOffset -= this.pages.length;
                }
                else if (newPageNumber === 'next' && (this.pageOffset + this.pages.length) < this.data.TotalPages) {
                    isPageChange = true;
                    this.currentPage = 1;
                    this.pageOffset += this.pages.length;
                }

                if (isPageChange) {
                    this.update();
                }
            }
        }
    };
</script>
