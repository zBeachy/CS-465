export interface Trip {
    _id: string; //Internal primay key in MongoDB
    code: string;
    name: string;
    length: string;
    start: Date;
    resort: string;
    perPerson: string;
    image: string;
    description: string;
}