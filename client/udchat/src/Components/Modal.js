import React, {useState} from 'react';
import "./modal.css";

function Modal(props){
    const {open, onClose} = props

    if(!open) return null;
    
    /**
     * <div className="overlay">
            <div className="modal-container">
                <Modal open={showModal} onClose={()=>{setShowModal(false)}}>
                    <EventSignUpWindow event={selectedEvent}></EventSignUpWindow>
                </Modal>
            </div>
         </div>
     */

    return <div className='overlay'>
       <div className='modal-container'>
            <div>
                <p onClick={onClose}>X</p>
                <div>
                    {props.children}
                </div>
            </div>
       </div>
    </div>
}


export default Modal;