import { Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import BoxComponent from "../../../../../components/Box";
import { useParams } from "react-router-dom";

const ViewCatalogPage: React.FunctionComponent<any> = (props: any) => {
    const routeParams: {id: string} = useParams(); //id
    const { entityList } = props;
    const [selectedEntity, setSelectedEntity] = useState<any>();

    useEffect(() => {
        if(routeParams.id && entityList.length){
            const activeEntity = entityList.find((el: {id: string}, i: number) => (el.id===routeParams.id));
            setSelectedEntity(activeEntity || {});
        }
    },[props.entityList, routeParams.id, setSelectedEntity]);
    return (
        <div>
            
            <Container maxWidth="md">
            <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <h4>{selectedEntity?.catalogue_name}</h4>
                <Grid item xs={12} md={12} >
                    <div style={{display: 'inline-flex', width: '-webkit-fill-available'}}>

                    
                                {
                                    selectedEntity?.videoList.map((v: {url: string, imageList: {url: string}[]}, idx: number) => (
                                        <BoxComponent
                                            sx={{
                                                width: '-webkit-fill-available',
                                                padding: '0.5em',
                                                margin: '0.5em',
                                                height: 300,
                                                bgcolor: 'primary.dark',
                                                borderRadius: '10%',
                                                backgroundColor: 'lightgray',
                                            }}
                                        >
                                            <video id="video" src={v.url} style={{width: '-webkit-fill-available', height: '-webkit-fill-available'}} height="100" controls></video>
                                            <div style={{display: 'inline-flex', width: '-webkit-fill-available'}}>
                                                {
                                                    idx===0 && (<Grid item xs={12}>{selectedEntity?.catalogue_description}</Grid>)
                                                }
                                                {
                                                    v?.imageList.map((_v: {url: string}) => (
                                                        <Grid item xs={12}>
                                                        <BoxComponent
                                                            sx={{
                                                                width: '-webkit-fill-available',
                                                                padding: '0.5em',
                                                                margin: '0.5em',
                                                                border: '2px dashed gray',
                                                            }}
                                                        >
                                                            <img src={_v.url} width="80px" height="80px"></img>
                                                        </BoxComponent>
                                                        
                                                    </Grid>
                                                    ))
                                                }
                                            </div> 
                                        </BoxComponent>
                                    ))
                                }
                    </div>
                     
                    

                </Grid>
            </Grid>
            </Container>
        </div>
    )
}

const mapStateToProps = (state: any, ownProps: any) => {
    return {
        entityList: state.catalog.entityTypesList
    }
};
export default connect(mapStateToProps, null)(ViewCatalogPage);
