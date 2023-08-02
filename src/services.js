import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, updateDoc } from "firebase/firestore"
import { db } from "./firebase";

export function addDocToDatabase(path, objectToAdd){
    addDoc(collection(db, path), objectToAdd);
}

/** Функция получает от сервера  массив с именами колонок и массив tasks, формирует из этих массивов обьект и помещает его в state*/
export function fetchTasks(path, setState){
    const ref = query(collection(db, path), orderBy('timestamp'));

    onSnapshot(ref, (querySnapshot) => {
        const newTasks = querySnapshot.docs.map((item) => ({...item.data(), id: item.id}));
        setState(newTasks);
    });
}

export function updateDocInDatabase(path, updates){
    updateDoc(doc(db, path), updates);
}

export function deleteDocInDatabase(path){
    deleteDoc(doc(db, path));
}