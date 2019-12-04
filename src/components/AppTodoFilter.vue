<template>
    <div>
        <div class="flex justify-between ">
        <div class="text-sm text-gray-500 font-bold uppercase tracking-wide  flex items-center justify-center ">
          Filter
        </div>
            <div>
                <a href="#"
                   v-for="(item, index) in filterItemsKey"
                   :key="index"
                   class="text-sm text-gray-500  inline-block px-1 uppercase tracking-wide hover:text-gray-900"
                   :class="{'text-gray-800' :currentFilter === Number.parseInt(item)}"
                   @click.prevent="filterList(item)"
                >
                    {{ FilterItems[item] }}
                </a>

            </div>
        </div>

        <slot name="heading"></slot>

        <slot :filteredList="filteredList"></slot>
    </div>
</template>

<script lang="ts">
    import Vue, {PropType} from 'vue';
    import {FilterItems, Todo} from "@/types.ts"

    export default Vue.extend({
        props: {
            items: {
                required: true,
                type: Array as PropType<Todo[]>
            }
        },
        data() {
            return {
                currentFilter: 0,
                FilterItems,
                filteredList: [] as Array<Todo>
            }
        },
        methods: {
            filterList(filterBy: FilterItems) {
                this.currentFilter = Number.parseInt(filterBy.toString());
                switch (+filterBy) {
                    case FilterItems.ALL:
                        this.filteredList =  this.items as Array<Todo>;
                        break;
                    case FilterItems.DONE:
                        this.filteredList = (this.items as Array<Todo>).filter((i) => i.done);
                        break;
                    case FilterItems.UNDONE:
                        this.filteredList = (this.items as Array<Todo>).filter((i) => !i.done);
                        break;
                    default:
                        this.filteredList =  this.items as Array<Todo>;
                }
            }
        },
        watch: {
            items: {
                handler() {
                    this.filterList(this.currentFilter)
                },
                immediate: true
            }
        },
        computed: {
            filterItemsKey(): Array<string> {
                return Object.keys(FilterItems).filter((key) => Number.isInteger(Number.parseInt(key)));
            },
        },
    })

</script>
