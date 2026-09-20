# Anu Surprise — Activity Tracking Setup

Your original site is preserved. The tracking is additive and records only these visible button interactions: Letter Opened, Surprise Opened, Like YES/NO, and Will You Be Mine YES/Let me think. It does not collect location, keystrokes, camera, device identifiers, or hidden browsing activity.

## 1. Create the backend
1. Create a Google Sheet.
2. Open **Extensions → Apps Script**.
3. Paste `apps-script-backend.gs`.
4. Change `ADMIN_TOKEN` to a long random secret.
5. Deploy → New deployment → Web app. Execute as **Me** and choose the access setting that lets the public website send events. Copy the Web App URL.

## 2. Connect the website
Open `tracking.js` and replace `PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE` with the Web App URL.

## 3. Connect the private admin page
Open `admin.html` and replace both placeholders: the Web App URL and the same admin token. Keep `admin.html` out of public links; the token is the access gate for reading the sheet.

## 4. Deploy
Upload the whole folder to your GitHub Pages repository. Open `admin.html` at the same site URL when you want to view activity.

### Important
The website can be hosted on GitHub Pages, but persistent cross-device activity needs the Apps Script/Google Sheet backend. Until you complete these setup steps, the normal website still works and tracking simply stays inactive.
