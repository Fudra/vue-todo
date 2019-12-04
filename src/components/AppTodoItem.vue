<template>
    <div class="flex p-2 border-b justify-between items-center">
        <div class="flex flex-row items-center w-full">
            <input type="checkbox"
                   class="form-checkbox"
                   v-model="currentTodo.done">
            <div
                    v-if="!isEditing"
                    class="block ml-3 p-2 w-full cursor-text"
                    :class="{ 'text-gray-500 line-through': currentTodo.done}"
                    @click.prevent="isEditing = true"
            >
                {{currentTodo.message}}
            </div>
            <template v-if="isEditing">
                <label for="edit-todo-item">
                    <input type="text" class="form-input border-0 ml-2 w-full"
                           :ref="itemName"
                           id="edit-todo-item"
                           @keydown.enter="saveChanges"
                           @keydown.esc="cancelChanges"
                           @blur="cancelChanges"
                           v-model="editedTodo">
                </label>
            </template>
        </div>

        <div>
            <a href="#"
               class="inline-block ml-6 w-8 h-8 text-sm text-gray-600 hover:text-red-600 flex justify-center items-center"
               @click.prevent="deleteItem"
            >
                <svg  width="24" height="24" class="fill-current">
                    <path  d="M8 6V4c0-1.1.9-2 2-2h4a2 2 0 012 2v2h5a1 1 0 010 2h-1v12a2 2 0 01-2 2H6a2 2 0 01-2-2V8H3a1 1 0 110-2h5zM6 8v12h12V8H6zm8-2V4h-4v2h4zm-4 4a1 1 0 011 1v6a1 1 0 01-2 0v-6a1 1 0 011-1zm4 0a1 1 0 011 1v6a1 1 0 01-2 0v-6a1 1 0 011-1z"/>
                </svg>
            </a>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue, {PropType} from 'vue';
    import {clone} from 'lodash';
    import {Todo} from "@/types.ts"

    export default Vue.extend({
        data() {
            return {
                currentTodo: {} as Todo,
                isEditing: false as boolean,
                editedTodo: ''
            }
        },
        props: {
            item: {
                required: true,
                type: Object as PropType<Todo>
            }
        },
        watch: {
            item: {
                handler(value: Todo): void {
                    this.currentTodo = clone(value);
                },
                immediate: true,
            },
            currentTodo: {
                handler(newValue: Todo): void {
                    if (
                        newValue.done !== this.item.done ||
                        newValue.message !== this.item.message
                    ) {
                        this.$emit('changed', newValue);
                    }

                },
                deep: true
            },
            isEditing: {
                handler(value: boolean): void {
                    this.editedTodo = clone(this.currentTodo.message);
                    if (value) {
                        this.$nextTick(() => {
                            (this.$refs[this.itemName] as HTMLElement).focus()
                        })
                    }
                }
            },
        },
        methods: {
            deleteItem() {
                this.$emit('delete', this.item);
            },
            saveChanges() {
                this.isEditing = false;
                this.currentTodo.message = clone(this.editedTodo);
                this.editedTodo = ''

            },
            cancelChanges() {
                this.isEditing = false;
                this.editedTodo = '';
            }
        },
        computed: {
            itemName(): string {
                return `edit-${this.item.id}`;
            }
        }
    })
</script>
