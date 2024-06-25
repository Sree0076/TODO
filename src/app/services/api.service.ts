import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { doc, DocumentSnapshot, getDocs,deleteDoc, query, where,updateDoc} from '@angular/fire/firestore';
// AngularFire
import { collection, addDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(public firestore: Firestore) {}

  async addData(data:any) {
    console.log("Document written with ID:");
    try {
      const docRef = await addDoc(collection(this.firestore, 'Person'), data);
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error(error);
    }
}
async getData()
  {
   const querySnapshot = await getDocs(collection(this.firestore, 'Person'));
    querySnapshot.forEach((document: any) => {
      console.log(document.data());
    });
}
async deleteData( key: any) {
  return await deleteDoc(doc(this.firestore, 'Person', key));
}


async updatedirebaseData(updateData: any, key: any) {
  return await updateDoc(doc(this.firestore, 'Person', key), updateData);
}
}
