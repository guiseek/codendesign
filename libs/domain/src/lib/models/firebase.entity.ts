import { BaseEntity } from '../abstraction/base-entity.model';

export class FirebaseEntity extends BaseEntity {
  name: string;

  private toRecord(): any {
    return {
      id: this.id,
      name: this['name']
    };
  }
}
