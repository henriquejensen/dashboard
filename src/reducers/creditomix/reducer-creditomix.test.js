import reducerCreditoMix from "./reducer-creditomix"
import * as constants from "../../constants/constantsCreditoMix"
import model from "../data/creditomix/consultaCreditoMix.json"

describe("Teste does reducers da CreditoMix", () => {
    let mockState = {
        loading: false,
        status: "",
        message: "",
        response: {},
        tabActive: "",
        lastQueries: {},
        type: ""
    }

    it("STATE DEFAULT", () => {
        expect(reducerCreditoMix(undefined,{})).toEqual(mockState)
    })

    it("Return reducer response.model from "+constants.SHOW_CREDITOMIX_MODEL, () => {
        expect(reducerCreditoMix({},{type:constants.SHOW_CREDITOMIX_MODEL}).response.model).toEqual(model)
    })

    it("Return reducer type from "+constants.CHANGE_CREDITOMIX_TYPE, () => {
        expect(reducerCreditoMix({},{type:constants.CHANGE_CREDITOMIX_TYPE, payload:"cheque"}).type).toEqual("CHEQUE")
    })
})