import { observable, action } from "mobx"
import Store from "./Store"
import Query from "./Query"

const URL = "https://rest.ensembl.org/variation/human/"

class Variant {

    @observable name = ""

    @action
    async  getCellLineFromVariant() {
        Store.loading = true
        await this.variantLocation()
        let query = new Query()
        query.setMaxAlleleFreq()
        query.setZygosity()
        query.send()
    }

    async variantLocation() {
        let url = `${URL}${this.name}?content-type=application/json`
        try {
            let x = await Store.fetchStuff(url)
            console.log(x)
            if (x.mappings) {
                Store.variantStart = x.mappings[0].start
                Store.variantEnd = x.mappings[0].end
                Store.variantRegion = x.mappings[0].seq_region_name
            }
        }
        catch (e) {
            Store.loading = false
            Store.searchError = "ERROR: " + e
        }
    }
}

export default new Variant()