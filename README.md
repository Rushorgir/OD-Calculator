# OD Management System

> A sleek, interactive college OD (On Duty) management web app for tracking OD hours, timetable, and event history—built with HTML, CSS, and JavaScript, running entirely in your browser.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![HTML5](https://img.shields.io/badge/-HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/-CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)


## 🚀 Features

- **Modern Design:** Fresh dashboard, color-coded timetable, responsive layout.
- **Timetable Management:** Add, edit, and remove classes for Theory and Lab, supporting Monday to Saturday.
- **Event Handling:** Enter events with conflict detection—OD hours used are calculated automatically if events overlap with your classes.
- **OD Balance Tracking:** Visual progress indicator for remaining OD (starts at 40 hours).
- **Event History:** Table with search and export; see what events used OD and the affected classes.
- **Persistent Storage:** All data (timetable, events, OD balance) saved in your browser’s localStorage—survives refreshes and Live Server restarts.

## 📦 Live Demo

You can run the project **locally** (no backend required).

## 🛠️ Installation & Setup Guide

### 1. **Clone the Repository**

```bash
git clone https://github.com/Rushorgir/OD-Calculator
cd Od-Calculator
```

### 2. **Install the Live Server VSCode Extension**

- Open the project in **Visual Studio Code**.
- Go to the Extensions sidebar (Ctrl+Shift+X or ⌘+Shift+X).
- Search for **Live Server** by Ritwick Dey.
- Click **Install**.

Or get it directly from [Live Server Marketplace](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).

### 3. **Launch the App**

- In VSCode, right-click on `index.html` and select **"Open with Live Server"**.
- OR click the **"Go Live"** button at the bottom right.

Your OD Management System will open in your browser—fully functional!

## 📋 Usage Guide

1. **Timetable Setup:**  
   Go to the *Timetable* section. Click slots to add or remove classes. Pick Theory or Lab as needed.

2. **Add Events:**  
   Go to *Add Event*. Enter event details (name, place, date, times).  
   The system will highlight any class overlaps and calculate OD usage automatically.

3. **Event History:**  
   The *History* section logs every past event, OD used, and the affected classes.  
   Search, sort, and export as CSV.

4. **Dashboard:**  
   The home dashboard shows your remaining OD, total events, hours used, and recent activity.

5. **Delete Events:**  
   In *History*, remove any event to instantly restore the OD balance associated with it.

6. **Data Persistence:**  
   All data is saved in your browser—no backend, no signup.  
   Data stays safe unless you clear your browser or use a different device.

## 💡 Tips

- **Support for Monday–Saturday:** Timetable and events fully support six weekdays.
- **OD Balance Logic:** Partial overlaps count as full OD for the slot.
- **No backend required:** Everything is client-side—just serve the HTML, CSS, and JS.
- **For backups:** Use the export button in the History section to save your events.

## ⚡️ Project Structure

```
od-management-system/
│
├── index.html       # Main page (UI, layout)
├── style.css        # Stylesheet (modern, responsive design)
├── app.js           # Main JavaScript logic
└── README.md        # (This file!)
```

## ❓ FAQ

**Q: Will my data be lost if I close or stop Live Server?**  
A: Nope! All data is saved in your browser’s localStorage. Your info stays unless you clear your browser cache/storage.

**Q: Can I use this from my phone or another PC?**  
A: Your data stays on the device/browser where you used it. For other devices, set up the project the same way. (Future update: CSV import/export helps transfer data.)

**Q: How can I backup or transfer my OD records?**  
A: Use the Export button in the History tab to download your events as a CSV file.

## 📝 Credits

Created by [Your Name / GitHub Username].  
Inspired by modern student needs.

## 🦄 License

MIT

*Enjoy organized, stress-free OD management!*
