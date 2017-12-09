<template>
    <div id="app" class="container">
        <navbar/>
        <router-view :key="$route.fullPath">
        </router-view>
        <hr />
        <footer>
            <p>&#169; 2017 - Skills Matrix</p>
        </footer>
    </div>
</template>

<script>
    import Navbar from '@/components/Navbar';

    export default {
        name: 'app',
        components: {
            Navbar
        }
    };
</script>
