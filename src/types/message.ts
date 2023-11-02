type UUID = ReturnType<typeof self.crypto.randomUUID>

type Author = {
  id: UUID
  name: string
}

export type Message = {
  id: UUID
  author: Author
  time: number
  content: string
}