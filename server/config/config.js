require('dotenv').config();

export const development = {
    url: process.env.DEV_URL
};
export const test = {
    url: process.env.TEST_URL
};
export const production = {
    url: process.env.DATABASE_URL
};
  
  
//   module.exports = {
//     development: {
//       url: process.env.DEV_URL
//     },
//     test: {
//       url: process.env.TEST_URL
//     },
//     production: {
//       url: process.env.DATABASE_URL
//     }
//   };
  