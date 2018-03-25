import { observable, action } from "mobx"
import Store from "./Store"
import Query from "./Query"
import { EnsemblVariationURL } from "./Config"

// Prepares and sends off Variant related Queries
class Variant {
    @observable name = ""

    @action
    async  getCellLineFromVariant() {
        Store.loading = true
        if (await this.variantLocation()) {
            let query = new Query()
            query.setMaxAlleleFreq()
            query.setZygosity()
            query.send()
        }
    }

    // Gets a variant's location before sending it off to htsget as htsget requires a location
    async variantLocation() {
        let url = `${EnsemblVariationURL}${this.name}?content-type=application/json`
        let x = await Store.fetchStuff(url)
        if (x.mappings) {
            Store.variantStart = x.mappings[0].start
            Store.variantEnd = x.mappings[0].end
            Store.variantRegion = x.mappings[0].seq_region_name
            return true
        }
        else {
            Store.loading = false
            Store.dialog.title = "Error"
            Store.dialog.content = "ERROR: " + x.error
            return false
        }
    }
}

export default new Variant()