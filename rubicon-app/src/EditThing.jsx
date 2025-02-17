import React, { useEffect, useState } from 'react';
import { doc, getDoc } from "firebase/firestore"; 
import db from '../db';
import { useParams } from 'react-router-dom';
import NewThing from './NewThing';

function EditThing() {
    const { id } = useParams();
    const [existingData, setExistingData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const docRef = doc(db, "genericItems", id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setExistingData(docSnap.data());
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error fetching document: ", error);
            }
        };

        fetchData();
    }, [id]);

    return (
        <div>
            {existingData ? <NewThing existingData={existingData} /> : <p>Loading...</p>}
        </div>
    );
}

export default EditThing;
