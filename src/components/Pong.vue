<template>
  <div class="hello">
    {{ pong }}
    <button type="button" v-on:click="$router.push('ping')">Next</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      pong: 'Pong'
    }
  }
}
</script>
