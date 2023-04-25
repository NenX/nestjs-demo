import { PaginationResultInterface } from './pagination.results.interface';

export class Pagination<PaginationEntity> {
  public result: PaginationEntity[];
  public page_total: number;
  public total: number;

  constructor(paginationResults: PaginationResultInterface<PaginationEntity>) {
    this.result = paginationResults.result;
    this.page_total = paginationResults.result.length;
    this.total = paginationResults.total;
  }
}