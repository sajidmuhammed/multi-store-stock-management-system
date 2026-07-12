import { IStore } from "./store.model";

export const mapStore = (store: IStore) => ({
  id: store._id.toString(),
  name: store.name,
  location: store.location,
  createdAt: store.createdAt,
  updatedAt: store.updatedAt,
});