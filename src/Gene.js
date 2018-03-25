import { action } from "mobx"
import Store from "./Store"
import Query from "./Query"
// Prepares and sends off Gene related Queries
class Gene {
    @action
    async  getCellLine() {
        Store.loading = true
        let query = new Query()
        query.setMaxAlleleFreq()
        if (query.setConsequence())
            query.send()
    }
}

export default new Gene()