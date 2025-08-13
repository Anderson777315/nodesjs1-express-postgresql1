module.exports = {
  HOST: "ep-frosty-term-ae247739-pooler.c-2.us-east-2.aws.neon.tech",
  USER: "neondb_owner",
  PASSWORD: "npg_KzvwM0HtTN9d",
  DB: "neondb",
  dialect: "postgres",
  
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};