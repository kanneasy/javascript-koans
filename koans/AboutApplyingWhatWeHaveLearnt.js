var _; //globals

describe("About Applying What We Have Learnt", function() {

  var products;

  beforeEach(function () {
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {

    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {

      var productsICanEat = _(products).filter(pizza => {
        return !pizza.containsNuts && _(pizza.ingredients).all(x => x !== "mushrooms")
      })
      /* solve using filter() & all() / any() */

      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {

    var sum = 0;
    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }

    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {

    var sum = _.range(0, 1000).reduce(function(sum, x){
        if (x % 3 === 0 || x % 5 === 0) {
          sum += x;3;
        }
        return sum;
      }, 0);    /* try chaining range() and reduce() */

    expect(sum).toBe(233168);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    /* chain() together map(), flatten() and reduce() */
    _(products).chain()
          .map( x => x.ingredients )
          .flatten()
          .reduce( (count, ingredient) => {
            ingredientCount[ingredient] = (ingredientCount[ingredient] || 0) + 1;
          },0)

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */
  it("should find the largest prime factor of a composite number", function () {
    // uses tree method to divide number into largest possible factor//
    function largestPrimeFactor(num) {
      let iFactor = 2;
      while (iFactor < num) {
        if (num % iFactor === 0) {
          num /= iFactor;
        } else {
          iFactor++;
        }
      }

      return iFactor;
    }

    expect(largestPrimeFactor(34)).toBe(17);
  });

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {
    //largest 3-digit product is 999*999. Assume product is 6 digits and each number >= 900
    //Format then will be 9iji9. One of the numbers must be divisible by 11
    //Largest factor of 11 here is 979. Start there and decrement by 22
    //Other number starts at 999 and decrements by 2
    function isPalindrome(num){
      return num.toString() === num.toString().split("").reverse().join("");
    }

    function largestPalindrome(){
      for (let i = 979; i > 899; i -= 22) {
        for (let j = 999; j > 899; j -= 2) {
          if (isPalindrome(i*j)) {
            return i*j;
          }
        }
      }
    }

    expect(largestPalindrome()).toBe(906609);
  });

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {

    function findPrimeFactors(num) {
      let primeFactors = [];
      let iFactor = 2;
      while (iFactor <= num) {
        if (num % iFactor === 0) {
          if (!primeFactors.includes(iFactor)) {
            primeFactors.push(iFactor);
          }
          num /= iFactor;
        } else {
          iFactor++;
        }
      }
      return primeFactors;
    }

    function smallestNumDiv(rngStart, rngEnd) {
      let arrRng = _.range(rngStart, rngEnd+1);
      let smallestNumDiv = _(arrRng).chain()
        .map(x => findPrimeFactors(x))
        .flatten()
        .reduce( (product, prime) => product * prime, 1);
      return smallestNumDiv._wrapped;
    }

    expect(smallestNumDiv(1,20)).toBe(1055947052160000);
  });

  it("should find the difference between the sum of the squares and the square of the sums", function () {
    //can use multiple arguments
    function sumSquares(args) {
      let sum = 0;
      for (let arg of args) {
        sum += arg**2;
      }
      return sum;
    }

    function squareSums(args) {
      let sums = 0;
      for (let arg of args) {
        sums += arg;
      }
      return sums**2;
    }

    function findDiff() {
      let args = [...arguments];
      return Math.abs( sumSquares(args) - squareSums(args) );
    }

    expect(findDiff(2,3)).toBe(12);
    expect(findDiff(2,3,4)).toBe(52);
  });

  it("should find the 10001st prime", function () {
    // Will find any prime, not just 10001st
    function isPrime(num) {
      if (num < 2) return "try a bigger number";
      for(let i = 2, s = Math.sqrt(num); i <= s; i++)
          if(num % i === 0) return false;
      return true;
    }

    function findNthPrime(N) {
      if (N < 2) return "Need a bigger number";
      if (N === 2) return 3;
      let prime = 3
      for (let i = 2; i < N; i++) {
        while(!isPrime(prime)) {
          prime += 2;
        }
        prime += 2;
      }
      return prime;
    }

    expect(findNthPrime(10001)).toBe(104731);

  });
});
