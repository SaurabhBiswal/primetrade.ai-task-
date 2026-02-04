import { Task } from '../models/Task.js';

export const createTask = async (req, res) => {
    try {
        const { title, description, status, priority, dueDate } = req.body;

        if (!title) {
            res.status(400).json({
                success: false,
                message: 'Task title is required',
            });
            return;
        }

        const task = await Task.create({
            title,
            description,
            status: status || 'todo',
            priority: priority || 'medium',
            dueDate: dueDate ? new Date(dueDate) : undefined,
            user: req.userId,
        });

        res.status(201).json({
            success: true,
            message: 'Task created successfully',
            data: task,
        });
    } catch (error) {
        console.error('Create task error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Error creating task',
        });
    }
};

export const getTasks = async (req, res) => {
    try {
        const { search, status, priority } = req.query;

        // Build query
        const query = { user: req.userId };

        if (status) {
            query.status = status;
        }

        if (priority) {
            query.priority = priority;
        }

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
            ];
        }

        const tasks = await Task.find(query).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: tasks.length,
            data: tasks,
        });
    } catch (error) {
        console.error('Get tasks error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Error fetching tasks',
        });
    }
};

export const getTask = async (req, res) => {
    try {
        const task = await Task.findOne({
            _id: req.params.id,
            user: req.userId,
        });

        if (!task) {
            res.status(404).json({
                success: false,
                message: 'Task not found',
            });
            return;
        }

        res.status(200).json({
            success: true,
            data: task,
        });
    } catch (error) {
        console.error('Get task error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Error fetching task',
        });
    }
};

export const updateTask = async (req, res) => {
    try {
        const { title, description, status, priority, dueDate } = req.body;

        const updateData = {};
        if (title !== undefined) updateData.title = title;
        if (description !== undefined) updateData.description = description;
        if (status !== undefined) updateData.status = status;
        if (priority !== undefined) updateData.priority = priority;
        if (dueDate !== undefined) updateData.dueDate = dueDate ? new Date(dueDate) : null;

        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, user: req.userId },
            updateData,
            { new: true, runValidators: true }
        );

        if (!task) {
            res.status(404).json({
                success: false,
                message: 'Task not found',
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: 'Task updated successfully',
            data: task,
        });
    } catch (error) {
        console.error('Update task error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Error updating task',
        });
    }
};

export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            user: req.userId,
        });

        if (!task) {
            res.status(404).json({
                success: false,
                message: 'Task not found',
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: 'Task deleted successfully',
        });
    } catch (error) {
        console.error('Delete task error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Error deleting task',
        });
    }
};
