import noteContext from "../context/notes/NoteContext";
import React, { useContext } from "react";

export const Noteitem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;

    const { noteElement, updateNote } = props;
    return (
        <div className="col-md-3">
            <div className="card align-items-center text-center">
                <div className="card-body">
                    <h5 className="card-title">{noteElement.title}</h5>
                    <p className="card-text">{noteElement.description}</p>
                    <i className="far fa-edit "
                     onClick={() => { updateNote(noteElement); }}></i>
                     
                    <i className="far fa-trash-alt mx-3" 
                    onClick={() => {deleteNote(noteElement._id); props.funcAlert("deleted successfully", "success");
                    }}
                    ></i>
                </div>
            </div>
        </div>
    );
};
