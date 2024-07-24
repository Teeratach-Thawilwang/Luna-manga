export interface PaginationInterface {
  current: number;
  next: number | null;
  previous: number | null;
  last: number | null;
  total: number | null;
}

export interface PaginateTabInterface extends PaginationInterface {
  navigatePagination: (page: number) => void;
}
