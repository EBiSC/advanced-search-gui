import { Store } from "./Store"
import { VARIANT, GENE } from "./Constants"
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import React from "react"
import Title from "./UI/Title"

configure({ adapter: new Adapter() });

//Unit Tests (Standard Edition)
describe("Store", () => {
    it("check user input", async () => {
        const store = new Store
        store.searchText = "rs2345"
        store.getInputType()
        expect(store.inputCategory).toEqual(VARIANT)
        store.searchText = "GO:0000811"
        store.getInputType()
        expect(store.inputCategory).toEqual(GENE)
        store.searchText = "SAMD9:c.2054G>A"
        store.getInputType()
        expect(store.inputCategory).toEqual(VARIANT)
        store.searchText = "BRCA2"
        let result = await store.getInputType()
        console.log(store.inputCategory)
        expect(store.inputCategory).toEqual(GENE)
    })

})


// Component Testing
describe('Title Component', () => {
    //is our Title Component even rendered? Let's make an assertion
    it('Title should render without throwing an error', () => {
        expect(shallow(<Title />).exists(<header></header>)).toBe(true)
    })
})

describe('Result Component', () => {
    //is our Title Component even rendered? Let's make an assertion
    it('Result is appearing on search', () => {
        //expect(shallow(<Title />).exists(<header></header>)).toBe(true)
    })
})



