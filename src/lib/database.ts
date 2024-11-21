import { database, DB_ID, COLL_PROJECTS, COLL_CONTACTS, _ID, IProjects } from "./appwrite";

// Define the structure of collections
type Collection = {
  databaseId: string;
  id: string;
  name: 'projects' | 'contacts'; // Add more keys if needed
};

// Define the structure of db
type DB = {
  [key in Collection['name']]: {
    create: (payload: any) => Promise<any>;
    get: (id: string) => Promise<any>;
    list: () => Promise<any>;
    remove: (id: string) => Promise<any>
  };
};

// Define the collections array
const collections: Collection[] = [
  {
    databaseId: DB_ID,
    id: COLL_PROJECTS,
    name: 'projects',
  },
  {
    databaseId: DB_ID,
    id: COLL_CONTACTS,
    name: 'contacts',
  },
];

// Initialize db object
const db: Partial<DB> = {}; // Use Partial while populating dynamically
collections.forEach((col) => {
  db[col.name] = {
    create: async (payload: IProjects) => {
      const project = await database.createDocument(col.databaseId, col.id, _ID, payload)
      return project.$id
    },
    get: (id: string) =>
      database.getDocument(col.databaseId, col.id, id),
    list: () =>
      database.listDocuments(col.databaseId, col.id),
    remove: async (id: string) => {
      database.deleteDocument(col.databaseId, col.id, id)
      return true
    }
  };
});

export default db as DB; // Cast to DB after populating
