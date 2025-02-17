import React, {useState, useEffect} from 'react'
import { collection, addDoc, setDoc, doc } from "firebase/firestore"; 
import db from '../db';
import { useParams, useNavigate } from 'react-router-dom';



function NewThing ({ existingData }) {
    // Get ID from URL if editing
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    // Populate form if editing an existing item
    useEffect(() => {
        if (existingData) {
            setTitle(existingData.title || '');
            setDescription(existingData.description || '');
        }
    },[existingData]);

    const handleSubmit = async (event) => {
        event.preventDefault()

        // Ensure title and description exist before submitting
        if (!title.trim() || !description.trim()) {
            alert("Please fill in both fields.");
            return;
        }
        
        try {
            if (id) {
                // if there's an id already, then update an existing document
                await setDoc(doc(db, "genericItems", id), {
                    title,
                    description,
                    updatedAt: new Date()
                }, {merge:true});
                console.log("Document updated with ID: ", id);

            } else {

                // Add a new document with a generated id.
                const docRef = await addDoc(collection(db, "genericItems"), {
                  title: title,
                  description: description,
                  createdAt: new Date()
                });
                console.log("Document written with ID: ", docRef.id);
            }

            // Redirect to the list after completing the form
            navigate("/"); 

            // clear the fields
            setTitle('')
            setDescription('')

        } catch (error) {
            console.error("Error saving document: ", error);
        }
      }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title"></label>
                <input type="text" id="title" onChange={(e) => setTitle(e.target.value)} value={title}/>
                <label htmlFor="description"></label>
                <textarea id="description" onChange={(e) => setDescription(e.target.value)} value={description} />
                <button type="submit">{id ? "Update" : "Create"}</button>
            </form>
        </div>
    )

}

export default NewThing