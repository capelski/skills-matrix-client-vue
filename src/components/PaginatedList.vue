<template>
    <div class="paginated-list">
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
            items: {
                type: Array,
                default: () => []
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
            }
        }
    };
</script>
