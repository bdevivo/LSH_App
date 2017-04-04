// Question Functions
export const QUESTION_FUNCTION = {
    None: 'none',
    JobName: 'name'
};

// Job Statuses
export const JOB_STATUS = {
   Draft: "draft",
   PostedPrivate: "private",
   PostedUsersOnly: "users_only",
   PostedPublic: "public",
   Hidden: "hidden",
   Retired: "retired",
   Abandoned: "abandoned"
};

// Job Status Display Names
export const JOB_STATUS_DISPLAY = {
    "draft": "Draft",
    "private": "Posted (invite only)",
    "users_only": "Posted (users only)",
    "public": "Posted (public)",
    "hidden": "Hidden",
    "retired": "Retired",
    "abandoned": "Abandoned"
};

// Job Visibility
export const JOB_POST_TIME = {
   Now: "now",
   Later: "later",
   Deferred: "deferred"
};

// Grid Types
export const QUESTION_GRID_TYPE = {
   JobPosting: "question_grid_job_posting",
   UserProfile: "question_grid_user_profile"
};

// Paths for uploading/retrieving image files
export const IMAGE_PATH = {
    ImageUrlRoot: 'https://s3.amazonaws.com',
    ImageFolder: 'app_images',
    AvatarFolder: 'avatars',
    AvatarFilename: 'avatar_placeholder.png',
    ImageBucketName: 'lifescihub'
};


