const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("postgresql://root:YTkH3u2Zy1aPXfHHVklyaxtirvgMlPCv@dpg-d2983cc9c44c739bps9g-a/dormitory_db", {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Render bağlantıları için gerekiyor
    }
  },
  logging: false, // istersen logları kapat
});

module.exports = sequelize;
