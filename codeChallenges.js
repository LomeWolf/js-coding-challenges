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
calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
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

calcAverageHumanAge2([5, 2, 4, 1, 15, 8, 3]);
// calcAverageHumanAge2([16, 6, 10, 5, 6, 1, 4]);
