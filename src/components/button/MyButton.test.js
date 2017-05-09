import React from 'react';
import renderer from "react-test-renderer";
import MyButton from "./MyButton";
import { shallow } from 'enzyme';

describe("<MyButton/>", () => {
    let tooltip="toolTipConsultar";
    let labelButton="Documento"
    
    it('gerando o elemento sem quebrar', () => {
        const tree = renderer.create(<MyButton tooltip={tooltip} label={labelButton} />);

        expect(tree.toJSON()).toMatchSnapshot();
    });
});