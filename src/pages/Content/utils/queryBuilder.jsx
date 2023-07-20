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

function getJobData(jobPostingCompany, jobPostingDescription) {
  return jobPostingDescription + " at " + jobPostingCompany;
}

async function queryBuilder(userId, targetName, targetOccupation, targetDescription, jobPostingCompany, jobPostingDescription) {
  try {
    // access via personalData.school and personalData.name
    const personalData = await getPersonalData(userId);
    const jobData = getJobData(jobPostingCompany, jobPostingDescription);
    console.log(personalData);
    console.log(jobData);
    return `I am ${personalData.name} and I am a ${personalData.school} student. I am interested in being a ${jobData}. I found the linkedin profile of ${targetName} at ${targetOccupation}. Here is some more information about them: ${targetDescription}. Write a linkedin message to introduce me to them.`;
  } catch (error) {
    console.error(error);
  }
}

export default queryBuilder;
