import { Button, Container, Grid } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from "redux";
import { v4 as uuidv4 } from 'uuid';
import ButtonComponent from "../../../../../components/Button";
import Header from "../../../../../components/Header";
import TextFieldComponent from "../../../../../components/TextField";
import { actionCreators } from "../state/reducer";
import  TEXTFIELD_DATA, {EntityDetails} from "../constants/namespace";
import BoxComponent from "../../../../../components/Box";
import { useHistory } from "react-router-dom";
// import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/dist/react-notifications.css';
import CustomizedDialogs from "../../../../../components/Dialog";
import { DIALOG_STATE, EntityMetaFields, EntityType } from "../state/types";
import "../../../../../App.css";

type Props = {
    createState: (data: any) => void;
    entityList: EntityType[];
};
const defaultValue = {
    id: '', catalogue_name: '', catalogue_video_name: '', catalogue_description: '', videoList: []
};
const CreateCatalogPage: React.FunctionComponent<Props>  = (props) => {
    const [catalogData, setCatalogData] = useState<any>(defaultValue);
    const [videoList, setVideoList] = useState<any>([]);
    const [entityId, setEntityId] = useState<any>();
    const { createState } = props;
    const [dialogState, setDialogstate] = useState<boolean>(false);
    const history = useHistory();
    const [trigger, setTrigger] = useState(true);

    const handlerFunction = ((action: DIALOG_STATE ) => {
        
        switch(action){
            case DIALOG_STATE.CLOSE:
                setDialogstate(false);
                break;
            case DIALOG_STATE.OPEN:
                setDialogstate(true);
                break;
            default:
                break;
        }
        
    });

    const addMoreVideos = useCallback(() => {
        setDialogstate(true);
    }, []);

    useEffect(() => {
        if(props.entityList?.length){
            const { entityList } = props;
            setCatalogData({
                id: entityList[0].id, 
                catalogue_name: entityList[0].catalogue_name, 
                catalogue_video_name: entityList[0].catalogue_video_name, 
                catalogue_description: entityList[0].catalogue_description, 
                videoList: entityList[0].videoList
            })
        }
    }, [props]);

    const handleSave = useCallback(() => {
        
        const prevData = catalogData;
        const EntityId =  uuidv4();
        setEntityId(EntityId)
        Object.assign(prevData, {"id": EntityId});
        const videoItems = videoList || [];
        prevData.videoList = videoItems;
        setCatalogData(prevData);
        if(typeof createState === "function"){
            createState(catalogData);
            // NotificationManager.success(`Data saved successfully`);
        }
    }, [setCatalogData, setEntityId, catalogData, createState, videoList]);
    const handlePreview = useCallback(async() => {
        await handleSave();
        if(props?.entityList?.length){
            const EntityId = props?.entityList[props?.entityList.length-1 || 0].id;
            history.push(`/details/${EntityId}`);
        }
    }, [handleSave, history, props?.entityList]);

    

    const uploadFile = useCallback((e) => {
        const input = document.getElementById('file-input');
        const video = document.getElementById('video');
        const videoSource = document.createElement('source');
        const files = e.target.files || [];

        if (!files.length) return;
  
        const reader = new FileReader();
        if(reader){
            reader.onload = function (e: any) {
                videoSource.setAttribute('src', e.target.result);
                const payload = {
                    video_name: '',
                    id: '',
                    url: e.target.result,
                    imageList: [],
                };
                const videoItems = videoList || [];
                videoItems.push(payload);
                setVideoList(videoItems);
                if(video){
                    video.appendChild(videoSource);
                }
            };
        }
  
  reader.onprogress = function (e) {
    console.log('progress: ', Math.round((e.loaded * 100) / e.total));
  };
  
  reader.readAsDataURL(files[0]);

    }, [catalogData, props.entityList, videoList]);

    const textBoxChangeHandler = useCallback((e:any, key: any) => {
        const prevProps = catalogData;
        const selectedKeyValue = {[key.identifier]: e.target.value}
        Object.assign(prevProps, selectedKeyValue);
        setCatalogData(prevProps);
    }, [catalogData]);

    const uploadThumbnail = useCallback((event: any) => {
        
        const files = event.target.files || [];

        if (!files.length) return;
  
        const reader = new FileReader();
        if(reader){
            reader.onload = function (e: any) {
                
                const parentVideoIdx = (event.target.id).split("-")[1];
                const vList = videoList;
                vList[parentVideoIdx].imageList.push({url: e.target.result});
                setVideoList(vList);
                const activeEntity = catalogData;
                activeEntity.videoList = videoList;
                setCatalogData(activeEntity);
                setTrigger(!trigger);
            }
        }
        reader.onprogress = function (e) {
            console.log('progress: ', Math.round((e.loaded * 100) / e.total));
          };
          
          reader.readAsDataURL(files[0]);
    }, [setTrigger, catalogData, trigger, videoList]);

    return(
        <div>
            {/* <NotificationContainer /> */}
            <div>
                <Header>
                    <ButtonComponent 
                        variant="contained" 
                        text="save"
                        styles={{
                            float: 'right'
                        }}
                        handleSave={handleSave}
                    >
                    </ButtonComponent>
                    <ButtonComponent 
                        variant="outlined" 
                        text="preview"
                        styles={{
                            float: 'right'
                        }}
                        handleSave={handlePreview}
                    >
                    </ButtonComponent>
                </Header>
            </div>
            <div>
                <Container maxWidth="md">
                    <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={12} md={12}>
                            <div>
                                <h4>{EntityMetaFields.CATALOGUE_NAME_DESCRIPTION}</h4>
                                {TEXTFIELD_DATA[0][EntityMetaFields.CATALOGUE_NAME_DESCRIPTION].map((_el: EntityType, _idx: any) => (
                                    <div key={_el.dataTestId}>
                                        <TextFieldComponent 
                                            helperText={_el.helperText}
                                            label={_el.name}
                                            identifier={_el.identifier}
                                            changeHandler={textBoxChangeHandler}
                                            value={props.entityList[0]}
                                        />
                                    </div>
                                ))}
                            </div>
                            <div>
                                <h4>{EntityMetaFields.PREVIEW_VIDEO}</h4>
                                {TEXTFIELD_DATA[1][EntityMetaFields.PREVIEW_VIDEO].map((_el: EntityType, _idx: any) => (
                                    <div key={_el.dataTestId}>
                                        <TextFieldComponent 
                                            helperText={_el.helperText}
                                            label={_el.name}
                                            identifier={_el.identifier}
                                            changeHandler={textBoxChangeHandler}
                                            value={props.entityList[0]}
                                        />
                                    </div>
                                ))}
                            </div>
                            {
                                videoList?.map((v: {url: string, imageList: {url: string,}[]}, idx: number) => (
                                    <div>
                                        <div style={{display: 'inline-flex', width: '-webkit-fill-available'}} key={idx+"video-links"}>
                                            <BoxComponent
                                                sx={{
                                                    width: '-webkit-fill-available',
                                                    height: 200,
                                                    border: '2px dashed gray',
                                                }}
                                                >
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={4}>
                                                        <BoxComponent
                                                            sx={{
                                                                width: '-webkit-fill-available',
                                                                padding: '0.5em',
                                                                margin: '0.5em',
                                                                height: 60,
                                                                bgcolor: 'primary.dark',
                                                                borderRadius: '10%',
                                                                backgroundColor: 'lightgray',
                                                            }}
                                                        >
                                                            <video id={`${idx}video-component`} style={{width: '-webkit-fill-available'}} height="100" src={v.url} controls></video>
                                                        </BoxComponent>
                                                        </Grid>
                                                        <Grid item xs={8}>
                                                            <input id="file-input" type="file" accept="video/*" onChange={uploadFile}/>
                                                            <div>or drag and drop here</div>
                                                        </Grid>
                                                    </Grid>
                                                </BoxComponent>
                                        </div>
                                        <h5>Preview Thumbnail</h5>
                                        <div style={{display: 'inline-flex', width: '-webkit-fill-available'}}>
                                            <BoxComponent
                                                sx={{
                                                    width: '-webkit-fill-available',
                                                    padding: '0.5em',
                                                    margin: '0.5em',
                                                    border: '2px dashed gray',
                                                }}
                                            >
                                                <Grid container spacing={2}>
                                                    <Grid item xs={4}>
                                                        <div className="upload-btn-wrapper">
                                                            <button className="btn">Upload a file</button>
                                                            <input id={`image-${idx}`} type="file" name="myfile" accept="image/*" onChange={uploadThumbnail}/>
                                                        </div>
                                                    </Grid>
                                                    {
                                                v.imageList?.map((_v, _i) => (
                                                    <Grid item xs={4}>
                                                        <BoxComponent
                                                            sx={{
                                                                width: '-webkit-fill-available',
                                                                padding: '0.5em',
                                                                margin: '0.5em',
                                                                border: '2px dashed gray',
                                                            }}
                                                        >
                                                            <img src={_v.url} style={{width: '-webkit-fill-available'}} height="80px"></img>
                                                        </BoxComponent>
                                                        
                                                    </Grid>
                                                ))
                                            }

                                                </Grid>
                                            </BoxComponent>
                                            
                                            
                                        </div>
                                    </div>
                                ))
                            }
                            <div style={{display: 'inline-flex', width: '-webkit-fill-available'}}>
                                <ButtonComponent 
                                    variant="contained" 
                                    text="Add Videos"
                                    startIcon={<AddIcon />}
                                    handleSave={addMoreVideos}
                                >
                                </ButtonComponent>
                            </div>
                            
                        </Grid>
                    </Grid>
                </Container>
            </div>
           
            <CustomizedDialogs open={dialogState} handlerFunction={handlerFunction}>
                <div style={{display: 'inline-flex', width: '-webkit-fill-available'}}>
                    <BoxComponent
                                    sx={{
                                        width: '-webkit-fill-available',
                                        height: 200,
                                        border: '2px dashed gray',
                                    }}
                                    >
                                        <Grid container spacing={2}>
                                            <Grid item xs={4}>
                                            <BoxComponent
                                                sx={{
                                                    width: '-webkit-fill-available',
                                                    padding: '0.5em',
                                                    margin: '0.5em',
                                                    height: 60,
                                                    bgcolor: 'primary.dark',
                                                    borderRadius: '10%',
                                                    backgroundColor: 'lightgray',
                                                }}
                                            >
                                                <video id="video" style={{width: '-webkit-fill-available'}} height="100" controls></video>
                                            </BoxComponent>
                                            </Grid>
                                            <Grid item xs={8}>
                                                <input id="file-input" type="file" accept="video/*" onChange={uploadFile}/>
                                                <div>or drag and drop here</div>
                                            </Grid>
                                        </Grid>
                                    </BoxComponent>
                </div>
                            
            </CustomizedDialogs>
            
        </div>
    )
};
const mapDispatchToProps = (dispatch: Dispatch) => {
    const {createState} = actionCreators;
    return bindActionCreators({
        createState
    }, dispatch);
};

const mapStateToProps = (state: any, ownProps: any) => {
    return {
        entityList: state.catalog.entityTypesList
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateCatalogPage);