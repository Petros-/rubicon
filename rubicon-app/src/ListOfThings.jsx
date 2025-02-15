import React, {useEffect, useState} from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { Link } from 'react-router-dom';
import db from "../db";

function ListOfThings () {
    const [things, setThings] = useState([]);

    // get the list of things

    useEffect(() => {
        const fetchThings = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "genericItems"));
                
                // convert the firestore data into an array
                const items = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                setThings(items);
    
            } catch (error) {
                console.error("Error fetching documents", error);
            }
        };
        fetchThings();
    }, [db]);

    const handleDelete= async (id) => {
        try {
            await deleteDoc(doc(db, 'genericItems', id));
            setThings(prevThings => prevThings.filter(thing => thing.id !== id));
        } catch (error) {
            console.error("Error deleting document", error);
        }
    }

    return (
        <div>
            <h2>List of Things</h2>
            
            {things.map(thing => (
                <div key={thing.id}>
                    <Link to={`/thing/${thing.id}`}>{thing.title}</Link>{thing.description}
                    <button onClick={() => handleDelete(thing.id)}>Delete</button>
                </div>
            ))}
            
        </div>
    )

}

export default ListOfThings