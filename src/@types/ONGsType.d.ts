interface Address {
  street: string;
  longitude: number;
  latitude: number;
  _id: string;
}

export interface ONGsTypes {
  _id: string;
  userID: string;
  typeUser: "ONG" | "User"; // Definido como 'ONG' ou 'User', mas pode ser estendido conforme necessidade
  emailUser: string;
  nameOng: string;
  phoneOnwerOng: string;
  phoneOng: string;
  address: Address;
  onboarding_completed: boolean;
  __v: number;
}

type UserDonator = {
  _id: string;
  userID: string;
  typeUser: string;
  emailUser: string;
  nameOng: string;
  phoneOnwerOng: string;
  phoneOng: string;
  address: Address;
  onboarding_completed: boolean;
  __v: number;
};

type Donation = {
  _id: string;
  products: Product[];
  ONGdestination: string;
  UserDonator: UserDonator;
  __v: number;
};
