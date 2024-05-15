type TaskSuper = {
	title: string
	exitOnError?: boolean
	timer?: boolean
}
type TaskList = TaskSuper & {
	task: Task[]
	concurrent?: boolean
	collapseSubtasks?: boolean
}

type TaskExec = TaskSuper & {
	task: ( ) => void
}

export type Task = TaskList | TaskExec

export type Tasks = TaskList
