export class Visit {
    id: number;
    visitDate: Date;
    description: string;

    constructor(description: string) {
        this.description = description;
        this.visitDate = new Date();
    }
}
