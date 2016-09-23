// Fake pages transactions with promises
// every page has a method by which it validates next step transition
const promiseWithDelay = (value) => new Promise(function(resolve, reject) {
  setTimeout(() => {
    if (value) {
      resolve(value);
    } else {
      reject(Error("It broke"));
    }
  }, 1500)
});


// Pages methods
// /intro page automatic transition
export const insertCard = () => promiseWithDelay(true);

// /pin page transition if pin === 1234
export const isPinCorrect = (pin) => promiseWithDelay(pin === '1234');

// /withdraw page transition is amount is valid
export const withdrawAmount = (amount) => {
  //fake account balance
  let balance = 100000;

  // user has money
  if (balance > amount) {
    balance =- balance; // fake balance decrease
    return promiseWithDelay(true)
  } else {
    // balance is not enough
    return promiseWithDelay(false)
  }
};

// /delivery page automatic transition
export const deliveringCash = () => promiseWithDelay(true);

// /delivery page automatic transition
export const abort = () => promiseWithDelay(true);


// /cashin page automatic transition
export const cashIn = () => promiseWithDelay(true);

const API = {
  insertCard,
  isPinCorrect,
  withdrawAmount,
  deliveringCash,
  abort,
  cashIn,
}

export default API;
