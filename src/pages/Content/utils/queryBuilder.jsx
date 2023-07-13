import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

async function getPersonalData(userId) {
  try {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      return data;
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.error(error);
  }
}

// TODO: do not have any job data from the page yet.
async function getJobData() {
  return "Google";
}

async function queryBuilder(userId, targetName, targetOccupation, targetDescription) {
  try {
    // access via personalData.school and personalData.name
    const personalData = await getPersonalData(userId);
    const jobData = await getJobData();
    return `I am ${personalData.name} and I am a ${personalData.school} student. I am interested in ${jobData}. I found the linkedin profile of ${targetName} at ${targetOccupation}. Here is some more information about them: ${targetDescription}. Write a linkedin message to introduce me to them.`;
  } catch (error) {
    console.error(error);
  }
}

export default queryBuilder;
