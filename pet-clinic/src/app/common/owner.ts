import { Pet } from "./pet";

export class Owner {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    city: string;
    address: string;
    pets: Pet[] = [];
}
