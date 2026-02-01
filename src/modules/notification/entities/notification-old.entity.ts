import { StrObjectId } from "@common/constant";
import { BaseEntity } from "@common/interface/base-entity.interface";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { Entity } from "@module/repository";
import { NotificationReceiverType } from "../common/constant";

// Old Notification entity for MongoDB (used by OneSignal service)
@Schema({ collection: Entity.NOTIFICATION })
export class Notification implements BaseEntity {
    @StrObjectId()
    _id: string;

    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    senderName: string;

    @Prop()
    sender?: string;

    @Prop()
    description?: string;

    @Prop()
    content?: string;

    @Prop()
    imageUrl?: string;

    @Prop({ type: Object })
    data?: any;

    @Prop({
        required: true,
        enum: Object.values(NotificationReceiverType),
    })
    receiverType: NotificationReceiverType;

    topics?: string[];
    users?: string[];

    createdAt?: Date;
}

export type NotificationDocument = HydratedDocument<Notification>;
export const NotificationSchema = SchemaFactory.createForClass(Notification);
