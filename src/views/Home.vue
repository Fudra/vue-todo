<template>
    <div class>
        <AppTodoList
                :todos="todos"
                @update="updateTodo"
                @delete="deleteTodo"
        />

        <AppAddTodoItem
                class="w-full"
                @added="addTodo"/>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import AppTodoList from '@/components/AppTodoList.vue'
    import AppAddTodoItem from "@/components/AppAddTodoItem.vue";
    import {Todo} from "@/types";


    export default Vue.extend({
        name: 'home',
        components: {
            AppTodoList,
            AppAddTodoItem
        },
        data() {
            return {
                todos: [
                    {
                        id: 1,
                        message: "One",
                        done: false
                    },
                    {
                        id: 2,
                        message: "Two",
                        done: false
                    },
                    {
                        id: 3,
                        message: "Tree",
                        done: true
                    }
                ],
            }
        },
        methods: {
            deleteTodo(value: Todo): void {
                this.todos = this.todos.filter((i: Todo) => i.id !== value.id);
            },
            updateTodo(value: Todo): void {
                let idx = this.todos.findIndex((i: Todo) => i.id === value.id);
                this.$set(this.todos, idx, value)
            },
            addTodo(value: Todo) {
                this.todos.push(value);
            }
        }
    });
</script>
