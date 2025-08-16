const APP_DATA = {
  theory_slots: [
    {"id": 1, "start": "08:00", "end": "08:50"},
    {"id": 2, "start": "08:55", "end": "09:45"},
    {"id": 3, "start": "09:50", "end": "10:40"},
    {"id": 4, "start": "10:45", "end": "11:35"},
    {"id": 5, "start": "11:40", "end": "12:30"},
    {"id": 6, "start": "12:35", "end": "13:25"},
    {"id": 7, "start": "14:00", "end": "14:50"},
    {"id": 8, "start": "14:55", "end": "15:45"},
    {"id": 9, "start": "15:50", "end": "16:40"},
    {"id": 10, "start": "16:45", "end": "17:35"},
    {"id": 11, "start": "17:40", "end": "18:30"},
    {"id": 12, "start": "18:35", "end": "19:25"}
  ],
  lab_slots: [
    {"id": 1, "start": "08:00", "end": "09:40"},
    {"id": 2, "start": "09:50", "end": "11:30"},
    {"id": 3, "start": "11:40", "end": "13:20"},
    {"id": 4, "start": "14:00", "end": "15:40"},
    {"id": 5, "start": "15:50", "end": "17:30"},
    {"id": 6, "start": "17:40", "end": "19:20"}
  ],
  days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  initial_od_balance: 40 * 60,
  class_durations: {
    theory: 50,
    lab: 100
  }
};

let appState = {
  odBalance: APP_DATA.initial_od_balance,
  timetable: {},
  events: [],
  currentClassType: 'theory'
};


document.addEventListener('DOMContentLoaded', function() {
  loadData();
  initializeNavigation();
  initializeTimetable();
  initializeEventForm();
  initializeHistory();
  updateDashboard();
  
  const today = new Date().toISOString().split('T')[0];
});

function saveData() {
  localStorage.setItem('odManagementData', JSON.stringify(appState));
}

function loadData() {
  const savedData = localStorage.getItem('odManagementData');
  if (savedData) {
    const loaded = JSON.parse(savedData);
    appState = { ...appState, ...loaded };
  }
  if (!savedData) {
    appState.odBalance = APP_DATA.initial_od_balance;
  }
}

function initializeNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.section');
  const sidebarToggle = document.getElementById('sidebarToggle');
  const sidebar = document.getElementById('sidebar');

  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetSection = this.getAttribute('data-section');
      
      console.log('Navigation clicked:', targetSection);
      
      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
      
      sections.forEach(s => s.classList.remove('active'));
      const targetElement = document.getElementById(targetSection);
      if (targetElement) {
        targetElement.classList.add('active');
      }
      
      if (window.innerWidth <= 768) {
        sidebar.classList.remove('active');
      }
      
      if (targetSection === 'history') {
        updateHistoryTable();
      } else if (targetSection === 'timetable') {
        generateTimetableGrid();
      }
    });
  });

  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', function() {
      sidebar.classList.toggle('active');
    });
  }

  document.addEventListener('click', function(e) {
    if (window.innerWidth <= 768 && sidebar && !sidebar.contains(e.target) && (!sidebarToggle || !sidebarToggle.contains(e.target))) {
      sidebar.classList.remove('active');
    }
  });
}

function initializeTimetable() {
  generateTimetableGrid();
  setupTimetableControls();
}

function generateTimetableGrid() {
  const grid = document.getElementById('timetableGrid');
  if (!grid) return;
  
  grid.innerHTML = '';

  const cornerCell = document.createElement('div');
  cornerCell.className = 'time-header';
  grid.appendChild(cornerCell);

  APP_DATA.days.forEach(day => {
    const dayHeader = document.createElement('div');
    dayHeader.className = 'day-header';
    dayHeader.textContent = day;
    grid.appendChild(dayHeader);
  });

  const currentSlots = appState.currentClassType === 'theory' ? APP_DATA.theory_slots : APP_DATA.lab_slots;

  currentSlots.forEach(slot => {
    const timeLabel = document.createElement('div');
    timeLabel.className = 'time-header';
    timeLabel.innerHTML = `<div>${slot.start}</div><div class="time-label">${slot.end}</div>`;
    grid.appendChild(timeLabel);

    APP_DATA.days.forEach(day => {
      const timeSlot = document.createElement('div');
      timeSlot.className = 'time-slot';
      timeSlot.dataset.day = day;
      timeSlot.dataset.slotId = slot.id;
      timeSlot.dataset.type = appState.currentClassType;
      
      const timetableKey = `${day}-${appState.currentClassType}-${slot.id}`;
      if (appState.timetable[timetableKey]) {
        timeSlot.classList.add(appState.currentClassType);
        timeSlot.textContent = appState.timetable[timetableKey].subject || `${appState.currentClassType.charAt(0).toUpperCase() + appState.currentClassType.slice(1)} Class`;
      } else {
        timeSlot.textContent = 'Available';
      }

      timeSlot.addEventListener('click', function() {
        toggleTimeSlot(this);
      });

      grid.appendChild(timeSlot);
    });
  });
}

function setupTimetableControls() {
  const classTypeButtons = document.querySelectorAll('.class-type-btn');
  const clearButton = document.getElementById('clearTimetable');

  classTypeButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      classTypeButtons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      appState.currentClassType = this.dataset.type;
      generateTimetableGrid();
    });
  });

  if (clearButton) {
    clearButton.addEventListener('click', function() {
      if (confirm('Are you sure you want to clear all timetable data?')) {
        appState.timetable = {};
        saveData();
        generateTimetableGrid();
        updateDashboard();
        showToast('Timetable cleared successfully', 'success');
      }
    });
  }
}

function toggleTimeSlot(slot) {
  const day = slot.dataset.day;
  const slotId = slot.dataset.slotId;
  const type = slot.dataset.type;
  const timetableKey = `${day}-${type}-${slotId}`;

  if (appState.timetable[timetableKey]) {
    delete appState.timetable[timetableKey];
    slot.classList.remove(type);
    slot.textContent = 'Available';
  } else {
    const subject = prompt(`Enter subject name for this ${type} class:`);
    if (subject && subject.trim()) {
      appState.timetable[timetableKey] = {
        subject: subject.trim(),
        day: day,
        type: type,
        slotId: parseInt(slotId),
        start: getSlotTime(type, slotId, 'start'),
        end: getSlotTime(type, slotId, 'end')
      };
      slot.classList.add(type);
      slot.textContent = subject.trim();
    }
  }

  saveData();
  updateDashboard();
}

function getSlotTime(type, slotId, timeType) {
  const slots = type === 'theory' ? APP_DATA.theory_slots : APP_DATA.lab_slots;
  const slot = slots.find(s => s.id == slotId);
  return slot ? slot[timeType] : null;
}

function initializeEventForm() {
  const form = document.getElementById('eventForm');
  const conflictPreview = document.getElementById('conflictPreview');
  const startTimeInput = document.getElementById('startTime');
  const endTimeInput = document.getElementById('endTime');
  const dateInput = document.getElementById('eventDate');

  if (!form) return;

  [startTimeInput, endTimeInput, dateInput].forEach(input => {
    if (input) {
      input.addEventListener('change', checkConflicts);
      input.addEventListener('input', checkConflicts);
    }
  });

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    handleEventSubmission();
  });
}

function checkConflicts() {
  const eventDate = document.getElementById('eventDate').value;
  const startTime = document.getElementById('startTime').value;
  const endTime = document.getElementById('endTime').value;
  const conflictPreview = document.getElementById('conflictPreview');

  if (!conflictPreview || !eventDate || !startTime || !endTime) {
    if (conflictPreview) conflictPreview.classList.remove('show');
    return;
  }

  if (startTime >= endTime) {
    showConflictPreview('End time must be after start time', [], 'error');
    return;
  }

  const eventDay = new Date(eventDate).toLocaleDateString('en-US', { weekday: 'long' });
  
  if (!APP_DATA.days.includes(eventDay)) {
    showConflictPreview('No classes scheduled for weekends', [], 'warning');
    return;
  }

  const conflicts = findConflicts(eventDay, startTime, endTime);
  
  if (conflicts.length > 0) {
    const totalOD = conflicts.reduce((sum, conflict) => sum + conflict.odHours, 0);
    const remainingOD = appState.odBalance - totalOD;
    
    if (remainingOD < 0) {
      showConflictPreview(`Insufficient OD balance! You need ${Math.abs(remainingOD)} more minutes.`, conflicts, 'error');
    } else {
      showConflictPreview(`This event will use ${totalOD} minutes (${(totalOD/60).toFixed(1)} hours) of OD`, conflicts, 'warning');
    }
  } else {
    showConflictPreview('No class conflicts detected', [], 'success');
  }
}

function findConflicts(eventDay, eventStartTime, eventEndTime) {
  const conflicts = [];
  
  Object.values(appState.timetable).forEach(classData => {
    if (classData.day === eventDay) {
      if (timeOverlap(eventStartTime, eventEndTime, classData.start, classData.end)) {
        conflicts.push({
          ...classData,
          odHours: APP_DATA.class_durations[classData.type]
        });
      }
    }
  });

  return conflicts;
}

function timeOverlap(start1, end1, start2, end2) {
  return start1 < end2 && end1 > start2;
}

function showConflictPreview(message, conflicts, type) {
  const conflictPreview = document.getElementById('conflictPreview');
  if (!conflictPreview) return;
  
  let html = `<div class="conflict-summary">${message}</div>`;
  
  if (conflicts.length > 0) {
    html += '<ul class="conflict-list">';
    conflicts.forEach(conflict => {
      html += `<li>${conflict.subject} (${conflict.type}) - ${conflict.start} to ${conflict.end} - ${conflict.odHours} minutes OD</li>`;
    });
    html += '</ul>';
  }

  conflictPreview.innerHTML = html;
  conflictPreview.className = `conflict-preview show ${type}`;
}

function handleEventSubmission() {
  const eventName = document.getElementById('eventName').value;
  const eventPlace = document.getElementById('eventPlace').value;
  const eventDate = document.getElementById('eventDate').value;
  const startTime = document.getElementById('startTime').value;
  const endTime = document.getElementById('endTime').value;

  const eventDay = new Date(eventDate).toLocaleDateString('en-US', { weekday: 'long' });
  const conflicts = findConflicts(eventDay, startTime, endTime);
  const totalOD = conflicts.reduce((sum, conflict) => sum + conflict.odHours, 0);

  if (totalOD > appState.odBalance) {
    showToast('Insufficient OD balance for this event', 'error');
    return;
  }

  showConfirmationModal(eventName, eventPlace, eventDate, startTime, endTime, conflicts, totalOD);
}

function showConfirmationModal(name, place, date, startTime, endTime, conflicts, totalOD) {
  const modal = document.getElementById('confirmModal');
  const content = document.getElementById('confirmContent');
  
  if (!modal || !content) return;
  
  let html = `
    <div><strong>Event:</strong> ${name}</div>
    <div><strong>Place:</strong> ${place}</div>
    <div><strong>Date:</strong> ${new Date(date).toLocaleDateString()}</div>
    <div><strong>Time:</strong> ${startTime} - ${endTime}</div>
    <div><strong>OD Hours to be used:</strong> ${totalOD} minutes (${(totalOD/60).toFixed(1)} hours)</div>
  `;

  if (conflicts.length > 0) {
    html += '<div><strong>Affected Classes:</strong></div><ul>';
    conflicts.forEach(conflict => {
      html += `<li>${conflict.subject} (${conflict.type}) - ${conflict.start} to ${conflict.end}</li>`;
    });
    html += '</ul>';
  }

  content.innerHTML = html;
  modal.classList.remove('hidden');

  modal.eventData = { name, place, date, startTime, endTime, conflicts, totalOD };
}

document.addEventListener('DOMContentLoaded', function() {
  const closeModal = document.getElementById('closeModal');
  const cancelConfirm = document.getElementById('cancelConfirm');
  const confirmAdd = document.getElementById('confirmAdd');

  if (closeModal) closeModal.addEventListener('click', closeModalHandler);
  if (cancelConfirm) cancelConfirm.addEventListener('click', closeModalHandler);
  if (confirmAdd) confirmAdd.addEventListener('click', confirmEventAddition);
});

function closeModalHandler() {
  const modal = document.getElementById('confirmModal');
  const confirmButton = document.getElementById('confirmAdd');
  const cancelButton = document.getElementById('cancelConfirm');
  
  if (modal) {
    modal.classList.add('hidden');
    
    if (confirmButton) confirmButton.style.display = 'block';
    if (cancelButton) cancelButton.textContent = 'Cancel';
    modal.viewMode = false;
  }
}

function confirmEventAddition() {
  const modal = document.getElementById('confirmModal');
  if (!modal || !modal.eventData) return;
  const modalTitle = document.getElementById('modalTitle');
  if (modalTitle) modalTitle.textContent = "Confirm Event Addition";

  
  const eventData = modal.eventData;

  const event = {
    id: Date.now(),
    name: eventData.name,
    place: eventData.place,
    date: eventData.date,
    startTime: eventData.startTime,
    endTime: eventData.endTime,
    conflicts: eventData.conflicts,
    odUsed: eventData.totalOD,
    timestamp: new Date().toISOString()
  };

  appState.events.push(event);
  appState.odBalance -= eventData.totalOD;

  saveData();
  updateDashboard();
  updateHistoryTable();
  
  const form = document.getElementById('eventForm');
  if (form) form.reset();
  
  const conflictPreview = document.getElementById('conflictPreview');
  if (conflictPreview) conflictPreview.classList.remove('show');
  
  closeModalHandler();
  
  showToast('Event added successfully!', 'success');
}

function initializeHistory() {
  updateHistoryTable();
  setupHistoryControls();
}

function setupHistoryControls() {
  const searchInput = document.getElementById('searchEvents');
  const exportButton = document.getElementById('exportHistory');

  if (searchInput) {
    searchInput.addEventListener('input', function() {
      filterHistoryTable(this.value);
    });
  }

  if (exportButton) {
    exportButton.addEventListener('click', exportHistory);
  }
}

function updateHistoryTable() {
  const tbody = document.getElementById('historyTableBody');
  if (!tbody) return;
  
  if (appState.events.length === 0) {
    tbody.innerHTML = '<tr class="no-data"><td colspan="7">No events found</td></tr>';
    return;
  }

  tbody.innerHTML = appState.events.map(event => {
    const eventDate = new Date(event.date).toLocaleDateString();
    const duration = calculateDuration(event.startTime, event.endTime);
    const affectedClasses = event.conflicts.map(c => c.subject).join(', ') || 'None';
    
    return `
      <tr>
        <td>${eventDate}</td>
        <td>${event.name}</td>
        <td>${event.place}</td>
        <td>${duration}</td>
        <td>${event.odUsed} mins</td>
        <td class="affected-classes">${affectedClasses}</td>
        <td>
          <button class="delete-event-btn" data-id="${event.id}" title="Delete event">
            <i class="fas fa-trash"></i>
          </button>
        </td>
      </tr>
    `;
  }).join('');

  document.querySelectorAll('.delete-event-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const eventId = this.dataset.id;
      const eventName = this.closest('tr').children[1].textContent;
      
      if (confirm(`Are you sure you want to delete "${eventName}"? This will restore the OD hours used.`)) {
        removeEvent(eventId);
      }
    });
  });
  setupEventHistoryPopup();
}

function removeEvent(eventId) {
  const index = appState.events.findIndex(e => String(e.id) === String(eventId));
  if (index === -1) {
    showToast('Event not found', 'error');
    return;
  }

  const eventToRemove = appState.events[index];
  const odToRestore = eventToRemove.odUsed || 0;

  appState.odBalance += odToRestore;

  appState.events.splice(index, 1);

  saveData();
  updateDashboard();
  updateHistoryTable();
  
  const hoursRestored = (odToRestore / 60).toFixed(1);
  showToast(`Event deleted! ${odToRestore} minutes (${hoursRestored} hours) restored to OD balance`, 'success');
}

function setupEventHistoryPopup() {
  document.querySelectorAll('#historyTableBody tr:not(.no-data)').forEach(row => {
    row.addEventListener('click', function(e) {
      if (e.target.classList.contains('delete-event-btn') || e.target.closest('.delete-event-btn')) 
        return;

      const rowIndex = Array.from(row.parentNode.children).indexOf(row);
      if (rowIndex < 0 || rowIndex >= appState.events.length) return;
      
      const event = appState.events[rowIndex];
      showEventDetailsModal(event);
    });
    row.style.cursor = 'pointer';
  });
}

function showEventDetailsModal(event) {
  const modal = document.getElementById('confirmModal');
  const content = document.getElementById('confirmContent');
  const confirmButton = document.getElementById('confirmAdd');
  const cancelButton = document.getElementById('cancelConfirm');
  const modalTitle = document.getElementById('modalTitle');
  if (modalTitle) modalTitle.textContent = "Event Details";

  
  if (!modal || !content) return;

  if (confirmButton) confirmButton.style.display = 'none';
  if (cancelButton) cancelButton.textContent = 'Close';

  const eventDate = new Date(event.date).toLocaleDateString();
  const duration = calculateDuration(event.startTime, event.endTime);
  const affectedClasses = event.conflicts.length > 0 
    ? event.conflicts.map(c => c.subject).join(', ') 
    : 'None';

  content.innerHTML = `
    <div class="event-details-view">
      <div><strong>Event:</strong> ${event.name}</div>
      <div><strong>Place:</strong> ${event.place}</div>
      <div><strong>Date:</strong> ${eventDate}</div>
      <div><strong>Time:</strong> ${event.startTime} - ${event.endTime}</div>
      <div><strong>Duration:</strong> ${duration}</div>
      <div><strong>OD Hours Used:</strong> ${event.odUsed} minutes (${(event.odUsed/60).toFixed(1)} hours)</div>
      <div><strong>Affected Classes:</strong> ${affectedClasses}</div>
      ${event.conflicts.length > 0 ? `
        <div><strong>Class Details:</strong></div>
        <ul style="margin-left: 20px;">
          ${event.conflicts.map(conflict => `
            <li>${conflict.subject} (${conflict.type}) - ${conflict.start} to ${conflict.end}</li>
          `).join('')}
        </ul>
      ` : ''}
    </div>
  `;

  modal.classList.remove('hidden');
  
  modal.viewMode = true;
}

function filterHistoryTable(searchTerm) {
  const rows = document.querySelectorAll('#historyTableBody tr:not(.no-data)');
  
  rows.forEach(row => {
    const text = row.textContent.toLowerCase();
    const matches = text.includes(searchTerm.toLowerCase());
    row.style.display = matches ? '' : 'none';
  });
}

function calculateDuration(startTime, endTime) {
  const start = new Date(`2000-01-01 ${startTime}`);
  const end = new Date(`2000-01-01 ${endTime}`);
  const diffMinutes = (end - start) / (1000 * 60);
  const hours = Math.floor(diffMinutes / 60);
  const minutes = diffMinutes % 60;
  return `${hours}h ${minutes}m`;
}

function exportHistory() {
  if (appState.events.length === 0) {
    showToast('No events to export', 'warning');
    return;
  }

  const csvContent = generateCSV();
  downloadCSV(csvContent, 'od-history.csv');
  showToast('History exported successfully', 'success');
}

function generateCSV() {
  const headers = ['Date', 'Event Name', 'Place', 'Start Time', 'End Time', 'Duration', 'OD Hours Used', 'Affected Classes'];
  const rows = appState.events.map(event => [
    new Date(event.date).toLocaleDateString(),
    event.name,
    event.place,
    event.startTime,
    event.endTime,
    calculateDuration(event.startTime, event.endTime),
    `${event.odUsed} mins`,
    event.conflicts.map(c => c.subject).join('; ') || 'None'
  ]);

  return [headers, ...rows].map(row => row.map(field => `"${field}"`).join(',')).join('\n');
}

function downloadCSV(content, filename) {
  const blob = new Blob([content], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
}

function updateDashboard() {
  updateODProgress();
  updateStats();
  updateRecentEvents();
}

function updateODProgress() {
  const odHours = document.getElementById('odHours');
  const odProgress = document.getElementById('odProgress');
  
  if (!odHours || !odProgress) return;
  
  const remainingMinutes = appState.odBalance;
  const remainingHours = Math.floor(remainingMinutes / 60);
  const remainingMins = remainingMinutes % 60;
  
  if (remainingHours === 0 && remainingMins === 0) {
    odHours.textContent = '0';
  } else if (remainingMins === 0) {
    odHours.textContent = remainingHours.toString();
  } else {
    odHours.textContent = remainingHours + '.' + Math.round((remainingMins / 60) * 10);
  }
  
  const totalInitialMinutes = APP_DATA.initial_od_balance;
  const percentage = (remainingMinutes / totalInitialMinutes) * 360;
  odProgress.style.background = `conic-gradient(var(--color-primary) ${percentage}deg, var(--color-secondary) ${percentage}deg)`;
}

function updateStats() {
  const totalEvents = appState.events.length;
  const totalODUsed = appState.events.reduce((sum, event) => sum + event.odUsed, 0);
  const totalClasses = Object.keys(appState.timetable).length;

  const totalEventsEl = document.getElementById('totalEvents');
  const totalODUsedEl = document.getElementById('totalODUsed');
  const totalClassesEl = document.getElementById('totalClasses');

  if (totalEventsEl) totalEventsEl.textContent = totalEvents;
  if (totalODUsedEl) totalODUsedEl.textContent = Math.floor(totalODUsed / 60) + 'h';
  if (totalClassesEl) totalClassesEl.textContent = totalClasses;
}

function updateRecentEvents() {
  const recentEventsList = document.getElementById('recentEventsList');
  if (!recentEventsList) return;
  
  const recentEvents = appState.events.slice(-5).reverse();

  if (recentEvents.length === 0) {
    recentEventsList.innerHTML = '<p class="no-events">No events added yet</p>';
    return;
  }

  recentEventsList.innerHTML = recentEvents.map(event => `
    <div class="event-item">
      <div class="event-details">
        <h4>${event.name}</h4>
        <p>${event.place} • ${new Date(event.date).toLocaleDateString()}</p>
      </div>
      <div class="event-od">${event.odUsed} mins</div>
    </div>
  `).join('');
}

function showToast(message, type = 'info') {
  const toastContainer = document.getElementById('toastContainer');
  if (!toastContainer) return;
  
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}

function formatTime(time) {
  return new Date(`2000-01-01 ${time}`).toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit', 
    hour12: true 
  });
}