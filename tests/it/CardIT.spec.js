import { mount } from "@vue/test-utils";
import Card from "../../src/components/Card";
import CardBack from "../../src/components/CardBack";
import CardFront from "../../src/components/CardFront";

let wrapper = null;
let id = null;
let personalData = null;
let skills = null;

beforeEach(() => {

    id = 1;

    personalData = {
        photoUrl: "/images/avatar/large/steve.jpg",
        name: "Stefano Vannucchi",
        role: "Student",
        email: "stefano.vannucchi@stud.unifi.it",
        city: "Prato"
    };

    skills = [
        { id: "1", name: "Java" },
        { id: "2", name: "Spring Boot" },
        { id: "3", name: "Javascript" },
        { id: "4", name: "Vue js" }
    ];

    // mount method mounts automatically also child components
    wrapper = mount(Card, {
        propsData: {
            person: {
                id: id,
                personalData: personalData,
                skills: skills
            }
        }
    });

});

afterEach(() => {
    wrapper.destroy();
});

describe("Card.vue", () => {

    it("renders the CardFront component", () => {
        const cardFrontComponent =
            wrapper.findComponent(CardFront);

        expect(cardFrontComponent.vm.data)
            .toBe(personalData);
    });

    it("renders the CardBack component", () => {
        const cardBackComponent =
            wrapper.findComponent(CardBack);

        expect(cardBackComponent.vm.skills)
            .toBe(skills);

        expect(cardBackComponent.vm.id)
            .toBe(id);
    });

});
