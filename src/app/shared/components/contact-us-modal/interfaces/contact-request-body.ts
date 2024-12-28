export interface ContactRequestBody {
  _type: string;
  firstName: any;
  lastName: any;
  companyName?: any;
  position?: any;
  phone: number;
  email: any;
  reason?: any;
  /*   extraInfo: any; */
  cv?: { _type: string; asset: { _type: string; _ref: string } };
  jobDescription?: {
    _type: string;
    asset: { _type: string; _ref: string };
  };
}
