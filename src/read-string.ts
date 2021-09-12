import readline from "readline-sync";

export const readString = (question: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      const answer = readline.question(question);
      resolve(answer);
    } catch (err) {
      reject(err);
    }
  });
};

export const readSecureString = (question: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      const answer = readline.question(question, {
        hideEchoBack: true,
      });
      resolve(answer);
    } catch (err) {
      reject(err);
    }
  });
};

export const readFromOptions = (
  question: string,
  options: string[]
): Promise<number> => {
  return new Promise((resolve, reject) => {
    try {
      const index = readline.keyInSelect(options, question);
      resolve(index);
    } catch (err) {
      reject(err);
    }
  });
};
