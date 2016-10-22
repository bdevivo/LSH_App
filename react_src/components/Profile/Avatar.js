import React, {PropTypes} from 'react';
import {Image} from 'react-bootstrap';
import CSSModules from 'react-css-modules';
import styles from './ProfilePage.css';

const AvatarImg = ({storageKey, url, avatarTimestamp}) => {


    let srcData;
    if (storageKey && localStorage.getItem(storageKey))
    {   // try to get the image data from local storage
        let dataImage = localStorage.getItem(storageKey);
        srcData = "data:image/png;base64," + dataImage;
        //imageComponent = <Image styleName="avatar" src={srcData} circle/>;
    }
    else if (url)
    {   // fetch the data from the url
        srcData = url + '?random=' + avatarTimestamp;    // required in order to fetch updated image with unchanged URL without refreshing the page
        //imageComponent = <Image styleName="avatar" src={timeURL} circle/>;
    }

    function getImageSrc()
    {
        if (storageKey && localStorage.getItem(storageKey))
        {   // try to get the image data from local storage
            return localStorage.getItem(storageKey);
        }
        else if (url)
        {   // fetch the data from the url
            return url + '?random=' + avatarTimestamp;    // required in order to fetch updated image with unchanged URL without refreshing the page
        }
    }

    return <Image styleName="avatar" src={getImageSrc()} circle/>;
};

AvatarImg.propTypes = {
    storageKey: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    avatarTimestamp: PropTypes.string.isRequired
};

export default CSSModules(AvatarImg, styles);
