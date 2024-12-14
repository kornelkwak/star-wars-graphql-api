import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DatabaseDocument = HydratedDocument<Database>;

@Schema()
export class Database {
  @Prop({ required: true })
  resourceName: string;

  @Prop({ required: true, type: Object })
  data: Record<string, any>;

  @Prop({ required: true, default: Date.now })
  createdAt: Date;
}

export const DatabaseSchema = SchemaFactory.createForClass(Database);

DatabaseSchema.index({ createdAt: 1 }, { expireAfterSeconds: 24 * 60 * 60 }); // 24 godziny
