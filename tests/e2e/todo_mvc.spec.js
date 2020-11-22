/// <reference types="cypress" />

const testId = id => `[data-testid="${id}"]`;
const TODO_CREATE = testId('todo-create');
const TODO_NAME = testId('todo-name');
const TODO_ITEM = testId('todo-item');

const ITEM1 = 'Find the Plans';
const ITEM2 = 'Save World';
const ITEM3 = 'Get out of my house';

let add3Items = () => {
  // TODO
};

describe('TODO MVC', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  describe('New todo', () => {
    it('it should show headline "todos"');
    it('it should create new todo');
    it('it should create new todo that is not completed');

    it('it should create 3 new todos (verify number and last entry)');
    it('it should show correct todo count)');
  });

  describe('Toggle', () => {
    it('toggle first item reduces number of left items');
    it('toggle completes item');
    it('toggle-all toggles all items');
  });
  describe('Filter', () => {
    it('filter All show all items');
    it('filter Active shows only active items ');
    it('filter Completed shows only completed items ');
  });

  describe('clear button', () => {
    it('removes completed items');
  });
});
