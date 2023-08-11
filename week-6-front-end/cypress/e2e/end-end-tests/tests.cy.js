describe("Jitu Community Club Registration Form", () => {
  beforeEach(() => {
    cy.visit("/index.html"); 
  });

  it("should display the registration form", () => {
    cy.contains("Jitu Community Club");
    cy.contains("Cohort Registration Form");
    cy.get("#registrationForm").should("exist");
  });

  it("should fill out and submit the registration form", () => {
    const fullName = "John Doe";
    const email = "john.doe@thejitu.com";
    const password = "secretpassword";
    const confirmPassword = "secretpassword";
    const selectedCohort = "Cohort 3"; 

    cy.get("#fullName").type(fullName);
    cy.get("#email").type(email);
    cy.get("#password").type(password);
    cy.get("#confirmPassword").type(confirmPassword);
    cy.get("#cohortNumber").select(selectedCohort);

    cy.get(".submit-button").click();

    
  });

  it("should show validation message for invalid email format", () => {
    cy.get("#email").type("invalidemail");
    cy.get(".submit-button").click();
    cy.get("#email:invalid").should("exist");
  });

  // You can add more test cases to cover additional scenarios
});
