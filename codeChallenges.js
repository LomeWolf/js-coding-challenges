'use strict';

///////////////////////////////////////
// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

const checkDogs = function (dogsJulia, dogsKate) {
  let newJulia = dogsJulia.slice(1, 3);
  let newJuliaKate = newJulia.concat(dogsKate);
  newJuliaKate.forEach(function (value, index) {
    value < 3
      ? console.log(
          `Dog number ${index + 1} is a puppy and is ${value} years old!`
        )
      : console.log(
          `Dog number ${index + 1} is an adult and is ${value} years old!`
        );
  });
  // [0, 1, 2, 3, 4]
};

// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);

const calcAverageHumanAge = function (dogsArr) {
  // Convert dog ages to human ages
  const humanAges = dogsArr.map(function (dogAge) {
    if (dogAge > 2) {
      return 16 + dogAge * 4; // Conversion for adult dogs
    } else {
      return 2 * dogAge;
    }
  });
  // Create new list of dogs 18 yrs or older
  const humanAdultDogs = humanAges.filter(function (dogAge) {
    return dogAge >= 18;
  });
  // Calculate average human age
  const avgHumanAge =
    humanAdultDogs.reduce(function (totalAge, age) {
      return totalAge + age;
    }, 0) / humanAdultDogs.length;

  // const avgHumanAge = humanAdultDogs.reduce(
  //     (acc, age, i, arr) => acc + age / arr.length,
  //     0
  //   );

  // Because the average of 2 and 3 can be calculated in an alternative way:
  // (2+3)/2 = 2.5 === 2/2+3/2 = 2.5

  console.log(`Dog ages: ${dogsArr} 
    Human ages: ${humanAges}
    Human-age adult dog ages: ${humanAdultDogs}
    Avg adult dog age: ${avgHumanAge}`);

  return avgHumanAge;
};
// calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
// calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);

//////// CC3: Write calcAverageHumanAge as an arrow function using chaining

///WITHOUT CONSOLE MESSAGES
// const calcAverageHumanAge2 = dogsArr => {
//   // Convert dog ages to human ages
//   const avgHumanAge = dogsArr
//     .map((dogAge, i, arr) => {
//       if (dogAge > 2) {
//         16 + dogAge * 4;
//       } else {
//         2 * dogAge;
//       }
//     })
//     .filter(dogAge => dogAge >= 18)
//     .reduce((acc, age, i, arr) => acc + age / arr.length, 0);

//   avgHumanAge;
// };

///WITH CONSOLE MESSAGES
const calcAverageHumanAge2 = dogsArr => {
  // Convert dog ages to human ages
  const avgHumanAge = dogsArr
    .map((dogAge, i, arr) => {
      if (i === arr.length - 1) console.log(`Dog ages: ${arr}`); // OPTIONAL
      if (dogAge > 2) {
        return 16 + dogAge * 4;
      } else {
        return 2 * dogAge;
      }
    })
    .filter((dogAge, i, arr) => {
      if (i === arr.length - 1) console.log(`Human ages: ${arr}`); // OPTIONAL
      return dogAge >= 18;
    })
    .reduce((acc, age, i, arr) => {
      if (i === arr.length - 1) console.log(`Human-age adult dog ages: ${arr}`); // OPTIONAL
      return acc + age / arr.length;
    }, 0);

  console.log(`Avg adult dog age: ${avgHumanAge}`);

  return avgHumanAge;
};

// calcAverageHumanAge2([5, 2, 4, 1, 15, 8, 3]);
// calcAverageHumanAge2([16, 6, 10, 5, 6, 1, 4]);

///////////////////////////////////////
// Coding Challenge #4

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

GOOD LUCK 😀
*/

// TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 376, owners: ['Michael'] },
];

// Calculate recommended food portion for each dog
const calcFoodPortion = function (dogsArr) {
  // For each dog, calculate recommended food portion in grams
  dogsArr.forEach(function (dog) {
    dog.recFood = dog.weight ** 0.75 * 28;
  });
};
calcFoodPortion(dogs);
// console.log(dogs);

// Find Sarah's dog, and check whether eats too much
const idDogLogConsole = function (dogsArr, owner) {
  // Check if owners array contains owner's name
  dogsArr
    .filter(function (dog) {
      // Return array of owner's dog object
      return dog.owners.includes(owner);
    })
    // Check if dog eats too much or too litle
    // (curFood 10% more or less recFood amount)
    .forEach(function (dog) {
      const upperBound = dog.recFood * 1.1;
      const lowerBound = dog.recFood * 0.9;
      if (dog.curFood < lowerBound) console.log('Too little food!');
      else if (dog.curFood > upperBound) console.log('Too much food!');
      else console.log('Just right!');
    });
};

idDogLogConsole(dogs, 'Michael');

// console.log(idDogLogConsole(dogs, 'Sarah'));
