import * as enums from '../constants/enums';

let {IMAGE_PATH} = enums;

export const getDefaultAvatarUrl = () => {
  return `${IMAGE_PATH.ImageFolder}/${IMAGE_PATH.ImageBucketName}/${IMAGE_PATH.ImageFolder}/${IMAGE_PATH.AvatarFolder}/${IMAGE_PATH.AvatarFilename}`;
};
