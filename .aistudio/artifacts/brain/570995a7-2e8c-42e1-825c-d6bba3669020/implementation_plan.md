# Requirement Selection for Candidate Reports

Allow users to select a specific job requirement when clicking "View Report" for candidates who have applied to multiple positions, before viewing the SkillBrew report.

## User Review & Critical Decisions

> [!IMPORTANT]
> The candidate report flow will now present a two-step dialog or interactive selector to choose from the candidate's applied job requirements before loading the report.

- **Requirement Selector Flow**: Clicking "View Report" opens a modal listing all active requirements the candidate has applied to (e.g. *Business Analyst & Quality Analyst*, *QA Automation Engineer*, *Senior Data Analyst*).
- **Report Context**: Once a requirement is selected, the modal transitions to show the candidate name, target requirement title, and the **"SkillBrew Report Here Loading..."** state, with a quick "Back to Requirements" option.

---

## 1. Overview & Core Concept

Candidates in Jobcheck often apply for multiple job positions or requirements within an organization. To ensure recruiters view the report relevant to the exact job role they are evaluating, clicking "View Report" under the Recommended tab or Candidates view will prompt the user to pick the target requirement first.

---

## 2. User Experience & Visual Design

### User Interaction Flow

```
┌──────────────────────────┐      ┌──────────────────────────────┐      ┌──────────────────────────────┐
│  Click "View Report"     │ ───> │  Select Requirement Modal    │ ───> │  SkillBrew Report Loading    │
│  (Recommended Card)      │      │  Lists candidate's jobs      │      │  "SkillBrew Report Here... " │
└──────────────────────────┘      └──────────────────────────────┘      └──────────────────────────────┘
                                                                                      │
                                                                         [Back to Requirements]
```

1. **Trigger**: Click "View Report" on any candidate card under Recommended or Candidates.
2. **Step 1: Requirement Selector**:
   - Modal header displays candidate name (e.g., *"Select Requirement for Aditya Roy Test"*).
   - Card list of applied job roles featuring:
     - Job Title & Position ID
     - Match Score (e.g., `100% Match`)
     - Application Date & Current Stage (e.g. `Applied`, `Screened`, `Offered`)
   - Hover highlight & click action on each requirement card.
3. **Step 2: SkillBrew Loading Report**:
   - Displays candidate name + chosen requirement title in the modal header.
   - Shows animated spinner + `"SkillBrew Report Here Loading..."`.
   - Includes a **"← Back to Requirements"** button to allow switching requirements without closing the modal.

### Visual Styling

- Consistent with Jobcheck's existing `#00607a` / `#0284c7` color palette.
- Styled requirement selection cards with clean typography, unboxed metadata, and subtle hover borders.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: In-Modal Requirement Selector vs. Direct Dropdown**:
  - *Chosen Approach*: Show a clean modal with formatted requirement cards.
  - *Why*: Provides room to show key metadata (Match %, Application Date, Stage) per job role without overcrowding small button dropdowns.
- **Decision 2: Back Navigation in Modal**:
  - *Chosen Approach*: Include a "Back to Requirements" link in the report loading card.
  - *Why*: Allows recruiters comparing multiple reports for the same candidate to switch roles easily.

---

## 4. Technical Architecture & Data Strategy

### Component State Extensions (`src/App.tsx`)

```
App State
├── activeTab: 'Recommended' | 'Candidates' | 'Job Details'
├── selectedCandidates: string[]
├── roleStatus: 'idle' | 'active' | 'paused'
└── reportModalState:
    ├── isOpen: boolean
    ├── candidateName: string
    ├── selectedRequirement: JobRequirement | null
    └── viewStep: 'select-requirement' | 'loading-report'
```

### Data Model for Candidate Job Applications

```typescript
interface CandidateRequirement {
  id: string;
  jobTitle: string;
  matchScore: string;
  appliedDate: string;
  status: string;
}
```

Each candidate will have 2–3 mock requirement entries (e.g., *Business Analyst And Quality Analyst*, *Senior QA Automation Engineer*, *Data Systems Specialist*) to demonstrate multi-application reports.
