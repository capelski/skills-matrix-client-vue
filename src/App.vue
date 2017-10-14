<template>
    <div id="app">
        <nav>
            <button type="button" v-on:click="$router.push('ping')">Ping</button>
            <button type="button" v-on:click="$router.push('pong')">Pong</button>
            <button type="button" v-on:click="$router.push('home')">Home</button>
        </nav>
        <br />
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: 'app'
    };
</script>
