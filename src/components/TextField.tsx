import { Button, TextField } from "@mui/material";
import styled, { ThemeProvider } from "styled-components";
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Provider, connect } from 'react-redux';
import { bindActionCreators, Dispatch } from "redux";
import { setConstantValue } from "typescript";
import ReactDOM from "react-dom";

type Props = {
    variant: "outlined" | "filled" | "standard" | undefined, //text, contained, outlined
    text?: string,
    handleSave?: Function,
    styles?: any,
    helperText: string,
    entityList: any,
    value?: any;
    label: string,
    identifier: string,
    changeHandler: (event: Event, properties: any) => void,
};

const TextFieldComponent: React.FunctionComponent<any> = (props: Props) => {
    const TextFieldWrapper = styled.div`
        padding: 0.5em;
    `;
    const textChangeHandler = useCallback((e: any) => {
        e.target.innerText = e.target.value;
        if(typeof props.changeHandler==="function"){
            props.changeHandler(e, props);
        }
    }, [props.changeHandler]);
    
    return(
        <TextFieldWrapper>
            <TextField 
                id={props.identifier}
                fullWidth
                label={props.label} 
                variant={props.variant} 
                helperText={props.helperText}
                //defaultValue={props.identifier}
                onChange={(e: any) => textChangeHandler(e)}
            />
        </TextFieldWrapper>
    )
}
TextFieldComponent.defaultProps = {
    variant: "standard",
    label: "Standard",
    helperText: "Some important text",
    changeHandler: () => {},
}
const mapStateToProps = (state: any, ownProps: any) => {
    return {
        entityList: state.catalog.entityTypesList
    }
};

export default connect(mapStateToProps, null)(TextFieldComponent);