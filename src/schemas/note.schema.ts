import { isValidObjectId } from "mongoose";
import { object, string, TypeOf } from "zod";

const payload = {
  body: object({
    title: string({
      required_error: "Title is required",
    }),
    description: string({
      required_error: "Description is required",
    }),
  }),
};

const params = {
  params: object({
    noteId: string({
      required_error: "Note id is required",
    }).refine((value) => isValidObjectId(value), {
      message: "Invalid ObjectId",
    }),
  }),
};

export const createNoteSchema = object({
  ...payload,
});

export const getNoteSchema = object({
  ...params,
});

export const updateNoteSchema = object({
  ...params,
  body: object({
    title: string().optional(),
    description: string().optional(),
  }).refine((data) => Object.keys(data).length > 0, {
    message: "Update object cannot be empty",
  }),
});

export type CreateNoteInput = TypeOf<typeof createNoteSchema>;
export type UpdateNoteInput = TypeOf<typeof updateNoteSchema>;
