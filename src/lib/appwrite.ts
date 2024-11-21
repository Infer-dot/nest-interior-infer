import { Client, Account, Storage, ID, Databases } from "appwrite";


export const ENDPOINT: string = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ENDPOINT || "";
export const PROJECT_ID: string = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "";
export const BUCKET_ID: string = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID || "";
export const DB_ID: string = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "";
export const COLL_PROJECTS: string = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_PROJECTS_ID || ""
export const COLL_CONTACTS: string = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_CONTACTS_ID || ""
export const _ID: string = ID.unique()

const client = new Client()
  .setEndpoint(ENDPOINT)
  .setProject(PROJECT_ID);

export const account = new Account(client);
export const storage = new Storage(client);
export const database = new Databases(client);


export interface IProjects {
  $id?: string,
  project_name: string,
  description: string,
  image_url: string,
  file_id?: string;
}


export interface ICont {
  phone_no: string,
  whatsapp_no: string,
  email: string,
}


export const create_file = async (file: File) => {
  const cloudfile = await storage.createFile(BUCKET_ID, _ID, file);
  return {
    filePath: storage.getFileView(BUCKET_ID, cloudfile.$id),
    file_ID: cloudfile.$id,
  };
};

export const delete_file = async (fileId: string): Promise<boolean> => {
  try {
    await storage.deleteFile(BUCKET_ID, fileId);
    return true;
  } catch (error) {
    console.error("Error while deleting uploaded file @appwrite.ts", error);
    return false;
  }
};

export const createProject = async (projectProp: IProjects) => {
  const document = await database.createDocument(
    DB_ID,
    COLL_PROJECTS,
    _ID,
    projectProp
  )
  if (document) {
    console.log("Project Created Successfully")
  }

  return document?.$id

}
export const getAllProjects = async () => {
  const result = await database.listDocuments(
    DB_ID,
    COLL_PROJECTS
  );
  console.log(result)
  return result
}

export const getProject = async (projectID: string) => {
  const result = await database.getDocument(
    DB_ID,
    COLL_PROJECTS,
    projectID
  );
  console.log(result)
  return result
}

export const deleteProject = async (projectID: string) => {
  const result = await database.getDocument(
    DB_ID,
    COLL_PROJECTS,
    projectID
  );
  console.log(result)
  return result
}

