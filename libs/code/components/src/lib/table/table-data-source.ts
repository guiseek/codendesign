import { _isNumberValue } from '@angular/cdk/coercion';
import { DataSource } from '@angular/cdk/table';
import {
  BehaviorSubject,
  combineLatest,
  merge,
  Observable,
  of,
  Subscription,
  Subject,
} from 'rxjs';
import { map } from 'rxjs/operators';

import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';

const MAX_SAFE_INTEGER = 9007199254740991;

export class CodeTableDataSource<T> extends DataSource<T> {
  /** Fluxo emitido quando uma nova matriz de dados é definida na fonte de dados. */
  private readonly _data: BehaviorSubject<T[]>;

  /** O fluxo emitido renderiza dados para a tabela (depende das alterações ordenadas dos dados). */
  private readonly _renderData = new BehaviorSubject<T[]>([]);

  /** Fluxo emitido quando uma nova sequência de filtros é definida na fonte de dados. */
  private readonly _filter = new BehaviorSubject<string>('');

  /** Usado para reagir às alterações internas do paginador que são feitas pela própria fonte de dados. */
  private readonly _internalPageChanges = new Subject<void>();

  /**
   * Assinatura das alterações que devem acionar uma atualização nas linhas renderizadas da tabela, como
   * como alterações de filtragem, classificação, paginação ou base de dados.
   */
  _renderChangesSubscription = Subscription.EMPTY;

  /**
   * O conjunto de dados filtrados que foram correspondidos pela sequência de filtros ou todos os dados, se houver
   * não há filtro. Útil para conhecer o conjunto de dados que a tabela representa.
   * Por exemplo, uma função 'selectAll ()' provavelmente desejaria selecionar o conjunto de dados filtrados
   * mostrado ao usuário em vez de todos os dados.
   */
  filteredData: T[];

  /** Matriz de dados que devem ser renderizados pela tabela, em que cada objeto representa uma linha. */
  get data() {
    return this._data.value;
  }
  set data(data: T[]) {
    this._data.next(data);
  }

  /**
   * Termo de filtro que deve ser usado para filtrar objetos da matriz de dados. Para substituir como
   * os objetos de dados correspondem a essa sequência de filtros, fornecem uma função personalizada para filterPredicate.
   */
  get filter(): string {
    return this._filter.value;
  }
  set filter(filter: string) {
    this._filter.next(filter);
  }

  /**
   * Instância da diretiva MatSort usada pela tabela para controlar sua classificação. Classificar alterações
   * emitido pelo MatSort acionará uma atualização nos dados renderizados da tabela.
   */
  get sort(): MatSort | null {
    return this._sort;
  }
  set sort(sort: MatSort | null) {
    this._sort = sort;
    this._updateChangeSubscription();
  }
  private _sort: MatSort | null;

  /**
   * Instância do componente MatPaginator usado pela tabela para controlar qual página dos dados é
   * exibido. As alterações de página emitidas pelo MatPaginator acionarão uma atualização no
   * dados renderizados da tabela.
   *
   * Observe que a fonte de dados usa as propriedades do paginador para calcular qual página de dados
   * deve ser exibido. Se o paginador receber suas propriedades como entradas de modelo,
   * por exemplo. `[pageLength] = 100` ou` [pageIndex] = 1`, verifique se a visualização do paginador foi
   * inicializado antes de atribuí-lo a essa fonte de dados.
   */
  get paginator(): MatPaginator | null {
    return this._paginator;
  }
  set paginator(paginator: MatPaginator | null) {
    this._paginator = paginator;
    this._updateChangeSubscription();
  }
  private _paginator: MatPaginator | null;

  /**
   * Função de acesso a dados usada para acessar propriedades de dados para classificação através
   * a função sortData padrão.
   * Esta função padrão pressupõe que os IDs do cabeçalho de classificação (o padrão é o nome da coluna)
   * corresponde às propriedades dos dados (por exemplo, a coluna Xyz representa dados ['Xyz']).
   * Pode ser definido como uma função personalizada para diferentes comportamentos.
   * @param data Objeto de dados que está sendo acessado.
   * @param sortHeaderId O nome da coluna que representa os dados.
   */
  sortingDataAccessor: (data: T, sortHeaderId: string) => string | number = (
    data: T,
    sortHeaderId: string
  ): string | number => {
    const value = (data as { [key: string]: any })[sortHeaderId];

    if (_isNumberValue(value)) {
      const numberValue = Number(value);

      // Os números além de `MAX_SAFE_INTEGER` não podem ser comparados de maneira confiável.
      // deixe-os como strings. Para mais informações: https://goo.gl/y5vbSg
      return numberValue < MAX_SAFE_INTEGER ? numberValue : value;
    }

    return value;
  };

  /**
   * Obtém uma cópia classificada da matriz de dados com base no estado do MatSort. Chamado
   * depois que as alterações são feitas nos dados filtrados ou quando as alterações de classificação são emitidas pelo MatSort.
   * Por padrão, a função recupera a classificação ativa e sua direção e compara os dados
   * recuperando dados usando o sortingDataAccessor. Pode ser substituído por uma implementação personalizada
   * de ordenação de dados.
   * @param data A matriz de dados que deve ser classificada.
   * @param sort O MatSort conectado que mantém o estado de classificação atual.
   */
  sortData: (data: T[], sort: MatSort) => T[] = (
    data: T[],
    sort: MatSort
  ): T[] => {
    const active = sort.active;
    const direction = sort.direction;
    if (!active || direction == '') {
      return data;
    }

    return data.sort((a, b) => {
      let valueA = this.sortingDataAccessor(a, active);
      let valueB = this.sortingDataAccessor(b, active);

      // Se ambos, valueA e valueB existem (verdade), compare os dois. Caso contrário, verifique se
      // existe um valor enquanto o outro não. Nesse caso, o valor existente deve vir por último.
      // Isso evita resultados inconsistentes ao comparar valores com indefinido / nulo.
      // Se nenhum valor existir, retorne 0 (igual).
      let comparatorResult = 0;
      if (valueA != null && valueB != null) {
        // Verifique se um valor é maior que o outro; se igual, comparatorResult deve permanecer 0.
        if (valueA > valueB) {
          comparatorResult = 1;
        } else if (valueA < valueB) {
          comparatorResult = -1;
        }
      } else if (valueA != null) {
        comparatorResult = 1;
      } else if (valueB != null) {
        comparatorResult = -1;
      }

      return comparatorResult * (direction == 'asc' ? 1 : -1);
    });
  };

  /**
   * Verifica se um objeto de dados corresponde à sequência de filtros da fonte de dados. Por padrão, cada objeto de dados
   * é convertido em uma sequência de suas propriedades e retorna true se o filtro tiver
   * pelo menos uma ocorrência nessa sequência. Por padrão, a cadeia de filtros tem seu espaço em branco
   * aparado e a correspondência não diferencia maiúsculas de minúsculas. Pode ser substituído por uma implementação personalizada de
   * correspondência de filtro.
   * @param data Objeto de dados usado para verificar o filtro.
   * filtro @param String de filtro que foi definida na fonte de dados.
   * @returns Se o filtro corresponde aos dados
   */
  filterPredicate: (data: T, filter: string) => boolean = (
    data: T,
    filter: string
  ): boolean => {
    // Transforme os dados em uma sequência minúscula de todos os valores de propriedade.
    const dataStr = Object.keys(data)
      .reduce((currentTerm: string, key: string) => {
        // Use um caractere Unicode obscuro para delimitar as palavras na string concatenada.
        // Isso evita correspondências onde os valores de duas colunas combinadas corresponderão à consulta do usuário
        // (por exemplo, `Flute` e` Stop` corresponderão a `Test`). O personagem pretende ser algo
        // que tem uma chance muito baixa de ser digitado por alguém em um campo de texto. Este aqui
        // particular é "Triângulo branco apontando para cima com ponto" de
        // https://en.wikipedia.org/wiki/List_of_Unicode_characters
        return currentTerm + (data as { [key: string]: any })[key] + '◬';
      }, '')
      .toLowerCase();

    // Transforme o filtro convertendo-o para minúsculas e removendo o espaço em branco.
    const transformedFilter = filter.trim().toLowerCase();

    return dataStr.indexOf(transformedFilter) != -1;
  };

  constructor(initialData: T[] = []) {
    super();
    this._data = new BehaviorSubject<T[]>(initialData);
    this._updateChangeSubscription();
  }

  /**
   * Assine as alterações que devem acionar uma atualização nas linhas renderizadas da tabela. Quando o
   * ocorrem alterações, processam o estado atual do filtro, classificam e paginam junto com
   * os dados base fornecidos e envie-os para a tabela para renderização.
   */
  _updateChangeSubscription() {
    // A classificação e / ou paginação deve ser observada se MatSort e / ou MatPaginator forem fornecidos.
    // Os eventos devem emitir sempre que o componente emitir uma alteração ou inicializar, ou se não houver
    // componente é fornecido, um fluxo com apenas um evento nulo deve ser fornecido.
    // O `sortChange` e` pageChange` atuam como um sinal para os combineLatests abaixo, para que o
    // o pipeline pode avançar para a próxima etapa. Observe que o valor desses fluxos não é usado,
    // agem puramente como um sinal de progresso no pipeline.
    const sortChange: Observable<Sort | null | void> = this._sort
      ? (merge(
          this._sort.sortChange,
          this._sort.initialized
        ) as Observable<Sort | void>)
      : of(null);
    const pageChange: Observable<PageEvent | null | void> = this._paginator
      ? (merge(
          this._paginator.page,
          this._internalPageChanges,
          this._paginator.initialized
        ) as Observable<PageEvent | void>)
      : of(null);
    const dataStream = this._data;
    // Observe os dados básicos ou as alterações de filtro para fornecer um conjunto de dados filtrados.
    const filteredData = combineLatest([dataStream, this._filter]).pipe(
      map(([data]) => this._filterData(data))
    );
    // Observe os dados filtrados ou classifique as alterações para fornecer um conjunto ordenado de dados.
    const orderedData = combineLatest([filteredData, sortChange]).pipe(
      map(([data]) => this._orderData(data))
    );
    // Observe os dados solicitados ou as alterações na página para fornecer um conjunto de dados paginados.
    const paginatedData = combineLatest([orderedData, pageChange]).pipe(
      map(([data]) => this._pageData(data))
    );
    // Observou as alterações nos dados paginados e envia o resultado para a tabela a ser renderizada.
    this._renderChangesSubscription.unsubscribe();
    this._renderChangesSubscription = paginatedData.subscribe((data) =>
      this._renderData.next(data)
    );
  }

  /**
   * Retorna uma matriz de dados filtrados onde cada objeto de filtro contém a cadeia de filtros dentro
   * o resultado da função filterTermAccessor. Se nenhum filtro estiver definido, retorna a matriz de dados
   * conforme previsto.
   */
  _filterData(data: T[]) {
    // Se houver uma string de filtro, filtre os dados que não a contêm.
    // Cada objeto de dados é convertido em uma string usando a função definida por filterTermAccessor.
    // Pode ser substituído para personalização.
    this.filteredData = !this.filter
      ? data
      : data.filter((obj) => this.filterPredicate(obj, this.filter));

    if (this.paginator) {
      this._updatePaginator(this.filteredData.length);
    }

    return this.filteredData;
  }

  /**
   * Retorna uma cópia ordenada dos dados se MatSort tiver uma classificação aplicada, caso contrário, apenas retornará o
   * matriz de dados conforme fornecido. Usa o acessador de dados padrão para pesquisa de dados, a menos que um
   * a função sortDataAccessor está definida.
   */
  _orderData(data: T[]): T[] {
    // Se não houver uma classificação ou direção ativa, retorne os dados sem tentar classificar.
    if (!this.sort) {
      return data;
    }

    return this.sortData(data.slice(), this.sort);
  }

  /**
   * Retorna uma fatia paginada da matriz de dados fornecida de acordo com a página do MatPaginator fornecida
   * índice e comprimento. Se não houver paginador fornecido, retornará a matriz de dados conforme fornecida.
   */
  _pageData(data: T[]): T[] {
    if (!this.paginator) {
      return data;
    }

    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.slice(startIndex, startIndex + this.paginator.pageSize);
  }

  /**
   * Atualiza o paginador para refletir o comprimento dos dados filtrados e garante que a página
   * índice não excede a última página do paginador. Os valores são alterados em uma promessa resolvida de
   * proteja-se contra fazer alterações de propriedade em uma rodada de detecção de alterações.
   */
  _updatePaginator(filteredDataLength: number) {
    Promise.resolve().then(() => {
      const paginator = this.paginator;

      if (!paginator) {
        return;
      }

      paginator.length = filteredDataLength;

      // Se o índice da página estiver definido além da página, reduza-o para a última página.
      if (paginator.pageIndex > 0) {
        const lastPageIndex =
          Math.ceil(paginator.length / paginator.pageSize) - 1 || 0;
        const newPageIndex = Math.min(paginator.pageIndex, lastPageIndex);

        if (newPageIndex !== paginator.pageIndex) {
          paginator.pageIndex = newPageIndex;

          // Como o paginador é emitido somente após alterações geradas pelo usuário,
          // precisamos de nosso próprio fluxo, para que possamos renderizar novamente os dados.
          this._internalPageChanges.next();
        }
      }
    });
  }

  /**
   * Usado pelo CodeTable. Chamado quando se conecta à fonte de dados.
   * @docs-private
   */
  connect() {
    return this._renderData;
  }

  /**
   * Usado pelo CodeTable. Chamado quando é destruído. No-op.
   * @docs-private
   */
  disconnect() {}
}
