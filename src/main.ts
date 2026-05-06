import './style.css';
import { ProgressTracker, Task } from './tracker';

const tracker = new ProgressTracker();

// DOM Elements
const taskList = document.getElementById('task-list')!;
const scoreText = document.getElementById('score-text')!;
const scoreCircle = document.getElementById('score-circle')!;
const completedTasksText = document.getElementById('completed-tasks')!;
const overallProgressBar = document.getElementById('overall-progress-bar') as HTMLElement;
const suggestionText = document.getElementById('suggestion-text')!;
const addTaskBtn = document.getElementById('add-task-btn')!;
const modal = document.getElementById('modal')!;
const closeModal = document.querySelector('.close')!;
const taskForm = document.getElementById('task-form') as HTMLFormElement;
const suggestBtn = document.getElementById('suggest-btn')!;

// Initialize
function init() {
    renderDashboard();
    renderTasks();
}

function renderDashboard() {
    const score = Math.round(tracker.calculateProductivityScore());
    const progress = tracker.calculateOverallProgress();
    const completed = tracker.tasks.filter(t => t.completionPercentage === 100).length;

    scoreText.textContent = `${score}%`;
    scoreCircle.setAttribute('stroke-dasharray', `${score}, 100`);
    
    completedTasksText.textContent = `${completed}/${tracker.tasks.length}`;
    overallProgressBar.style.width = `${progress}%`;
    
    suggestionText.textContent = tracker.getSuggestion();
}

function renderTasks() {
    taskList.innerHTML = '';
    
    tracker.tasks.sort((a, b) => b.createdAt - a.createdAt).forEach(task => {
        const item = document.createElement('div');
        item.className = 'task-item';
        item.innerHTML = `
            <div class="task-info">
                <div class="task-name">${task.name}</div>
                <div class="task-meta">
                    <span class="priority-tag prio-${task.priority}">P${task.priority}</span>
                    <span>📅 ${task.deadline}</span>
                    <span>⏱️ ${task.estimatedHours}h</span>
                </div>
            </div>
            <div class="task-actions">
                <input type="number" class="progress-input" value="${task.completionPercentage}" min="0" max="100">%
                <button class="btn-danger" data-id="${task.id}">🗑️</button>
            </div>
        `;

        const input = item.querySelector('.progress-input') as HTMLInputElement;
        input.addEventListener('change', (e) => {
            const val = parseInt((e.target as HTMLInputElement).value);
            tracker.updateTask(task.id, val);
            renderDashboard();
        });

        const deleteBtn = item.querySelector('.btn-danger')!;
        deleteBtn.addEventListener('click', () => {
            tracker.deleteTask(task.id);
            renderTasks();
            renderDashboard();
        });

        taskList.appendChild(item);
    });
}

// Event Listeners
addTaskBtn.addEventListener('click', () => {
    modal.classList.remove('hidden');
});

closeModal.addEventListener('click', () => {
    modal.classList.add('hidden');
});

window.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.add('hidden');
});

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(taskForm);
    
    tracker.addTask({
        name: formData.get('taskName') as string,
        priority: parseInt(formData.get('priority') as string),
        estimatedHours: parseInt(formData.get('hours') as string),
        deadline: formData.get('deadline') as string,
        completionPercentage: 0
    });

    taskForm.reset();
    modal.classList.add('hidden');
    renderTasks();
    renderDashboard();
});

suggestBtn.addEventListener('click', () => {
    suggestionText.textContent = tracker.getSuggestion();
    suggestionText.style.animation = 'none';
    suggestionText.offsetHeight; // trigger reflow
    suggestionText.style.animation = 'slideUp 0.3s ease-out';
});

init();
