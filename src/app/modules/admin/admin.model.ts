import { model, Schema, Types } from "mongoose";
import { TAddress, TAdmin, TAdminName } from "./admin.interface";

const AdminNameSchema = new Schema<TAdminName>({
    firstName: { type: String, required: [true, 'First name is required'] },
    middleName: { type: String, default: "" },
    lastName: { type: String, required: [true, 'Last name is required'] }
});


const AddressSchema = new Schema<TAddress>({
    street: { type: String, default: "" },
    city: { type: String, default: "" },
    state: { type: String, default: "" },
    postalCode: { type: String, default: "" },
    country: { type: String, default: "" }
});

const AdminSchema = new Schema<TAdmin>({
    address: {
        type: AddressSchema,
        required: true
    },
    email: {
        type: String,
        required: [true, 'Email is required']
    },

    name: {
        type: AdminNameSchema,
        required: [true, 'Name is required']
    },
    role: {
        type: String,
        required: [true, 'Role is required'],
        ref: 'Roles'
    },
    phoneNumber: {
        type: String,
        required: [true, 'Phone number is required']
    },
    user: {
        type: Schema.Types.ObjectId,
        required: [true, 'User is required'],
        ref: 'User'
    }
})

export const Admin = model<TAdmin>('Admin', AdminSchema)