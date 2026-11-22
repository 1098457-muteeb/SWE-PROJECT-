# SWE-PROJECT-Adaptive Phishing Training System
# Adaptive Phishing Training System

A simple bilingual (English / Arabic) phishing training app built with plain HTML, CSS and JavaScript.


## Files
```
phishing-trainer/
├── index.html          Login + register page
├── inbox.html          Student / Employee inbox, feedback, My History
├── admin.html          Admin (users, roles, levels, activate / deactivate) and Content Manager (add, edit, delete scenarios)
├── dashboard.html      Security Manager (and Admin) statistics, progress bars, PDF / CSV report
├── css/
│   └── style.css       One stylesheet for every page
└── js/
    ├── data.js         Fixed data: demo users, the 18 emails, names, English/Arabic text
    ├── core.js         Shared code: storage, helpers, language, login, start-up
    ├── inbox.js        Inbox logic (loaded only by inbox.html)
    ├── admin.js        Admin / Content Manager logic (loaded only by admin.html)
    └── dashboard.js    Dashboard logic (loaded only by dashboard.html)
```
Every page loads the scripts in this order: `data.js`, then `core.js`, then its own page file.
Each page file registers itself with `pages.<name> = ...` so `core.js` can redraw it after a language change.
Plain `<script>` tags are used (no ES modules), so double-clicking `index.html` works.

## Demo accounts
| Role | Email | Password |
|------|-------|----------|
| Student / Employee | student@demo.com | 1234 |
| Admin | admin@demo.com | admin |
| Content Manager | content@demo.com | content |
| Security Manager | security@demo.com | security |

## Registration
On `index.html`, click **New user? Create an account**. Fill in name, email and password.
Every self-registered account is a Student / Employee. Only an Admin can change a user's role,
level or active status on `admin.html`. Duplicate emails are rejected and you are logged in automatically.



## How it works
- **Adaptive difficulty:** correctly flagging 4 phishing emails raises the level (Easy > Medium > Hard); 2 mistakes in a row lower it. Legitimate emails do not count towards the 4.
- **Response timer:** seconds are measured from opening an email to flagging it, then saved with the result.
- **Language toggle:** EN / العربية switches all text and flips the layout right-to-left.
- **Storage:** users, scenarios and results live in the browser's localStorage.
  To start fresh, clear the site data for the page in your browser (or use "Reset all results" on the dashboard).
- **Dashboard demo data:** the Security Manager can press "Load demo data" to fill the charts for a presentation.
