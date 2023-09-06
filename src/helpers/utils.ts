export const exitWithLog = (message?: string) => {
  if (message) console.log(message);
  process.exit(1);
};
