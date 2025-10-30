import EducationModel from "../models/education.model.js";

// Get all educations
export const getAllEducations = async (req, res) => {
  try {
    const educations = await EducationModel.find();
    res.status(200).json(educations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get education by ID
export const getEducationById = async (req, res) => {
  try {
    const education = await EducationModel.findById(req.params.id);
    if (!education) return res.status(404).json({ message: "Not found" });
    res.status(200).json(education);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new education
export const createEducation = async (req, res) => {
  try {
    const newEducation = new EducationModel(req.body);
    const savedEducation = await newEducation.save();
    res.status(201).json(savedEducation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update education
export const updateEducation = async (req, res) => {
  try {
    const updatedEducation = await EducationModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedEducation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete education
export const deleteEducation = async (req, res) => {
  try {
    await EducationModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Education deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
