import { EntityList, EntityMetaFields } from "../state/types";

export const EntityDetails = {
    CATALOGUE_NAME_DESCRIPTION: EntityMetaFields.CATALOGUE_NAME_DESCRIPTION,
    PREVIEW_VIDEO: EntityMetaFields.PREVIEW_VIDEO
};

const TEXTFIELD_DATA: any = [
    {
        [EntityMetaFields.CATALOGUE_NAME_DESCRIPTION] : [
            {
                dataTestId: 'textField-name'+0,
                helperText: 'Try to name the catalogue short and clear',
                name: 'Enter Calalogue name',
                identifier: 'catalogue_name'
            },
            {
                dataTestId: 'textField-desc'+1,
                helperText: 'Try to describe the catalogue short and clear',
                name: 'Enter Calalogue description',
                identifier: 'catalogue_description'
            },
        ]
    },
    {
        [EntityMetaFields.PREVIEW_VIDEO] : [
            {
                dataTestId: 'textField-video'+3,
                helperText: 'Try to name the video short and clear',
                name: 'Enter Video name',
                identifier: 'catalogue_video_name'
            },
        ]
    }
];

export default TEXTFIELD_DATA;