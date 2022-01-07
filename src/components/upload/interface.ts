export interface UploadFile {
  name?: string;
  uid?: string;
  status?: string;
  url?: string;
  rawFile?: File;
}

export const enum UploadStatus {
  UPLOADING = 'uploading',
  DONE = 'done',
  ERROR = 'error',
  REMOVED = 'removed'
}