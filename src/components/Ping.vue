<template>
  <div class="hello">
    {{ ping }}
    <button type="button" v-on:click="$router.push('pong')">Next</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      ping: 'Ping'
    }
  }
}
</script>
