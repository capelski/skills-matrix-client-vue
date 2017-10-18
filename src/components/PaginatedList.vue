<template>
    <div class="paginated-list">
        <ul>
            <li v-for="item in items" v-bind:key="itemKey(item)"
                v-on:click="itemOnClick(item)">
                {{ item.Name }}
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
            }
        }
    };
</script>
