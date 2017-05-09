import React from 'react';
import renderer from "react-test-renderer";
import CardToShowMoreInTable from "./CardToShowMoreInTable";

describe("Testando o CardToShowMoreInTable", () => {
    it('', () => {
        const tree = renderer.create(<CardToShowMoreInTable elements={[{label:"Label 1", value:5},{label:"Label 2", value:10}]} />);

        expect(tree.toJSON()).toMatchSnapshot();
    })
});