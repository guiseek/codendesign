import { FirebaseRepository } from './firebase.repository';
import { FirebaseEntity } from '@cnd/core';

const mockEntity = new FirebaseEntity();
// const mockFirestore = new Object() as AngularFirestore;


describe('FirebaseRepository', () => {
  it('should create an instance', () => {
    expect(new FirebaseRepository(mockEntity)).toBeTruthy();
  });
});
