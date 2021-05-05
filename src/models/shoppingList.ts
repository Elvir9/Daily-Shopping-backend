import mongoose, {Schema} from 'mongoose';
import IList from '../interfaces/list';

const ShoppingListSchema = new Schema({
    listName: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: String,
        required: true
    },
   articles: {
       type: Array
   }
}, {
    timestamps: true
})

export default mongoose.model<IList>('ShoppingList', ShoppingListSchema)