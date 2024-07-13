export function getCommandFlag (flag) {
  const index = process.argv.findIndex(arg => arg.includes(flag))
  return process.argv[index + 1]
}
