const express = require('express');
const { prisma } = require('../config/database');
const router = express.Router();

// Helper function with timeout for database queries
const withTimeout = (promise, ms = 15000) => {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Database query timeout after 15s')), ms)
    )
  ]);
};

// Get all leads with optional filtering
router.get('/', async (req, res) => {
  try {
    const { status, formType, startDate, endDate, page = 1, limit = 50 } = req.query;

    // Build filter object
    const where = {};
    if (status) where.status = status.toUpperCase();
    if (formType) where.formType = formType;
    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt.gte = new Date(startDate);
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        where.createdAt.lte = end;
      }
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [leads, total] = await Promise.all([
      withTimeout(
        prisma.lead.findMany({
          where,
          skip,
          take: parseInt(limit),
          orderBy: { createdAt: 'desc' },
        })
      ),
      withTimeout(prisma.lead.count({ where }))
    ]);

    res.json({
      data: leads,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error('Error fetching leads:', error);
    // Return empty data instead of error so frontend can use mock data fallback
    res.status(200).json({
      data: [],
      pagination: {
        total: 0,
        page: 1,
        limit: 50,
        pages: 0,
      },
    });
  }
});

// Get a single lead by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const lead = await withTimeout(
      prisma.lead.findUnique({
        where: { id },
      })
    );

    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    res.json(lead);
  } catch (error) {
    console.error('Error fetching lead:', error);
    res.status(500).json({ error: 'Failed to fetch lead' });
  }
});

// Create a new lead
router.post('/', async (req, res) => {
  try {
    const leadData = req.body;

    // Duplicate check: Same name AND (email OR phone)
    if (leadData.name && (leadData.email || leadData.workEmail || leadData.phoneNumber)) {
      const existingLead = await withTimeout(
        prisma.lead.findFirst({
          where: {
            name: leadData.name,
            OR: [
              { email: leadData.email || undefined },
              { workEmail: leadData.workEmail || undefined },
              { phoneNumber: leadData.phoneNumber || undefined }
            ].filter(cond => Object.values(cond)[0] !== undefined)
          }
        })
      );

      if (existingLead) {
        return res.status(409).json({
          error: 'A lead with this name and contact details already exists',
          id: existingLead.id
        });
      }
    }

    const lead = await withTimeout(
      prisma.lead.create({
        data: {
          name: leadData.name || 'Unnamed',
          email: leadData.email,
          phoneNumber: leadData.phoneNumber,
          workEmail: leadData.workEmail,
          formType: leadData.formType || 'General',
          category: leadData.category,
          revenueRange: leadData.revenueRange,
          website: leadData.website,
          budget: leadData.budget,
          dailyBudget: leadData.dailyBudget,
          goals: leadData.goals,
          message: leadData.message,
          companyName: leadData.companyName,
          platform: leadData.platform,
          target: leadData.target,
          status: leadData.status || 'LEADS',
          collection: leadData.collection,
          metadata: leadData.metadata,
        },
      })
    );

    res.status(201).json(lead);
  } catch (error) {
    console.error('Error creating lead:', error);
    res.status(500).json({ error: 'Failed to create lead' });
  }
});

// Update a lead
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Validate the lead exists
    const existingLead = await withTimeout(
      prisma.lead.findUnique({
        where: { id },
      })
    );

    if (!existingLead) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    // Prepare update object - only update fields that are provided
    const dataToUpdate = {};
    const allowedFields = [
      'name',
      'email',
      'phoneNumber',
      'workEmail',
      'formType',
      'category',
      'revenueRange',
      'website',
      'budget',
      'dailyBudget',
      'goals',
      'message',
      'companyName',
      'platform',
      'target',
      'status',
      'collection',
      'metadata',
    ];

    allowedFields.forEach((field) => {
      if (field in updateData) {
        dataToUpdate[field] = updateData[field];
      }
    });

    const updatedLead = await withTimeout(
      prisma.lead.update({
        where: { id },
        data: dataToUpdate,
      })
    );

    res.json(updatedLead);
  } catch (error) {
    console.error('Error updating lead:', error);
    res.status(500).json({ error: 'Failed to update lead' });
  }
});

// Delete a lead
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const existingLead = await withTimeout(
      prisma.lead.findUnique({
        where: { id },
      })
    );

    if (!existingLead) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    await withTimeout(
      prisma.lead.delete({
        where: { id },
      })
    );

    res.json({ message: 'Lead deleted successfully', id });
  } catch (error) {
    console.error('Error deleting lead:', error);
    res.status(500).json({ error: 'Failed to delete lead' });
  }
});

// Bulk update status
router.post('/bulk/status', async (req, res) => {
  try {
    const { ids, status } = req.body;

    if (!Array.isArray(ids) || !status) {
      return res.status(400).json({ error: 'Invalid request: ids array and status are required' });
    }

    const updated = await withTimeout(
      prisma.lead.updateMany({
        where: { id: { in: ids } },
        data: { status: status.toUpperCase() },
      })
    );

    res.json({ message: `Updated ${updated.count} leads`, count: updated.count });
  } catch (error) {
    console.error('Error updating leads:', error);
    res.status(500).json({ error: 'Failed to update leads' });
  }
});

// Get lead statistics
router.get('/stats/summary', async (req, res) => {
  try {
    const stats = await Promise.all([
      withTimeout(prisma.lead.count({ where: { status: 'LEADS' } })),
      withTimeout(prisma.lead.count({ where: { status: 'CONTACTED' } })),
      withTimeout(prisma.lead.count({ where: { status: 'WON' } })),
      withTimeout(prisma.lead.count({ where: { status: 'LOST' } })),
      withTimeout(prisma.lead.count()),
    ]);

    res.json({
      new: stats[0],
      contacted: stats[1],
      won: stats[2],
      lost: stats[3],
      total: stats[4],
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    // Return default stats on error
    res.json({
      new: 0,
      contacted: 0,
      won: 0,
      lost: 0,
      total: 0,
    });
  }
});

module.exports = router;
