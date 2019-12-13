<template>
    <div>
        <slot name="heading">
            <h2 class="font-bold uppercase tracking-wider text-lg mb-4">
                Meine Todos
            </h2>
        </slot>
        <app-todo-filter :items="todos">
            <template slot-scope="{ filteredList }">
                <app-todo-item
                        v-for="todo in filteredList"
                        :key="todo.id"
                        :item="todo"
                        @changed="updateTodo"
                        @delete="deleteTodo"
                />

                <slot name="no-entries">
                    <span
                            v-if="!filteredList.length"
                            class="text-gray-500 inline-block w-full text-center pt-4 pb-2"
                    >
                      Keine Einträge vorhanden!
                  </span>
                </slot>
            </template>
        </app-todo-filter>
    </div>
</template>

<script lang="ts">
    import Vue, {PropType} from 'vue';
    import AppTodoItem from "@/components/AppTodoItem.vue";
    import AppTodoFilter from "@/components/AppTodoFilter.vue";
    import {Todo} from "@/types.ts";


    export default Vue.extend({
            components: {
                AppTodoItem,
                AppTodoFilter,
            },
            data() {
                return {
                    form: {
                        todo: ''
                    }
                }
            },
            props: {
                todos: {
                    type: Array as PropType<Todo[]>,
                    required: false,
                    default: () => ([]),
                }
            },
            methods: {
                updateTodo(value: Todo): void {
                    this.$emit('update', value)
                },
                deleteTodo(value: Todo): void {
                    this.$emit('delete', value)
                },
            }
        }
    )

</script>
