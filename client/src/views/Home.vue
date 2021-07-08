<template>
  <div class="home">
    <h1>Henlooooo!!</h1>
    <Albums/>
  </div>
</template>

<script>
// @ is an alias to /src
import Albums from '@/components/Albums.vue'

export default {
  name: 'Home',
  components: {
    Albums
  }
}
</script>
