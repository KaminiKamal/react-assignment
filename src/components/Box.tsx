import { Box, Button } from "@mui/material";
import styled, { ThemeProvider } from "styled-components";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Provider, connect } from 'react-redux';
import { bindActionCreators, Dispatch } from "redux";

type Props = {
    sx: any,
    display?: string,
    width?: string,
    styledBox?: any,
    children?: any,
};

const BoxComponent: React.FunctionComponent<any> = (props: Props) => {
    
    const themeValues = {...props.sx} || {};
    return(
        <ThemeProvider theme={themeValues}>
            <Box
                sx={themeValues}
            >
                {
                    React.Children.map(props.children,
                        child => {
                            return React.cloneElement(child);
                        })
                }
            </Box>
        </ThemeProvider>
    )
}

export default BoxComponent;
