import Store from "./Store"
import { VARIANT, GENE } from "./Constants"
const VariantURL = "https://wp-p2m-e0:8080/api/variants/fetch"
const GeneURL = "https://wp-p2m-e0:8080/api/genes/fetch"

// All the Queries to the HTSGET API start here
export default class Query {

    constructor() {
        this.query = Store.query
        this.fields = Store.fields
    }

    setMaxAlleleFreq() {
        if (Store.allelefreqToggle) {
            if (Store.inputCategory === VARIANT)
                this.query.allele_freq = ["<" + (Store.allelefreq)]
            if (Store.inputCategory === GENE)
                this.query.variants.allele_freq = "<" + (Store.allelefreq)
        }
    }

    setConsequence() {
        if (Store.selectedConsequence !== "") {
            this.query.variants.consequences = { Consequence: Store.selectedConsequence.replace(/ /g, "_") }
            return true
        }
        else {
            console.log(Store.selectedConsequence)
            Store.dialog.title = "No Variation Consequence?"
            Store.dialog.content = `Please select a variation consequence`
            Store.loading = false
            return false
        }
    }

    setZygosity() {
        if (Store.zygosity !== "All")
            this.query.genotypes = { heterozygosity: Store.zygosity === "Heterozygous" ? true : false }
    }

    async send() {
        let saveURL = {
            inputType: Store.inputType, allele_freq: Store.allelefreq, allelefreqToggle: Store.allelefreqToggle, category: Store.inputCategory, searchText: Store.searchText,
            zygosity: Store.zygosity, consequence: Store.selectedConsequence
        }
        saveURL = JSON.stringify(saveURL)
        saveURL = window.location.href.split("?")[0] + "?share=" + saveURL
        console.log("Saved URL ", saveURL)
        Store.savedQuery = saveURL

        console.log(this.query)
        console.log(JSON.stringify(this.fields))
        let url
        if (Store.inputCategory === VARIANT)
            url = `${VariantURL}?fields=${JSON.stringify(this.fields)}&query=${JSON.stringify(this.query)}`
        if (Store.inputCategory === GENE)
            url = `${GeneURL}?fields=${JSON.stringify(this.fields)}&query=${JSON.stringify(this.query)}`
        console.log(url)
        let result
        try {
            result = await Store.fetchStuff(url)
            result = result.results
            Store.loading = false
            console.log(result)
            if (result.length !== 0)
                this.formatResults(result)
            else {
                Store.dialog.title = "No Results"
                Store.dialog.content = "No Results were found. Try searching for something else or expand your filters"
            }
        }
        catch (e) {
            Store.dialog.title = "Error"
            Store.dialog.content = e + ". Please ensure that you're connected to VPN"
            Store.loading = false
        }
    }

    formatResults(results) {
        // console.log(results)
        if (Store.inputCategory === GENE) {
            if (results[0].variants) {
                results = results[0].variants
                Store.results = results
                //TEMP
                localStorage["results"] = JSON.stringify(results)
            }
            else {
                Store.dialog.title = "No Results"
                Store.dialog.content = "No Results were found. Try searching for something else or expand your filters"
            }
        }
        else Store.results = results
    }
}

