import { FirestoreRepository } from './firestore.repository';
import { FirebaseEntity } from '@cnd/domain';
import { AngularFirestore } from '@angular/fire/firestore';

const mockEntity = new FirebaseEntity();
const mockFirestore = new Object() as AngularFirestore;

describe('FirestoreRepository', () => {
  it('should create an instance', () => {
    expect(new FirestoreRepository(mockEntity, mockFirestore)).toBeTruthy();
  });
});
