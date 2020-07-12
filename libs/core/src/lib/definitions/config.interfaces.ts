import { HttpHeaders } from '@angular/common/http';
import { BaseEntity } from '../models/base-entity.model';

/**
 * Interface configuração
 * para APIs HTTP RESTFull
 *
 * @export
 * @interface ApiConfig
 */
export interface ApiConfig {
  /**
   * URL da API
   *
   * @type {string}
   * @memberof ApiConfig
   */
  url: string;

  /**
   * Representa o endpoint desejado para requests
   * Usado nos métodos verbosos do HTTP, como Get, Post e etc
   * @example 'items' caso a resposta seja como { items: [] }
   *
   * @type {string}
   * @memberof ApiConfig
   */
  collectionAttribute?: string;

  headers?: HttpHeaders;
}

export interface CustomServiceConfig {
  name: string;
  entity: BaseEntity;
  service: any;
}

export interface EntityServiceConfig {

  /**
   * Renomeia a propriedade usada no
   * contexto atual do serviço de entidade
   *
   * @type {string}
   * @memberof EntityServiceConfig
   */
  name?: string;

  entity: BaseEntity;
}

