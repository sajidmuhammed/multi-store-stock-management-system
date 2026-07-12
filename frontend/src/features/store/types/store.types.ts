export interface Store {
  id: string;
  name: string;
  location: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateStoreRequest {
  name: string;
  location: string;
}