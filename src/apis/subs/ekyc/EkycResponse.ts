export interface OCRResponse {
  code?: number;
  data: DataEkyc;
  message?: string;
}
export interface DataEkyc {
  continueStep?: boolean;
  installmentLoanId: string;
  ekycDataResDTO?: any;
  ekycResponse: DataResponse;
  ekycFailTimes?: any;
  pass?: boolean;
  message?: string;
}

export interface DataResponse {
  objectId?: string;
  cardType?: string;
  ocr: DataOCR;
  faceMatching?: any;
}
export interface DataOCR {
  id_number: string;
  home_town: string;
  address: string;
  gender?: string;
  nationality?: string;
  issued_date: string;
  dob: string;
  expiry_date?: string;
  name: string;
  id_type: string;
  id_name: string;
}

export interface OCRMessageError {
  name: string;
  message: string;
}
