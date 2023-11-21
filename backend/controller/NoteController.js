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
