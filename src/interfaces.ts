export interface IFormData {
  sequenceNumber: number;
  selectorName: string;
  value: string;
  isVisibleNext: boolean;
}

export interface IFormValue {
  [key: string]: {
    value: string;
    isVisibleNext: boolean;
  };
}
