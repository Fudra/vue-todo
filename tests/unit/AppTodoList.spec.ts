import {mount} from '@vue/test-utils'
import AppTodoList from '@/components/AppTodoList.vue'
import AppTodoItem from "@/components/AppTodoItem.vue";

describe('AppTodoList.vue', () => {
    it('renders a list of AppTodoItems', () => {

        const wrapper = mount(AppTodoList, {
            propsData: {
                todos: [
                    { id: 1, message: 'one', done: false },
                    { id: 2, message: 'two', done: false },
                ]
            }
        });

        expect(wrapper.findAll(AppTodoItem)).toHaveLength(2);
    });

    it('renders out the heading slot', () => {
        const wrapper = mount(AppTodoList, {
           slots: {
               heading: 'content'
           }
        });

        expect(wrapper.html()).toContain('content');
    });

    it('renders out the no-entries slot',  () => {
        const wrapper = mount(AppTodoList, {
            slots: {
                'no-entries': 'empty'
            }
        });

        expect(wrapper.html()).toContain('empty');
    });

    it.only('emits the edit event', async () => {
        const wrapper = mount(AppTodoList, {
            propsData: {
                todos: [
                    { id: 1, message: 'one', done: false },
                ]
            }
        });

         let updateTodo = jest.fn();

         wrapper.setMethods({
             updateTodo
         });

        let item = wrapper.find(AppTodoItem);
        item.trigger('changed');
        item.trigger('delete');
        //wrapper.trigger('changed');


        await  wrapper.vm.$nextTick();

        console.log(wrapper.find(AppTodoItem).emitted());
        console.log(wrapper.emitted());
        //expect(updateTodo).toBeCalled();
        // console.log(updateTodo.ca)
        // expect(wrapper.html()).toContain('empty');
    });

});
