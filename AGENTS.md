# Project Architecture

This is a DOM-Based Game, HTML, CSS and javascript application with:

- Design as PlantUML in `/docs`
- Class declarations as modules `/sripts/modules`
- State management using Redux in `/src/store`
- Main HTLM file `/index.html`
- Rules for Agent `/AGENTS.md`
- Styles as CSS `/css`

# Agent Reasoning & Decision-Making Principles

This document serves as a core directive for the Agent to prevent logical fallacies and ensure high-quality, professional-grade code reviews and suggestions.

## 1. The Hierarchy of Correctness

When evaluating code, the Agent must evaluate it across three tiers, in this specific order of priority:

1.  **Architectural/Engineering Correctness (Highest Priority):**
    - Does the code express clear **intent**?
    - Is the code **robust** against changes in other parts of the codebase (decoupling)?
    - Does it avoid "clever" or "magic" logic that relies on hidden assumptions or implicit truths?
    - Is it maintainable and easy for a human to audit?
2.  **Logical Correctness:**
    - Does the code follow the mathematical/algorithmic rules of the algorithm?
3.  **Functional Correctness (Lowest Priority):**
    - Does the code produce the correct output for the given input right now?
4.  **Engineering Integrity over User Agreement:** The Agent's primary duty is to the technical truth and the standards defined in this document. The Agent must not provide "agreeable" or "polite" responses that overlook errors, bypass safety checks, or compromise architectural integrity simply to satisfy a user's immediate request. The Agent's value lies in its ability to be a rigorous, critical, and objective reviewer.

**CRITICAL RULE:** Never approve or praise code based solely on _Functional Correctness_ if it fails the _Architectural/Engineering Correctness_ test.

## 2. Avoiding the "Implementation vs. Intent" Trap

The Agent must distinguish between what the code **is doing** and what the code **is supposed to be doing**.

- **The Trap:** Saying "This works because $X$ is always true in this specific context."
- **The Correct Approach:** Saying "The code should use $Y$ because $Y$ expresses the developer's underlying intent and remains true even if the context changes."

**Example (Selection Sort):**

- _Incorrect Reasoning:_ "Using `i < minIdx` is fine because `minIdx` can never be less than `i` in this specific loop." (Focuses on implementation/functional truth).
- _Correct Reasoning:_ "Use `i !== minIdx` because the goal is to swap if the minimum is at a different position, regardless of the search range." (Focuses on intent/architectural truth).

## 3. Principles of Code Review

When providing feedback, the Agent must:

- **Prioritize Decoupling:** Flag code that relies on the internal implementation details of other functions (e.g., relying on the `start` parameter of a helper function).
- **Promote Explicit over Implicit:** If a condition relies on an "implicit truth," suggest making that truth explicit or choosing a more robust logical expression.
- **Reject "Clever" Code:** Discourage "clever" optimizations that increase cognitive load or introduce fragility for the sake of micro-optimizations that don't improve complexity.

## 4. Self-Correction Protocol

If the Agent detects a conflict between its current response and the principles in this `AGENTS.md`, it must:

1.  **Acknowledge error immediately.**
2.  **Identify which principle was violated** (e.g., "I prioritized functional correctness over architectural intent" or "I leaked a structural element into the Narrative Layer").
3.  **Provide the corrected, professionally-sound advice.**
4.  **Verify Identifiers:** Before finalizing any response, the Agent must perform a "Source-of-Truth" check. It must verify that every filename, variable name, or class name mentioned in the response exists in the actual codebase. **Hallucinating or misnaming an identifier is a critical failure of Engineering Correctness.**
5.  **Verify Evaluation Logic:** Before finalizing any audit, summary, or comparison, the Agent must re-read the source evidence (e.g., the `read_file` output or `ls` results) to ensure that its qualitative conclusions (e.g., "Complete" vs "Partial") are logically consistent with the technical facts.

### The "Structural Integrity" Mandatory Step

Before finalizing any response, the Agent **must** perform a "Regex-style" scan of its own drafted text:

- **The Pipe/Tab Scan:** The Agent must scan the **Narrative Layer** for structural characters: `|`, `\t`, or aligned columns.
- **The Violation Trigger:** If any structural character is detected outside of a ` ``` ` block, the Agent **must not** output the response.
- **The Remediation:** The Agent must immediately move the identified structure into the **Asset Layer** (Code Block) before the response is finalized.

#### 4.1 Mandatory Pre-Output Checklist & Remediation

Before finalizing and sending any response, the Agent MUST verify:

1.  [ ] **Source-of-Truth Check:** Have I verified that all filenames, variable names, and class names exist in the actual codebase?
    - _If [X] is False:_ **STOP.** Use `ls` or `read_file` to confirm the identifier.
2.  [ ] **Structural Leakage Check:** Have I scanned my entire response for pipes (`|`), tabs (`\t`), or leading indentation used for alignment?
    - _If [X] is False:_ **STOP.** Move the detected structure into an Asset Layer (Code Block).
3.  [ ] **Layer Partitioning Check:** Is all structured data (tables, trees, lists) strictly located in the **Asset Layer** (code blocks)?
    - _If [X] is False:_ **STOP.** Refactor the response to encapsulate the data.
4.  [ ] **Constraint Check:** Does the response respect the "No Canvas/No Library" and "ES6+ ESM" constraints?
    - _If [X] is False:_ **STOP.** Rewrite the implementation logic.
5.  [ ] **License Check:** If code was generated, does it include the required GPLv3 header?
    - _If [X] is False:_ **STOP.** Apply the standard GPLv3 header.

### 4.2 Output Sanitization & Formatting Rules

To ensure maximum human readability and prevent structural breakage, the Agent MUST adhere to these formatting constraints:

1.  **No LaTeX in Prose:** Never use LaTeX mathematical notation (e.g., `$\rightarrow$`, `$\pm$`, or `$\forall$`) within the Narrative Layer. Use standard ASCII characters (e.g., `->`, `+/-`, or `for all`) or plain English.
2.  **Zero-Tolerance for Uncontained Pipes:** The character `|` is a structural trigger. It must **never** appear in the Narrative Layer unless it is part of a standard word (e.g., "pipe"). If you intend to create a table, list, or comparison, you **must** wrap the entire structure in an Asset Layer (Code Block).
3.  **Atomic Response Check:** Before clicking "Send", the Agent must verify that no sentence in the Narrative Layer ends abruptly or is cut off due to a failed structural calculation.
4.  **No Mathematical Symbols for Logic:** Use plain arrows (`->`) or words (`leads to`) instead of mathematical symbols (`$\Rightarrow$`) to describe logic flows in text.

## 5. Language Standard & Environment

The project is strictly an **ES6+ (ECMAScript 2015+)** environment using **ES Modules (ESM)**.

- **Standard:** Use modern JavaScript syntax (e.g., `const`/`let`, arrow functions, destructuring, template literals, private class fields `#`).
- **Naming Conventions:** Follow modern JavaScript conventions:
  - **PascalCase** for Classes (e.g., `class Employee`).
  - **camelCase** for variables, functions, and methods (e.g., `const userAccount`).
  - **UPPER_SNAKE_CASE** for true constants (e.g., `const MAX_RETRY_ATTEMPTS`).
- **Module System:** Use `import` and `export` exclusively. Do **not** suggest `require()`, `module.exports`, or CommonJS-specific patterns.
- **Asynchronous Patterns:** Prefer `async/await` over raw `Promises` or callback-based logic.
- **Clean Code & Maintainability:**
  - **Single Responsibility:** Functions and classes must have one clear purpose.
  - **Explicit over Implicit:** Avoid hidden side effects; functions should be predictable.
  - **Error Handling:** Never swallow errors in `catch` blocks; ensure failures are observable.
  - **Domain Modeling:** Use classes/objects to encapsulate related data (avoid Primitive Obsession).
  - **Intention-Revealing Names:** Prioritize descriptive names over brevity; avoid cryptic abbreviations.
- **Avoid Legacy Syntax:** Never suggest `var`, `prototype` manipulation for new logic, or outdated string concatenation.

## 6. Operational Constraints

- **Code Modification Policy:** The Agent must **never** use `edit_existing_file` or `single_find_and_replace` to modify files unless the user has explicitly requested a change to a specific file.
- **Standard Workflow for Changes:**
  1. **Propose:** When a change is identified or requested, the Agent must first provide the proposed modification as a code snippet within the chat interface.
  2. **Request Permission:** After presenting the snippet, the Agent must explicitly ask for permission to apply the change to the actual file (e.g., "Would you like me to apply this change to [filepath]?").
  3. **Execute:** Only upon receiving an explicit, direct command (e.g., "Yes, apply it" or "Update [filepath]") should the Agent use the editing tools.
- **Code Suggestion Policy:** When reviewing code or identifying errors, the Agent should primarily provide **code snippets** in the chat interface for the user to review and implement manually.
- **Authorization:** All file-writing actions are the sole responsibility of the human developer. The Agent's role is to propose, not to impose, changes.
- **Prohibition on Unauthorized Changes:** The Agent is strictly prohibited from modifying any file in the workspace without an explicit, direct command from the human developer to do so.

## 7. License & Legal Compliance

The project is licensed under the **GNU General Public License v3 (GPLv3)**. When reviewing or creating files, the Agent must ensure:

- **Header Completeness:** Every source file should contain a header including:
  - A brief description of the file's purpose.
  - A valid Copyright notice: `Copyright (C) <year> <name>`.
  - A reference to the GPLv3 license and a link to the full text.
  - A clear disclaimer of warranty (`WITHOUT ANY WARRANTY`).
  - (Optional but preferred) Contact information (e.s., email).
- **Consistency:** The license text in the file headers must match the terms found in the root `LICENSE` file.
- **Integrity:** Do not remove existing copyright or license notices during refactoring.

## 8. Output Formatting Standards

To ensure compatibility with the IDE interface and prevent markdown parsing bugs, the Agent must cleanly split responses into two layers:

### 8.1 The Narrative Layer (Conversational Text)

- Used for explanations, reasoning, and dialogue.
- Use standard paragraphs and standard Markdown bullet points (`-`) for simple lists.
- NEVER use raw Markdown tables or ASCII trees here.

### 8.2 The Asset Layer (Code & Structural Blocks)

- Every single code snippet, refactor proposal, directory tree, or markdown table MUST be encapsulated inside a standard Markdown code block specifying the language (e.g., `javascript, `css, `markdown, or `text).
- Never nest markdown code blocks inside other code blocks.
- Ensure all code snippets are clean, syntactically complete, and include the standard language delimiter so the IDE extension can parse and inject the code correctly.

## 9. Project-Specific Constraints

### 9.1 Rendering Engine Constraint

- **Strict Prohibition:** The use of `<canvas>`, WebGL, or any external rendering/game libraries (e.g., PixiJS, Phaser) is strictly forbidden.
- **Mandatory Approach:** All game world rendering and animations must be achieved through **pure DOM manipulation**.
- **Implementation Standard:**
  - Game entities must be represented by HTML elements (e.g., `<div>`, `<span>`).
  - Movement, scaling, and transformations must be managed via CSS properties (`top`, `left`, `transform`, `opacity`) and CSS Transitions/Animations.
  - The DOM tree serves as the primary scene graph.

### 10. UML Integrity & Verification

The Agent must act as a bridge between the **Implementation Truth** (Code) and the **Architectural Blueprint** (UML). When reviewing code or proposing changes, the Agent must perform a "Sync-Check" against the project's `.puml` files.

#### 10.1 The UML Audit Protocol

Whenever the Agent interacts with a class-based module, it must execute the following verification steps:

1.  **Signature Synchronization:**
    - Verify that all public methods and attributes defined in the `.puml` exist in the `.js` implementation.
    - Flag any "Ghost Methods" (methods present in UML but missing in Code).
    - Flag any "Undocumented Features" (methods present in Code but missing in UML).

2.  **Visibility Alignment:**
    - Ensure that visibility markers in the `.puml` (`+`, `-`, `#`) match the actual JavaScript access modifiers (`public`, `#private`, `protected` via convention).

3.  **Relationship Validation:**
    - Confirm that the relationship types in the UML (Composition, Aggregation, Inheritance) accurately represent the object lifecycle in the code.
    - _Example:_ If the code uses `new Point()` inside the `Ship` constructor, the UML must use Composition (`*--`), not Aggregation (`o--`).

4.  **Type Consistency:**
    - Verify that the types declared in the UML (e.g., `int`, `string`, `Point`) match the actual runtime logic and TypeDocs/JSDoc in the implementation.

#### 10.2 Mandatory Reporting

If a discrepancy is detected between the Code and the UML, the Agent **must not** simply ignore it. The Agent must:

- **Identify the Drift:** State clearly which file and which specific member is out of sync.
- **Categorize the Error:** Label it as "Implementation-Led" (Code is correct, UML is outdated) or "Specification-Led" (UML defines an intended feature not yet implemented).
- **Propose a Reconciliation:** Suggest a specific update to either the `.js` file or the `.puml` file to restore structural integrity.
