import conf from '../Conf/conf'
import { Client, Account, ID  , Databases , Storage, Query} from "appwrite";

export class Service {
    client = new Client();
    databases;
    storage;

    constructor () {
        this.client
            .setEndpoint(conf.appwriteURL)
            .setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }
        // User-Related Methods

    async createUserDocument({userName , email , password , dob}) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId_Users,
                ID.unique(),
                {
                    userId: ID.unique(), // You can use ID.unique() to generate a unique userId
                    userName: userName, // Store the userName
                    email: email, // Store the email
                    password: password, // Store the password (ensure it's hashed)
                    DOB: dob // Store the date of birth (ensure it's in the correct DateTime format dd-mm-yyyy --:--:----)
                }
            )
        } catch (error) {
            console.log("Appwrite configure :: createUserDocument :: error" , error);
            return false;
        }
    }

    async findUserByEmail(email) {
        try {
            const response = await this.databases.listDocuments(
                conf.appwriteDatabaseId, // Your Database ID
                conf.appwriteCollectionId_Users, // Your Collection ID
                [
                    Query.equal('email', email)
                ]
            );
    
            if (response.documents.length > 0) {
                const document = response.documents[0];
                return document.$id;
            } else {
                console.log("No document found with the given email.");
                return null;
            }
        } catch (error) {
            console.log("Appwrite configure :: findUserByEmail :: error", error);
            return false;
        }
    }

    async updateUserDocument({ documentId, userName, email, password, dob }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId_Users,
                documentId, // Document ID to update
                {
                    userName: userName, // Update the userName
                    email: email, // Update the email
                    password: password, // Update the password (ensure it's hashed)
                    DOB: dob // Update the date of birth
                }
            );
        } catch (error) {
            console.error("Appwrite configure :: updateUserDocument :: error", error);
            return false;
        }
    }

    // Course-Related Methods

    async createCourse({ title , description , instructor , createdAt}) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId_Courses,
                ID.unique,
                {
                    courseId: ID.unique,
                    title: title,
                    description: description,
                    instructor:instructor,
                    createdAt:createdAt,
                    updatedAt:createdAt
                }
            )
        } catch (error) {
            console.error("Appwrite configure :: createCourse :: error", error);
            return false;
        }
    }

    async getCourseById({courseId}) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId_Courses,
                courseId,
            )
           
        } catch (error) {
            console.error("Appwrite configure :: getCourseById :: error", error);
            return null;
        }
    }

    async updateCourse({courseId , title , description , instructor , updatedAt}) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId_Courses,
                courseId,
                {
                    title: title,
                    description: description,
                    instructor:instructor,
                    updatedAt:updatedAt,
                }
            )
        } catch (error) {
            console.error("Appwrite configure :: updateCourse :: error", error);
            return false;
        }
    }

    async deleteCourse ({courseId}) {
        try {
            return await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId_Courses,
                courseId,
            )
        } catch (error) {
            console.error("Appwrite configure :: deleteCourse :: error", error);
            return false;
        }
    }

    async listAllCourses({}) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId_Courses,
            )
        } catch (error) {
            console.error("Appwrite configure :: listAllCourses :: error", error);
            return false;
        }
    }

    // Lesson-Related Methods

    async createLesson({ courseId , title , content , videoUrl , lessonNum , createdAt }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId_Lessons,
                ID.unique,
                {
                    lessonId: ID.unique,
                    courseId: courseId,
                    title: title,
                    content: content,
                    videoUrl: videoUrl,
                    lessonNumber: lessonNum,
                    createdAt: createdAt,
                    updatedAt: createdAt,
                }
            )
        } catch (error) {
            console.error("Appwrite configure :: createLesson :: error", error);
            return false;
        }
    }

    async getLessonsByCourseId ({courseId}) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId_Lessons,
                courseId,
            )
        } catch (error) {
            console.error("Appwrite configure :: getLessonByCourseId :: error", error);
            return false;
        }
    }

    async updateLesson({lessonId , courseId , title , content , videoUrl , lessonNum , updatedAt }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId_Lessons,
                lessonId,
                {
                    courseId: courseId,
                    title: title,
                    content: content,
                    videoUrl: videoUrl,
                    lessonNumber: lessonNum,
                    updatedAt: updatedAt,
                }
            )
        } catch (error) {
            console.error("Appwrite configure :: updateLesson :: error", error);
            return false;
        }
    }

    async deleteLesson({lessonId}) {
        try {
            return await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId_Lessons,
                lessonId,
            )
        } catch (error) {
            console.error("Appwrite configure :: deleteLesson :: error", error);
            return false;
        }
    }

    // Enrollment-Related Methods

    async enrollUserInCourse({userId , courseId , progress , startDate }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId_Enrollment,
                ID.unique,
                {
                    enrollmentId: ID.unique,
                    userId: userId,
                    courseId: courseId,
                    progress: progress,
                    startDate: startDate,
                    endDate: null,
                }
            )
        } catch (error) {
            console.error("Appwrite configure :: enrollUserinCourse :: error", error);
            return false;
        }
    }

    async getEnrollmentsByUserId({userId}) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId_Enrollment,
                [
                    Query.equal("userId",userId)
                ]
            )
        } catch (error) {
            console.error("Appwrite configure :: getEnrollmentsByUserId :: error", error);
            return false;
        }
    }

    async updateEnrollmentProgress({enrollmentId , progress}) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId_Enrollment,
                enrollmentId,
                {
                    progress: progress,
                }
            )
        } catch (error) {
            console.error("Appwrite configure :: updateEnrollmentProgress :: error", error);
            return false;
        }
    }

    async deleteEnrollment({enrollmentId}) {
        try {
            return await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId_Enrollment,
                enrollmentId
            )
        } catch (error) {
            console.error("Appwrite configure :: deleteEnrollment :: error", error);
            return false;
        }
    }

    // Doubt-Related Methods

    async createDoubt({lessonId , userId , question , timestamp}) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId_Doubts,
                ID.unique,
                {
                    doubtId: ID.unique,
                    lessonId: lessonId,
                    userId: userId,
                    question: question,
                    timestamp: timestamp,
                }
            )
        } catch (error) {
            console.error("Appwrite configure :: createDoubt :: error", error);
            return false;
        }
    }

    async getDoubtsByLessonId({lessonId}) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId_Doubts,
                lessonId,
            )
        } catch (error) {
            console.error("Appwrite configure :: gerDoubtsByLessonId :: error", error);
            return false;
        }
    }

    async deleteDoubt({doubtId}) {
        try {
            return await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId_Doubts,
                doubtId
            )
        } catch (error) {
            console.error("Appwrite configure :: deleteDoubt :: error", error);
            return false;
        }
    }

    // Comment-Related Methods

    async createComment({doubtId , userId , comment , timestamp}) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId_Comments,
                ID.unique,
                {
                    commentId: ID.unique,
                    doubtId: doubtId,
                    userId: userId,
                    comment: comment,
                    timestamp: timestamp
                }
            )
        } catch (error) {
            console.error("Appwrite configure :: createComment :: error", error);
            return false;
        }
    }

    async getCommentsByDoubtId({doubtId}) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId_Comments,
                [
                    Query.equal("doubtId",doubtId)
                ]
            )
        } catch (error) {
            console.error("Appwrite configure :: getCommentsByDoubtId :: error", error);
            return false;
        }
    }

    async deleteComment({commentId}) {
        try {
            return await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId_Comments,
                commentId
            )
        } catch (error) {
            console.error("Appwrite configure :: deleteComment :: error", error);
            return false;
        }
    }

    //  Test-Related Methods

    async createTest({courseId , questions , userId , score , timestamp}) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId_Tests,
                ID.unique,
                {
                    testId: ID.unique,
                    courseId: courseId,
                    questions: questions,
                    userId: userId,
                    score: score,
                    timestamp: timestamp
                }
            )
        } catch (error) {
            console.error("Appwrite configure :: createTest :: error", error);
            return false;
        }
    }

    async getTestByCourseId({courseId}) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId_Tests,
                [
                    Query.equal("courseId",courseId)
                ]
            )
        } catch (error) {
            console.error("Appwrite configure :: getTestByCourseId :: error", error);
            return false;
        }
    }

    async updateTestResult({testId , score , timestamp}) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId_Tests,
                testId,
                {
                    score: score,
                    timestamp: timestamp,
                }
            )
        } catch (error) {
            console.error("Appwrite configure :: updateTestResult :: error", error);
            return false;
        }
    }

    async deleteTest({testId}){
        try {
            return await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId_Tests,
                testId,
            )
        } catch (error) {
            console.error("Appwrite configure :: deleteTest :: error", error);
            return false;
        }
    }

    // Utility Methods

    async getDocumentById({collectionId , documentId}) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                collectionId,
                documentId,
            )
        } catch (error) {
            console.error("Appwrite configure :: getDocuments :: error", error);
            return false;
        }
    }

    async listDocuments({collectionId , queries=[]}){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                collectionId,
                queries,
            )
        } catch (error) {
            console.error("Appwrite configure :: listDocuments :: error", error);
            return false;
        }
    }



    // file upload 4:16
}

const service = new Service();

export default service;

