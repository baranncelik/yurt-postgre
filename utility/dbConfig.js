module.exports = {
  user: "root",
  host: "dpg-d2983cc9c44c739bps9g-a",  // Render’ın sana verdiği host
  password: "YTkH3u2Zy1aPXfHHVklyaxtirvgMlPCv", // Şifren
  database: "dormitory_db",
  port: 5432, // PostgreSQL default portu
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Render için gerekli SSL ayarı
    }
  }
};
