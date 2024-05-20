export type PaginatedResponse = {
  current_page: number;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: [];
  next_page_url?: string;
  path: string;
  per_page: number;
  prev_page_url?: string;
  queries_log: [];
  to: number;
  total: number;
};
