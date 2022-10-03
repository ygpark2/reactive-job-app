export interface Address {
  addressLine: String;

  street: String;

  city: String;

  postCode: String;

}

export interface JobDto {
  name: String;

  phone: String;

  address: Address;

  status: String,

}
