<template>
  <div class>
    <AppTodoList />
  </div>
</template>

<script>
// @ is an alias to /src
import AppTodoList from '@/components/AppTodoList.vue'

export default {
  name: 'home',
  components: {
    AppTodoList
  }
}
</script>
