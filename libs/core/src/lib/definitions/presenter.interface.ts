import { Output } from './output.interface';

export interface PresenterOutput {
  [k: string]: any
}

export interface Presenter<T extends Output> {
  present(data: T): Promise<PresenterOutput>;
}
