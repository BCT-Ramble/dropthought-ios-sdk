export default ClassicMultiChoiceQuestion;
declare class ClassicMultiChoiceQuestion extends React.PureComponent<any, any, any> {
    constructor(props: any);
    onChangeValueHandler(index: any, newValue: any): void;
    onOptionPressHandler(index: any): void;
    feedback(values: any, otherText: any): void;
    renderOptions(): any;
}
import React from "react";