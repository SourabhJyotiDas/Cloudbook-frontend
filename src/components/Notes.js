import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../context/notes/NoteContext';
import { Noteitem } from './Noteitem';
import Addnote from './Addnote';
import { useNavigate } from 'react-router-dom'


const Notes = (props) => {
    const context = useContext(noteContext)
    const { notes, getNotes, editNote } = context
    let navigate = useNavigate()

    const [note, setNote] = useState({ id: "", etitle: " ", edescription: " ", etag: "" });

    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            getNotes();
        }
        else {
            navigate('/login')
        }
        // eslint-disable-next-line 
    }, [])

    const updateNote = (currentNote) => {
        ref.current.click()
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
    }

    const ref = useRef(null)
    const refclose = useRef(null)

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }
    const handleClick = (e) => {
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refclose.current.click()
        e.preventDefault()
        props.funcAlert("updated  successfully", "success")
    }

    return (
        <>
            <Addnote funcAlert={props.funcAlert} />

            <button type="button" className="btn btn-primary my-2 d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref}>
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" onChange={onChange} value={note.etitle} minLength={5} required />

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" onChange={onChange} value={note.edescription} minLength={5} required />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" onChange={onChange} value={note.etag} minLength={5} required />
                                </div>

                                {/* <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button> */}
                            </form>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refclose} >Close</button>
                            <button disabled={note.etitle.length < 5 || note.edescription.length < 5} type="button" className="btn btn-primary" onClick={handleClick}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>



            <div className='row'>
                <h2>Your Notes</h2>
                <div className='container mx-3'>
                    {notes.length === 0 && `"No notes to dispaly"`}
                </div>
                {notes.map((element) => {
                    return <Noteitem funcAlert={props.funcAlert} key={element._id} noteElement={element} updateNote={updateNote} />
                })}
            </div>
        </>
    )
}

export default Notes