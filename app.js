// --- MASTER DIRECTORY & CONFIG DATA ---
var MASTER_MEMBERS = [
  { id: 1, name: "Dave Kelly", memberNo: "COX-012", category: "Adult", hasAppAccount: true, balance: 18.00, registeredDaysAgo: 120, messagingAllowed: true, membershipStatus: "active", membershipTier: "Adult", membershipSeason: "2026/27", validUntil: "2027-07-31" },
  { id: 2, name: "Sarah Taylor", memberNo: "COX-034", category: "Adult", hasAppAccount: true, balance: 22.00, registeredDaysAgo: 90, messagingAllowed: true, membershipStatus: "active", membershipTier: "Adult", membershipSeason: "2026/27", validUntil: "2027-07-31" },
  { id: 3, name: "Gary Miller", memberNo: "COX-084", category: "Adult", hasAppAccount: true, balance: 35.00, registeredDaysAgo: 45, messagingAllowed: true, membershipStatus: "active", membershipTier: "Adult", membershipSeason: "2026/27", validUntil: "2027-07-31" },
  { id: 4, name: "Graham (Secretary)", memberNo: "ADMIN-01", category: "Adult", hasAppAccount: true, balance: 50.00, registeredDaysAgo: 365, messagingAllowed: true, membershipStatus: "active", membershipTier: "Life", membershipSeason: "2026/27", validUntil: "Lifetime" },
  { id: 5, name: "Billy Thompson", memberNo: "COX-099", category: "Adult", hasAppAccount: true, balance: 25.00, registeredDaysAgo: 30, messagingAllowed: true, membershipStatus: "lapsed", membershipTier: "Adult", membershipSeason: "2025/26", validUntil: "2026-07-31" },
  { id: 6, name: "Phoebe Miller", memberNo: "COX-085", category: "Child", hasAppAccount: true, balance: 0.00, registeredDaysAgo: 4, messagingAllowed: false, membershipStatus: "active", membershipTier: "Junior", membershipSeason: "2026/27", validUntil: "2027-07-31" },
  { id: 7, name: "Tommy Robson", memberNo: "COX-104", category: "Child", hasAppAccount: true, balance: 0.00, registeredDaysAgo: 9, messagingAllowed: false, membershipStatus: "lapsed", membershipTier: "Junior", membershipSeason: "2025/26", validUntil: "2026-07-31" }
];

var DEFAULT_STOPS = [
  { id: 1, name: "Coxhoe Red Lion", time: "12:45" },
  { id: 2, name: "Blackgate / The Avenue", time: "12:50" },
  { id: 3, name: "Bowburn Cooperage", time: "13:00" },
  { id: 4, name: "Quarrington Hill", time: "13:10" }
];

var MASTER_CLUBS = [
  "Arsenal", "Aston Villa", "Bournemouth", "Brentford", "Brighton", "Chelsea",
  "Crystal Palace", "Everton", "Fulham", "Ipswich Town", "Leicester City", "Liverpool",
  "Man City", "Man United", "Newcastle Utd", "Nottingham Forest", "Southampton", "Tottenham",
  "West Ham", "Wolves", "Sunderland", "Leeds United", "Burnley", "Sheffield Utd",
  "West Brom", "Middlesbrough", "Blackburn", "Norwich City", "Watford", "Coventry City",
  "Derby County", "Millwall", "Swansea City", "Bristol City", "QPR", "Stoke City",
  "Preston", "Sheff Wed", "Hull City", "Plymouth Argyle", "Portsmouth", "Oxford United",
  "Cardiff City", "Luton Town", "Bolton", "Wigan", "Blackpool", "Barnsley",
  "Reading", "Birmingham", "Huddersfield", "Charlton", "Wrexham", "Stockport",
  "Wycombe", "Lincoln City", "Peterborough", "Mansfield", "Bradford City", "Rotherham"
];

var BASE_PROFANITIES = [
  "fuck", "fucking", "fucked", "fucker", "fucks", "shit", "shite", "shitting", "shitter",
  "bastard", "bastards", "cunt", "cunts", "twat", "twats", "wanker", "wankers",
  "piss", "pissed", "bitch", "prick", "pricks", "cock", "dick", "arse", "arsehole",
  "asshole", "bollocks", "bellend", "knob", "slag", "minger", "tosser", "nonce",
  "spastic", "retard", "radge", "radgie", "divvy", "pillock", "plonker"
];

var AGGRESSIVE_PHRASES = [
  "shut up", "shut your mouth", "shut your face", "piss off", "fuck off", "shove it",
  "ill smash", "ill sort you out", "fight me", "dirty bastard", "daft cunt"
];

function normalizeText(str) {
  if (!str) return "";
  return str.toLowerCase()
    .replace(/[@4]/g, "a").replace(/[!1|]/g, "i").replace(/[0]/g, "o").replace(/[$5]/g, "s").replace(/[3]/g, "e")
    .replace(/[*#_+~-]/g, "").replace(/\s+/g, " ").trim();
}

function detectAbuseOrProfanity(rawText) {
  if (!rawText) return { flagged: false };
  var norm = normalizeText(rawText);
  var noSp = norm.replace(/\s+/g, "");
  var words = norm.split(/\s+/);
  for (var i = 0; i < words.length; i++) {
    if (BASE_PROFANITIES.indexOf(words[i]) !== -1) return { flagged: true, reason: "Prohibited term: '" + words[i] + "'" };
  }
  for (var j = 0; j < BASE_PROFANITIES.length; j++) {
    var t = BASE_PROFANITIES[j];
    if (t.length >= 4 && (norm.indexOf(t) !== -1 || noSp.indexOf(t) !== -1)) return { flagged: true, reason: "Obfuscated term: '" + t + "'" };
  }
  for (var k = 0; k < AGGRESSIVE_PHRASES.length; k++) {
    if (norm.indexOf(AGGRESSIVE_PHRASES[k]) !== -1) return { flagged: true, reason: "Hostile phrase: '" + AGGRESSIVE_PHRASES[k] + "'" };
  }
  return { flagged: false };
}

function shuffleArray(arr) {
  var cp = arr.slice();
  for (var i = cp.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = cp[i]; cp[i] = cp[j]; cp[j] = temp;
  }
  return cp;
}

function getInitialBonusRegistry() {
  var reg = {};
  var names = ["Dave Kelly", "Sarah Taylor", "Micky Gray", "John O'Shea", "Gary Miller", "Billy Thompson"];
  for (var i = 1; i <= 59; i++) {
    if (i === 10) reg[i] = { owner: "Gary Miller", status: "locked", applicants: [] };
    else if (i === 24) reg[i] = { owner: null, status: "ballot_open", applicants: ["Dave Kelly"] };
    else reg[i] = { owner: names[i % names.length], status: "locked", applicants: [] };
  }
  return reg;
}

// --- STATE MANAGEMENT ---
var appState = {
  currentUser: { name: "Gary Miller", role: "member", memberNo: "COX-084", category: "Adult" },
  users: JSON.parse(localStorage.getItem("coxhoe_users_v15")) || MASTER_MEMBERS,
  stops: JSON.parse(localStorage.getItem("coxhoe_stops_v15")) || DEFAULT_STOPS,
  bookings: JSON.parse(localStorage.getItem("coxhoe_bookings_v15")) || [
    { id: 101, name: "Gary Miller", stop: "Coxhoe Red Lion", adults: 1, juniors: 0, total: 12.00, boarded: true },
    { id: 102, name: "Dave Kelly", stop: "Coxhoe Red Lion", adults: 2, juniors: 0, total: 24.00, boarded: false }
  ],
  friendsAndFamily: JSON.parse(localStorage.getItem("coxhoe_friends_v15")) || [
    { id: 1, owner: "Gary Miller", targetName: "Phoebe Miller", type: "Child", memberNo: "COX-085", relation: "Daughter", status: "approved" },
    { id: 2, owner: "Phoebe Miller", targetName: "Gary Miller", type: "Adult", memberNo: "COX-084", relation: "Parent", status: "approved" }
  ],
  pendingLinkRequests: JSON.parse(localStorage.getItem("coxhoe_pending_links_v15")) || [],
  duesConfig: JSON.parse(localStorage.getItem("coxhoe_dues_config_v15")) || {
    activeSeason: "2026/27",
    adultFee: 15.00,
    juniorFee: 5.00,
    seniorFee: 10.00,
    enforceDuesGate: true
  },
  announcements: JSON.parse(localStorage.getItem("coxhoe_announcements_v15")) || [
    { id: 1, title: "Coventry City (H) Coach Departure Notice", date: "2026-10-31", isUrgent: true, content: "Due to roadworks on the A1(M) near Bowburn, the bus will depart all village pickup points 15 minutes earlier than scheduled. Please check the timetable.", reactions: 14 },
    { id: 2, title: "Branch Christmas Social Night Announced", date: "2026-10-28", isUrgent: false, content: "Tickets are now on sale for the annual Christmas branch social at Coxhoe WMC on Friday 18th December. Buffet, guest speaker, and fundraising raffle included.", reactions: 29 }
  ],
  matchdayChat: JSON.parse(localStorage.getItem("coxhoe_bus_chat_v15")) || [
    { id: 1, sender: "Dave Kelly", time: "11:30", text: "What time are we meeting at the Red Lion?" },
    { id: 2, sender: "Sarah Taylor", time: "11:35", text: "Departure is 12:30 sharp because of roadworks on A1." },
    { id: 3, sender: "Micky Gray", time: "11:38", text: "Has anyone got spare tickets for Leeds away?" },
    { id: 4, sender: "Dave Kelly", time: "11:42", text: "Ballot is open in the app lads, just registered mine." },
    { id: 5, sender: "Sarah Taylor", time: "11:43", text: "Club shop was also sold out of matchday programmes." }
  ],
  moderation: JSON.parse(localStorage.getItem("coxhoe_moderation_v15")) || {
    strikes: {},
    mutedMembers: ["Billy Thompson"],
    revokedMembers: [],
    incidents: [
      {
        id: "INC-881",
        member: "Billy Thompson",
        timestamp: "2026-10-31 11:45",
        status: "active_ban",
        reason: "Hostile confrontation in Matchday Bus Chat",
        offendingText: "Shut your mouth you useless bastards",
        transcriptContext: [
          "Dave Kelly (11:30): What time are we meeting at the Red Lion?",
          "Sarah Taylor (11:35): Departure is 12:30 sharp because of roadworks on A1.",
          "Micky Gray (11:38): Has anyone got spare tickets for Leeds away?",
          "Dave Kelly (11:42): Ballot is open in the app lads, just registered mine.",
          "Sarah Taylor (11:43): Club shop was also sold out of matchday programmes.",
          "Billy Thompson (11:45): Shut your mouth you useless bastards [FLAGGED - BAN TRIGGER]"
        ],
        internalDiscussion: [
          { author: "Graham (Secretary)", time: "11:50", text: "Spoke to Billy by phone. Claimed frustration over ticket allocations. Reinstatement requires 2 committee votes." }
        ],
        votes: {}
      }
    ]
  },
  committeeOnCall: JSON.parse(localStorage.getItem("coxhoe_comm_oncall_v15")) || {
    "Graham (Secretary)": true,
    "Dave Kelly": true,
    "Sarah Taylor": true
  },
  helpdeskTickets: JSON.parse(localStorage.getItem("coxhoe_helpdesk_v15")) || [
    {
      id: "TICK-401",
      member: "Dave Kelly",
      topic: "Travel",
      status: "open",
      escalatedToGraham: true,
      created: "2026-10-31 14:00",
      messages: [{ id: "m1", sender: "Dave Kelly", time: "14:00", text: "Can I pick up at Metal Bridge instead of Red Lion next week?" }],
      internalNotes: [{ id: "n1", author: "Sarah Taylor", time: "14:05", text: "Escalated to Graham: does the coach route go past Metal Bridge on 21st?" }]
    }
  ],
  readTracker: JSON.parse(localStorage.getItem("coxhoe_read_tracker_v15")) || {
    "Gary Miller": { busChatCount: 5, readMsgIds: ["m1"], readNoteIds: [] },
    "Graham (Secretary)": { busChatCount: 5, readMsgIds: ["m1"], readNoteIds: [] },
    "Dave Kelly": { busChatCount: 5, readMsgIds: ["m1"], readNoteIds: [] },
    "Sarah Taylor": { busChatCount: 5, readMsgIds: ["m1"], readNoteIds: ["n1"] }
  },
  cardConfig: JSON.parse(localStorage.getItem("coxhoe_card_config_v15")) || {
    size: 40,
    pricePerSquare: 2.00,
    prizeMode: "percentage",
    prizePct: 50,
    prizeFixed: 50.00,
    activeClubs: MASTER_CLUBS.slice(0, 40)
  },
  cardClaims: JSON.parse(localStorage.getItem("coxhoe_card_claims_v15")) || {
    "Blackburn": "Dave Kelly",
    "Leeds United": "Sarah Taylor"
  },
  bonusRegistry: JSON.parse(localStorage.getItem("coxhoe_bonus_reg_v15")) || getInitialBonusRegistry(),
  awayBallotRequests: JSON.parse(localStorage.getItem("coxhoe_away_ballots_v15")) || [],
  masterAuditTrail: JSON.parse(localStorage.getItem("coxhoe_audit_v15")) || [
    { txnId: "TXN-1001", timestamp: "2026-10-25 10:00:00", actor: "Gary Miller", role: "Member", target: "Branch", category: "SUBS_DUES", desc: "Annual Membership Subs 2026/27 (Adult)", debit: 15.00, credit: 0, branchImpact: 15.00, balanceAfter: 35.00 }
  ]
};

function saveState() {
  localStorage.setItem("coxhoe_users_v15", JSON.stringify(appState.users));
  localStorage.setItem("coxhoe_stops_v15", JSON.stringify(appState.stops));
  localStorage.setItem("coxhoe_bookings_v15", JSON.stringify(appState.bookings));
  localStorage.setItem("coxhoe_friends_v15", JSON.stringify(appState.friendsAndFamily));
  localStorage.setItem("coxhoe_pending_links_v15", JSON.stringify(appState.pendingLinkRequests));
  localStorage.setItem("coxhoe_dues_config_v15", JSON.stringify(appState.duesConfig));
  localStorage.setItem("coxhoe_announcements_v15", JSON.stringify(appState.announcements));
  localStorage.setItem("coxhoe_bus_chat_v15", JSON.stringify(appState.matchdayChat));
  localStorage.setItem("coxhoe_moderation_v15", JSON.stringify(appState.moderation));
  localStorage.setItem("coxhoe_comm_oncall_v15", JSON.stringify(appState.committeeOnCall));
  localStorage.setItem("coxhoe_helpdesk_v15", JSON.stringify(appState.helpdeskTickets));
  localStorage.setItem("coxhoe_read_tracker_v15", JSON.stringify(appState.readTracker));
  localStorage.setItem("coxhoe_card_config_v15", JSON.stringify(appState.cardConfig));
  localStorage.setItem("coxhoe_card_claims_v15", JSON.stringify(appState.cardClaims));
  localStorage.setItem("coxhoe_bonus_reg_v15", JSON.stringify(appState.bonusRegistry));
  localStorage.setItem("coxhoe_away_ballots_v15", JSON.stringify(appState.awayBallotRequests));
  localStorage.setItem("coxhoe_audit_v15", JSON.stringify(appState.masterAuditTrail));
}

function getCurrentUserRecord() {
  var found = appState.users.find(function(u) { return u.name.toLowerCase() === appState.currentUser.name.toLowerCase(); });
  if (!found) {
    found = { id: Date.now(), name: appState.currentUser.name, memberNo: appState.currentUser.memberNo, category: "Adult", hasAppAccount: true, balance: 35.00, registeredDaysAgo: 1, messagingAllowed: true, membershipStatus: "active", membershipTier: "Adult", membershipSeason: "2026/27", validUntil: "2027-07-31" };
    appState.users.push(found);
  }
  return found;
}

window.updateBalanceDisplay = function() {
  var user = getCurrentUserRecord();
  var elem = document.getElementById("display-balance");
  if (elem && user) {
    elem.textContent = "£" + user.balance.toFixed(2);
  }
};

function logForensicTransaction(actor, role, target, category, desc, debit, credit, branchImpact) {
  var user = appState.users.find(function(u) { return u.name === (debit > 0 ? actor : target); });
  var balanceAfter = user ? user.balance : 0;
  var txn = {
    txnId: "TXN-" + Math.floor(100000 + Math.random() * 900000),
    timestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
    actor: actor, role: role, target: target, category: category, desc: desc,
    debit: debit, credit: credit, branchImpact: branchImpact, balanceAfter: balanceAfter
  };
  appState.masterAuditTrail.unshift(txn);
  saveState();
  window.updateBalanceDisplay();
  renderAuditLogView();
  renderWalletStatement();
}

function checkChildCompliance(user) {
  if (user.category !== "Child") return { compliant: true };
  var hasParent = appState.friendsAndFamily.some(function(f) {
    return (f.owner === user.name && f.relation === "Parent" && f.status === "approved") ||
           (f.targetName === user.name && (f.relation === "Daughter" || f.relation === "Son") && f.status === "approved");
  });
  if (hasParent) return { compliant: true, linkedParent: true };
  var daysRemaining = 7 - user.registeredDaysAgo;
  if (daysRemaining <= 0) return { compliant: false, deactivated: true, daysPast: Math.abs(daysRemaining) };
  return { compliant: true, pendingWarning: true, daysRemaining: daysRemaining };
}

function verifyMembershipAccess(actionName) {
  if (!appState.duesConfig.enforceDuesGate) return true;
  var user = getCurrentUserRecord();
  if (user.membershipStatus === "lapsed") {
    alert("⛔ ACCESS RESTRICTED: Annual Membership Overdue\n\nUnder branch rules, your " + appState.duesConfig.activeSeason + " membership subs must be settled before you can " + actionName + ".\n\nPlease renew via the Home HUD or My Pass tab.");
    return false;
  }
  return true;
}

// --- DUAL-BADGE ENGINE ---
function computeUserBadges(userName, role) {
  if (!appState.readTracker[userName]) {
    appState.readTracker[userName] = { busChatCount: 0, readMsgIds: [], readNoteIds: [] };
  }
  var tracker = appState.readTracker[userName];
  if (!tracker.readMsgIds) tracker.readMsgIds = [];
  if (!tracker.readNoteIds) tracker.readNoteIds = [];

  var redCount = 0;
  var totalChat = appState.matchdayChat.length;
  if (totalChat > tracker.busChatCount) redCount += (totalChat - tracker.busChatCount);

  appState.helpdeskTickets.forEach(function(t) {
    t.messages.forEach(function(m) {
      if (m.sender !== userName && m.sender.indexOf(userName) === -1) {
        var isForMe = (role === "admin") ? true : (t.member.indexOf(userName) !== -1);
        if (isForMe && tracker.readMsgIds.indexOf(m.id) === -1) redCount++;
      }
    });
  });

  var goldCount = 0;
  if (role === "admin") {
    appState.helpdeskTickets.forEach(function(t) {
      (t.internalNotes || []).forEach(function(note) {
        if (note.author !== userName && tracker.readNoteIds.indexOf(note.id) === -1) goldCount++;
      });
    });
  }
  return { red: redCount, gold: goldCount };
}

function updateCommsBadge() {
  var user = appState.currentUser.name;
  var role = appState.currentUser.role;
  var badges = computeUserBadges(user, role);

  var badgeRed = document.getElementById("nav-comms-badge-red");
  var badgeGold = document.getElementById("nav-comms-badge-gold");

  if (badgeRed) {
    badgeRed.textContent = badges.red;
    badgeRed.style.display = badges.red > 0 ? "inline-block" : "none";
  }
  if (badgeGold) {
    badgeGold.textContent = badges.gold;
    badgeGold.style.display = badges.gold > 0 ? "inline-block" : "none";
  }

  var subBusBadge = document.getElementById("sub-bus-badge");
  var totalChat = appState.matchdayChat.length;
  var userReadChat = appState.readTracker[user] ? appState.readTracker[user].busChatCount : 0;
  if (subBusBadge) {
    var unreadChat = Math.max(0, totalChat - userReadChat);
    subBusBadge.textContent = unreadChat;
    subBusBadge.style.display = unreadChat > 0 ? "inline-block" : "none";
  }

  var subHelpdeskBadge = document.getElementById("sub-helpdesk-badge");
  if (subHelpdeskBadge) {
    if (badges.gold > 0 && badges.red > 0) {
      subHelpdeskBadge.textContent = "🔴" + badges.red + " 🟡" + badges.gold;
      subHelpdeskBadge.style.display = "inline-block";
    } else if (badges.gold > 0) {
      subHelpdeskBadge.textContent = "🟡 " + badges.gold;
      subHelpdeskBadge.style.display = "inline-block";
    } else if (badges.red > 0) {
      subHelpdeskBadge.textContent = "🔴 " + badges.red;
      subHelpdeskBadge.style.display = "inline-block";
    } else {
      subHelpdeskBadge.style.display = "none";
    }
  }
  updateAdminDrawerBadge();
}

function updateAdminDrawerBadge() {
  var adminReqs = appState.pendingLinkRequests.filter(function(r) { return r.status === "pending_admin"; });
  var pendingVotes = appState.moderation.incidents.filter(function(inc) {
    return inc.status === "active_ban" && (!inc.votes || !inc.votes[appState.currentUser.name]);
  });
  var totalAdminTasks = adminReqs.length + pendingVotes.length;
  var badge = document.getElementById("admin-panel-badge");
  if (badge) {
    badge.textContent = totalAdminTasks;
    badge.style.display = (totalAdminTasks > 0 && appState.currentUser.role === "admin") ? "inline-block" : "none";
  }
}

// --- NAVIGATION & AUTH ---
window.setUserSession = function(name, role, memberNo) {
  var matched = appState.users.find(function(u) { return u.name.toLowerCase() === name.toLowerCase(); });
  var category = matched ? matched.category : "Adult";
  appState.currentUser = { name: name, role: role, memberNo: memberNo || "COX-084", category: category };
  var userRecord = getCurrentUserRecord();

  var compliance = checkChildCompliance(userRecord);
  var deactBanner = document.getElementById("child-deactivated-guard");
  if (!compliance.compliant && compliance.deactivated) {
    deactBanner.style.display = "block";
    document.getElementById("deact-msg").textContent = "Account Locked: " + name + " has been registered for " + userRecord.registeredDaysAgo + " days without a verified parent linkage. Link a parent via Friends & Family to activate.";
  } else {
    deactBanner.style.display = "none";
  }

  document.getElementById("view-login").classList.remove("active");
  document.getElementById("view-hud").classList.add("active");
  document.getElementById("bottom-bar").style.display = "flex";
  document.getElementById("user-header-info").style.display = "block";
  document.getElementById("display-name").textContent = name;
  window.updateBalanceDisplay();

  var adminBar = document.getElementById("admin-bar");
  adminBar.style.display = (role === "admin") ? "flex" : "none";

  window.refreshAllViews();
};

window.handleLogin = function() {
  var input = document.getElementById("login-username");
  var val = (input && input.value.trim()) ? input.value.trim() : "Gary Miller";
  var matched = appState.users.find(function(u) { return u.name.toLowerCase() === val.toLowerCase(); });
  var role = (val.toLowerCase().indexOf("admin") !== -1 || val.toLowerCase().indexOf("secretary") !== -1) ? "admin" : "member";
  var finalName = matched ? matched.name : val;
  var finalNo = matched ? matched.memberNo : (role === "admin" ? "ADMIN-01" : "COX-084");
  window.setUserSession(finalName, role, finalNo);
};

window.quickLogin = function(name, role, no) {
  window.setUserSession(name, role, no);
};

window.handleLogout = function() {
  document.getElementById("admin-bar").style.display = "none";
  document.getElementById("bottom-bar").style.display = "none";
  document.getElementById("user-header-info").style.display = "none";
  document.getElementById("child-deactivated-guard").style.display = "none";

  var views = document.querySelectorAll(".tab-view");
  for (var i = 0; i < views.length; i++) { views[i].classList.remove("active"); }
  document.getElementById("view-login").classList.add("active");
};

window.switchTab = function(viewId, btn) {
  var views = document.querySelectorAll(".tab-view");
  for (var i = 0; i < views.length; i++) { views[i].classList.remove("active"); }
  document.getElementById(viewId).classList.add("active");

  var items = document.querySelectorAll(".nav-item");
  for (var j = 0; j < items.length; j++) { items[j].classList.remove("active"); }
  if (btn) btn.classList.add("active");

  if (viewId === "view-comms") {
    var user = appState.currentUser.name;
    if (!appState.readTracker[user]) appState.readTracker[user] = { busChatCount: 0, readMsgIds: [], readNoteIds: [] };
    appState.readTracker[user].busChatCount = appState.matchdayChat.length;
    saveState();
    updateCommsBadge();
  }
  window.refreshAllViews();
};

window.refreshAllViews = function() {
  window.updateBalanceDisplay();
  renderHUDView();
  renderBusBookingView();
  renderAwayPartySelector();
  renderFootballCard();
  renderBonusRegistry();
  renderFriendsFamilyChecklist();
  renderProfilePassView();
  renderWalletStatement();
  renderCommsTabs();
  renderAdminDrawer();
  updateCommsBadge();
};

// --- 1. HOME HUD ---
function renderHUDView() {
  var urgentContainer = document.getElementById("hud-urgent-banner");
  var urgentPost = appState.announcements.find(function(a) { return a.isUrgent; });
  if (urgentPost) {
    urgentContainer.style.display = "block";
    urgentContainer.innerHTML = "<strong>🚨 URGENT BRANCH NOTICE:</strong> " + urgentPost.content;
  } else {
    urgentContainer.style.display = "none";
  }

  var myBooking = appState.bookings.find(function(b) { return b.name === appState.currentUser.name; });
  var travelStatusBox = document.getElementById("hud-travel-card-status");
  if (myBooking) {
    travelStatusBox.innerHTML = 
      "<div style='color:var(--green); font-weight:800; font-size:12px; margin-bottom:4px;'>✓ SEAT CONFIRMED ON BRANCH COACH</div>" +
      "<div><strong>Pickup:</strong> " + myBooking.stop + "</div>" +
      "<div style='font-size:11px; color:var(--text-muted);'>Pass: " + (myBooking.adults + myBooking.juniors) + " seat(s) • Status: " + (myBooking.boarded ? "<span style='color:var(--green); font-weight:700;'>Boarded</span>" : "Awaiting Coach") + "</div>";
  } else {
    travelStatusBox.innerHTML = 
      "<div style='color:var(--safc-gold); font-size:12px; margin-bottom:4px;'>No seat booked yet for Coventry City (H)</div>" +
      "<button class='btn btn-red btn-sm' style='width:auto; padding:4px 10px; margin-top:4px;' onclick='switchTab(\"view-travel\", document.getElementById(\"nav-travel\"))'>Book Coach Seat (£12)</button>";
  }

  var actionsBox = document.getElementById("hud-actions-box");
  var actions = [];
  var userRecord = getCurrentUserRecord();

  if (userRecord.membershipStatus === "lapsed") {
    var dueFee = (userRecord.category === "Child" ? appState.duesConfig.juniorFee : appState.duesConfig.adultFee);
    actions.push(
      "<div style='background:#7f1d1d; border:1px solid #ef4444; padding:8px; border-radius:6px; margin-bottom:6px; color:#fff;'>" +
        "<strong>🔴 " + appState.duesConfig.activeSeason + " MEMBERSHIP OVERDUE:</strong> Your seasonal subs (£" + dueFee.toFixed(2) + ") are unpaid. Travel booking and ticket ballots are locked.<br>" +
        "<button class='btn btn-gold btn-sm' style='width:100%; margin-top:6px;' onclick='window.promptPayMembershipDues()'>Renew " + appState.duesConfig.activeSeason + " Pass (£" + dueFee.toFixed(2) + ")</button>" +
      "</div>"
    );
  }

  var hasAway = appState.awayBallotRequests.some(function(r) { return r.leadName === appState.currentUser.name; });
  if (!hasAway) {
    actions.push("<div style='margin-bottom:6px;'>🎟️ <strong>Leeds United (A) Ballot:</strong> Registration is open. <a href='#' onclick='switchTab(\"view-travel\", document.getElementById(\"nav-travel\"))' style='color:var(--safc-gold); font-weight:700;'>Register Now ➔</a></div>");
  }
  var childComp = checkChildCompliance(userRecord);
  if (childComp.pendingWarning) {
    actions.push("<div style='color:#f87171;'>⚠️ <strong>Safeguarding Notice:</strong> Under-18 account must link a verified parent within <strong>" + childComp.daysRemaining + " days</strong> or account will be locked.</div>");
  }
  if (actions.length > 0) {
    actionsBox.style.display = "block";
    document.getElementById("hud-actions-list").innerHTML = actions.join("");
  } else {
    actionsBox.style.display = "none";
  }

  var newsFeed = document.getElementById("hud-news-feed");
  newsFeed.innerHTML = "";
  appState.announcements.forEach(function(post, idx) {
    var card = document.createElement("div");
    card.className = "card";
    card.style.marginBottom = "8px";
    card.innerHTML = 
      "<div style='display:flex; justify-content:space-between; font-size:10px; color:var(--text-muted); margin-bottom:4px;'>" +
        "<span>" + post.date + "</span>" +
        (post.isUrgent ? "<span style='color:#ef4444; font-weight:800;'>URGENT</span>" : "<span>OFFICIAL</span>") +
      "</div>" +
      "<h4 style='font-size:13px; font-weight:800; margin-bottom:4px;'>" + post.title + "</h4>" +
      "<p style='font-size:11px; line-height:1.5; color:#cbd5e1; margin-bottom:8px;'>" + post.content + "</p>" +
      "<button class='btn btn-outline btn-sm' style='padding:2px 8px; font-size:10px;' onclick='window.reactAnnouncement(" + idx + ")'>👍 " + post.reactions + " Reactions</button>";
    newsFeed.appendChild(card);
  });
}

window.reactAnnouncement = function(idx) {
  appState.announcements[idx].reactions++;
  saveState();
  renderHUDView();
};

window.promptPayMembershipDues = function() {
  var user = getCurrentUserRecord();
  var fee = (user.category === "Child" ? appState.duesConfig.juniorFee : appState.duesConfig.adultFee);
  if (user.membershipTier === "Senior") fee = appState.duesConfig.seniorFee;
  if (user.membershipTier === "Life") fee = 0.00;

  if (user.balance < fee) {
    alert("Insufficient balance! You need £" + fee.toFixed(2) + " to settle your annual dues, but your balance is £" + user.balance.toFixed(2) + ".\nPlease top up your wallet.");
    return;
  }

  window.showConfirmDialog(
    "Renew Annual Membership Subs",
    "<strong>Season:</strong> " + appState.duesConfig.activeSeason + "<br><strong>Tier:</strong> " + user.membershipTier + "<br><strong>Total to Pay:</strong> £" + fee.toFixed(2) + "<br><br>Settle annual dues to restore travel and ticket ballot privileges.",
    function() {
      user.balance -= fee;
      user.membershipStatus = "active";
      user.membershipSeason = appState.duesConfig.activeSeason;
      user.validUntil = "2027-07-31";
      logForensicTransaction(user.name, "Member", "Branch", "SUBS_DUES", "Paid " + appState.duesConfig.activeSeason + " Annual Dues (" + user.membershipTier + ")", fee, 0, fee);
      saveState();
      window.refreshAllViews();
      alert("🎉 Membership Renewed! Your " + appState.duesConfig.activeSeason + " Season Pass is now ACTIVE.");
    }
  );
};

// --- 2. TRAVEL & BUS BOOKINGS ---
function renderBusBookingView() {
  var sel = document.getElementById("booking-stop");
  if (!sel) return;
  sel.innerHTML = "";
  appState.stops.forEach(function(s) {
    var opt = document.createElement("option");
    opt.value = s.name + " (" + s.time + ")";
    opt.textContent = s.name + " (" + s.time + ")";
    sel.appendChild(opt);
  });
  var totalSeats = 0;
  appState.bookings.forEach(function(b) { totalSeats += (b.adults + b.juniors); });
  var rem = 53 - totalSeats;
  document.getElementById("seats-status").textContent = rem > 0 ? rem + " Seats Remaining" : "FULL (Waitlist)";
  document.getElementById("seats-bar").style.width = Math.min(100, Math.round((totalSeats / 53) * 100)) + "%";
}

window.openBookingModal = function() {
  if (!verifyMembershipAccess("book matchday coach travel")) return;

  var adults = parseInt(document.getElementById("adult-count").value) || 0;
  var juniors = parseInt(document.getElementById("junior-count").value) || 0;
  var stop = document.getElementById("booking-stop").value;
  var total = (adults * 12) + (juniors * 8);

  var user = getCurrentUserRecord();
  if (total === 0) { alert("Please select at least 1 seat."); return; }
  if (user.balance < total) { alert("Insufficient funds! You have £" + user.balance.toFixed(2) + " but need £" + total.toFixed(2)); return; }

  window.showConfirmDialog(
    "Confirm Match Coach Booking",
    "<strong>Fixture:</strong> Coventry City (H)<br><strong>Pickup:</strong> " + stop + "<br><strong>Seats:</strong> " + adults + " Adult(s), " + juniors + " Junior(s)<br><strong>Total to Pay:</strong> £" + total.toFixed(2),
    function() {
      user.balance -= total;
      logForensicTransaction(appState.currentUser.name, "Member", "Branch", "BUS_BOOKING", "Coach Seats: " + adults + " Adult, " + juniors + " Junior (" + stop + ")", total, 0, total);
      appState.bookings.push({
        id: Date.now(),
        name: appState.currentUser.name + (juniors > 0 ? " + Party" : ""),
        stop: stop,
        adults: adults,
        juniors: juniors,
        total: total,
        boarded: false
      });
      saveState();
      window.refreshAllViews();
      alert("Booking confirmed and seat reserved on branch coach!");
    }
  );
};

function renderAwayPartySelector() {
  var container = document.getElementById("away-party-checklist");
  if (!container) return;
  container.innerHTML = "";
  var lead = getCurrentUserRecord();
  var leadDiv = document.createElement("label");
  leadDiv.style.cssText = "display:flex; align-items:center; gap:8px; background:#0f172a; padding:6px 8px; border-radius:6px; margin-bottom:4px; font-size:11px;";
  leadDiv.innerHTML = "<input type='checkbox' checked disabled> <span><strong>" + lead.name + "</strong> (" + lead.category + " - Lead)</span>";
  container.appendChild(leadDiv);

  var myFriends = appState.friendsAndFamily.filter(function(f) { return f.owner === appState.currentUser.name && f.status === "approved"; });
  myFriends.forEach(function(f) {
    var div = document.createElement("label");
    div.style.cssText = "display:flex; align-items:center; gap:8px; background:#0f172a; padding:6px 8px; border-radius:6px; margin-bottom:4px; font-size:11px;";
    div.innerHTML = "<input type='checkbox' class='away-party-member' data-name='" + f.targetName + "' data-type='" + f.type + "'> <span><strong>" + f.targetName + "</strong> (" + f.type + " - " + f.relation + ")</span>";
    container.appendChild(div);
  });
}

window.submitAwayBallotInterest = function() {
  if (!verifyMembershipAccess("enter away ticket ballots")) return;

  var party = [appState.currentUser.name + " (Adult)"];
  var adults = 1; var juniors = 0;
  document.querySelectorAll(".away-party-member:checked").forEach(function(cb) {
    var name = cb.getAttribute("data-name");
    var type = cb.getAttribute("data-type");
    party.push(name + " (" + type + ")");
    if (type === "Child" || type === "Junior") juniors++; else adults++;
  });

  appState.awayBallotRequests = appState.awayBallotRequests.filter(function(r) { return r.leadName !== appState.currentUser.name; });
  appState.awayBallotRequests.push({
    leadName: appState.currentUser.name,
    party: party, adults: adults, juniors: juniors, timestamp: Date.now()
  });
  logForensicTransaction(appState.currentUser.name, "Member", "Branch", "AWAY_BALLOT_SUBMIT", "Ballot request for party of " + party.length + " to Leeds (A)", 0, 0, 0);
  saveState();
  window.refreshAllViews();
  alert("Expression of Interest registered for " + party.length + " party member(s).");
};

// --- 3. FUNDRAISER (FOOTBALL CARD & BONUS BALL) ---
function calculateCardFinancials() {
  var activeClubs = appState.cardConfig.activeClubs;
  var totalSquares = activeClubs.length;
  var soldCount = 0;
  activeClubs.forEach(function(c) { if (appState.cardClaims[c]) soldCount++; });

  var grossPot = soldCount * appState.cardConfig.pricePerSquare;
  var winnerPrize = 0;

  if (appState.cardConfig.prizeMode === "percentage") {
    winnerPrize = grossPot * (appState.cardConfig.prizePct / 100);
  } else {
    winnerPrize = soldCount < totalSquares ? appState.cardConfig.prizeFixed * (soldCount / totalSquares) : appState.cardConfig.prizeFixed;
  }
  var branchProfit = grossPot - winnerPrize;
  return { totalSquares: totalSquares, soldCount: soldCount, grossPot: grossPot, winnerPrize: winnerPrize, branchProfit: branchProfit };
}

function renderFootballCard() {
  var grid = document.getElementById("football-grid");
  if (!grid) return;
  grid.innerHTML = "";

  var activeClubs = appState.cardConfig.activeClubs;
  var fin = calculateCardFinancials();

  activeClubs.forEach(function(team) {
    var cell = document.createElement("div");
    cell.className = "grid-cell";
    var owner = appState.cardClaims[team];
    if (owner) {
      cell.className += " claimed";
      cell.innerHTML = "<div>" + team + "</div><div class='cell-owner'>" + owner + "</div>";
    } else {
      cell.innerHTML = "<div>" + team + "</div><div style='font-size:9px; color:#94A3B8;'>£" + appState.cardConfig.pricePerSquare.toFixed(2) + "</div>";
      cell.onclick = function() { window.promptCardClaim(team); };
    }
    grid.appendChild(cell);
  });

  document.getElementById("card-teams-count-label").textContent = "⚽ " + fin.totalSquares + "-Team Football Card";
  document.getElementById("card-price-label").textContent = "£" + appState.cardConfig.pricePerSquare.toFixed(2) + "/sq";
  document.getElementById("card-prize-label").textContent = "£" + fin.winnerPrize.toFixed(2) + " Prize";
  document.getElementById("card-sold-summary").textContent = fin.soldCount + " of " + fin.totalSquares + " Sold";

  var adminBreakdown = document.getElementById("admin-card-financial-breakdown");
  if (adminBreakdown) {
    adminBreakdown.innerHTML =
      "<div style='display:grid; grid-template-columns:1fr 1fr; gap:6px; font-size:11px;'>" +
        "<div>Sold: <strong>" + fin.soldCount + " / " + fin.totalSquares + "</strong></div>" +
        "<div>Gross Pot: <strong>£" + fin.grossPot.toFixed(2) + "</strong></div>" +
        "<div style='color:var(--safc-gold);'>Winner Share: <strong>£" + fin.winnerPrize.toFixed(2) + "</strong></div>" +
        "<div style='color:var(--green);'>Branch Retained: <strong>£" + fin.branchProfit.toFixed(2) + "</strong></div>" +
      "</div>";
  }
}

window.promptCardClaim = function(team) {
  if (!verifyMembershipAccess("play the football card")) return;

  var fee = appState.cardConfig.pricePerSquare;
  var user = getCurrentUserRecord();
  if (user.balance < fee) {
    alert("Insufficient balance! You need £" + fee.toFixed(2) + " to buy a square, but your balance is £" + user.balance.toFixed(2) + ".\nPlease top up your wallet.");
    return;
  }

  var fin = calculateCardFinancials();
  window.showConfirmDialog(
    "Claim Football Card Square",
    "<strong>Team:</strong> " + team + "<br><strong>Entry Fee:</strong> £" + fee.toFixed(2) + "<br><strong>Potential Prize:</strong> £" + fin.winnerPrize.toFixed(2) + " Cash Pot<br><br>Confirm purchase from your branch wallet balance?",
    function() {
      user.balance -= fee;
      logForensicTransaction(appState.currentUser.name, "Member", "Branch", "CARD", "Football Card: " + team, fee, 0, fee);
      appState.cardClaims[team] = appState.currentUser.name;
      saveState();
      window.refreshAllViews();
      alert("Square claimed! " + team + " is now registered to " + appState.currentUser.name + ".");
    }
  );
};

function renderBonusRegistry() {
  var grid = document.getElementById("bonus-grid");
  if (!grid) return;
  grid.innerHTML = "";
  for (var i = 1; i <= 59; i++) {
    var num = i.toString();
    var item = appState.bonusRegistry[num];
    var cell = document.createElement("div");
    cell.className = "bonus-cell";
    if (item.status === "ballot_open") {
      cell.innerHTML = "<div style='font-weight:800; color:#facc15;'>#" + num + "</div><div style='font-size:7px; color:#facc15;'>BALLOT</div>";
    } else if (item.owner === appState.currentUser.name) {
      cell.style.background = "#15803d";
      cell.innerHTML = "<div style='font-weight:800; color:#fff;'>#" + num + "</div><div style='font-size:8px; color:#fff;'>YOU</div>";
    } else {
      cell.innerHTML = "<div style='font-weight:800;'>#" + num + "</div><div style='font-size:8px; color:var(--safc-gold); overflow:hidden; text-overflow:ellipsis; white-space:nowrap; width:100%;'>" + item.owner + "</div>";
    }
    grid.appendChild(cell);
  }
}

// --- 4. MY PASS & STATEMENT ---
function renderProfilePassView() {
  var user = getCurrentUserRecord();
  document.getElementById("card-name").textContent = user.name;
  document.getElementById("card-no").textContent = "Member #" + user.memberNo;

  var statusElem = document.getElementById("pass-membership-status");
  var renewalBtn = document.getElementById("pass-renew-btn");

  if (user.membershipStatus === "active") {
    statusElem.innerHTML = "<span style='color:var(--green); font-weight:800;'>🟢 ACTIVE • " + (user.membershipSeason || "2026/27") + " (" + user.membershipTier + ")</span><br><span style='font-size:10px; color:var(--text-muted);'>Valid through " + (user.validUntil || "2027-07-31") + "</span>";
    if (renewalBtn) renewalBtn.style.display = "none";
  } else {
    var dueFee = (user.category === "Child" ? appState.duesConfig.juniorFee : appState.duesConfig.adultFee);
    statusElem.innerHTML = "<span style='color:#ef4444; font-weight:800;'>🔴 LAPSED / OVERDUE • " + (user.membershipSeason || "2025/26") + "</span><br><span style='font-size:10px; color:#f87171;'>Travel & Ballot Privileges Locked</span>";
    if (renewalBtn) {
      renewalBtn.style.display = "block";
      renewalBtn.textContent = "Renew " + appState.duesConfig.activeSeason + " Season Pass (£" + dueFee.toFixed(2) + ")";
    }
  }
}

window.handleStatementTimeframeChange = function(val) {
  var customBox = document.getElementById("statement-custom-date-box");
  if (customBox) {
    customBox.style.display = (val === "CUSTOM") ? "grid" : "none";
  }
  renderWalletStatement();
};

function renderWalletStatement() {
  var container = document.getElementById("wallet-statement-list");
  var title = document.getElementById("wallet-statement-title");
  if (!container) return;
  container.innerHTML = "";

  var current = appState.currentUser.name;
  if (title) title.textContent = "💳 " + current + "'s Statement";

  var categoryFilter = document.getElementById("filter-statement-category") ? document.getElementById("filter-statement-category").value : "ALL";
  var directionFilter = document.getElementById("filter-statement-direction") ? document.getElementById("filter-statement-direction").value : "ALL";
  var timeFilter = document.getElementById("filter-statement-time") ? document.getElementById("filter-statement-time").value : "ALL";
  var searchKeyword = document.getElementById("filter-statement-search") ? document.getElementById("filter-statement-search").value.toLowerCase().trim() : "";

  var customStartDate = document.getElementById("filter-statement-start-date") ? document.getElementById("filter-statement-start-date").value : "";
  var customEndDate = document.getElementById("filter-statement-end-date") ? document.getElementById("filter-statement-end-date").value : "";

  var now = new Date();
  var myTxns = appState.masterAuditTrail.filter(function(t) {
    var isMyDebit = (t.actor === current && t.debit > 0);
    var isMyCredit = (t.target === current && t.credit > 0);
    if (!isMyDebit && !isMyCredit) return false;

    if (categoryFilter !== "ALL") {
      if (categoryFilter === "BUS" && t.category !== "BUS_BOOKING") return false;
      if (categoryFilter === "CARD" && t.category !== "CARD" && t.category !== "FOOTBALL_CARD" && t.category !== "CARD_WINNER_PAYOUT") return false;
      if (categoryFilter === "BONUS" && t.category.indexOf("BONUS") === -1) return false;
      if (categoryFilter === "TOPUP" && t.category !== "TOPUP" && t.category !== "MEMBER_TOPUP") return false;
      if (categoryFilter === "SUBS" && t.category !== "SUBS_DUES") return false;
      if (categoryFilter === "WITHDRAWAL") {
        var isWd = (t.category === "CARD_WINNER_PAYOUT" || t.category === "WITHDRAWAL" || t.desc.toLowerCase().indexOf("withdrawal") !== -1 || t.desc.toLowerCase().indexOf("payout") !== -1);
        if (!isWd) return false;
      }
      if (categoryFilter === "PRIZE" && t.category !== "CARD_WINNER_PAYOUT") return false;
    }

    if (directionFilter === "IN" && !isMyCredit) return false;
    if (directionFilter === "OUT" && !isMyDebit) return false;

    if (timeFilter !== "ALL") {
      var txnDate = new Date(t.timestamp.replace(" ", "T"));
      var diffDays = (now - txnDate) / (1000 * 60 * 60 * 24);
      if (timeFilter === "7D" && diffDays > 7) return false;
      if (timeFilter === "30D" && diffDays > 30) return false;
      if (timeFilter === "YEAR" && diffDays > 365) return false;
      if (timeFilter === "CUSTOM") {
        var txnYMD = t.timestamp.substring(0, 10);
        if (customStartDate && txnYMD < customStartDate) return false;
        if (customEndDate && txnYMD > customEndDate) return false;
      }
    }

    if (searchKeyword) {
      var matchText = (t.desc + " " + t.category + " " + t.txnId).toLowerCase();
      if (matchText.indexOf(searchKeyword) === -1) return false;
    }
    return true;
  });

  var filteredIn = 0;
  var filteredOut = 0;
  myTxns.forEach(function(t) {
    if (t.target === current && t.credit > 0) filteredIn += t.credit;
    if (t.actor === current && t.debit > 0) filteredOut += t.debit;
  });
  var netFlow = filteredIn - filteredOut;

  var summaryBox = document.getElementById("statement-filtered-summary");
  if (summaryBox) {
    summaryBox.innerHTML =
      "<span>In: <strong style='color:var(--green);'>+£" + filteredIn.toFixed(2) + "</strong></span>" +
      "<span>Out: <strong style='color:#ef4444;'>-£" + filteredOut.toFixed(2) + "</strong></span>" +
      "<span>Net: <strong style='color:" + (netFlow >= 0 ? "var(--green)" : "#ef4444") + ";'>" + (netFlow >= 0 ? "+£" : "-£") + Math.abs(netFlow).toFixed(2) + "</strong></span>";
  }

  if (myTxns.length === 0) {
    container.innerHTML = "<div style='color:#94a3b8; font-size:11px; padding:10px 0; text-align:center;'>No transactions match your active filter criteria.</div>";
    return;
  }

  myTxns.slice(0, 25).forEach(function(item) {
    var row = document.createElement("div");
    row.style.cssText = "display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #334155; padding:8px 0; font-size:12px;";
    var isCredit = (item.target === current && item.credit > 0);
    var color = isCredit ? "var(--green)" : "#ef4444";
    var prefix = isCredit ? "+£" : "-£";
    var amt = isCredit ? item.credit : item.debit;
    row.innerHTML =
      "<div><strong>" + item.desc + "</strong><br><span style='font-size:10px; color:#94a3b8;'>" + item.timestamp.substring(0, 16) + " • " + item.txnId + "</span></div>" +
      "<div style='font-weight:700; color:" + color + ";'>" + prefix + amt.toFixed(2) + "</div>";
    container.appendChild(row);
  });
}

function renderFriendsFamilyChecklist() {
  var container = document.getElementById("fnf-manager-list");
  if (!container) return;
  container.innerHTML = "";
  var myFriends = appState.friendsAndFamily.filter(function(f) { return f.owner === appState.currentUser.name; });
  myFriends.forEach(function(f) {
    var row = document.createElement("div");
    row.style.cssText = "display:flex; justify-content:space-between; align-items:center; background:#0f172a; padding:6px 8px; border-radius:6px; margin-bottom:4px; font-size:11px;";
    row.innerHTML = 
      "<div><strong>" + f.targetName + "</strong> (" + f.relation + ")<br><span style='color:var(--safc-gold);'>" + f.type + " • " + f.memberNo + "</span></div>" +
      "<span style='color:var(--green); font-size:10px;'>✓ Active</span>";
    container.appendChild(row);
  });
}

function renderPendingAuthorizations() {
  var box = document.getElementById("member-pending-auth-box");
  if (!box) return;
  var myReqs = appState.pendingLinkRequests.filter(function(r) { return r.targetName === appState.currentUser.name; });
  box.style.display = myReqs.length > 0 ? "block" : "none";
}

// --- 5. COMMS & CHAT HUB ---
window.switchCommsSubTab = function(subId) {
  document.getElementById("comms-sub-bus").style.display = (subId === "bus") ? "block" : "none";
  document.getElementById("comms-sub-dm").style.display = (subId === "dm") ? "block" : "none";
  document.getElementById("comms-sub-desk").style.display = (subId === "desk") ? "block" : "none";

  document.getElementById("btn-sub-bus").className = (subId === "bus") ? "btn btn-gold btn-sm" : "btn btn-outline btn-sm";
  document.getElementById("btn-sub-dm").className = (subId === "dm") ? "btn btn-gold btn-sm" : "btn btn-outline btn-sm";
  document.getElementById("btn-sub-desk").className = (subId === "desk") ? "btn btn-gold btn-sm" : "btn btn-outline btn-sm";
};

function renderCommsTabs() {
  renderMatchdayBusChat();
  renderDirectMessagesView();
  renderCommitteeDeskView();
}

function renderMatchdayBusChat() {
  var container = document.getElementById("bus-chat-messages");
  container.innerHTML = "";
  appState.matchdayChat.forEach(function(msg) {
    var isMe = msg.sender === appState.currentUser.name;
    var bubble = document.createElement("div");
    bubble.style.cssText = "margin-bottom:8px; display:flex; flex-direction:column; align-items:" + (isMe ? "flex-end" : "flex-start") + ";";
    bubble.innerHTML = 
      "<div style='font-size:9px; color:#94a3b8; margin-bottom:2px;'>" + msg.sender + " • " + msg.time + "</div>" +
      "<div style='background:" + (isMe ? "var(--safc-red)" : "#1e293b") + "; color:#fff; padding:6px 10px; border-radius:10px; font-size:12px; max-width:80%; line-height:1.4;'>" + msg.text + "</div>";
    container.appendChild(bubble);
  });
  container.scrollTop = container.scrollHeight;

  var current = appState.currentUser.name;
  var isMuted = appState.moderation.mutedMembers.indexOf(current) !== -1;
  var isRevoked = appState.moderation.revokedMembers.indexOf(current) !== -1;

  var input = document.getElementById("bus-chat-input");
  var sendBtn = document.getElementById("bus-chat-send-btn");
  var statusNotice = document.getElementById("bus-chat-status-notice");

  if (isRevoked) {
    input.disabled = true; sendBtn.disabled = true;
    statusNotice.innerHTML = "<span style='color:#ef4444; font-weight:800;'>⛔ Messaging privileges revoked across branch. Subject to Committee Quorum Vote.</span>";
  } else if (isMuted) {
    input.disabled = true; sendBtn.disabled = true;
    statusNotice.innerHTML = "<span style='color:#facc15; font-weight:800;'>🚫 Chat Muted for language/aggression. Incident forwarded for Committee Review.</span>";
  } else {
    input.disabled = false; sendBtn.disabled = false;
    statusNotice.innerHTML = "<span style='color:#94a3b8; font-size:10px;'>Active Safeguarding Engine: Profanity, northern slang & aggression moderated.</span>";
  }
}

window.sendMatchdayBusMessage = function() {
  var input = document.getElementById("bus-chat-input");
  var text = input.value.trim();
  if (!text) return;
  var current = appState.currentUser.name;

  var analysis = detectAbuseOrProfanity(text);

  if (analysis.flagged) {
    if (!appState.moderation.strikes[current]) appState.moderation.strikes[current] = 0;
    appState.moderation.strikes[current]++;
    var strikeCount = appState.moderation.strikes[current];

    var fullHistory = appState.matchdayChat.map(function(m) {
      return m.sender + " (" + m.time + "): " + m.text;
    });
    fullHistory.push(current + " (" + new Date().toTimeString().substring(0, 5) + "): " + text + " [FLAGGED - BAN TRIGGER]");
    input.value = "";

    if (strikeCount === 1) {
      alert("⚠️ SAFEGUARDING WARNING (STRIKE 1):\n" + analysis.reason + "\n\nProfanity and aggressive talk are strictly prohibited around juniors on branch travel.\n\nNext infraction will immediately mute your account.");
      return;
    } else if (strikeCount === 2) {
      appState.moderation.mutedMembers.push(current);
      appState.moderation.incidents.unshift({
        id: "INC-" + Date.now(),
        member: current,
        timestamp: new Date().toISOString().substring(0, 16),
        status: "active_ban",
        reason: "Repeat infraction (Strike 2): " + analysis.reason,
        offendingText: text,
        transcriptContext: fullHistory,
        internalDiscussion: [],
        votes: {}
      });
      saveState();
      renderMatchdayBusChat();
      updateAdminDrawerBadge();
      alert("🚫 CHAT MUTED (STRIKE 2):\n" + analysis.reason + "\n\nYou have been muted from this Matchday Chat. The complete conversation transcript has been forwarded to the Committee Review Board.");
      return;
    } else {
      appState.moderation.revokedMembers.push(current);
      appState.moderation.incidents.unshift({
        id: "INC-" + Date.now(),
        member: current,
        timestamp: new Date().toISOString().substring(0, 16),
        status: "active_ban",
        reason: "Severe Infraction (Strike 3): " + analysis.reason,
        offendingText: text,
        transcriptContext: fullHistory,
        internalDiscussion: [],
        votes: {}
      });
      saveState();
      renderMatchdayBusChat();
      updateAdminDrawerBadge();
      alert("⛔ PRIVILEGES REVOKED (STRIKE 3):\nAll messaging privileges revoked. Subject to formal Committee Board Deliberation.");
      return;
    }
  }

  appState.matchdayChat.push({
    id: Date.now(),
    sender: current,
    time: new Date().toTimeString().substring(0, 5),
    text: text
  });

  input.value = "";
  saveState();
  renderMatchdayBusChat();
  updateCommsBadge();
};

function renderDirectMessagesView() {
  var container = document.getElementById("dm-threads-container");
  container.innerHTML = "";
  var current = appState.currentUser.name;
  var curRecord = getCurrentUserRecord();

  if (curRecord.category === "Child") {
    container.innerHTML = "<div style='color:#ef4444; background:#1e0508; padding:12px; border-radius:8px; font-size:12px;'>🛡️ <strong>Safeguarding Rule:</strong> Direct messaging is strictly disabled for members under 18. All queries must go through your verified parent.</div>";
    return;
  }

  container.innerHTML = 
    "<p style='font-size:11px; color:#94a3b8; margin-bottom:10px;'>Private member messaging. Direct contact with minors is locked.</p>" +
    "<div style='display:flex; gap:6px; margin-bottom:12px;'>" +
      "<select id='dm-recipient-select' class='form-select' style='flex:1; padding:6px; font-size:11px;'></select>" +
      "<button class='btn btn-red btn-sm' onclick='window.startDirectMessage()'>Start DM</button>" +
    "</div>" +
    "<div id='active-dm-feed' style='background:#0f172a; padding:10px; border-radius:8px; min-height:60px; font-size:11px; color:#94a3b8;'>No active DM selected.</div>";

  var sel = document.getElementById("dm-recipient-select");
  appState.users.forEach(function(u) {
    if (u.name !== current && u.hasAppAccount) {
      var opt = document.createElement("option");
      opt.value = u.name;
      opt.textContent = u.name + (u.category === "Child" ? " (Minor - BLOCKED)" : " (Adult)");
      sel.appendChild(opt);
    }
  });
}

window.startDirectMessage = function() {
  var recipient = document.getElementById("dm-recipient-select").value;
  var targetUser = appState.users.find(function(u) { return u.name === recipient; });
  if (targetUser && targetUser.category === "Child") {
    alert("🛡️ SAFEGUARDING VIOLATION BLOCKED:\nDirect messaging with members under 18 is prohibited.\n\nAll contact regarding " + recipient + " must be conducted via their linked parent.");
    return;
  }
  document.getElementById("active-dm-feed").innerHTML = "<strong>Chat with " + recipient + ":</strong><br><span style='color:var(--green);'>Private end-to-end encrypted connection open.</span>";
};

function renderCommitteeDeskView() {
  var container = document.getElementById("helpdesk-threads-list");
  container.innerHTML = "";
  var current = appState.currentUser.name;
  var isAdmin = appState.currentUser.role === "admin";

  var myTickets = appState.helpdeskTickets.filter(function(t) {
    return isAdmin ? true : t.member.indexOf(current) !== -1;
  });

  if (myTickets.length === 0) {
    container.innerHTML = "<div style='color:#94a3b8; font-size:11px;'>No tickets in mailbox.</div>";
    return;
  }

  var tracker = appState.readTracker[current] || { readMsgIds: [], readNoteIds: [] };

  myTickets.forEach(function(t) {
    var unreadNotes = (t.internalNotes || []).filter(function(n) {
      return n.author !== current && (tracker.readNoteIds || []).indexOf(n.id) === -1;
    }).length;

    var unreadMsgs = t.messages.filter(function(m) {
      return m.sender !== current && m.sender.indexOf(current) === -1 && (tracker.readMsgIds || []).indexOf(m.id) === -1;
    }).length;

    var card = document.createElement("div");
    card.style.cssText = "background:#0f172a; border:1px solid #334155; padding:10px; border-radius:8px; margin-bottom:8px; font-size:11px; border-left:3px solid " + (t.escalatedToGraham ? "var(--safc-gold)" : "var(--green)") + ";";
    
    var badgeHtml = "";
    if (isAdmin && unreadNotes > 0) badgeHtml += "<span class='badge-gold' style='margin-left:4px;'>🟡 " + unreadNotes + " Internal</span>";
    if (unreadMsgs > 0) badgeHtml += "<span class='badge-red' style='margin-left:4px;'>🔴 " + unreadMsgs + " New</span>";

    card.innerHTML = 
      "<div style='display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;'>" +
        "<div><strong>#" + t.id + " • " + t.topic + " (" + t.member + ")</strong>" + badgeHtml + "</div>" +
        "<span style='color:" + (t.escalatedToGraham ? "var(--safc-gold)" : "var(--green)") + "; font-size:10px; font-weight:700;'>" + (t.escalatedToGraham ? "Escalated" : "Open") + "</span>" +
      "</div>" +
      "<div style='color:#94a3b8; font-size:10px; margin-bottom:6px;'>History: " + t.messages.length + " message(s)" + (isAdmin ? " • " + (t.internalNotes || []).length + " internal note(s)" : "") + "</div>" +
      "<button class='btn btn-outline btn-sm' style='padding:4px 8px; font-size:10px; width:100%;' onclick='window.openMailboxThreadModal(\"" + t.id + "\")'>📬 Open Full Mailbox Thread & History</button>";
    container.appendChild(card);
  });
}

window.openMailboxThreadModal = function(ticketId) {
  var ticket = appState.helpdeskTickets.find(function(t) { return t.id === ticketId; });
  if (!ticket) return;

  var current = appState.currentUser.name;
  var isAdmin = appState.currentUser.role === "admin";

  if (!appState.readTracker[current]) appState.readTracker[current] = { busChatCount: 0, readMsgIds: [], readNoteIds: [] };
  var tracker = appState.readTracker[current];
  if (!tracker.readMsgIds) tracker.readMsgIds = [];
  if (!tracker.readNoteIds) tracker.readNoteIds = [];

  ticket.messages.forEach(function(m) {
    if (tracker.readMsgIds.indexOf(m.id) === -1) tracker.readMsgIds.push(m.id);
  });
  if (isAdmin && ticket.internalNotes) {
    ticket.internalNotes.forEach(function(n) {
      if (tracker.readNoteIds.indexOf(n.id) === -1) tracker.readNoteIds.push(n.id);
    });
  }

  saveState();
  updateCommsBadge();

  var modal = document.getElementById("modal-ticket-thread");
  var title = document.getElementById("mailbox-thread-title");
  var body = document.getElementById("mailbox-thread-body");

  title.innerHTML = "Mailbox: #" + ticket.id + " • " + ticket.topic + " <span style='font-size:11px; color:var(--text-muted);'>(" + ticket.member + ")</span>";

  var html = "<div style='font-size:11px; font-weight:800; color:var(--safc-gold); margin-bottom:6px;'>💬 Public Conversation History:</div>";
  html += "<div style='background:#0f172a; padding:8px; border-radius:8px; margin-bottom:12px; max-height:160px; overflow-y:auto;'>";
  ticket.messages.forEach(function(m) {
    var isCommittee = m.sender.indexOf("Committee") !== -1 || m.sender.indexOf("Graham") !== -1;
    html += 
      "<div style='margin-bottom:8px; background:" + (isCommittee ? "#1e293b" : "#172554") + "; padding:6px 10px; border-radius:6px; font-size:11px; border-left:3px solid " + (isCommittee ? "var(--safc-gold)" : "#3b82f6") + ";'>" +
        "<div style='display:flex; justify-content:space-between; font-size:9px; color:#94a3b8; margin-bottom:2px;'>" +
          "<strong>" + m.sender + "</strong><span>" + m.time + "</span>" +
        "</div>" +
        "<div>" + m.text + "</div>" +
      "</div>";
  });
  html += "</div>";

  if (isAdmin) {
    html += "<div style='font-size:11px; font-weight:800; color:var(--safc-gold); margin-bottom:6px;'>🔒 Internal Committee Deliberation (Private):</div>";
    html += "<div style='background:#1e1b4b; border:1px solid #4338ca; padding:8px; border-radius:8px; margin-bottom:12px; max-height:160px; overflow-y:auto;'>";
    if (!ticket.internalNotes || ticket.internalNotes.length === 0) {
      html += "<div style='color:#94a3b8; font-size:10px;'>No internal committee notes recorded yet.</div>";
    } else {
      ticket.internalNotes.forEach(function(n) {
        html += 
          "<div style='margin-bottom:6px; background:#0f172a; padding:6px 8px; border-radius:6px; font-size:10px; border-left:3px solid var(--safc-gold);'>" +
            "<div style='display:flex; justify-content:space-between; font-weight:800; color:var(--safc-gold); margin-bottom:2px;'>" +
              "<span>" + n.author + "</span><span>" + n.time + "</span>" +
            "</div>" +
            "<div style='color:#f8fafc;'>" + n.text + "</div>" +
          "</div>";
      });
    }
    html += "</div>";

    html += 
      "<div style='background:#0f172a; border:1px dashed var(--safc-gold); padding:8px; border-radius:8px; margin-bottom:12px;'>" +
        "<label style='display:block; font-size:10px; font-weight:700; color:var(--safc-gold); margin-bottom:4px;'>Post Internal Committee Note (Alerts Colleagues in Gold):</label>" +
        "<div style='display:flex; gap:4px;'>" +
          "<input type='text' id='internal-note-input' class='form-input' placeholder='Reply internally to Graham/Dave/Sarah...' style='padding:6px; font-size:11px;' />" +
          "<button class='btn btn-gold btn-sm' style='padding:4px 10px;' onclick='window.submitInternalNote(\"" + ticket.id + "\")'>Add Note</button>" +
        "</div>" +
      "</div>";
  }

  html += 
    "<div style='background:#0f172a; padding:8px; border-radius:8px;'>" +
      "<label style='display:block; font-size:10px; font-weight:700; color:var(--text-muted); margin-bottom:4px;'>" + (isAdmin ? "Reply to Member (Public):" : "Send Follow-up:") + "</label>" +
      "<div style='display:flex; gap:4px;'>" +
        "<input type='text' id='public-reply-input' class='form-input' placeholder='Type response...' style='padding:6px; font-size:11px;' />" +
        "<button class='btn btn-red btn-sm' style='padding:4px 10px;' onclick='window.submitPublicReply(\"" + ticket.id + "\")'>Send</button>" +
      "</div>" +
    "</div>";

  body.innerHTML = html;
  modal.style.display = "flex";
};

window.closeMailboxThreadModal = function() {
  document.getElementById("modal-ticket-thread").style.display = "none";
  renderCommitteeDeskView();
  updateCommsBadge();
};

window.submitInternalNote = function(ticketId) {
  var input = document.getElementById("internal-note-input");
  var text = input ? input.value.trim() : "";
  if (!text) return;

  var ticket = appState.helpdeskTickets.find(function(t) { return t.id === ticketId; });
  if (!ticket) return;
  if (!ticket.internalNotes) ticket.internalNotes = [];

  var current = appState.currentUser.name;
  var newNoteId = "n-" + Date.now();

  ticket.internalNotes.push({ id: newNoteId, author: current, time: new Date().toTimeString().substring(0, 5), text: text });

  if (!appState.readTracker[current]) appState.readTracker[current] = { busChatCount: 0, readMsgIds: [], readNoteIds: [] };
  appState.readTracker[current].readNoteIds.push(newNoteId);

  saveState();
  window.openMailboxThreadModal(ticketId);
  updateCommsBadge();
  alert("Internal note added. Gold notification sent to other committee members.");
};

window.submitPublicReply = function(ticketId) {
  var input = document.getElementById("public-reply-input");
  var text = input ? input.value.trim() : "";
  if (!text) return;

  var ticket = appState.helpdeskTickets.find(function(t) { return t.id === ticketId; });
  if (!ticket) return;

  var current = appState.currentUser.name;
  var isAdmin = appState.currentUser.role === "admin";
  var newMsgId = "m-" + Date.now();
  var senderName = isAdmin ? "Coxhoe Committee (Signed: " + current + ")" : current;

  ticket.messages.push({ id: newMsgId, sender: senderName, time: new Date().toTimeString().substring(0, 5), text: text });

  if (!appState.readTracker[current]) appState.readTracker[current] = { busChatCount: 0, readMsgIds: [], readNoteIds: [] };
  appState.readTracker[current].readMsgIds.push(newMsgId);

  saveState();
  window.openMailboxThreadModal(ticketId);
  updateCommsBadge();
  alert("Message posted to conversation thread.");
};

window.submitMemberHelpdeskTicket = function() {
  var topic = document.getElementById("helpdesk-topic").value;
  var text = document.getElementById("helpdesk-query").value.trim();
  if (!text) return;
  var current = appState.currentUser.name;
  var curRecord = getCurrentUserRecord();

  var effectiveMember = current;
  if (curRecord.category === "Child") {
    var parentLink = appState.friendsAndFamily.find(function(f) { return f.owner === current && f.relation === "Parent"; });
    var parentName = parentLink ? parentLink.targetName : "Parent of " + current;
    effectiveMember = current + " (Via Parent: " + parentName + ")";
  }

  var newId = "TICK-" + Math.floor(100 + Math.random() * 900);
  var newMsgId = "m-" + Date.now();

  appState.helpdeskTickets.unshift({
    id: newId,
    member: effectiveMember,
    topic: topic,
    status: "open",
    escalatedToGraham: false,
    created: new Date().toISOString().substring(0, 16),
    messages: [{ id: newMsgId, sender: current, time: new Date().toTimeString().substring(0, 5), text: text }],
    internalNotes: []
  });

  if (!appState.readTracker[current]) appState.readTracker[current] = { busChatCount: 0, readMsgIds: [], readNoteIds: [] };
  appState.readTracker[current].readMsgIds.push(newMsgId);

  document.getElementById("helpdesk-query").value = "";
  saveState();
  renderCommitteeDeskView();
  updateCommsBadge();
  alert("Ticket #" + newId + " submitted to Shared Committee Desk.");
};

// --- 6. ADMIN DRAWER ---
function renderAdminDrawer() {
  var current = appState.currentUser.name;
  var isOnCall = appState.committeeOnCall[current] !== false;
  var toggleBtn = document.getElementById("admin-oncall-toggle-btn");
  if (toggleBtn) {
    toggleBtn.textContent = isOnCall ? "🟢 On-Call (Receiving Alerts)" : "⚪ Off-Duty (Muted)";
    toggleBtn.style.color = isOnCall ? "var(--green)" : "#94a3b8";
  }

  renderAdminDuesManager();
  renderAdminDisciplinaryBoard();

  var childList = document.getElementById("admin-child-compliance-list");
  if (childList) {
    childList.innerHTML = "";
    var children = appState.users.filter(function(u) { return u.category === "Child"; });
    children.forEach(function(ch) {
      var comp = checkChildCompliance(ch);
      var statusText = comp.deactivated ? "<span style='color:#ef4444; font-weight:800;'>DEACTIVATED (Over 7 days)</span>" : "<span style='color:var(--green); font-weight:800;'>Compliant (Parent Linked)</span>";
      var row = document.createElement("div");
      row.style.cssText = "background:#0f172a; padding:6px 8px; border-radius:6px; margin-bottom:4px; font-size:10px; display:flex; justify-content:space-between; align-items:center;";
      row.innerHTML = 
        "<div><strong>" + ch.name + "</strong> (" + ch.memberNo + ")<br>Registered " + ch.registeredDaysAgo + " days ago • " + statusText + "</div>" +
        (comp.deactivated ? "<button class='btn btn-gold btn-sm' style='padding:2px 6px; font-size:9px;' onclick='window.adminForceLinkParent(\"" + ch.name + "\")'>Link Parent</button>" : "");
      childList.appendChild(row);
    });
  }

  var box = document.getElementById("admin-pending-auth-box");
  if (box) {
    box.innerHTML = "";
    var adminReqs = appState.pendingLinkRequests.filter(function(r) { return r.status === "pending_admin"; });
    if (adminReqs.length === 0) {
      box.innerHTML = "<div style='color:#94a3b8; font-size:10px;'>No pending non-app links.</div>";
    } else {
      adminReqs.forEach(function(req) {
        var item = document.createElement("div");
        item.style.cssText = "background:#0f172a; padding:6px 8px; border-radius:6px; margin-bottom:4px; font-size:10px; display:flex; justify-content:space-between; align-items:center;";
        item.innerHTML = 
          "<div><strong>" + req.requester + "</strong> ➔ <strong>" + req.targetName + "</strong> (" + req.relation + ")</div>" +
          "<div style='display:flex; gap:4px;'><button class='btn btn-gold btn-sm' style='padding:1px 6px; font-size:9px;' onclick='window.adminApproveLink(" + req.id + ")'>Approve</button><button class='btn btn-outline btn-sm' style='padding:1px 6px; font-size:9px; color:#ef4444;' onclick='window.adminRejectLink(" + req.id + ")'>Reject</button></div>";
        box.appendChild(item);
      });
    }
  }

  renderAdminLinkRectifierDropdown();
  renderAdminLinkRectifier();
  renderManifest();
  renderAdminStopList();
  renderAdminCardSettings();
  renderAuditLogView();
  updateAdminDrawerBadge();
}

function renderAdminDuesManager() {
  var container = document.getElementById("admin-dues-roster-list");
  if (!container) return;
  container.innerHTML = "";

  var activeCount = 0;
  var lapsedCount = 0;
  var revenueCollected = 0;

  appState.users.forEach(function(u, idx) {
    var isPaid = u.membershipStatus === "active";
    if (isPaid) {
      activeCount++;
      var fee = (u.category === "Child" ? appState.duesConfig.juniorFee : appState.duesConfig.adultFee);
      if (u.membershipTier === "Life") fee = 0;
      revenueCollected += fee;
    } else {
      lapsedCount++;
    }

    var row = document.createElement("div");
    row.style.cssText = "display:flex; justify-content:space-between; align-items:center; background:#0f172a; padding:6px 8px; border-radius:6px; margin-bottom:4px; font-size:10px;";
    row.innerHTML = 
      "<div><strong>" + u.name + "</strong> (" + u.membershipTier + ")<br><span style='color:" + (isPaid ? "var(--green)" : "#ef4444") + "; font-weight:700;'>" + (isPaid ? "✓ Paid (" + (u.membershipSeason || "26/27") + ")" : "🔴 Lapsed / Overdue") + "</span></div>" +
      "<div style='display:flex; gap:4px;'>" +
        (isPaid ? 
          "<button class='btn btn-outline btn-sm' style='padding:2px 6px; font-size:9px; color:#ef4444;' onclick='window.adminToggleMemberDues(" + idx + ", false)'>Revoke</button>" : 
          "<button class='btn btn-gold btn-sm' style='padding:2px 6px; font-size:9px;' onclick='window.adminToggleMemberDues(" + idx + ", true)'>Mark Paid</button>") +
      "</div>";
    container.appendChild(row);
  });

  document.getElementById("dues-metrics-box").innerHTML = 
    "<span>Active: <strong style='color:var(--green);'>" + activeCount + "</strong></span> | " +
    "<span>Lapsed: <strong style='color:#ef4444;'>" + lapsedCount + "</strong></span> | " +
    "<span>Total Subs Revenue: <strong style='color:var(--safc-gold);'>£" + revenueCollected.toFixed(2) + "</strong></span>";

  document.getElementById("cfg-season-name").value = appState.duesConfig.activeSeason;
  document.getElementById("cfg-adult-fee").value = appState.duesConfig.adultFee;
  document.getElementById("cfg-junior-fee").value = appState.duesConfig.juniorFee;
  document.getElementById("cfg-enforce-gate").checked = appState.duesConfig.enforceDuesGate;
}

window.saveMembershipConfig = function() {
  appState.duesConfig.activeSeason = document.getElementById("cfg-season-name").value.trim() || "2026/27";
  appState.duesConfig.adultFee = parseFloat(document.getElementById("cfg-adult-fee").value) || 15.00;
  appState.duesConfig.juniorFee = parseFloat(document.getElementById("cfg-junior-fee").value) || 5.00;
  appState.duesConfig.enforceDuesGate = document.getElementById("cfg-enforce-gate").checked;
  saveState();
  window.refreshAllViews();
  alert("Membership tiers and policy updated!");
};

window.adminToggleMemberDues = function(idx, setPaid) {
  var user = appState.users[idx];
  if (setPaid) {
    user.membershipStatus = "active";
    user.membershipSeason = appState.duesConfig.activeSeason;
    user.validUntil = "2027-07-31";
    logForensicTransaction("Graham (Secretary)", "Admin", user.name, "SUBS_WAIVE", "Manually verified & set active for " + user.name, 0, 0, 0);
    alert(user.name + " set to Active.");
  } else {
    user.membershipStatus = "lapsed";
    logForensicTransaction("Graham (Secretary)", "Admin", user.name, "SUBS_REVOKE", "Revoked active membership for " + user.name, 0, 0, 0);
    alert(user.name + " set to Lapsed.");
  }
  saveState();
  window.refreshAllViews();
};

window.exportDuesCSV = function() {
  var csv = "Member Name,Member Number,Category,Tier,Status,Season,Valid Until\n";
  appState.users.forEach(function(u) {
    csv += '"' + u.name + '","' + u.memberNo + '","' + u.category + '","' + (u.membershipTier || "Adult") + '","' + u.membershipStatus.toUpperCase() + '","' + (u.membershipSeason || "2026/27") + '","' + (u.validUntil || "2027-07-31") + '"\n';
  });
  var blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  var url = window.URL.createObjectURL(blob);
  var a = document.createElement("a");
  a.setAttribute("href", url);
  a.setAttribute("download", "Coxhoe_Branch_Membership_Subs_Roster.csv");
  a.click();
};

window.publishAdminAnnouncement = function() {
  var title = document.getElementById("admin-post-title").value.trim();
  var content = document.getElementById("admin-post-content").value.trim();
  var isUrgent = document.getElementById("admin-post-urgent").checked;

  if (!title || !content) { alert("Please enter title and content."); return; }

  if (isUrgent) {
    appState.announcements.forEach(function(a) { a.isUrgent = false; });
  }

  appState.announcements.unshift({
    id: Date.now(),
    title: title,
    date: new Date().toISOString().substring(0, 10),
    isUrgent: isUrgent,
    content: content,
    reactions: 0
  });

  logForensicTransaction("Graham (Secretary)", "Admin", "All Members", "BROADCAST", "Published announcement: " + title + (isUrgent ? " [URGENT]" : ""), 0, 0, 0);

  document.getElementById("admin-post-title").value = "";
  document.getElementById("admin-post-content").value = "";
  document.getElementById("admin-post-urgent").checked = false;

  saveState();
  window.refreshAllViews();
  alert("Announcement published!");
};

function renderAdminDisciplinaryBoard() {
  var container = document.getElementById("admin-disciplinary-board");
  if (!container) return;
  container.innerHTML = "";

  if (appState.moderation.incidents.length === 0) {
    container.innerHTML = "<div style='color:#94a3b8; font-size:10px;'>No disciplinary infractions on record.</div>";
    return;
  }

  var activeAdmin = appState.currentUser.name;

  appState.moderation.incidents.forEach(function(inc) {
    if (!inc.internalDiscussion) inc.internalDiscussion = [];
    if (!inc.votes) inc.votes = {};

    var reinstateVotes = 0;
    var upholdVotes = 0;
    var voters = Object.keys(inc.votes);
    voters.forEach(function(v) {
      if (inc.votes[v] === "reinstate") reinstateVotes++;
      if (inc.votes[v] === "uphold") upholdVotes++;
    });

    var myVote = inc.votes[activeAdmin] || null;
    var isResolved = inc.status !== "active_ban";

    var card = document.createElement("div");
    card.style.cssText = "background:#0f172a; border:1px solid #334155; padding:10px; border-radius:8px; margin-bottom:10px; font-size:11px;";
    card.innerHTML = 
      "<div style='display:flex; justify-content:space-between; margin-bottom:4px;'>" +
        "<strong>Case #" + inc.id + " • " + inc.member + "</strong>" +
        "<span style='color:" + (inc.status === "active_ban" ? "#ef4444" : "var(--green)") + "; font-weight:800;'>" + inc.status.toUpperCase() + "</span>" +
      "</div>" +
      "<div style='color:var(--safc-gold); font-size:10px; margin-bottom:4px;'>Charge: " + inc.reason + " (" + inc.timestamp + ")</div>" +
      "<div style='background:#1e293b; padding:6px; border-radius:4px; margin-bottom:6px; font-family:monospace; font-size:10px;'>\"" + inc.offendingText + "\"</div>" +
      "<button class='btn btn-outline btn-sm' style='padding:3px 6px; font-size:9px; margin-bottom:6px;' onclick='window.toggleTranscriptModal(\"" + inc.id + "\")'>📜 Inspect Full Conversation Transcript</button>" +
      "<div style='background:#141d2e; padding:6px 8px; border-radius:6px; margin-bottom:6px; font-size:10px; border-left:2px solid var(--safc-gold);'>" +
        "<strong>Committee Quorum (2 Votes to Reinstate):</strong><br>" +
        "• Votes to Reinstate: <strong style='color:var(--green);'>" + reinstateVotes + " / 2</strong><br>" +
        "• Votes to Uphold Ban: <strong style='color:#ef4444;'>" + upholdVotes + "</strong><br>" +
        (voters.length > 0 ? "<span style='color:#94a3b8;'>Votes cast: " + voters.map(function(v){ return v + " (" + inc.votes[v] + ")"; }).join(", ") + "</span>" : "<span style='color:#94a3b8;'>No committee votes recorded yet.</span>") +
      "</div>" +
      (!isResolved ? 
        "<div style='display:flex; gap:4px; margin-bottom:6px;'>" +
          "<button class='btn btn-gold btn-sm' style='flex:1; padding:4px;' onclick='window.castCommitteeVote(\"" + inc.id + "\", \"reinstate\")'>" + (myVote === "reinstate" ? "✓ Voted Reinstate" : "Vote to Reinstate") + "</button>" +
          "<button class='btn btn-outline btn-sm' style='flex:1; padding:4px; color:#ef4444;' onclick='window.castCommitteeVote(\"" + inc.id + "\", \"uphold\")'>" + (myVote === "uphold" ? "✓ Voted Uphold" : "Vote to Uphold Ban") + "</button>" +
        "</div>" : "<div style='color:var(--green); font-weight:800; font-size:10px; margin-bottom:6px;'>CASE RESOLVED BY COMMITTEE QUORUM</div>") +
      "<div style='border-top:1px solid #334155; padding-top:6px;'>" +
        "<strong style='font-size:10px;'>Committee Deliberation & Notes:</strong>" +
        "<div style='margin:4px 0; max-height:60px; overflow-y:auto; font-size:10px; color:#cbd5e1;'>" +
          (inc.internalDiscussion.length === 0 ? "<span style='color:#94a3b8;'>No deliberation notes added.</span>" : inc.internalDiscussion.map(function(n){ return "<div><strong>" + n.author + ":</strong> " + n.text + "</div>"; }).join("")) +
        "</div>" +
        "<button class='btn btn-outline btn-sm' style='padding:2px 6px; font-size:9px;' onclick='window.addCommitteeNote(\"" + inc.id + "\")'>+ Add Deliberation Note</button>" +
      "</div>";
    container.appendChild(card);
  });
}

window.addCommitteeNote = function(incId) {
  var note = prompt("Enter deliberation note for committee review:");
  if (!note || !note.trim()) return;
  var inc = appState.moderation.incidents.find(function(i) { return String(i.id) === String(incId); });
  if (inc) {
    if (!Array.isArray(inc.internalDiscussion)) inc.internalDiscussion = [];
    inc.internalDiscussion.push({ author: appState.currentUser.name, time: new Date().toTimeString().substring(0, 5), text: note.trim() });
    saveState();
    renderAdminDisciplinaryBoard();
  }
};

window.castCommitteeVote = function(incId, voteType) {
  var inc = appState.moderation.incidents.find(function(i) { return String(i.id) === String(incId); });
  if (!inc) return;
  var activeAdmin = appState.currentUser.name;

  if (!inc.votes) inc.votes = {};
  inc.votes[activeAdmin] = voteType;

  var reinstateCount = 0;
  Object.keys(inc.votes).forEach(function(v) { if (inc.votes[v] === "reinstate") reinstateCount++; });

  if (reinstateCount >= 2) {
    inc.status = "reinstated";
    appState.moderation.mutedMembers = appState.moderation.mutedMembers.filter(function(m) { return m !== inc.member; });
    appState.moderation.revokedMembers = appState.moderation.revokedMembers.filter(function(m) { return m !== inc.member; });
    appState.moderation.strikes[inc.member] = 0;
    alert("🎉 COMMITTEE QUORUM REACHED (2+ Votes):\n\nCommittee has formally voted to reinstate messaging for " + inc.member + ".");
  } else {
    alert("Your vote (" + voteType.toUpperCase() + ") has been recorded.\nCurrent tally: " + reinstateCount + " / 2 required.");
  }

  saveState();
  renderAdminDisciplinaryBoard();
  renderMatchdayBusChat();
  updateCommsBadge();
};

window.toggleTranscriptModal = function(incId) {
  var inc = appState.moderation.incidents.find(function(i) { return String(i.id) === String(incId); });
  if (!inc) return;
  var modal = document.getElementById("modal-transcript");
  var body = document.getElementById("transcript-body");
  
  body.innerHTML = 
    "<div style='font-size:11px; margin-bottom:8px; color:var(--safc-gold);'><strong>Complete Conversation Transcript (Scroll up to view earlier context):</strong></div>" +
    "<div id='transcript-scroll-area' style='max-height:300px; overflow-y:auto; padding-right:4px;'>" +
    inc.transcriptContext.map(function(line){
      var isFlag = line.indexOf("[FLAGGED") !== -1;
      return "<div style='background:" + (isFlag ? "#7f1d1d" : "#0f172a") + "; padding:6px 8px; border-radius:4px; margin-bottom:4px; font-family:monospace; font-size:10px; border-left:3px solid " + (isFlag ? "#ef4444" : "transparent") + ";'>" + line + "</div>";
    }).join("") +
    "</div>";

  modal.style.display = "flex";
  setTimeout(function() {
    var scrollArea = document.getElementById("transcript-scroll-area");
    if (scrollArea) scrollArea.scrollTop = scrollArea.scrollHeight;
  }, 50);
};

window.closeTranscriptModal = function() {
  document.getElementById("modal-transcript").style.display = "none";
};

window.toggleMyOnCallStatus = function() {
  var current = appState.currentUser.name;
  appState.committeeOnCall[current] = !(appState.committeeOnCall[current] !== false);
  saveState();
  renderAdminDrawer();
};

window.adminForceLinkParent = function(childName) {
  var parentName = prompt("Enter parent full name to link with " + childName + ":", "Gary Miller");
  if (!parentName) return;
  appState.friendsAndFamily.push({
    id: Date.now(), owner: parentName, targetName: childName, type: "Child", memberNo: "COX-085", relation: "Child", status: "approved"
  });
  appState.friendsAndFamily.push({
    id: Date.now() + 1, owner: childName, targetName: parentName, type: "Adult", memberNo: "COX-084", relation: "Parent", status: "approved"
  });
  saveState();
  renderAdminDrawer();
  alert("Verified parent linkage established. " + childName + "'s account is now active.");
};

window.adminApproveLink = function(reqId) {
  var req = appState.pendingLinkRequests.find(function(r) { return r.id === reqId; });
  if (req) {
    req.status = "approved";
    saveState();
    renderAdminDrawer();
    updateCommsBadge();
  }
};

window.adminRejectLink = function(reqId) {
  appState.pendingLinkRequests = appState.pendingLinkRequests.filter(function(r) { return r.id !== reqId; });
  saveState();
  renderAdminDrawer();
  updateCommsBadge();
};

function renderAdminLinkRectifierDropdown() {
  var sel = document.getElementById("admin-rectifier-member-select");
  if (!sel) return;
  var curVal = sel.value;
  sel.innerHTML = "";
  appState.users.forEach(function(u) {
    var opt = document.createElement("option");
    opt.value = u.name;
    opt.textContent = u.name + " (" + u.memberNo + ")";
    if (curVal && curVal === u.name) opt.selected = true;
    sel.appendChild(opt);
  });
  if (!curVal && appState.users.length > 0) sel.value = appState.users[0].name;
}

window.renderAdminLinkRectifier = function() {
  var container = document.getElementById("admin-link-rectifier-list");
  var sel = document.getElementById("admin-rectifier-member-select");
  if (!container || !sel) return;
  container.innerHTML = "";
  var selectedMember = sel.value;
  var filteredLinks = appState.friendsAndFamily.filter(function(l) {
    return l.owner === selectedMember || l.targetName === selectedMember;
  });
  if (filteredLinks.length === 0) {
    container.innerHTML = "<div style='color:#94a3b8; font-size:11px; padding:4px 0;'>No connections for " + selectedMember + ".</div>";
    return;
  }
  filteredLinks.forEach(function(link) {
    var realIdx = appState.friendsAndFamily.indexOf(link);
    var row = document.createElement("div");
    row.style.cssText = "background:#0f172a; padding:6px 8px; border-radius:6px; margin-bottom:4px; font-size:10px;";
    row.innerHTML = 
      "<div style='display:flex; justify-content:space-between; margin-bottom:2px;'>" +
        "<strong>" + link.owner + " ➔ " + link.targetName + " (" + link.type + ")</strong>" +
        "<span style='color:var(--safc-gold);'>" + link.relation + "</span>" +
      "</div>" +
      "<div style='display:flex; gap:4px;'>" +
        "<button class='btn btn-outline btn-sm' style='padding:1px 5px; font-size:9px;' onclick='window.adminToggleLinkCategory(" + realIdx + ")'>Switch Category</button>" +
        "<button class='btn btn-outline btn-sm' style='padding:1px 5px; font-size:9px; color:#ef4444;' onclick='window.adminForceDeleteLink(" + realIdx + ")'>Remove</button>" +
      "</div>";
    container.appendChild(row);
  });
};

window.adminToggleLinkCategory = function(idx) {
  var link = appState.friendsAndFamily[idx];
  link.type = (link.type === "Adult") ? "Child" : "Adult";
  saveState();
  renderAdminLinkRectifier();
};

window.adminForceDeleteLink = function(idx) {
  if (confirm("Remove this link?")) {
    appState.friendsAndFamily.splice(idx, 1);
    saveState();
    renderAdminLinkRectifier();
  }
};

window.adminManualBalanceOverride = function() {
  var memberName = document.getElementById("admin-override-user").value;
  var amount = parseFloat(document.getElementById("admin-override-amount").value) || 0;
  var reason = document.getElementById("admin-override-reason").value.trim() || "Administrative correction";
  if (amount === 0) return;
  var targetUser = appState.users.find(function(u) { return u.name === memberName; });
  if (!targetUser) return;
  targetUser.balance += amount;
  logForensicTransaction("Graham (Secretary)", "Admin", memberName, "BALANCE_OVERRIDE", reason + " (" + (amount > 0 ? "+£" : "-£") + Math.abs(amount).toFixed(2) + ")", amount < 0 ? Math.abs(amount) : 0, amount > 0 ? amount : 0, 0);
  saveState();
  renderAdminDrawer();
  alert("Balance adjusted by £" + amount.toFixed(2) + " for " + memberName);
};

function renderManifest() {
  var list = document.getElementById("manifest-list");
  if (!list) return;
  list.innerHTML = "";
  appState.bookings.forEach(function(b, idx) {
    var row = document.createElement("div");
    row.style.cssText = "display:flex; justify-content:space-between; align-items:center; background:#0f172a; padding:6px 8px; border-radius:6px; margin-bottom:4px; font-size:10px;";
    row.innerHTML = 
      "<div><strong>" + b.name + "</strong> (" + (b.adults + b.juniors) + " seats - " + b.stop + ")</div>" +
      "<button class='btn btn-sm " + (b.boarded ? "btn-outline" : "btn-red") + "' style='padding:2px 6px; font-size:9px;' onclick='window.toggleBoarded(" + idx + ")'>" + (b.boarded ? "✓ Boarded" : "Check In") + "</button>";
    list.appendChild(row);
  });
}

window.toggleBoarded = function(idx) {
  appState.bookings[idx].boarded = !appState.bookings[idx].boarded;
  saveState();
  renderManifest();
  renderHUDView();
};

window.exportManifestCSV = function() {
  var csv = "Passenger Name,Pickup Stop,Adults,Juniors,Total Paid,Boarded\n";
  appState.bookings.forEach(function(b) {
    csv += '"' + b.name + '","' + b.stop + '",' + b.adults + ',' + b.juniors + ',£' + b.total.toFixed(2) + ',' + (b.boarded ? "YES" : "NO") + "\n";
  });
  var blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  var url = window.URL.createObjectURL(blob);
  var a = document.createElement("a");
  a.setAttribute("href", url);
  a.setAttribute("download", "Coxhoe_Coach_Manifest.csv");
  a.click();
};

function renderAdminStopList() {
  var container = document.getElementById("admin-stops-editor");
  if (!container) return;
  container.innerHTML = "";
  appState.stops.forEach(function(s, idx) {
    var row = document.createElement("div");
    row.style.cssText = "display:flex; gap:4px; margin-bottom:4px;";
    row.innerHTML = 
      "<input type='text' class='form-input' style='flex:2; padding:4px 6px; font-size:10px;' value='" + s.name + "' onchange='window.updateStopName(" + idx + ", this.value)'>" +
      "<input type='text' class='form-input' style='flex:1; padding:4px 6px; font-size:10px;' value='" + s.time + "' onchange='window.updateStopTime(" + idx + ", this.value)'>" +
      "<button class='btn btn-outline btn-sm' style='padding:2px 6px; font-size:9px; color:#ef4444;' onclick='window.deleteStop(" + idx + ")'>✕</button>";
    container.appendChild(row);
  });
}

window.updateStopName = function(idx, val) { appState.stops[idx].name = val; saveState(); renderBusBookingView(); };
window.updateStopTime = function(idx, val) { appState.stops[idx].time = val; saveState(); renderBusBookingView(); };
window.addNewStop = function() { appState.stops.push({ id: Date.now(), name: "New Village Stop", time: "12:30" }); saveState(); renderAdminStopList(); renderBusBookingView(); };
window.deleteStop = function(idx) { appState.stops.splice(idx, 1); saveState(); renderAdminStopList(); renderBusBookingView(); };

function renderAdminCardSettings() {
  var sizeSel = document.getElementById("admin-card-size");
  var priceInp = document.getElementById("admin-card-price");
  var modeSel = document.getElementById("admin-prize-mode");
  if (!sizeSel) return;
  sizeSel.value = appState.cardConfig.size.toString();
  priceInp.value = appState.cardConfig.pricePerSquare;
  modeSel.value = appState.cardConfig.prizeMode;
}

window.saveCardSettings = function() {
  var sizeChoice = parseInt(document.getElementById("admin-card-size").value) || 40;
  var price = parseFloat(document.getElementById("admin-card-price").value) || 2.00;
  var mode = document.getElementById("admin-prize-mode").value;
  appState.cardConfig = {
    size: sizeChoice,
    pricePerSquare: price,
    prizeMode: mode,
    prizePct: 50,
    prizeFixed: 50.00,
    activeClubs: shuffleArray(MASTER_CLUBS).slice(0, sizeChoice)
  };
  saveState();
  renderFootballCard();
  alert("Football Card settings saved with " + sizeChoice + " teams!");
};

window.drawCardWinner = function() {
  var claimed = Object.keys(appState.cardClaims);
  if (claimed.length === 0) { alert("No squares sold yet!"); return; }
  var winning = claimed[Math.floor(Math.random() * claimed.length)];
  var winner = appState.cardClaims[winning];
  
  var fin = calculateCardFinancials();
  var prize = fin.winnerPrize;

  var winnerUser = appState.users.find(function(u) { return u.name === winner; });
  if (winnerUser) winnerUser.balance += prize;

  logForensicTransaction("Graham (Secretary)", "Admin", winner, "CARD_WINNER_PAYOUT", "Awarded Football Card prize (" + winning + ")", 0, prize, fin.branchProfit);
  alert("🏆 WINNING TEAM: " + winning.toUpperCase() + "!\nWinner: " + winner + " wins £" + prize.toFixed(2) + " deposited directly to wallet.");
  
  appState.cardClaims = {};
  appState.cardConfig.activeClubs = shuffleArray(MASTER_CLUBS).slice(0, appState.cardConfig.size);
  saveState();
  window.refreshAllViews();
};

function renderAuditLogView() {
  var container = document.getElementById("admin-audit-log-list");
  if (!container) return;
  container.innerHTML = "";
  appState.masterAuditTrail.slice(0, 15).forEach(function(t) {
    var item = document.createElement("div");
    item.style.cssText = "background:#0f172a; padding:4px 6px; border-radius:4px; margin-bottom:3px; font-size:9px;";
    item.innerHTML = "<strong>" + t.txnId + " • " + t.category + ":</strong> " + t.desc + " (" + t.actor + ")";
    container.appendChild(item);
  });
}

window.exportMasterAuditCSV = function() {
  var csv = "Txn ID,Timestamp,Actor,Role,Target,Category,Description,Debit,Credit,Branch Impact,Balance After\n";
  appState.masterAuditTrail.forEach(function(t) {
    csv += '"' + t.txnId + '","' + t.timestamp + '","' + t.actor + '","' + t.role + '","' + t.target + '","' + t.category + '","' + t.desc.replace(/"/g, '""') + '",£' + t.debit.toFixed(2) + ',£' + t.credit.toFixed(2) + ',£' + t.branchImpact.toFixed(2) + ',£' + t.balanceAfter.toFixed(2) + "\n";
  });
  var blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  var url = window.URL.createObjectURL(blob);
  var a = document.createElement("a");
  a.setAttribute("href", url);
  a.setAttribute("download", "Coxhoe_Branch_Master_Audit.csv");
  a.click();
};

var pendingConfirmAction = null;
window.showConfirmDialog = function(title, html, onConfirm) {
  document.getElementById("modal-title").textContent = title;
  document.getElementById("modal-details").innerHTML = html;
  pendingConfirmAction = onConfirm;
  document.getElementById("modal-confirm").style.display = "flex";
};

window.closeConfirmModal = function() {
  document.getElementById("modal-confirm").style.display = "none";
  pendingConfirmAction = null;
};

window.executeConfirmModal = function() {
  if (pendingConfirmAction) pendingConfirmAction();
  window.closeConfirmModal();
};

window.openAdminModal = function() { document.getElementById("admin-drawer").style.display = "flex"; };
window.closeAdminModal = function() { document.getElementById("admin-drawer").style.display = "none"; };

window.onload = function() { window.refreshAllViews(); };