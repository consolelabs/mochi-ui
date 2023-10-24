export type Response<T> = {
  data: T
}

export type Pagination = {
  page?: number
  limit?: number
}

export type CommonQuery = {
  sort?: string
  query?: string
}
