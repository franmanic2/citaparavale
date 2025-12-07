import { db } from '../firebaseConfig';
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { Suitor } from '../domain/Suitor';

const COLLECTION_NAME = 'suitors';

export class FirebaseSuitorRepository {
  async save(suitor) {
    try {
      // Create a plain object from the suitor entity to save
      const suitorData = {
        name: suitor.name,
        age: suitor.age,
        occupation: suitor.occupation,
        hobbies: suitor.hobbies,
        likes: suitor.likes,
        // We let Firestore generate the ID or use the one provided, 
        // usually for new docs we let Firestore handle IDs but since we have UUIDs:
        externalId: suitor.id 
      };
      
      await addDoc(collection(db, COLLECTION_NAME), suitorData);
    } catch (e) {
      console.error("Error adding document: ", e);
      throw e;
    }
  }

  async getAll() {
    try {
      const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
      const suitors = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        // Map Firestore data to Domain Entity
        suitors.push(new Suitor({
          id: data.externalId || doc.id,
          name: data.name,
          age: data.age,
          occupation: data.occupation,
          hobbies: data.hobbies,
          likes: data.likes
        }));
      });
      return suitors;
    } catch (e) {
      console.error("Error getting documents: ", e);
      return [];
    }
  }

  async findByName(name) {
    if (!name) return [];
    try {
      // Firestore simple query limitations: "name" >= "query" and "name" <= "query" + "\uf8ff" handles prefix search
      // But for simplicity/flexibility with small datasets, we'll fetch all and filter in memory
      // OR use a specific query if the dataset grows. Let's do in-memory for exact match behavior consistency.
      
      const allSuitors = await this.getAll();
      return allSuitors.filter(s => 
        s.name.toLowerCase().includes(name.toLowerCase())
      );
    } catch (e) {
      console.error("Error searching documents: ", e);
      return [];
    }
  }
}
