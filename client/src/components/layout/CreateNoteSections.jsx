import NotesImg from "../../assets/createNote.jpg";
import Input from "./Input";
const CreateNoteSections = ({ showAddNotes }) => {
  return (
    <section>
      <img src={NotesImg} className="w-[100vw] h-52 object-cover" />

      <Input showAddNotes={showAddNotes} />
    </section>
  );
};

export default CreateNoteSections;
