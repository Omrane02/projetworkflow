const fs = require('fs');
const path = require('path');
const vm = require('vm');
const assert = require('assert');

const backendPath = path.join(__dirname, '..', 'gamePage', 'backendGamePage', 'backend.js');
const gamePath = path.join(__dirname, '..', 'gamePage', 'backendGamePage', 'game.js');

const elements = {};

function makeElement(id = '') {
  return {
    id,
    style: {},
    innerHTML: '',
    textContent: '',
    disabled: false,
    classList: {
      add() {},
      remove() {}
    },
    addEventListener() {},
    appendChild() {},
    setAttribute() {},
    getContext() { return {}; }
  };
}

const ids = [
  'quiz-container',
  'result-container',
  'question-counter',
  'score-display',
  'question-text',
  'answers-container',
  'next-btn',
  'restart-btn',
  'mode-classic',
  'mode-survie',
  'timer-display'
];

ids.forEach((id) => {
  elements[id] = makeElement(id);
});

const context = vm.createContext({
  console,
  setInterval: () => 1,
  clearInterval: () => {},
  document: {
    getElementById: (id) => elements[id] || makeElement(id),
    querySelectorAll: () => [],
    addEventListener: () => {},
    createElement: () => makeElement()
  },
  window: {},
  navigator: {}
});
context.global = context;

const source = fs.readFileSync(backendPath, 'utf8') + '\n' + fs.readFileSync(gamePath, 'utf8');
vm.runInContext(source, context);

assert.strictEqual(vm.runInContext('typeof initGame', context), 'function');
assert.strictEqual(vm.runInContext('typeof getCurrentMode', context), 'function');
vm.runInContext("initGame('survie')", context);
assert.strictEqual(vm.runInContext('gameMode', context), 'survie');
assert.strictEqual(vm.runInContext('getCurrentMode()', context), 'survie');
console.log('OK : le mode survie est bien initialisé.');
