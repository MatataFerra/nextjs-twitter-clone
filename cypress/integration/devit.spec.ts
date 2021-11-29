
import mock from '../../mocks/default.json';

describe("Devits", () => {
  it("should display the devit home", () => {
    cy.visit("/default");
  });

  it("should display the devit", () => {
    cy.visit("/default");
    cy.get('[data-testid=devit]').should("have.length", mock.length);
  });

  it("Should display none devits", () => {
    cy.visit("/empty");
    cy.get('[data-testid=devit]').should("have.length", 0);
  })
});
