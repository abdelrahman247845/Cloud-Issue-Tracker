# Lab 3 — Cloud Issue Tracker Architecture

## 1. Application Goal

## 2. Functional Scope

## 3. Request Flow

CREATE ISSUE:
User → Frontend form → POST /api/issues → API validation → Data layer
← Render created issue ← 201 + JSON ←───────────────┘
Explanation:
• The user fills in the form (title, description) and clicks Submit.
• The frontend sends POST /api/issues with the form data as JSON.
• The API validates the data (title present, length limits). If invalid, it stops and returns code 400 and an error
message.
• The data layer stores the issue, gives it an id and status "open".
• The API replies 201 Created and the new issue as JSON.
• The frontend adds the new issue to the list on screen.
VIEW ISSUES
Page load → GET /api/issues → API → Data layer
← Render list ← 200 + JSON array ←───┘
Explanation:
• The page loads and the frontend sends GET /api/issues.
• The API asks the data layer for every stored issue.
• The API replies 200 OK and the JSON array (empty array if none).
• The frontend renders one row/card per issue, or "No issues yet" when the array is empty

VIEW ISSUES
Page load → GET /api/issues → API → Data layer
← Render list ← 200 + JSON array ←───┘
Explanation:
• The page loads and the frontend sends GET /api/issues.
• The API asks the data layer for every stored issue.
• The API replies 200 OK and the JSON array (empty array if none).
• The frontend renders one row/card per issue, or "No issues yet" when the array is empty.
Button → PATCH /api/issues/{id}/status → API validation → Data layer
← Re-render issue ← 200 + updated JSON ←──────────┘
Explanation:
• The user clicks a status button on one issue.
• The frontend sends PATCH /api/issues/{id}/status with a body such as {"status": "in_progress"}.
• The API validates two things:
o the issue {id} exists (otherwise 404 Not Found)
o the new status is an allowed value (otherwise 400 Bad Request)
• The data layer updates only the status field of that issue.
• The API replies 200 OK and the full updated issue as JSON.
• The frontend re-renders that one issue with its new status.

## 4. Trust Boundaries

USER-CONTROLLED SIDE APPLICATION-CONTROLLED SIDE
Browser input ───── HTTP request ─────▶ REST API ─────▶ Data
▲ │
└────────── JSON response ◀────────────┘
Explanation:
**User-controlled side:** AKA the browser, the form fields, the buttons, and
every HTTP request that leaves the browser. The user can change any of
it (browser dev tools, curl, Postman). When they a HTTP request is passed it is deemed untrusted until it is validated.
**Application-controlled side:** AKA the REST API and the data layer. Only
the code base runs here, and the data is reachable only through the API.
**The boundary** is the HTTP request and follows rules:

1. The API validates every request. Frontend checks are only for convenience, never for security.
2. The browser never talks to the data layer directly.
3. The API returns only what the frontend needs, and never leaks
   internal errors or stack traces.
4. The frontend shows issue text as plain text, never as HTML.
