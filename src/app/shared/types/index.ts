export enum TaskEventType {
    Update = 'Update',
    StatusUpdate = 'Status Update',
    PriorityUpdate = 'Priority Update',
    Delete = 'Delete',
}

export interface TaskEvents {
    [key: string]: TaskEventType;
}

export enum PlatformTheme {
    Light = 'tasky-light-theme',
    Dark = 'tasky-dark-theme',
}

export enum SnackbarTypes {
    INFO = 'INFO',
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR',
}

export interface SnackbarResource {
    message: string;
    type: SnackbarTypes;
}

export interface TaskCreatorEvent {
    status: boolean;
    referenceId: string;
}

export interface AuthServiceEvents {
    hasLoginEvent: boolean;
    hasLogoutEvent: boolean;
    hasRegistrationEvent: boolean;
    hasSessionVerification: boolean;
}

export interface TaskServiceEvents {
    fetchingTasks: boolean;
}