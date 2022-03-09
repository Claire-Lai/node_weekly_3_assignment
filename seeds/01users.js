/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex,Promise) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
  {username:"sam",password:'12345'},
  {username:"tester",password:'abcdefg'},
  {username:"dennis",password:'password'},
  {username:"alina",password:'lesley'}
]);
};
