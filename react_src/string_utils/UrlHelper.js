import * as ImagePaths from '../constants/ImagePaths';

export const getDefaultAvatarUrl = () => {
  return `${ImagePaths.IMAGE_URL_ROOT}/${ImagePaths.IMAGE_BUCKET_NAME}/${ImagePaths.IMAGE_FOLDER}/${ImagePaths.AVATAR_FOLDER}/${ImagePaths.AVATAR_FILENAME}`;
};
