import Store from "./Store"
import { VARIANT, GENE } from "./Constants"
import { VariantURL, GeneURL } from "./Config"

// All the Queries to the HTSGET API start here
export default class Query {
    constructor() {
        this.query = Store.query
        this.fields = Store.fields
    }

    //Setting MAF
    setMaxAlleleFreq() {
        if (Store.allelefreqToggle) {
            if (Store.inputCategory === VARIANT)
                this.query.allele_freq = ["<" + (Store.allelefreq)]
            if (Store.inputCategory === GENE)
                this.query.variants.allele_freq = "<" + (Store.allelefreq)
        }
    }

    //Setting Consequence
    setConsequence() {
        if (Store.selectedConsequence !== "") {
            if (Store.selectedConsequence !== "loss of function")
                this.query.variants.consequences = { Consequence: Store.selectedConsequence.replace(/ /g, "_") }
            else
                this.query.variants.consequences = { Consequence: ["5_prime_UTR_variant", "splice_acceptor_variant", "splice_donor_variant"] }
            return true
        }
        else {
            Store.dialog.title = "No Variation Consequence?"
            Store.dialog.content = `Please select a variation consequence`
            Store.loading = false
            return false
        }
    }

    //Setting Zygosity Option
    setZygosity() {
        if (Store.zygosity !== "All")
            this.query.genotypes = { heterozygosity: Store.zygosity === "Heterozygous" ? true : false }
    }

    async send() {
        // Saving URL to share later
        let saveURL = {
            inputType: Store.inputType, allele_freq: Store.allelefreq, allelefreqToggle: Store.allelefreqToggle, category: Store.inputCategory, searchText: Store.searchText,
            zygosity: Store.zygosity, consequence: Store.selectedConsequence
        }
        saveURL = JSON.stringify(saveURL)
        saveURL = window.location.href.split("?")[0] + "?share=" + saveURL
        Store.savedQuery = saveURL

        // Sending off the query request
        console.log(this.query)
        //console.log(JSON.stringify(this.fields))
        let url
        if (Store.inputCategory === VARIANT)
            url = `${VariantURL}?fields=${JSON.stringify(this.fields)}&query=${JSON.stringify(this.query)}`
        if (Store.inputCategory === GENE)
            url = `${GeneURL}?fields=${JSON.stringify(this.fields)}&query=${JSON.stringify(this.query)}`

        try {
            let result = await Store.fetchStuff(url)
            result = result.results
            Store.loading = false
            console.log(result)
            if (result.length !== 0) {
                this.formatResults(result)
            }
            else {
                Store.dialog.title = "No Results"
                Store.dialog.content = "No Results were found. Try searching for something else or expand your filters"
            }
        }
        catch (e) {
            Store.dialog.title = "Error"
            Store.dialog.content = e
            Store.loading = false
        }
    }

    formatResults(results) {
        if (Store.inputCategory === GENE) {
            if (results[0].variants) {
                results = results[0].variants
                Store.results = results
            }
            else {
                Store.dialog.title = "No Results"
                Store.dialog.content = "No Results were found. Try searching for something else or expand your filters"
            }
        }
        else Store.results = results
    }
}