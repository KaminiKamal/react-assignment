export enum DIALOG_STATE {
    OPEN = 'open',
    CLOSE = 'close',
};
export type EntityType = {
    id: string, 
    catalogue_name: string, 
    catalogue_description: string,
    catalogue_video_name: string,
    helperText?: string, 
    name?: string,
    identifier?: string,
    dataTestId?: string,
    videoList?: {
        video_name?: string,
        id?: string,
        url?: string,
        imageList: {url: string,}[],
    }[],
};
export enum EntityMetaFields {
    CATALOGUE_NAME_DESCRIPTION = "Catalogue Name and Description",
    PREVIEW_VIDEO = "Preview videos",
}
export type EntityList = {
    [key in EntityMetaFields]: {
        dataTestId: string,
        helperText: string,
        name: string,
        identifier: string,
    };
};