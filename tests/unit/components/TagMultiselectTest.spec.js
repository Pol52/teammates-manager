import { shallowMount } from '@vue/test-utils';
import TagMultiselect from '../../../src/components/TagMultiselect';
import Multiselect from 'vue-multiselect';

let wrapper = null;

describe('TagMultiselect.vue', () => {
    let spyAddSkillMethod = null;

    beforeEach(() => {
        const mockMath = Object.create(global.Math)
        mockMath.random = () => 0.9;
        global.Math = mockMath;

        spyAddSkillMethod = jest.spyOn(TagMultiselect.methods, 'addSkill');

        wrapper = shallowMount(TagMultiselect, {
            propsData: {
                options: [],
                teammate: {
                    skills: []
                }
            }
        });
    })

    afterEach(() => {
        wrapper.destroy();
    })

    it('renders the multiselect', () => {
        const multiSelect = wrapper.findComponent(Multiselect);
        expect(multiSelect
            .exists())
            .toBeTruthy();
        expect(multiSelect
            .attributes('placeholder'))
            .toMatch('Search or add a new skill');
        expect(multiSelect
            .attributes('multiple'))
            .toBeTruthy();
        expect(multiSelect
            .attributes('taggable'))
            .toBeTruthy();
        expect(multiSelect
            .attributes('label'))
            .toMatch('name');
        expect(multiSelect
            .attributes('tagplaceholder'))
            .toMatch('Add this as a new skill');
        expect(multiSelect
            .attributes('trackby'))
            .toMatch('id')
    })

    it('triggers the addSkill function on tag event', async () => {

        await wrapper.vm.$forceUpdate();
        const multiselect = wrapper.findComponent(Multiselect);

        multiselect.vm.$emit('tag', 'skill');

        expect(spyAddSkillMethod).toBeCalledTimes(1)
        expect(wrapper.vm.options[0]
            .name)
            .toMatch('skill');
    })

    it('renders the teammate skills', async () => {
        const skill1 = {id: 1, name: 'skill1'};
        const skill2 = {id: 2, name: 'skill2'};
        wrapper.vm.teammate.skills.push(skill1);
        wrapper.vm.teammate.skills.push(skill2);
        await wrapper.vm.$nextTick()

        const multiSelect = wrapper.findComponent(Multiselect);

        expect(multiSelect.props().value.length)
            .toBe(2);
        expect(multiSelect.props().value[0])
            .toEqual(skill1);
        expect(multiSelect.props().value[1])
            .toEqual(skill2);
    })

    it('updates the options and skills array', async () => {
        const skill = {id: 1, name: 'skill1'};

        wrapper.vm.addSkill(skill.name);

        await wrapper.vm.$nextTick();

        expect(wrapper.vm.options.length)
            .toBe(1);
        expect(wrapper.vm.teammate.skills.length)
            .toBe(1);
    })

    it('sets the correct id if the options array is empty', async () => {
        const skill = {id: 1, name: 'skill1'};

        wrapper.vm.addSkill(skill.name);

        await wrapper.vm.$nextTick();

        expect(wrapper.vm.options[0])
            .toEqual(skill);
        expect(wrapper.vm.teammate.skills[0])
            .toEqual(skill);
    })

    it('sets the correct id if the options array is not empty', async () => {
        await wrapper.setProps({
            options: [
                {id: 1, name: 'skill1'}
            ]
        })
        const skill = {id: 2, name: 'skill2'};

        wrapper.vm.addSkill(skill.name);

        await wrapper.vm.$nextTick();

        expect(wrapper.vm.options[1])
            .toEqual(skill);
        expect(wrapper.vm.teammate.skills[0])
            .toEqual(skill);
    })
})

describe('Adding an existing skill removes it from the teammate', () => {

    beforeEach(() => {
        const mockMath = Object.create(global.Math)
        mockMath.random = () => 0.9;
        global.Math = mockMath;

        wrapper = shallowMount(TagMultiselect, {
            propsData: {
                options: [
                    {id:1, name: "Java"},
                    {id:2, name: "Vue js"}
                ],
                teammate: {
                    skills: [
                        {id:1, name: "Java"},
                        {id:2, name: "Vue js"}
                    ]
                }
            }
        });
    })

    afterEach(() => {
        wrapper.destroy();
    })

    it("removes the skill from the teammate's skills", async () => {
        const skillToRemain = { id: 1, name: 'Java' };
        const multiSelect = wrapper.findComponent(Multiselect);

        multiSelect.vm.$emit('input', [skillToRemain]);

        await wrapper.vm.$forceUpdate();

        expect(wrapper.vm.teammate.skills.length)
            .toBe(1);
        expect(wrapper.vm.teammate.skills)
            .toContainEqual(skillToRemain);
    })
})
