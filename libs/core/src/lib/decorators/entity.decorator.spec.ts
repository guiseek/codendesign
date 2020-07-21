import { AbstractEntity } from '../abstractions/abstract-entity.model';
import { Entity } from './entity.decorator';

/* tslint:disable */
@Entity('Fixture')
class Fixture extends AbstractEntity {}

describe('Entity Decorator', () => {
  it('should populate $$name property', () => {
    const mock = new Fixture();
    expect((mock as any)['$$name']).toBe('Fixture');
  });
});
