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
        this.account = new Account(this.client);
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }
        // User-Related Methods

    async createUserDocument({userName , email , location , dob , contact ,profileImgId}) {

        function formatDate() {
            const now = new Date();
            const day = String(now.getDate()).padStart(2, '0');
            const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
            const year = String(now.getFullYear()).slice(-2); // Last two digits of the year
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
        
            return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
        }
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId_Users,
                ID.unique(),
                {
                    userID: ID.unique(), // You can use ID.unique() to generate a unique userId
                    userName: userName , // Store the userName
                    email: email, // Store the email
                    location: location, // Store the location 
                    birthDate: dob ,// Store the date of birth (ensure it's in the correct DateTime format dd-mm-yyyy --:--:----)
                    contact: contact ,
                    profilePicture: profileImgId ,
                    createdAt: formatDate(),
                    updatedAt: formatDate(),
                }
            )
        } catch (error) {
            console.log("Appwrite configure :: createUserDocument :: error" , error);
            return error;
        }
    }

    async findUserByEmail(email) {
        try {
            const response = await this.databases.listDocuments(
                conf.appwriteDatabaseId, // Your Database ID
                conf.appwriteCollectionId_Users, // Your Collection ID
                [Query.equal('email', email)]
            );
    
            if (response.documents.length > 0) {
                // Return the first document (assuming email is unique)
                return response.documents[0].$id;
            } else {
                console.log(`No document found for email: ${email}`);
                return null;
            }
        } catch (error) {
            console.error("Error fetching user by email:", error);
            throw new Error("Failed to find user by email");
        }
    }
    

    async findUserById(userID) {
        try {
            const response = await this.databases.listDocuments(
                conf.appwriteDatabaseId, // Your Database ID
                conf.appwriteCollectionId_Users, // Your Collection ID
                [Query.equal('$id', userID)]
            );
    
            if (response.documents.length > 0) {
                // Return the user document
                return response.documents[0];
            } else {
                console.log(`No user found for ID: ${userID}`);
                return null;
            }
        } catch (error) {
            console.error("Error fetching user by ID:", error);
            throw new Error("Failed to find user by ID");
        }
    }
    
    

    async updateUserDocument({ documentId,userName , email , location , dob , contact }) {

        function formatDate() {
            const now = new Date();
            const day = String(now.getDate()).padStart(2, '0');
            const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
            const year = String(now.getFullYear()).slice(-2); // Last two digits of the year
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
        
            return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
        }
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId_Users,
                documentId, // Document ID to update
                {
                    userName: userName, // Update the userName
                    email: email, // Update the email
                    location: location, // Store the location 
                    birthDate: dob ,
                    contact: contact , // Update the password (ensure it's hashed)
                    updatedAt: formatDate(),
                }
            );
        } catch (error) {
            console.error("Appwrite configure :: updateUserDocument :: error", error);
            return error;
        }
    }

    // Course-Related Methods

    async createCourse({ title , description , instructor , category=null , thumbnail}) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId_Courses,
                ID.unique(),
                {
                    courseId: ID.unique(),
                    title: title,
                    description: description,
                    instructor:instructor,
                    category:category,
                    thumbnail:thumbnail,
                    
                }
            )
        } catch (error) {
            console.error("Appwrite configure :: createCourse :: error", error);
            return false;
        }
    }

    async getCourseById(courseId) {
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

    async updateCourse({courseId , title , description , instructor , category=null , thumbnail}) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId_Courses,
                courseId,
                {
                    title: title,
                    description: description,
                    instructor:instructor,
                    category:category,
                    thumbnail:thumbnail,
                    
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

    async getLessonsByCourseId(courseID) {
        try {
            const response = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId_Lessons,
                [Query.equal("courseID", courseID)]
            );
            return response.documents;
        } catch (error) {
            console.error("Appwrite configure :: getLessonsByCourseId :: error", error);
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

    async createComment({courseID , userID , comment}) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId_Comments,
                ID.unique(),
                {
                    commentID: ID.unique(),
                    courseID: courseID,
                    userID: userID,
                    comment: comment,
                    
                }
            )
        } catch (error) {
            console.error("Appwrite configure :: createComment :: error", error);
            return false;
        }
    }

    async getCommentsByCourseId(courseID) {
        try {
            console.log("Course ID:", courseID);
            
            // Ensure courseID is correctly formatted as a string
            const response = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId_Comments,
                [Query.equal("courseID", courseID)] // Ensure courseID matches the stored value
            );
    
            console.log("Comments response:", response); // Log the response
            return response.documents; // Return the documents array
        } catch (error) {
            console.error("Appwrite configure :: listComments :: error", error);
            return false; // Handle error appropriately
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

    async getTestByCourseId(courseID) {
        try {
           const testData =  await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId_Tests,
                [
                    Query.equal("courseID",courseID)
                ]
            )
            if (testData) return testData;
        } catch (error) {
            console.error("Appwrite configure :: getTestByCourseId :: error", error);
            return false;
        }
    }

    async createTestResult({userID , courseID , testID , score , isPassed , answers , totalMarks , certificateID}) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId_Test_Results,
                ID.unique(),
                {
                    resultID : ID.unique(),
                    userID : userID ,
                    courseID : courseID,
                    testID : testID ,
                    isPassed : isPassed ,
                    answers : answers ,
                    totalMarks : totalMarks ,
                    score: score,
                    certificateID: certificateID,
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

    async uploadFile (file) {
        try {
            return await this.storage.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error " , error)
            return false
        }
    }

    async deleteFile (fileID) {
        try {
             await this.storage.deleteFile(
                conf.appwriteBucketId,
                fileID
            )
            return true
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error " , error)
            return false
        }
    }

    getProfilePic(fileID) {
        try {
            const fileView =  this.storage.getFileView(
                conf.appwriteBucketId,
                fileID
            );
            // Check if fileView has the expected URL structure
            if (fileView && fileView.href) {
                return fileView.href;  // Return the file URL
            }
            return false;  // In case fileView is empty or doesn't have href
        } catch (error) {
            console.log("Appwrite service :: getProfilePic :: error ", error);
            return false;
        }
    }
}

const service = new Service();

export default service;

