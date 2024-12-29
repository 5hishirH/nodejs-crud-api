import { Router } from "express";

// import schemas

import {
  createNoteSchema,
  getNoteSchema,
  updateNoteSchema,
} from "../schemas/note.schema";

// import controllers

import {
  createNote,
  deleteNote,
  getNote,
  updateNote,
} from "../controllers/note.controllers";

// import middlewares

import { validateResource } from "../middlewares/validate-resource";

const router = Router();

router.route("/:noteId").get(validateResource(getNoteSchema), getNote);
router.route("/:noteId").patch(validateResource(updateNoteSchema), updateNote);
router.route("/:noteId").delete(validateResource(getNoteSchema), deleteNote);

router.route("/").post(validateResource(createNoteSchema), createNote);

export default router;
