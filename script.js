'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements) {
  containerMovements.innerHTML = '';
  // containerMovements.textContent = '';

  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">₦${mov}</div>
      </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
displayMovements(account1.movements);

//////////////////////////////////////////////
const calcDisplayBalance = function (movements) {
  const balance = movements.reduce(function (acc, mov) {
    return acc + mov;
  }, 0);

  labelBalance.textContent = `₦${balance}`;
};
calcDisplayBalance(account1.movements);

// Displays Income/Deposits, Withdrawals and Interest Rates
const calcDisplaySummary = function (movements) {
  // Calculates incomes/deposits
  const incomes = movements
    .filter(function (mov) {
      return mov > 0;
    })
    .reduce(function (acc, mov) {
      return acc + mov;
    }, 0);
  labelSumIn.textContent = `₦${incomes}`;

  // Calculates withdrawals from the account
  const out = movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `₦${Math.abs(out)}`;

  // Calculates interes rate @ 1.2% per deposit
  const interest = movements
    .filter(function (mov) {
      return mov > 0;
    })
    .map(function (deposit) {
      return deposit * (1.2 / 100);
    })
    // filters interests above ₦1 only
    .filter(function (ints, i, arr) {
      return ints >= 1;
    })
    .reduce((acc, intr, i, arr) => acc + intr, 0);
  labelSumInterest.textContent = `₦${interest}`;
};
calcDisplaySummary(account1.movements);

//////////////////.............
const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(function (name) {
        return name[0];
      })
      .join('');
  });
};
createUsernames(accounts);

// Event handler
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    console.log('LOGIN AGAIN');
  }
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

/*
let arr = ['a', 'b', 'c', 'd', 'e'];

console.log(arr.slice(2));
console.log(arr.slice(-1));
console.log(arr.slice(2, 4));
console.log(arr.slice(1, -2));

console.log(arr.toSpliced(2, 4));
console.log(arr);

// SPLICE ... Mutates(changes) the original array unlike slice method
// console.log(arr.splice(2, 4));
// console.log(arr.splice(1, 2));
// console.log(arr.splice(-1));
console.log(arr);

// REVERSE ... Mutates original array
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());
console.log(arr2);

// CONCAT Does does not mutate any of the involved arrays
const letters = arr.concat(arr2);
console.log(letters);

console.log([...arr, ...arr2]);
console.log(letters.join('-'));

*/
/*
const arr = [12, 15, 18, 21];
arr.push(24);
// console.log(arr[4]);
// console.log(arr.at(4));

console.log(arr[arr.length - 1]);
console.log(arr.slice(-1)[0]);
// console.log(arr[-1]); // undefined

console.log(arr.at(arr.length - 1));
console.log(arr.at(-1));
*/

/*

for (const [i, movement] of movements.entries()) {
  const transaction = movement > 0 ? 'credited' : 'withdrawn';
  console.log(
    `Movement ${i + 1}: ${Math.abs(
      movement
    )} ${transaction} on your account. Thanks for banking with us`
  );
}

console.log('---FOREACH---');
movements.forEach(function (mov, i, arr) {
  if (mov > 0) {
    console.log(`Movement ${i + 1}: You deposited ${Math.abs(mov)} naira only`);
  } else {
    console.log(`You withdrew ${Math.abs(mov)} naira only`);
  }
});
*/

/*
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);

currenciesUnique.forEach(function (value, _, map) {
  // A throwaway variable _
  console.log(`${value}: ${value}`);
});
*/

//////////////////////////////////////////////////////
/*
Coding Challenge #1
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners
about their dog's age, and stored the data into an array (one array for each). For
now, they are just interested in knowing whether a dog is an adult or a puppy.
A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years
old.
Your tasks:
Create a function 'checkDogs', which accepts 2 arrays of dog's ages
('dogsJulia' and 'dogsKate'), and does the following things:
1. Julia found out that the owners of the first and the last two dogs actually have
cats, not dogs! So create a shallow copy of Julia's array, and remove the cat
ages from that copied array (because it's a bad practice to mutate function
parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1
is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy
�
")
4. Run the function for both test datasets
Test data:
§ Data 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
§ Data 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]
Hints: Use tools from all lectures in this section so far �
GOOD LUCK �
*/

/*
const checkDogs = function (dogsJulia, dogsKate) {
  console.log(dogsJulia, dogsKate);

  const dogsJuliaCorrected = dogsJulia.slice(1, dogsJulia.length - 2);
  console.log(dogsJuliaCorrected);

  const dogs = dogsJuliaCorrected.concat(dogsKate);
  console.log(dogs);

  dogs.forEach(function (dog, i) {
    const dogPuppy = dog >= 3 ? 'is an adult' : 'is still a puppy';

    console.log(`Dog number ${i + 1} ${dogPuppy}, and is ${dog} years old`);
  });
};

// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);
*/

/*
const ngrUSD = 935;
const movementsUSD = movements.map(function (mov) {
  return Math.abs(mov) * ngrUSD;
});
console.log(movements);
console.log(movementsUSD);

// Arrow function
const movementsUSDArr = movements.map(mov => mov * ngrUSD);
console.log(movementsUSDArr);

const movementsDescriptions = movements.map(
  (mov, i, arr) =>
    `Movement ${i + 1}: You deposited ${
      mov > 0 ? 'deposited' : 'withdrew'
    } ${Math.abs(mov)}`
);
console.log(movementsDescriptions);

// forEach method
// const conversion = [];
// for (const eachUSD of movements) conversion.push(Math.abs(eachUSD) * ngrUSD);
// console.log(conversion);
*/

///////////////////////////////////////
/*
const deposits = movements.filter(function (mov, i, arr) {
  return mov > 0;
});
console.log(deposits);

const deposits2 = [];
for (const i of movements) {
  if (i > 0) {
    deposits2.push(i);
  }
}
console.log(deposits2);

// Only the negetive numbers... using arrow function
const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals);

const withdrawals2 = [];
for (const mov of movements) if (mov < 0) withdrawals2.push(mov);
console.log(withdrawals2);


// The reduce method => accumulator => SNOWBALL => add up the elements together
// const balance = movements.reduce(function (acc, cur, i, arr) {
//   console.log(`Iteration ${i}: ${acc}`);
//   return acc + cur;
// }, 0);

// console.log(balance);

// With arrow function
// const balArr = movements.reduce((acc, cur) => acc + cur, 0);
// console.log(balArr);

// console.log(balance);

// Same thing with for-loop
console.log(movements);
let bal = 0;
for (const mov of movements) bal = bal + mov;
console.log(bal);

// Maximum value
const max = movements.reduce(function (acc, mov) {
  if (acc > mov) return acc;
  else return mov;
}, movements[0]);
console.log(max);

*/

///////////////////////////////////////
/*
Coding Challenge #2
Let's go back to Julia and Kate's study about dogs. This time, they want to convert
dog ages to human ages and calculate the average age of the dogs in their study.
Your tasks:
Create a function 'calcAverageHumanAge', which accepts an arrays of dog's
ages ('ages'), and does the following things in order:
1. Calculate the dog age in human years using the following formula: if the dog is
<= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old,
humanAge = 16 + dogAge * 4
2. Exclude all dogs that are less than 18 human years old (which is the same as
keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know
from other challenges how we calculate averages �)
4. Run the function for both test datasets
Test data:
§ Data 1: [5, 2, 4, 1, 15, 8, 3]
§ Data 2: [16, 6, 10, 5, 6, 1, 4]
GOOD LUCK �
*/

// const ages = [5, 2, 4, 1, 15, 8, 3];

// let ages = [];
// const calcAverageHumanAge = function (ageDog) {
//   for (const age of ageDog) {
//     ages.push(age * 2);
//   }
//   console.log(ages);

// };
// calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);

/*
const calcAverageHumanAge = function (ages) {
  const humanAges = ages.map(function (age) {
    const dogAge = age * 2;
    const humanAge = 16 + age * 4;

    if (age <= 2) return dogAge;
    else return humanAge;
  });
  console.log(humanAges);

  const adults = humanAges.filter(function (age) {
    return age >= 18;
  });
  console.log(adults);

  //   const average =
  //     adults.reduce(function (acc, age) {
  //       return acc + age;
  //     }, 0) / adults.length;
  //   console.log(average);
  // };

  const average = adults.reduce(function (acc, age, i, arr) {
    return acc + age; // arr.length; You can divide by arr.length
  }, 0);
  console.log(average);
};
calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
*/

/*
// PIPELINE
const ngrUSD = 935;
const totalDepositUSD = movements
  .filter(function (mov) {
    return mov > 0;
  })
  .map(function (mov, i, arr) {
    // console.log(arr);
    return mov * ngrUSD;
  })
  .reduce(function (acc, cur, i, arr) {
    return acc + cur;
  }, 0);

console.log(totalDepositUSD);
*/

/*
////////////////////////////
Coding Challenge #3
Rewrite the 'calcAverageHumanAge' function from Challenge #2, but this time
as an arrow function, and using chaining!
Test data:
§ Data 1: [5, 2, 4, 1, 15, 8, 3]
§ Data 2: [16, 6, 10, 5, 6, 1, 4]
GOOD LUCK �


const averageCalution = [16, 6, 10, 5, 6, 1, 4];

const calcAverageHumanAge2 = function (ages) {
  const humanAges = ages.map(function (age) {
    const dogAge = age * 2;
    const humanAge = 16 + age * 4;

    if (age <= 2) return dogAge;
    else return humanAge;
  });
  console.log(humanAges);

  const adults = humanAges.filter(function (age) {
    return age >= 18;
  });

  const average = adults.reduce((acc, age, i, arr) => acc + age / arr.length);
  console.log(average);
};

*/

/*
// Using arrow function and chaining
const calcAverageHumanAge = ages =>
  ages
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);

const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
console.log(avg1, avg2);
*/

/*

const firstWithdrawal = movements.find(mov => mov <= 0);
console.log(firstWithdrawal);
console.log(movements);

const accountz = accounts.find(acc => acc.owner === 'Jessica Davis');
// console.log(accountz);

// For of loop

for (const account of accounts) {
  if (account.owner === 'Jessica Davis') {
    console.log(account);
  }
}
*/
