export interface Meta {
  pageSize: number;
  currentPage: number;
  total: number;
  totalPage: number;
}

export interface ApiResponse<T> {
  status_code: number;
  status_description: string;
  data?: T;
  meta?: Meta;
}