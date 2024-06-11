export interface Task {
    title: string;
    description: string;
    priority: string;
    dueDate: Date;
    status: string;
    labels: string[];
    attachments: string[];
    history: {
        timestamp: Date;
        action: string;
        user: string;
    }[];
    dependencies: string[];
    assignee: string;
    collaborators: string[];
}