type User = {
  name: string
  password: string
  isAuth: boolean
}

type Invalid = {
  name: boolean
  password: boolean
}

export type { User, Invalid }
