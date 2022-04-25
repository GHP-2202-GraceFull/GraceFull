"use strict";

const {
  db,
  models: { User, Product, Category },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */

//title, description, quantity, image, price
const dummyProducts = [
  {
    title: "Banana Blast Bowl",
    description:
      "Made with bananas, strawberries, flax seeds, coconut, and garnished with orange peels. This bowl is high in protein and potassium.",
    quantity: 10,
    price: 9.5,
    imageUrl:
      "https://images.unsplash.com/photo-1628697189445-642981ab7ffe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
  },
  {
    title: "Berrylicious Bowl",
    description:
      "Made with strawberries, raspberries, bluberries and chia seeds. This bowl is the perfect blend of delicious flavors and B vitamins.",
    quantity: 15,
    price: 8.0,
    imageUrl:
      "https://images.unsplash.com/photo-1621797350487-c8996f886ab1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
  },
  {
    title: "Blueberry Indulgence Smoothie",
    description:
      "Made with strawberries, raspberries and blueberries, and topped with dark chocolate and hazelnut crumbles for a healthy treat.",
    quantity: 2,
    price: 8.5,
    imageUrl:
      "https://images.unsplash.com/photo-1592452319703-9a68b88dd26b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80",
  },
];

const categoriesArr = [
  { name: "smoothie" },
  { name: "bowl" },
  { name: "accessory" },
];

async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const users = await Promise.all([
    User.create({ username: "cody", password: "123" }),
    User.create({ username: "murphy", password: "123" }),
  ]);

  //Seeding Dummy Products
  const [bananaBlast, berrylicious, blueberry] = await Promise.all(
    dummyProducts.map((product) => Product.create(product))
  );

  //Seeding Categories
  const [smoothie, bowl, accessory] = await Promise.all(
    categoriesArr.map((category) => Category.create(category))
  );

  await bananaBlast.addCategory(bowl);
  await berrylicious.addCategory(bowl);
  await blueberry.addCategory(smoothie);

  //seeding carts
  

  //Setting Product/Category Relationships

  console.log(`seeded successfully`);

  //-------- TODO: unecessary return from boilerplate code? Delete? --------
  // return {
  //   users: {
  //     cody: users[0],
  //     murphy: users[1],
  //   },
  // };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
