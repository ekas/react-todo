describe("example to-do app", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should displays three Board Columns by default", () => {
    cy.get(".board-content .board-content-item").should("have.length", 3);
  });

  it("should displays three Board Column headings and respective Tasks length", () => {
    cy.get(".board-content .board-content-item").should("have.length", 3);

    // Asserting Board Column Headings
    cy.get(".item-header span").should("have.length", 6);
    cy.get(".item-header").within(() => {
      cy.get("span").eq(0).should("have.text", "To Do");
      cy.get("span").eq(1).should("have.text", "2");
    });
    cy.get(".item-header")
      .eq(1)
      .within(() => {
        cy.get("span").eq(0).should("have.text", "In Progress");
        cy.get("span").eq(1).should("have.text", "1");
      });

    cy.get(".item-header")
      .last()
      .within(() => {
        cy.get("span").eq(0).should("have.text", "Completed");
        cy.get("span").eq(1).should("have.text", "1");
      });
  });

  it("should add a new task and able to delete it as well in Todo Column", () => {
    cy.get('[data-cy="board-content-item-todo"]').should("have.length", 1);
    cy.get("#add-button-todo").click();
    cy.get("[data-cy^='task-']")
      .eq(0)
      .within(() => {
        cy.get(".task-delete").click();
      });
  });

  it("should edit a new task and able to delete it as well in Todo Column", () => {
    cy.get('[data-cy="board-content-item-todo"]').should("have.length", 1);
    cy.get("#add-button-todo").click();
    cy.get("[data-cy^='task-']")
      .eq(0)
      .within(() => {
        cy.get(".task-edit").click();
        cy.get("[data-cy='task-edit-input']")
          .clear()
          .type("Different New Task");
        cy.get("[data-cy='task-edit-textarea']")
          .clear()
          .type("Description for Different New Task");
        cy.get("[data-cy='task-edit-save']").click();
        cy.wait(2000);
        cy.get(".task-delete").click();
      });
  });
});
