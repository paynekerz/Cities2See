const sequelize = require('../config/connection');
const { User, Search } = require('../models');

const userData = require('./userData.json');
const searchData = require('./searchData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
  
    const users = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });
  
    for (const search of searchData) {
      await Search.create({
        ...search,
        user_id: users[Math.floor(Math.random() * users.length)].id,
      });
    }
  
    process.exit(0);
  };
  
  seedDatabase();