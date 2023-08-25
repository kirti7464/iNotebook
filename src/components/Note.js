import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/noteContext'
import NoteItem from './NoteItem'
import AddNotes from './AddNotes'
import { useNavigate } from 'react-router-dom'

function Note(props) {
    const context = useContext(noteContext)
    const {notes, getNotes ,editNote} = context;
    const navigate = useNavigate();
    useEffect(() => {
      if(localStorage.getItem("token")){
        getNotes()
      }
      else{
        navigate("/login")
      }
          // eslint-disable-next-line
    }, [])
    const ref = useRef(null)
    const refClose = useRef(null)
    const [note, setNote] = useState({etitle: "", edescription: "", etag: ""})
    const updateNote = (currentNote) => {
      ref.current.click();
      setNote({id: currentNote._id,etitle: currentNote.title, edescription: currentNote.description, etag:currentNote.tag})
  }

  const handleClick =async (e)=>{
      // console.log("Updating the note...", note)
      const json =await editNote(note.id,note.etitle,note.edescription,note.etag)
      refClose.current.click(); 
      if(json.status){
        //redirect and set token
        props.showAlert("Note is edited","success")
      }else{
        props.showAlert(json.message,"danger")
      }   
  }

  const onChange = (e)=>{
      setNote({...note, [e.target.name]: e.target.value})
  }
  return (
    <div>
    <AddNotes showAlert={props.showAlert}/>
    <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
      Launch demo modal
    </button>

    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
          <form className="my-3">
            <div className="mb-3">
                <label htmlFor="title" className="form-label">title</label>
                <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} onChange={onChange}  minLength={3} />
            </div>
            <div className="mb-3">
                      <label htmlFor="tag" className="form-label">Tag</label>
                      <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <input type="text" className="form-control"  id="edescription" name="edescription" value={note.edescription} onChange={onChange}  minLength={3} />
            </div>
        </form>
          </div>
          <div className="modal-footer">
            <button type="button" ref={refClose}  className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" disabled={note.etitle.length<3 || note.edescription.length<3} className="btn btn-primary" onClick={handleClick}>Save changes</button>
          </div>
        </div>
      </div>
    </div>
    <h2>Your Notes</h2>
    <div className='row '>
    <div className='container mx-2'>
    {notes.length ===0 && "No notes to display"}
    </div>
    {notes.map((note)=>{
        return <NoteItem note={note} key={note._id} updateNote={updateNote} showAlert={props.showAlert}/>
    })} 
    </div>
    </div>
  )
}

export default Note