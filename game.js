const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = text => new Promise(resolve => rl.question(text, input => resolve(input)))

const SUCCESS = ['Excellent', 'Wonderful', 'Very Good', 'Superb', 'Outstanding', 'Magnificient', 'Marvelous', 'Perfect', 'Terrific', 'fantastic', 'Awesome', 'Brilliant']
const state = {
  success: 0,
  failure: 0,
  total: 0,
  limit: 0
}

const start = async () => {
  const { limit } = state
  console.log()
  const a = getRandomInt(limit || null)
  const b = getRandomInt(limit || null)
  const { answer, text} = getAnswer(a, b)
  let input = await question(`${text} = `)
  while (parseInt(input) !== answer) {
    if (input === 's') {
      console.log('  Sorry, correct answer is ', answer)
      state.failure++
      break
    }
    console.log('  Sorry, incorrect answer. Try again!')
    input = await question(`${text} = `)
  }
  // if not skip
  if (input && input !== 's') {
    const success = SUCCESS[getRandomInt(SUCCESS.length)]
    console.log(`  ${success}!!!!`)
    state.success++
  }
  if (state.total > state.success + state. failure) await start()
  else printSummary()
}

const getRandomInt = (max = 100, min = 1) => {
  min = Math.ceil(min)
  max = Math.ceil(max)
  return Math.floor(Math.random() * (max - min)) * min
}

const getAnswer = (a, b) => {
  const ops = ['+', '-']
  const op = ops[getRandomInt() % 2 === 0 ? 0 : 1]
  const text = a > b ? `${a} ${op} ${b}` : `${b} ${op} ${a}`
  const answer = eval(text)
  return { answer, text }
}

const printSummary = () => {
  console.log()
  const p = (state.success / state.total) * 100

  const table = [
    ['Total questions', state.total],
    ['Correct answers', state.success],
    ['Incorrect answers', state.failure],
    ['Percentage', p + '%'],
    ['Status', p > 80 ? 'Passed' : 'Failed']
  ]

  console.table(table)
}

const main = () => {
  console.log('#########################')
  console.log('# Welcome to Math game. #')
  console.log('#########################')

  const [limit, total] = process.argv.slice(2)
  state.limit = Number(limit) || 50
  state.total = Number(total) || 20

  return start()
}

// ###########################
// main function
// ###########################
main()
