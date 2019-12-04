<template>
    <div>
        <h2 slot="heading" class="font-bold uppercase tracking-wider text-lg mb-4">
            Meine Todos
        </h2>
        <!--        <pre>{{todos}}</pre>-->
        <app-todo-filter :items="todos">
            <template slot-scope="{ filteredList }">
                <app-todo-item
                        v-for="todo in filteredList"
                        :key="todo.id"
                        :item="todo"
                        @changed="updateTodo"
                        @delete="deleteTodo"
                />

                <span
                        v-if="!filteredList.length"
                        class="text-gray-500 inline-block w-full text-center pt-4 pb-2"
                >
                      Keine Einträge vorhanden!
                  </span>
            </template>
        </app-todo-filter>

       <div >
           <form action="#"
                 class="flex flex-row  mt-4 items-center h-10"
                 @submit.prevent="addTodoToList"
           >
               <input type="text"
                      class="form-input w-full block h-10"
                      name="todo"
                      v-model="form.todo"
                      required
                      placeholder="Add Todo"
               >
               <button type="submit" class=" w-10 bg-blue-400 hover:bg-blue-600 border hover:border-blue-600 border-blue-400 px-4 h-10 ml-3 text-xl font-bold leading-none text-white flex items-center justify-center flex-shrink-0 rounded ">
                   &plus;
               </button>
           </form>

       </div>

    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import AppTodoItem from "@/components/AppTodoItem.vue";
    import AppTodoFilter from "@/components/AppTodoFilter.vue";
    import {Todo} from "@/types.ts";


    export default Vue.extend({
            components: {
                AppTodoItem,
                AppTodoFilter
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
                    form:{
                        todo: ''
                    }
                }
            },
            methods: {
                addTodoToList() {
                   this.todos.push({
                       id: Date.now() ,
                       message: this.form.todo,
                       done: false,
                   });

                    this.form.todo = '';
                },
                updateTodo(value: Todo): void {
                    let idx = this.todos.findIndex((i) => i.id === value.id);
                    this.$set(this.todos, idx, value)
                },
                deleteTodo(value: Todo): void {
                    this.todos = this.todos.filter((i) => i.id !== value.id);
                },
            }
        }
    )

</script>
