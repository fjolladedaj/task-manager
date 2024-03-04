export interface Task {
  id: number
  title: string
  description?: string
  completeBy?: Date
  tags?: TaskTag[]
  completed: boolean
  createdAt: Date
  updatedAt?: Date
}

export interface TaskTag {
  name: string
  color: string
}
