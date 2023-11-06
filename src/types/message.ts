type UUID = ReturnType<typeof self.crypto.randomUUID>

export type Message = {
  id: UUID
  author: string
  time: number
  content: string
}
