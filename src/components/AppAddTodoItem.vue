<template>
    <form action="#"
          class="flex flex-row  mt-4 items-center h-10 w-full"
          @submit.prevent="addTodoToList"
    >
        <label for="add-todo" class="w-full">
            <input type="text"
                   class="form-input w-full block h-10"
                   name="todo"
                   id="add-todo"
                   v-model="form.todo"
                   required
                   placeholder="Add Todo"
            >
        </label>
        <button type="submit"
                class=" w-10 bg-blue-400 hover:bg-blue-600 border hover:border-blue-600 border-blue-400 px-4 h-10 ml-3 text-xl font-bold leading-none text-white flex items-center justify-center flex-shrink-0 rounded ">
            &plus;
        </button>
    </form>
</template>

<script lang="ts">
    import Vue, {PropType} from 'vue';

    export default Vue.extend({
        data() {
            return {
                form: {
                    todo: ''
                }
            }
        },
        methods: {
            addTodoToList() {
                this.$emit('added' ,{
                    id: Date.now(),
                    message: this.form.todo,
                    done: false,
                });

                this.form.todo = '';
            },
        }

    })

</script>
