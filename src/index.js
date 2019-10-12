module.exports = function zeros(expression) {

  const exprQuantified = expression.split('*');

  let fiveCounter = 0;
  let twoCounter = 0;

  const countTwo = currPart => {

    if(currPart % 2 === 0) {

      twoCounter++;

      let nestTwo = currPart / 2;

      while(nestTwo > 1) {

        if(nestTwo % 2 === 0) {
          twoCounter++;
        } 

        nestTwo = nestTwo / 2;
      }
    }
  };

  const countFive = currPart => {

    if(currPart % 5 === 0) {

      fiveCounter++;

      let nestFive = currPart / 5;

      while(nestFive > 1) {

        if(nestFive % 5 === 0) {
          fiveCounter++;
        } 
        
        nestFive = nestFive / 5;
      }
    }
  };

  const countBoth = currPart => {

    countTwo(currPart);
    countFive(currPart);

  }

  for(let chunk of exprQuantified) {

    const numericalPart = chunk.match(/[0-9]+/)[0];

    const parity = numericalPart % 2 === 0 ? 'even' : 'odd';

    const factorialPart = chunk.match(/!+/)[0];

    switch(factorialPart) {

      case '!':
      
        for(let i = 1; i <= numericalPart; i++) {
          
          countBoth(i);

        }

      break;

      case '!!':

        switch(parity) {

          case 'odd':
      
              for(let i = 1; i <= numericalPart; i += 2) {

                countFive(i);

              }

          break;

          case 'even':
      
              for(let i = 2; i <= numericalPart; i += 2) {
                
                countBoth(i);

              }

          break;
        }
      break;

    }
    
  }

  const res = Math.min(twoCounter, fiveCounter);

  return res;
}
