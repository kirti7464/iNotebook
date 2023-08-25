import React, { useContext } from 'react'
import noteContext from '../context/noteContext';

function NoteItem(props) {
  const {note,updateNote} =props
    const {title,description}=props.note
    const context = useContext(noteContext);
    const { deleteNote} = context;
    const handleDelete=()=>{
      deleteNote(note._id)
        props.showAlert("Note is deleted","success")
      }
      const handleEdit=()=>{
        updateNote(note)
      }
  return (
    <div className='col-md-4'>
        <div  className="card my-3" >
        {/* style="width: 18rem;" */}
        <div  className="card-body">
            <div className="container">
          
          <i className="far fa-edit mx-2" style={{display:'flex', justifyContent: 'flex-end', position:'absolute', right:'20px'}}onClick={handleEdit}></i>
          <i className="far fa-trash-alt mx-2" style={{display:'flex', justifyContent: 'flex-end', position:'absolute', right:'0'}}onClick={handleDelete}></i>
          <h5 className="card-title">{title}</h5>
        </div>
            <p  className="card-text">{description}</p>
        </div>
        </div>
    </div>
  )
}

export default NoteItem