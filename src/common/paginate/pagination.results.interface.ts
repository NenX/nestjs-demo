export interface PaginationResultInterface<PaginationEntity> {
  result: PaginationEntity[];
  total: number;
  next?: string;
  previous?: string;
}