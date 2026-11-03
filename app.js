// --- MASTER APP STATE ---
const APP_STATE = {
  currentUser: null,
  activeTab: 'hud',

  // Fleet Setup: Bus 1 runs outer circuit; Bus 2 runs Coxhoe dedicated
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

  // Pick-up Locations
  pickups: [
    { name: 'Cassop Community (13:10)', isOuter: true },
    { name: 'Quarrington Hill (13:18)', isOuter: true },
    { name: 'Kelloe Club (13:25)', isOuter: true },
    { name: 'Coxhoe Avenue (13:30)', isOuter: false },
    { name: 'Coxhoe Red Lion (13:35)', isOuter: false },
    { name: 'Bowburn Cooperage (13:45)', isOuter: false }
  ],

  // Full Membership Roster with Safeguarding & Guardian Links
  members: [
    { id: 'user_gary', name: 'Gary Miller', role: 'member', isJunior: false, duesPaid: true, idCode: 'COX-8204', phone: '07700 900123', defaultPickup: 'Coxhoe Red Lion (13:35)', strikes: 0 },
    { id: 'user_dave', name: 'Dave Henderson', role: 'member', isJunior: false, duesPaid: true, idCode: 'COX-5120', phone: '07700 900456', defaultPickup: 'Kelloe Club (13:25)', strikes: 0 },
    { id: 'user_graham', name: 'Graham Wright', role: 'admin', isJunior: false, duesPaid: true, idCode: 'COX-0001', phone: '07700 900001', defaultPickup: 'Coxhoe Red Lion (13:35)', strikes: 0 },
    { id: 'user_billy', name: 'Billy Lapsed', role: 'member', isJunior: false, duesPaid: false, idCode: 'COX-9102', phone: '07700 900789', defaultPickup: 'Coxhoe Avenue (13:30)', strikes: 1 },
    { id: 'user_phoebe', name: 'Phoebe Turton', role: 'junior', isJunior: true, duesPaid: true, idCode: 'COX-1601', guardianId: 'user_gary', emergencyContact: '07700 900999', defaultPickup: 'Coxhoe Red Lion (13:35)', strikes: 0 }
  ],

  // Season Fixtures
  fixtures: [
    { id: 101, opponent: 'Southampton', venue: 'HOME', date: 'Sat 7 Nov 2026', time: '15:00', bookingStatus: 'priority' },
    { id: 102, opponent: 'Leeds United', venue: 'AWAY', date: 'Tue 24 Nov 2026', time: '19:45', bookingStatus: 'closed' },
    { id: 103, opponent: 'Middlesbrough', venue: 'HOME', date: 'Sat 28 Nov 2026', time: '12:30', bookingStatus: 'closed' },
    { id: 104, opponent: 'West Bromwich Albion', venue: 'HOME', date: 'Sat 5 Dec 2026', time: '15:00', bookingStatus: 'closed' }
  ],

  // Away Ticket Ballots
  ballots: [
    {
      id: 201,
      fixture: 'Leeds United (Away)',
      venue: 'Elland Road',
      date: 'Tue 24 Nov 2026',
      totalTickets: 12,
      status: 'OPEN', // OPEN or DRAWN
      entrants: ['user_gary', 'user_dave'],
      winners: []
    }
  ],

  // Passenger Manifest & Check-Ins
  bookings: [
    { matchId: 101, userId: 'user_dave', pickup: 'Kelloe Club (13:25)', isOuter: true, status: 'requested', busId: null, seatNumber: null, boarded: false, paidAmount: 10 },
    { matchId: 101, userId: 'user_phoebe', pickup: 'Coxhoe Red Lion (13:35)', isOuter: false, status: 'requested', busId: null, seatNumber: null, boarded: false, paidAmount: 10 }
  ],

  // Official Branch Announcements Feed
  news: [
    {
      id: 1,
      title: 'Southampton (H) Coach Bookings Open',
      body: 'Priority booking for outer villages (Cassop, Quarrington Hill, Kelloe) is active until 24 hours before kick-off. Remaining seats will open to general sale.',
      author: 'Graham Wright (Secretary)',
      date: 'Today, 14:20',
      badge: 'TRAVEL'
    },
    {
      id: 2,
      title: 'Branch Subs 2026/27 Due (£10)',
      body: 'Annual membership dues must be paid to enable coach travel reservations and away ballot participation.',
      author: 'Committee',
      date: '1 Nov 2026',
      badge: 'MEMBERSHIP'
    }
  ],

  // Bus Chat Messages
  chatMessages: [
    { sender: 'Graham Wright (Admin)', text: 'Reminder: Bus 1 departs Kelloe at 13:25 sharp. Have your digital passes ready.', time: '11:15', isSelf: false },
    { sender: 'Dave Henderson', text: 'Spot on, see you at the Club.', time: '11:32', isSelf: false }
  ],

  // Disciplinary Board Log
  disciplinaryLog: [
    { id: 1, userId: 'user_billy', memberName: 'Billy Lapsed', reason: 'Safeguarding: Abusive language flagged in bus chat', date: '28 Oct 2026', status: 'Warning Issued' }
  ],

  // Broadcast Alert Banners
  notifications: [
    { id: 1, text: '🚌 Priority bus booking open for Southampton (H). Closes 24h before KO!', active: true }
  ]
};

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
  initListeners();
  checkSession();
  renderApp();
});

function initListeners() {
  document.getElementById('login-btn').addEventListener('click', () => {
    loginUser(APP_STATE.members.find(m => m.id === 'user_gary'));
  });

  document.getElementById('open-admin-btn').addEventListener('click', () => {
    openAdminDrawer();
  });
}

function checkSession() {
  const savedId = localStorage.getItem('coxhoe_session_id');
  if (savedId) {
    const found = APP_STATE.members.find(m => m.id === savedId);
    if (found) APP_STATE.currentUser = found;
  }
}

function quickLogin(key) {
  const map = {
    gary: 'user_gary',
    dave: 'user_dave',
    graham: 'user_graham',
    billy: 'user_billy',
    phoebe: 'user_phoebe'
  };
  const member = APP_STATE.members.find(m => m.id === map[key]);
  if (member) loginUser(member);
}

function loginUser(user) {
  APP_STATE.currentUser = user;
  localStorage.setItem('coxhoe_session_id', user.id);
  renderApp();
}

function logoutUser() {
  APP_STATE.currentUser = null;
  localStorage.removeItem('coxhoe_session_id');
  renderApp();
}

// --- RENDER ROUTING ---
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
    <span class="text-xs" style="margin-right:8px">${user.name.split(' ')[0]} (${user.role.toUpperCase()})</span>
    <button class="btn-test text-xs" onclick="logoutUser()">Log Out</button>
  `;

  if (user.role === 'admin') {
    adminBar.classList.remove('hidden');
  } else {
    adminBar.classList.add('hidden');
  }

  renderNotifications();
  renderHUD();
  renderNewsFeed();
  renderTravelView();
  renderChatMessages();
  renderCalendar();
  renderDigitalPass();
  renderMemberBallots();
  switchTab(APP_STATE.activeTab);
}

// --- NOTIFICATIONS & NEWS ---
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

function renderNewsFeed() {
  const container = document.getElementById('hud-news-feed');
  if (!container) return;
  container.innerHTML = '';

  APP_STATE.news.forEach(item => {
    const card = document.createElement('div');
    card.className = 'news-card';
    card.innerHTML = `
      <div class="news-card-header">
        <span class="badge badge-gold">${item.badge}</span>
        <span>${item.date} • ${item.author}</span>
      </div>
      <div class="news-card-title">${item.title}</div>
      <div class="news-card-body">${item.body}</div>
    `;
    container.appendChild(card);
  });
}

function adminPostAnnouncement() {
  const title = document.getElementById('admin-news-title').value.trim();
  const body = document.getElementById('admin-news-body').value.trim();
  if (!title || !body) {
    alert('Please enter a headline and body for the notice.');
    return;
  }

  APP_STATE.news.unshift({
    id: Date.now(),
    title,
    body,
    author: `${APP_STATE.currentUser.name} (Admin)`,
    date: 'Just now',
    badge: 'NOTICE'
  });

  APP_STATE.notifications = [
    { id: Date.now(), text: `📢 ${title}`, active: true }
  ];

  document.getElementById('admin-news-title').value = '';
  document.getElementById('admin-news-body').value = '';

  alert('Notice broadcasted to all member feeds!');
  renderNewsFeed();
  renderNotifications();
}

// --- HOME HUD & NEXT GAME ---
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
          ${userBooking.isOuter ? 'Guaranteed on Bus 1 (Outer Circuit). ' : ''}Seat & bus confirmed at 24h cutoff.
        </div>
        <div class="booking-actions-row">
          <span class="text-xs text-muted">Paid: £10.00</span>
          <button class="btn btn-sm btn-outline-danger" onclick="cancelMemberBooking(${nextGame.id})">Cancel & Refund</button>
        </div>
      </div>
    `;
  } else if (userBooking.status === 'allocated') {
    const bus = APP_STATE.buses.find(b => b.id === userBooking.busId);
    hudStatus.innerHTML = `
      <div class="confirmed-seat-box">
        <div class="header-text">✓ SEAT ALLOCATED & CONFIRMED</div>
        <div style="font-size:14px; font-weight:800; color:#fff;">${bus.name} (Seat #${userBooking.seatNumber})</div>
        <div style="font-size:12px; color:var(--text-muted); margin-top:2px;">📍 Pick-up: ${userBooking.pickup}</div>
        <div class="booking-actions-row">
          <span class="text-xs text-muted">Paid: £10.00</span>
          <button class="btn btn-sm btn-outline-danger" onclick="cancelMemberBooking(${nextGame.id})">Cancel & Refund</button>
        </div>
      </div>
    `;
  }
}

// --- CANCELLATION & REFUND ---
function cancelMemberBooking(matchId) {
  const user = APP_STATE.currentUser;
  const bookingIndex = APP_STATE.bookings.findIndex(b => b.userId === user.id && b.matchId === matchId);
  if (bookingIndex === -1) return;

  const match = APP_STATE.fixtures.find(f => f.id === matchId);
  if (confirm(`Cancel coach booking for ${match ? match.opponent : 'this fixture'}?\n\nA full refund of £10.00 will be credited back.`)) {
    APP_STATE.bookings.splice(bookingIndex, 1);
    alert('✓ Booking cancelled. £10.00 refund credited.');
    renderHUD();
    renderTravelView();
    renderDigitalPass();
    if (user.role === 'admin') {
      renderAdminManifest();
      renderAdminTreasury();
    }
  }
}

// --- TRAVEL VIEW ---
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
  const matchSelect = document.getElementById('travel-match-select');
  if (!matchSelect || !matchSelect.value) return;

  const matchId = parseInt(matchSelect.value);
  const match = APP_STATE.fixtures.find(f => f.id === matchId);
  const container = document.getElementById('booking-stage-content');
  const user = APP_STATE.currentUser;

  if (!match) return;

  const existingBooking = APP_STATE.bookings.find(b => b.userId === user.id && b.matchId === match.id);

  if (existingBooking) {
    container.innerHTML = `
      <div class="assignment-preview-card">
        <strong>You have a seat reserved for this match.</strong>
        <p class="text-xs text-muted mt-2">Status: <b>${existingBooking.status.toUpperCase()}</b></p>
        <p class="text-xs text-muted">Pick-up: ${existingBooking.pickup}</p>
        ${existingBooking.busId ? `<p class="text-xs" style="color:var(--success); font-weight:700; margin-top:4px;">Allocated to Bus ${existingBooking.busId} (Seat #${existingBooking.seatNumber})</p>` : ''}
        
        <div style="margin-top:14px; border-top:1px solid #334155; padding-top:10px;">
          <button class="btn btn-outline-danger btn-block btn-sm" onclick="cancelMemberBooking(${match.id})">Cancel Booking & Refund £10</button>
        </div>
      </div>
    `;
    return;
  }

  if (match.bookingStatus === 'priority') {
    document.getElementById('travel-phase-desc').textContent = 'Phase 1: Priority Pick-Up Booking Window (Closes 24h before KO)';
    container.innerHTML = `
      <div class="form-group">
        <label>Select Your Pick-Up Location</label>
        <select id="pickup-selection" onchange="updatePriorityPreview()">
          ${APP_STATE.pickups.map(p => `<option value="${p.name}">${p.name} ${p.isOuter ? '★ (Outer Village - Bus 1 Only)' : ''}</option>`).join('')}
        </select>
      </div>

      <div id="priority-preview-card" class="assignment-preview-card"></div>

      <button class="btn btn-red btn-block mt-3" onclick="submitPriorityRequest()">Submit Seat Request (£10)</button>
    `;
    updatePriorityPreview();
  } else if (match.bookingStatus === 'general') {
    document.getElementById('travel-phase-desc').textContent = 'Phase 2: General Sale (Final 24h - First-Come, First-Served)';
    
    const bus1Booked = APP_STATE.bookings.filter(b => b.matchId === match.id && b.busId === 1).length;
    const bus2Booked = APP_STATE.bookings.filter(b => b.matchId === match.id && b.busId === 2).length;
    const bus1Left = APP_STATE.buses[0].capacity - bus1Booked;
    const bus2Left = APP_STATE.buses[1].capacity - bus2Booked;

    container.innerHTML = `
      <div class="form-group">
        <label>Select Available Bus</label>
        <select id="general-bus-selection" onchange="updateGeneralPickupOptions()">
          <option value="1">Bus 1 (${bus1Left} seats remaining)</option>
          <option value="2">Bus 2 (${bus2Left} seats remaining)</option>
        </select>
      </div>

      <div class="form-group">
        <label>Select Boarding Stop</label>
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
        Because you board at ${pickup.name}, the system reserves your seat against Bus 1's dedicated outer circuit to ensure outer-village members are never stranded.
      </div>
      <span class="badge-village">Bus 1 Protected</span>
    `;
  } else {
    previewBox.innerHTML = `
      <div style="color:#fff; font-weight:700; font-size:12px;">STANDARD LOCAL PICK-UP</div>
      <div style="font-size:13px; color:var(--text-muted); margin-top:2px;">Route Assignment: Bus 1 or Bus 2</div>
      <div class="text-xs text-muted mt-2">
        Coxhoe and Bowburn stops are serviced by both coaches. The engine balances seats across the fleet at the 24-hour cutoff while holding back spare cushions.
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
    alert('Access Denied: Annual branch subs are unpaid. Please settle dues before booking travel.');
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
    seatNumber: null,
    boarded: false,
    paidAmount: 10
  });

  alert(`Seat Request Logged (£10 Paid)! ${pickup.isOuter ? 'Priority outer seat protected on Bus 1.' : 'Standard seat request pooled.'}`);
  renderHUD();
  renderDigitalPass();
  switchTab('hud');
}

function submitGeneralSaleBooking() {
  const user = APP_STATE.currentUser;
  if (!user.duesPaid) {
    alert('Access Denied: Annual branch subs unpaid.');
    return;
  }

  const matchId = parseInt(document.getElementById('travel-match-select').value);
  const busId = parseInt(document.getElementById('general-bus-selection').value);
  const pickupName = document.getElementById('general-pickup-selection').value;
  const bus = APP_STATE.buses.find(b => b.id === busId);

  const busBookings = APP_STATE.bookings.filter(b => b.matchId === matchId && b.busId === busId);
  if (busBookings.length >= bus.capacity) {
    alert(`Sorry, Bus ${busId} is fully booked.`);
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
    seatNumber,
    boarded: false,
    paidAmount: 10
  });

  alert(`Seat Confirmed (£10 Paid)! Assigned to ${bus.name}, Seat #${seatNumber}`);
  renderHUD();
  renderDigitalPass();
  switchTab('hud');
}

// --- COMMS & SAFEGUARDING BUS CHAT ---
function renderChatMessages() {
  const container = document.getElementById('chat-messages');
  if (!container) return;
  container.innerHTML = '';

  APP_STATE.chatMessages.forEach(msg => {
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${msg.isSelf ? 'own' : ''}`;
    bubble.innerHTML = `
      <div class="chat-author">${msg.sender} • ${msg.time}</div>
      <div>${msg.text}</div>
    `;
    container.appendChild(bubble);
  });
  container.scrollTop = container.scrollHeight;
}

function sendChatMessage() {
  const input = document.getElementById('chat-input');
  const text = input.value.trim();
  if (!text) return;

  const user = APP_STATE.currentUser;
  const lower = text.toLowerCase();
  const bannedKeywords = ['shut up', 'idiot', 'moron', 'crap', 'bastard', 'fuck', 'shit'];

  const violation = bannedKeywords.find(word => lower.includes(word));
  if (violation) {
    user.strikes = (user.strikes || 0) + 1;
    APP_STATE.disciplinaryLog.push({
      id: Date.now(),
      userId: user.id,
      memberName: user.name,
      reason: `Safeguarding violation (Used '${violation}' in chat)`,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
      status: `Strike ${user.strikes} Logged`
    });

    alert(`⚠️ SAFEGUARDING WARNING: Language policy violation ('${violation}'). This has been logged to the Committee Disciplinary Board.`);
    input.value = '';
    return;
  }

  APP_STATE.chatMessages.push({
    sender: user.name,
    text,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    isSelf: true
  });

  input.value = '';
  renderChatMessages();
}

// --- 24-HOUR ALLOCATION ENGINE ---
function adminRunAllocation() {
  const nextGame = APP_STATE.fixtures.find(f => f.venue === 'HOME');
  if (!nextGame) return;

  const matchId = nextGame.id;
  const requests = APP_STATE.bookings.filter(b => b.matchId === matchId && b.status === 'requested');

  const bus1 = APP_STATE.buses.find(b => b.id === 1);
  const bus2 = APP_STATE.buses.find(b => b.id === 2);

  const bus1Usable = bus1.capacity - bus1.spareBuffer;
  const bus2Usable = bus2.capacity - bus2.spareBuffer;

  let bus1Count = 0;
  let bus2Count = 0;

  // 1. Assign outer village requests to Bus 1
  const outer = requests.filter(r => r.isOuter);
  outer.forEach(req => {
    bus1Count++;
    req.status = 'allocated';
    req.busId = 1;
    req.seatNumber = bus1Count;
  });

  // 2. Assign local Coxhoe/Bowburn requests to Bus 2 first, overflowing to Bus 1
  const locals = requests.filter(r => !r.isOuter);
  locals.forEach(req => {
    if (bus2Count < bus2Usable) {
      bus2Count++;
      req.status = 'allocated';
      req.busId = 2;
      req.seatNumber = bus2Count;
    } else if (bus1Count < bus1Usable) {
      bus1Count++;
      req.status = 'allocated';
      req.busId = 1;
      req.seatNumber = bus1Count;
    } else {
      req.status = 'waitlisted';
    }
  });

  nextGame.bookingStatus = 'general';

  APP_STATE.notifications = [
    { id: Date.now(), text: `📢 24h Allocation Complete for ${nextGame.opponent}! Check your HUD for your confirmed coach.`, active: true }
  ];

  alert(`Allocation Succeeded!\n• ${outer.length} Outer Village members secured on Bus 1.\n• Bus 1: ${bus1Count} booked (${bus1.spareBuffer} spares held).\n• Bus 2: ${bus2Count} booked (${bus2.spareBuffer} spares held).\n• General Sale is now ACTIVE.`);

  renderApp();
  renderAdminFleet();
  renderAdminManifest();
  renderAdminTreasury();
}

// --- SEASON CALENDAR ---
function renderCalendar() {
  const container = document.getElementById('calendar-list');
  if (!container) return;
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

  const subsPill = document.getElementById('pass-subs-status');
  if (user.duesPaid) {
    subsPill.textContent = 'SUBS PAID (2026/27)';
    subsPill.className = 'pass-status-pill active';
  } else {
    subsPill.textContent = 'SUBS LAPSED (ACTION REQUIRED)';
    subsPill.className = 'pass-status-pill text-danger';
  }

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

// --- AWAY BALLOTS (MEMBER VIEW) ---
function renderMemberBallots() {
  const container = document.getElementById('member-ballots-list');
  if (!container) return;
  container.innerHTML = '';

  const user = APP_STATE.currentUser;

  APP_STATE.ballots.forEach(ballot => {
    const card = document.createElement('div');
    card.className = 'ballot-card';

    const hasEntered = ballot.entrants.includes(user.id);
    const hasWon = ballot.winners.includes(user.id);

    let statusBtn = '';
    if (ballot.status === 'DRAWN') {
      statusBtn = hasWon
        ? `<span class="badge badge-gold">🎉 WON TICKET</span>`
        : `<span class="text-xs text-muted">Ballot Drawn (Unsuccessful)</span>`;
    } else {
      statusBtn = hasEntered
        ? `<button class="btn btn-sm btn-outline" onclick="leaveBallot(${ballot.id})">Withdraw Entry</button>`
        : `<button class="btn btn-sm btn-gold" onclick="enterBallot(${ballot.id})">Enter Ballot</button>`;
    }

    card.innerHTML = `
      <div>
        <strong>${ballot.fixture}</strong>
        <div class="text-xs text-muted">${ballot.venue} • ${ballot.date}</div>
        <div class="text-xs text-muted" style="margin-top:2px;">Allocation: ${ballot.totalTickets} tickets • ${ballot.entrants.length} entered</div>
      </div>
      <div>${statusBtn}</div>
    `;
    container.appendChild(card);
  });
}

function enterBallot(ballotId) {
  const user = APP_STATE.currentUser;
  if (!user.duesPaid) {
    alert('Annual subs must be paid to enter away ticket ballots.');
    return;
  }
  const ballot = APP_STATE.ballots.find(b => b.id === ballotId);
  if (ballot && !ballot.entrants.includes(user.id)) {
    ballot.entrants.push(user.id);
    alert('✓ Ballot entry registered under your membership ID!');
    renderMemberBallots();
  }
}

function leaveBallot(ballotId) {
  const user = APP_STATE.currentUser;
  const ballot = APP_STATE.ballots.find(b => b.id === ballotId);
  if (ballot) {
    ballot.entrants = ballot.entrants.filter(id => id !== user.id);
    alert('Entry withdrawn from ballot.');
    renderMemberBallots();
  }
}

// --- ADMIN SECRETARY HUD (ALL 11 CONTROLS) ---
function openAdminDrawer() {
  renderAdminTreasury();
  renderAdminFleet();
  renderAdminFixtures();
  renderAdminManifest();
  renderAdminBallots();
  renderAdminSubs();
  renderAdminSafeguarding();
  renderAdminDisciplinary();
  document.getElementById('admin-drawer').classList.remove('hidden');
}

function closeAdminDrawer() {
  document.getElementById('admin-drawer').classList.add('hidden');
}

// 1. Treasury
function renderAdminTreasury() {
  const container = document.getElementById('admin-treasury-stats');
  const nextHome = APP_STATE.fixtures.find(f => f.venue === 'HOME');
  const matchBookings = APP_STATE.bookings.filter(b => b.matchId === nextHome.id);
  const busRevenue = matchBookings.length * 10;
  const paidMembers = APP_STATE.members.filter(m => m.duesPaid).length;
  const subsRevenue = paidMembers * 10;

  container.innerHTML = `
    <div class="treasury-card">
      <div class="value">£${busRevenue}</div>
      <div class="label">Next Game Fare Revenue</div>
    </div>
    <div class="treasury-card">
      <div class="value">£${subsRevenue}</div>
      <div class="label">26/27 Subs Pool</div>
    </div>
    <div class="treasury-card">
      <div class="value">${matchBookings.length}</div>
      <div class="label">Seats Reserved</div>
    </div>
    <div class="treasury-card">
      <div class="value">${paidMembers} / ${APP_STATE.members.length}</div>
      <div class="label">Active Subs Paid</div>
    </div>
  `;
}

// 4. Fleet
function renderAdminFleet() {
  const container = document.getElementById('admin-bus-list');
  container.innerHTML = '';

  APP_STATE.buses.forEach(bus => {
    const div = document.createElement('div');
    div.className = 'admin-bus-item';
    div.innerHTML = `
      <div>
        <strong>${bus.name}</strong>
        <div class="text-xs text-muted">${bus.outerPickups.length ? 'Outer: ' + bus.outerPickups.join(', ') : 'Coxhoe & Bowburn'}</div>
      </div>
      <div style="display:flex; gap:6px; align-items:center;">
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

function adminAddBus() {
  const nextId = APP_STATE.buses.length + 1;
  APP_STATE.buses.push({
    id: nextId,
    name: `Bus ${nextId} (Auxiliary Coach)`,
    capacity: 49,
    spareBuffer: 2,
    outerPickups: [],
    localPickups: ['Coxhoe Red Lion (13:35)', 'Bowburn Cooperage (13:45)']
  });
  renderAdminFleet();
  renderTravelView();
}

// 5. Fixtures
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
  const f = APP_STATE.fixtures.find(fix => fix.id === fixtureId);
  if (!f) return;

  if (f.bookingStatus === 'closed') {
    f.bookingStatus = 'priority';
    APP_STATE.notifications = [
      { id: Date.now(), text: `🚌 Bus booking is now OPEN for ${f.opponent} (${f.venue})!`, active: true }
    ];
  } else {
    f.bookingStatus = 'closed';
  }

  renderApp();
  renderAdminFixtures();
}

// 6. Manifest
function renderAdminManifest() {
  const container = document.getElementById('admin-manifest-summary');
  const nextHome = APP_STATE.fixtures.find(f => f.venue === 'HOME');
  const bookings = APP_STATE.bookings.filter(b => b.matchId === nextHome.id);

  let html = `<div class="text-xs text-muted mb-2">Total Confirmed / Requested: ${bookings.length} passengers</div>`;

  APP_STATE.buses.forEach(bus => {
    const busBookings = bookings.filter(b => b.busId === bus.id);
    html += `
      <div style="margin-top:10px;">
        <div class="flex-between">
          <strong style="font-size:13px; color:var(--safc-gold);">${bus.name}</strong>
          <span class="text-xs text-muted">${busBookings.length} / ${bus.capacity} seats (${bus.spareBuffer} spare)</span>
        </div>
        ${busBookings.length === 0 ? '<p class="text-xs text-muted" style="margin-top:4px;">No passengers allocated yet.</p>' : ''}
        ${busBookings.map(b => {
          const m = APP_STATE.members.find(mem => mem.id === b.userId);
          return `
            <div class="manifest-passenger-item ${b.boarded ? 'boarded' : ''}" onclick="toggleBoarding('${b.userId}')">
              <div>
                <strong>${m ? m.name : 'Unknown'} (Seat #${b.seatNumber})</strong>
                <div class="text-xs text-muted">${b.pickup} • Paid £${b.paidAmount || 10}</div>
              </div>
              <button class="btn btn-sm ${b.boarded ? 'btn-gold' : 'btn-outline'}">${b.boarded ? '✓ Boarded' : 'Check In'}</button>
            </div>
          `;
        }).join('')}
      </div>
    `;
  });

  const unassigned = bookings.filter(b => b.status === 'requested');
  if (unassigned.length > 0) {
    html += `
      <div style="margin-top:12px; border-top:1px dashed #334155; padding-top:8px;">
        <strong style="color:var(--warning); font-size:12px;">⏳ Pending 24h Allocation (${unassigned.length} requests):</strong>
        ${unassigned.map(b => {
          const m = APP_STATE.members.find(mem => mem.id === b.userId);
          return `<div class="text-xs text-muted mt-2">• ${m ? m.name : 'Unknown'} - ${b.pickup} (${b.isOuter ? 'Outer Protected' : 'Pooled'})</div>`;
        }).join('')}
      </div>
    `;
  }

  container.innerHTML = html;
}

function toggleBoarding(userId) {
  const nextHome = APP_STATE.fixtures.find(f => f.venue === 'HOME');
  const b = APP_STATE.bookings.find(bk => bk.userId === userId && bk.matchId === nextHome.id);
  if (b) {
    b.boarded = !b.boarded;
    renderAdminManifest();
  }
}

// 7. Driver Sheet Export
function openDriverSheetModal() {
  const nextHome = APP_STATE.fixtures.find(f => f.venue === 'HOME');
  const bookings = APP_STATE.bookings.filter(b => b.matchId === nextHome.id);

  let text = `========================================\n`;
  text += ` COXHOE BRANCH SAFC - COACH RUN SHEET\n`;
  text += ` FIXTURE: Sunderland vs ${nextHome.opponent} (${nextHome.date})\n`;
  text += `========================================\n\n`;

  APP_STATE.buses.forEach(bus => {
    text += `[${bus.name.toUpperCase()}]\n`;
    text += `Capacity: ${bus.capacity} | Reserved Spares: ${bus.spareBuffer}\n`;
    text += `Stops: ${[...bus.outerPickups, ...bus.localPickups].join(' -> ')}\n`;
    text += `----------------------------------------\n`;

    const busPassengers = bookings.filter(b => b.busId === bus.id);
    if (busPassengers.length === 0) {
      text += `No passengers allocated.\n\n`;
      return;
    }

    busPassengers.forEach((p, idx) => {
      const mem = APP_STATE.members.find(m => m.id === p.userId);
      text += `${idx + 1}. [Seat ${p.seatNumber}] ${mem ? mem.name : 'Member'} | Stop: ${p.pickup} | Phone: ${mem ? mem.phone : 'N/A'}\n`;
      if (mem && mem.isJunior) {
        const g = APP_STATE.members.find(gm => gm.id === mem.guardianId);
        text += `   ↳ JUNIOR: Guardian: ${g ? g.name : 'N/A'} (Emergency: ${mem.emergencyContact})\n`;
      }
    });
    text += `\n`;
  });

  document.getElementById('driver-manifest-text').textContent = text;
  document.getElementById('driver-modal').classList.remove('hidden');
}

function closeDriverSheetModal() {
  document.getElementById('driver-modal').classList.add('hidden');
}

function copyDriverManifest() {
  const text = document.getElementById('driver-manifest-text').textContent;
  navigator.clipboard.writeText(text).then(() => {
    alert('✓ Run sheet copied to clipboard! You can paste this into WhatsApp or print it.');
  });
}

// 8. Ballots Admin
function renderAdminBallots() {
  const container = document.getElementById('admin-ballots-list');
  container.innerHTML = '';

  APP_STATE.ballots.forEach(ballot => {
    const div = document.createElement('div');
    div.className = 'admin-fixture-item';
    div.innerHTML = `
      <div>
        <strong>${ballot.fixture}</strong>
        <div class="text-xs text-muted">${ballot.entrants.length} Entrants • ${ballot.totalTickets} Tickets • Status: ${ballot.status}</div>
        ${ballot.winners.length ? `<div class="text-xs" style="color:var(--success)">Winners: ${ballot.winners.map(wId => {
          const m = APP_STATE.members.find(mem => mem.id === wId);
          return m ? m.name : wId;
        }).join(', ')}</div>` : ''}
      </div>
      <div>
        ${ballot.status === 'OPEN' ? `
          <button class="btn btn-sm btn-gold" onclick="adminRunBallotDraw(${ballot.id})">Run Draw</button>
        ` : `
          <span class="badge badge-gold">DRAWN</span>
        `}
      </div>
    `;
    container.appendChild(div);
  });
}

function adminRunBallotDraw(ballotId) {
  const ballot = APP_STATE.ballots.find(b => b.id === ballotId);
  if (!ballot || ballot.entrants.length === 0) {
    alert('No entrants registered for this ballot.');
    return;
  }

  // Shuffle entrants randomly
  const shuffled = [...ballot.entrants].sort(() => 0.5 - Math.random());
  ballot.winners = shuffled.slice(0, ballot.totalTickets);
  ballot.status = 'DRAWN';

  APP_STATE.notifications = [
    { id: Date.now(), text: `🎉 Away ballot drawn for ${ballot.fixture}! Check your ballots tab.`, active: true }
  ];

  alert(`Ballot Draw Finished!\n\n${ballot.winners.length} winners drawn:\n` + ballot.winners.map(id => {
    const m = APP_STATE.members.find(mem => mem.id === id);
    return `• ${m ? m.name : id}`;
  }).join('\n'));

  renderAdminBallots();
  renderMemberBallots();
  renderNotifications();
}

// 9. Subs Roster
function renderAdminSubs() {
  const container = document.getElementById('admin-subs-roster');
  container.innerHTML = '';

  APP_STATE.members.forEach(member => {
    const div = document.createElement('div');
    div.className = 'admin-member-row';
    div.innerHTML = `
      <div>
        <strong>${member.name}</strong>
        <div class="text-xs text-muted">${member.idCode} • ${member.role.toUpperCase()}</div>
      </div>
      <button class="btn btn-sm ${member.duesPaid ? 'btn-gold' : 'btn-red'}" onclick="toggleMemberSubs('${member.id}')">
        ${member.duesPaid ? '✓ Paid (£10)' : '⚠️ Lapsed'}
      </button>
    `;
    container.appendChild(div);
  });
}

function toggleMemberSubs(memberId) {
  const member = APP_STATE.members.find(m => m.id === memberId);
  if (member) {
    member.duesPaid = !member.duesPaid;
    renderAdminSubs();
    renderAdminTreasury();
    renderDigitalPass();
  }
}

// 10. Junior Safeguarding Register
function renderAdminSafeguarding() {
  const container = document.getElementById('admin-safeguarding-register');
  container.innerHTML = '';

  const juniors = APP_STATE.members.filter(m => m.isJunior);
  if (juniors.length === 0) {
    container.innerHTML = '<p class="text-xs text-muted">No junior members currently registered.</p>';
    return;
  }

  juniors.forEach(j => {
    const guardian = APP_STATE.members.find(m => m.id === j.guardianId);
    const div = document.createElement('div');
    div.className = 'admin-member-row';
    div.innerHTML = `
      <div>
        <strong>${j.name} (Under-16)</strong>
        <div class="text-xs text-muted">ID: ${j.idCode} • Contact: ${j.emergencyContact}</div>
        <div class="text-xs" style="color:var(--safc-gold); margin-top:2px;">
          Linked Guardian: <b>${guardian ? guardian.name : 'UNASSIGNED'}</b>
        </div>
      </div>
      <span class="badge ${guardian ? 'badge-gold' : 'badge-danger'}">${guardian ? '✓ Verified' : 'Action Req'}</span>
    `;
    container.appendChild(div);
  });
}

// 11. Disciplinary Board
function renderAdminDisciplinary() {
  const container = document.getElementById('admin-disciplinary-board');
  container.innerHTML = '';

  if (APP_STATE.disciplinaryLog.length === 0) {
    container.innerHTML = '<p class="text-xs text-muted">No disciplinary records or safeguarding flags.</p>';
    return;
  }

  APP_STATE.disciplinaryLog.forEach(log => {
    const div = document.createElement('div');
    div.className = 'admin-disc-item';
    div.innerHTML = `
      <div>
        <strong>${log.memberName}</strong>
        <div class="text-xs text-danger">${log.reason}</div>
        <div class="text-xs text-muted">${log.date} • ${log.status}</div>
      </div>
      <button class="btn btn-sm btn-outline" onclick="clearDisciplinary(${log.id})">Clear Flag</button>
    `;
    container.appendChild(div);
  });
}

function clearDisciplinary(logId) {
  APP_STATE.disciplinaryLog = APP_STATE.disciplinaryLog.filter(l => l.id !== logId);
  renderAdminDisciplinary();
}

// --- TAB SWITCHING ---
function switchTab(tabId) {
  APP_STATE.activeTab = tabId;
  document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));

  const activeView = document.getElementById(`view-${tabId}`);
  if (activeView) activeView.classList.remove('hidden');

  const tabs = { hud: 0, travel: 1, comms: 2, calendar: 3, pass: 4 };
  const navTabs = document.querySelectorAll('.bottom-nav .nav-tab');
  if (navTabs[tabs[tabId]]) {
    navTabs[tabs[tabId]].classList.add('active');
  }
}