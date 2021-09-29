import { Button, ButtonClasses } from "@mui/material";
import styled, { ThemeProvider } from "styled-components";
import React, { ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { Provider, connect } from 'react-redux';
import { bindActionCreators, Dispatch } from "redux";

type Props = {
    variant: "text" | "outlined" | "contained" | undefined,  //text, contained, outlined
    text: string,
    handleSave:  any,
    styles: any,
    startIcon?: React.ReactNode,
};

const ButtonComponent: React.FunctionComponent<any> = (props: Props) => {
    const ButtonWrapper = styled.div`
        padding: 0.5em;
        float: ${props => props.theme.float};
    `;
    const themeValues = {...props.styles} || {};
    return(
        <ThemeProvider theme={themeValues}>
            <ButtonWrapper>
                <Button 
                    variant={props.variant} 
                    startIcon={props?.startIcon} 
                    onClick={props.handleSave}
                >{props.text}</Button>
            </ButtonWrapper>
        </ThemeProvider>
    )
}

export default ButtonComponent;
