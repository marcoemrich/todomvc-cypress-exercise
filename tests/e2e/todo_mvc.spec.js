/// <reference types="cypress" />

const testId = id => `[data-testid="${id}"]`;
const TODO_CREATE = testId('todo-create');
const TODO_NAME = testId('todo-name');
const TODO_ITEM = testId('todo-item');

const ITEM1 = 'Find the Plans';
const ITEM2 = 'Save World';
const ITEM3 = 'Get out of my house';

let add3Items = () => {
  cy.get(TODO_CREATE).type(ITEM1).type('{enter}').type(ITEM2).type('{enter}').type(ITEM3).type('{enter}');
};

describe('TODO MVC', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  describe('New todo', () => {
    it('it should show headline "todos"', () => {
      cy.contains('h1', 'todos');
    });
    it('it should create new todo', () => {
      cy.get(TODO_CREATE).type('Remember the Milk').type('{enter}');
      cy.get(TODO_NAME).should('contain', 'Remember the Milk');
    });
    it('it should create new todo that is not completed', () => {
      cy.get(TODO_CREATE).type('Remember the Milk').type('{enter}');
      cy.get(TODO_ITEM).first().should('not.have.class', 'completed');
    });

    it('it should create 3 new todos (verify number and last entry)', () => {
      add3Items();
      cy.get(TODO_ITEM).should('have.length', 3);
      cy.get(TODO_NAME).last().should('contain', ITEM3);
    });
    it('it should show correct todo count)', () => {
      add3Items();
      cy.get('.todo-count').should('contain', '3 items left');
    });
  });

  describe('Toggle', () => {
    it('toggle first item reduces number of left items', () => {
      add3Items();
      cy.get(TODO_ITEM).first().find('.toggle').click();
      cy.get('.todo-count').should('contain', '2 items left');
    });
    it('toggle completes item', () => {
      add3Items();
      cy.get(TODO_ITEM).first().find('.toggle').click();
      cy.get(TODO_ITEM).first().should('have.class', 'completed');
      cy.get('.todo-count').should('contain', '2 items left');
    });
    it('toggle-all toggles all items', () => {
      add3Items();
      cy.get('label[for="toggle-all"]').click();
      cy.get('.todo-count').should('contain', '0 items left');
    });
  });
  describe('Filter', () => {
    it('filter All show all items', () => {
      add3Items();
      cy.get(TODO_ITEM).first().find('.toggle').click();
      cy.get(testId('filter-All')).click();
      cy.get(TODO_ITEM).should('have.length', 3);
      cy.get(TODO_ITEM).should('contain', ITEM1);
    });

    it('filter Active shows only active items ', () => {
      add3Items();
      cy.get(TODO_ITEM).first().find('.toggle').click();
      cy.get(testId('filter-Active')).click();
      cy.get(TODO_ITEM).should('have.length', 2);
      cy.get(TODO_ITEM).should('not.contain', ITEM1);
    });
    it('filter Completed shows only completed items ', () => {
      add3Items();
      cy.get(TODO_ITEM).first().find('.toggle').click();
      cy.get(testId('filter-Completed')).click();
      cy.get(TODO_ITEM).should('have.length', 1);
      cy.get(TODO_ITEM).should('contain', ITEM1);
    });
  });

  describe('clear button', () => {
    it('removes completed items', () => {
      add3Items();
      cy.get(TODO_ITEM).first().find('.toggle').click();
      cy.get('.clear-completed').click();
      cy.get(TODO_ITEM).should('have.length', 2);
      cy.get(TODO_ITEM).should('not.contain', ITEM1);
    });
  });
});
