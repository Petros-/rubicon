import React, {useState} from 'react'
import { collection, addDoc } from "firebase/firestore"; 
import db from '../db';

function NewThing () {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault()

        // Ensure title and description exist before submitting
        if (!title.trim() || !description.trim()) {
            alert("Please fill in both fields.");
            return;
        }
        
        try {
            // Add a new document with a generated id.
            const docRef = await addDoc(collection(db, "genericItems"), {
              title: title,
              description: description,
              createdAt: new Date()
            });

            console.log("Document written with ID: ", docRef.id);

            // clear the fields
            setTitle('')
            setDescription('')

        } catch (error) {
            console.error("Error adding document: ", error);
        }
      }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title"></label>
                <input type="text" id="title" onChange={(e) => setTitle(e.target.value)} value={title}/>
                <label htmlFor="description"></label>
                <textarea id="description" onChange={(e) => setDescription(e.target.value)} value={description} />
                <button type="submit">Submit</button>
            </form>
        </div>
    )

}

export default NewThing