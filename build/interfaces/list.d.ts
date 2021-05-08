import { Document } from 'mongoose';
export default interface IList extends Document {
    listName: string;
    userId: string;
    articles: string[];
}
