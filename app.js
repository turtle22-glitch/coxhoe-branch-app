// --- STATE MANAGEMENT ---
const APP_STATE = {
  currentUser: null,
  activeTab: 'hud',

  // Fleet Definition
  // Bus 1: Routes through Cassop, Quarrington Hill, Kelloe, then Coxhoe
  // Bus 2: Coxhoe Dedicated + Bowburn
  buses: [
    {
      id: 1,
      name: 'Bus 1 (Outer Villages + Coxhoe)',
      capacity: 49,
      spareBuffer: 3,
      outerPickups: ['Cassop Community (13:10)', 'Quarrington Hill (13:18)', 'Kelloe Club (13:25)'],
      localPickups: ['Coxhoe Red Lion (13:35)']
    },
    {
      id: 2,
      name: 'Bus 2 (Coxhoe Dedicated)',
      capacity: 49,
      spareBuffer: 3,
      outerPickups: [],
      localPickups: ['Coxhoe Avenue (13:30)', 'Coxhoe Red Lion (13:35)', 'Bowburn Cooperage (13:45)']
    }
  ],

  // Pick-up Reference
  pickups: [
    { name: 'Cassop Community (13:10)', isOuter: true, busRestriction: 1 },
    { name: 'Quarrington Hill (13:18)', isOuter: true, busRestriction: 1 },
    { name: 'Kelloe Club (13:25)', isOuter: true, busRestriction: 1 },
    { name: 'Coxhoe Avenue (13:30)', isOuter: false, busRestriction: null },
    { name: 'Coxhoe Red Lion (13:35)', isOuter: false, busRestriction: null },
    { name: 'Bowburn Cooperage (13:45)', isOuter: false, busRestriction: null }
  ],

  // Season Fixtures
  fixtures: [
    {
      id: 101,
      opponent: 'Southampton',
      venue: 'HOME',
      date: 'Sat 7 Nov 2026',
      time: '15:00',
      bookingStatus: 'priority', // 'priority' (pre-24h), 'general' (post-24h), or 'closed'
      allocationRun: false
    },
    {
      id: 102,
      opponent: 'Leeds United',
      venue: 'AWAY',
      date: 'Tue 24 Nov 2026',
      time: '19:45',
      bookingStatus: 'closed',
      allocationRun: false
    },
    {
      id: 103,
      opponent: 'Middlesbrough',
      venue: 'HOME',
      date: 'Sat 28 Nov 2026',
      time: '12:30',
      bookingStatus: 'closed',
      allocationRun: false
    },
    {
      id: 104,
      opponent: 'West Bromwich Albion',
      venue: 'HOME',
      date: 'Sat 5 Dec 2026',
      time: '15:00',
      bookingStatus: 'closed',
      allocationRun: false
    }
  ],

  // Active Seat Requests & Confirmed Allocations
  // status: 'requested' (during priority window) or 'allocated' (after 24h run or during general sale)
  bookings: [
    {
      matchId: 101,
      userId: 'user_kelloe',
      pickup: 'Kelloe Club (13:25)',
      isOuter: true,
      status: 'requested',
      busId: null,
      seatNumber: null
    },
    {
      matchId: 101,
      userId: 'user_dummy1',
      pickup: 'Cassop Community (13:10)',
      isOuter: true,
      status: 'requested',
      busId: null,
      seatNumber: null
    },
    {
      matchId: 101,
      userId: 'user_dummy2',
      pickup: 'Coxhoe Red Lion (13:35)',
      isOuter: false,
      status: 'requested',
      busId: null,
      seatNumber: null
    }
  ],

  notifications: [
    { id: 1, text: '🚌 Priority coach booking open for Southampton (H). Closes 24h before KO!', active: true }
  ]
};

// Test Identities
const IDENTITIES = {
  gary: { id: 'user_gary', name: 'Gary Miller', role: 'member', duesPaid: true, idCode: 'COX-8204', defaultPickup: 'Coxhoe Red Lion (13:35)' },
  kelloe_member: { id: 'user_kelloe', name: 'Dave Henderson', role: 'member', duesPaid: true, idCode: 'COX-5120', defaultPickup: 'Kelloe Club (13:25)' },
  graham: { id: 'user_graham', name: 'Graham Wright', role: 'admin', duesPaid: true, idCode: 'COX-0001', defaultPickup: 'Coxhoe Red Lion (13:35)' },
  billy: { id: 'user_billy', name: 'Billy Lapsed', role: 'member', duesPaid: false, idCode: 'COX-9102', defaultPickup: 'Coxhoe Avenue (13:30)' }
};

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
  initListeners();
  checkSession();
  renderApp();
});

function initListeners() {
  document.getElementById('login-btn').addEventListener('click', () => {
    loginUser(IDENTITIES.gary);
  });

  document.getElementById('open-admin-btn').addEventListener('click', () => {
    openAdminDrawer();
  });
}

function checkSession() {
  const saved = localStorage.getItem('coxhoe_session');
  if (saved && IDENTITIES[saved]) {
    APP_STATE.currentUser = IDENTITIES[saved];
  }
}

function quickLogin(key) {
  if (IDENTITIES[key]) loginUser(IDENTITIES[key]);
}

function loginUser(user) {
  APP_STATE.currentUser = user;
  localStorage.setItem('coxhoe_session', Object.keys(IDENTITIES).find(k => IDENTITIES[k].id === user.id));
  renderApp();
}

function logoutUser() {
  APP_STATE.currentUser = null;
  localStorage.removeItem('coxhoe_session');
  renderApp();
}

// --- RENDER APP ---
function renderApp() {
  const user = APP_STATE.currentUser;
  const authStatus = document.getElementById('auth-status');
  const adminBar = document.getElementById('admin-bar');
  const viewAuth = document.getElementById('view-auth');

  if (!user) {
    viewAuth.classList.remove('hidden');
    document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));
    adminBar.classList.add('hidden');
    authStatus.innerHTML = '';
    return;
  }

  viewAuth.classList.add('hidden');
  authStatus.innerHTML = `
    <span class="text-xs" style="margin-right:8px">${user.name.split(' ')[0]}</span>
    <button class="btn-test text-xs" onclick="logoutUser()">Log Out</button>
  `;

  if (user.role === 'admin') {
    adminBar.classList.remove('hidden');
  } else {
    adminBar.classList.add('hidden');
  }

  renderNotifications();
  renderHUD();
  renderTravelView();
  renderCalendar();
  renderDigitalPass();
  switchTab(APP_STATE.activeTab);
}

// --- NOTIFICATIONS ---
function renderNotifications() {
  const banner = document.getElementById('notification-banner');
  const activeAlert = APP_STATE.notifications.find(n => n.active);
  if (activeAlert) {
    banner.classList.remove('hidden');
    banner.innerHTML = `<span>📢</span> <span>${activeAlert.text}</span>`;
  } else {
    banner.classList.add('hidden');
  }
}

// --- HOME HUD ---
function renderHUD() {
  const nextGame = APP_STATE.fixtures.find(f => f.venue === 'HOME');
  if (nextGame) {
    document.getElementById('next-fixture-opponent').textContent = nextGame.opponent;
    document.getElementById('next-fixture-date').textContent = `📅 ${nextGame.date}`;
    document.getElementById('next-fixture-time').textContent = `⏱️ ${nextGame.time} KO`;
  }

  const hudStatus = document.getElementById('hud-booking-status');
  const userBooking = APP_STATE.bookings.find(b => b.userId === APP_STATE.currentUser.id && b.matchId === nextGame.id);

  if (!userBooking) {
    const isPriority = nextGame.bookingStatus === 'priority';
    hudStatus.innerHTML = `
      <div class="flex-between">
        <div>
          <strong>Bus Travel: ${isPriority ? 'Priority Open' : 'General Sale'}</strong>
          <div class="text-xs text-muted">${isPriority ? 'Closes 24h before KO for route balancing' : 'First-come, first-served'}</div>
        </div>
        <button class="btn btn-sm btn-red" onclick="switchTab('travel')">Book Seat (£10)</button>
      </div>
    `;
    return;
  }

  if (userBooking.status === 'requested') {
    hudStatus.innerHTML = `
      <div class="pending-seat-box">
        <div class="header-text">⏳ SEAT REQUEST LOGGED (${userBooking.isOuter ? 'PRIORITY VILLAGE PROTECTED' : 'STANDARD POOL'})</div>
        <div style="font-size:13px; font-weight:700; color:#fff; margin-top:2px;">Pick-up: ${userBooking.pickup}</div>
        <div class="text-xs text-muted" style="margin-top:2px;">
          ${userBooking.isOuter ? 'Guaranteed on Bus 1 (Outer Circuit). ' : ''}Final bus and seat number confirmed at 24h cutoff.
        </div>
      </div>
    `;
  } else if (userBooking.status === 'allocated') {
    const bus = APP_STATE.buses.find(b => b.id === userBooking.busId);
    hudStatus.innerHTML = `
      <div class="confirmed-seat-box">
        <div class="header-text">✓ SEAT CONFIRMED & ALLOCATED</div>
        <div style="font-size:14px; font-weight:800; color:#fff;">${bus.name} (Seat #${userBooking.seatNumber})</div>
        <div style="font-size:12px; color:var(--text-muted); margin-top:2px;">📍 Pick-up: ${userBooking.pickup}</div>
      </div>
    `;
  }
}

// --- TRAVEL VIEW (PRIORITY VS GENERAL SALE) ---
function renderTravelView() {
  const matchSelect = document.getElementById('travel-match-select');
  matchSelect.innerHTML = '';

  const activeMatches = APP_STATE.fixtures.filter(f => f.bookingStatus !== 'closed');
  activeMatches.forEach(m => {
    const opt = document.createElement('option');
    opt.value = m.id;
    opt.textContent = `${m.opponent} (${m.venue}) - ${m.date}`;
    matchSelect.appendChild(opt);
  });

  handleMatchChange();
}

function handleMatchChange() {
  const matchId = parseInt(document.getElementById('travel-match-select').value);
  const match = APP_STATE.fixtures.find(f => f.id === matchId);
  const container = document.getElementById('booking-stage-content');
  const user = APP_STATE.currentUser;

  if (!match) {
    container.innerHTML = '<p class="text-muted">No open bus bookings for this fixture.</p>';
    return;
  }

  const existingBooking = APP_STATE.bookings.find(b => b.userId === user.id && b.matchId === match.id);

  if (existingBooking) {
    container.innerHTML = `
      <div class="assignment-preview-card">
        <strong>You have an active booking for this game.</strong>
        <p class="text-xs text-muted mt-2">Status: <b>${existingBooking.status.toUpperCase()}</b></p>
        <p class="text-xs text-muted">Pick-up: ${existingBooking.pickup}</p>
        ${existingBooking.busId ? `<p class="text-xs" style="color:var(--success)">Allocated to Bus ${existingBooking.busId} (Seat #${existingBooking.seatNumber})</p>` : ''}
      </div>
    `;
    return;
  }

  if (match.bookingStatus === 'priority') {
    // PHASE 1: Priority Request Window
    document.getElementById('travel-phase-desc').textContent = 'Phase 1: Priority Pick-Up Booking Window (Closes 24h before KO)';
    container.innerHTML = `
      <div class="form-group">
        <label>Select Your Pick-Up Location</label>
        <select id="pickup-selection" onchange="updatePriorityPreview()">
          ${APP_STATE.pickups.map(p => `<option value="${p.name}">${p.name} ${p.isOuter ? '★ (Outer Village)' : ''}</option>`).join('')}
        </select>
      </div>

      <div id="priority-preview-card" class="assignment-preview-card">
        <!-- Dynamic preview based on outer vs local -->
      </div>

      <button class="btn btn-red btn-block mt-3" onclick="submitPriorityRequest()">Submit Seat Request (£10)</button>
    `;
    updatePriorityPreview();
  } else if (match.bookingStatus === 'general') {
    // PHASE 2: General Sale Window
    document.getElementById('travel-phase-desc').textContent = 'Phase 2: General Sale (Final 24 Hours - First-Come, First-Served)';
    
    // Calculate remaining seats on each bus
    const bus1Booked = APP_STATE.bookings.filter(b => b.matchId === match.id && b.busId === 1).length;
    const bus2Booked = APP_STATE.bookings.filter(b => b.matchId === match.id && b.busId === 2).length;
    const bus1Left = APP_STATE.buses[0].capacity - bus1Booked;
    const bus2Left = APP_STATE.buses[1].capacity - bus2Booked;

    container.innerHTML = `
      <p class="text-xs text-muted mb-2">Automated allocation has finished. You may choose any coach with available seats.</p>
      
      <div class="form-group">
        <label>Select Available Bus</label>
        <select id="general-bus-selection" onchange="updateGeneralPickupOptions()">
          <option value="1">Bus 1 (${bus1Left} seats remaining)</option>
          <option value="2">Bus 2 (${bus2Left} seats remaining)</option>
        </select>
      </div>

      <div class="form-group">
        <label>Select Pick-Up Along That Route</label>
        <select id="general-pickup-selection"></select>
      </div>

      <button class="btn btn-red btn-block mt-3" onclick="submitGeneralSaleBooking()">Confirm Seat (£10)</button>
    `;
    updateGeneralPickupOptions();
  }
}

function updatePriorityPreview() {
  const pickupName = document.getElementById('pickup-selection').value;
  const pickup = APP_STATE.pickups.find(p => p.name === pickupName);
  const previewBox = document.getElementById('priority-preview-card');

  if (pickup.isOuter) {
    previewBox.innerHTML = `
      <div style="color:var(--safc-gold); font-weight:800; font-size:12px;">★ OUTER VILLAGE ROUTE PROTECTED</div>
      <div style="font-size:13px; font-weight:700; color:#fff; margin-top:2px;">Route Priority: Bus 1 Guaranteed</div>
      <div class="text-xs text-muted mt-2">
        Because you board at ${pickup.name}, the system reserves your seat against Bus 1's dedicated outer circuit to ensure you are never stranded.
      </div>
      <span class="badge-village">Bus 1 Protected</span>
    `;
  } else {
    previewBox.innerHTML = `
      <div style="color:#fff; font-weight:700; font-size:12px;">STANDARD LOCAL PICK-UP</div>
      <div style="font-size:13px; color:var(--text-muted); margin-top:2px;">Route Assignment: Bus 1 or Bus 2</div>
      <div class="text-xs text-muted mt-2">
        Coxhoe and Bowburn pick-ups are serviced by both coaches. The engine balances seats across the fleet at the 24-hour cutoff while leaving spare cushions.
      </div>
    `;
  }
}

function updateGeneralPickupOptions() {
  const busId = parseInt(document.getElementById('general-bus-selection').value);
  const bus = APP_STATE.buses.find(b => b.id === busId);
  const pickupSelect = document.getElementById('general-pickup-selection');
  pickupSelect.innerHTML = '';

  const allStops = [...bus.outerPickups, ...bus.localPickups];
  allStops.forEach(stop => {
    const opt = document.createElement('option');
    opt.value = stop;
    opt.textContent = stop;
    pickupSelect.appendChild(opt);
  });
}

function submitPriorityRequest() {
  const user = APP_STATE.currentUser;
  if (!user.duesPaid) {
    alert('Access Denied: Annual subs unpaid. Please settle dues before booking travel.');
    return;
  }

  const matchId = parseInt(document.getElementById('travel-match-select').value);
  const pickupName = document.getElementById('pickup-selection').value;
  const pickup = APP_STATE.pickups.find(p => p.name === pickupName);

  APP_STATE.bookings.push({
    matchId,
    userId: user.id,
    pickup: pickupName,
    isOuter: pickup.isOuter,
    status: 'requested',
    busId: null,
    seatNumber: null
  });

  alert(`Seat Request Logged! ${pickup.isOuter ? 'Priority outer seat protected on Bus 1.' : 'Standard seat pooled.'}`);
  renderHUD();
  renderDigitalPass();
  switchTab('hud');
}

function submitGeneralSaleBooking() {
  const user = APP_STATE.currentUser;
  if (!user.duesPaid) {
    alert('Access Denied: Annual subs unpaid.');
    return;
  }

  const matchId = parseInt(document.getElementById('travel-match-select').value);
  const busId = parseInt(document.getElementById('general-bus-selection').value);
  const pickupName = document.getElementById('general-pickup-selection').value;
  const bus = APP_STATE.buses.find(b => b.id === busId);

  const busBookings = APP_STATE.bookings.filter(b => b.matchId === matchId && b.busId === busId);
  if (busBookings.length >= bus.capacity) {
    alert(`Sorry, Bus ${busId} is at 100% full capacity.`);
    return;
  }

  const seatNumber = busBookings.length + 1;
  APP_STATE.bookings.push({
    matchId,
    userId: user.id,
    pickup: pickupName,
    isOuter: false,
    status: 'allocated',
    busId,
    seatNumber
  });

  alert(`Seat Confirmed! You are on ${bus.name}, Seat #${seatNumber}`);
  renderHUD();
  renderDigitalPass();
  switchTab('hud');
}

// --- AUTOMATED 24-HOUR ALLOCATION ENGINE ---
function adminRunAllocation() {
  const nextGame = APP_STATE.fixtures.find(f => f.venue === 'HOME');
  if (!nextGame) return;

  const matchId = nextGame.id;
  const requests = APP_STATE.bookings.filter(b => b.matchId === matchId && b.status === 'requested');

  const bus1 = APP_STATE.buses.find(b => b.id === 1);
  const bus2 = APP_STATE.buses.find(b => b.id === 2);

  // Usable seats during allocation (capacity minus deliberate spare cushions)
  const bus1UsableSeats = bus1.capacity - bus1.spareBuffer; // e.g. 49 - 3 = 46
  const bus2UsableSeats = bus2.capacity - bus2.spareBuffer;

  let bus1AssignedCount = 0;
  let bus2AssignedCount = 0;

  // Step 1: Assign all Outer Village members to Bus 1 first
  const outerRequests = requests.filter(r => r.isOuter);
  outerRequests.forEach(req => {
    bus1AssignedCount++;
    req.status = 'allocated';
    req.busId = 1;
    req.seatNumber = bus1AssignedCount;
  });

  // Step 2: Assign Coxhoe / Bowburn members to Bus 2 first, spilling over to Bus 1
  const localRequests = requests.filter(r => !r.isOuter);
  localRequests.forEach(req => {
    if (bus2AssignedCount < bus2UsableSeats) {
      bus2AssignedCount++;
      req.status = 'allocated';
      req.busId = 2;
      req.seatNumber = bus2AssignedCount;
    } else if (bus1AssignedCount < bus1UsableSeats) {
      bus1AssignedCount++;
      req.status = 'allocated';
      req.busId = 1;
      req.seatNumber = bus1AssignedCount;
    } else {
      // Over-capacity waitlist safeguard
      req.status = 'waitlisted';
    }
  });

  // Step 3: Transition match to General Sale
  nextGame.bookingStatus = 'general';
  nextGame.allocationRun = true;

  APP_STATE.notifications = [
    { id: Date.now(), text: `📢 24h Allocation Complete for ${nextGame.opponent}! Check your HUD for your confirmed bus.`, active: true }
  ];

  alert(`Allocation Complete!\n• ${outerRequests.length} Outer Village members locked to Bus 1.\n• Bus 1: ${bus1AssignedCount} seats filled (${bus1.spareBuffer} spares held).\n• Bus 2: ${bus2AssignedCount} seats filled (${bus2.spareBuffer} spares held).\n• General Sale is now OPEN!`);

  renderApp();
  renderAdminFleet();
  renderAdminManifest();
}

// --- SEASON CALENDAR ---
function renderCalendar() {
  const container = document.getElementById('calendar-list');
  container.innerHTML = '';

  APP_STATE.fixtures.forEach(fixture => {
    const card = document.createElement('div');
    card.className = 'calendar-card';

    let badge = `<span class="status-badge status-closed">NOT OPEN</span>`;
    if (fixture.bookingStatus === 'priority') {
      badge = `<span class="status-badge status-priority">PRIORITY OPEN</span>`;
    } else if (fixture.bookingStatus === 'general') {
      badge = `<span class="status-badge status-general">GENERAL SALE</span>`;
    }

    card.innerHTML = `
      <div>
        <div style="font-weight:800; font-size:14px;">${fixture.opponent} (${fixture.venue})</div>
        <div style="font-size:11px; color:var(--text-muted); margin-top:2px;">📅 ${fixture.date} • ⏱️ ${fixture.time} KO</div>
      </div>
      <div>${badge}</div>
    `;
    container.appendChild(card);
  });
}

// --- DIGITAL PASS ---
function renderDigitalPass() {
  const user = APP_STATE.currentUser;
  if (!user) return;

  document.getElementById('pass-name').textContent = user.name;
  document.getElementById('pass-number').textContent = `ID: ${user.idCode}`;

  const nextHome = APP_STATE.fixtures.find(f => f.venue === 'HOME');
  const userBooking = APP_STATE.bookings.find(b => b.userId === user.id && b.matchId === nextHome.id);
  const busBox = document.getElementById('pass-bus-allocation');

  if (userBooking && userBooking.status === 'allocated') {
    const bus = APP_STATE.buses.find(b => b.id === userBooking.busId);
    busBox.innerHTML = `
      <div style="color:var(--success); font-weight:800">BOARDING PASS CONFIRMED</div>
      <div>${bus.name} • Seat #${userBooking.seatNumber}</div>
      <div class="text-xs text-muted">Pick-up: ${userBooking.pickup}</div>
    `;
  } else if (userBooking && userBooking.status === 'requested') {
    busBox.innerHTML = `
      <div style="color:var(--warning); font-weight:800">REQUEST LOGGED (PENDING 24H RUN)</div>
      <div class="text-xs text-muted">Pick-up: ${userBooking.pickup}</div>
    `;
  } else {
    busBox.innerHTML = `<span class="text-muted">No active coach booking</span>`;
  }
}

// --- ADMIN DRAWER & CONFIG ---
function openAdminDrawer() {
  renderAdminFleet();
  renderAdminFixtures();
  renderAdminManifest();
  document.getElementById('admin-drawer').classList.remove('hidden');
}

function closeAdminDrawer() {
  document.getElementById('admin-drawer').classList.add('hidden');
}

function renderAdminFleet() {
  const container = document.getElementById('admin-bus-list');
  container.innerHTML = '';

  APP_STATE.buses.forEach(bus => {
    const div = document.createElement('div');
    div.className = 'admin-bus-item';
    div.innerHTML = `
      <div>
        <strong>${bus.name}</strong>
        <div class="text-xs text-muted">${bus.outerPickups.length ? 'Outer: ' + bus.outerPickups.join(', ') : 'Local Coxhoe Only'}</div>
      </div>
      <div style="display:flex; gap:8px; align-items:center;">
        <div>
          <label class="text-xs" style="margin:0">Seats:</label>
          <input type="number" value="${bus.capacity}" style="width:55px; padding:3px;" onchange="updateBusCapacity(${bus.id}, this.value)" />
        </div>
        <div>
          <label class="text-xs" style="margin:0">Spares:</label>
          <input type="number" value="${bus.spareBuffer}" style="width:45px; padding:3px;" onchange="updateBusSpares(${bus.id}, this.value)" />
        </div>
      </div>
    `;
    container.appendChild(div);
  });
}

function updateBusCapacity(busId, val) {
  const bus = APP_STATE.buses.find(b => b.id === busId);
  if (bus) bus.capacity = parseInt(val) || 49;
}

function updateBusSpares(busId, val) {
  const bus = APP_STATE.buses.find(b => b.id === busId);
  if (bus) bus.spareBuffer = parseInt(val) || 3;
}

function renderAdminFixtures() {
  const container = document.getElementById('admin-fixtures-list');
  container.innerHTML = '';

  APP_STATE.fixtures.forEach(f => {
    const div = document.createElement('div');
    div.className = 'admin-fixture-item';
    div.innerHTML = `
      <div>
        <strong>${f.opponent} (${f.venue})</strong>
        <div class="text-xs text-muted">${f.date} • Status: ${f.bookingStatus.toUpperCase()}</div>
      </div>
      <button class="btn btn-sm ${f.bookingStatus !== 'closed' ? 'btn-red' : 'btn-outline'}" onclick="toggleFixtureBookingStatus(${f.id})">
        ${f.bookingStatus !== 'closed' ? 'Close' : 'Open Priority'}
      </button>
    `;
    container.appendChild(div);
  });
}

function toggleFixtureBookingStatus(fixtureId) {
  const fixture = APP_STATE.fixtures.find(f => f.id === fixtureId);
  if (!fixture) return;

  if (fixture.bookingStatus === 'closed') {
    fixture.bookingStatus = 'priority';
    APP_STATE.notifications = [
      { id: Date.now(), text: `🚌 Bus booking is now OPEN for ${fixture.opponent} (${fixture.venue})!`, active: true }
    ];
  } else {
    fixture.bookingStatus = 'closed';
  }

  renderApp();
  renderAdminFixtures();
}

function renderAdminManifest() {
  const container = document.getElementById('admin-manifest-summary');
  const nextHome = APP_STATE.fixtures.find(f => f.venue === 'HOME');
  const bookings = APP_STATE.bookings.filter(b => b.matchId === nextHome.id);

  const bus1Allocated = bookings.filter(b => b.busId === 1);
  const bus2Allocated = bookings.filter(b => b.busId === 2);
  const pendingRequests = bookings.filter(b => b.status === 'requested');

  container.innerHTML = `
    <div class="text-xs text-muted mb-2">Total In Pool: ${bookings.length} (${pendingRequests.length} pending allocation)</div>
    <div style="font-size:12px; margin-top:4px;">
      <strong>Bus 1:</strong> ${bus1Allocated.length} / ${APP_STATE.buses[0].capacity} allocated (${APP_STATE.buses[0].spareBuffer} spares reserved)
    </div>
    <div style="font-size:12px; margin-top:2px;">
      <strong>Bus 2:</strong> ${bus2Allocated.length} / ${APP_STATE.buses[1].capacity} allocated (${APP_STATE.buses[1].spareBuffer} spares reserved)
    </div>
  `;
}

// --- TAB SWITCHING ---
function switchTab(tabId) {
  APP_STATE.activeTab = tabId;
  document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));

  const activeView = document.getElementById(`view-${tabId}`);
  if (activeView) activeView.classList.remove('hidden');

  const tabs = { hud: 0, travel: 1, calendar: 2, pass: 3 };
  const navTabs = document.querySelectorAll('.bottom-nav .nav-tab');
  if (navTabs[tabs[tabId]]) {
    navTabs[tabs[tabId]].classList.add('active');
  }
}