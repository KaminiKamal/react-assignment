import React, { useCallback, useContext, useEffect, useState } from "react";
import { Provider, connect } from 'react-redux';
import { bindActionCreators, Dispatch } from "redux";
import styled from "styled-components";

type Props = {};
const HeaderWrapper = styled.div`
    display: block;
    float: right;
    width: 100%;
    border: 1px solid gray;
    position: sticky;
`;
const Header: React.FunctionComponent<any> = (props) => {
    const btncolor = 'blue';
    return(
        <div>
            {/* <div>Header</div> */}
            <HeaderWrapper>
                {
                    React.Children.map(props.children,
                        child => {
                            return React.cloneElement(child);
                        })
                }
            </HeaderWrapper>
        </div>
    )
}

export default Header;
