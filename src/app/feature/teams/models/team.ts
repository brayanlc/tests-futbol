export interface ResponseTeams {
  content: Team[]
  pageable: Pageable
  totalPages: number
  totalElements: number
  last: boolean
  numberOfElements: number
  sort: Sort2
  first: boolean
  size: number
  number: number
  empty: boolean
}

export interface Team {
  id?: number
  nombre?: string
  estadio?: string
  sitioWeb?: string
  nacionalidad?: string
  fundacion?: string
  entrenador?: string
  capacidad?: number
  valor?: number
}

export interface Pageable {
  sort: Sort
  pageNumber: number
  pageSize: number
  offset: number
  paged: boolean
  unpaged: boolean
}

export interface Sort {
  sorted: boolean
  unsorted: boolean
  empty: boolean
}

export interface Sort2 {
  sorted: boolean
  unsorted: boolean
  empty: boolean
}
