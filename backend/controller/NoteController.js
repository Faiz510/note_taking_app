import Note from "../modal/NoteModal.js";

export const AllNotes = async (req, res) => {
  try {
    const notes = await Note.find();

    res.status(200).json({
      status: "sucess",
      notesNum: notes.length,
      notes,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: `errror in post:  ${error}`,
    });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        status: "fail",
        message: `not user found with id `,
      });
    }

    const notes = await Note.findByIdAndDelete(id);

    res.status(200).json({
      status: "sucess",
      deletedNote: null,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: `errror in post:  ${error}`,
    });
  }
};

export const noteById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        status: "fail",
        message: `not user found with id `,
      });
    }

    const notes = await Note.findById(id);

    res.status(200).json({
      status: "sucess",
      notes,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: `errror in post:  ${error}`,
    });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        status: "fail",
        message: `not user found with id `,
      });
    }

    const { title, note } = req.body;

    const newBody = {
      title,
      note,
    };

    const notes = await Note.findByIdAndUpdate(id, newBody, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "sucess",
      notes,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: `errror in post:  ${error}`,
    });
  }
};

export const createNote = async (req, res) => {
  try {
    const { title, note } = req.body;

    if (!title || !note) {
      return res.status(400).json({
        status: "fail",
        message: "all fields are required",
      });
    }

    const newBody = {
      title,
      note,
    };

    const notes = await Note.create(newBody);

    res.status(200).json({
      status: "sucess",
      notes,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: `errror in post:  ${error}`,
    });
  }
};
