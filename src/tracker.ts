export interface Task {
    id: number;
    name: string;
    priority: number;
    estimatedHours: number;
    completionPercentage: number;
    deadline: string;
    status: 'Not Started' | 'In Progress' | 'Completed';
    timesSkipped: number;
    timesUpdated: number;
    createdAt: number;
    lastUpdated: number;
}

export interface UserBehavior {
    skipRate: number;
    completionRate: number;
    avgPriorityCompleted: number;
    overdueCount: number;
}

export class ProgressTracker {
    tasks: Task[] = [];
    username: string = 'Guest';

    constructor() {
        this.loadFromLocalStorage();
    }

    addTask(task: Omit<Task, 'id' | 'status' | 'timesSkipped' | 'timesUpdated' | 'createdAt' | 'lastUpdated'>): Task {
        const newTask: Task = {
            ...task,
            id: Date.now(),
            status: task.completionPercentage === 100 ? 'Completed' : (task.completionPercentage > 0 ? 'In Progress' : 'Not Started'),
            timesSkipped: 0,
            timesUpdated: 0,
            createdAt: Date.now(),
            lastUpdated: Date.now()
        };
        this.tasks.push(newTask);
        this.saveToLocalStorage();
        return newTask;
    }

    updateTask(id: number, completion: number) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completionPercentage = Math.min(100, Math.max(0, completion));
            task.lastUpdated = Date.now();
            task.timesUpdated++;
            
            if (task.completionPercentage === 0) task.status = 'Not Started';
            else if (task.completionPercentage < 100) task.status = 'In Progress';
            else task.status = 'Completed';
            
            this.saveToLocalStorage();
        }
    }

    deleteTask(id: number) {
        this.tasks = this.tasks.filter(t => t.id !== id);
        this.saveToLocalStorage();
    }

    calculateOverallProgress(): number {
        if (this.tasks.length === 0) return 0;
        const total = this.tasks.reduce((sum, t) => sum + t.completionPercentage, 0);
        return total / this.tasks.length;
    }

    calculateProductivityScore(): number {
        if (this.tasks.length === 0) return 0;

        const completedCount = this.tasks.filter(t => t.completionPercentage === 100).length;
        const completionRate = completedCount / this.tasks.length;

        let weightedCompletion = 0;
        let totalWeight = 0;

        this.tasks.forEach(t => {
            const weight = t.priority / 5;
            weightedCompletion += (t.completionPercentage / 100) * weight;
            totalWeight += weight;
        });

        const weightedScore = totalWeight > 0 ? (weightedCompletion / totalWeight) * 100 : 0;
        
        // Simulating skip rate penalty (could be expanded)
        const skipPenalty = this.tasks.reduce((sum, t) => sum + t.timesSkipped, 0) * 2;

        let score = (completionRate * 50) + (weightedScore * 50) - skipPenalty;
        return Math.min(100, Math.max(0, score));
    }

    analyzeUserBehavior(): UserBehavior {
        const total = this.tasks.length;
        if (total === 0) return { skipRate: 0, completionRate: 0, avgPriorityCompleted: 0, overdueCount: 0 };

        const completed = this.tasks.filter(t => t.completionPercentage === 100);
        const now = new Date();
        const overdue = this.tasks.filter(t => t.completionPercentage < 100 && new Date(t.deadline) < now);

        return {
            skipRate: this.tasks.reduce((sum, t) => sum + t.timesSkipped, 0) / total,
            completionRate: completed.length / total,
            avgPriorityCompleted: completed.length > 0 ? completed.reduce((sum, t) => sum + t.priority, 0) / completed.length : 0,
            overdueCount: overdue.length
        };
    }

    getSuggestion(): string {
        if (this.tasks.length === 0) return "Add your first task to start tracking!";

        const behavior = this.analyzeUserBehavior();
        const incomplete = this.tasks.filter(t => t.completionPercentage < 100);
        
        if (incomplete.length === 0) return "All caught up! Great job. Add some new goals!";

        if (behavior.overdueCount > 0) {
            return `You have ${behavior.overdueCount} overdue tasks. Focus on "${incomplete.find(t => new Date(t.deadline) < new Date())?.name}" first!`;
        }

        // Rule-based selection similar to C logic
        const highestPriority = [...incomplete].sort((a, b) => b.priority - a.priority)[0];
        
        if (behavior.skipRate > 0.4) {
            const easiest = [...incomplete].sort((a, b) => a.priority - b.priority)[0];
            return `You've been skipping a lot lately. Try finishing the easiest task: "${easiest.name}".`;
        }

        if (highestPriority.priority >= 4) {
            return `Focus on your high-priority goal: "${highestPriority.name}". You can do it!`;
        }

        return `Next recommended task: "${incomplete[0].name}". Keep the momentum going!`;
    }

    private saveToLocalStorage() {
        localStorage.setItem('progress_tracker_tasks', JSON.stringify(this.tasks));
    }

    private loadFromLocalStorage() {
        const data = localStorage.getItem('progress_tracker_tasks');
        if (data) {
            this.tasks = JSON.parse(data);
        }
    }
}
