import { projectFirestore } from "../../firebase/fbConfig";


export function GetEvents() {
  return projectFirestore.collection('events').get();
}
export function GetEquipments() {
  return projectFirestore.collection('equipments').get();
}
export function GetPeople() {
  return projectFirestore.collection('people').get();
}
export function UpdateEvents(id) {
  return projectFirestore.collection('events').doc(id)
}
export function UpdateEquipments(id) {
  return projectFirestore.collection('equipments').doc(id)
}
export function UpdatePeople(id) {
  return projectFirestore.collection('people').doc(id)
}
