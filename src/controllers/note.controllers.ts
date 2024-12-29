import { asyncHandler } from "../utils/async-handler";
import { CreateNoteInput, UpdateNoteInput } from "../schemas/note.schema";
import { Note } from "../models/note.model";
import { ApiError } from "../utils/api-error";

const createNote = asyncHandler(async (req, res) => {
  const body = req.body as CreateNoteInput["body"];
  const result = await Note.create(body);

  res.status(201).json(result);
});

const getNote = asyncHandler(async (req, res) => {
  const noteId = req.params.noteId;

  const note = await Note.findById(noteId);

  if (!note) {
    throw new ApiError(404, "Cannot find the note with the requested id");
  }

  res.send(note);
});

const updateNote = asyncHandler(async (req, res) => {
  const body = req.body as UpdateNoteInput["body"];
  const noteId = req.params.noteId;

  const prevNote = await Note.findById(noteId);

  if (!prevNote) {
    throw new ApiError(404, "Cannot find the note with the requested id");
  }

  prevNote.set(body);
  const updatedNote = await prevNote.save();

  res.send(updatedNote);
});

const deleteNote = asyncHandler(async (req, res) => {
  const noteId = req.params.noteId;

  const note = await Note.findByIdAndDelete(noteId);

  if (!note) {
    throw new ApiError(404, "Cannot find the note with the requested id");
  }

  res.send(note);
});

export { createNote, getNote, updateNote, deleteNote };
