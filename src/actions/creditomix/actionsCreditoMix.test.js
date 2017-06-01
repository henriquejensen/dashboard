import * as actions from "./actionsCreditoMix"
import * as constants from "../../constants/constantsCreditoMix"

describe("Teste das actions CreditoMix", () => {
    it("should have a type " + constants.SHOW_CREDITOMIX_MODEL, () => {
        expect(actions.showCreditoMixModel().type).toEqual(constants.SHOW_CREDITOMIX_MODEL)
    })

    it("should have a type and payload " + constants.CHANGE_TAB_CREDITOMIX, () => {
        expect(actions.changeTab("1")).toEqual({type:constants.CHANGE_TAB_CREDITOMIX, payload:"1"})
    })

    it("should have a type and payload " + constants.CLOSE_TAB_CREDITOMIX, () => {
        expect(actions.closeTab("1")).toEqual({type:constants.CLOSE_TAB_CREDITOMIX, payload:"1"})
    })

    it("should have a type " + constants.LOADING_CREDITO_MIX, () => {
        expect(actions.loadingCreditoMix().type).toEqual(constants.LOADING_CREDITO_MIX)
    })

    it("should have a type " + constants.CLOSE_MESSAGE_ERROR_CREDITOMIX, () => {
        expect(actions.closeMessageErrorCreditoMix().type).toEqual(constants.CLOSE_MESSAGE_ERROR_CREDITOMIX)
    })
})