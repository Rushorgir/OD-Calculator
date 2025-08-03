# OD Management System

> A sleek, interactive college OD (On Duty) management web app for tracking OD hours, managing timetables, and maintaining event history, built with HTML, CSS, and JavaScript.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![HTML5](https://img.shields.io/badge/-HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/-CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

## Features

- **Modern Dashboard:** Visual OD balance tracker with circular progress indicator
- **Smart Timetable:** Interactive Monday-Saturday schedule with Theory/Lab class support
- **Real-time Conflict Detection:** Automatic OD calculation when events overlap with classes
- **Event History:** Comprehensive logging with search, filter, and CSV export
- **Auto-Save:** All data is persisted in browser localStorage, no server required
- **Responsive Design:** Clean, modern UI that works on desktop and mobile
- **Event Management:** Add/remove events with automatic OD balance restoration

## Quick Start

### Prerequisites

- **Visual Studio Code** (recommended)
- **Live Server extension** for VSCode
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Rushorgir/OD-calculator.git
   cd OD-calculator
   ```

2. **Install Live Server Extension**
   - Open the project in **Visual Studio Code**
   - Press `Ctrl+Shift+X` (or `Cmd+Shift+X` on Mac) to open Extensions
   - Search for **"Live Server"** by Ritwick Dey
   - Click **Install**

3. **Launch the Application**
   - Right-click on `index.html` in VSCode
   - Select **"Open with Live Server"**
   - OR click the **"Go Live"** button in the bottom status bar

4. **Start Managing Your OD!**
   - Your browser will automatically open the application
   - No additional setup required, everything runs client-side

## Usage Guide

### Dashboard
- View your remaining OD balance (starts at 40 hours)
- See total events added and OD hours consumed
- Quick access to all major functions

### Timetable Management
1. Navigate to the **Timetable** section
2. Toggle between **Theory** (50 min) and **Lab** (100 min) classes
3. Click on time slots to add/remove classes
4. Enter subject names when prompted
5. Changes save automatically

### Adding Events
1. Go to **Add Event** section
2. Fill in event details:
   - Event name
   - Location
   - Date (weekdays only)
   - Start and end times
3. Review conflict detection results
4. Confirm to save (OD automatically deducted)

### Event History
- View all past events with OD usage details
- Search events by name, date, or location
- Export complete history as CSV
- **Remove events** to restore OD balance

## Project Structure

```
od-management-system/
â”‚
â”œâ”€â”€ ðŸ“„ index.html        # Main application interface
â”œâ”€â”€ ðŸŽ¨ style.css         # Modern responsive styling
â”œâ”€â”€ âš™ï¸ app.js            # Core application logic
â””â”€â”€ ðŸ“– README.md         # Documentation (you're here!)
```

## â° Class Time Slots

### Theory Classes (50 minutes each)
- **Morning:** 8:00-8:50, 8:55-9:45, 9:50-10:40, 10:45-11:35, 11:40-12:30, 12:35-13:25
- **Evening:** 14:00-14:50, 14:55-15:45, 15:50-16:40, 16:45-17:35, 17:40-18:30, 18:35-19:25

### Lab Classes (100 minutes each)
- **Morning:** 8:00-9:40, 9:50-11:30, 11:40-13:20
- **Evening:** 14:00-15:40, 15:50-17:30, 17:40-19:20

## ðŸ’¡ Key Features Explained

### ðŸ§  Smart Conflict Detection
- Automatically detects when events overlap with scheduled classes
- Any overlap (even partial) counts as full OD usage for that class
- Real-time feedback as you enter event details

### ðŸ’¾ Data Persistence
- All data stored in browser's localStorage
- Survives browser refreshes and Live Server restarts
- No backend or database required

### ðŸ”„ OD Balance Management
- Starts with 40 hours (2400 minutes) of OD
- Automatically deducted when events conflict with classes
- Restored when events are deleted
- Visual progress indicator shows remaining balance

## â“ Frequently Asked Questions

**Q: Will my data be lost if I close the browser or stop Live Server?**  
A: No! All data is saved in your browser's localStorage and persists between sessions.

**Q: Can I access my data from different devices?**  
A: Data is stored locally in each browser. Use the CSV export feature to transfer data between devices.

**Q: What happens if I delete an event?**  
A: The OD hours used by that event are automatically restored to your balance.

**Q: Can I backup my data?**  
A: Yes! Use the Export button in the Event History section to download your data as a CSV file.

**Q: Does this work offline?**  
A: Yes! Once loaded, the application works completely offline.

## ðŸ› ï¸ Technical Details

- **Frontend:** Pure HTML5, CSS3, and Vanilla JavaScript
- **Storage:** Browser localStorage (no server required)
- **Compatibility:** Modern browsers with ES6+ support
- **Responsive:** Mobile-friendly design
- **No Dependencies:** Runs without external libraries

## ðŸ¤ Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## ðŸ“„ License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ðŸ™ Acknowledgments

- Inspired by the need for better student OD management tools
- Built with modern web standards for optimal performance
- Designed with student workflows in mind

---

**â­ If this project helped you manage your OD hours better, please give it a star!**

Made with â¤ï¸ for students everywhere
