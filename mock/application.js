const faker = require("faker");
const _ = require("lodash");

const generate = count =>
  _.range(count).map((val, index) => {
    return {
      id: faker.random.uuid(),
      name: faker.name.lastName(),
      phone: "13810437619",
      identity: "330225198009121387",
      state: faker.random.arrayElement(["REQUEST", "ACCEPT", "REJECT"]),
    };
  });

module.exports = generate;
