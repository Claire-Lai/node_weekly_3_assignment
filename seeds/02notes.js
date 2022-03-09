/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
 exports.seed = async function(knex) {
    // Deletes ALL existing entries
    await knex('notes').del()
    await knex('notes').insert([
      {content: "It's actually working :D\n",
      user_id: 1
    },
    {content: "Hi",
    user_id: 1
  },
      {content: "Hello first note",
      user_id: 2
    },
      {content: "hello",
      user_id: 4}
    ]);
  };
  