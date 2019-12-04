export enum FilterItems {
    ALL,
    DONE,
    UNDONE,
}

export interface Todo {
    id: number,
    done: boolean,
    message: string,
}
