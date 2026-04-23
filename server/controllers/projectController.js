import Project from '../models/Project.js';
import ApiError from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js';

export const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 });
  res.status(200).json({
    status: 'success',
    results: projects.length,
    data: projects,
  });
});

export const getProject = asyncHandler(async (req, res, next) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    return next(new ApiError(404, 'Project not found'));
  }

  res.status(200).json({
    status: 'success',
    data: project,
  });
});

export const createProject = asyncHandler(async (req, res) => {
  const project = await Project.create(req.body);

  res.status(201).json({
    status: 'success',
    data: project,
  });
});

export const deleteProject = asyncHandler(async (req, res, next) => {
  const project = await Project.findByIdAndDelete(req.params.id);

  if (!project) {
    return next(new ApiError(404, 'Project not found'));
  }

  res.status(200).json({
    status: 'success',
    message: 'Project deleted successfully',
  });
});

