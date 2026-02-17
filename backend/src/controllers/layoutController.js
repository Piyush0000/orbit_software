const StoreLayout = require('../models/mongoose/StoreLayout');
const Template = require('../models/mongoose/Template');
const Section = require('../models/mongoose/Section');

const getLayout = async (req, res, next) => {
  try {
    const layout = await StoreLayout.findOne({ storeId: req.params.storeId });
    res.json({ layout });
  } catch (err) {
    next(err);
  }
};

const updateLayout = async (req, res, next) => {
  try {
    const layout = await StoreLayout.findOneAndUpdate(
      { storeId: req.params.storeId },
      req.body,
      { upsert: true, new: true }
    );
    res.json({ layout });
  } catch (err) {
    next(err);
  }
};

const addSection = async (req, res, next) => {
  try {
    const layout = await StoreLayout.findOneAndUpdate(
      { storeId: req.params.storeId },
      { $push: { sections: req.body } },
      { new: true }
    );
    res.status(201).json({ layout });
  } catch (err) {
    next(err);
  }
};

const updateSection = async (req, res, next) => {
  try {
    const layout = await StoreLayout.findOneAndUpdate(
      { 'sections._id': req.params.sectionId },
      { $set: { 'sections.$': req.body } },
      { new: true }
    );
    res.json({ layout });
  } catch (err) {
    next(err);
  }
};

const deleteSection = async (req, res, next) => {
  try {
    const layout = await StoreLayout.findOneAndUpdate(
      { storeId: req.params.storeId },
      { $pull: { sections: { _id: req.params.sectionId } } },
      { new: true }
    );
    res.json({ layout });
  } catch (err) {
    next(err);
  }
};

const updateTheme = async (req, res, next) => {
  try {
    const layout = await StoreLayout.findOneAndUpdate(
      { storeId: req.params.storeId },
      { theme: req.body },
      { new: true, upsert: true }
    );
    res.json({ layout });
  } catch (err) {
    next(err);
  }
};

const listTemplates = async (req, res, next) => {
  try {
    const templates = await Template.find({ isActive: true });
    res.json({ templates });
  } catch (err) {
    next(err);
  }
};

const getTemplate = async (req, res, next) => {
  try {
    const template = await Template.findById(req.params.id);
    res.json({ template });
  } catch (err) {
    next(err);
  }
};

const applyTemplate = async (req, res, next) => {
  try {
    const template = await Template.findById(req.body.templateId);
    if (!template) return res.status(404).json({ message: 'Template not found' });
    const layout = await StoreLayout.findOneAndUpdate(
      { storeId: req.params.storeId },
      {
        templateId: template.id,
        sections: template.defaultSections || [],
        theme: template.defaultTheme || {}
      },
      { new: true, upsert: true }
    );
    res.json({ layout });
  } catch (err) {
    next(err);
  }
};

const createTemplate = async (req, res, next) => {
  try {
    const template = await Template.create(req.body);
    res.status(201).json({ template });
  } catch (err) {
    next(err);
  }
};

const updateTemplate = async (req, res, next) => {
  try {
    const template = await Template.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ template });
  } catch (err) {
    next(err);
  }
};

const deleteTemplate = async (req, res, next) => {
  try {
    await Template.findByIdAndDelete(req.params.id);
    res.json({ message: 'Template removed' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getLayout,
  updateLayout,
  addSection,
  updateSection,
  deleteSection,
  updateTheme,
  listTemplates,
  getTemplate,
  applyTemplate,
  createTemplate,
  updateTemplate,
  deleteTemplate
};
