export type Task = {
    id: string;
    completed: boolean;
    name: string;
};

export enum PageStatus {
    all = "All",
    active = "Active",
    completed = "Completed",
}

