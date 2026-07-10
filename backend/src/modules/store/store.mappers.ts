import { IStore } from "./store.model";

export const mapStore = (store: IStore) => ({
  id: store._id.toString(),
  name: store.name,
  createdAt: store.createdAt,
  updatedAt: store.updatedAt,
});