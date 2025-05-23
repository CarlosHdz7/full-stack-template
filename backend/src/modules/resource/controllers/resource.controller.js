import { createResourceDto } from "../dtos/createResourceDto.js";
import * as resourceService from "../services/resource.service.js";

export const addResource = async (req, res) => {
  const { isValid, errors, value } = createResourceDto(req.body);

  if (!isValid) {
    return res.status(400).json({ message: "Validation error", errors });
  }

  try {
    await resourceService.createResource(value);
    return res.status(201).json({ message: "Resource created successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const listResources = async (_, res) => {
  try {
    const data = await resourceService.getAllResources();
    return res.json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateResource = async (req, res) => {
  const { id } = req.params;

  try {
    await resourceService.updateResource(id, req.body);
    return res.status(200).json({ message: "Resource updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export const deleteResource = async (req, res) => {
  const { id } = req.params;

  try {
    await resourceService.deleteResource(id);
    return res.status(200).json({ message: "Resource deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}