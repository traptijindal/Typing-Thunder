export const calculateAccuracy = (userInput, text) => {
  let correctCharacters = 0;
  for (let i = 0; i < userInput.length; i++) {
    if (userInput[i] === text[i]) {
      correctCharacters++;
    }
  }
  const accuracy = ((correctCharacters / text.length) * 100);
  return Math.round(accuracy) 
};

export const calculateSpeed = (userInput, Total_time, timeLeft) => {
  const wordsTyped = userInput.length / 5;
  const minutes = (Total_time - timeLeft) / Total_time;
  const speed = (wordsTyped / minutes);
  return Math.round(speed);
};

export const calculateIncorrect = (userInput, text) => {
  let Incorrect = 0;
  for (let i = 0; i < userInput.length; i++) {
    if (userInput[i] != text[i]) {
      Incorrect++;
    }
  
  }
  return Incorrect;
};

export const calculateCorrect = (userInput, text) => {
  let Correct = 0;
  for (let i = 0; i < userInput.length; i++) {
    if (userInput[i] == text[i]) {
      Correct++;
    }

  }
  return Correct;
};

export const calculateMissed = (userInput, text) => {
  let Missed = text.length - userInput.length;
  return Missed;
};

export const calculateRaw = (userInput) => {
  return userInput.length;
};

export const calculateExtra = (userInput, text) => {
  if (userInput.length > text.length) {
    return userInput.length - text.length;
  }
  return 0;
};

// export const calculateProgress = (input, text) => {
//   let correctCount = 0;
//   for (let i = 0; i < text.length; i++) {
//     if (i < input.length && input[i] === text[i]) {
//       correctCount++;
//     }
//   }
//   return (correctCount / text.length) * 100;
// };

export const calculateProgress = (input = "", text = "") => {
  if (!text.length) return 0; // Avoid division by zero

  let correctCount = 0;
  for (let i = 0; i < text.length; i++) {
    if (i < input.length && input[i] === text[i]) {
      correctCount++;
    }
  }
  return (correctCount / text.length) * 100;
};
