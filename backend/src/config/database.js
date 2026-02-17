const mongoose = require('mongoose');
const { PrismaClient } = require('@prisma/client');
const env = require('./env');

const prisma = new PrismaClient();

const connectMongo = async () => {
  if (!env.mongodbUri) {
    throw new Error('MONGODB_URI is missing');
  }
  await mongoose.connect(env.mongodbUri);
};

const disconnectMongo = async () => mongoose.disconnect();

module.exports = {
  prisma,
  connectMongo,
  disconnectMongo
};
