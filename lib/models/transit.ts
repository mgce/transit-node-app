import { Document, Schema, Model, model} from 'mongoose';
import { Transit } from 'interfaces/transit';

export interface ITransitModel extends Transit, Document{

}

const TransitSchema: Schema = new Schema({
    sourceAddress: {
        type: String,
        required: 'Enter a Source Address'
    },
    destinationAddress: {
        type: String,
        required: 'Enter a Destination Addres'
    },
    price: {
        type: Number,
        required: "Enter a price"            
    },
    date: {
        type: Date,
        required: "Provide a date"            
    },
    distance:{
        type: Number,
    }
})

export const TransitModel: Model<ITransitModel> = model<ITransitModel>('Transit', TransitSchema);