export interface BookModel {
    id: string | undefined
    isbn: string
    title: string
    author: string
    release_date: string
    genres: string[]
    length: number
    available: number
}
  