import { firestore } from '.';
import { IStore } from '../stores/types/IStore';
type IDb = ReturnType<typeof firestore.collection>;

type IExtendedType = IStore;

export abstract class FirebaseAPI<ReturnType extends IExtendedType> {
  firestore: typeof firestore;
  collection: string;
  db: IDb;

  constructor(collection: string) {
    this.firestore = firestore;
    this.collection = collection;
    this.db = this.firestore.collection(this.collection);
  }

  createSubscription(
    filter: 'added' | 'modified' | 'removed',
    broadcast: (value: ReturnType) => void,
  ) {
    return this.db.onSnapshot(snapshot => {
      snapshot
        .docChanges()
        .filter(change => {
          return change.type === filter;
        })
        .map(item => {
          const dataItem: any = { id: item.doc.id, ...item.doc.data() };
          broadcast(dataItem);
        });
    });
  }

  async getMany(
    filter?: [string, any & string, string],
  ): Promise<ReturnType[]> {
    const data: ReturnType[] = [];
    let snapshot = filter
      ? await this.db.where(...filter).get()
      : await this.db.get();
    if (snapshot.empty) {
      return [];
    }
    snapshot.forEach(doc => {
      const item: Omit<ReturnType, 'id'> = doc.data() as Omit<ReturnType, 'id'>;
      const dataItem = {
        id: doc.id,
        ...item,
      } as ReturnType;
      data.push(dataItem);
    });
    return data;
  }

  async getOne(id: string): Promise<ReturnType | null> {
    const doc = await this.db.doc(id).get();
    if (!doc.exists) {
      return null;
    }
    const data = doc.data() as Omit<ReturnType, 'id'>;
    const dataItem = { id: doc.id, ...data } as ReturnType;
    return dataItem;
  }

  async add(payload: Omit<ReturnType, 'id'>): Promise<ReturnType | null> {
    const addedItem = await this.db.add(payload);
    return await this.getOne(addedItem.id);
  }

  async update(
    id: string,
    payload: Partial<ReturnType>,
  ): Promise<ReturnType | null> {
    if (payload.id) {
      delete payload.id;
    }
    await this.db.doc(id).update(payload);
    return await this.getOne(id);
  }

  async delete(
    id: string,
  ): Promise<{ id: string; success: boolean; message: string }> {
    const hasItem = await this.getOne(id);
    if (!hasItem) {
      return {
        id,
        success: false,
        message: `Object with id - ${id} not found`,
      };
    }
    const result = await this.db.doc(id).delete();
    return {
      id,
      success: true,
      message: `Document deleted at: ${result.writeTime.toDate()}`,
    };
  }
}
