// State Interface
export interface EditCustomerProfileSliceInterface {
  [key: string]: any;
  id: number;
  firstName: string;
  lastName: string;
  nickName: string;
  email: string;
  editProfileError: string;
}
