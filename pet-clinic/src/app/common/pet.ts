import { Type } from "./type";
import { Visit } from "./visit";

export class Pet {
    id: number;
    name: string;
    birthDate: Date;
    type: Type;
    visits: Visit[];

    constructor(name: string, type: Type){
        this.name = name;
        this.birthDate = new Date();
        this.type = type;
        this.visits = this.visits;
    }
}
