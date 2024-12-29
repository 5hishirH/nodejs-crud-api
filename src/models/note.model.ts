import { Schema, model } from "mongoose";

interface INote {
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const noteSchema = new Schema<INote>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, required: true, default: Date.now },
});

noteSchema.pre("save", function (next) {
  const now = new Date();
  this.updatedAt = now;

  if (this.isNew) {
    this.createdAt = now;
  }

  next();
});

export const Note = model<INote>("Note", noteSchema);
