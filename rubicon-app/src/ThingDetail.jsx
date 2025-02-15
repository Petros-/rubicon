import React, {useState, useEffect} from "react";
import { collection, getDocs, doc, getDoc, onSnapshot } from "firebase/firestore";
import { useParams } from 'react-router-dom';
import db from '../db';

function ThingDetail () {
    const { id } = useParams();
    const [thing, setThing] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)

    // show details
    useEffect(() => {
        const getData = async () => {
            try {
                const docRef = doc(db, "genericItems", id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists) {
                    setThing(docSnap.data())
                } else {
                    setHasError(true);
                }
            } catch (error) {
                console.error("Error fetching document:", error);
                setHasError(true);
            } finally {
                setIsLoading(false);
            }
        };
       
        getData();
    
      }, [id]);

    console.log(thing)

    if (isLoading) {
        return <h2>Loading...</h2>
    }

    if (hasError) {
        return <h2>Error!!!</h2>
    }

    return (
        <div>
            <h1>{thing.title}</h1>
            <p>{thing.description}</p>  
            {/* <button onClick={() => deleteHandler(entry.id)}>Delete</button>    */}
        </div>
    )

}

export default ThingDetail