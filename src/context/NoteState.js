import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props)=>{
    const host = "http://localhost:5000"
    const notesInitial=[]
    const [notes, setNotes] = useState(notesInitial)
      // Get all Notes
      const getNotes = async () => {
        // API Call 
        const response = await fetch(`${host}/notes/info`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            "token": localStorage.getItem("token")
          }
        });
        const json = await response.json()
        //console.log(json)
        setNotes(json.data)
      }
      // Add a Note
      const addNote =async (title, description, tag)=>{
    
        const response = await fetch(`${host}/notes/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "token": localStorage.getItem("token")
          },
          body: JSON.stringify({title, description, tag})
        });
        const note = await response.json()
        // console.log(note.status)
        if(note.status){
          setNotes(notes.concat(note.data)) 
        }
        return note
      }

      // Delete a Note
      const deleteNote = async (id) => {
        // API Call
        const response = await fetch(`${host}/notes/del/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "token": localStorage.getItem("token"),
          }
        });
        const json = response.json();
        const {status}= await json;
        if(status){
          // console.log("Deleting the note with id" + id);
           const newNotes = notes.filter((note) => {
          return note._id !== id;
          });
          setNotes(newNotes)
        }
        return json
        
      };
      // Edit a Note
      const editNote = async (id, title, description, tag)=>{
        const response = await fetch(`${host}/notes/update/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            "token": localStorage.getItem("token")
          },
          body: JSON.stringify({title, description, tag})
        });
        const json = response.json();
        const {status}= await json;
        if(status){
          const newNotes = notes.map((note)=>{
            if(note._id===id){
              if(title)
              note.title = title
              if(description)
                note.description = description
              if(tag)
                note.tag=tag
              }
            return note
          })
          setNotes(newNotes)
        }
        return json
      }

    return (
        <NoteContext.Provider value={{notes, addNote,deleteNote, editNote,getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;