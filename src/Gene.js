import { action } from "mobx"
import Store from "./Store"
import Query from "./Query"

class Gene {
    @action
    async  getCellLine() {
        Store.loading = true
        let query = new Query()
        query.setMaxAlleleFreq()
        query.setConsequence()
        query.send()
    }
}

export default new Gene()