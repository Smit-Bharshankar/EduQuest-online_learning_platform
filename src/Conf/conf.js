const conf = {
    appwriteURL: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),

    appwriteCollectionId_Users: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID_USERS),
    appwriteCollectionId_Courses: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID_COURSES),
    appwriteCollectionId_Lessons: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID_LESSONS),
    appwriteCollectionId_Enrollment: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID_ENROLLMENT),
    appwriteCollectionId_Doubts: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID_DOUBTS),
    appwriteCollectionId_Comments: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID_COMMENTS),
    appwriteCollectionId_Tests: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID_TESTS),
    
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
}

export default conf;