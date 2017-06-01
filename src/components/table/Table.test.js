import React from 'react';
import renderer from "react-test-renderer";
import Table from "./MyTable";
import MyButton from "../button/MyButton";

describe("<MyTable/>", () => {
    let title="Teste Title";
    let columns=[
        {id:"Column_1", name:"Label_1"},
        {id:"Column_2", name:"Label_2"},
        {id:"Column_3", name:"Label_3"},
        {id:"Column_4", name:"Label_4"},
    ];
    let elements = [
        {Column_1:"Teste_1", Column_2:"Teste_2", Column_3:"Teste_3", Column_4:"Teste_4"},
        {Column_1:"Teste_5", Column_2:"Teste_6", Column_3:"Teste_7", Column_4:"Teste_8"},
        {Column_1:"Teste_9", Column_2:"Teste_10", Column_3:"Teste_12", Column_4:"Teste_13"}
    ];
    it('gerando o elemento sem quebrar', () => {
        const tree = renderer.create(<Table title={title} fields={columns} elements={elements} />);

        expect(tree.toJSON()).toMatchSnapshot();
    });
    
    /*columns.push({key:"Column_5", label:"Label_5"});
    elements = [
        {Label_1:"Teste_1", Label_2:"Teste_2", Label_3:"Teste_3", Label_4:"Teste_4", btn:<MyButton/>},
        {Label_1:"Teste_5", Label_2:"Teste_6", Label_3:"Teste_7", Label_4:"Teste_8", btn:<MyButton/>},
        {Label_1:"Teste_9", Label_2:"Teste_10", Label_3:"Teste_12", Label_4:"Teste_13", btn:<MyButton/>}
    ];
    it('renderizando um botao na linha da tabela', () => {
        const tree = shallow(<Table title={title} fields={columns} elements={elements} />);

        console.log("TTT", tree.find("button"))
        expect(tree.find("button").length).toBe(3);
    });*/
});