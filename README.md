# Pokémon Hangman Web Game – Manual QA Project 🎮

A Pokémon-themed Hangman web application created to demonstrate manual testing, test design, and QA documentation skills using a real-world workflow.

This project emphasizes test scenario creation, execution, and defect reporting , with Trello used as the test management tool.

---
**Live Game on:** https://jimeneztorres14.github.io/Pokemon-Hangman-Game---Web-App/

**Trello Test Board:** https://trello.com/b/zms4t2Dw

## Project Overview

The Pokémon Hangman Web Game is a browser-based application where users guess Pokémon names letter by letter before running out of Poké Balls.

The application was tested manually to validate:
- Core game functionality
- UI behavior
- Edge cases
- Error handling
- Integration with external APIs

---

## Testing Scope

Manual testing was performed across the following areas:

- Game initialization and UI load
- Letter guessing logic (correct and incorrect guesses)
- Win and loss conditions
- HP and Poké Ball tracking
- Animation behavior
- API-dependent content (PokéAPI artwork)
- Edge cases and negative scenarios

---

## Test Cases & Scenarios

- **Total Test Cases Created:** 21  
- **Testing Type:** Manual Testing  
- **Test Design:** Scenario-based and Gherkin-style (Given / When / Then)  
- **Test Management Tool:** Trello  

**Trello Test Board:**  
https://trello.com/b/zms4t2Dw

---

## Defect Tracking 🐞

During test execution, one edge-case defect was identified:

- Pokémon names containing special characters (e.g., apostrophes) could not be completed due to missing keyboard support.
- The defect was documented with:
  - Clear reproduction steps
  - Expected vs actual behavior
  - Severity and priority
  - Execution status reflected in Trello

This demonstrates real-world QA practices, including **transparent reporting of failed scenarios**.

---

## Test Execution Summary 📊

- **Test cases executed:** 21
- **Passed:** 20
- **Failed:** 1
- **Blocked:** 0

> The failed test case revealed a valid functional limitation and was documented accordingly.

---

## 🛠 Tools & Technologies

- Manual Testing
- Trello (Test Management)
- JavaScript
- HTML
- CSS
- REST API (PokéAPI)

---

## Deployment

The application is structured using separate HTML, CSS, and JavaScript files and is ready for static deployment (e.g., GitHub Pages).

---

## Author

**Ruben Jimenez**  
QA / Manual Testing Project
JavaScript • Gherkin • Trello

**Notes for Reviewers**

This repository is intended to showcase **QA skills**, not only application development.  
Testing artifacts and execution evidence can be reviewed directly in the Trello board linked above.
