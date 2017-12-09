<template>
    <div class="paginated-list">
        <div :class="{ 'input-group searcher': true, 'visible': hasSearcher }">
            <span class="input-group-addon"><i class="fa fa-search"></i></span>
            <input class="form-control" v-model="keywords" v-on:keyup="search" />
            <span class="fa fa-times clear-icon"></span>
        </div>
        <ul>
            <li v-for="item in data.Items" v-bind:key="itemKey(item)"
                v-on:click="_itemOnClick(item)" v-html="itemDrawer(item)">
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
                    {{pageSize}} <span class="caret"></span>
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
                    <li v-for="size in pageSizes" v-bind:key="size" class="text-right"
                        v-on:click="pageSizeUpdated(size)">
                        <span class="dropdown-option">{{size}}</span>
                    </li>
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
                
                maxPages: 5,
                pages: [1, 2, 3, 4, 5],
                currentPage: 1,
                pageOffset: 0,

                pageSizes: [10, 15, 25],
                pageSize: 10,

                data: {
                    CurrentPage: 0,
                    Items: [],
                    TotalPages: 1,
                    TotalRecords: 10
                }
            };
        },
        watch: {
            itemsFetcher (newVal, oldVal) {
                this.update();
            }
        },
        created() {
            this.update();
        },
        methods: {
            update () {
                this.itemsFetcher(this.keywords, this.currentPage - 1 + this.pageOffset, this.pageSize)
                    .then(paginatedData => {
                        this.data = paginatedData;
                        var availablePages = this.data.TotalPages - this.pageOffset;
                        var pageBarPages = Math.min(availablePages, this.maxPages);
                        this.pages = [];
                        for (var i = 1; i <= pageBarPages; ++i) {
                            this.pages.push(i);
                        }
                    });
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
            },
            pageSizeUpdated (size) {
                var isSizeChange = this.pageSize != size;
                this.pageSize = size;
                if (isSizeChange) {
                    this.pageOffset = 0;
                    this.currentPage = 1;
                    this.update();
                }
            },
            _itemOnClick(item) {
                var additionalActions = this.itemOnClick(item);
                if (additionalActions) {
                    this.keywords = additionalActions.clearKeywords ? undefined : this.keywords;
                    this.update();
                }
            }
        }
    };
</script>
