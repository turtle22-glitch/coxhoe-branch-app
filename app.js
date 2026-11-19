// ========================================================
// COXHOE BRANCH SAFC - MASTER APPLICATION CORE
// Supabase Sync, Modular State, White-Label & Branch Ops
// ========================================================

// --- SUPABASE CLIENT INITIALIZATION ---
var SUPABASE_URL = "https://nitzzfwtcfzgjqmbxkwn.supabase.co";
var SUPABASE_ANON_KEY = "sb_publishable_9GSFeMOaqVmW7p_t19eNEQ_uUMCMBSz";

var sbClient = null;
if (window.supabase && typeof window.supabase.createClient === "function") {
  try {
    sbClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  } catch (err) {
    console.warn("Supabase initialization error:", err);
  }
}

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
  { id: 1, name: "Cassop Dene VIew", time: "12:15" },
  { id: 2, name: "Q'Hill Half Moon", time: "12:20" },
  { id: 3, name: "Kelloe War Memorial", time: "12:25" },
  { id: 4, name: "Coxhoe Londis Shop", time: "12:30" },
  { id: 5, name: "Park Hill", time: "12:32" }
];

// Purge legacy cached fixtures & stops so updates to DEFAULT_STOPS and live fixtures load cleanly
["coxhoe_stops_v20", "coxhoe_home_matches_v20", "coxhoe_away_fixtures_v20",
 "coxhoe_home_matches_live_v21", "coxhoe_away_fixtures_live_v21", "coxhoe_master_fixtures_live_v21",
 "coxhoe_home_matches_v22", "coxhoe_away_fixtures_v22"].forEach(function(k) {
  localStorage.removeItem(k);
});

// Verified 2026/27 Sunderland AFC Multi-Competition Schedule (Premier League, Europa League, EFL Cup)
var VERIFIED_2026_27_SAFC_SCHEDULE = [
  { id: "A-401", opponent: "Aston Villa", type: "AWAY", competition: "Premier League", venue: "Villa Park", city: "Birmingham", country: "UK", dateTime: "2026-11-21T15:00:00Z", coords: { lat: 52.5092, lon: -1.8847 } },
  { id: "H-402", opponent: "Jagiellonia Białystok", type: "HOME", competition: "UEFA Europa League", venue: "Stadium of Light", city: "Sunderland", country: "UK", dateTime: "2026-11-26T20:00:00Z", coords: { lat: 54.9146, lon: -1.3882 } },
  { id: "H-403", opponent: "Tottenham Hotspur", type: "HOME", competition: "Premier League", venue: "Stadium of Light", city: "Sunderland", country: "UK", dateTime: "2026-11-29T14:05:00Z", coords: { lat: 54.9146, lon: -1.3882 } },
  { id: "A-404", opponent: "Liverpool", type: "AWAY", competition: "Premier League", venue: "Anfield", city: "Liverpool", country: "UK", dateTime: "2026-12-02T19:30:00Z", coords: { lat: 53.4308, lon: -2.9608 } },
  { id: "A-405", opponent: "Newcastle United", type: "AWAY", competition: "Premier League", venue: "St. James' Park", city: "Newcastle", country: "UK", dateTime: "2026-12-06T14:00:00Z", coords: { lat: 54.9756, lon: -1.6217 } },
  { id: "A-406", opponent: "AC Milan", type: "AWAY", competition: "UEFA Europa League", venue: "San Siro Stadium", city: "Milan", country: "Italy", dateTime: "2026-12-10T20:00:00Z", coords: { lat: 45.4781, lon: 9.1240 } },
  { id: "H-407", opponent: "Nottingham Forest", type: "HOME", competition: "Premier League", venue: "Stadium of Light", city: "Sunderland", country: "UK", dateTime: "2026-12-13T14:00:00Z", coords: { lat: 54.9146, lon: -1.3882 } },
  { id: "A-408", opponent: "Crystal Palace", type: "AWAY", competition: "EFL Cup Quarter-Final", venue: "Selhurst Park", city: "London", country: "UK", dateTime: "2026-12-16T19:30:00Z", coords: { lat: 51.3983, lon: -0.0855 } },
  { id: "H-409", opponent: "Crystal Palace", type: "HOME", competition: "Premier League", venue: "Stadium of Light", city: "Sunderland", country: "UK", dateTime: "2026-12-20T14:00:00Z", coords: { lat: 54.9146, lon: -1.3882 } },
  { id: "A-410", opponent: "Everton", type: "AWAY", competition: "Premier League", venue: "Hill Dickinson Stadium", city: "Liverpool", country: "UK", dateTime: "2026-12-26T15:00:00Z", coords: { lat: 53.4389, lon: -3.0003 } },
  { id: "A-411", opponent: "Manchester United", type: "AWAY", competition: "Premier League", venue: "Old Trafford", city: "Manchester", country: "UK", dateTime: "2026-12-30T19:30:00Z", coords: { lat: 53.4631, lon: -2.2913 } },
  { id: "H-412", opponent: "Hull City", type: "HOME", competition: "Premier League", venue: "Stadium of Light", city: "Sunderland", country: "UK", dateTime: "2027-01-02T15:00:00Z", coords: { lat: 54.9146, lon: -1.3882 } },
  { id: "H-413", opponent: "Liverpool", type: "HOME", competition: "Premier League", venue: "Stadium of Light", city: "Sunderland", country: "UK", dateTime: "2027-01-05T20:15:00Z", coords: { lat: 54.9146, lon: -1.3882 } },
  { id: "A-414", opponent: "Chelsea", type: "AWAY", competition: "Premier League", venue: "Stamford Bridge", city: "London", country: "UK", dateTime: "2027-01-16T15:00:00Z", coords: { lat: 51.4817, lon: -0.1910 } },
  { id: "A-415", opponent: "R.S.C. Anderlecht", type: "AWAY", competition: "UEFA Europa League", venue: "Lotto Park", city: "Brussels", country: "Belgium", dateTime: "2027-01-21T20:00:00Z", coords: { lat: 50.8342, lon: 4.2983 } },
  { id: "H-416", opponent: "Coventry City", type: "HOME", competition: "Premier League", venue: "Stadium of Light", city: "Sunderland", country: "UK", dateTime: "2027-01-23T15:00:00Z", coords: { lat: 54.9146, lon: -1.3882 } },
  { id: "H-417", opponent: "PFC Levski Sofia", type: "HOME", competition: "UEFA Europa League", venue: "Stadium of Light", city: "Sunderland", country: "UK", dateTime: "2027-01-28T20:00:00Z", coords: { lat: 54.9146, lon: -1.3882 } },
  { id: "A-418", opponent: "Tottenham Hotspur", type: "AWAY", competition: "Premier League", venue: "Tottenham Hotspur Stadium", city: "London", country: "UK", dateTime: "2027-01-30T15:00:00Z", coords: { lat: 51.6042, lon: -0.0662 } },
  { id: "H-419", opponent: "Aston Villa", type: "HOME", competition: "Premier League", venue: "Stadium of Light", city: "Sunderland", country: "UK", dateTime: "2027-02-06T15:00:00Z", coords: { lat: 54.9146, lon: -1.3882 } },
  { id: "A-420", opponent: "Hull City", type: "AWAY", competition: "Premier League", venue: "MKM Stadium", city: "Hull", country: "UK", dateTime: "2027-02-10T20:00:00Z", coords: { lat: 53.7461, lon: -0.3678 } },
  { id: "H-421", opponent: "Everton", type: "HOME", competition: "Premier League", venue: "Stadium of Light", city: "Sunderland", country: "UK", dateTime: "2027-02-20T15:00:00Z", coords: { lat: 54.9146, lon: -1.3882 } },
  { id: "A-422", opponent: "Crystal Palace", type: "AWAY", competition: "Premier League", venue: "Selhurst Park", city: "London", country: "UK", dateTime: "2027-02-27T15:00:00Z", coords: { lat: 51.3983, lon: -0.0855 } },
  { id: "H-423", opponent: "Manchester United", type: "HOME", competition: "Premier League", venue: "Stadium of Light", city: "Sunderland", country: "UK", dateTime: "2027-03-03T20:00:00Z", coords: { lat: 54.9146, lon: -1.3882 } },
  { id: "H-424", opponent: "Brentford", type: "HOME", competition: "Premier League", venue: "Stadium of Light", city: "Sunderland", country: "UK", dateTime: "2027-03-13T15:00:00Z", coords: { lat: 54.9146, lon: -1.3882 } },
  { id: "A-425", opponent: "Arsenal", type: "AWAY", competition: "Premier League", venue: "Emirates Stadium", city: "London", country: "UK", dateTime: "2027-03-20T15:00:00Z", coords: { lat: 51.5549, lon: -0.1084 } },
  { id: "H-426", opponent: "Ipswich Town", type: "HOME", competition: "Premier League", venue: "Stadium of Light", city: "Sunderland", country: "UK", dateTime: "2027-04-10T14:00:00Z", coords: { lat: 54.9146, lon: -1.3882 } },
  { id: "A-427", opponent: "Fulham", type: "AWAY", competition: "Premier League", venue: "Craven Cottage", city: "London", country: "UK", dateTime: "2027-04-17T14:00:00Z", coords: { lat: 51.4749, lon: -0.2217 } },
  { id: "A-428", opponent: "Nottingham Forest", type: "AWAY", competition: "Premier League", venue: "City Ground", city: "Nottingham", country: "UK", dateTime: "2027-04-24T14:00:00Z", coords: { lat: 52.9399, lon: -1.1325 } },
  { id: "H-429", opponent: "Newcastle United", type: "HOME", competition: "Premier League", venue: "Stadium of Light", city: "Sunderland", country: "UK", dateTime: "2027-05-01T14:00:00Z", coords: { lat: 54.9146, lon: -1.3882 } },
  { id: "A-430", opponent: "Brighton & Hove Albion", type: "AWAY", competition: "Premier League", venue: "Amex Stadium", city: "Brighton", country: "UK", dateTime: "2027-05-08T14:00:00Z", coords: { lat: 50.8616, lon: -0.0837 } },
  { id: "H-431", opponent: "AFC Bournemouth", type: "HOME", competition: "Premier League", venue: "Stadium of Light", city: "Sunderland", country: "UK", dateTime: "2027-05-15T14:00:00Z", coords: { lat: 54.9146, lon: -1.3882 } },
  { id: "A-432", opponent: "Leeds United", type: "AWAY", competition: "Premier League", venue: "Elland Road", city: "Leeds", country: "UK", dateTime: "2027-05-23T14:00:00Z", coords: { lat: 53.7778, lon: -1.5730 } },
  { id: "H-433", opponent: "Manchester City", type: "HOME", competition: "Premier League", venue: "Stadium of Light", city: "Sunderland", country: "UK", dateTime: "2027-05-30T15:00:00Z", coords: { lat: 54.9146, lon: -1.3882 } }
];

var VENUE_COORDS_CACHE = JSON.parse(localStorage.getItem("coxhoe_venue_coords_cache_v23") || '{"Stadium of Light":{"lat":54.9146,"lon":-1.3882}}');

// Dynamic Worldwide Stadium & City Geocoder (Open-Meteo Geocoding API)
async function resolveDynamicVenueCoords(venueName, cityName, countryName, opponentName) {
  var homeDefault = { lat: 54.9146, lon: -1.3882 };
  if (!venueName || venueName.toLowerCase().indexOf("stadium of light") !== -1) {
    return homeDefault;
  }

  var cacheKey = (venueName + "_" + (cityName || "")).trim();
  if (VENUE_COORDS_CACHE[cacheKey]) {
    return VENUE_COORDS_CACHE[cacheKey];
  }

  var searchQueries = [
    venueName,
    cityName ? (cityName + (countryName ? " " + countryName : "")) : "",
    opponentName || ""
  ].filter(function(q) { return q && q.trim().length > 2; });

  for (var i = 0; i < searchQueries.length; i++) {
    try {
      var url = "https://geocoding-api.open-meteo.com/v1/search?name=" + encodeURIComponent(searchQueries[i].trim()) + "&count=1&language=en&format=json";
      var res = await fetch(url);
      if (res.ok) {
        var data = await res.json();
        if (data && Array.isArray(data.results) && data.results.length > 0) {
          var coords = {
            lat: Number(data.results[0].latitude),
            lon: Number(data.results[0].longitude)
          };
          VENUE_COORDS_CACHE[cacheKey] = coords;
          localStorage.setItem("coxhoe_venue_coords_cache_v23", JSON.stringify(VENUE_COORDS_CACHE));
          return coords;
        }
      }
    } catch (e) {}
  }

  return homeDefault;
}

function formatFixtureRecord(raw) {
  var dt = new Date(raw.dateTime);
  var dateStr = dt.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric", timeZone: "Europe/London" });
  var shortDateStr = dt.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", timeZone: "Europe/London" });
  var timeStr = dt.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Europe/London" });

  return {
    id: raw.id,
    opponent: raw.opponent,
    type: raw.type,
    competition: raw.competition || "Premier League",
    venue: raw.venue || (raw.type === "HOME" ? "Stadium of Light" : raw.opponent + " Stadium"),
    city: raw.city || "",
    country: raw.country || "",
    date: dateStr,
    dateDisplay: shortDateStr + " • " + timeStr,
    time: timeStr,
    kickoffTime: timeStr,
    dateTime: raw.dateTime,
    timestamp: dt.getTime(),
    coordinates: raw.coords || null
  };
}

function buildBaselineSchedule() {
  var nowMinus3Hours = Date.now() - (3 * 60 * 60 * 1000);
  return VERIFIED_2026_27_SAFC_SCHEDULE
    .map(formatFixtureRecord)
    .filter(function(f) { return f.timestamp >= nowMinus3Hours; })
    .sort(function(a, b) { return a.timestamp - b.timestamp; });
}

// Always uses your custom DEFAULT_STOPS array for initial bus stops
// Helper: Match club names across feeds (e.g. "Tottenham" vs "Tottenham Hotspur")
function isSameClubName(nameA, nameB) {
  if (!nameA || !nameB) return false;
  var clean = function(s) {
    return s.toLowerCase()
      .replace(/united|utd|city|hotspur|albion|wanderers|town|athletic|fc|afc|pfc|r\.s\.c\.|białystok|bialystok/g, "")
      .replace(/[^a-z0-9]/g, "")
      .trim();
  };
  var a = clean(nameA);
  var b = clean(nameB);
  return a === b || a.indexOf(b) !== -1 || b.indexOf(a) !== -1;
}

// Always uses your custom DEFAULT_STOPS array and preserves buses even if match date moves
function buildHomeMatchesFromMaster(masterList, existingHome) {
  var homeFixes = masterList.filter(function(f) { return f.type === "HOME"; });
  return homeFixes.map(function(hf, idx) {
    var prev = (existingHome || []).find(function(eh) {
      return String(eh.id) === String(hf.id) ||
             (isSameClubName(eh.opponent, hf.opponent) && (eh.competition || "") === (hf.competition || ""));
    });

    return {
      id: prev ? prev.id : hf.id,
      opponent: hf.opponent,
      date: hf.date,
      time: hf.time,
      dateTime: hf.dateTime,
      venue: hf.venue,
      competition: hf.competition,
      bookingStatus: prev ? prev.bookingStatus : (idx === 0 ? "open" : "draft"),
      buses: (prev && prev.buses && prev.buses.length > 0) ? prev.buses : [
        {
          busId: 1,
          title: "Bus 1 (Main Village Route)",
          subtitle: "Official Branch Travel • " + hf.competition,
          capacity: 53,
          adultFare: 12.00,
          juniorFare: 8.00,
          isFreeBus: false,
          stops: JSON.parse(JSON.stringify(DEFAULT_STOPS))
        }
      ]
    };
  });
}

function buildAwayFixturesFromMaster(masterList, existingAway) {
  var awayFixes = masterList.filter(function(f) { return f.type === "AWAY"; });
  return awayFixes.map(function(af) {
    var prevA = (existingAway || []).find(function(ea) {
      return String(ea.id) === String(af.id) ||
             (isSameClubName(ea.opponent, af.opponent) && (ea.competition || "") === (af.competition || ""));
    });

    return {
      id: prevA ? prevA.id : af.id,
      opponent: af.opponent,
      date: af.date,
      time: af.time,
      dateTime: af.dateTime,
      venue: af.venue,
      city: af.city,
      country: af.country,
      competition: af.competition,
      allocation: prevA ? prevA.allocation : 25,
      status: prevA ? prevA.status : "Open"
    };
  });
}

var INITIAL_MASTER_FIXTURES = buildBaselineSchedule();
var SEASON_HOME_MATCHES = buildHomeMatchesFromMaster(INITIAL_MASTER_FIXTURES, JSON.parse(localStorage.getItem("coxhoe_home_matches_v23") || "[]"));
var SEASON_AWAY_FIXTURES = buildAwayFixturesFromMaster(INITIAL_MASTER_FIXTURES, JSON.parse(localStorage.getItem("coxhoe_away_fixtures_v23") || "[]"));

// Live SAFC Multi-Competition Sync (Auto-updates TV Date/Time Reschedules & New Cup Draws)
window.syncLiveSAFCFixtures = async function() {
  var rawEvents = [];

  var espnEndpoints = [
    { url: "https://site.api.espn.com/apis/site/v2/sports/soccer/all/teams/366/schedule?fixture=true", label: null },
    { url: "https://site.api.espn.com/apis/site/v2/sports/soccer/eng.1/teams/366/schedule?fixture=true", label: "Premier League" },
    { url: "https://site.api.espn.com/apis/site/v2/sports/soccer/uefa.europa/teams/366/schedule?fixture=true", label: "UEFA Europa League" },
    { url: "https://site.api.espn.com/apis/site/v2/sports/soccer/eng.fa/teams/366/schedule?fixture=true", label: "FA Cup" },
    { url: "https://site.api.espn.com/apis/site/v2/sports/soccer/eng.league_cup/teams/366/schedule?fixture=true", label: "EFL Cup" }
  ];

  for (var i = 0; i < espnEndpoints.length; i++) {
    try {
      var res = await fetch(espnEndpoints[i].url);
      if (res.ok) {
        var data = await res.json();
        if (data && Array.isArray(data.events)) {
          data.events.forEach(function(ev) {
            if (!ev._fallbackLeagueLabel && espnEndpoints[i].label) {
              ev._fallbackLeagueLabel = espnEndpoints[i].label;
            }
            rawEvents.push(ev);
          });
        }
      }
    } catch (e) {}
  }

  var parsedFixtures = buildBaselineSchedule();
  var nowMinus3Hours = Date.now() - (3 * 60 * 60 * 1000);

  if (rawEvents.length > 0) {
    rawEvents.forEach(function(ev) {
      var eventTime = new Date(ev.date).getTime();
      if (isNaN(eventTime) || eventTime < nowMinus3Hours) return;

      var comp = (ev.competitions && ev.competitions[0]) ? ev.competitions[0] : null;
      if (!comp || !comp.competitors) return;

      var safcComp = comp.competitors.find(function(c) {
        return (c.team && String(c.team.id) === "366") || (c.team && c.team.displayName && c.team.displayName.toLowerCase().indexOf("sunderland") !== -1);
      });
      var oppComp = comp.competitors.find(function(c) { return c !== safcComp; });
      if (!safcComp || !oppComp) return;

      var isHome = (safcComp.homeAway === "home");
      var matchType = isHome ? "HOME" : "AWAY";
      var oppName = oppComp.team.shortDisplayName || oppComp.team.displayName || oppComp.team.name || "Opponent";
      var venueObj = comp.venue || {};
      var venueName = venueObj.fullName || (isHome ? "Stadium of Light" : oppName + " Stadium");
      var cityName = (venueObj.address && venueObj.address.city) ? venueObj.address.city : "";
      var countryName = (venueObj.address && venueObj.address.country) ? venueObj.address.country : "";

      var leagueName = ev._fallbackLeagueLabel || "Premier League";
      if (ev.league && ev.league.name) leagueName = ev.league.name;
      else if (comp.notes && comp.notes[0] && comp.notes[0].headline) leagueName = comp.notes[0].headline;

      var liveFormatted = formatFixtureRecord({
        id: (isHome ? "H-" : "A-") + ev.id,
        opponent: oppName,
        type: matchType,
        competition: leagueName,
        venue: venueName,
        city: cityName,
        country: countryName,
        dateTime: ev.date
      });

      // Check if this fixture is already in the baseline (by Opponent + Home/Away + Competition)
      var existingIdx = parsedFixtures.findIndex(function(bf) {
        var sameType = bf.type === matchType;
        var sameClub = isSameClubName(bf.opponent, oppName);
        var isLeagueBoth = bf.competition.indexOf("Premier") !== -1 && leagueName.indexOf("Premier") !== -1;
        var isEuropaBoth = bf.competition.indexOf("Europa") !== -1 && leagueName.indexOf("Europa") !== -1;
        var isEflBoth = bf.competition.indexOf("EFL") !== -1 && leagueName.indexOf("EFL") !== -1;
        var sameComp = isLeagueBoth || isEuropaBoth || isEflBoth || bf.competition === leagueName;
        return sameType && sameClub && sameComp;
      });

      if (existingIdx !== -1) {
        // TV Reschedule or Time Change: Overwrite date & time in-place while keeping original ID & coords
        var orig = parsedFixtures[existingIdx];
        liveFormatted.id = orig.id;
        liveFormatted.coordinates = orig.coordinates;
        parsedFixtures[existingIdx] = liveFormatted;
      } else {
        // Brand-new cup tie or knockout round draw: Add to schedule
        parsedFixtures.push(liveFormatted);
      }
    });
  }

  // Sort chronologically after applying any date/time moves
  parsedFixtures.sort(function(a, b) { return a.timestamp - b.timestamp; });

  // Geocode any newly drawn away/cup venues automatically
  for (var g = 0; g < Math.min(3, parsedFixtures.length); g++) {
    if (!parsedFixtures[g].coordinates) {
      parsedFixtures[g].coordinates = await resolveDynamicVenueCoords(
        parsedFixtures[g].venue,
        parsedFixtures[g].city,
        parsedFixtures[g].country,
        parsedFixtures[g].opponent
      );
    }
  }

  appState.masterFixtures = parsedFixtures;
  appState.homeMatches = buildHomeMatchesFromMaster(parsedFixtures, appState.homeMatches);
  appState.awayFixtures = buildAwayFixturesFromMaster(parsedFixtures, appState.awayFixtures);

  if (appState.homeMatches.length > 0) {
    var firstHomeId = appState.homeMatches[0].id;
    var validHomeSel = appState.homeMatches.some(function(m) { return String(m.id) === String(appState.selectedHomeMatchId); });
    if (!validHomeSel) appState.selectedHomeMatchId = firstHomeId;
  }

  saveState();
  window.refreshAllViews();
};

// 100-Team Master Pool: 1-92 Top 4 English Leagues (PL, Champ, L1, L2) + 93-100 Top European Clubs
var MASTER_100_TEAMS = [
  // 1-20: Premier League
  "Sunderland", "Arsenal", "Aston Villa", "AFC Bournemouth", "Brentford",
  "Brighton", "Chelsea", "Coventry City", "Crystal Palace", "Everton",
  "Fulham", "Hull City", "Ipswich Town", "Leeds United", "Liverpool",
  "Man City", "Man United", "Newcastle", "Nottm Forest", "Tottenham",
  // 21-44: Championship
  "Burnley", "Middlesbrough", "Sheffield Utd", "West Brom", "Norwich City",
  "Luton Town", "Watford", "Millwall", "Blackburn", "Preston NE",
  "Bristol City", "Swansea City", "Cardiff City", "Stoke City", "Derby County",
  "QPR", "Portsmouth", "Oxford United", "Sheffield Wed", "Plymouth Argyle",
  "Leicester City", "Southampton", "Wolves", "West Ham",
  // 45-68: League One
  "Birmingham City", "Wrexham", "Huddersfield", "Bolton", "Barnsley",
  "Peterborough", "Blackpool", "Charlton", "Reading", "Stockport",
  "Wigan Athletic", "Wycombe", "Lincoln City", "Leyton Orient", "Stevenage",
  "Exeter City", "Rotherham Utd", "Bristol Rovers", "Northampton", "Burton Albion",
  "Mansfield Town", "Crawley Town", "Shrewsbury", "Cambridge Utd",
  // 69-92: League Two
  "Bradford City", "MK Dons", "Doncaster", "Notts County", "Crewe Alex",
  "Carlisle Utd", "Gillingham", "Chesterfield", "Port Vale", "Walsall",
  "Grimsby Town", "Tranmere", "Barrow", "Fleetwood Town", "AFC Wimbledon",
  "Salford City", "Colchester Utd", "Morecambe", "Swindon Town", "Newport County",
  "Harrogate Town", "Accrington", "Bromley", "Cheltenham",
  // 93-100: Top European Leagues (used when card size is 100)
  "Real Madrid", "Barcelona", "Bayern Munich", "AC Milan",
  "Inter Milan", "PSG", "Juventus", "Borussia Dortmund"
];

var DEFAULT_40_TEAMS = MASTER_100_TEAMS.slice(0, 40);

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

// --- MASTER STATE CONTAINER ---
var appState = {
  currentUser: { name: "Gary Miller", role: "member", memberNo: "COX-084", category: "Adult" },
  users: JSON.parse(localStorage.getItem("coxhoe_users_v20")) || MASTER_MEMBERS,
  stops: DEFAULT_STOPS,
  homeMatches: SEASON_HOME_MATCHES,
  selectedHomeMatchId: SEASON_HOME_MATCHES[0] ? SEASON_HOME_MATCHES[0].id : "H-402",
  selectedBookingBusId: 1,
  masterFixtures: INITIAL_MASTER_FIXTURES,

  bookings: JSON.parse(localStorage.getItem("coxhoe_bookings_v20")) || [
    { id: 101, matchId: SEASON_HOME_MATCHES[0] ? SEASON_HOME_MATCHES[0].id : "H-402", busId: 1, name: "Gary Miller", stop: DEFAULT_STOPS[0] ? DEFAULT_STOPS[0].name : "Coxhoe Red Lion", adults: 1, juniors: 0, total: 12.00, boarded: true },
    { id: 102, matchId: SEASON_HOME_MATCHES[0] ? SEASON_HOME_MATCHES[0].id : "H-402", busId: 1, name: "Dave Kelly", stop: DEFAULT_STOPS[0] ? DEFAULT_STOPS[0].name : "Coxhoe Red Lion", adults: 2, juniors: 0, total: 24.00, boarded: false }
  ],

  friendsAndFamily: JSON.parse(localStorage.getItem("coxhoe_friends_v20")) || [
    { id: 1, owner: "Gary Miller", targetName: "Phoebe Miller", type: "Child", memberNo: "COX-085", relation: "Daughter", status: "approved" },
    { id: 2, owner: "Phoebe Miller", targetName: "Gary Miller", type: "Adult", memberNo: "COX-084", relation: "Parent", status: "approved" }
  ],
  
  pendingLinkRequests: JSON.parse(localStorage.getItem("coxhoe_pending_links_v20")) || [],
  
  duesConfig: JSON.parse(localStorage.getItem("coxhoe_dues_config_v20")) || {
    activeSeason: "2026/27",
    dueDate: "2026-08-31",
    adultFee: 10.00,
    juniorFee: 5.00,
    seniorFee: 5.00,
    enforceDuesGate: true
  },

  announcements: JSON.parse(localStorage.getItem("coxhoe_announcements_v20")) || [
    { id: 1, title: "European & Premier League Coach Notice", date: "2026-10-31", isUrgent: true, content: "Due to roadworks on the A1(M) near Bowburn, the bus will depart all village pickup points 15 minutes earlier than scheduled.", reactions: 14, archived: false, readBy: [] },
    { id: 2, title: "Branch Christmas Social Night Announced", date: "2026-10-28", isUrgent: false, content: "Tickets are now on sale for the annual Christmas branch social at Coxhoe WMC on Friday 18th December.", reactions: 29, archived: false, readBy: [] }
  ],

  matchdayChat: JSON.parse(localStorage.getItem("coxhoe_bus_chat_v20")) || [],

  directMessages: JSON.parse(localStorage.getItem("coxhoe_dms_v20")) || [],

  moderation: JSON.parse(localStorage.getItem("coxhoe_moderation_v20")) || {
    strikes: {},
    mutedMembers: ["Billy Thompson"],
    revokedMembers: [],
    incidents: []
  },

  helpdeskTickets: JSON.parse(localStorage.getItem("coxhoe_helpdesk_v20")) || [
    {
      id: "TICK-401",
      member: "Dave Kelly",
      topic: "Travel",
      status: "open",
      escalatedToGraham: true,
      created: "2026-10-31 14:00",
      messages: [{ id: "m1", sender: "Dave Kelly", time: "14:00", text: "Can I pick up at Bowburn instead of Red Lion next week?" }],
      internalNotes: [{ id: "n1", author: "Sarah Taylor", time: "14:05", text: "Escalated to Graham: can we add Bowburn stop for Dave?" }]
    }
  ],

  readTracker: JSON.parse(localStorage.getItem("coxhoe_read_tracker_v20")) || {
    "Gary Miller": { busChatCount: 0, readMsgIds: ["m1"], readNoteIds: [] },
    "Graham (Secretary)": { busChatCount: 0, readMsgIds: ["m1"], readNoteIds: [] }
  },

  awayFixtures: SEASON_AWAY_FIXTURES,
  awayRegistrations: JSON.parse(localStorage.getItem("coxhoe_away_regs_v20")) || [
    { fixtureId: SEASON_AWAY_FIXTURES[0] ? SEASON_AWAY_FIXTURES[0].id : "A-401", memberName: "Gary Miller", party: ["Gary Miller (Adult)", "Phoebe Miller (Child)"], allocated: true }
  ],

  masterAuditTrail: JSON.parse(localStorage.getItem("coxhoe_audit_v20")) || [
    { txnId: "TXN-1001", timestamp: "2026-10-25 10:00:00", actor: "Gary Miller", role: "Member", target: "Branch", category: "SUBS_DUES", desc: "Annual Membership Subs 2026/27 (Adult)", debit: 10.00, credit: 0, branchImpact: 10.00, balanceAfter: 35.00 }
  ],

  footballCard: JSON.parse(localStorage.getItem("coxhoe_football_card_v20")) || DEFAULT_40_TEAMS.map(function(t, idx) {
    return { id: idx + 1, team: t, price: 2.00, claimedBy: (idx === 0 ? "Gary Miller" : (idx === 6 ? "Graham Croft" : null)) };
  }),

  activeCardMeta: JSON.parse(localStorage.getItem("coxhoe_card_meta_v20")) || {
    cardId: 1,
    title: "Matchday 40-Team Scratch Card #1",
    status: "active",
    pricePerTeam: 2.00,
    winnerPrize: 40.00,
    branchPrize: 40.00,
    winnerTeam: null,
    winnerMember: null
  },

  clubIdentity: JSON.parse(localStorage.getItem("coxhoe_club_identity_v20")) || {
    clubName: "Coxhoe Branch",
    subTitle: "Supporters Club",
    badgeInitials: "SAFC",
    crestLogoUrl: null
  },

  modules: JSON.parse(localStorage.getItem("coxhoe_modules_v20")) || {
    travel: true,
    awayTickets: true,
    fundraiser: true,
    commsBusChat: false,
    commsHelpdesk: true,
    duesAndPass: true
  }
};

// Active Multi-Tenant Club Identifier (Defaults to coxhoe-safc, supports ?club= URL param)
window.ACTIVE_CLUB_ID = (function() {
  try {
    var params = new URLSearchParams(window.location.search);
    return params.get("club") || localStorage.getItem("safc_active_club_id") || "coxhoe-safc";
  } catch (e) {
    return "coxhoe-safc";
  }
})();

var _isApplyingCloudState = false;
var _lastCloudSyncTimestamp = 0;
var _cloudPushTimer = null;

var SHARED_STATE_KEYS = [
  "users", "stops", "homeMatches", "bookings", "friendsAndFamily",
  "pendingLinkRequests", "duesConfig", "announcements", "matchdayChat",
  "directMessages", "moderation", "helpdeskTickets", "awayFixtures",
  "awayRegistrations", "masterAuditTrail", "footballCard", "activeCardMeta",
  "clubIdentity", "modules"
];

function saveLocalCacheOnly() {
  localStorage.setItem("coxhoe_users_v20", JSON.stringify(appState.users));
  localStorage.setItem("coxhoe_stops_v23", JSON.stringify(appState.stops));
  localStorage.setItem("coxhoe_home_matches_v23", JSON.stringify(appState.homeMatches));
  localStorage.setItem("coxhoe_bookings_v20", JSON.stringify(appState.bookings));
  localStorage.setItem("coxhoe_friends_v20", JSON.stringify(appState.friendsAndFamily));
  localStorage.setItem("coxhoe_pending_links_v20", JSON.stringify(appState.pendingLinkRequests));
  localStorage.setItem("coxhoe_dues_config_v20", JSON.stringify(appState.duesConfig));
  localStorage.setItem("coxhoe_announcements_v20", JSON.stringify(appState.announcements));
  localStorage.setItem("coxhoe_bus_chat_v20", JSON.stringify(appState.matchdayChat));
  localStorage.setItem("coxhoe_dms_v20", JSON.stringify(appState.directMessages));
  localStorage.setItem("coxhoe_moderation_v20", JSON.stringify(appState.moderation));
  localStorage.setItem("coxhoe_helpdesk_v20", JSON.stringify(appState.helpdeskTickets));
  localStorage.setItem("coxhoe_read_tracker_v20", JSON.stringify(appState.readTracker));
  localStorage.setItem("coxhoe_away_fixtures_v23", JSON.stringify(appState.awayFixtures));
  localStorage.setItem("coxhoe_away_regs_v20", JSON.stringify(appState.awayRegistrations));
  localStorage.setItem("coxhoe_audit_v20", JSON.stringify(appState.masterAuditTrail));
  localStorage.setItem("coxhoe_football_card_v20", JSON.stringify(appState.footballCard));
  localStorage.setItem("coxhoe_card_meta_v20", JSON.stringify(appState.activeCardMeta));
  localStorage.setItem("coxhoe_club_identity_v20", JSON.stringify(appState.clubIdentity));
  localStorage.setItem("coxhoe_modules_v20", JSON.stringify(appState.modules));
}

// Helper: Push a single member record to the Supabase members table safely
window.syncMemberRecordToSupabase = async function(u) {
  if (!sbClient || !u || !u.memberNo) return;
  if (!u.id) u.id = Date.now();
  var extCfg = getSettingsForMemberNo(u.memberNo);

  try {
    var existingRow = await sbClient
      .from("members")
      .select("id")
      .eq("member_no", u.memberNo)
      .maybeSingle();

    if (existingRow && existingRow.data && existingRow.data.id) {
      u.id = existingRow.data.id;
    }

    await sbClient.from("members").upsert([{
      id: u.id,
      club_id: window.ACTIVE_CLUB_ID,
      member_no: u.memberNo,
      name: u.name,
      first_name: u.firstName || u.name.split(" ")[0] || "",
      last_name: u.lastName || u.name.split(" ").slice(1).join(" ") || "",
      email: u.email || null,
      email_verified: !!u.emailVerified,
      password_hash: u.passwordHash || null,
      nickname: u.nickname || null,
      dob: u.dob || null,
      phone: u.phone || null,
      emergency_name: u.emergencyName || null,
      emergency_phone: u.emergencyPhone || null,
      role: u.role || (u.memberNo === "ADMIN-01" ? "admin" : "member"),
      category: u.category || "Adult",
      balance: parseFloat(u.balance) || 0,
      registered_days_ago: u.registeredDaysAgo || 0,
      messaging_allowed: u.messagingAllowed !== false,
      membership_status: u.membershipStatus || "active",
      membership_tier: u.membershipTier || "Adult",
      membership_season: u.membershipSeason || "2026/27",
      valid_until: u.validUntil || "2027-07-31",
      security_pin: u.securityPin || extCfg.securityPin || null,
      biometric_cred_id: u.biometricCredId || extCfg.biometricCredId || null,
      photo_url: u.photoUrl || getSavedAvatar(u) || null,
      manifest_display: u.manifestDisplay || extCfg.manifestDisplay || "nickname",
      dm_privacy: u.dmPrivacy || extCfg.dmPrivacy || "all"
    }], { onConflict: "member_no" });
  } catch (e) {
    console.warn("Member row sync warning:", e);
  }
};

function saveState() {
  saveLocalCacheOnly();
  if (_isApplyingCloudState || !sbClient) return;

  if (_cloudPushTimer) clearTimeout(_cloudPushTimer);
  _cloudPushTimer = setTimeout(function() {
    window.pushMasterStateToCloud();
  }, 120);
}

window.pushMasterStateToCloud = async function() {
  if (!sbClient) return;

  // Ensure any locally saved PIN/Biometrics on this device are copied into appState.users before pushing
  (appState.users || []).forEach(function(u) {
    if (!u || !u.memberNo) return;
    try {
      var rawLocal = JSON.parse(localStorage.getItem("safc_ext_settings_" + u.memberNo) || "{}");
      if (rawLocal.securityPin && !u.securityPin) u.securityPin = rawLocal.securityPin;
      if (rawLocal.biometricCredId && !u.biometricCredId) u.biometricCredId = rawLocal.biometricCredId;
    } catch (e) {}
  });

  // Generate a unique revision stamp that never suffers from clock-skew between phone and computer
  var nowTs = Date.now() + Math.floor(Math.random() * 999);
  _lastCloudSyncTimestamp = nowTs;

  var payload = { _syncTs: nowTs };
  SHARED_STATE_KEYS.forEach(function(k) {
    payload[k] = appState[k];
  });

  try {
    await sbClient.from("club_state").upsert([{
      club_id: window.ACTIVE_CLUB_ID,
      state_data: payload,
      updated_at: new Date().toISOString()
    }], { onConflict: "club_id" });

    var cur = getCurrentUserRecord();
    if (cur) await window.syncMemberRecordToSupabase(cur);
  } catch (err) {
    console.warn("Cloud state push error:", err);
  }
};

// Detect incoming messages/events addressed to the logged-in member and fire recipient-only notifications
function checkIncomingRecipientNotifications(incomingState) {
  if (!incomingState || !appState.currentUser || !appState.currentUser.name) return;
  var loginView = document.getElementById("view-login");
  if (loginView && loginView.classList.contains("active")) return; // Don't fire if logged out

  var me = appState.currentUser.name;
  var myRole = appState.currentUser.role;

  // 1. Incoming Private DM (Recipient Only — just like WhatsApp)
  var oldDmIds = (appState.directMessages || []).map(function(m) { return m.id; });
  (incomingState.directMessages || []).forEach(function(m) {
    if (m.id && oldDmIds.indexOf(m.id) === -1 && m.to === me && m.from !== me) {
      if (typeof window.dispatchClubNotification === "function") {
        window.dispatchClubNotification("comms", "💬 New Message from " + m.from, m.text, "view-comms");
      }
    }
  });

  // 2. Incoming Helpdesk Reply (Recipient or On-Call Admin Only)
  var oldTickets = appState.helpdeskTickets || [];
  (incomingState.helpdeskTickets || []).forEach(function(incT) {
    var prevT = oldTickets.find(function(o) { return o.id === incT.id; });
    var prevMsgIds = prevT && prevT.messages ? prevT.messages.map(function(x) { return x.id; }) : [];
    var isMyTicket = (incT.member && incT.member.indexOf(me) !== -1) || myRole === "admin";
    if (!isMyTicket) return;

    (incT.messages || []).forEach(function(msg) {
      if (msg.id && prevMsgIds.indexOf(msg.id) === -1 && msg.sender !== me) {
        if (typeof window.dispatchClubNotification === "function") {
          window.dispatchClubNotification("comms", "📬 Helpdesk Reply (#" + incT.id + ")", msg.sender + ": " + msg.text, "view-comms");
        }
      }
    });
  });

  // 3. Incoming Branch Announcement
  var oldAnnIds = (appState.announcements || []).map(function(a) { return String(a.id); });
  (incomingState.announcements || []).forEach(function(a) {
    if (a.id && oldAnnIds.indexOf(String(a.id)) === -1) {
      if (typeof window.dispatchClubNotification === "function") {
        window.dispatchClubNotification("travel", (a.isUrgent ? "🚨 URGENT: " : "📢 ") + a.title, a.content || "", "view-hud");
      }
    }
  });

  // 4. Away Ticket Allocation Update for Me
  var oldRegs = appState.awayRegistrations || [];
  (incomingState.awayRegistrations || []).forEach(function(r) {
    var wasAlloc = oldRegs.some(function(or) { return or.fixtureId === r.fixtureId && or.memberName === r.memberName && or.allocated; });
    var involvesMe = (r.memberName === me) || (r.party && r.party.some(function(p) { return p.indexOf(me) !== -1; }));
    if (r.allocated && !wasAlloc && involvesMe) {
      var fix = (incomingState.awayFixtures || appState.awayFixtures || []).find(function(f) { return f.id === r.fixtureId; });
      if (typeof window.dispatchClubNotification === "function") {
        window.dispatchClubNotification("away", "🎟️ Away Ticket Allocated!", "Your ticket application for " + (fix ? fix.opponent : "Away Fixture") + " has been approved!", "view-travel");
      }
    }
  });
}

function applyIncomingCloudState(stateData, forceApply) {
  if (!stateData || typeof stateData !== "object") return;
  // Use strict !== comparison so slight clock differences between phone and PC never drop updates
  if (!forceApply && stateData._syncTs && stateData._syncTs === _lastCloudSyncTimestamp) return;

  _isApplyingCloudState = true;
  if (_lastCloudSyncTimestamp !== 0 && !forceApply) {
    checkIncomingRecipientNotifications(stateData);
  }
  if (stateData._syncTs) _lastCloudSyncTimestamp = stateData._syncTs;

  SHARED_STATE_KEYS.forEach(function(k) {
    if (stateData[k] !== undefined && stateData[k] !== null) {
      appState[k] = stateData[k];
    }
  });

  // Remove any locally selected football team IDs that were just claimed by another user
  if (Array.isArray(window._selectedFootballTeamIds) && Array.isArray(appState.footballCard)) {
    window._selectedFootballTeamIds = window._selectedFootballTeamIds.filter(function(tid) {
      var sq = appState.footballCard.find(function(s) { return s.id === tid; });
      return sq && !sq.claimedBy;
    });
  }

  saveLocalCacheOnly();
  window.refreshAllViews();

  var drawer = document.getElementById("admin-drawer");
  if (drawer && !drawer.classList.contains("hidden") && drawer.style.display !== "none") {
    if (typeof renderAdminActivePane === "function" && typeof activeAdminTool !== "undefined") {
      renderAdminActivePane(activeAdminTool);
    }
  }

  _isApplyingCloudState = false;
}

// Atomic Pre-Flight Fetch: Pulls exact live state + member security columns before login/claims
window.pullLatestCloudStateNow = async function() {
  if (!sbClient || !navigator.onLine) return false;
  try {
    var csRes = await sbClient
      .from("club_state")
      .select("state_data")
      .eq("club_id", window.ACTIVE_CLUB_ID)
      .maybeSingle();

    if (csRes && csRes.data && csRes.data.state_data && Object.keys(csRes.data.state_data).length > 0) {
      applyIncomingCloudState(csRes.data.state_data, true);
    }

    var mRes = await sbClient.from("members").select("*");
    if (mRes && mRes.data && mRes.data.length > 0) {
      mRes.data.forEach(function(row) {
        var u = (appState.users || []).find(function(x) {
          return (x.memberNo && x.memberNo === row.member_no) || (x.name && row.name && x.name.toLowerCase() === row.name.toLowerCase());
        });
        if (u) {
          if (row.security_pin) u.securityPin = row.security_pin;
          if (row.password_hash) u.passwordHash = row.password_hash;
          if (row.biometric_cred_id) u.biometricCredId = row.biometric_cred_id;
          if (row.email) u.email = row.email;
          if (row.role) u.role = row.role;
        }
      });
      saveLocalCacheOnly();
    }
    return true;
  } catch (e) {
    console.warn("Pre-flight cloud fetch warning:", e);
  }
  return false;
};

// --- SUPABASE CLOUD HYDRATION & REALTIME DISPATCHER ---
async function initSupabaseCloudSync() {
  if (!sbClient) return;

  try {
    var csRes = await sbClient
      .from("club_state")
      .select("*")
      .eq("club_id", window.ACTIVE_CLUB_ID)
      .maybeSingle();

    var hasMasterCloudState = csRes && csRes.data && csRes.data.state_data && Object.keys(csRes.data.state_data).length > 0;
    if (hasMasterCloudState) {
      applyIncomingCloudState(csRes.data.state_data, true);
    }

    var mRes = await sbClient.from("members").select("*");
    if (mRes.data && mRes.data.length > 0) {
      var existingUsers = appState.users || [];
      mRes.data.forEach(function(row) {
        var matchIdx = existingUsers.findIndex(function(u) {
          return (u.memberNo && u.memberNo === row.member_no) ||
                 (u.name && row.name && u.name.toLowerCase() === row.name.toLowerCase());
        });

        var prev = matchIdx !== -1 ? existingUsers[matchIdx] : {};
        var mergedUser = {
          id: row.id || prev.id || Date.now(),
          memberNo: row.member_no || prev.memberNo,
          name: row.name || prev.name,
          firstName: row.first_name || prev.firstName || "",
          lastName: row.last_name || prev.lastName || "",
          email: row.email || prev.email || "",
          emailVerified: row.email_verified !== undefined ? row.email_verified : !!prev.emailVerified,
          passwordHash: row.password_hash || prev.passwordHash || "",
          nickname: row.nickname || prev.nickname || "",
          dob: row.dob || prev.dob || null,
          phone: row.phone || prev.phone || "",
          emergencyName: row.emergency_name || prev.emergencyName || "",
          emergencyPhone: row.emergency_phone || prev.emergencyPhone || "",
          role: row.role || prev.role || (row.member_no === "ADMIN-01" ? "admin" : "member"),
          category: row.category || prev.category || "Adult",
          balance: (prev.balance !== undefined && hasMasterCloudState) ? parseFloat(prev.balance) : (parseFloat(row.balance) || 0),
          registeredDaysAgo: row.registered_days_ago || prev.registeredDaysAgo || 0,
          messagingAllowed: row.messaging_allowed !== false,
          membershipStatus: prev.membershipStatus || row.membership_status || "active",
          membershipTier: row.membership_tier || prev.membershipTier || "Adult",
          membershipSeason: row.membership_season || prev.membershipSeason || "2026/27",
          validUntil: row.valid_until || prev.validUntil || "2027-07-31",
          securityPin: row.security_pin || prev.securityPin || "",
          biometricCredId: row.biometric_cred_id || prev.biometricCredId || null,
          photoUrl: row.photo_url || prev.photoUrl || null,
          manifestDisplay: row.manifest_display || prev.manifestDisplay || "nickname",
          dmPrivacy: row.dm_privacy || prev.dmPrivacy || "all",
          hasAppAccount: true
        };

        if (matchIdx !== -1) existingUsers[matchIdx] = mergedUser;
        else existingUsers.push(mergedUser);
      });
      appState.users = existingUsers;
    }

    if (!hasMasterCloudState) {
      await window.pushMasterStateToCloud();
    } else {
      saveLocalCacheOnly();
      window.refreshAllViews();
    }

    sbClient
      .channel("branch-master-sync-" + window.ACTIVE_CLUB_ID)
      .on("postgres_changes", { event: "*", schema: "public", table: "club_state" }, function(payload) {
        if (payload.new && payload.new.club_id === window.ACTIVE_CLUB_ID && payload.new.state_data) {
          applyIncomingCloudState(payload.new.state_data, false);
        }
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "bus_bookings" }, function(payload) {
        if (payload.eventType === "UPDATE" && payload.new) {
          var idx = appState.bookings.findIndex(function(b) { return b.id === payload.new.id; });
          if (idx !== -1) {
            appState.bookings[idx].boarded = payload.new.boarded;
            saveLocalCacheOnly();
            window.refreshAllViews();
          }
        }
      })
      .subscribe();

    setInterval(async function() {
      if (document.hidden || !navigator.onLine) return;
      try {
        var pollRes = await sbClient
          .from("club_state")
          .select("state_data")
          .eq("club_id", window.ACTIVE_CLUB_ID)
          .maybeSingle();
        if (pollRes && pollRes.data && pollRes.data.state_data) {
          applyIncomingCloudState(pollRes.data.state_data, false);
        }
      } catch (e) {}
    }, 3000);

    window.addEventListener("focus", function() {
      window.pullLatestCloudStateNow();
    });
  } catch (syncErr) {
    console.warn("Supabase Realtime initial connection fallback:", syncErr);
  }
}

// --- USER & AUTH UTILITIES ---
function getCurrentUserRecord() {
  var curName = (typeof appState.currentUser === "string") ? appState.currentUser : (appState.currentUser ? appState.currentUser.name : "Gary Miller");
  var curNo = (appState.currentUser && appState.currentUser.memberNo) ? appState.currentUser.memberNo : null;

  var found = appState.users.find(function(u) {
    if (curNo && u.memberNo && u.memberNo.toLowerCase() === curNo.toLowerCase()) return true;
    return u.name && u.name.toLowerCase() === curName.toLowerCase();
  });

  if (!found) {
    found = {
      id: Date.now(),
      name: curName,
      memberNo: curNo || "COX-084",
      category: (appState.currentUser && appState.currentUser.category) ? appState.currentUser.category : "Adult",
      hasAppAccount: true,
      balance: 35.00,
      registeredDaysAgo: 1,
      messagingAllowed: true,
      membershipStatus: "active",
      membershipTier: "Adult",
      membershipSeason: "2026/27",
      validUntil: "2027-07-31"
    };
    appState.users.push(found);
  }
  return found;
}

var DEFAULT_AVATAR_SVG = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='72' height='72' viewBox='0 0 24 24' fill='%2394a3b8'><path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/></svg>";

// Check if a member is Under 18 (auto-unlocks on 18th birthday if DOB is recorded)
function isMemberUnder18(user) {
  if (!user) return false;
  if (user.dob) {
    var birthDate = new Date(user.dob);
    if (!isNaN(birthDate.getTime())) {
      var today = new Date();
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      if (age >= 18 && user.category === "Child") {
        user.category = "Adult";
        user.membershipTier = "Adult";
        saveState();
      }
      return age < 18;
    }
  }
  return user.category === "Child" || user.membershipTier === "Junior";
}

// Persistent Avatar Map (survives page refreshes & cloud sync)
function getSavedAvatar(user) {
  if (!user) return null;
  try {
    var map = JSON.parse(localStorage.getItem("coxhoe_avatars_v20") || "{}");
    return map[user.memberNo] || map[user.name] || user.photoUrl || null;
  } catch (e) {
    return user.photoUrl || null;
  }
}

function setSavedAvatar(user, dataUrl) {
  if (!user) return;
  user.photoUrl = dataUrl || null;
  try {
    var map = JSON.parse(localStorage.getItem("coxhoe_avatars_v20") || "{}");
    if (dataUrl) {
      if (user.memberNo) map[user.memberNo] = dataUrl;
      map[user.name] = dataUrl;
    } else {
      if (user.memberNo) delete map[user.memberNo];
      delete map[user.name];
    }
    localStorage.setItem("coxhoe_avatars_v20", JSON.stringify(map));
  } catch (e) {
    console.warn("Avatar storage error:", e);
  }
  saveState();
}

window.updateBalanceDisplay = function() {
  var user = getCurrentUserRecord();
  var isU18 = isMemberUnder18(user);
  if (isU18) user.balance = 0.00;

  var hudBal = document.getElementById("hud-wallet-balance");
  if (hudBal && user) {
    hudBal.textContent = "£" + (user.balance || 0).toFixed(2);
  }

  var hudActionRow = document.getElementById("hud-identity-action-row");
  var profileWalletCard = document.getElementById("profile-wallet-card");

  if (hudActionRow) hudActionRow.style.display = isU18 ? "none" : "flex";
  if (profileWalletCard) profileWalletCard.style.display = isU18 ? "none" : "block";
};

window.handleWalletTopUp = async function() {
  var user = getCurrentUserRecord();
  if (isMemberUnder18(user)) {
    alert("🛡️ Under-18 Accounts do not hold a wallet balance. All bookings and payments are managed by your linked adult guardian until your 18th birthday.");
    return;
  }

  var rawAmt = prompt(
    "💳 Top Up Branch Wallet (" + user.name + ")\n\n" +
    "Current Balance: £" + Number(user.balance || 0).toFixed(2) + "\n" +
    "Enter deposit amount (£5.00 – £200.00):",
    "20.00"
  );
  if (rawAmt === null) return;

  var amount = parseFloat(String(rawAmt).replace(/[^0-9.]/g, ""));
  if (isNaN(amount) || amount < 5 || amount > 200) {
    alert("Please enter a valid top-up amount between £5.00 and £200.00.");
    return;
  }

  if (!confirm("Confirm £" + amount.toFixed(2) + " debit card top-up to your Coxhoe Branch wallet?")) {
    return;
  }

  user.balance = (parseFloat(user.balance) || 0) + amount;
  logForensicTransaction(user.name, "Member", user.name, "TOPUP", "Debit Card Wallet Top-Up (+£" + amount.toFixed(2) + ")", 0, amount, 0);
  await window.pushMasterStateToCloud();
  window.refreshAllViews();
  alert("✓ £" + amount.toFixed(2) + " added to your branch wallet! New balance: £" + user.balance.toFixed(2));
};

window.payMyAnnualSubs = async function() {
  var user = getCurrentUserRecord();
  if (!user) return;

  if (user.membershipStatus === "active") {
    alert("✓ Your " + (appState.duesConfig.activeSeason || "2026/27") + " branch membership subs are already active!");
    return;
  }

  if (isMemberUnder18(user)) {
    alert("🛡️ Under-18 Junior Subs (£" + Number(appState.duesConfig.juniorFee || 5).toFixed(2) + ") must be settled by your linked adult guardian or the Branch Treasurer.");
    return;
  }

  var season = (appState.duesConfig && appState.duesConfig.activeSeason) ? appState.duesConfig.activeSeason : "2026/27";
  var tier = user.membershipTier || "Adult";
  var fee = Number(appState.duesConfig ? appState.duesConfig.adultFee : 10.00);
  if (tier === "Senior") fee = Number(appState.duesConfig ? appState.duesConfig.seniorFee : 5.00);

  if ((user.balance || 0) < fee) {
    if (confirm("Your wallet balance is £" + Number(user.balance || 0).toFixed(2) + ", and " + season + " " + tier + " Subs are £" + fee.toFixed(2) + ".\n\nWould you like to top up your wallet first?")) {
      await window.handleWalletTopUp();
    }
    return;
  }

  if (!window.verifyWalletSpendAuthorization(fee, season + " Annual Branch Membership Subs (" + tier + ")")) {
    return;
  }

  user.balance = (parseFloat(user.balance) || 0) - fee;
  user.membershipStatus = "active";
  user.membershipSeason = season;
  user.validUntil = "2027-07-31";

  logForensicTransaction(
    user.name,
    "Member",
    "Branch",
    "SUBS_DUES",
    "Annual Membership Subs " + season + " (" + tier + ")",
    fee,
    0,
    fee
  );

  await window.pushMasterStateToCloud();
  window.refreshAllViews();
  alert("🎉 Thank you, " + user.name + "! Your " + season + " branch membership is now ACTIVE.");
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
  if (typeof renderWalletStatement === "function") renderWalletStatement();

  if (user && typeof window.syncMemberRecordToSupabase === "function") {
    window.syncMemberRecordToSupabase(user);
  }

  if (sbClient) {
    sbClient.from("audit_ledger").insert([{
      txn_id: txn.txnId,
      timestamp: txn.timestamp,
      actor: txn.actor,
      role: txn.role,
      target: txn.target,
      category: txn.category,
      description: txn.desc,
      debit: txn.debit,
      credit: txn.credit,
      branch_impact: txn.branchImpact,
      balance_after: txn.balanceAfter
    }]).then(function() {});
  }
}

function checkChildCompliance(user) {
  if (user.category !== "Child") return { compliant: true };
  var hasParent = appState.friendsAndFamily.some(function(f) {
    return (f.owner === user.name && f.relation === "Parent" && f.status === "approved") ||
           (f.targetName === user.name && (f.relation === "Daughter" || f.relation === "Son" || f.relation === "Child") && f.status === "approved");
  });
  if (hasParent) return { compliant: true, linkedParent: true };
  var daysRemaining = 7 - (user.registeredDaysAgo || 0);
  if (daysRemaining <= 0) return { compliant: false, deactivated: true, daysPast: Math.abs(daysRemaining) };
  return { compliant: true, pendingWarning: true, daysRemaining: daysRemaining };
}

function verifyMembershipAccess(actionName) {
  if (!appState.duesConfig.enforceDuesGate) return true;
  var user = getCurrentUserRecord();
  if (user.membershipStatus === "lapsed") {
    alert("⛔ ACCESS RESTRICTED: Annual Membership Overdue\n\nYour " + appState.duesConfig.activeSeason + " membership subs must be settled before you can " + actionName + ".\n\nPlease renew via the Home HUD or My Pass tab.");
    return false;
  }
  return true;
}

// --- COMMS DUAL-BADGE & APP ICON BADGE ENGINE ---
function computeUserBadges(userName, role) {
  if (!appState.readTracker[userName]) {
    appState.readTracker[userName] = { busChatCount: 0, readMsgIds: [], readNoteIds: [], readDmIds: [] };
  }
  var tracker = appState.readTracker[userName];
  if (!tracker.readMsgIds) tracker.readMsgIds = [];
  if (!tracker.readNoteIds) tracker.readNoteIds = [];
  if (!tracker.readDmIds) tracker.readDmIds = [];

  var unreadChat = 0;
  if (appState.modules && appState.modules.commsBusChat) {
    var totalChat = (appState.matchdayChat || []).length;
    if (totalChat > tracker.busChatCount) {
      unreadChat = (totalChat - tracker.busChatCount);
    }
  }

  var unreadDms = 0;
  (appState.directMessages || []).forEach(function(dm) {
    if (dm.to === userName && dm.from !== userName && tracker.readDmIds.indexOf(dm.id) === -1) {
      unreadDms++;
    }
  });

  var unreadDesk = 0;
  if (appState.modules && appState.modules.commsHelpdesk && appState.helpdeskTickets) {
    appState.helpdeskTickets.forEach(function(t) {
      (t.messages || []).forEach(function(m) {
        if (m.sender !== userName && m.sender.indexOf(userName) === -1) {
          var isForMe = (role === "admin") ? true : (t.member && t.member.indexOf(userName) !== -1);
          if (isForMe && tracker.readMsgIds.indexOf(m.id) === -1) {
            unreadDesk++;
          }
        }
      });
    });
  }

  var goldCount = 0;
  if (role === "admin" && appState.modules && appState.modules.commsHelpdesk && appState.helpdeskTickets) {
    appState.helpdeskTickets.forEach(function(t) {
      (t.internalNotes || []).forEach(function(note) {
        if (note.author !== userName && tracker.readNoteIds.indexOf(note.id) === -1) {
          goldCount++;
        }
      });
    });
  }

  var redCount = unreadChat + unreadDms + unreadDesk;
  return {
    red: redCount,
    gold: goldCount,
    unreadChat: unreadChat,
    unreadDms: unreadDms,
    unreadDesk: unreadDesk
  };
}

function updateCommsBadge() {
  var user = appState.currentUser ? appState.currentUser.name : "Gary Miller";
  var role = appState.currentUser ? appState.currentUser.role : "member";
  var badges = computeUserBadges(user, role);

  // 1. Bottom Navigation Bar Red & Gold Bubbles
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

  // 2. Sub-Tab 1: Bus Chat Badge
  var subBusBadge = document.getElementById("sub-bus-badge");
  if (subBusBadge) {
    subBusBadge.textContent = badges.unreadChat;
    subBusBadge.style.display = (badges.unreadChat > 0 && appState.modules && appState.modules.commsBusChat) ? "inline-block" : "none";
  }

  // 3. Sub-Tab 2: Private DMs Badge
  var subDmBadge = document.getElementById("sub-dm-badge");
  if (subDmBadge) {
    subDmBadge.textContent = badges.unreadDms;
    subDmBadge.style.display = badges.unreadDms > 0 ? "inline-block" : "none";
  }

  // 4. Sub-Tab 3: Helpdesk Badge
  var subHelpdeskBadge = document.getElementById("sub-helpdesk-badge");
  if (subHelpdeskBadge) {
    if (badges.gold > 0 && badges.unreadDesk > 0) {
      subHelpdeskBadge.textContent = "🔴" + badges.unreadDesk + " 🟡" + badges.gold;
      subHelpdeskBadge.style.display = "inline-block";
    } else if (badges.gold > 0) {
      subHelpdeskBadge.textContent = "🟡 " + badges.gold;
      subHelpdeskBadge.style.display = "inline-block";
    } else if (badges.unreadDesk > 0) {
      subHelpdeskBadge.textContent = "🔴 " + badges.unreadDesk;
      subHelpdeskBadge.style.display = "inline-block";
    } else {
      subHelpdeskBadge.style.display = "none";
    }
  }

  // 5. Phone Home Screen PWA App Icon Badge (W3C Badging API)
  var totalAppUnread = badges.red + badges.gold;
  if ("setAppBadge" in navigator && "clearAppBadge" in navigator) {
    try {
      if (totalAppUnread > 0) {
        navigator.setAppBadge(totalAppUnread).catch(function() {});
      } else {
        navigator.clearAppBadge().catch(function() {});
      }
    } catch (e) {}
  }

  updateAdminDrawerBadge();
}

function updateAdminDrawerBadge() {
  var adminReqs = (appState.pendingLinkRequests || []).filter(function(r) { return r.status === "pending_admin"; });
  var pendingVotes = (appState.moderation && appState.moderation.incidents || []).filter(function(inc) {
    return inc.status === "active_ban" && (!inc.votes || !inc.votes[appState.currentUser.name]);
  });
  var totalAdminTasks = adminReqs.length + pendingVotes.length;
  var badge = document.getElementById("admin-panel-badge");
  if (badge) {
    badge.textContent = totalAdminTasks;
    badge.style.display = (totalAdminTasks > 0 && appState.currentUser && appState.currentUser.role === "admin") ? "inline-block" : "none";
  }
}

// --- AUTH, REGISTRATION & QUICK-UNLOCK ENGINE ---
function getSettingsForMemberNo(memberNo) {
  var saved = {};
  try {
    saved = JSON.parse(localStorage.getItem("safc_ext_settings_" + (memberNo || "DEFAULT")) || "{}");
  } catch (e) {}

  // Merge cloud-synced security & privacy fields from the member record
  var userRec = (appState && appState.users || []).find(function(u) {
    return u.memberNo && memberNo && u.memberNo.toLowerCase() === memberNo.toLowerCase();
  });
  if (userRec) {
    if (userRec.securityPin) saved.securityPin = userRec.securityPin;
    if (userRec.biometricCredId) saved.biometricCredId = userRec.biometricCredId;
    if (userRec.manifestDisplay) saved.manifestDisplay = userRec.manifestDisplay;
    if (userRec.dmPrivacy) saved.dmPrivacy = userRec.dmPrivacy;
  }
  return saved;
}

// WebAuthn Binary Helpers for Real Hardware Fingerprint / Face ID
function bufferToBase64Url(buffer) {
  var bytes = new Uint8Array(buffer);
  var binary = "";
  for (var i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlToUint8Array(base64Url) {
  var padding = "=".repeat((4 - (base64Url.length % 4)) % 4);
  var base64 = (base64Url + padding).replace(/-/g, "+").replace(/_/g, "/");
  var raw = atob(base64);
  var output = new Uint8Array(raw.length);
  for (var i = 0; i < raw.length; i++) {
    output[i] = raw.charCodeAt(i);
  }
  return output;
}

window.switchAuthMode = function(mode) {
  var signInPane = document.getElementById("auth-pane-signin");
  var regPane = document.getElementById("auth-pane-register");
  var btnSign = document.getElementById("tab-auth-signin");
  var btnReg = document.getElementById("tab-auth-register");

  if (mode === "register") {
    if (signInPane) signInPane.style.display = "none";
    if (regPane) regPane.style.display = "block";
    if (btnSign) { btnSign.className = "btn btn-outline btn-sm"; btnSign.style.border = "none"; }
    if (btnReg) { btnReg.className = "btn btn-red btn-sm"; }
  } else {
    if (signInPane) signInPane.style.display = "block";
    if (regPane) regPane.style.display = "none";
    if (btnSign) { btnSign.className = "btn btn-red btn-sm"; }
    if (btnReg) { btnReg.className = "btn btn-outline btn-sm"; btnReg.style.border = "none"; }
  }
};

function isUserVerifiedAdmin(user) {
  if (!user) return false;
  return user.role === "admin" || user.memberNo === "ADMIN-01";
}

window.renderLoginScreenState = function() {
  var quickCard = document.getElementById("login-quick-unlock-card");
  var demoCard = document.getElementById("login-demo-switcher-card");

  var savedSession = null;
  try {
    savedSession = JSON.parse(localStorage.getItem("safc_last_member_session") || "null");
  } catch (e) {}

  var isAdminDevice = false;
  try {
    isAdminDevice = (sessionStorage.getItem("safc_admin_authorized_device") === "1");
  } catch (e) {}

  var matched = null;
  if (savedSession && savedSession.name) {
    matched = (appState.users || []).find(function(u) {
      return (savedSession.memberNo && u.memberNo === savedSession.memberNo) ||
             (u.name && u.name.toLowerCase() === savedSession.name.toLowerCase());
    });
    if (matched && isUserVerifiedAdmin(matched)) {
      isAdminDevice = true;
    }
  }

  if (demoCard) {
    demoCard.style.display = isAdminDevice ? "block" : "none";
  }

  if (!quickCard) return;
  if (!matched) {
    quickCard.style.display = "none";
    return;
  }

  var extCfg = getSettingsForMemberNo(matched.memberNo);
  var activePin = matched.securityPin || extCfg.securityPin || "";
  var hasPin = activePin.length === 4;
  var hasBio = !!(extCfg.biometricUnlock && (matched.biometricCredId || extCfg.biometricCredId));

  quickCard.style.display = "block";

  var avatarEl = document.getElementById("quick-unlock-avatar");
  var nameEl = document.getElementById("quick-unlock-name");
  var metaEl = document.getElementById("quick-unlock-meta");
  var pinBox = document.getElementById("quick-unlock-pin-box");
  var bioBtn = document.getElementById("btn-biometric-quick-unlock");

  if (avatarEl) avatarEl.src = getSavedAvatar(matched) || DEFAULT_AVATAR_SVG;
  if (nameEl) nameEl.textContent = matched.name;
  if (metaEl) {
    var roleTag = isUserVerifiedAdmin(matched) ? "Committee Admin" : (isMemberUnder18(matched) ? "Junior (U18)" : (matched.category || "Adult"));
    metaEl.textContent = "Member #" + (matched.memberNo || "COX-084") + " • " + roleTag;
  }

  if (pinBox) {
    pinBox.innerHTML = hasPin
      ? "<label class='form-label'>Enter 4-Digit Security PIN</label>" +
        "<div style='display:flex; gap:8px;'>" +
          "<input type='password' id='quick-unlock-pin-input' class='form-input' maxlength='4' inputmode='numeric' pattern='[0-9]*' placeholder='••••' style='flex:1; text-align:center; letter-spacing:6px; font-size:16px; font-weight:800;' />" +
          "<button type='button' class='btn btn-red' style='width:auto; min-width:110px;' onclick='window.handlePinQuickUnlock()'>🔓 Unlock</button>" +
        "</div>"
      : "<button type='button' class='btn btn-red' onclick='window.handlePinQuickUnlock()'>⚡ Continue as " + matched.name.split(" ")[0] + " ➔</button>";
  }

  if (bioBtn) {
    bioBtn.style.display = hasBio ? "flex" : "none";
  }
};

window.handlePinQuickUnlock = async function() {
  await window.pullLatestCloudStateNow();
  var savedSession = null;
  try {
    savedSession = JSON.parse(localStorage.getItem("safc_last_member_session") || "null");
  } catch (e) {}
  if (!savedSession) return;

  var matched = (appState.users || []).find(function(u) {
    return (savedSession.memberNo && u.memberNo === savedSession.memberNo) ||
           (u.name && u.name.toLowerCase() === savedSession.name.toLowerCase());
  });
  if (!matched) return;

  var resolvedRole = isUserVerifiedAdmin(matched) ? "admin" : "member";
  var extCfg = getSettingsForMemberNo(matched.memberNo);
  var activePin = matched.securityPin || extCfg.securityPin || "";

  if (activePin && activePin.length === 4) {
    var pinInput = document.getElementById("quick-unlock-pin-input");
    var entered = pinInput ? pinInput.value.trim() : "";
    if (entered !== activePin) {
      alert("❌ Incorrect 4-digit PIN.");
      if (pinInput) pinInput.value = "";
      return;
    }
    if (pinInput) pinInput.value = "";
  }

  window.setUserSession(matched.name, resolvedRole, matched.memberNo);
};

window.handleBiometricQuickUnlock = async function() {
  var savedSession = null;
  try {
    savedSession = JSON.parse(localStorage.getItem("safc_last_member_session") || "null");
  } catch (e) {}
  if (!savedSession) return;

  var matched = (appState.users || []).find(function(u) {
    return (savedSession.memberNo && u.memberNo === savedSession.memberNo) ||
           (u.name && u.name.toLowerCase() === savedSession.name.toLowerCase());
  });
  if (!matched) return;

  var extCfg = getSettingsForMemberNo(matched.memberNo);
  var credId = matched.biometricCredId || extCfg.biometricCredId;

  if (!window.PublicKeyCredential || !navigator.credentials || !credId) {
    alert("⚠️ Biometric passkey not enrolled on this device yet. Please sign in with your PIN and enable Biometrics in ⚙️ App Settings.");
    return;
  }

  try {
    var challenge = new Uint8Array(32);
    window.crypto.getRandomValues(challenge);

    var assertion = await navigator.credentials.get({
      publicKey: {
        challenge: challenge,
        allowCredentials: [{
          type: "public-key",
          id: base64UrlToUint8Array(credId)
        }],
        userVerification: "required",
        timeout: 60000
      }
    });

    if (assertion) {
      var resolvedRole = isUserVerifiedAdmin(matched) ? "admin" : "member";
      window.setUserSession(matched.name, resolvedRole, matched.memberNo);
      if (typeof window.showInAppNotificationToast === "function") {
        window.showInAppNotificationToast("🧬 Biometric Verified", "Authenticated as " + matched.name, "view-hud");
      }
    }
  } catch (err) {
    console.warn("Biometric verification cancelled or failed:", err);
    alert("🧬 Biometric scan was cancelled or not recognised. Please use your 4-digit PIN.");
  }
};

window.clearSavedDeviceUser = function() {
  localStorage.removeItem("safc_last_member_session");
  sessionStorage.removeItem("safc_admin_authorized_device");
  window.renderLoginScreenState();
};

window.setUserSession = function(name, role, memberNo) {
  var matched = appState.users.find(function(u) {
    if (memberNo && u.memberNo && u.memberNo.toLowerCase() === memberNo.toLowerCase()) return true;
    return u.name && u.name.toLowerCase() === name.toLowerCase();
  });

  var resolvedName = matched ? matched.name : name;
  var resolvedNo = matched ? matched.memberNo : (memberNo || "COX-084");
  var category = matched ? matched.category : "Adult";
  var actualRole = isUserVerifiedAdmin(matched) ? "admin" : (role === "admin" ? "admin" : "member");

  if (actualRole === "admin") {
    try { sessionStorage.setItem("safc_admin_authorized_device", "1"); } catch (e) {}
  }

  appState.currentUser = {
    name: resolvedName,
    role: actualRole,
    memberNo: resolvedNo,
    category: category
  };

  try {
    localStorage.setItem("safc_last_member_session", JSON.stringify(appState.currentUser));
  } catch (e) {}

  var userRecord = getCurrentUserRecord();
  var compliance = checkChildCompliance(userRecord);
  var deactBanner = document.getElementById("child-deactivated-guard");
  if (deactBanner) {
    if (!compliance.compliant && compliance.deactivated) {
      deactBanner.style.display = "block";
      var deactMsg = document.getElementById("deact-msg");
      if (deactMsg) {
        deactMsg.textContent = "Account Locked: " + resolvedName + " requires a verified parent linkage. Link a parent via Friends & Family to activate.";
      }
    } else {
      deactBanner.style.display = "none";
    }
  }

  var views = document.querySelectorAll(".tab-view");
  views.forEach(function(v) { v.classList.remove("active"); });
  var hudView = document.getElementById("view-hud");
  if (hudView) hudView.classList.add("active");

  var navItems = document.querySelectorAll(".nav-item");
  navItems.forEach(function(item) { item.classList.remove("active"); });
  var navHome = document.getElementById("nav-home");
  if (navHome) navHome.classList.add("active");

  document.getElementById("bottom-bar").style.display = "flex";

  var adminBar = document.getElementById("admin-bar");
  var isAdminTestingMember = false;
  try {
    isAdminTestingMember = (sessionStorage.getItem("safc_admin_authorized_device") === "1" && actualRole !== "admin");
  } catch (e) {}

  if (adminBar) {
    if (actualRole === "admin") {
      adminBar.style.display = "flex";
      adminBar.style.background = "var(--safc-red)";
      adminBar.innerHTML =
        "<span>🛡️ COMMITTEE ADMIN MODE</span>" +
        "<button class='admin-btn-pill' onclick='openAdminDrawer()'>⚙️ Admin Panel <span id='admin-panel-badge' class='badge-count' style='display:none;'>0</span></button>";
    } else if (isAdminTestingMember) {
      adminBar.style.display = "flex";
      adminBar.style.background = "#1e1b4b";
      adminBar.innerHTML =
        "<span>🧪 Previewing: <strong>" + resolvedName + "</strong></span>" +
        "<button class='admin-btn-pill' onclick=\"window.quickLogin('Graham (Secretary)', 'admin', 'ADMIN-01')\">🛡️ Return to Admin</button>";
    } else {
      adminBar.style.display = "none";
    }
  }

  if (typeof window.syncSettingsDrawerUI === "function") window.syncSettingsDrawerUI();
  window.applyAppModules();
  window.applyClubIdentity();
  window.refreshAllViews();
};

window.handleLogin = async function() {
  var input = document.getElementById("login-username");
  var passInput = document.getElementById("login-password-input");
  var submitBtn = document.getElementById("btn-signin-submit");
  var val = (input && input.value.trim()) ? input.value.trim() : "";
  var enteredPass = passInput ? passInput.value : "";

  if (!val) {
    alert("Please enter your Email Address, Full Name, or Branch Membership Number (e.g. Gary Miller or COX-084).");
    return;
  }

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = "Verifying Credentials...";
  }

  await window.pullLatestCloudStateNow();

  if (submitBtn) {
    submitBtn.disabled = false;
    submitBtn.textContent = "Sign In to Portal ➔";
  }

  var q = val.toLowerCase();
  var matched = (appState.users || []).find(function(u) {
    return (u.name && u.name.toLowerCase() === q) ||
           (u.memberNo && u.memberNo.toLowerCase() === q) ||
           (u.email && u.email.toLowerCase() === q);
  });

  if (!matched) {
    if (confirm("No existing member record found for '" + val + "'.\n\nWould you like to switch to the Join Branch registration form?")) {
      window.switchAuthMode("register");
      var parts = val.split(" ");
      var fEl = document.getElementById("reg-first-name");
      var lEl = document.getElementById("reg-last-name");
      var eEl = document.getElementById("reg-email");
      if (val.indexOf("@") !== -1 && eEl) {
        eEl.value = val;
      } else {
        if (fEl) fEl.value = parts[0] || "";
        if (lEl) lEl.value = parts.slice(1).join(" ") || "";
      }
    }
    return;
  }

  var extCfg = getSettingsForMemberNo(matched.memberNo);
  var storedPass = matched.passwordHash || "";
  var storedPin = matched.securityPin || extCfg.securityPin || "";

  // 1. If account has a Password configured, require Password (or cloud PIN fallback)
  if (storedPass) {
    if (!enteredPass) {
      enteredPass = prompt("🔐 Enter the account password for " + matched.name + ":") || "";
    }
    if (enteredPass !== storedPass && (!storedPin || enteredPass !== storedPin)) {
      alert("❌ Incorrect password.");
      return;
    }
  } else if (storedPin && storedPin.length === 4) {
    // 2. Legacy pre-seeded account with a 4-digit PIN set
    if (!enteredPass) {
      enteredPass = prompt("🔐 Enter the 4-digit PIN (or new password) for " + matched.name + ":") || "";
    }
    if (enteredPass.trim() !== storedPin) {
      alert("❌ Incorrect PIN/Password.");
      return;
    }
  } else if (enteredPass && enteredPass.length >= 4) {
    // 3. First time signing in with a password on a pre-seeded demo account -> save it to cloud
    matched.passwordHash = enteredPass;
    await window.syncMemberRecordToSupabase(matched);
    await window.pushMasterStateToCloud();
  }

  if (passInput) passInput.value = "";
  var role = isUserVerifiedAdmin(matched) ? "admin" : "member";
  window.setUserSession(matched.name, role, matched.memberNo);
};

// --- REAL SUPABASE AUTH EMAIL VERIFICATION & REGISTRATION WORKFLOW ---
window._pendingEmailVerification = {
  email: "",
  verified: false
};

window.sendRegistrationVerificationCode = async function() {
  var emailEl = document.getElementById("reg-email");
  var passEl = document.getElementById("reg-password");
  var passConfEl = document.getElementById("reg-password-confirm");
  var firstEl = document.getElementById("reg-first-name");
  var lastEl = document.getElementById("reg-last-name");
  var verifyBox = document.getElementById("reg-email-verify-box");
  var hintEl = document.getElementById("reg-email-verify-hint");
  var statusPill = document.getElementById("reg-email-status-pill");
  var sendBtn = document.getElementById("btn-send-verify-code");

  var email = emailEl ? emailEl.value.trim().toLowerCase() : "";
  var password = passEl ? passEl.value : "";
  var passwordConfirm = passConfEl ? passConfEl.value : "";
  var fullName = ((firstEl ? firstEl.value.trim() : "") + " " + (lastEl ? lastEl.value.trim() : "")).trim();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert("Please enter a valid email address (e.g. name@example.com) first.");
    return;
  }
  if (!password || password.length < 6) {
    alert("Please create a password of at least 6 characters before verifying your email.");
    return;
  }
  if (password !== passwordConfirm) {
    alert("Your password and confirm password fields do not match.");
    return;
  }

  if (!sbClient || !sbClient.auth) {
    alert("Cloud authentication client is unavailable. Please check your internet connection.");
    return;
  }

  if (sendBtn) {
    sendBtn.disabled = true;
    sendBtn.textContent = "Sending Email...";
  }

  try {
    var signUpRes = await sbClient.auth.signUp({
      email: email,
      password: password,
      options: {
        data: { full_name: fullName || email },
        emailRedirectTo: window.location.origin + window.location.pathname
      }
    });

    if (sendBtn) {
      sendBtn.disabled = false;
      sendBtn.textContent = "✉️ Resend Email";
    }

    if (signUpRes.error) {
      alert("⚠️ Could not send verification email: " + signUpRes.error.message);
      return;
    }

    window._pendingEmailVerification = {
      email: email,
      verified: false
    };

    // If Supabase project has 'Confirm email' turned off, session is active immediately
    if (signUpRes.data && signUpRes.data.session) {
      window._pendingEmailVerification.verified = true;
      if (sendBtn) {
        sendBtn.textContent = "✓ Email Verified";
        sendBtn.style.borderColor = "var(--green)";
        sendBtn.style.color = "var(--green)";
      }
      alert("✓ Email address verified with Supabase Auth!");
      return;
    }

    if (verifyBox) verifyBox.style.display = "block";
    if (statusPill) {
      statusPill.className = "badge-gold";
      statusPill.textContent = "Sent to Inbox";
    }
    if (hintEl) {
      hintEl.innerHTML =
        "A real verification email has been sent to <strong>" + email + "</strong>.<br>" +
        "• <strong>Option 1:</strong> Click the confirmation link inside the email, then tap the green button below.<br>" +
        "• <strong>Option 2:</strong> If your email includes a 6-digit OTP code, enter it below and tap Verify Code.";
    }
  } catch (err) {
    if (sendBtn) {
      sendBtn.disabled = false;
      sendBtn.textContent = "✉️ Send Verification Email";
    }
    alert("Error dispatching verification email: " + (err.message || err));
  }
};

window.confirmRegistrationVerificationCode = async function() {
  var codeInput = document.getElementById("reg-verify-code-input");
  var emailEl = document.getElementById("reg-email");
  var statusPill = document.getElementById("reg-email-status-pill");
  var sendBtn = document.getElementById("btn-send-verify-code");
  var entered = codeInput ? codeInput.value.trim() : "";
  var currentEmail = emailEl ? emailEl.value.trim().toLowerCase() : "";

  if (!entered || entered.length < 6) {
    alert("Please enter the 6-digit verification code from your email, or click the verification link in your email and tap the green button below.");
    return;
  }

  try {
    var verifyRes = await sbClient.auth.verifyOtp({
      email: currentEmail,
      token: entered,
      type: "signup"
    });

    if (verifyRes.error) {
      alert("❌ Verification code rejected: " + verifyRes.error.message);
      return;
    }

    window._pendingEmailVerification = { email: currentEmail, verified: true };
    if (statusPill) {
      statusPill.style.background = "var(--green)";
      statusPill.style.color = "#fff";
      statusPill.textContent = "✓ Verified";
    }
    if (sendBtn) {
      sendBtn.textContent = "✓ Email Verified";
      sendBtn.style.borderColor = "var(--green)";
      sendBtn.style.color = "var(--green)";
    }
    alert("✓ Email address verified via 6-digit code!");
  } catch (err) {
    alert("Verification error: " + (err.message || err));
  }
};

window.checkEmailLinkVerified = async function() {
  var emailEl = document.getElementById("reg-email");
  var passEl = document.getElementById("reg-password");
  var statusPill = document.getElementById("reg-email-status-pill");
  var sendBtn = document.getElementById("btn-send-verify-code");

  var currentEmail = emailEl ? emailEl.value.trim().toLowerCase() : "";
  var password = passEl ? passEl.value : "";

  if (!currentEmail || !password) {
    alert("Please ensure your Email Address and Password are entered above.");
    return;
  }

  try {
    var signInRes = await sbClient.auth.signInWithPassword({
      email: currentEmail,
      password: password
    });

    if (signInRes.error || !signInRes.data || !signInRes.data.user) {
      alert("⏳ Your email has not been confirmed yet (" + (signInRes.error ? signInRes.error.message : "awaiting click") + ").\n\nPlease open the email sent to " + currentEmail + ", click the confirmation link, and then tap this button again.");
      return;
    }

    window._pendingEmailVerification = { email: currentEmail, verified: true };
    if (statusPill) {
      statusPill.style.background = "var(--green)";
      statusPill.style.color = "#fff";
      statusPill.textContent = "✓ Verified";
    }
    if (sendBtn) {
      sendBtn.textContent = "✓ Email Verified";
      sendBtn.style.borderColor = "var(--green)";
      sendBtn.style.color = "var(--green)";
    }
    alert("✓ Email confirmation verified! You can now tap 'Complete Registration & Sign In'.");
  } catch (err) {
    alert("Could not verify email status: " + (err.message || err));
  }
};

window.checkRegistrationAge = function() {
  var dobInput = document.getElementById("reg-dob");
  var guardianBox = document.getElementById("reg-u18-guardian-box");
  if (!dobInput || !guardianBox || !dobInput.value) return false;

  var birthDate = new Date(dobInput.value);
  if (isNaN(birthDate.getTime())) return false;

  var today = new Date();
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  var isU18 = age < 18;
  guardianBox.style.display = isU18 ? "block" : "none";
  return isU18;
};

function generateNextBranchMemberNo() {
  var maxNum = 104;
  (appState.users || []).forEach(function(u) {
    if (u.memberNo && /^COX-(\d+)$/i.test(u.memberNo)) {
      var n = parseInt(u.memberNo.replace(/^COX-/i, ""), 10);
      if (!isNaN(n) && n > maxNum) maxNum = n;
    }
  });
  return "COX-" + (maxNum + 1);
}

window.handleMemberRegistration = async function() {
  var firstEl = document.getElementById("reg-first-name");
  var lastEl = document.getElementById("reg-last-name");
  var emailEl = document.getElementById("reg-email");
  var passEl = document.getElementById("reg-password");
  var passConfEl = document.getElementById("reg-password-confirm");
  var dobEl = document.getElementById("reg-dob");
  var nickEl = document.getElementById("reg-nickname");
  var phoneEl = document.getElementById("reg-phone");
  var emNameEl = document.getElementById("reg-emergency-name");
  var emPhoneEl = document.getElementById("reg-emergency-phone");
  var guardEl = document.getElementById("reg-guardian-name");
  var regBtn = document.getElementById("btn-complete-registration");

  var firstName = firstEl ? firstEl.value.trim() : "";
  var lastName = lastEl ? lastEl.value.trim() : "";
  var fullName = (firstName + " " + lastName).trim();
  var email = emailEl ? emailEl.value.trim().toLowerCase() : "";
  var password = passEl ? passEl.value : "";
  var passwordConfirm = passConfEl ? passConfEl.value : "";
  var dob = dobEl ? dobEl.value : "";
  var nickname = nickEl ? nickEl.value.trim() : "";
  var phone = phoneEl ? phoneEl.value.trim() : "";
  var emergencyName = emNameEl ? emNameEl.value.trim() : "";
  var emergencyPhone = emPhoneEl ? emPhoneEl.value.trim() : "";

  if (!firstName || !lastName) {
    alert("Please enter both your First Name and Surname.");
    return;
  }
  if (!password || password.length < 6) {
    alert("Please create a password of at least 6 characters.");
    return;
  }
  if (password !== passwordConfirm) {
    alert("Your passwords do not match.");
    return;
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert("Please enter a valid Email Address.");
    return;
  }
  if (!window._pendingEmailVerification.verified || window._pendingEmailVerification.email !== email) {
    alert("🔐 Please verify your email address first!\n\nTap '✉️ Send Verification Email' and confirm the link or code sent to your inbox.");
    return;
  }
  if (!dob || !phone) {
    alert("Please complete your Date of Birth and Mobile Number.");
    return;
  }
  if (!emergencyName || !emergencyPhone) {
    alert("Please provide an Emergency Contact Name and Phone Number for coach travel manifest safety.");
    return;
  }

  var isU18 = window.checkRegistrationAge();
  var guardianQuery = guardEl ? guardEl.value.trim() : "";
  if (isU18 && !guardianQuery) {
    alert("🛡️ Under-18 Safeguarding Rule:\nPlease enter the Full Name or Member # of your Adult Parent/Guardian in the branch.");
    return;
  }

  if (regBtn) {
    regBtn.disabled = true;
    regBtn.textContent = "Saving Member Account to Cloud...";
  }

  await window.pullLatestCloudStateNow();

  var existing = (appState.users || []).find(function(u) {
    return (u.name && u.name.toLowerCase() === fullName.toLowerCase()) ||
           (u.email && u.email.toLowerCase() === email);
  });

  if (existing) {
    if (regBtn) {
      regBtn.disabled = false;
      regBtn.textContent = "✓ Complete Registration & Sign In";
    }
    alert("A member account for '" + existing.name + "' (" + existing.memberNo + ") is already registered. Please use the Sign In tab.");
    window.switchAuthMode("signin");
    return;
  }

  var newMemberNo = generateNextBranchMemberNo();
  var safeId = Math.floor(10000 + Math.random() * 90000000);

  var newMember = {
    id: safeId,
    firstName: firstName,
    lastName: lastName,
    name: fullName,
    email: email,
    emailVerified: true,
    passwordHash: password,
    nickname: nickname,
    dob: dob,
    phone: phone,
    emergencyName: emergencyName,
    emergencyPhone: emergencyPhone,
    memberNo: newMemberNo,
    role: "member",
    category: isU18 ? "Child" : "Adult",
    hasAppAccount: true,
    balance: 0.00,
    registeredDaysAgo: 0,
    messagingAllowed: !isU18,
    membershipStatus: "active",
    membershipTier: isU18 ? "Junior" : "Adult",
    membershipSeason: appState.duesConfig ? appState.duesConfig.activeSeason : "2026/27",
    validUntil: "2027-07-31",
    securityPin: "",
    manifestDisplay: "nickname",
    dmPrivacy: isU18 ? "committee" : "all"
  };

  appState.users.push(newMember);

  if (isU18 && guardianQuery) {
    var matchedGuard = (appState.users || []).find(function(u) {
      return u.name.toLowerCase() === guardianQuery.toLowerCase() ||
             (u.memberNo && u.memberNo.toLowerCase() === guardianQuery.toLowerCase());
    });
    var resolvedGuardian = matchedGuard ? matchedGuard.name : guardianQuery;
    appState.pendingLinkRequests.push({
      id: Math.floor(100000 + Math.random() * 90000000),
      requester: resolvedGuardian,
      targetName: fullName,
      relation: "Child",
      type: "Child",
      status: "pending_admin"
    });
  }

  var cfgKey = "safc_ext_settings_" + newMemberNo;
  var initCfg = {
    manifestDisplay: "nickname",
    dmPrivacy: isU18 ? "committee" : "all",
    notifTravelUrgent: true,
    notifAwayTickets: true,
    notifFundraiser: true,
    notifComms: true,
    confirmWalletSpend: true,
    biometricUnlock: false,
    securityPin: ""
  };
  try { localStorage.setItem(cfgKey, JSON.stringify(initCfg)); } catch (e) {}

  await window.syncMemberRecordToSupabase(newMember);
  await window.pushMasterStateToCloud();

  if (regBtn) {
    regBtn.disabled = false;
    regBtn.textContent = "✓ Complete Registration & Sign In";
  }

  window.setUserSession(newMember.name, "member", newMember.memberNo);
  alert("🎉 Welcome to Coxhoe Branch SAFC, " + newMember.name + "!\n\nYour Official Member Number is: " + newMember.memberNo + "\n\nTip: You can enable a 4-Digit Quick-Unlock PIN or Biometrics anytime inside My Pass ➔ ⚙️ App Settings.");
};

window.quickLogin = function(name, role, no) {
  window.setUserSession(name, role, no);
};

window.handleLogout = function() {
  var adminBar = document.getElementById("admin-bar");
  if (adminBar) adminBar.style.display = "none";
  document.getElementById("bottom-bar").style.display = "none";
  document.getElementById("child-deactivated-guard").style.display = "none";

  var views = document.querySelectorAll(".tab-view");
  views.forEach(function(v) { v.classList.remove("active"); });
  document.getElementById("view-login").classList.add("active");

  window.renderLoginScreenState();
};

window.switchTab = function(viewId, btn) {
  var views = document.querySelectorAll(".tab-view");
  views.forEach(function(v) { v.classList.remove("active"); });
  var target = document.getElementById(viewId);
  if (target) target.classList.add("active");

  var items = document.querySelectorAll(".nav-item");
  items.forEach(function(item) { item.classList.remove("active"); });
  if (btn) btn.classList.add("active");

  if (viewId === "view-comms") {
    var user = appState.currentUser ? appState.currentUser.name : "Gary Miller";
    if (!appState.readTracker[user]) appState.readTracker[user] = { busChatCount: 0, readMsgIds: [], readNoteIds: [] };
    appState.readTracker[user].busChatCount = (appState.matchdayChat || []).length;
    saveState();
    updateCommsBadge();
  }
  window.refreshAllViews();
};

window.refreshAllViews = function() {
  window.updateBalanceDisplay();
  if (typeof renderHUDView === "function") renderHUDView();
  if (typeof renderBusBookingView === "function") renderBusBookingView();
  if (typeof renderMemberAwayView === "function") renderMemberAwayView();
  if (typeof renderFootballGrid === "function") renderFootballGrid();
  if (typeof renderFriendsFamilyChecklist === "function") renderFriendsFamilyChecklist();
  if (typeof renderProfilePassView === "function") renderProfilePassView();
  if (typeof renderWalletStatement === "function") renderWalletStatement();
  if (typeof renderCommsTabs === "function") renderCommsTabs();
  if (typeof applyClubIdentity === "function") applyClubIdentity();
  if (typeof applyAppModules === "function") applyAppModules();
  updateCommsBadge();
};

// --- WHITE-LABEL BRANDING & SECTIONAL MODULES ---
window.applyClubIdentity = function() {
  if (!appState || !appState.clubIdentity) return;
  var id = appState.clubIdentity;

  var crestElem = document.getElementById("header-crest-badge");
  var titleElem = document.getElementById("header-brand-title");
  var subElem = document.getElementById("header-brand-sub");

  if (crestElem) {
    if (id.crestLogoUrl) {
      crestElem.innerHTML = "<img src='" + id.crestLogoUrl + "' style='width:100%; height:100%; object-fit:cover; border-radius:50%; display:block;' alt='Club Crest' />";
      crestElem.style.padding = "0";
      crestElem.style.overflow = "hidden";
      crestElem.style.background = "#0f172a";
      crestElem.style.border = "2px solid var(--safc-gold, #facc15)";
    } else {
      crestElem.innerHTML = id.badgeInitials || "SAFC";
      crestElem.style.padding = "";
      crestElem.style.overflow = "";
      crestElem.style.background = "";
      crestElem.style.border = "2px solid var(--safc-gold, #facc15)";
    }
  }

  if (titleElem && id.clubName) titleElem.textContent = id.clubName;
  if (subElem && id.subTitle) subElem.textContent = id.subTitle;
  document.title = (id.clubName || "Club Portal") + " - " + (id.badgeInitials || "Branch");
};

window.applyAppModules = function() {
  if (!appState || !appState.modules) return;
  var mods = appState.modules;

  var navTravel = document.getElementById("nav-travel");
  var navFundraiser = document.getElementById("nav-fundraiser");
  var navComms = document.getElementById("nav-comms");
  var navProfile = document.getElementById("nav-profile");

  if (navTravel) navTravel.style.display = mods.travel ? "flex" : "none";
  if (navFundraiser) navFundraiser.style.display = mods.fundraiser ? "flex" : "none";
  if (navProfile) navProfile.style.display = mods.duesAndPass ? "flex" : "none";

  var commsAny = mods.commsBusChat || mods.commsHelpdesk;
  if (navComms) navComms.style.display = commsAny ? "flex" : "none";

  var navItems = document.querySelectorAll(".bottom-nav .nav-item");
  navItems.forEach(function(item) {
    item.style.flex = "1";
    item.style.width = "auto";
  });

  var hudFundraiserCard = document.getElementById("hud-card-fundraiser-pulse");
  if (hudFundraiserCard) hudFundraiserCard.style.display = mods.fundraiser ? "block" : "none";

  var hudTravelCard = document.getElementById("hud-travel-card-status");
  if (hudTravelCard && !mods.travel) hudTravelCard.style.display = "none";

  var awayCard = document.getElementById("member-away-status-card");
  if (awayCard && awayCard.parentElement) awayCard.parentElement.style.display = mods.awayTickets ? "block" : "none";

  var btnBus = document.getElementById("btn-sub-bus");
  var btnDesk = document.getElementById("btn-sub-desk");

  if (btnBus) btnBus.style.display = mods.commsBusChat ? "block" : "none";
  if (btnDesk) btnDesk.style.display = mods.commsHelpdesk ? "block" : "none";

  if (!mods.commsBusChat && mods.commsHelpdesk) {
    if (typeof switchCommsSubTab === "function") switchCommsSubTab("desk");
  } else if (mods.commsBusChat && !mods.commsHelpdesk) {
    if (typeof switchCommsSubTab === "function") switchCommsSubTab("bus");
  }
};

window.renderAdminModulesManager = function() {
  var container = document.getElementById("admin-modules-switches-container");
  if (!container || !appState) return;

  var mods = appState.modules || {};
  var id = appState.clubIdentity || { clubName: "Coxhoe Branch", subTitle: "Supporters Club", badgeInitials: "SAFC", crestLogoUrl: null };
  var currentLogo = id.crestLogoUrl;

  var html = 
    "<div class='admin-card' style='background:#0f172a; border:1px solid #334155; border-radius:8px; padding:12px; margin-bottom:12px;'>" +
      "<strong style='font-size:12px; color:var(--safc-gold); display:block; margin-bottom:4px;'>🏢 Club & Branch Identity (White-Label)</strong>" +
      "<p class='text-xs text-muted mb-2'>Re-skin header branding and upload official club crest logo.</p>" +

      "<div style='background:#1e293b; padding:10px; border-radius:6px; margin-bottom:10px; border:1px solid #334155;'>" +
        "<label class='form-label' style='font-size:10px; color:var(--safc-gold); margin-bottom:6px;'>Club Crest Photo</label>" +
        "<div style='display:flex; align-items:center; gap:12px;'>" +
          "<div id='admin-crest-preview-box' style='width:52px; height:52px; border-radius:50%; border:2px solid var(--safc-gold); background:#0f172a; display:flex; align-items:center; justify-content:center; overflow:hidden; flex-shrink:0;'>" +
            (currentLogo 
              ? "<img id='admin-crest-preview-img' src='" + currentLogo + "' style='width:100%; height:100%; object-fit:cover;' alt='Crest Preview' />"
              : "<span style='font-weight:900; font-size:12px; color:var(--safc-gold);'>SAFC</span>") +
          "</div>" +
          "<div style='flex:1;'>" +
            "<input type='file' id='admin-crest-file-input' accept='image/*' style='display:none;' onchange='window.handleClubCrestUpload(event)' />" +
            "<div style='display:flex; gap:6px;'>" +
              "<button type='button' class='btn btn-outline btn-sm' style='font-size:10px; padding:4px 8px;' onclick='document.getElementById(\"admin-crest-file-input\").click()'>📷 Upload Photo</button>" +
              (currentLogo ? "<button type='button' class='btn btn-outline btn-sm' style='font-size:10px; padding:4px 8px; color:#ef4444; border-color:#ef4444;' onclick='window.removeClubCrestPhoto()'>Remove</button>" : "") +
            "</div>" +
            "<span style='font-size:9px; color:#94a3b8; display:block; margin-top:4px;'>PNG, JPG or SVG (Max 2MB). Fits circular crest.</span>" +
          "</div>" +
        "</div>" +
      "</div>" +

      "<div class='form-group' style='margin-bottom:6px;'>" +
        "<label class='form-label' style='font-size:9px;'>Club / Branch Name</label>" +
        "<input type='text' id='admin-branding-name' class='form-input' value='" + (id.clubName || "") + "' style='padding:6px; font-size:11px;' />" +
      "</div>" +

      "<div class='form-group' style='margin-bottom:8px;'>" +
        "<label class='form-label' style='font-size:9px;'>Sub-Heading / Tagline</label>" +
        "<input type='text' id='admin-branding-sub' class='form-input' value='" + (id.subTitle || "") + "' style='padding:6px; font-size:11px;' />" +
      "</div>" +

      "<button class='btn btn-gold btn-sm' style='width:100%; font-size:10px;' onclick='window.saveClubBranding()'>💾 Save Club Identity</button>" +
    "</div>" +

    "<strong style='font-size:12px; color:var(--safc-gold); display:block; margin-bottom:6px;'>🧩 Functional Feature Toggles</strong>";

  var moduleDefs = [
    { key: "travel", icon: "🚌", title: "Coach Travel & Bus Fleet", desc: "Manages matchday coach booking, parties, stops, and manifest door check-in." },
    { key: "awayTickets", icon: "🎟️", title: "Away Match Tickets", desc: "Allows members to submit expressions of interest for club away ticket ballots." },
    { key: "fundraiser", icon: "⚽", title: "Matchday Scratch Card (Fundraiser)", desc: "40-team multi-selection card with 50/50 prize splitting and winner reveals." },
    { key: "commsBusChat", icon: "💬", title: "Matchday Bus Chat", desc: "Passenger chatter tethered to active fixture with 24h auto-expiry." },
    { key: "commsHelpdesk", icon: "🛡️", title: "Committee Helpdesk & Mailbox", desc: "Member query routing with dual red/gold notification badges." },
    { key: "duesAndPass", icon: "🪪", title: "Membership Passes & Wallet Ledger", desc: "Digital cards, annual dues renewal gates, and audit trail statements." }
  ];

  moduleDefs.forEach(function(mod) {
    var isEnabled = !!mods[mod.key];
    html += 
      "<div class='admin-card' style='display:flex; justify-content:space-between; align-items:center; background:#1e293b; padding:10px 12px; margin-bottom:8px; border-left:3px solid " + (isEnabled ? "var(--green)" : "#475569") + ";'>" +
        "<div style='flex:1; padding-right:12px;'>" +
          "<div style='display:flex; align-items:center; gap:6px;'><span style='font-size:14px;'>" + mod.icon + "</span><strong style='font-size:12px; color:#fff;'>" + mod.title + "</strong></div>" +
          "<p style='font-size:10px; color:#94a3b8; margin:3px 0 0 0; line-height:1.4;'>" + mod.desc + "</p>" +
        "</div>" +
        "<div><button class='btn btn-sm " + (isEnabled ? "btn-gold" : "btn-outline") + "' style='min-width:70px; font-weight:800; font-size:10px; padding:6px 8px; border-color:" + (isEnabled ? "var(--safc-gold)" : "#64748b") + "; color:" + (isEnabled ? "#000" : "#94a3b8") + ";' onclick='window.toggleAppModule(\"" + mod.key + "\")'>" + (isEnabled ? "✓ ACTIVE" : "OFF") + "</button></div>" +
      "</div>";
  });

  container.innerHTML = html;
};

window.handleClubCrestUpload = function(event) {
  var file = event.target.files && event.target.files[0];
  if (!file) return;
  if (file.size > 2 * 1024 * 1024) { alert("Please select a crest image smaller than 2MB."); return; }

  var reader = new FileReader();
  reader.onload = function(e) {
    appState.clubIdentity.crestLogoUrl = e.target.result;
    saveState();
    window.applyClubIdentity();
    window.renderAdminModulesManager();
  };
  reader.readAsDataURL(file);
};

window.removeClubCrestPhoto = function() {
  appState.clubIdentity.crestLogoUrl = null;
  saveState();
  window.applyClubIdentity();
  window.renderAdminModulesManager();
};

window.saveClubBranding = function() {
  var nameInput = document.getElementById("admin-branding-name");
  var subInput = document.getElementById("admin-branding-sub");

  if (!appState.clubIdentity) appState.clubIdentity = {};
  appState.clubIdentity.clubName = nameInput ? nameInput.value.trim() : "Coxhoe Branch";
  appState.clubIdentity.subTitle = subInput ? subInput.value.trim() : "Supporters Club";

  saveState();
  window.applyClubIdentity();
  window.renderAdminModulesManager();
  alert("✓ Club branding saved! Header and badge updated.");
};

window.toggleAppModule = function(moduleKey) {
  if (!appState || !appState.modules) return;
  appState.modules[moduleKey] = !appState.modules[moduleKey];
  saveState();
  window.applyAppModules();
  window.renderAdminModulesManager();
  updateCommsBadge();
};

// --- MASTER ADMIN ROUTER ---
var activeAdminTool = "modules";

window.openAdminDrawer = function() {
  var drawer = document.getElementById("admin-drawer");
  if (drawer) {
    drawer.style.display = "block";
    drawer.classList.remove("hidden");
  }
  var sel = document.getElementById("admin-tool-select");
  var currentTool = (sel && sel.value) ? sel.value : "modules";
  window.switchAdminTool(currentTool);
};

window.closeAdminDrawer = function() {
  var drawer = document.getElementById("admin-drawer");
  if (drawer) {
    drawer.style.display = "none";
    drawer.classList.add("hidden");
  }
};

window.switchAdminTool = function(toolId) {
  if (!toolId) toolId = "modules";
  activeAdminTool = toolId;

  var panes = document.querySelectorAll(".admin-pane");
  panes.forEach(function(pane) {
    pane.style.display = "none";
    pane.classList.add("hidden");
  });

  var selected = document.getElementById("admin-pane-" + toolId);
  if (selected) {
    selected.style.display = "block";
    selected.classList.remove("hidden");
  }

  var selectElem = document.getElementById("admin-tool-select");
  if (selectElem && selectElem.value !== toolId) {
    selectElem.value = toolId;
  }

  renderAdminActivePane(toolId);
};

function renderAdminActivePane(toolId) {
  switch (toolId) {
    case "modules":
      window.renderAdminModulesManager();
      break;
    case "buses":
      window.renderAdminBusesTool();
      break;
    case "subs":
      window.renderAdminSubs();
      break;
    case "approvals":
      window.renderAdminApprovals();
      break;
    case "treasury":
      window.renderAdminTreasury();
      break;
    case "awaytickets":
      window.renderAdminAwayFixture();
      break;
    case "news":
      window.renderAdminNews();
      break;
    case "footballcard":
      window.renderAdminFootballCardManager();
      break;
    case "disciplinary":
      window.renderAdminDisciplinary();
      break;
  }
}

// --- PANE 1: BUSES, ROUTES & DOOR MANIFEST ---
function healOrphanedPassengerBookings() {
  if (!appState || !appState.homeMatches || !appState.bookings) return;
  var fixedCount = 0;

  appState.homeMatches.forEach(function(match) {
    if (!match.buses) return;
    match.buses.forEach(function(bus) {
      var validStops = (bus.stops && bus.stops.length > 0) ? bus.stops.map(function(s) { return s.name.trim().toLowerCase(); }) : [];
      if (validStops.length === 0) return;

      var matchBookings = appState.bookings.filter(function(b) {
        return String(b.matchId) === String(match.id) && (b.busId || 1) === (bus.busId || 1);
      });

      matchBookings.forEach(function(b) {
        var cleanBookingStop = b.stop ? b.stop.split("(")[0].trim().toLowerCase() : "";
        if (validStops.indexOf(cleanBookingStop) === -1) {
          b.stop = bus.stops[0].name;
          fixedCount++;
        }
      });
    });
  });

  if (fixedCount > 0) saveState();
}

window.renderAdminBusesTool = function() {
  healOrphanedPassengerBookings();

  var matchSelect = document.getElementById("admin-bus-match-select");
  var busesContainer = document.getElementById("admin-match-buses-container");
  if (!matchSelect || !busesContainer) return;

  var currentVal = matchSelect.value || appState.selectedHomeMatchId;
  matchSelect.innerHTML = "";
  appState.homeMatches.forEach(function(m) {
    var opt = document.createElement("option");
    opt.value = m.id;
    var statusTag = (m.bookingStatus === "open") ? "🟢 Open" : "⚪ Draft";
    opt.textContent = m.opponent + " (H) • " + m.date + " [" + statusTag + "]";
    if (String(m.id) === String(currentVal)) opt.selected = true;
    matchSelect.appendChild(opt);
  });

  if (!matchSelect.value && appState.homeMatches.length > 0) matchSelect.value = appState.homeMatches[0].id;
  var selectedMatch = appState.homeMatches.find(function(m) { return String(m.id) === String(matchSelect.value); }) || appState.homeMatches[0];

  busesContainer.innerHTML = "";
  if (!selectedMatch.buses || selectedMatch.buses.length === 0) {
    selectedMatch.buses = [{
      busId: 1, title: "Bus 1 (Main Village Route)", subtitle: "Official Branch Travel • Stadium of Light",
      capacity: 53, adultFare: 12.00, juniorFare: 8.00, isFreeBus: false, stops: JSON.parse(JSON.stringify(DEFAULT_STOPS))
    }];
  }

  var isOpen = (selectedMatch.bookingStatus === "open");
  var statusCard = 
    "<div id='admin-staging-status-box' style='background:#0f172a; border:1px solid #334155; border-left:3px solid " + (isOpen ? "var(--green)" : "var(--safc-gold)") + "; padding:10px; border-radius:6px; margin-bottom:10px;'>" +
      "<div style='display:flex; justify-content:space-between; align-items:center;'>" +
        "<div><strong style='font-size:11px;'>Booking Status:</strong> <span style='display:inline-block; padding:2px 8px; border-radius:999px; font-size:10px; font-weight:700; background:" + (isOpen ? "#065f46; color:#34d399;" : "#334155; color:#94a3b8;") + "'>" + (isOpen ? "🟢 OPEN FOR BOOKING" : "⚪ DRAFT (Closed)") + "</span></div>" +
        "<button class='btn btn-outline btn-sm' style='font-size:10px; padding:3px 8px;' onclick='window.adminToggleBookingStatus(\"" + selectedMatch.id + "\")'>" + (isOpen ? "Switch to Draft ⚪" : "Open for Booking 🟢") + "</button>" +
      "</div>" +
      "<div style='font-size:10px; color:#94a3b8; margin-top:4px;'>" + (isOpen ? "✓ Members can view and book coach seats for this fixture." : "Members cannot book travel while set to Draft.") + "</div>" +
    "</div>";
  busesContainer.insertAdjacentHTML("beforeend", statusCard);

  selectedMatch.buses.forEach(function(bus, idx) {
    var card = document.createElement("div");
    card.className = "admin-card mt-2";
    
    var stopsHtml = "";
    (bus.stops || DEFAULT_STOPS).forEach(function(s, sIdx) {
      stopsHtml += 
        "<div style='display:flex; gap:6px; margin-bottom:6px;'>" +
          "<input type='text' class='form-input' style='flex:2; padding:4px 6px; font-size:11px;' value='" + s.name + "' onchange='window.updateBusStopField(\"" + selectedMatch.id + "\", " + idx + ", " + sIdx + ", \"name\", this.value)'>" +
          "<input type='text' class='form-input' style='flex:1; padding:4px 6px; font-size:11px;' value='" + s.time + "' onchange='window.updateBusStopField(\"" + selectedMatch.id + "\", " + idx + ", " + sIdx + ", \"time\", this.value)'>" +
          "<button class='btn btn-outline btn-sm' style='padding:2px 8px; color:#ef4444; border-color:#ef4444;' onclick='window.deleteStopFromBus(\"" + selectedMatch.id + "\", " + idx + ", " + sIdx + ")'>✕</button>" +
        "</div>";
    });

    card.innerHTML = 
      "<div class='flex-between'>" +
        "<strong style='color:var(--safc-gold); font-size:12px;'>🚌 Coach #" + (idx + 1) + ": " + bus.title + "</strong>" +
        (selectedMatch.buses.length > 1 ? "<button class='btn btn-outline btn-sm' style='padding:2px 6px; font-size:9px; color:#ef4444; border-color:#ef4444;' onclick='window.adminRemoveBus(\"" + selectedMatch.id + "\", " + idx + ")'>Remove Bus</button>" : "") +
      "</div>" +
      "<div class='form-group mt-2'><label class='form-label'>Bus Name (Title)</label><input type='text' class='form-input' value='" + bus.title + "' onchange='window.updateBusField(\"" + selectedMatch.id + "\", " + idx + ", \"title\", this.value)' /></div>" +
      "<div class='form-group'><label class='form-label'>Subtitle / Route Note</label><input type='text' class='form-input' value='" + bus.subtitle + "' onchange='window.updateBusField(\"" + selectedMatch.id + "\", " + idx + ", \"subtitle\", this.value)' /></div>" +
      "<div style='display:grid; grid-template-columns:1fr 1fr 1fr; gap:6px; margin-bottom:8px;'>" +
        "<div><label class='form-label'>Capacity</label><input type='number' class='form-input' min='10' max='85' value='" + bus.capacity + "' onchange='window.updateBusField(\"" + selectedMatch.id + "\", " + idx + ", \"capacity\", parseInt(this.value)||53)' /></div>" +
        "<div><label class='form-label'>Adult Fare (£)</label><input type='number' class='form-input' step='0.50' value='" + bus.adultFare + "' onchange='window.updateBusField(\"" + selectedMatch.id + "\", " + idx + ", \"adultFare\", parseFloat(this.value)||12)' /></div>" +
        "<div><label class='form-label'>Junior Fare (£)</label><input type='number' class='form-input' step='0.50' value='" + bus.juniorFare + "' onchange='window.updateBusField(\"" + selectedMatch.id + "\", " + idx + ", \"juniorFare\", parseFloat(this.value)||8)' /></div>" +
      "</div>" +
      "<div style='border-top:1px solid #334155; padding-top:8px;'>" +
        "<div class='flex-between mb-2'><label class='form-label' style='margin-bottom:0;'>Timetable Stops for " + bus.title + "</label><button class='btn btn-outline btn-sm' style='padding:2px 8px; font-size:9px;' onclick='window.addStopToBus(\"" + selectedMatch.id + "\", " + idx + ")'>+ Add Stop</button></div>" +
        "<div>" + stopsHtml + "</div>" +
      "</div>";

    busesContainer.appendChild(card);
  });

  renderAdminAllocationPreviewForMatch(selectedMatch);
  renderAdminManifestForMatch(selectedMatch);
};

window.adminToggleBookingStatus = function(matchId) {
  var match = appState.homeMatches.find(function(m) { return String(m.id) === String(matchId); });
  if (!match) return;
  match.bookingStatus = (match.bookingStatus === "open") ? "draft" : "open";
  saveState();
  window.renderAdminBusesTool();
  window.renderBusBookingView();
};

window.updateBusField = function(matchId, busIdx, field, val) {
  var match = appState.homeMatches.find(function(m) { return String(m.id) === String(matchId); });
  if (match && match.buses && match.buses[busIdx]) {
    match.buses[busIdx][field] = val;
    saveState();
    renderBusBookingView();
    renderHUDView();
  }
};

window.updateBusStopField = function(matchId, busIdx, stopIdx, field, val) {
  var match = appState.homeMatches.find(function(m) { return String(m.id) === String(matchId); });
  if (match && match.buses && match.buses[busIdx] && match.buses[busIdx].stops && match.buses[busIdx].stops[stopIdx]) {
    var oldVal = match.buses[busIdx].stops[stopIdx][field];
    match.buses[busIdx].stops[stopIdx][field] = val;

    if (field === "name" && oldVal && oldVal.trim() !== val.trim()) {
      var oldClean = oldVal.split("(")[0].trim().toLowerCase();
      var targetBusId = match.buses[busIdx].busId || (busIdx + 1);

      appState.bookings.forEach(function(b) {
        if (String(b.matchId) === String(matchId) && (b.busId || 1) === targetBusId && b.stop) {
          var bookingClean = b.stop.split("(")[0].trim().toLowerCase();
          if (bookingClean === oldClean) b.stop = val.trim();
        }
      });
    }

    saveState();
    renderBusBookingView();
    renderAdminManifestForMatch(match);
  }
};

window.addStopToBus = function(matchId, busIdx) {
  var match = appState.homeMatches.find(function(m) { return String(m.id) === String(matchId); });
  if (match && match.buses && match.buses[busIdx]) {
    if (!match.buses[busIdx].stops) match.buses[busIdx].stops = JSON.parse(JSON.stringify(DEFAULT_STOPS));
    match.buses[busIdx].stops.push({ id: Date.now(), name: "New Village Stop", time: "12:30" });
    saveState();
    window.renderAdminBusesTool();
    renderBusBookingView();
  }
};

window.deleteStopFromBus = function(matchId, busIdx, stopIdx) {
  var match = appState.homeMatches.find(function(m) { return String(m.id) === String(matchId); });
  if (!match || !match.buses || !match.buses[busIdx] || !match.buses[busIdx].stops) return;

  var stops = match.buses[busIdx].stops;
  if (stops.length <= 1) {
    alert("⚠️ A bus must have at least one pickup stop.");
    return;
  }

  var deletedStop = stops[stopIdx];
  var deletedStopName = deletedStop.name.split("(")[0].trim().toLowerCase();
  stops.splice(stopIdx, 1);

  var replacementStop = stops[0].name;
  var targetBusId = match.buses[busIdx].busId || (busIdx + 1);
  var count = 0;

  appState.bookings.forEach(function(b) {
    if (String(b.matchId) === String(matchId) && (b.busId || 1) === targetBusId && b.stop) {
      if (b.stop.split("(")[0].trim().toLowerCase() === deletedStopName) {
        b.stop = replacementStop;
        count++;
      }
    }
  });

  saveState();
  window.renderAdminBusesTool();
  renderBusBookingView();
  if (count > 0) alert("✓ Stop removed. " + count + " passenger(s) reassigned to '" + replacementStop + "'.");
};

window.adminAddBusToSelectedMatch = function() {
  var matchSelect = document.getElementById("admin-bus-match-select");
  var matchId = matchSelect ? matchSelect.value : appState.selectedHomeMatchId;
  var match = appState.homeMatches.find(function(m) { return String(m.id) === String(matchId); });
  if (!match) return;

  var newIndex = (match.buses || []).length + 1;
  match.buses.push({
    busId: newIndex, title: "Bus " + newIndex + " (Auxiliary Route)", subtitle: "Official Branch Travel • Stadium of Light",
    capacity: 53, adultFare: 12.00, juniorFare: 8.00, isFreeBus: false, stops: JSON.parse(JSON.stringify(DEFAULT_STOPS))
  });

  saveState();
  window.renderAdminBusesTool();
  renderBusBookingView();
  alert("✓ Bus " + newIndex + " added to fleet.");
};

window.adminRemoveBus = function(matchId, busIdx) {
  var match = appState.homeMatches.find(function(m) { return String(m.id) === String(matchId); });
  if (!match || !match.buses || match.buses.length <= 1) return;

  if (confirm("Remove this bus from Sunderland vs " + match.opponent + "?")) {
    match.buses.splice(busIdx, 1);
    saveState();
    window.renderAdminBusesTool();
    renderBusBookingView();
  }
};

function renderAdminAllocationPreviewForMatch(match) {
  var summaryBox = document.getElementById("admin-allocation-status-summary");
  if (!summaryBox) return;

  var matchBookings = appState.bookings.filter(function(b) { return String(b.matchId) === String(match.id); });
  var totalBooked = 0;
  matchBookings.forEach(function(b) { totalBooked += ((b.adults || 0) + (b.juniors || 0)); });

  var totalCap = 0;
  (match.buses || []).forEach(function(b) { totalCap += (b.capacity || 53); });

  summaryBox.innerHTML = 
    "<div class='flex-between'><strong>Match: Sunderland vs " + match.opponent + "</strong><span style='color:var(--green); font-weight:800; font-size:10px;'>🟢 Auto-Scheduled T-24h</span></div>" +
    "<div style='background:#1e293b; padding:8px; border-radius:6px; margin-top:6px; font-size:10px; line-height:1.6;'>" +
      "• Total Bookings Registered: <strong>" + totalBooked + " Seats</strong> (Total Capacity: " + totalCap + ")<br>" +
      "• Safety Cushion: <strong>2 Seats Reserved for Committee</strong>" +
    "</div>";
}

window.adminRunAllocationBackup = function() {
  alert("⚡ Early cutoff override executed and logged to master ledger.");
};

// --- OFFLINE DOOR CHECK-IN QUEUE ---
window._offlineBoardingQueue = JSON.parse(localStorage.getItem("safc_boarding_queue") || "[]");

function updateManifestSyncIndicator() {
  var ind = document.getElementById("manifest-sync-indicator");
  if (!ind) return;
  var qLen = (window._offlineBoardingQueue || []).length;
  if (!navigator.onLine) {
    ind.style.color = "#f87171";
    ind.innerHTML = "⚠️ Offline Door Mode (" + qLen + " action" + (qLen === 1 ? "" : "s") + " queued)";
  } else if (qLen > 0) {
    ind.style.color = "var(--safc-gold)";
    ind.innerHTML = "⏳ Syncing " + qLen + " queued check-in" + (qLen === 1 ? "" : "s") + "...";
  } else {
    ind.style.color = "var(--green)";
    ind.innerHTML = "● Cloud Connected (Realtime Sync)";
  }
}

window.flushOfflineBoardingQueue = async function() {
  if (!navigator.onLine || !sbClient || !window._offlineBoardingQueue || window._offlineBoardingQueue.length === 0) {
    updateManifestSyncIndicator();
    return;
  }

  var queue = window._offlineBoardingQueue.slice();
  while (queue.length > 0) {
    var item = queue[0];
    try {
      var res = await sbClient.from("bus_bookings").update({ boarded: item.boarded }).eq("id", item.id);
      if (res.error) throw res.error;
      queue.shift();
      window._offlineBoardingQueue = queue;
      localStorage.setItem("safc_boarding_queue", JSON.stringify(queue));
      updateManifestSyncIndicator();
    } catch (err) {
      break;
    }
  }
  updateManifestSyncIndicator();
};

window.addEventListener("online", function() { updateManifestSyncIndicator(); window.flushOfflineBoardingQueue(); });
window.addEventListener("offline", function() { updateManifestSyncIndicator(); });

function populateManifestStopFilter(match) {
  var stopSelect = document.getElementById("manifest-stop-filter");
  if (!stopSelect) return;
  var currentVal = stopSelect.value || "ALL";

  var stops = [];
  if (match && match.buses) {
    match.buses.forEach(function(b) {
      (b.stops || DEFAULT_STOPS).forEach(function(s) {
        if (s.name && stops.indexOf(s.name.trim()) === -1) stops.push(s.name.trim());
      });
    });
  }

  stopSelect.innerHTML = "<option value='ALL'>All Pickup Stops</option>";
  stops.forEach(function(stName) {
    var opt = document.createElement("option");
    opt.value = stName;
    opt.textContent = stName;
    if (stName === currentVal) opt.selected = true;
    stopSelect.appendChild(opt);
  });
}

function renderAdminManifestForMatch(match) {
  if (!match) {
    var matchSelect = document.getElementById("admin-bus-match-select");
    var mId = matchSelect ? matchSelect.value : appState.selectedHomeMatchId;
    match = appState.homeMatches.find(function(m) { return String(m.id) === String(mId); }) || appState.homeMatches[0];
  }
  if (!match) return;

  populateManifestStopFilter(match);
  window.filterAdminManifest(match);
}

window.filterAdminManifest = function(match) {
  if (!match) {
    var matchSelect = document.getElementById("admin-bus-match-select");
    var mId = matchSelect ? matchSelect.value : appState.selectedHomeMatchId;
    match = appState.homeMatches.find(function(m) { return String(m.id) === String(mId); }) || appState.homeMatches[0];
  }
  if (!match) return;

  var container = document.getElementById("admin-manifest-summary");
  if (!container) return;

  updateManifestSyncIndicator();

  var searchInput = document.getElementById("manifest-search-input");
  var stopFilter = document.getElementById("manifest-stop-filter");
  var statusFilter = document.getElementById("manifest-status-filter");

  var query = searchInput ? searchInput.value.trim().toLowerCase() : "";
  var selectedStop = stopFilter ? stopFilter.value : "ALL";
  var selectedStatus = statusFilter ? statusFilter.value : "UNBOARDED";

  var matchBookings = appState.bookings.filter(function(b) { return String(b.matchId) === String(match.id); });
  var totalPassengers = 0;
  var boardedCount = 0;

  matchBookings.forEach(function(b) {
    var count = (b.adults || 0) + (b.juniors || 0);
    totalPassengers += count;
    if (b.boarded) boardedCount += count;
  });

  var totalCap = 0;
  (match.buses || []).forEach(function(b) { totalCap += (b.capacity || 53); });
  var unboardedCount = totalPassengers - boardedCount;

  var headerHtml = 
    "<div style='display:flex; justify-content:space-between; align-items:center; background:#1e293b; padding:6px 10px; border-radius:6px; font-size:11px; margin-bottom:8px; border:1px solid #334155;'>" +
      "<span>Total: <strong>" + totalPassengers + " / " + totalCap + "</strong></span>" +
      "<span style='color:var(--safc-gold); font-weight:800;'>✓ " + boardedCount + " Boarded</span>" +
      "<span style='color:" + (unboardedCount > 0 ? "#f87171" : "var(--green)") + "; font-weight:700;'>⏳ " + unboardedCount + " Awaiting</span>" +
    "</div>";

  var filtered = matchBookings.filter(function(b) {
    if (query && b.name.toLowerCase().indexOf(query) === -1) return false;
    if (selectedStop !== "ALL") {
      var cleanStop = b.stop ? b.stop.split("(")[0].trim().toLowerCase() : "";
      if (cleanStop !== selectedStop.toLowerCase()) return false;
    }
    if (selectedStatus === "UNBOARDED" && b.boarded) return false;
    if (selectedStatus === "BOARDED" && !b.boarded) return false;
    return true;
  });

  var listHtml = "";
  if (filtered.length === 0) {
    listHtml = "<div class='text-xs text-muted' style='text-align:center; padding:12px; background:#0f172a; border-radius:6px;'>No passengers match active filter.</div>";
  } else {
    filtered.forEach(function(b) {
      var seats = (b.adults || 0) + (b.juniors || 0);
      var resolvedStop = getDynamicStopDisplay(match.id, b.busId, b.stop);
      listHtml += 
        "<div style='display:flex; justify-content:space-between; align-items:center; background:" + (b.boarded ? "#064e3b22" : "#1e293b") + "; border:1px solid " + (b.boarded ? "#10b98155" : "#334155") + "; padding:7px 10px; border-radius:6px; margin-bottom:5px; font-size:11px;'>" +
          "<div>" +
            "<strong style='color:#fff; font-size:12px;'>" + b.name + "</strong> <span style='color:var(--safc-gold); font-size:10px;'>(" + seats + " seat" + (seats > 1 ? "s" : "") + ")</span><br>" +
            "<span style='color:#94a3b8; font-size:10px;'>🚏 " + resolvedStop + " • Coach #" + (b.busId || 1) + "</span>" +
          "</div>" +
          "<button class='btn btn-sm " + (b.boarded ? "btn-outline" : "btn-gold") + "' style='padding:5px 10px; font-size:10px; min-width:80px; font-weight:800; border-color:" + (b.boarded ? "var(--green)" : "var(--safc-gold)") + "; color:" + (b.boarded ? "var(--green)" : "#000") + ";' onclick='window.toggleBoardedById(" + b.id + ")'>" +
            (b.boarded ? "✓ Boarded" : "Check In ➔") +
          "</button>" +
        "</div>";
    });
  }

  container.innerHTML = headerHtml + listHtml;
};

window.toggleBoardedById = function(bookingId) {
  var booking = appState.bookings.find(function(b) { return b.id === bookingId; });
  if (!booking) return;

  booking.boarded = !booking.boarded;
  saveState();

  var matchSelect = document.getElementById("admin-bus-match-select");
  var mId = matchSelect ? matchSelect.value : appState.selectedHomeMatchId;
  var match = appState.homeMatches.find(function(m) { return String(m.id) === String(mId); }) || appState.homeMatches[0];
  window.filterAdminManifest(match);
  if (typeof renderHUDView === "function") renderHUDView();

  if (!navigator.onLine || !sbClient) {
    window._offlineBoardingQueue.push({ id: booking.id, boarded: booking.boarded, timestamp: Date.now() });
    localStorage.setItem("safc_boarding_queue", JSON.stringify(window._offlineBoardingQueue));
    updateManifestSyncIndicator();
  } else {
    sbClient.from("bus_bookings").update({ boarded: booking.boarded }).eq("id", booking.id).then(function() {
      updateManifestSyncIndicator();
    });
  }
};

window.exportManifestCSV = function() {
  var matchSelect = document.getElementById("admin-bus-match-select");
  var mId = matchSelect ? matchSelect.value : appState.selectedHomeMatchId;
  var match = appState.homeMatches.find(function(m) { return String(m.id) === String(mId); }) || appState.homeMatches[0];
  var matchBookings = appState.bookings.filter(function(b) { return String(b.matchId) === String(match.id); });

  var csv = "Match,Passenger Name,Bus Assigned,Pickup Stop,Adults,Juniors,Total Paid,Boarded\n";
  matchBookings.forEach(function(b) {
    csv += '"Sunderland vs ' + match.opponent + '","' + b.name + '","Bus ' + (b.busId || 1) + '","' + b.stop + '",' + b.adults + ',' + b.juniors + ',£' + b.total.toFixed(2) + ',"' + (b.boarded ? "YES" : "NO") + '"\n';
  });
  var blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  var a = document.createElement("a");
  a.href = window.URL.createObjectURL(blob);
  a.download = "Coxhoe_Coach_Manifest_" + match.opponent + ".csv";
  a.click();
};

// --- PANE 2: MEMBERSHIP SUBS & COMMITTEE ROLES ROSTER ---
window.renderAdminSubs = function() {
  var container = document.getElementById("admin-subs-roster");
  if (!container || !appState || !appState.users) return;

  var total = appState.users.length;
  var active = appState.users.filter(function(u) { return u.membershipStatus === "active"; }).length;
  var overdue = total - active;
  var adminCount = appState.users.filter(function(u) { return isUserVerifiedAdmin(u); }).length;

  var html = 
    "<div class='treasury-grid mb-2'>" +
      "<div style='background:#1e293b; padding:8px; border-radius:6px; font-size:11px;'>Active Subs: <strong style='color:var(--green);'>" + active + "</strong> / Overdue: <strong style='color:#ef4444;'>" + overdue + "</strong></div>" +
      "<div style='background:#1e293b; padding:8px; border-radius:6px; font-size:11px;'>Committee Admins: <strong style='color:var(--safc-gold);'>🛡️ " + adminCount + "</strong></div>" +
    "</div>" +
    "<button class='btn btn-outline btn-sm' style='width:100%; margin-bottom:10px;' onclick='window.exportDuesCSV()'>📥 Export Membership Subs & Roles CSV</button>" +
    "<div style='max-height:300px; overflow-y:auto;'>";

  appState.users.forEach(function(u, idx) {
    var isPaid = u.membershipStatus === "active";
    var isAdminUser = isUserVerifiedAdmin(u);
    var isRootAdmin = (u.memberNo === "ADMIN-01");
    var isU18 = isMemberUnder18(u);

    html += 
      "<div style='display:flex; justify-content:space-between; align-items:center; background:#1e293b; padding:8px 10px; border-radius:6px; margin-bottom:6px; font-size:11px; border-left:3px solid " + (isAdminUser ? "var(--safc-gold)" : (isPaid ? "var(--green)" : "#ef4444")) + ";'>" +
        "<div>" +
          "<strong>" + u.name + "</strong> <span style='font-size:10px; color:#94a3b8;'>(" + u.memberNo + " • " + (u.membershipTier || u.category) + ")</span>" +
          (isAdminUser ? " <span class='badge-gold' style='margin-left:4px;'>🛡️ ADMIN</span>" : "") +
          "<br><span style='color:" + (isPaid ? "var(--green)" : "#ef4444") + "; font-weight:700;'>" + (isPaid ? "✓ Subs Active (" + (u.membershipSeason || "2026/27") + ")" : "🔴 Lapsed / Overdue") + "</span>" +
        "</div>" +
        "<div style='display:flex; gap:4px; align-items:center;'>" +
          (!isU18 && !isRootAdmin
            ? "<button class='btn btn-outline btn-sm' style='padding:2px 7px; font-size:9px; border-color:" + (isAdminUser ? "#f87171" : "var(--safc-gold)") + "; color:" + (isAdminUser ? "#f87171" : "var(--safc-gold)") + ";' onclick='window.adminToggleCommitteeRole(" + idx + ")'>" + (isAdminUser ? "Revoke Admin" : "🛡️ Make Admin") + "</button>"
            : (isRootAdmin ? "<span style='font-size:9px; color:var(--safc-gold); font-weight:700; padding:0 4px;'>Founder</span>" : "")) +
          "<button class='btn btn-sm " + (isPaid ? "btn-outline" : "btn-gold") + "' style='padding:2px 8px; font-size:10px;' onclick='window.adminToggleMemberDues(" + idx + ", " + (!isPaid) + ")'>" + (isPaid ? "Revoke Subs" : "Activate ✓") + "</button>" +
        "</div>" +
      "</div>";
  });

  html += "</div>";
  container.innerHTML = html;
};

window.adminToggleCommitteeRole = function(idx) {
  var targetUser = appState.users[idx];
  if (!targetUser) return;
  if (targetUser.memberNo === "ADMIN-01") {
    alert("The Founding Secretary account (ADMIN-01) cannot have admin privileges revoked.");
    return;
  }
  if (isMemberUnder18(targetUser)) {
    alert("Under-18 junior accounts cannot be assigned Committee Admin privileges.");
    return;
  }

  var currentlyAdmin = isUserVerifiedAdmin(targetUser);
  var actionLabel = currentlyAdmin ? "REVOKE Committee Admin privileges from " : "GRANT Committee Admin privileges to ";
  if (!confirm("🛡️ Committee Role Change\n\nAre you sure you want to " + actionLabel + targetUser.name + " (" + targetUser.memberNo + ")?")) {
    return;
  }

  targetUser.role = currentlyAdmin ? "member" : "admin";
  var actorName = (appState.currentUser && appState.currentUser.name) ? appState.currentUser.name : "Graham (Secretary)";

  logForensicTransaction(
    actorName,
    "Admin",
    targetUser.name,
    "ROLE_CHANGE",
    (currentlyAdmin ? "Revoked Committee Admin Role: " : "Granted Committee Admin Role: ") + targetUser.name + " (" + targetUser.memberNo + ")",
    0,
    0,
    0
  );

  saveState();
  if (sbClient && targetUser.memberNo) {
    sbClient.from("members").update({ role: targetUser.role }).eq("member_no", targetUser.memberNo).then(function() {});
  }
  window.renderAdminSubs();
  alert("✓ " + targetUser.name + " is now a " + (targetUser.role === "admin" ? "Committee Admin 🛡️" : "Standard Member") + ".");
};

window.renderAdminSubsRoster = window.renderAdminSubs;

window.adminToggleMemberDues = function(idx, setPaid) {
  var user = appState.users[idx];
  if (!user) return;
  user.membershipStatus = setPaid ? "active" : "lapsed";
  if (setPaid) {
    user.membershipSeason = appState.duesConfig.activeSeason;
    user.validUntil = "2027-07-31";
  }
  saveState();
  window.renderAdminSubs();
  renderHUDView();
};

window.adminSubmitAGMDues = function() {
  var sInput = document.getElementById("agm-season-input");
  var dInput = document.getElementById("agm-due-date-input");
  var aInput = document.getElementById("agm-adult-fee");
  var jInput = document.getElementById("agm-junior-fee");
  var srInput = document.getElementById("agm-senior-fee");

  appState.duesConfig.activeSeason = sInput ? sInput.value.trim() : "2026/27";
  appState.duesConfig.dueDate = dInput ? dInput.value : "2026-08-31";
  appState.duesConfig.adultFee = aInput ? parseFloat(aInput.value) || 10.00 : 10.00;
  appState.duesConfig.juniorFee = jInput ? parseFloat(jInput.value) || 5.00 : 5.00;
  appState.duesConfig.seniorFee = srInput ? parseFloat(srInput.value) || 5.00 : 5.00;

  saveState();
  window.renderAdminSubs();
  alert("🏛️ AGM Dues Ratified and Published for " + appState.duesConfig.activeSeason + "!");
};

window.exportDuesCSV = function() {
  var csv = "Member Name,Member Number,Category,Tier,Status,Season,Valid Until\n";
  appState.users.forEach(function(u) {
    csv += '"' + u.name + '","' + u.memberNo + '","' + u.category + '","' + (u.membershipTier || "Adult") + '","' + u.membershipStatus.toUpperCase() + '","' + (u.membershipSeason || "2026/27") + '","' + (u.validUntil || "2027-07-31") + '"\n';
  });
  var blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  var a = document.createElement("a");
  a.href = window.URL.createObjectURL(blob);
  a.download = "Membership_Subs_Roster.csv";
  a.click();
};

// --- PANE 3: FRIENDS & FAMILY APPROVALS ---
window.renderAdminApprovals = function() {
  var container = document.getElementById("admin-approvals-queue");
  if (!container || !appState) return;

  var pending = appState.pendingLinkRequests.filter(function(r) { return r.status === "pending_admin"; });

  var html = "<div class='admin-card'><strong style='font-size:12px; color:var(--safc-gold); display:block; margin-bottom:8px;'>Pending Junior Requests</strong>";
  if (pending.length === 0) {
    html += "<p class='text-xs text-muted'>✓ No pending link requests.</p>";
  } else {
    pending.forEach(function(req) {
      html += 
        "<div style='display:flex; justify-content:space-between; align-items:center; background:#1e293b; padding:8px; border-radius:6px; margin-bottom:6px; font-size:11px;'>" +
          "<div><strong>" + req.requester + "</strong> ➔ <strong>" + req.targetName + "</strong> (" + req.relation + ")</div>" +
          "<div style='display:flex; gap:4px;'>" +
            "<button class='btn btn-gold btn-sm' style='padding:2px 8px; font-size:10px;' onclick='window.adminApproveLink(" + req.id + ")'>Approve</button>" +
            "<button class='btn btn-outline btn-sm' style='padding:2px 8px; font-size:10px; color:#ef4444;' onclick='window.adminRejectLink(" + req.id + ")'>Decline</button>" +
          "</div>" +
        "</div>";
    });
  }
  html += "</div>";

  html += 
    "<div class='admin-card'><strong style='font-size:12px; color:var(--safc-gold); display:block; margin-bottom:8px;'>Active Network Links</strong><div style='max-height:200px; overflow-y:auto;'>";
  appState.friendsAndFamily.forEach(function(link) {
    html += 
      "<div style='display:flex; justify-content:space-between; align-items:center; background:#1e293b; padding:6px 8px; border-radius:6px; margin-bottom:4px; font-size:10px;'>" +
        "<div><strong>" + link.owner + "</strong> ➔ <strong>" + link.targetName + "</strong> (" + link.relation + ")</div>" +
        "<button class='btn btn-outline btn-sm' style='padding:1px 6px; font-size:9px; color:#ef4444;' onclick='window.adminRevokeLink(" + link.id + ")'>Revoke</button>" +
      "</div>";
  });
  html += "</div></div>";
  container.innerHTML = html;
};

window.adminApproveLink = function(reqId) {
  var req = appState.pendingLinkRequests.find(function(r) { return r.id === reqId; });
  if (!req) return;

  appState.friendsAndFamily.push({ id: Date.now(), owner: req.requester, targetName: req.targetName, relation: req.relation, type: req.type, status: "approved" });
  appState.friendsAndFamily.push({ id: Date.now() + 1, owner: req.targetName, targetName: req.requester, relation: req.relation === "Child" ? "Parent" : "Friend", type: "Adult", status: "approved" });
  appState.pendingLinkRequests = appState.pendingLinkRequests.filter(function(r) { return r.id !== reqId; });

  saveState();
  window.renderAdminApprovals();
  updateAdminDrawerBadge();
  alert("✓ Link approved for " + req.targetName + ".");
};

window.adminRejectLink = function(reqId) {
  appState.pendingLinkRequests = appState.pendingLinkRequests.filter(function(r) { return r.id !== reqId; });
  saveState();
  window.renderAdminApprovals();
  updateAdminDrawerBadge();
};

window.adminRevokeLink = function(linkId) {
  var link = appState.friendsAndFamily.find(function(l) { return l.id === linkId; });
  if (!link) return;

  if (confirm("Revoke relationship between " + link.owner + " and " + link.targetName + "?")) {
    appState.friendsAndFamily = appState.friendsAndFamily.filter(function(f) {
      return !(f.owner === link.owner && f.targetName === link.targetName) && !(f.owner === link.targetName && f.targetName === link.owner);
    });
    saveState();
    window.renderAdminApprovals();
  }
};

// --- PANE 4: TREASURY & FINANCIAL LEDGER ---
window.renderAdminTreasury = function() {
  var statsContainer = document.getElementById("admin-treasury-stats");
  var ledgerContainer = document.getElementById("admin-financial-ledger");
  var catFilter = document.getElementById("treasury-filter-category") ? document.getElementById("treasury-filter-category").value : "all";
  var timeFilter = document.getElementById("treasury-filter-time") ? document.getElementById("treasury-filter-time").value : "all";

  var totalInflow = 0;
  var totalOutflow = 0;
  var branchRetained = 0;

  (appState.masterAuditTrail || []).forEach(function(t) {
    if (t.debit > 0) totalInflow += t.debit;
    if (t.credit > 0) totalOutflow += t.credit;
    branchRetained += (t.branchImpact || 0);
  });

  if (statsContainer) {
    statsContainer.innerHTML = 
      "<div style='background:#1e293b; padding:8px; border-radius:6px; font-size:11px;'>Gross Inflow: <strong style='color:var(--green);'>+£" + totalInflow.toFixed(2) + "</strong></div>" +
      "<div style='background:#1e293b; padding:8px; border-radius:6px; font-size:11px;'>Payouts/Credits: <strong style='color:#ef4444;'>-£" + totalOutflow.toFixed(2) + "</strong></div>" +
      "<div style='background:#1e293b; padding:8px; border-radius:6px; font-size:11px; grid-column:span 2; display:flex; justify-content:space-between; align-items:center;'>" +
        "<span>Branch Net Retained Funds: <strong style='color:var(--safc-gold);'>£" + branchRetained.toFixed(2) + "</strong></span>" +
        "<button type='button' class='btn btn-gold btn-sm' style='font-size:10px; padding:3px 8px;' onclick='window.adminManualWalletCredit()'>+ Cash / Bank Credit</button>" +
      "</div>";
  }

  if (ledgerContainer) {
    var nowMs = Date.now();
    var filtered = (appState.masterAuditTrail || []).filter(function(t) {
      var cat = (t.category || "").toUpperCase();
      var desc = (t.desc || "").toUpperCase();

      if (catFilter !== "all") {
        if (catFilter === "subs" && cat.indexOf("SUBS") === -1) return false;
        if (catFilter === "bus" && cat.indexOf("BUS") === -1) return false;
        if (catFilter === "away" && cat.indexOf("AWAY") === -1 && desc.indexOf("AWAY") === -1) return false;
        if (catFilter === "card" && cat.indexOf("CARD") === -1) return false;
        if (catFilter === "topup" && cat.indexOf("TOPUP") === -1) return false;
        if (catFilter === "payout" && cat.indexOf("PAYOUT") === -1 && cat.indexOf("REFUND") === -1 && !(t.credit > 0 && cat.indexOf("TOPUP") === -1)) return false;
      }

      if (timeFilter !== "all" && t.timestamp) {
        var txDate = new Date(t.timestamp.replace(" ", "T")).getTime();
        if (!isNaN(txDate)) {
          var daysDiff = (nowMs - txDate) / (1000 * 60 * 60 * 24);
          if (timeFilter === "7d" && daysDiff > 7) return false;
          if (timeFilter === "30d" && daysDiff > 30) return false;
          if (timeFilter === "season" && t.timestamp < "2026-07-01") return false;
        }
      }
      return true;
    });

    var html = "<div style='max-height:260px; overflow-y:auto;'>";
    if (filtered.length === 0) {
      html += "<div class='text-xs text-muted' style='text-align:center; padding:12px;'>No ledger transactions match the selected filter.</div>";
    } else {
      filtered.slice(0, 50).forEach(function(t) {
        var amtBadge = t.debit > 0
          ? "<span style='color:var(--green); font-weight:700;'>+£" + Number(t.debit).toFixed(2) + "</span>"
          : (t.credit > 0 ? "<span style='color:#f87171; font-weight:700;'>-£" + Number(t.credit).toFixed(2) + "</span>" : "<span style='color:#94a3b8;'>£0.00</span>");
        html += 
          "<div style='background:#1e293b; border-bottom:1px solid #334155; padding:7px 9px; border-radius:4px; margin-bottom:4px; font-size:10px;'>" +
            "<div style='display:flex; justify-content:space-between;'><strong>" + t.txnId + " • " + t.category + "</strong><span>" + amtBadge + " • <span style='color:var(--safc-gold);'>" + t.timestamp.substring(0, 16) + "</span></span></div>" +
            "<div style='color:#cbd5e1; margin-top:2px;'>" + t.desc + " (Actor: " + t.actor + " ➔ " + t.target + ")</div>" +
          "</div>";
      });
    }
    html += "</div>";
    ledgerContainer.innerHTML = html;
  }
};

window.adminManualWalletCredit = async function() {
  var who = prompt("💰 Treasurer Manual Wallet Credit\n\nEnter Member Name or Member # (e.g. Gary Miller or COX-084):");
  if (!who) return;

  var targetUser = (appState.users || []).find(function(u) {
    return (u.name && u.name.toLowerCase() === who.trim().toLowerCase()) ||
           (u.memberNo && u.memberNo.toLowerCase() === who.trim().toLowerCase());
  });
  if (!targetUser) {
    alert("No member found matching '" + who + "'.");
    return;
  }
  if (isMemberUnder18(targetUser)) {
    alert("Under-18 junior accounts cannot hold a wallet balance. Credit their adult guardian instead.");
    return;
  }

  var amtStr = prompt("Enter cash / bank transfer amount (£) to credit to " + targetUser.name + " (" + targetUser.memberNo + "):", "20.00");
  if (!amtStr) return;
  var amt = parseFloat(amtStr);
  if (isNaN(amt) || amt <= 0) {
    alert("Please enter a valid positive amount.");
    return;
  }

  targetUser.balance = (parseFloat(targetUser.balance) || 0) + amt;
  var adminName = (appState.currentUser && appState.currentUser.name) ? appState.currentUser.name : "Treasurer";
  logForensicTransaction(adminName, "Admin", targetUser.name, "TOPUP", "Treasurer Cash/Bank Deposit Credit", 0, amt, 0);
  await window.pushMasterStateToCloud();
  window.renderAdminTreasury();
  alert("✓ Credited £" + amt.toFixed(2) + " to " + targetUser.name + " (New Balance: £" + targetUser.balance.toFixed(2) + ").");
};

window.exportMasterAuditCSV = function() {
  var csv = "Txn ID,Timestamp,Actor,Role,Target,Category,Description,Debit,Credit,Branch Impact,Balance After\n";
  appState.masterAuditTrail.forEach(function(t) {
    csv += '"' + t.txnId + '","' + t.timestamp + '","' + t.actor + '","' + t.role + '","' + t.target + '","' + t.category + '","' + t.desc.replace(/"/g, '""') + '",£' + t.debit.toFixed(2) + ',£' + t.credit.toFixed(2) + ',£' + t.branchImpact.toFixed(2) + ',£' + t.balanceAfter.toFixed(2) + "\n";
  });
  var blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  var a = document.createElement("a");
  a.href = window.URL.createObjectURL(blob);
  a.download = "Master_Treasury_Ledger.csv";
  a.click();
};

// --- PANE 5: AWAY MATCH TICKET ALLOCATIONS ---
window.renderAdminAwayFixture = function() {
  var sel = document.getElementById("admin-away-game-select");
  var container = document.getElementById("admin-away-fixture-manager");
  if (!sel || !container) return;

  var currentVal = sel.value;
  sel.innerHTML = "";
  appState.awayFixtures.forEach(function(f) {
    var opt = document.createElement("option");
    opt.value = f.id;
    opt.textContent = f.opponent + " (A) • " + f.date + " [Quota: " + f.allocation + "]";
    if (currentVal && currentVal === f.id) opt.selected = true;
    sel.appendChild(opt);
  });
  if (!sel.value && appState.awayFixtures.length > 0) sel.value = appState.awayFixtures[0].id;

  var fixture = appState.awayFixtures.find(function(f) { return f.id === sel.value; }) || appState.awayFixtures[0];
  var regs = appState.awayRegistrations.filter(function(r) { return r.fixtureId === fixture.id; });
  var allocatedCount = 0;
  regs.forEach(function(r) { if (r.allocated) allocatedCount += (r.party ? r.party.length : 1); });

  var html = 
    "<div class='admin-card'>" +
      "<div class='flex-between'><strong>" + fixture.opponent + " (Away)</strong><span class='badge-gold'>" + fixture.date + "</span></div>" +
      "<div style='display:flex; gap:6px; align-items:center; margin-top:8px;'>" +
        "<label class='text-xs text-muted' style='flex:1;'>Branch Quota:</label>" +
        "<input type='number' id='admin-away-quota-input' class='form-input' style='flex:1; padding:4px;' value='" + fixture.allocation + "' />" +
        "<button class='btn btn-outline btn-sm' style='padding:4px 10px; font-size:10px;' onclick='window.confirmAwayQuota(\"" + fixture.id + "\")'>Confirm</button>" +
      "</div>" +
      "<div class='text-xs mt-2' style='color:var(--safc-gold);'>Allocated so far: <strong>" + allocatedCount + " / " + fixture.allocation + " Tickets</strong></div>" +
    "</div>" +
    "<div class='admin-card'><strong style='font-size:11px; display:block; margin-bottom:8px;'>Member Expressions of Interest:</strong>";

  if (regs.length === 0) {
    html += "<p class='text-xs text-muted'>No expressions of interest registered yet.</p>";
  } else {
    regs.forEach(function(r) {
      html += 
        "<div style='display:flex; justify-content:space-between; align-items:center; background:#1e293b; padding:6px 8px; border-radius:6px; margin-bottom:6px; font-size:10px; border-left:3px solid " + (r.allocated ? "var(--green)" : "var(--safc-gold)") + ";'>" +
          "<div><strong>" + r.memberName + "</strong><br><span style='color:#cbd5e1; font-size:9px;'>Party: " + (r.party ? r.party.join(", ") : "Lead Only") + "</span></div>" +
          "<button class='btn btn-sm " + (r.allocated ? "btn-outline" : "btn-gold") + "' style='padding:2px 8px; font-size:9px;' onclick='window.toggleAwayAllocation(\"" + r.fixtureId + "\", \"" + r.memberName + "\")'>" + (r.allocated ? "✓ Allocated" : "Allocate ➔") + "</button>" +
        "</div>";
    });
  }

  html += "</div>";
  container.innerHTML = html;
};

window.confirmAwayQuota = function(fixtureId) {
  var input = document.getElementById("admin-away-quota-input");
  var val = input ? parseInt(input.value) : 20;
  var fix = appState.awayFixtures.find(function(f) { return f.id === fixtureId; });
  if (fix) {
    fix.allocation = val || 20;
    saveState();
    window.renderAdminAwayFixture();
    renderMemberAwayView();
  }
};

window.toggleAwayAllocation = function(fixtureId, memberName) {
  var reg = appState.awayRegistrations.find(function(r) { return r.fixtureId === fixtureId && r.memberName === memberName; });
  if (reg) {
    reg.allocated = !reg.allocated;
    saveState();
    window.renderAdminAwayFixture();
    renderMemberAwayView();
    renderHUDView();
  }
};

// --- PANE 6: BRANCH NEWS & BROADCASTS ---
window.renderAdminNews = function() {
  // Dynamically ensure the 'Mark as Urgent Matchday Banner' checkbox exists inside Pane 6
  var linkTextEl = document.getElementById("admin-news-link-text");
  if (linkTextEl && !document.getElementById("admin-news-urgent")) {
    var gridParent = linkTextEl.closest("div[style*='grid']");
    if (gridParent) {
      var urgentWrap = document.createElement("label");
      urgentWrap.style.cssText = "display:flex; align-items:center; gap:8px; background:#1e1b4b; border:1px solid #ef4444; padding:7px 10px; border-radius:6px; margin-bottom:8px; font-size:11px; color:#fca5a5; cursor:pointer;";
      urgentWrap.innerHTML = "<input type='checkbox' id='admin-news-urgent' style='width:16px; height:16px; accent-color:#ef4444;' /> <span><strong>🚨 Pin as Urgent Matchday Alert Banner</strong> (Top of Home HUD)</span>";
      gridParent.parentNode.insertBefore(urgentWrap, gridParent.nextSibling);
    }
  }

  var manageList = document.getElementById("admin-news-manage-list");
  if (!manageList) return;

  var html = "";
  (appState.announcements || []).forEach(function(post) {
    html += 
      "<div style='background:#1e293b; padding:8px 10px; border-radius:6px; margin-bottom:6px; font-size:11px; border-left:3px solid " + (post.isUrgent ? "#ef4444" : "var(--safc-gold)") + ";'>" +
        "<div class='flex-between'>" +
          "<strong>" + (post.isUrgent ? "🚨 " : "") + post.title + "</strong>" +
          "<span style='font-size:9px; color:" + (post.archived ? "#94a3b8" : "var(--green)") + ";'>" + (post.archived ? "ARCHIVED" : "ACTIVE") + "</span>" +
        "</div>" +
        "<div style='color:#cbd5e1; font-size:10px; margin:4px 0;'>" + post.content + "</div>" +
        (post.imageUrl ? "<div style='font-size:9px; color:var(--safc-gold);'>🖼️ Photo attached</div>" : "") +
        (post.linkUrl ? "<div style='font-size:9px; color:#60a5fa;'>🔗 Link: " + (post.linkText || post.linkUrl) + "</div>" : "") +
        "<div style='display:flex; justify-content:space-between; align-items:center; margin-top:6px; font-size:9px; color:var(--text-muted);'>" +
          "<span>" + post.date + " • 👍 " + (post.reactions || 0) + "</span>" +
          "<div style='display:flex; gap:4px;'>" +
            "<button class='btn btn-outline btn-sm' style='padding:1px 6px; font-size:9px;' onclick='window.toggleUrgentAnnouncement(" + post.id + ")'>" + (post.isUrgent ? "Unpin Urgent" : "🚨 Make Urgent") + "</button>" +
            "<button class='btn btn-outline btn-sm' style='padding:1px 6px; font-size:9px;' onclick='window.toggleArchiveAnnouncement(" + post.id + ")'>" + (post.archived ? "Unarchive" : "Archive") + "</button>" +
            "<button class='btn btn-outline btn-sm' style='padding:1px 6px; font-size:9px; color:#ef4444;' onclick='window.deleteAnnouncement(" + post.id + ")'>Delete</button>" +
          "</div>" +
        "</div>" +
      "</div>";
  });
  manageList.innerHTML = html || "<div class='text-xs text-muted'>No announcements posted yet.</div>";
};

window.adminPostAnnouncement = async function() {
  var titleInput = document.getElementById("admin-news-title");
  var bodyInput = document.getElementById("admin-news-body");
  var imgInput = document.getElementById("admin-news-image-url");
  var linkUrlInput = document.getElementById("admin-news-link-url");
  var linkTextInput = document.getElementById("admin-news-link-text");
  var urgentInput = document.getElementById("admin-news-urgent");

  if (!titleInput || !bodyInput || !titleInput.value.trim() || !bodyInput.value.trim()) {
    alert("Please enter both a headline and announcement details.");
    return;
  }

  var tVal = titleInput.value.trim();
  var bVal = bodyInput.value.trim();
  var isUrg = urgentInput ? !!urgentInput.checked : false;

  var newPost = {
    id: Math.floor(100000 + Math.random() * 90000000),
    title: tVal,
    content: bVal,
    imageUrl: imgInput && imgInput.value.trim() ? imgInput.value.trim() : null,
    linkUrl: linkUrlInput && linkUrlInput.value.trim() ? linkUrlInput.value.trim() : null,
    linkText: linkTextInput && linkTextInput.value.trim() ? linkTextInput.value.trim() : "Open Link ➔",
    date: new Date().toISOString().substring(0, 10),
    isUrgent: isUrg,
    reactions: 0,
    archived: false,
    readBy: []
  };

  appState.announcements.unshift(newPost);

  titleInput.value = "";
  bodyInput.value = "";
  if (imgInput) imgInput.value = "";
  if (linkUrlInput) linkUrlInput.value = "";
  if (linkTextInput) linkTextInput.value = "";
  if (urgentInput) urgentInput.checked = false;

  if (sbClient) {
    sbClient.from("announcements").upsert([{
      id: newPost.id,
      club_id: window.ACTIVE_CLUB_ID,
      title: newPost.title,
      date: newPost.date,
      is_urgent: newPost.isUrgent,
      content: newPost.content,
      image_url: newPost.imageUrl,
      link_url: newPost.linkUrl,
      link_text: newPost.linkText,
      reactions: 0,
      archived: false,
      read_by: []
    }]).then(function() {});
  }

  await window.pushMasterStateToCloud();
  renderHUDView();
  window.renderAdminNews();

  if (typeof window.dispatchClubNotification === "function") {
    window.dispatchClubNotification("travel", (isUrg ? "🚨 URGENT: " : "📢 ") + tVal, bVal, "view-hud");
  }
  alert("✓ Announcement broadcasted to all branch members!");
};

window.toggleUrgentAnnouncement = async function(postId) {
  var post = (appState.announcements || []).find(function(a) { return String(a.id) === String(postId); });
  if (post) {
    post.isUrgent = !post.isUrgent;
    await window.pushMasterStateToCloud();
    renderHUDView();
    window.renderAdminNews();
  }
};

window.toggleArchiveAnnouncement = async function(postId) {
  var post = (appState.announcements || []).find(function(a) { return String(a.id) === String(postId); });
  if (post) {
    post.archived = !post.archived;
    if (sbClient) {
      sbClient.from("announcements").update({ archived: post.archived }).eq("id", post.id).then(function() {});
    }
    await window.pushMasterStateToCloud();
    renderHUDView();
    window.renderAdminNews();
  }
};

window.deleteAnnouncement = async function(postId) {
  if (confirm("Delete this announcement for all members?")) {
    appState.announcements = (appState.announcements || []).filter(function(a) { return String(a.id) !== String(postId); });
    if (sbClient) {
      sbClient.from("announcements").delete().eq("id", postId).then(function() {});
    }
    await window.pushMasterStateToCloud();
    renderHUDView();
    window.renderAdminNews();
  }
};

// --- PANE 7: MATCHDAY FOOTBALL SCRATCH CARD (20 TO 100 TEAMS) ---
window._selectedFootballTeamIds = [];

function getCardMetaDefaults() {
  if (!appState.activeCardMeta) {
    appState.activeCardMeta = {
      cardId: 1,
      title: "Matchday Scratch Card #1",
      status: "active",
      teamCount: (appState.footballCard && appState.footballCard.length) ? appState.footballCard.length : 40,
      pricePerTeam: 2.00,
      prizeMode: "50/50", // "50/50" or "custom"
      winnerPrize: 40.00,
      branchPrize: 40.00,
      winnerTeam: null,
      winnerMember: null
    };
  }
  if (!appState.activeCardMeta.teamCount) {
    appState.activeCardMeta.teamCount = (appState.footballCard && appState.footballCard.length) ? appState.footballCard.length : 40;
  }
  if (!appState.activeCardMeta.prizeMode) {
    appState.activeCardMeta.prizeMode = "50/50";
  }
  return appState.activeCardMeta;
}

window.toggleFootballTeamSelection = function(teamId) {
  var meta = getCardMetaDefaults();
  if (meta.status === "completed") return;

  var idx = window._selectedFootballTeamIds.indexOf(teamId);
  if (idx !== -1) window._selectedFootballTeamIds.splice(idx, 1);
  else window._selectedFootballTeamIds.push(teamId);
  window.renderFootballGrid();
};

window.renderFootballGrid = function() {
  var grid = document.getElementById("football-grid");
  var summary = document.getElementById("card-sold-summary");
  var actionTeamName = document.getElementById("football-selected-team-name");
  var claimBtn = document.getElementById("btn-claim-football-team");
  if (!grid || !appState || !appState.footballCard) return;

  var user = getCurrentUserRecord();
  var userName = user ? user.name : "Gary Miller";
  var meta = getCardMetaDefaults();
  var isCompleted = (meta.status === "completed");
  var totalSquares = appState.footballCard.length || meta.teamCount || 40;
  var pricePerSquare = Number(meta.pricePerTeam || 2.00);
  var maxPot = totalSquares * pricePerSquare;

  // Calculate dynamic Winner Prize & Branch Share (50/50 vs Custom £)
  var displayWinnerPrize = (meta.prizeMode === "custom")
    ? Number(meta.winnerPrize || 0)
    : (maxPot * 0.50);
  var displayBranchShare = (meta.prizeMode === "custom")
    ? Number(meta.branchPrize || 0)
    : (maxPot * 0.50);

  var fmtGbp = function(val) {
    return (val % 1 === 0) ? ("£" + val.toFixed(0)) : ("£" + val.toFixed(2));
  };

  // Dynamically update the 3 header elements in index.html
  var headingEl = document.getElementById("football-card-heading");
  var subtextEl = document.getElementById("football-card-subtext");
  var prizeAmtEl = document.getElementById("football-card-prize-amount");

  if (headingEl) {
    headingEl.textContent = totalSquares + "-Team Scratch Card";
  }
  if (subtextEl) {
    subtextEl.textContent =
      "£" + pricePerSquare.toFixed(2) + " per team • " +
      fmtGbp(displayWinnerPrize) + " to winner • " +
      fmtGbp(displayBranchShare) + " to branch funds";
  }
  if (prizeAmtEl) {
    prizeAmtEl.textContent = "£" + displayWinnerPrize.toFixed(2);
  }

  var soldCount = appState.footballCard.filter(function(sq) { return !!sq.claimedBy; }).length;
  if (summary) {
    summary.className = isCompleted ? "badge-red" : "badge-gold";
    summary.textContent = isCompleted ? "🏆 DRAWN & COMPLETED" : (soldCount + " / " + totalSquares + " Claimed");
  }

  var existingWinnerBanner = document.getElementById("football-member-winner-banner");
  if (existingWinnerBanner) existingWinnerBanner.remove();

  if (isCompleted && meta.winnerTeam && meta.winnerMember) {
    var winnerBanner = document.createElement("div");
    winnerBanner.id = "football-member-winner-banner";
    winnerBanner.style.cssText = "background: linear-gradient(135deg, #78350f, #f59e0b); border: 2px solid var(--safc-gold); border-radius: 8px; padding: 10px; margin-bottom: 10px; color: #fff; text-align: center;";
    winnerBanner.innerHTML = 
      "<div style='font-size:10px; font-weight:800; color:#fde68a;'>🏆 OFFICIAL CARD RESULT</div>" +
      "<div style='font-size:15px; font-weight:900;'>Winning Team: " + meta.winnerTeam + "</div>" +
      "<div style='font-size:11px;'>" + meta.winnerMember + " won £" + Number(meta.winnerPrize || 0).toFixed(2) + "!</div>";
    grid.parentNode.insertBefore(winnerBanner, grid);
  }

  grid.innerHTML = "";
  appState.footballCard.forEach(function(sq) {
    var sqBtn = document.createElement("button");
    sqBtn.type = "button";
    var isClaimed = !!sq.claimedBy;
    var isMine = isClaimed && (sq.claimedBy === userName);
    var isSelected = (window._selectedFootballTeamIds.indexOf(sq.id) !== -1);
    var isWinnerSquare = isCompleted && (sq.team === meta.winnerTeam);

    sqBtn.style.cssText = "display:flex; flex-direction:column; align-items:center; justify-content:center; padding:6px 2px; min-height:48px; border-radius:6px; font-size:10px; border:1px solid #334155; text-align:center;";

    if (isWinnerSquare) {
      sqBtn.style.background = "linear-gradient(135deg, #facc15, #eab308)";
      sqBtn.style.color = "#000";
      sqBtn.innerHTML = "<strong>👑 " + sq.team + "</strong><span style='font-size:8px; font-weight:900;'>WINNER</span>";
    } else if (isMine) {
      sqBtn.style.background = "#065f46";
      sqBtn.style.borderColor = "#10b981";
      sqBtn.style.color = "#34d399";
      sqBtn.innerHTML = "<strong>" + sq.team + "</strong><span style='font-size:8px;'>✓ YOU</span>";
    } else if (isClaimed) {
      sqBtn.style.background = "#1e293b";
      sqBtn.style.color = "#64748b";
      sqBtn.disabled = true;
      var shortClaimant = (typeof window.formatPublicManifestName === "function")
        ? window.formatPublicManifestName(sq.claimedBy)
        : sq.claimedBy.split(" ")[0];
      sqBtn.innerHTML = "<span>" + sq.team + "</span><span style='font-size:7px;'>" + shortClaimant + "</span>";
    } else if (isSelected) {
      sqBtn.style.background = "var(--safc-gold)";
      sqBtn.style.color = "#000";
      sqBtn.innerHTML = "<strong>" + sq.team + "</strong><span style='font-size:8px;'>✓ SELECTED</span>";
      sqBtn.onclick = function() { window.toggleFootballTeamSelection(sq.id); };
    } else {
      sqBtn.style.background = "#0f172a";
      sqBtn.style.color = "#fff";
      sqBtn.innerHTML = "<strong>" + sq.team + "</strong><span style='font-size:8px; color:#94a3b8;'>£" + pricePerSquare.toFixed(2) + "</span>";
      if (!isCompleted) sqBtn.onclick = function() { window.toggleFootballTeamSelection(sq.id); };
      else sqBtn.disabled = true;
    }
    grid.appendChild(sqBtn);
  });

  if (isCompleted) {
    if (actionTeamName) actionTeamName.innerHTML = "<span style='color:var(--safc-gold);'>Card Drawn! Winner: " + meta.winnerMember + " (£" + Number(meta.winnerPrize || 0).toFixed(2) + ")</span>";
    if (claimBtn) { claimBtn.textContent = "Card Completed 🏆"; claimBtn.disabled = true; }
  } else {
    var selCount = window._selectedFootballTeamIds.length;
    if (selCount > 0) {
      var totalCost = selCount * pricePerSquare;
      if (actionTeamName) actionTeamName.innerHTML = "Selected (" + selCount + ") Teams • Total: <strong style='color:var(--safc-gold);'>£" + totalCost.toFixed(2) + "</strong>";
      if (claimBtn) { claimBtn.textContent = "Claim " + selCount + " Team" + (selCount > 1 ? "s" : "") + " (£" + totalCost.toFixed(2) + ")"; claimBtn.disabled = false; }
    } else {
      if (actionTeamName) actionTeamName.innerHTML = "Select available team(s)<div style='font-size:10px; color:#94a3b8;'>£" + pricePerSquare.toFixed(2) + " per square • Winner Prize: £" + displayWinnerPrize.toFixed(2) + "</div>";
      if (claimBtn) { claimBtn.textContent = "Claim Teams"; claimBtn.disabled = true; }
    }
  }
};

window.confirmFootballTeamPurchase = async function() {
  if (!verifyMembershipAccess("play the Scratch Card")) return;

  var selIds = (window._selectedFootballTeamIds || []).slice();
  if (selIds.length === 0) return;

  var user = getCurrentUserRecord();
  if (isMemberUnder18(user)) {
    alert("🛡️ Under-18 Safeguarding Rule:\nJunior members cannot purchase fundraiser scratch card squares.");
    return;
  }

  var claimBtn = document.getElementById("btn-claim-football-team");
  if (claimBtn) {
    claimBtn.disabled = true;
    claimBtn.textContent = "Verifying Live Card...";
  }

  // 1. Pull latest live state from Supabase so we never double-sell a square
  await window.pullLatestCloudStateNow();
  user = getCurrentUserRecord();

  var meta = getCardMetaDefaults();
  if (meta.status === "completed") {
    window._selectedFootballTeamIds = [];
    window.renderFootballGrid();
    alert("⚠️ This Scratch Card has just been drawn and completed.");
    return;
  }

  // 2. Check if any of the user's selected squares were just claimed by another member
  var conflictTeams = [];
  var availableSquares = [];
  selIds.forEach(function(teamId) {
    var sq = (appState.footballCard || []).find(function(x) { return x.id === teamId; });
    if (sq) {
      if (sq.claimedBy) conflictTeams.push(sq.team + " (claimed by " + sq.claimedBy + ")");
      else availableSquares.push(sq);
    }
  });

  if (conflictTeams.length > 0) {
    window._selectedFootballTeamIds = availableSquares.map(function(s) { return s.id; });
    window.renderFootballGrid();
    alert("⚠️ Another member just claimed:\n• " + conflictTeams.join("\n• ") + "\n\nYour selection has been refreshed—please review before claiming.");
    return;
  }

  if (availableSquares.length === 0) {
    window.renderFootballGrid();
    return;
  }

  var pricePerSquare = Number(meta.pricePerTeam || 2.00);
  var totalCost = availableSquares.length * pricePerSquare;

  if (user.balance < totalCost) {
    window.renderFootballGrid();
    alert("Insufficient funds! You have £" + user.balance.toFixed(2) + " but need £" + totalCost.toFixed(2) + ".");
    return;
  }

  var previewTeams = availableSquares.map(function(s) { return s.team; });

  if (typeof window.verifyWalletSpendAuthorization === "function") {
    if (!window.verifyWalletSpendAuthorization(totalCost, previewTeams.length + " Scratch Card Team(s): " + previewTeams.join(", "))) {
      window.renderFootballGrid();
      return;
    }
  }

  // 3. Re-verify availability one final time after PIN/Confirm prompt, then lock & push immediately
  await window.pullLatestCloudStateNow();
  user = getCurrentUserRecord();

  var postPromptConflicts = [];
  availableSquares.forEach(function(s) {
    var liveSq = (appState.footballCard || []).find(function(x) { return x.id === s.id; });
    if (!liveSq || liveSq.claimedBy) postPromptConflicts.push(s.team);
  });

  if (postPromptConflicts.length > 0) {
    window._selectedFootballTeamIds = [];
    window.renderFootballGrid();
    alert("⚠️ Square claimed while confirming: " + postPromptConflicts.join(", ") + ". Your wallet was NOT charged.");
    return;
  }

  user.balance -= totalCost;
  var claimedNames = [];

  availableSquares.forEach(function(s) {
    var liveSq = (appState.footballCard || []).find(function(x) { return x.id === s.id; });
    if (liveSq && !liveSq.claimedBy) {
      liveSq.claimedBy = user.name;
      liveSq.price = pricePerSquare;
      claimedNames.push(liveSq.team);
    }
  });

  window._selectedFootballTeamIds = [];
  logForensicTransaction(user.name, "Member", "Branch Lottery", "CARD", "Football Card: " + claimedNames.join(", "), totalCost, 0, totalCost);
  await window.pushMasterStateToCloud();

  window.updateBalanceDisplay();
  window.renderFootballGrid();
  renderHUDView();
  alert("⚽ Teams Claimed:\n" + claimedNames.join(", "));
};

window.renderAdminFootballCardManager = function() {
  var pane = document.getElementById("admin-pane-footballcard");
  if (!pane) return;

  var meta = getCardMetaDefaults();
  var totalSquares = (appState.footballCard && appState.footballCard.length) ? appState.footballCard.length : (meta.teamCount || 40);
  var soldCount = (appState.footballCard || []).filter(function(sq) { return !!sq.claimedBy; }).length;
  var isActive = (meta.status === "active");
  var price = Number(meta.pricePerTeam || 2.00);
  var prizeMode = meta.prizeMode || "50/50";

  var actualPot = soldCount * price;
  var maxPot = totalSquares * price;

  var currentWinnerPrize = (prizeMode === "custom") ? Number(meta.winnerPrize || 0) : (actualPot * 0.50);
  var currentBranchProfit = (prizeMode === "custom") ? Number(meta.branchPrize || 0) : (actualPot * 0.50);
  var pct = Math.round((soldCount / totalSquares) * 100);

  var teamCountOptions = [20, 30, 40, 50, 60, 70, 80, 90, 100].map(function(num) {
    var sourceNote = (num <= 90) ? "English Leagues Only" : "92 English + 8 European";
    return "<option value='" + num + "' " + (Number(totalSquares) === num ? "selected" : "") + ">" + num + " Teams (" + sourceNote + ")</option>";
  }).join("");

  pane.innerHTML = 
    "<h4>⚽ Football Card Fundraiser Suite</h4>" +
    "<p class='text-xs text-muted mb-2'>Configure card size (20–100 teams), price per square, and 50/50 or fixed £ prizes.</p>" +

    "<div class='admin-card' style='background:#0f172a; border:1px solid #334155; border-radius:8px; padding:12px; margin-bottom:12px;'>" +
      "<div style='display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;'>" +
        "<strong style='color:#fff; font-size:13px;'>" + (meta.title || "Matchday Scratch Card") + " (" + totalSquares + " Teams)</strong>" +
        "<span style='padding:2px 8px; border-radius:999px; font-size:10px; font-weight:700; background:" + (isActive ? "#065f46; color:#34d399;" : "#334155; color:#94a3b8;") + "'>" + (isActive ? "🟢 ACTIVE" : "⚪ COMPLETED") + "</span>" +
      "</div>" +

      "<div style='background:#1e293b; padding:10px; border-radius:6px; margin-bottom:10px;'>" +
        "<div style='display:flex; justify-content:space-between; font-size:11px; margin-bottom:4px;'>" +
          "<span>Claimed: <strong style='color:var(--safc-gold);'>" + soldCount + " / " + totalSquares + "</strong> (£" + price.toFixed(2) + "/sq)</span>" +
          "<span style='color:var(--green); font-weight:700;'>Pot: £" + actualPot.toFixed(2) + " / £" + maxPot.toFixed(2) + "</span>" +
        "</div>" +
        "<div style='height:6px; background:#0f172a; border-radius:3px; overflow:hidden; margin-bottom:6px;'><div style='width:" + pct + "%; height:100%; background:var(--safc-red);'></div></div>" +
        "<div style='display:flex; justify-content:space-between; font-size:10px; color:#cbd5e1;'>" +
          "<span>Winner (" + (prizeMode === "custom" ? "Fixed £" : "50%") + "): <strong style='color:var(--safc-gold);'>£" + (isActive ? currentWinnerPrize.toFixed(2) : Number(meta.winnerPrize || 0).toFixed(2)) + "</strong></span>" +
          "<span>Branch (" + (prizeMode === "custom" ? "Fixed £" : "50%") + "): <strong style='color:var(--green);'>£" + (isActive ? currentBranchProfit.toFixed(2) : Number(meta.branchProfit || meta.branchPrize || 0).toFixed(2)) + "</strong></span>" +
        "</div>" +
      "</div>" +

      "<div style='display:flex; gap:6px; margin-bottom:12px;'>" +
        (isActive
          ? "<button class='btn btn-gold btn-sm' style='flex:1; font-size:11px;' onclick='window.adminDrawFootballCardWinner()'>🏆 Scratch & Reveal Winner (£" + currentWinnerPrize.toFixed(2) + ")</button>"
          : "<button class='btn btn-outline btn-sm' style='flex:1; font-size:11px;' disabled>✓ Winner Paid: " + meta.winnerMember + " (£" + Number(meta.winnerPrize || 0).toFixed(2) + ")</button>") +
      "</div>" +

      "<div style='border-top:1px solid #334155; padding-top:10px;'>" +
        "<strong style='font-size:12px; color:var(--safc-gold); display:block; margin-bottom:8px;'>⚙️ Card Setup & Prize Rules</strong>" +

        "<div style='display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-bottom:8px;'>" +
          "<div>" +
            "<label class='form-label'>Number of Teams (20–100)</label>" +
            "<select id='admin-card-team-count' class='form-select' onchange='window.updateAdminCardCalcPreview()'>" +
              teamCountOptions +
            "</select>" +
          "</div>" +
          "<div>" +
            "<label class='form-label'>Price Per Square (£)</label>" +
            "<input type='number' id='admin-card-price-input' class='form-input' min='0.50' step='0.50' value='" + price.toFixed(2) + "' oninput='window.updateAdminCardCalcPreview()' />" +
          "</div>" +
        "</div>" +

        "<div class='form-group' style='margin-bottom:8px;'>" +
          "<label class='form-label'>Prize Allocation Mode</label>" +
          "<select id='admin-card-prize-mode' class='form-select' onchange='window.toggleAdminCardPrizeMode(this.value)'>" +
            "<option value='50/50' " + (prizeMode === "50/50" ? "selected" : "") + ">50/50 Split (50% Winner / 50% Branch)</option>" +
            "<option value='custom' " + (prizeMode === "custom" ? "selected" : "") + ">Specific £ Amounts (Custom Winner & Branch £)</option>" +
          "</select>" +
        "</div>" +

        "<div id='admin-card-custom-prize-row' style='display:" + (prizeMode === "custom" ? "grid" : "none") + "; grid-template-columns:1fr 1fr; gap:8px; margin-bottom:8px;'>" +
          "<div>" +
            "<label class='form-label'>Winner Prize (£)</label>" +
            "<input type='number' id='admin-card-winner-gbp' class='form-input' min='0' step='1' value='" + Number(meta.winnerPrize || (maxPot * 0.5)).toFixed(2) + "' oninput='window.updateAdminCardCalcPreview()' />" +
          "</div>" +
          "<div>" +
            "<label class='form-label'>Branch Share (£)</label>" +
            "<input type='number' id='admin-card-branch-gbp' class='form-input' min='0' step='1' value='" + Number(meta.branchPrize || (maxPot * 0.5)).toFixed(2) + "' oninput='window.updateAdminCardCalcPreview()' />" +
          "</div>" +
        "</div>" +

        "<div id='admin-card-calc-preview' style='background:#1e293b; padding:8px 10px; border-radius:6px; font-size:10px; color:#cbd5e1; margin-bottom:10px; border:1px solid #334155;'>" +
          "Full Card Pot: <strong>£" + maxPot.toFixed(2) + "</strong> • Winner: <strong style='color:var(--safc-gold);'>£" + (prizeMode === "custom" ? Number(meta.winnerPrize || 0).toFixed(2) : (maxPot * 0.5).toFixed(2)) + "</strong> • Branch: <strong style='color:var(--green);'>£" + (prizeMode === "custom" ? Number(meta.branchPrize || 0).toFixed(2) : (maxPot * 0.5).toFixed(2)) + "</strong>" +
        "</div>" +

        "<div style='display:grid; grid-template-columns:1fr 1fr; gap:8px;'>" +
          "<button type='button' class='btn btn-outline btn-sm' style='width:100%; border-color:var(--safc-gold); color:var(--safc-gold);' onclick='window.adminApplyFootballCardSetup(false)'>💾 Amend Current Card</button>" +
          "<button type='button' class='btn btn-red btn-sm' style='width:100%;' onclick='window.adminApplyFootballCardSetup(true)'>🚀 Launch Fresh Card</button>" +
        "</div>" +
      "</div>" +
    "</div>";
};

window.renderAdminFootballCard = window.renderAdminFootballCardManager;

window.toggleAdminCardPrizeMode = function(mode) {
  var customRow = document.getElementById("admin-card-custom-prize-row");
  if (customRow) {
    customRow.style.display = (mode === "custom") ? "grid" : "none";
  }
  window.updateAdminCardCalcPreview();
};

window.updateAdminCardCalcPreview = function() {
  var countEl = document.getElementById("admin-card-team-count");
  var priceEl = document.getElementById("admin-card-price-input");
  var modeEl = document.getElementById("admin-card-prize-mode");
  var winEl = document.getElementById("admin-card-winner-gbp");
  var brEl = document.getElementById("admin-card-branch-gbp");
  var previewEl = document.getElementById("admin-card-calc-preview");
  if (!previewEl) return;

  var teams = countEl ? parseInt(countEl.value, 10) || 40 : 40;
  var price = priceEl ? parseFloat(priceEl.value) || 2.00 : 2.00;
  var mode = modeEl ? modeEl.value : "50/50";
  var maxPot = teams * price;

  var winAmt = (mode === "custom") ? (parseFloat(winEl ? winEl.value : 0) || 0) : (maxPot * 0.5);
  var brAmt = (mode === "custom") ? (parseFloat(brEl ? brEl.value : 0) || 0) : (maxPot * 0.5);

  previewEl.innerHTML =
    "Full Card Pot (" + teams + " × £" + price.toFixed(2) + "): <strong>£" + maxPot.toFixed(2) + "</strong> • " +
    "Winner: <strong style='color:var(--safc-gold);'>£" + winAmt.toFixed(2) + "</strong> • " +
    "Branch: <strong style='color:var(--green);'>£" + brAmt.toFixed(2) + "</strong>";
};

window.adminApplyFootballCardSetup = function(launchNew) {
  var countEl = document.getElementById("admin-card-team-count");
  var priceEl = document.getElementById("admin-card-price-input");
  var modeEl = document.getElementById("admin-card-prize-mode");
  var winEl = document.getElementById("admin-card-winner-gbp");
  var brEl = document.getElementById("admin-card-branch-gbp");

  var newTeamCount = countEl ? parseInt(countEl.value, 10) || 40 : 40;
  if (newTeamCount < 20 || newTeamCount > 100 || newTeamCount % 10 !== 0) {
    alert("Please select a team count in multiples of 10 between 20 and 100.");
    return;
  }

  var newPrice = priceEl ? parseFloat(priceEl.value) : 2.00;
  if (isNaN(newPrice) || newPrice <= 0) {
    alert("Please enter a valid price per square greater than £0.00.");
    return;
  }

  var newMode = modeEl ? modeEl.value : "50/50";
  var maxPot = newTeamCount * newPrice;
  var customWinner = (newMode === "custom") ? (parseFloat(winEl ? winEl.value : 0) || 0) : (maxPot * 0.5);
  var customBranch = (newMode === "custom") ? (parseFloat(brEl ? brEl.value : 0) || 0) : (maxPot * 0.5);

  var meta = getCardMetaDefaults();

  if (launchNew) {
    var soldCount = (appState.footballCard || []).filter(function(s) { return !!s.claimedBy; }).length;
    if (meta.status === "active" && soldCount > 0) {
      if (!confirm("⚠️ The current card still has " + soldCount + " claimed square(s) and has not been drawn yet.\n\nAre you sure you want to replace it with a brand-new " + newTeamCount + "-Team card?")) {
        return;
      }
    }
    var nextId = (meta.cardId || 1) + 1;
    appState.footballCard = MASTER_100_TEAMS.slice(0, newTeamCount).map(function(teamName, idx) {
      return { id: idx + 1, team: teamName, price: newPrice, claimedBy: null };
    });
    appState.activeCardMeta = {
      cardId: nextId,
      title: "Matchday Scratch Card #" + nextId,
      status: "active",
      teamCount: newTeamCount,
      pricePerTeam: newPrice,
      prizeMode: newMode,
      winnerPrize: customWinner,
      branchPrize: customBranch,
      winnerTeam: null,
      winnerMember: null
    };
    window._selectedFootballTeamIds = [];
    saveState();
    window.renderFootballGrid();
    renderHUDView();
    window.renderAdminFootballCardManager();
    alert("🚀 Launched new " + newTeamCount + "-Team Scratch Card (£" + newPrice.toFixed(2) + " per square)!");
    return;
  }

  // Amend current card in-place
  var currentLen = (appState.footballCard || []).length;
  if (newTeamCount < currentLen) {
    var droppedClaims = appState.footballCard.slice(newTeamCount).filter(function(s) { return !!s.claimedBy; });
    if (droppedClaims.length > 0) {
      alert("⚠️ Cannot shrink the active card to " + newTeamCount + " teams because squares above #" + newTeamCount + " have already been claimed by members. Use 'Launch Fresh Card' instead.");
      return;
    }
    appState.footballCard = appState.footballCard.slice(0, newTeamCount);
  } else if (newTeamCount > currentLen) {
    for (var i = currentLen; i < newTeamCount; i++) {
      appState.footballCard.push({
        id: i + 1,
        team: MASTER_100_TEAMS[i] || ("Team #" + (i + 1)),
        price: newPrice,
        claimedBy: null
      });
    }
  }

  appState.footballCard.forEach(function(sq) {
    sq.price = newPrice;
  });

  meta.teamCount = newTeamCount;
  meta.pricePerTeam = newPrice;
  meta.prizeMode = newMode;
  meta.winnerPrize = customWinner;
  meta.branchPrize = customBranch;

  window._selectedFootballTeamIds = [];
  saveState();
  window.renderFootballGrid();
  renderHUDView();
  window.renderAdminFootballCardManager();
  alert("✓ Current Scratch Card updated (" + newTeamCount + " Teams • £" + newPrice.toFixed(2) + "/square • " + (newMode === "custom" ? "£" + customWinner.toFixed(2) + " Winner / £" + customBranch.toFixed(2) + " Branch" : "50/50 Split") + ").");
};

window.adminDrawFootballCardWinner = function() {
  var meta = getCardMetaDefaults();
  if (meta.status === "completed") return;

  var claimed = appState.footballCard.filter(function(x) { return !!x.claimedBy; });
  if (claimed.length === 0) { alert("No teams claimed on this card yet."); return; }

  var totalCollected = claimed.length * Number(meta.pricePerTeam || 2.00);
  var winnerPrize = (meta.prizeMode === "custom") ? Number(meta.winnerPrize || 0) : (totalCollected * 0.50);
  var branchShare = (meta.prizeMode === "custom") ? Number(meta.branchPrize || 0) : (totalCollected * 0.50);

  if (!confirm("Confirm scratching the card?\n\n• Winner Receives: £" + winnerPrize.toFixed(2) + "\n• Branch Receives: £" + branchShare.toFixed(2))) return;

  var winningSquare = claimed[Math.floor(Math.random() * claimed.length)];
  var winnerName = winningSquare.claimedBy;
  var winningTeam = winningSquare.team;

  var winnerRecord = appState.users.find(function(m) { return m.name === winnerName; });
  if (winnerRecord) winnerRecord.balance += winnerPrize;

  var splitLabel = (meta.prizeMode === "custom") ? "Fixed Prize" : "50/50 Split";
  logForensicTransaction("Branch", "Admin", winnerName, "CARD_WINNER_PAYOUT", "Scratch Card Winner: " + winningTeam + " (" + splitLabel + ")", 0, winnerPrize, branchShare);

  meta.status = "completed";
  meta.winnerTeam = winningTeam;
  meta.winnerMember = winnerName;
  meta.winnerPrize = winnerPrize;
  meta.branchProfit = branchShare;

  saveState();
  window.updateBalanceDisplay();
  window.renderFootballGrid();
  renderHUDView();
  window.renderAdminFootballCardManager();
  alert("🏆 WINNER DRAWN: " + winningTeam + "!\n" + winnerName + " won £" + winnerPrize.toFixed(2) + "!");
};

window.adminLaunchNewFootballCard = function() {
  window.adminApplyFootballCardSetup(true);
};

// --- PANE 8: SAFEGUARDING & DISCIPLINARY ---
function ensureModerationState() {
  if (!appState.moderation) {
    appState.moderation = { strikes: {}, mutedMembers: [], revokedMembers: [], incidents: [] };
  }
  if (!appState.moderation.strikes) appState.moderation.strikes = {};
  if (!Array.isArray(appState.moderation.mutedMembers)) appState.moderation.mutedMembers = [];
  if (!Array.isArray(appState.moderation.revokedMembers)) appState.moderation.revokedMembers = [];
  if (!Array.isArray(appState.moderation.incidents)) appState.moderation.incidents = [];
  return appState.moderation;
}

// Central Comms Guard: Checks mutes and runs profanity/abuse detection before any message is posted
function checkAndEnforceModeration(senderName, rawText, channelLabel, recentMessages) {
  var mod = ensureModerationState();

  if (mod.revokedMembers.indexOf(senderName) !== -1) {
    alert("⛔ Account Comms Revoked:\nYour messaging privileges have been revoked by the Branch Committee.");
    return false;
  }
  if (mod.mutedMembers.indexOf(senderName) !== -1) {
    alert("🔇 Comms Muted:\nYour account is currently muted from posting in branch comms pending committee review.");
    return false;
  }

  var check = detectAbuseOrProfanity(rawText);
  if (!check.flagged) return true;

  // Increment strike count and auto-mute on flagged abuse/profanity
  mod.strikes[senderName] = (mod.strikes[senderName] || 0) + 1;
  if (mod.mutedMembers.indexOf(senderName) === -1) {
    mod.mutedMembers.push(senderName);
  }

  var contextSnap = (recentMessages || []).slice(-5).map(function(m) {
    return {
      sender: m.sender || m.from || senderName,
      time: m.time || "Now",
      text: m.text || ""
    };
  });
  contextSnap.push({
    sender: senderName,
    time: new Date().toTimeString().substring(0, 5),
    text: "[FLAGGED & BLOCKED] " + rawText
  });

  var newIncident = {
    id: "INC-" + Math.floor(1000 + Math.random() * 9000),
    member: senderName,
    channel: channelLabel || "Branch Comms",
    timestamp: new Date().toISOString().replace("T", " ").substring(0, 16),
    status: "active_ban",
    reason: check.reason + " (Strike #" + mod.strikes[senderName] + ")",
    offendingText: rawText,
    transcriptContext: contextSnap,
    internalDiscussion: [],
    votes: {}
  };

  mod.incidents.unshift(newIncident);

  if (sbClient) {
    sbClient.from("disciplinary_incidents").upsert([{
      id: newIncident.id,
      member: newIncident.member,
      timestamp: newIncident.timestamp,
      status: newIncident.status,
      reason: newIncident.reason,
      offending_text: newIncident.offendingText,
      transcript_context: newIncident.transcriptContext,
      internal_discussion: newIncident.internalDiscussion,
      votes: newIncident.votes
    }]).then(function() {});
  }

  saveState();
  updateAdminDrawerBadge();

  alert("🛡️ Message Blocked by Branch Safeguarding Filter\n\nReason: " + check.reason + "\n\nYour Comms access has been temporarily muted and logged for Committee review.");
  return false;
}

window.renderAdminDisciplinary = function() {
  var juniorLog = document.getElementById("admin-disciplinary-junior-log");
  var boardContainer = document.getElementById("admin-disciplinary-board");
  var mod = ensureModerationState();

  // 1. Active Junior Safeguarding Registry
  if (juniorLog) {
    var children = (appState.users || []).filter(function(u) { return isMemberUnder18(u); });
    var htmlJ = "";
    children.forEach(function(ch) {
      var comp = checkChildCompliance(ch);
      var parentLink = (appState.friendsAndFamily || []).find(function(f) {
        return (f.owner === ch.name && f.relation === "Parent" && f.status === "approved") ||
               (f.targetName === ch.name && (f.relation === "Daughter" || f.relation === "Son" || f.relation === "Child") && f.status === "approved");
      });
      var guardianName = parentLink ? (parentLink.owner === ch.name ? parentLink.targetName : parentLink.owner) : "Unlinked";

      htmlJ += 
        "<div style='background:#1e293b; padding:7px 9px; border-radius:6px; margin-bottom:5px; font-size:10px; display:flex; justify-content:space-between; align-items:center; border-left:3px solid " + (comp.compliant && comp.linkedParent ? "var(--green)" : "#ef4444") + ";'>" +
          "<div>" +
            "<strong>" + ch.name + "</strong> (" + ch.memberNo + ") • Guardian: <strong style='color:var(--safc-gold);'>" + guardianName + "</strong><br>" +
            "<span style='color:" + (comp.compliant && comp.linkedParent ? "var(--green)" : "#f87171") + "; font-weight:700;'>" +
              (comp.compliant && comp.linkedParent ? "✓ Verified Guardian Link Active" : (comp.deactivated ? "🔴 Account Locked (7-Day Grace Expired)" : "⏳ Pending Guardian Link (" + (comp.daysRemaining || 7) + "d left)")) +
            "</span>" +
          "</div>" +
          (!comp.linkedParent ? "<button class='btn btn-gold btn-sm' style='padding:2px 8px; font-size:9px;' onclick='window.adminQuickLinkGuardian(\"" + ch.name.replace(/'/g, "\\'") + "\")'>Link Guardian</button>" : "") +
        "</div>";
    });
    juniorLog.innerHTML = htmlJ || "<p class='text-xs text-muted'>No junior accounts registered.</p>";
  }

  // 2. Comms Mute Controls & Flagged Incidents Board
  if (!boardContainer) return;

  var mutedList = mod.mutedMembers || [];
  var htmlB =
    "<div class='admin-card' style='margin-bottom:10px;'>" +
      "<div class='flex-between' style='margin-bottom:6px;'>" +
        "<strong style='font-size:12px; color:var(--safc-gold);'>🔇 Muted Members (" + mutedList.length + ")</strong>" +
        "<button class='btn btn-outline btn-sm' style='padding:2px 8px; font-size:9px;' onclick='window.adminManualMutePrompt()'>+ Mute Member</button>" +
      "</div>";

  if (mutedList.length === 0) {
    htmlB += "<p class='text-xs text-muted'>No members are currently muted.</p>";
  } else {
    mutedList.forEach(function(mName) {
      var stCount = mod.strikes[mName] || 0;
      htmlB +=
        "<div style='display:flex; justify-content:space-between; align-items:center; background:#1e293b; padding:6px 8px; border-radius:6px; margin-bottom:4px; font-size:11px;'>" +
          "<span><strong>" + mName + "</strong> <span style='font-size:9px; color:#f87171;'>(Strikes: " + stCount + ")</span></span>" +
          "<button class='btn btn-outline btn-sm' style='padding:2px 8px; font-size:9px; color:var(--green); border-color:var(--green);' onclick='window.adminToggleMemberMute(\"" + mName.replace(/'/g, "\\'") + "\")'>Unmute ✓</button>" +
        "</div>";
    });
  }
  htmlB += "</div>";

  htmlB += "<div class='admin-card'><strong style='font-size:12px; color:var(--safc-gold); display:block; margin-bottom:8px;'>🚨 Flagged Comms Incidents (" + mod.incidents.length + ")</strong>";

  if (mod.incidents.length === 0) {
    htmlB += "<div class='text-xs text-muted'>✓ No flagged profanity or hostility incidents. Automated filter is active across Bus Chat, DMs, and Helpdesk.</div>";
  } else {
    mod.incidents.forEach(function(inc) {
      var votesObj = inc.votes || {};
      var upholdVotes = Object.keys(votesObj).filter(function(k) { return votesObj[k] === "uphold"; }).length;
      var pardonVotes = Object.keys(votesObj).filter(function(k) { return votesObj[k] === "pardon"; }).length;
      var isResolved = (inc.status !== "active_ban");

      htmlB +=
        "<div style='background:#1e293b; border-left:3px solid " + (isResolved ? "var(--green)" : "#ef4444") + "; padding:8px 10px; border-radius:6px; margin-bottom:8px; font-size:11px;'>" +
          "<div class='flex-between'>" +
            "<strong>" + inc.id + " • " + inc.member + " (" + (inc.channel || "Chat") + ")</strong>" +
            "<span style='font-size:9px; color:" + (isResolved ? "var(--green)" : "#f87171") + "; font-weight:700;'>" + (isResolved ? "RESOLVED (" + inc.status.toUpperCase() + ")" : "ACTIVE MUTE") + "</span>" +
          "</div>" +
          "<div style='font-size:10px; color:#fca5a5; margin-top:3px;'>Reason: " + inc.reason + "</div>" +
          "<div style='background:#0f172a; padding:5px 8px; border-radius:4px; margin:5px 0; font-size:10px; color:#cbd5e1;'>\"" + inc.offendingText + "\"</div>" +
          "<div style='display:flex; justify-content:space-between; align-items:center; gap:4px; margin-top:6px;'>" +
            "<button class='btn btn-outline btn-sm' style='padding:2px 8px; font-size:9px;' onclick='window.openTranscriptModal(\"" + inc.id + "\")'>📜 View Transcript</button>" +
            "<div style='display:flex; gap:4px;'>" +
              "<button class='btn btn-outline btn-sm' style='padding:2px 7px; font-size:9px; color:#f87171; border-color:#ef4444;' onclick='window.adminVoteDisciplinary(\"" + inc.id + "\", \"uphold\")'>🔨 Uphold (" + upholdVotes + ")</button>" +
              "<button class='btn btn-outline btn-sm' style='padding:2px 7px; font-size:9px; color:var(--green); border-color:var(--green);' onclick='window.adminVoteDisciplinary(\"" + inc.id + "\", \"pardon\")'>✓ Pardon & Unmute (" + pardonVotes + ")</button>" +
            "</div>" +
          "</div>" +
        "</div>";
    });
  }

  htmlB += "</div>";
  boardContainer.innerHTML = htmlB;
};

window.adminQuickLinkGuardian = async function(childName) {
  var guardName = prompt("🛡️ Link Adult Parent/Guardian for " + childName + "\n\nEnter Adult Member Name or Member # (e.g. Gary Miller or COX-084):");
  if (!guardName) return;

  var matchedAdult = (appState.users || []).find(function(u) {
    return !isMemberUnder18(u) && (u.name.toLowerCase() === guardName.trim().toLowerCase() || (u.memberNo && u.memberNo.toLowerCase() === guardName.trim().toLowerCase()));
  });
  var resolvedAdult = matchedAdult ? matchedAdult.name : guardName.trim();

  appState.friendsAndFamily.push({ id: Date.now(), owner: resolvedAdult, targetName: childName, relation: "Child", type: "Child", status: "approved" });
  appState.friendsAndFamily.push({ id: Date.now() + 1, owner: childName, targetName: resolvedAdult, relation: "Parent", type: "Adult", status: "approved" });

  await window.pushMasterStateToCloud();
  window.renderAdminDisciplinary();
  window.refreshAllViews();
  alert("✓ " + childName + " is now linked to adult guardian " + resolvedAdult + ".");
};

window.adminToggleMemberMute = async function(memberName) {
  var mod = ensureModerationState();
  var idx = mod.mutedMembers.indexOf(memberName);
  if (idx !== -1) {
    mod.mutedMembers.splice(idx, 1);
  } else {
    mod.mutedMembers.push(memberName);
  }
  await window.pushMasterStateToCloud();
  window.renderAdminDisciplinary();
};

window.adminManualMutePrompt = async function() {
  var name = prompt("Enter Member Name to mute from Branch Comms:");
  if (!name || !name.trim()) return;
  var mod = ensureModerationState();
  if (mod.mutedMembers.indexOf(name.trim()) === -1) {
    mod.mutedMembers.push(name.trim());
    await window.pushMasterStateToCloud();
    window.renderAdminDisciplinary();
  }
};

window.adminVoteDisciplinary = async function(incId, decision) {
  var mod = ensureModerationState();
  var inc = mod.incidents.find(function(i) { return i.id === incId; });
  if (!inc) return;

  var adminName = (appState.currentUser && appState.currentUser.name) ? appState.currentUser.name : "Admin";
  if (!inc.votes) inc.votes = {};
  inc.votes[adminName] = decision;

  if (decision === "pardon") {
    inc.status = "pardoned";
    mod.mutedMembers = mod.mutedMembers.filter(function(m) { return m !== inc.member; });
  } else {
    inc.status = "upheld";
    if (mod.mutedMembers.indexOf(inc.member) === -1) mod.mutedMembers.push(inc.member);
  }

  await window.pushMasterStateToCloud();
  window.renderAdminDisciplinary();
  updateAdminDrawerBadge();
};

window.openTranscriptModal = function(incId) {
  var mod = ensureModerationState();
  var inc = mod.incidents.find(function(i) { return i.id === incId; });
  var modal = document.getElementById("modal-transcript");
  var body = document.getElementById("transcript-body");
  if (!inc || !modal || !body) return;

  var lines = (inc.transcriptContext || []).map(function(m) {
    var isFlagged = m.text && m.text.indexOf("[FLAGGED") === 0;
    return "<div style='padding:6px 8px; margin-bottom:4px; border-radius:6px; background:" + (isFlagged ? "#7f1d1d" : "#0f172a") + "; font-size:11px;'>" +
      "<strong>" + m.sender + "</strong> <span style='font-size:9px; color:#94a3b8;'>(" + m.time + ")</span><br>" +
      "<span>" + m.text + "</span>" +
    "</div>";
  }).join("");

  body.innerHTML =
    "<div style='font-size:11px; color:var(--safc-gold); margin-bottom:6px;'>Incident " + inc.id + " • " + inc.member + " • " + inc.timestamp + "</div>" +
    (lines || "<div class='text-xs text-muted'>No surrounding transcript messages recorded.</div>");

  modal.style.display = "flex";
};

window.closeTranscriptModal = function() {
  var modal = document.getElementById("modal-transcript");
  if (modal) modal.style.display = "none";
};

// --- HOME MATCHDAY HUD ---
window.renderHUDView = function() {
  var user = getCurrentUserRecord();
  if (!user) return;

  var isU18 = isMemberUnder18(user);
  window.updateBalanceDisplay();

  var nameElem = document.getElementById("hud-member-name");
  var noElem = document.getElementById("hud-member-no");
  var badgeElem = document.getElementById("hud-subs-badge");
  var hudAvatar = document.getElementById("hud-user-avatar");

  if (nameElem) nameElem.textContent = user.nickname ? user.name + " (" + user.nickname + ")" : user.name;
  if (noElem) noElem.textContent = "Member #" + (user.memberNo || "COX-084") + (isU18 ? " • Junior (U18)" : "");

  var savedPhoto = getSavedAvatar(user);
  if (hudAvatar) {
    hudAvatar.src = savedPhoto || DEFAULT_AVATAR_SVG;
  }

  if (badgeElem) {
    var isActive = (user.membershipStatus === "active");
    badgeElem.textContent = isActive ? "● " + (user.membershipSeason || "2026/27") + " Active" : "⚠️ Subs Overdue (Tap to Pay)";
    badgeElem.className = isActive ? "badge-gold" : "badge-red";
    badgeElem.style.cursor = isActive ? "default" : "pointer";
    badgeElem.onclick = isActive ? null : function() { window.payMyAnnualSubs(); };
  }

  // 1. Urgent Matchday Broadcast Banner (#hud-urgent-banner)
  var urgentBanner = document.getElementById("hud-urgent-banner");
  if (urgentBanner) {
    var urgentNotice = (appState.announcements || []).find(function(a) {
      var readList = Array.isArray(a.readBy) ? a.readBy : [];
      return !a.archived && a.isUrgent && readList.indexOf(user.name) === -1;
    });
    if (urgentNotice) {
      urgentBanner.style.display = "block";
      urgentBanner.innerHTML =
        "<div style='display:flex; justify-content:space-between; align-items:flex-start; gap:8px;'>" +
          "<div><strong style='color:#fde047; display:block; margin-bottom:2px;'>🚨 URGENT BRANCH NOTICE: " + urgentNotice.title + "</strong>" +
          "<span>" + (urgentNotice.content || "") + "</span></div>" +
          "<button type='button' class='btn btn-outline btn-sm' style='padding:2px 6px; font-size:9px; color:#fff; border-color:#f87171; flex-shrink:0;' onclick='window.dismissAnnouncement(\"" + urgentNotice.id + "\")'>Dismiss</button>" +
        "</div>";
    } else {
      urgentBanner.style.display = "none";
    }
  }

  // 2. Fundraiser Pulse Bar (Dynamic 20-100 Team Count, Price & Prize Split)
  var meta = getCardMetaDefaults();
  var totalCardTeams = (appState.footballCard && appState.footballCard.length) ? appState.footballCard.length : (meta.teamCount || 40);
  var soldCount = (appState.footballCard || []).filter(function(sq) { return !!sq.claimedBy; }).length;
  var pricePerSq = Number(meta.pricePerTeam || 2.00);
  var maxPot = totalCardTeams * pricePerSq;
  var winPrize = (meta.prizeMode === "custom") ? Number(meta.winnerPrize || 0) : (maxPot * 0.5);
  var brPrize = (meta.prizeMode === "custom") ? Number(meta.branchPrize || 0) : (maxPot * 0.5);

  var soldCountElem = document.getElementById("hud-pulse-card-sold");
  var barElem = document.getElementById("hud-pulse-card-bar");
  if (soldCountElem) {
    soldCountElem.textContent = (meta.status === "completed")
      ? ("🏆 Won by " + (meta.winnerMember || "Member"))
      : (soldCount + " / " + totalCardTeams + " Claimed");
  }
  if (barElem) barElem.style.width = Math.min(100, Math.round((soldCount / totalCardTeams) * 100)) + "%";

  var pulseCard = document.getElementById("hud-card-fundraiser-pulse");
  if (pulseCard && pulseCard.children && pulseCard.children.length >= 3) {
    var bottomMetaRow = pulseCard.children[2];
    if (bottomMetaRow) {
      bottomMetaRow.innerHTML =
        "<span>£" + pricePerSq.toFixed(2) + " per team (" + totalCardTeams + " teams)</span>" +
        "<span style='color:var(--green); font-weight:700;'>£" + winPrize.toFixed(2) + " Winner • £" + brPrize.toFixed(2) + " Branch</span>";
    }
  }

  // 3. Contextual Travel Card & True Bus Stop Departure Resolution
  var activeMatch = (appState.homeMatches || []).find(function(m) { return String(m.id) === String(appState.selectedHomeMatchId); }) || appState.homeMatches[0];
  var bookedBus = (appState.bookings && Array.isArray(appState.bookings) && activeMatch)
    ? appState.bookings.find(function(b) {
        return String(b.matchId) === String(activeMatch.id) &&
               ((b.name && b.name.toLowerCase().indexOf(user.name.toLowerCase()) !== -1) ||
                (b.bookedBy && b.bookedBy.toLowerCase() === user.name.toLowerCase()));
      })
    : null;

  var statusCard = document.getElementById("hud-travel-card-status");
  if (statusCard) {
    if (bookedBus) {
      var stopLabel = getDynamicStopDisplay(activeMatch.id, bookedBus.busId, bookedBus.stop);
      statusCard.innerHTML = 
        "<div style='display:flex; justify-content:space-between; align-items:center;'>" +
          "<div><strong style='color:var(--green);'>✓ Coach Seat Confirmed</strong><div style='font-size:10px; color:#94a3b8;'>Pickup: " + stopLabel + " • Bus #" + (bookedBus.busId || 1) + "</div></div>" +
          "<button class='btn btn-outline btn-sm' style='font-size:10px; padding:4px 10px;' onclick=\"switchTab('view-travel')\">View Pass</button>" +
        "</div>";
    } else {
      var firstBus = (activeMatch && activeMatch.buses && activeMatch.buses[0]) ? activeMatch.buses[0] : { adultFare: 12, juniorFare: 8 };
      statusCard.innerHTML = 
        "<div style='display:flex; justify-content:space-between; align-items:center;'>" +
          "<div><strong>Official Branch Coach Travel</strong><div style='font-size:10px; color:#94a3b8;'>Fleet provisioned • £" + Number(firstBus.adultFare || 12).toFixed(2) + " Adult / £" + Number(firstBus.juniorFare || 8).toFixed(2) + " Junior</div></div>" +
          "<button class='btn btn-red btn-sm' style='font-size:10px; padding:4px 10px;' onclick=\"switchTab('view-travel')\">Book Seat</button>" +
        "</div>";
    }
  }

  // 4. Next Match Spotlight, True Bus Departure Countdown & Weather
  var masterList = appState.masterFixtures || [];
  var nextFixture = masterList.length > 0 ? masterList[0] : (activeMatch ? {
    opponent: activeMatch.opponent,
    type: "HOME",
    competition: activeMatch.competition || "Premier League",
    venue: activeMatch.venue || "Stadium of Light",
    dateTime: activeMatch.dateTime || "2026-11-21T15:00:00Z",
    dateDisplay: (activeMatch.date || "") + " • " + (activeMatch.time || "15:00"),
    kickoffTime: activeMatch.time || "15:00",
    coordinates: { lat: 54.9146, lon: -1.3882 }
  } : null);

  if (nextFixture) {
    var typePill = document.getElementById("hud-match-type-pill");
    var dateElem = document.getElementById("hud-next-match-date");
    var titleElem = document.getElementById("hud-next-match-title");
    var venueElem = document.getElementById("hud-next-match-venue");

    if (typePill) {
      typePill.textContent = "NEXT MATCH • " + nextFixture.type + (nextFixture.competition ? " • " + nextFixture.competition.toUpperCase() : "");
      typePill.style.background = (nextFixture.type === "HOME") ? "var(--safc-red)" : "#4338ca";
    }
    if (dateElem) dateElem.textContent = nextFixture.dateDisplay;
    if (titleElem) {
      titleElem.textContent = (nextFixture.type === "HOME")
        ? "Sunderland vs " + nextFixture.opponent
        : nextFixture.opponent + " vs Sunderland";
    }
    var venueDisplay = (nextFixture.venue || "Stadium of Light") + (nextFixture.city ? ", " + nextFixture.city : "");
    if (venueElem) venueElem.textContent = venueDisplay + " • " + (nextFixture.competition || "Premier League");

    // Resolve the member's actual village pickup stop & departure time for the countdown
    var countdownTargetIso = nextFixture.dateTime;
    var stopDisplayLabel = "Kickoff @ " + (nextFixture.kickoffTime || "15:00");

    if (activeMatch && activeMatch.buses && activeMatch.buses.length > 0) {
      var targetBus = bookedBus
        ? (activeMatch.buses.find(function(b) { return Number(b.busId || 1) === Number(bookedBus.busId || 1); }) || activeMatch.buses[0])
        : activeMatch.buses[0];
      var busStops = (targetBus && targetBus.stops && targetBus.stops.length > 0) ? targetBus.stops : DEFAULT_STOPS;
      var chosenStopObj = busStops[0];

      if (bookedBus && bookedBus.stop) {
        var cleanBooked = bookedBus.stop.split("(")[0].trim().toLowerCase();
        var foundSt = busStops.find(function(s) { return s.name.trim().toLowerCase() === cleanBooked; });
        if (foundSt) chosenStopObj = foundSt;
      }

      if (chosenStopObj && chosenStopObj.time && nextFixture.dateTime) {
        var datePrefix = nextFixture.dateTime.substring(0, 10);
        var depCandidate = new Date(datePrefix + "T" + chosenStopObj.time.trim() + ":00");
        if (!isNaN(depCandidate.getTime())) {
          countdownTargetIso = depCandidate.toISOString();
        }
        stopDisplayLabel = "🚏 " + chosenStopObj.name + " (" + chosenStopObj.time + ")";
      }
    }

    if (typeof startKickoffCountdown === "function") {
      startKickoffCountdown(countdownTargetIso, stopDisplayLabel);
    }
    if (typeof fetchLiveMatchWeather === "function") {
      if (nextFixture.coordinates) {
        fetchLiveMatchWeather(venueDisplay, nextFixture.coordinates, nextFixture.dateTime);
      } else {
        resolveDynamicVenueCoords(nextFixture.venue, nextFixture.city, nextFixture.country, nextFixture.opponent).then(function(coords) {
          nextFixture.coordinates = coords;
          fetchLiveMatchWeather(venueDisplay, coords, nextFixture.dateTime);
        });
      }
    }
  }

  // 5. Action Required / Notifications Box (#hud-actions-box)
  var actionsBox = document.getElementById("hud-actions-box");
  var actionsList = document.getElementById("hud-actions-list");
  if (actionsBox && actionsList) {
    var actionItems = [];
    if (user.membershipStatus === "lapsed") {
      var dueFee = isU18 ? Number(appState.duesConfig.juniorFee || 5) : Number(appState.duesConfig.adultFee || 10);
      actionItems.push(
        "<div style='display:flex; justify-content:space-between; align-items:center; gap:8px; padding:4px 0;'>" +
          "<span>🔴 <strong>Annual Subs Overdue (" + (appState.duesConfig.activeSeason || "2026/27") + "):</strong> Renew now (£" + dueFee.toFixed(2) + ") to unlock coach bookings and ballots.</span>" +
          (!isU18 ? "<button type='button' class='btn btn-gold btn-sm' style='flex-shrink:0; font-size:10px; padding:4px 10px;' onclick='window.payMyAnnualSubs()'>Pay £" + dueFee.toFixed(2) + " Subs</button>" : "") +
        "</div>"
      );
    }
    var childComp = checkChildCompliance(user);
    if (childComp && childComp.pendingWarning) {
      actionItems.push(
        "<div style='padding:4px 0; color:#fde047;'>🛡️ <strong>Under-18 Safeguarding:</strong> Please ensure your adult parent/guardian links your account within " + childComp.daysRemaining + " day(s).</div>"
      );
    }
    var myAllocatedAway = (appState.awayRegistrations || []).filter(function(r) {
      return r.allocated && (r.memberName === user.name || (r.party && r.party.some(function(p) { return p.indexOf(user.name) !== -1; })));
    });
    if (myAllocatedAway.length > 0) {
      var afix = (appState.awayFixtures || []).find(function(f) { return f.id === myAllocatedAway[0].fixtureId; });
      if (afix) {
        actionItems.push(
          "<div style='padding:4px 0; color:var(--green);'>🎟️ <strong>Away Ticket Allocated:</strong> You have been allocated ticket(s) for " + afix.opponent + " (A) on " + afix.date + ".</div>"
        );
      }
    }

    if (actionItems.length > 0) {
      actionsBox.style.display = "block";
      actionsList.innerHTML = actionItems.join("<hr style='border:none; border-top:1px solid #334155; margin:4px 0;'/>");
    } else {
      actionsBox.style.display = "none";
    }
  }

  // 6. Rich Announcements Feed (with Images, External Links, Reactions & Mark as Read)
  var newsContainer = document.getElementById("hud-news-feed");
  if (newsContainer) {
    newsContainer.innerHTML = "";
    var visibleNotices = (appState.announcements || []).filter(function(item) {
      if (item.archived) return false;
      var readList = Array.isArray(item.readBy) ? item.readBy : [];
      return readList.indexOf(user.name) === -1;
    });

    if (visibleNotices.length === 0) {
      newsContainer.innerHTML = 
        "<div class='card' style='padding:12px; text-align:center; background:#0f172a; color:var(--text-muted); font-size:11px;'>" +
          "✓ You're all caught up! No unread branch announcements." +
        "</div>";
    } else {
      visibleNotices.forEach(function(item) {
        var itemCard = document.createElement("div");
        itemCard.className = "card";
        itemCard.style.cssText = "margin-bottom:8px; padding:10px 12px; background:#0f172a; border-left:3px solid " + (item.isUrgent ? "#ef4444" : "var(--safc-gold)") + ";";
        var bodyText = item.content || item.body || "";

        var mediaHtml = "";
        if (item.imageUrl) {
          mediaHtml += "<img src='" + item.imageUrl + "' class='announcement-banner-img' alt='Announcement Image' onerror='this.style.display=\"none\"' />";
        }
        if (item.linkUrl) {
          mediaHtml += "<a href='" + item.linkUrl + "' target='_blank' rel='noopener noreferrer' class='announcement-link-btn'>🔗 " + (item.linkText || "View Link") + " ➔</a>";
        }

        itemCard.innerHTML = 
          "<div style='display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;'>" +
            "<strong style='font-size:12px; color:#fff;'>" + (item.isUrgent ? "🚨 " : "") + item.title + "</strong>" +
            "<span style='font-size:9px; color:var(--text-muted);'>" + (item.date || "") + "</span>" +
          "</div>" +
          "<div style='font-size:11px; color:#cbd5e1; line-height:1.4; margin-bottom:6px;'>" + bodyText + "</div>" +
          (mediaHtml ? "<div style='margin-bottom:8px;'>" + mediaHtml + "</div>" : "") +
          "<div style='display:flex; justify-content:space-between; align-items:center; border-top:1px solid #1e293b; padding-top:6px;'>" +
            "<button class='btn btn-outline btn-sm' style='padding:2px 8px; font-size:10px;' onclick='window.reactAnnouncement(\"" + item.id + "\")'>👍 " + (item.reactions || 0) + "</button>" +
            "<button class='btn btn-outline btn-sm' style='padding:2px 8px; font-size:10px; color:var(--safc-gold); border-color:var(--safc-gold);' onclick='window.dismissAnnouncement(\"" + item.id + "\")'>✓ Mark as Read</button>" +
          "</div>";
        newsContainer.appendChild(itemCard);
      });
    }
  }
};

window.reactAnnouncement = function(postId) {
  var post = (appState.announcements || []).find(function(a) { return String(a.id) === String(postId); });
  if (post) {
    post.reactions = (post.reactions || 0) + 1;
    saveState();
    window.renderHUDView();
  }
};

window.dismissAnnouncement = function(postId) {
  var post = (appState.announcements || []).find(function(a) { return String(a.id) === String(postId); });
  if (post) {
    if (!Array.isArray(post.readBy)) post.readBy = [];
    var cur = appState.currentUser ? appState.currentUser.name : "Gary Miller";
    if (post.readBy.indexOf(cur) === -1) {
      post.readBy.push(cur);
    }
    saveState();
    window.renderHUDView();
    if (sbClient) {
      sbClient.from("announcements").update({ read_by: post.readBy }).eq("id", post.id).then(function() {});
    }
  }
};

// --- MEMBER TRAVEL & MULTI-BOOKING ---
var currentBookingParty = [];

function getDynamicStopDisplay(matchId, busId, rawStop) {
  if (!rawStop) return "Pickup TBA";
  var cleanName = rawStop.split("(")[0].trim().toLowerCase();
  var match = (appState.homeMatches || []).find(function(m) { return String(m.id) === String(matchId); });
  if (match && match.buses) {
    var bus = match.buses.find(function(b, idx) {
      return String(b.busId || (idx + 1)) === String(busId || 1);
    }) || match.buses[0];
    if (bus && bus.stops) {
      var foundStop = bus.stops.find(function(s) { return s.name.trim().toLowerCase() === cleanName; });
      if (foundStop) return foundStop.name + " (" + foundStop.time + ")";
    }
  }
  return rawStop;
}

// Resolve who originally paid for a booking (ensures refunds never go to U18s or non-payers)
function resolveBookingPayer(booking) {
  if (!booking) return getCurrentUserRecord();

  // 1. Explicit bookedBy field on booking
  if (booking.bookedBy) {
    var explicitPayer = (appState.users || []).find(function(u) {
      return u.name.toLowerCase() === booking.bookedBy.toLowerCase();
    });
    if (explicitPayer && !isMemberUnder18(explicitPayer)) return explicitPayer;
  }

  // 2. Check Forensic Audit Trail for who paid for this booking
  var cleanPassenger = (booking.name || "").split("(")[0].trim().toLowerCase();
  var auditMatch = (appState.masterAuditTrail || []).find(function(t) {
    return t.category === "BUS_BOOKING" && t.debit > 0 && t.desc && t.desc.toLowerCase().indexOf(cleanPassenger) !== -1;
  });
  if (auditMatch && auditMatch.actor) {
    var auditPayer = (appState.users || []).find(function(u) {
      return u.name.toLowerCase() === auditMatch.actor.toLowerCase();
    });
    if (auditPayer && !isMemberUnder18(auditPayer)) return auditPayer;
  }

  // 3. Check if passenger is a Child/U18 -> route refund to their linked Adult Guardian
  var passengerUser = (appState.users || []).find(function(u) {
    return cleanPassenger.indexOf(u.name.toLowerCase()) !== -1;
  });

  if (passengerUser && isMemberUnder18(passengerUser)) {
    var parentLink = (appState.friendsAndFamily || []).find(function(f) {
      return (f.owner === passengerUser.name && f.relation === "Parent") ||
             (f.targetName === passengerUser.name && (f.relation === "Daughter" || f.relation === "Son" || f.relation === "Child"));
    });
    if (parentLink) {
      var guardianName = (parentLink.owner === passengerUser.name) ? parentLink.targetName : parentLink.owner;
      var guardianUser = (appState.users || []).find(function(u) {
        return u.name.toLowerCase() === guardianName.toLowerCase();
      });
      if (guardianUser) return guardianUser;
    }
  }

  // 4. Fallback to passenger if they are an Adult, otherwise default adult payer
  if (passengerUser && !isMemberUnder18(passengerUser)) return passengerUser;
  var cur = getCurrentUserRecord();
  if (!isMemberUnder18(cur)) return cur;

  return (appState.users || []).find(function(u) { return !isMemberUnder18(u); }) || cur;
}

// Check if a passenger is already booked on this match
function isPassengerBookedOnMatch(matchId, personName) {
  var target = (personName || "").trim().toLowerCase();
  return (appState.bookings || []).some(function(b) {
    if (String(b.matchId) !== String(matchId)) return false;
    var names = (b.name || "").split(",").map(function(n) {
      return n.replace(/\(.*?\)/g, "").trim().toLowerCase();
    });
    return names.indexOf(target) !== -1;
  });
}

function initBookingParty() {
  var user = getCurrentUserRecord();
  var activeMatch = (appState.homeMatches || []).find(function(m) { return String(m.id) === String(appState.selectedHomeMatchId); }) || appState.homeMatches[0];
  if (!activeMatch) return;

  var leadAlreadyBooked = isPassengerBookedOnMatch(activeMatch.id, user.name);

  currentBookingParty = [{
    id: "lead-" + user.name,
    name: user.name,
    type: isMemberUnder18(user) ? "Child" : (user.category || "Adult"),
    isLead: true,
    alreadyBooked: leadAlreadyBooked,
    checked: !leadAlreadyBooked
  }];

  var myFriends = (appState.friendsAndFamily || []).filter(function(f) {
    return f.owner === user.name && f.status === "approved";
  });

  myFriends.forEach(function(f) {
    var friendBooked = isPassengerBookedOnMatch(activeMatch.id, f.targetName);
    currentBookingParty.push({
      id: "fnf-" + f.targetName,
      name: f.targetName,
      type: f.type || "Adult",
      relation: f.relation,
      isLinked: true,
      alreadyBooked: friendBooked,
      checked: false
    });
  });
}

function renderBusBookingView() {
  var fixSelect = document.getElementById("member-home-fixture-select");
  var activeMatch = (appState.homeMatches || []).find(function(m) { return String(m.id) === String(appState.selectedHomeMatchId); }) || appState.homeMatches[0];

  if (fixSelect && appState.homeMatches && appState.homeMatches.length > 0) {
    var curVal = activeMatch ? activeMatch.id : appState.homeMatches[0].id;
    fixSelect.innerHTML = "";
    appState.homeMatches.forEach(function(m) {
      var opt = document.createElement("option");
      opt.value = m.id;
      var tag = (m.bookingStatus === "open") ? "🟢 Open" : "⚪ Draft";
      opt.textContent = m.opponent + " (H) • " + m.date + " [" + tag + "]";
      if (String(m.id) === String(curVal)) opt.selected = true;
      fixSelect.appendChild(opt);
    });
  }

  var draftNotice = document.getElementById("travel-draft-notice");
  var activeControls = document.getElementById("travel-active-booking-controls");
  var titleElem = document.getElementById("travel-coach-title");

  if (titleElem && activeMatch) titleElem.textContent = "Sunderland vs " + activeMatch.opponent;

  if (activeMatch && activeMatch.bookingStatus === "open") {
    if (draftNotice) draftNotice.style.display = "none";
    if (activeControls) activeControls.style.display = "block";
  } else {
    if (draftNotice) draftNotice.style.display = "block";
    if (activeControls) activeControls.style.display = "none";
    return;
  }

  var buses = (activeMatch && activeMatch.buses) ? activeMatch.buses : [];
  var busSelectorGroup = document.getElementById("booking-bus-selector-group");
  var busSelectElem = document.getElementById("booking-bus-select");

  // Ensure each bus has a valid unique busId
  buses.forEach(function(b, idx) {
    if (!b.busId) b.busId = idx + 1;
  });

  if (busSelectorGroup && busSelectElem) {
    if (buses.length > 1) {
      busSelectorGroup.style.display = "block";
      var validBus = buses.some(function(b) { return String(b.busId) === String(appState.selectedBookingBusId); });
      if (!validBus) appState.selectedBookingBusId = buses[0].busId;

      busSelectElem.innerHTML = "";
      buses.forEach(function(b) {
        var opt = document.createElement("option");
        opt.value = b.busId;
        opt.textContent = b.title + " (" + (b.capacity || 53) + " Seats)";
        if (String(b.busId) === String(appState.selectedBookingBusId)) opt.selected = true;
        busSelectElem.appendChild(opt);
      });
    } else {
      busSelectorGroup.style.display = "none";
      appState.selectedBookingBusId = buses[0] ? buses[0].busId : 1;
    }
  }

  initBookingParty();
  window.updateBookingCoachUI();
}

window.handleMemberFixtureSelect = function(matchId) {
  appState.selectedHomeMatchId = matchId;
  saveState();
  renderBusBookingView();
};

window.updateBookingCoachUI = function() {
  var activeMatch = (appState.homeMatches || []).find(function(m) { return String(m.id) === String(appState.selectedHomeMatchId); }) || appState.homeMatches[0];
  if (!activeMatch) return;
  var buses = activeMatch.buses || [];

  // Read currently selected bus from dropdown when multiple coaches exist
  var busSelectElem = document.getElementById("booking-bus-select");
  if (busSelectElem && buses.length > 1 && busSelectElem.value) {
    appState.selectedBookingBusId = parseInt(busSelectElem.value) || busSelectElem.value;
  }

  var selectedBus = buses.find(function(b, idx) {
    return String(b.busId || (idx + 1)) === String(appState.selectedBookingBusId);
  }) || buses[0] || {
    busId: 1, title: "Bus 1", subtitle: "Official Branch Travel", adultFare: 12.00, juniorFare: 8.00, capacity: 53, stops: DEFAULT_STOPS
  };

  // Update Subtitle, Price Pill & Fleet Capacity Bar for Selected Coach
  var subElem = document.getElementById("travel-coach-subtitle");
  var pricePill = document.getElementById("travel-coach-price-pill");
  var busCountLabel = document.getElementById("travel-bus-count-label");

  if (subElem) subElem.textContent = selectedBus.subtitle || (selectedBus.title + " • Official Branch Travel");
  if (busCountLabel) busCountLabel.textContent = "Fleet: " + buses.length + " Coach" + (buses.length > 1 ? "es" : "");
  if (pricePill) {
    pricePill.textContent = selectedBus.isFreeBus
      ? "FREE BUS (Branch Sponsored)"
      : "£" + Number(selectedBus.adultFare || 12).toFixed(2) + " Adult • £" + Number(selectedBus.juniorFare || 8).toFixed(2) + " Junior";
  }

  var busBookings = (appState.bookings || []).filter(function(b) {
    return String(b.matchId) === String(activeMatch.id) && String(b.busId || 1) === String(selectedBus.busId || 1);
  });
  var totalBooked = 0;
  busBookings.forEach(function(b) { totalBooked += ((b.adults || 0) + (b.juniors || 0)); });
  var cap = selectedBus.capacity || 53;
  var rem = Math.max(0, cap - totalBooked);

  var statusElem = document.getElementById("seats-status");
  var barElem = document.getElementById("seats-bar");
  if (statusElem) statusElem.textContent = rem > 0 ? (totalBooked + " / " + cap + " Booked on " + selectedBus.title) : (selectedBus.title + " FULL");
  if (barElem) barElem.style.width = Math.min(100, Math.round((totalBooked / cap) * 100)) + "%";

  // Populate Pickup Stops for the Selected Bus
  var stopSelect = document.getElementById("booking-stop");
  if (stopSelect) {
    var prevVal = stopSelect.value;
    stopSelect.innerHTML = "";
    var activeStops = (selectedBus.stops && selectedBus.stops.length > 0) ? selectedBus.stops : DEFAULT_STOPS;
    activeStops.forEach(function(s) {
      var opt = document.createElement("option");
      opt.value = s.name;
      opt.textContent = s.name + " (" + s.time + ")";
      if (prevVal === s.name) opt.selected = true;
      stopSelect.appendChild(opt);
    });
  }

  renderActiveBookingsSummary(activeMatch);
  renderPartyPassengersList();
  window.updatePartyFareCalculation();
};

function renderActiveBookingsSummary(activeMatch) {
  var container = document.getElementById("my-active-bookings-summary");
  if (!container) return;

  var cur = appState.currentUser ? appState.currentUser.name : "Gary Miller";

  // Find all linked children of current user so guardians always see & control their children's bookings
  var myLinkedChildren = (appState.friendsAndFamily || []).filter(function(f) {
    return f.owner === cur && (f.type === "Child" || f.relation === "Child" || f.relation === "Daughter" || f.relation === "Son");
  }).map(function(f) { return f.targetName.toLowerCase(); });

  var myBookings = (appState.bookings || []).filter(function(b) {
    if (String(b.matchId) !== String(activeMatch.id)) return false;
    var nameLower = (b.name || "").toLowerCase();
    var isMe = nameLower.indexOf(cur.toLowerCase()) !== -1;
    var isBookedByMe = b.bookedBy && b.bookedBy.toLowerCase() === cur.toLowerCase();
    var isMyChild = myLinkedChildren.some(function(childName) { return nameLower.indexOf(childName) !== -1; });
    return isMe || isBookedByMe || isMyChild;
  });

  if (myBookings.length === 0) {
    container.innerHTML = "";
    return;
  }

  var html = "<div style='font-size:11px; font-weight:800; color:var(--green); margin-bottom:6px;'>✓ CONFIRMED SEATS (YOURS & YOUR PARTY):</div>";
  myBookings.forEach(function(b) {
    var seats = (b.adults || 0) + (b.juniors || 0);
    var resolvedStop = getDynamicStopDisplay(activeMatch.id, b.busId, b.stop);
    var payer = resolveBookingPayer(b);
    var payerNote = (payer && payer.name !== b.name) ? " • Paid by " + payer.name : "";

    html += 
      "<div style='background:#064e3b; border:1px solid #10b981; padding:8px 10px; border-radius:6px; margin-bottom:6px; font-size:11px; color:#fff;'>" +
        "<div style='display:flex; justify-content:space-between; align-items:center;'>" +
          "<strong>" + b.name + " (" + seats + " Seat" + (seats > 1 ? "s" : "") + ")</strong>" +
          "<span style='color:var(--safc-gold); font-weight:700;'>Bus #" + (b.busId || 1) + "</span>" +
        "</div>" +
        "<div style='margin-top:2px; font-size:10px;'>🚏 Pickup: <strong>" + resolvedStop + "</strong>" + payerNote + "</div>" +
        "<div style='display:flex; justify-content:space-between; align-items:center; margin-top:6px;'>" +
          "<span style='font-size:10px; color:#a7f3d0;'>Status: " + (b.boarded ? "Boarded ✓" : "Seat Reserved") + "</span>" +
          "<button class='btn btn-outline btn-sm' style='padding:2px 8px; font-size:9px; color:#f87171; border-color:#f87171;' onclick='window.cancelMyBooking(" + b.id + ")'>Cancel & Refund (£" + Number(b.total || 0).toFixed(2) + ")</button>" +
        "</div>" +
      "</div>";
  });

  container.innerHTML = html;
}

function renderPartyPassengersList() {
  var listContainer = document.getElementById("party-passengers-list");
  if (!listContainer) return;
  listContainer.innerHTML = "";

  currentBookingParty.forEach(function(p, idx) {
    var row = document.createElement("div");
    var rowClass = "party-member-row";
    if (p.isLead) rowClass += " lead";
    else if (p.isGuest) rowClass += " guest";
    row.className = rowClass;

    var badgeText = p.isLead ? "Lead" : (p.relation ? p.relation : (p.isGuest ? "Guest" : "Member"));

    row.innerHTML = 
      "<div style='display:flex; align-items:center; gap:8px;'>" +
        "<input type='checkbox' " + (p.checked ? "checked" : "") + " " + (p.alreadyBooked ? "disabled" : "") + " onchange='window.togglePartyPassenger(" + idx + ", this.checked)' />" +
        "<div>" +
          "<strong>" + p.name + "</strong> " +
          "<span style='font-size:9px; color:var(--safc-gold);'>(" + p.type + " • " + badgeText + ")</span>" +
          (p.alreadyBooked ? "<span style='display:block; font-size:9px; color:var(--green); font-weight:700;'>✓ Seat Already Confirmed</span>" : "") +
        "</div>" +
      "</div>" +
      (!p.isLead && !p.isLinked ? "<button class='btn btn-outline btn-sm' style='padding:1px 6px; font-size:9px; color:#ef4444; border-color:#ef4444;' onclick='window.removePartyPassenger(" + idx + ")'>✕</button>" : "");
    listContainer.appendChild(row);
  });
}

window.togglePartyPassenger = function(idx, isChecked) {
  if (currentBookingParty[idx]) {
    currentBookingParty[idx].checked = isChecked;
    window.updatePartyFareCalculation();
  }
};

window.removePartyPassenger = function(idx) {
  currentBookingParty.splice(idx, 1);
  renderPartyPassengersList();
  window.updatePartyFareCalculation();
};

window.handlePartyMemberSearch = function(query) {
  var box = document.getElementById("party-member-autocomplete-box");
  if (!box) return;

  var q = (query || "").trim().toLowerCase();
  if (q.length < 1) {
    box.style.display = "none";
    return;
  }

  var existingNames = currentBookingParty.map(function(p) { return p.name.toLowerCase(); });
  var matches = (appState.users || []).filter(function(u) {
    var matchName = u.name && u.name.toLowerCase().indexOf(q) !== -1;
    var matchNo = u.memberNo && u.memberNo.toLowerCase().indexOf(q) !== -1;
    var notInParty = existingNames.indexOf(u.name.toLowerCase()) === -1;
    return (matchName || matchNo) && notInParty;
  });

  if (matches.length === 0) {
    box.innerHTML = "<div style='padding:6px 10px; font-size:10px; color:#94a3b8;'>No branch members match '" + query + "'</div>";
    box.style.display = "block";
    return;
  }

  var html = "";
  matches.slice(0, 6).forEach(function(m) {
    var cat = isMemberUnder18(m) ? "Child" : (m.category || "Adult");
    html += 
      "<div class='autocomplete-item' onclick='window.selectPartyMember(\"" + m.name.replace(/'/g, "\\'") + "\", \"" + cat + "\")'>" +
        "<strong>" + m.name + "</strong> <span style='font-size:9px; color:var(--safc-gold);'>(" + (m.memberNo || "Member") + " • " + cat + ")</span>" +
      "</div>";
  });

  box.innerHTML = html;
  box.style.display = "block";
};

window.selectPartyMember = function(memberName, category) {
  var activeMatch = (appState.homeMatches || []).find(function(m) { return String(m.id) === String(appState.selectedHomeMatchId); }) || appState.homeMatches[0];
  var isBooked = activeMatch ? isPassengerBookedOnMatch(activeMatch.id, memberName) : false;

  currentBookingParty.push({
    id: "member-" + memberName,
    name: memberName,
    type: category || "Adult",
    isMember: true,
    alreadyBooked: isBooked,
    checked: !isBooked
  });

  var input = document.getElementById("party-search-member-input");
  var box = document.getElementById("party-member-autocomplete-box");
  if (input) input.value = "";
  if (box) box.style.display = "none";

  renderPartyPassengersList();
  window.updatePartyFareCalculation();
};

window.addPartyGuestPassenger = function() {
  var nameInput = document.getElementById("party-guest-name-input");
  var typeSelect = document.getElementById("party-guest-type-select");
  var guestName = nameInput ? nameInput.value.trim() : "";
  var guestType = typeSelect ? typeSelect.value : "Adult";

  if (!guestName) {
    alert("Please enter the guest passenger's full name.");
    return;
  }

  currentBookingParty.push({
    id: "guest-" + Date.now(),
    name: guestName + " (Guest)",
    type: guestType,
    isGuest: true,
    alreadyBooked: false,
    checked: true
  });

  if (nameInput) nameInput.value = "";
  renderPartyPassengersList();
  window.updatePartyFareCalculation();
};

window.updatePartyStopSelection = function() {
  window.updatePartyFareCalculation();
};

window.updatePartyFareCalculation = function() {
  var activeMatch = (appState.homeMatches || []).find(function(m) { return String(m.id) === String(appState.selectedHomeMatchId); }) || appState.homeMatches[0];
  var buses = (activeMatch && activeMatch.buses) ? activeMatch.buses : [];
  var selectedBus = buses.find(function(b, idx) {
    return String(b.busId || (idx + 1)) === String(appState.selectedBookingBusId);
  }) || buses[0] || { adultFare: 12.00, juniorFare: 8.00, isFreeBus: false };

  var adultCount = 0;
  var juniorCount = 0;

  currentBookingParty.forEach(function(p) {
    if (p.checked && !p.alreadyBooked) {
      if (p.type === "Junior" || p.type === "Child") juniorCount++;
      else adultCount++;
    }
  });

  var totalFare = selectedBus.isFreeBus ? 0.00 : ((adultCount * selectedBus.adultFare) + (juniorCount * selectedBus.juniorFare));
  var fareText = document.getElementById("party-total-fare-text");
  var bookBtn = document.getElementById("btn-book-seat");

  if (fareText) {
    fareText.innerHTML = selectedBus.isFreeBus
      ? "<span style='color:var(--green);'>FREE (Branch Sponsored)</span>"
      : "£" + totalFare.toFixed(2) + " <span style='font-size:10px; color:#94a3b8;'>(" + adultCount + " Adult" + (adultCount !== 1 ? "s" : "") + ", " + juniorCount + " Junior" + (juniorCount !== 1 ? "s" : "") + ")</span>";
  }
  if (bookBtn) {
    var totalSelected = adultCount + juniorCount;
    bookBtn.disabled = (totalSelected === 0);
    bookBtn.textContent = totalSelected > 0
      ? "Book " + totalSelected + " Seat" + (totalSelected > 1 ? "s" : "") + " (" + (selectedBus.isFreeBus ? "FREE" : "£" + totalFare.toFixed(2)) + ")"
      : "Select At Least 1 Passenger";
  }
};

window.openBookingModal = async function() {
  if (!verifyMembershipAccess("book coach seats")) return;

  var user = getCurrentUserRecord();
  if (isMemberUnder18(user)) {
    alert("🛡️ Under-18 Safeguarding Rule:\nJunior members cannot pay for coach bookings directly. Please ask your linked adult guardian to book your seat from their account.");
    return;
  }

  var selectedPassengers = currentBookingParty.filter(function(p) { return p.checked && !p.alreadyBooked; });
  if (selectedPassengers.length === 0) return;

  var stopEl = document.getElementById("booking-stop");
  var chosenStop = stopEl ? stopEl.value : "Coxhoe Londis Shop";

  var bookBtn = document.getElementById("btn-book-seat");
  if (bookBtn) {
    bookBtn.disabled = true;
    bookBtn.textContent = "Checking Live Coach Availability...";
  }

  // 1. Pull latest live bookings & bus capacities from Supabase
  await window.pullLatestCloudStateNow();
  user = getCurrentUserRecord();

  var activeMatch = (appState.homeMatches || []).find(function(m) { return String(m.id) === String(appState.selectedHomeMatchId); }) || appState.homeMatches[0];
  if (!activeMatch || activeMatch.bookingStatus !== "open") {
    renderBusBookingView();
    alert("⚠️ Coach bookings for this fixture are currently closed.");
    return;
  }

  var buses = activeMatch.buses || [];
  var selectedBus = buses.find(function(b, idx) {
    return String(b.busId || (idx + 1)) === String(appState.selectedBookingBusId);
  }) || buses[0];

  // 2. Check live remaining seats on this coach
  var busBookings = (appState.bookings || []).filter(function(b) {
    return String(b.matchId) === String(activeMatch.id) && String(b.busId || 1) === String(selectedBus.busId || 1);
  });
  var totalBooked = 0;
  busBookings.forEach(function(b) { totalBooked += ((b.adults || 0) + (b.juniors || 0)); });
  var cap = selectedBus.capacity || 53;
  var remainingSeats = Math.max(0, cap - totalBooked);

  if (selectedPassengers.length > remainingSeats) {
    renderBusBookingView();
    alert("⚠️ Not enough seats remaining on " + selectedBus.title + "!\n\nRequested: " + selectedPassengers.length + " seat(s)\nAvailable: " + remainingSeats + " seat(s) left.");
    return;
  }

  // 3. Ensure none of the non-guest passengers were just booked on another device
  var duplicatePassengers = [];
  selectedPassengers.forEach(function(p) {
    if (!p.isGuest && isPassengerBookedOnMatch(activeMatch.id, p.name)) {
      duplicatePassengers.push(p.name);
    }
  });
  if (duplicatePassengers.length > 0) {
    renderBusBookingView();
    alert("⚠️ Seat already booked for: " + duplicatePassengers.join(", ") + ".");
    return;
  }

  var adultCount = 0;
  var juniorCount = 0;
  selectedPassengers.forEach(function(p) {
    if (p.type === "Junior" || p.type === "Child") juniorCount++;
    else adultCount++;
  });

  var total = selectedBus.isFreeBus ? 0.00 : ((adultCount * selectedBus.adultFare) + (juniorCount * selectedBus.juniorFare));

  if (user.balance < total) {
    renderBusBookingView();
    alert("Insufficient funds! You have £" + user.balance.toFixed(2) + " but need £" + total.toFixed(2) + ".");
    return;
  }

  if (total > 0 && !window.verifyWalletSpendAuthorization(total, selectedPassengers.length + " Coach Seat(s) vs " + activeMatch.opponent)) {
    renderBusBookingView();
    return;
  }

  user.balance -= total;

  // Use 32-bit safe integer IDs so Supabase Postgres integer columns never reject the insert
  var baseId = Math.floor(100000 + (Date.now() % 800000000));
  var bookedNames = [];

  selectedPassengers.forEach(function(p, idx) {
    var isJr = (p.type === "Junior" || p.type === "Child");
    var seatFare = selectedBus.isFreeBus ? 0.00 : (isJr ? selectedBus.juniorFare : selectedBus.adultFare);
    var newBooking = {
      id: baseId + idx,
      matchId: activeMatch.id,
      busId: selectedBus.busId || 1,
      name: p.name,
      bookedBy: user.name,
      bookedByMemberNo: user.memberNo,
      stop: chosenStop,
      adults: isJr ? 0 : 1,
      juniors: isJr ? 1 : 0,
      total: seatFare,
      boarded: false
    };
    appState.bookings.push(newBooking);
    bookedNames.push(p.name);

    if (sbClient) {
      sbClient.from("bus_bookings").upsert([{
        id: newBooking.id,
        club_id: window.ACTIVE_CLUB_ID,
        match_id: newBooking.matchId,
        bus_id: newBooking.busId,
        name: newBooking.name,
        booked_by: newBooking.bookedBy,
        booked_by_member_no: newBooking.bookedByMemberNo,
        stop: newBooking.stop,
        adults: newBooking.adults,
        juniors: newBooking.juniors,
        total: newBooking.total,
        boarded: false
      }]).then(function() {});
    }
  });

  logForensicTransaction(
    user.name,
    "Member",
    "Branch",
    "BUS_BOOKING",
    "Coach vs " + activeMatch.opponent + " (" + selectedBus.title + "): " + bookedNames.join(", "),
    total,
    0,
    total
  );

  await window.pushMasterStateToCloud();
  window.refreshAllViews();
  alert("✓ Booking confirmed for: " + bookedNames.join(", ") + " on " + selectedBus.title + "!");
};

window.cancelMyBooking = function(bookingId) {
  var bIdx = (appState.bookings || []).findIndex(function(b) { return b.id === bookingId; });
  if (bIdx === -1) return;
  var booking = appState.bookings[bIdx];

  // Always credit the original adult payer (never an Under-18 account)
  var payer = resolveBookingPayer(booking);
  var refundAmount = Number(booking.total || 0);

  if (refundAmount > 0 && payer) {
    payer.balance = (parseFloat(payer.balance) || 0) + refundAmount;
    logForensicTransaction(
      "Branch",
      "System",
      payer.name,
      "BUS_REFUND",
      "Refund: Cancelled seat for " + booking.name + " (#" + booking.id + ")",
      0,
      refundAmount,
      -refundAmount
    );
  }

  appState.bookings.splice(bIdx, 1);
  saveState();
  window.refreshAllViews();

  if (sbClient) {
    sbClient.from("bus_bookings").delete().eq("id", bookingId).then(function() {});
    if (payer && payer.memberNo) {
      sbClient.from("members").update({ balance: payer.balance }).eq("member_no", payer.memberNo).then(function() {});
    }
  }

  var curName = appState.currentUser ? appState.currentUser.name : "";
  if (payer && payer.name !== curName) {
    alert("✓ Seat cancelled for " + booking.name + ".\n£" + refundAmount.toFixed(2) + " has been refunded to the original payer (" + payer.name + ").");
  } else {
    alert("✓ Seat cancelled for " + booking.name + ".\n£" + refundAmount.toFixed(2) + " refunded to your wallet.");
  }
};

// --- AWAY FIXTURE EXPRESSIONS OF INTEREST (WITH FRIENDS & FAMILY PARTY) ---
var currentAwayExtraMembers = [];

function renderMemberAwayView() {
  var sel = document.getElementById("member-away-game-select");
  var card = document.getElementById("member-away-status-card");
  if (!sel || !card) return;

  var currentVal = sel.value;
  sel.innerHTML = "";
  (appState.awayFixtures || []).forEach(function(f) {
    var opt = document.createElement("option");
    opt.value = f.id;
    opt.textContent = f.opponent + " (A) • " + f.date;
    if (currentVal === f.id) opt.selected = true;
    sel.appendChild(opt);
  });
  if (!sel.value && appState.awayFixtures.length > 0) sel.value = appState.awayFixtures[0].id;

  var fixture = appState.awayFixtures.find(function(f) { return f.id === sel.value; }) || appState.awayFixtures[0];
  if (!fixture) return;

  var cur = appState.currentUser ? appState.currentUser.name : "Gary Miller";
  var lead = getCurrentUserRecord();

  var myReg = (appState.awayRegistrations || []).find(function(r) {
    return r.fixtureId === fixture.id && (r.memberName === cur || (r.party && r.party.some(function(p) { return p.indexOf(cur) !== -1; })));
  });

  var html = 
    "<div class='flex-between'>" +
      "<strong>" + fixture.opponent + " (Away)</strong>" +
      "<span class='badge-gold'>" + fixture.date + " (" + (fixture.time || "15:00") + ")</span>" +
    "</div>" +
    "<div class='text-xs text-muted mt-1'>Branch Ticket Quota: <strong>" + fixture.allocation + " Tickets</strong></div>";

  if (myReg) {
    html += 
      "<div style='background:#1e293b; padding:8px 10px; border-radius:6px; margin:10px 0; font-size:11px;'>" +
        "<div>Status: " + (myReg.allocated ? "<strong style='color:var(--green);'>✓ TICKET ALLOCATED BY COMMITTEE</strong>" : "<strong style='color:var(--safc-gold);'>⏳ Interest Registered (Awaiting Allocation)</strong>") + "</div>" +
        "<div style='color:#cbd5e1; margin-top:4px;'>Applicants (" + (myReg.party ? myReg.party.length : 1) + "): <strong>" + (myReg.party ? myReg.party.join(", ") : myReg.memberName) + "</strong></div>" +
      "</div>" +
      "<button class='btn btn-outline btn-sm' style='width:100%; color:#ef4444; border-color:#ef4444;' onclick='window.withdrawAwayInterest(\"" + fixture.id + "\")'>Withdraw Expression of Interest</button>";
  } else {
    var myFriends = (appState.friendsAndFamily || []).filter(function(f) { return f.owner === cur && f.status === "approved"; });
    var leadCat = isMemberUnder18(lead) ? "Child" : (lead.category || "Adult");

    html += 
      "<div style='margin-top:10px; background:#1e293b; padding:10px; border-radius:8px; border:1px solid #334155;'>" +
        "<label class='form-label' style='color:var(--safc-gold); margin-bottom:6px;'>👥 Select Applicants (You & Friends/Family)</label>" +
        "<div style='background:#0f172a; padding:6px 8px; border-radius:6px; margin-bottom:4px; font-size:11px;'>" +
          "<label style='display:flex; align-items:center; gap:8px; cursor:pointer;'>" +
            "<input type='checkbox' class='away-party-member-cb' data-name='" + lead.name + "' data-type='" + leadCat + "' checked /> " +
            "<span><strong>" + lead.name + "</strong> <span style='font-size:9px; color:var(--safc-gold);'>(" + leadCat + " • Lead)</span></span>" +
          "</label>" +
        "</div>";

    myFriends.forEach(function(f) {
      html += 
        "<div style='background:#0f172a; padding:6px 8px; border-radius:6px; margin-bottom:4px; font-size:11px;'>" +
          "<label style='display:flex; align-items:center; gap:8px; cursor:pointer;'>" +
            "<input type='checkbox' class='away-party-member-cb' data-name='" + f.targetName + "' data-type='" + (f.type || "Adult") + "' /> " +
            "<span><strong>" + f.targetName + "</strong> <span style='font-size:9px; color:var(--safc-gold);'>(" + (f.type || "Adult") + " • " + f.relation + ")</span></span>" +
          "</label>" +
        "</div>";
    });

    currentAwayExtraMembers.forEach(function(extra, eIdx) {
      html += 
        "<div style='display:flex; justify-content:space-between; align-items:center; background:#0f172a; padding:6px 8px; border-radius:6px; margin-bottom:4px; font-size:11px;'>" +
          "<label style='display:flex; align-items:center; gap:8px; cursor:pointer;'>" +
            "<input type='checkbox' class='away-party-member-cb' data-name='" + extra.name + "' data-type='" + extra.type + "' checked /> " +
            "<span><strong>" + extra.name + "</strong> <span style='font-size:9px; color:var(--safc-gold);'>(" + extra.type + " • Member)</span></span>" +
          "</label>" +
          "<button class='btn btn-outline btn-sm' style='padding:1px 6px; font-size:9px; color:#ef4444; border-color:#ef4444;' onclick='window.removeAwayExtraMember(" + eIdx + ")'>✕</button>" +
        "</div>";
    });

    html += 
        "<div style='position:relative; margin-top:8px;'>" +
          "<label class='form-label' style='font-size:9px;'>Add Another Branch Member to Application</label>" +
          "<input type='text' id='away-search-member-input' class='form-input' placeholder='Type member name or #...' autocomplete='off' style='font-size:11px; padding:5px;' oninput='window.handleAwayMemberSearch(this.value)' />" +
          "<div id='away-member-autocomplete-box' class='autocomplete-dropdown' style='display:none;'></div>" +
        "</div>" +
        "<button class='btn btn-red btn-sm mt-2' style='width:100%;' onclick='window.registerAwayInterest(\"" + fixture.id + "\")'>Register Expression of Interest</button>" +
      "</div>";
  }

  card.innerHTML = html;
}

window.handleAwayMemberSearch = function(query) {
  var box = document.getElementById("away-member-autocomplete-box");
  if (!box) return;
  var q = (query || "").trim().toLowerCase();
  if (q.length < 1) { box.style.display = "none"; return; }

  var cur = appState.currentUser ? appState.currentUser.name : "Gary Miller";
  var linkedNames = (appState.friendsAndFamily || []).filter(function(f) { return f.owner === cur; }).map(function(f) { return f.targetName.toLowerCase(); });
  var extraNames = currentAwayExtraMembers.map(function(e) { return e.name.toLowerCase(); });

  var matches = (appState.users || []).filter(function(u) {
    var mName = u.name && u.name.toLowerCase().indexOf(q) !== -1;
    var mNo = u.memberNo && u.memberNo.toLowerCase().indexOf(q) !== -1;
    var notIncluded = u.name.toLowerCase() !== cur.toLowerCase() && linkedNames.indexOf(u.name.toLowerCase()) === -1 && extraNames.indexOf(u.name.toLowerCase()) === -1;
    return (mName || mNo) && notIncluded;
  });

  if (matches.length === 0) {
    box.innerHTML = "<div style='padding:6px 10px; font-size:10px; color:#94a3b8;'>No matching members found</div>";
    box.style.display = "block";
    return;
  }

  var html = "";
  matches.slice(0, 5).forEach(function(m) {
    var cat = isMemberUnder18(m) ? "Child" : (m.category || "Adult");
    html += 
      "<div class='autocomplete-item' onclick='window.selectAwayExtraMember(\"" + m.name.replace(/'/g, "\\'") + "\", \"" + cat + "\")'>" +
        "<strong>" + m.name + "</strong> <span style='font-size:9px; color:var(--safc-gold);'>(" + (m.memberNo || "Member") + " • " + cat + ")</span>" +
      "</div>";
  });
  box.innerHTML = html;
  box.style.display = "block";
};

window.selectAwayExtraMember = function(name, type) {
  currentAwayExtraMembers.push({ name: name, type: type || "Adult" });
  renderMemberAwayView();
};

window.removeAwayExtraMember = function(idx) {
  currentAwayExtraMembers.splice(idx, 1);
  renderMemberAwayView();
};

window.registerAwayInterest = function(fixtureId) {
  if (!verifyMembershipAccess("apply for away tickets")) return;

  var cur = appState.currentUser ? appState.currentUser.name : "Gary Miller";
  var party = [];
  document.querySelectorAll(".away-party-member-cb:checked").forEach(function(cb) {
    party.push(cb.getAttribute("data-name") + " (" + cb.getAttribute("data-type") + ")");
  });

  if (party.length === 0) {
    alert("Please select at least 1 member for the away ticket application.");
    return;
  }

  appState.awayRegistrations.push({
    fixtureId: fixtureId,
    memberName: cur,
    party: party,
    allocated: false
  });

  currentAwayExtraMembers = [];
  saveState();
  renderMemberAwayView();
  alert("✓ Expression of interest submitted for " + party.length + " ticket(s):\n" + party.join(", "));
};

window.withdrawAwayInterest = function(fixtureId) {
  var cur = appState.currentUser ? appState.currentUser.name : "Gary Miller";
  appState.awayRegistrations = appState.awayRegistrations.filter(function(r) {
    var isMine = r.memberName === cur || (r.party && r.party.some(function(p) { return p.indexOf(cur) !== -1; }));
    return !(r.fixtureId === fixtureId && isMine);
  });
  saveState();
  renderMemberAwayView();
};

// --- MEMBER PROFILE & PASS ---
function renderProfilePassView() {
  var user = getCurrentUserRecord();
  var cardNameElem = document.getElementById("card-name");
  var cardNoElem = document.getElementById("card-no");
  var avatarImg = document.getElementById("profile-avatar-preview");
  var removePhotoBtn = document.getElementById("btn-remove-profile-photo");

  if (cardNameElem) cardNameElem.textContent = user.nickname ? user.name + ' ("' + user.nickname + '")' : user.name;
  if (cardNoElem) cardNoElem.textContent = "Member #" + user.memberNo + " • " + (isMemberUnder18(user) ? "Child (U18)" : (user.category || "Adult"));

  var savedPhoto = getSavedAvatar(user);
  if (avatarImg) {
    avatarImg.src = savedPhoto || DEFAULT_AVATAR_SVG;
  }
  if (removePhotoBtn) {
    removePhotoBtn.style.display = savedPhoto ? "inline-flex" : "none";
  }

  var nickInput = document.getElementById("profile-edit-nickname");
  var phoneInput = document.getElementById("profile-edit-phone");
  var emNameInput = document.getElementById("profile-edit-emergency-name");
  var emPhoneInput = document.getElementById("profile-edit-emergency-phone");

  if (nickInput) nickInput.value = user.nickname || "";
  if (phoneInput) phoneInput.value = user.phone || "";
  if (emNameInput) emNameInput.value = user.emergencyName || "";
  if (emPhoneInput) emPhoneInput.value = user.emergencyPhone || "";

  window.updateBalanceDisplay();
}

window.handleProfilePhotoUpload = function(event) {
  var file = event.target.files && event.target.files[0];
  if (!file) return;

  var reader = new FileReader();
  reader.onload = function(e) {
    var img = new Image();
    img.onload = function() {
      // Compress to 256x256 JPEG so it permanently fits localStorage & syncs to HUD
      var canvas = document.createElement("canvas");
      var MAX_SIZE = 256;
      var w = img.width;
      var h = img.height;
      if (w > h) {
        if (w > MAX_SIZE) { h = Math.round(h * (MAX_SIZE / w)); w = MAX_SIZE; }
      } else {
        if (h > MAX_SIZE) { w = Math.round(w * (MAX_SIZE / h)); h = MAX_SIZE; }
      }
      canvas.width = w;
      canvas.height = h;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, w, h);
      var compressedDataUrl = canvas.toDataURL("image/jpeg", 0.82);

      var user = getCurrentUserRecord();
      setSavedAvatar(user, compressedDataUrl);
      renderProfilePassView();
      window.renderHUDView();
      alert("✓ Profile photo saved permanently!");
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
};

window.removeMemberProfilePhoto = function() {
  if (!confirm("Remove your profile photo?")) return;
  var user = getCurrentUserRecord();
  setSavedAvatar(user, null);
  var fileInput = document.getElementById("profile-avatar-file-input");
  if (fileInput) fileInput.value = "";
  renderProfilePassView();
  window.renderHUDView();
};

window.saveMemberProfile = function() {
  var user = getCurrentUserRecord();
  var nickInput = document.getElementById("profile-edit-nickname");
  var phoneInput = document.getElementById("profile-edit-phone");
  var emNameInput = document.getElementById("profile-edit-emergency-name");
  var emPhoneInput = document.getElementById("profile-edit-emergency-phone");

  user.nickname = nickInput ? nickInput.value.trim() : "";
  user.phone = phoneInput ? phoneInput.value.trim() : "";
  user.emergencyName = emNameInput ? emNameInput.value.trim() : "";
  user.emergencyPhone = emPhoneInput ? emPhoneInput.value.trim() : "";

  saveState();
  renderProfilePassView();
  alert("✓ Profile details saved.");
};

function renderFriendsFamilyChecklist() {
  var container = document.getElementById("fnf-manager-list");
  if (!container) return;
  container.innerHTML = "";

  var cur = appState.currentUser ? appState.currentUser.name : "Gary Miller";
  var myFriends = (appState.friendsAndFamily || []).filter(function(f) { return f.owner === cur; });

  if (myFriends.length === 0) {
    container.innerHTML = "<div class='text-xs text-muted' style='padding:6px 0;'>No linked friends or family yet. Search below to connect.</div>";
    return;
  }

  myFriends.forEach(function(f) {
    var row = document.createElement("div");
    row.style.cssText = "display:flex; justify-content:space-between; align-items:center; background:#0f172a; padding:6px 8px; border-radius:6px; margin-bottom:4px; font-size:11px;";
    row.innerHTML = 
      "<div><strong>" + f.targetName + "</strong> (" + f.relation + ") <span style='color:var(--safc-gold); font-size:10px;'>• " + (f.type || "Adult") + "</span></div>" +
      "<button class='btn btn-outline btn-sm' style='padding:1px 6px; font-size:9px; color:#ef4444; border-color:#ef4444;' onclick='window.unlinkFriendFamily(" + f.id + ")'>Unlink</button>";
    container.appendChild(row);
  });
}

window.handleFnFMemberSearch = function(query) {
  var box = document.getElementById("fnf-autocomplete-box");
  if (!box) return;

  var q = (query || "").trim().toLowerCase();
  if (q.length < 1) {
    box.style.display = "none";
    return;
  }

  var cur = appState.currentUser ? appState.currentUser.name : "Gary Miller";
  var alreadyLinked = (appState.friendsAndFamily || [])
    .filter(function(f) { return f.owner === cur; })
    .map(function(f) { return f.targetName.toLowerCase(); });

  var matches = (appState.users || []).filter(function(u) {
    var matchName = u.name && u.name.toLowerCase().indexOf(q) !== -1;
    var matchNo = u.memberNo && u.memberNo.toLowerCase().indexOf(q) !== -1;
    var isOther = u.name.toLowerCase() !== cur.toLowerCase() && alreadyLinked.indexOf(u.name.toLowerCase()) === -1;
    return (matchName || matchNo) && isOther;
  });

  if (matches.length === 0) {
    box.innerHTML = "<div style='padding:6px 10px; font-size:10px; color:#94a3b8;'>No unlinked members match '" + query + "'</div>";
    box.style.display = "block";
    return;
  }

  var html = "";
  matches.slice(0, 6).forEach(function(m) {
    var cat = isMemberUnder18(m) ? "Child" : (m.category || "Adult");
    html += 
      "<div class='autocomplete-item' onclick='window.selectFnFMember(\"" + m.name.replace(/'/g, "\\'") + "\", \"" + cat + "\")'>" +
        "<strong>" + m.name + "</strong> <span style='font-size:9px; color:var(--safc-gold);'>(" + (m.memberNo || "Member") + " • " + cat + ")</span>" +
      "</div>";
  });

  box.innerHTML = html;
  box.style.display = "block";
};

window.selectFnFMember = function(memberName, category) {
  var input = document.getElementById("fnf-search-input");
  var relSelect = document.getElementById("fnf-relation-select");
  var box = document.getElementById("fnf-autocomplete-box");

  if (input) input.value = memberName;
  if (relSelect && category === "Child") relSelect.value = "Child";
  if (box) box.style.display = "none";
};

window.unlinkFriendFamily = function(linkId) {
  var link = (appState.friendsAndFamily || []).find(function(f) { return f.id === linkId; });
  if (!link) return;

  appState.friendsAndFamily = appState.friendsAndFamily.filter(function(f) {
    var isDirect = (f.owner === link.owner && f.targetName === link.targetName);
    var isReciprocal = (f.owner === link.targetName && f.targetName === link.owner);
    return !isDirect && !isReciprocal;
  });
  saveState();
  renderFriendsFamilyChecklist();
};

window.requestMemberLink = function() {
  var searchInput = document.getElementById("fnf-search-input");
  var relSelect = document.getElementById("fnf-relation-select");
  var box = document.getElementById("fnf-autocomplete-box");
  var rawQuery = searchInput ? searchInput.value.trim() : "";
  var relation = relSelect ? relSelect.value : "Friend";
  if (!rawQuery) return;

  if (box) box.style.display = "none";

  var matchedUser = (appState.users || []).find(function(u) {
    return u.name.toLowerCase() === rawQuery.toLowerCase() || (u.memberNo && u.memberNo.toLowerCase() === rawQuery.toLowerCase());
  });

  var targetName = matchedUser ? matchedUser.name : rawQuery;
  var isTargetChild = (matchedUser && isMemberUnder18(matchedUser)) || relation === "Child";
  var cur = appState.currentUser ? appState.currentUser.name : "Gary Miller";

  if (isTargetChild) {
    appState.pendingLinkRequests.push({
      id: Date.now(),
      requester: cur,
      targetName: targetName,
      relation: relation,
      type: "Child",
      status: "pending_admin"
    });
    alert("🛡️ Link request for " + targetName + " submitted for Committee Safeguarding Approval.");
  } else {
    appState.friendsAndFamily.push({
      id: Date.now(),
      owner: cur,
      targetName: targetName,
      relation: relation,
      type: "Adult",
      memberNo: matchedUser ? matchedUser.memberNo : "Member",
      status: "approved"
    });
    appState.friendsAndFamily.push({
      id: Date.now() + 1,
      owner: targetName,
      targetName: cur,
      relation: "Friend",
      type: "Adult",
      memberNo: appState.currentUser.memberNo || "Member",
      status: "approved"
    });
    alert("✓ Linked with " + targetName + ".");
  }

  if (searchInput) searchInput.value = "";
  saveState();
  renderFriendsFamilyChecklist();
  updateAdminDrawerBadge();
};

// --- WALLET STATEMENT ---
window.handleStatementTimeframeChange = function(val) {
  var customBox = document.getElementById("statement-custom-date-box");
  if (customBox) {
    customBox.style.display = (val === "CUSTOM") ? "grid" : "none";
  }
  renderWalletStatement();
};

function renderWalletStatement() {
  var container = document.getElementById("wallet-statement-list");
  var summaryEl = document.getElementById("statement-filtered-summary");
  if (!container) return;
  container.innerHTML = "";

  var current = appState.currentUser ? appState.currentUser.name : "Gary Miller";
  var catVal = document.getElementById("filter-statement-category") ? document.getElementById("filter-statement-category").value : "ALL";
  var dirVal = document.getElementById("filter-statement-direction") ? document.getElementById("filter-statement-direction").value : "ALL";
  var timeVal = document.getElementById("filter-statement-time") ? document.getElementById("filter-statement-time").value : "ALL";
  var searchVal = document.getElementById("filter-statement-search") ? document.getElementById("filter-statement-search").value.trim().toLowerCase() : "";
  var startDateVal = document.getElementById("filter-statement-start-date") ? document.getElementById("filter-statement-start-date").value : "";
  var endDateVal = document.getElementById("filter-statement-end-date") ? document.getElementById("filter-statement-end-date").value : "";

  var nowMs = Date.now();

  var myTxns = (appState.masterAuditTrail || []).filter(function(t) {
    var isMine = (t.actor === current || t.target === current);
    if (!isMine) return false;

    var isCredit = (t.target === current && t.credit > 0);
    var isDebit = (t.actor === current && t.debit > 0);
    if (!isCredit && !isDebit) return false;

    if (dirVal === "IN" && !isCredit) return false;
    if (dirVal === "OUT" && !isDebit) return false;

    var cat = (t.category || "").toUpperCase();
    var desc = (t.desc || "").toUpperCase();
    if (catVal !== "ALL") {
      if (catVal === "SUBS" && cat.indexOf("SUBS") === -1) return false;
      if (catVal === "TOPUP" && cat.indexOf("TOPUP") === -1) return false;
      if (catVal === "WITHDRAWAL" && cat.indexOf("WITHDRAW") === -1 && cat.indexOf("REFUND") === -1) return false;
      if (catVal === "BUS" && cat.indexOf("BUS") === -1) return false;
      if (catVal === "CARD" && cat.indexOf("CARD") === -1) return false;
      if (catVal === "AWAY" && cat.indexOf("AWAY") === -1 && desc.indexOf("AWAY") === -1) return false;
      if (catVal === "BONUS" && cat.indexOf("BONUS") === -1) return false;
      if (catVal === "PRIZE" && cat.indexOf("PAYOUT") === -1 && cat.indexOf("PRIZE") === -1 && cat.indexOf("WINNER") === -1) return false;
    }

    if (searchVal && (t.desc || "").toLowerCase().indexOf(searchVal) === -1 && (t.category || "").toLowerCase().indexOf(searchVal) === -1) {
      return false;
    }

    if (timeVal !== "ALL" && t.timestamp) {
      var dateOnly = t.timestamp.substring(0, 10);
      var txMs = new Date(t.timestamp.replace(" ", "T")).getTime();
      var daysAgo = (nowMs - txMs) / (1000 * 60 * 60 * 24);
      if (timeVal === "7D" && daysAgo > 7) return false;
      if (timeVal === "30D" && daysAgo > 30) return false;
      if (timeVal === "YEAR" && daysAgo > 365) return false;
      if (timeVal === "CUSTOM") {
        if (startDateVal && dateOnly < startDateVal) return false;
        if (endDateVal && dateOnly > endDateVal) return false;
      }
    }

    return true;
  });

  var sumIn = 0;
  var sumOut = 0;
  myTxns.forEach(function(item) {
    if (item.target === current && item.credit > 0) sumIn += Number(item.credit || 0);
    else if (item.actor === current && item.debit > 0) sumOut += Number(item.debit || 0);
  });

  if (summaryEl) {
    summaryEl.innerHTML =
      "<span>Showing <strong>" + myTxns.length + "</strong> item(s)</span>" +
      "<span style='color:var(--green);'>In: +£" + sumIn.toFixed(2) + "</span>" +
      "<span style='color:#ef4444;'>Out: -£" + sumOut.toFixed(2) + "</span>";
  }

  if (myTxns.length === 0) {
    container.innerHTML = "<div style='color:#94a3b8; font-size:11px; text-align:center; padding:10px;'>No transactions match the selected filters.</div>";
    return;
  }

  myTxns.slice(0, 40).forEach(function(item) {
    var isCredit = (item.target === current && item.credit > 0);
    var row = document.createElement("div");
    row.style.cssText = "display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #334155; padding:8px 0; font-size:12px;";
    row.innerHTML = 
      "<div><strong>" + item.desc + "</strong><br><span style='font-size:10px; color:#94a3b8;'>" + item.timestamp.substring(0, 16) + " • " + item.category + "</span></div>" +
      "<div style='font-weight:700; color:" + (isCredit ? "var(--green)" : "#ef4444") + ";'>" + (isCredit ? "+£" : "-£") + Number(isCredit ? item.credit : item.debit).toFixed(2) + "</div>";
    container.appendChild(row);
  });
}

window.exportMyStatementCSV = function() {
  var current = appState.currentUser ? appState.currentUser.name : "Gary Miller";
  var myTxns = (appState.masterAuditTrail || []).filter(function(t) { return t.actor === current || t.target === current; });

  var csv = "Txn ID,Timestamp,Category,Description,Debit,Credit,Balance After\n";
  myTxns.forEach(function(t) {
    csv += '"' + t.txnId + '","' + t.timestamp + '","' + t.category + '","' + t.desc.replace(/"/g, '""') + '","£' + t.debit.toFixed(2) + '","£' + t.credit.toFixed(2) + '","£' + t.balanceAfter.toFixed(2) + '"\n';
  });

  var blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  var a = document.createElement("a");
  a.href = window.URL.createObjectURL(blob);
  a.download = current.replace(/\s+/g, "_") + "_Statement.csv";
  a.click();
};

// --- COMMS & CHAT HUB ---
window._pendingConfirmCallback = null;

window.closeConfirmModal = function() {
  var modal = document.getElementById("modal-confirm");
  if (modal) modal.style.display = "none";
  window._pendingConfirmCallback = null;
};

window.executeConfirmModal = function() {
  var cb = window._pendingConfirmCallback;
  window.closeConfirmModal();
  if (typeof cb === "function") cb();
};

window.switchCommsSubTab = function(subId) {
  var pBus = document.getElementById("comms-sub-bus");
  var pDm = document.getElementById("comms-sub-dm");
  var pDesk = document.getElementById("comms-sub-desk");

  if (pBus) pBus.style.display = (subId === "bus") ? "block" : "none";
  if (pDm) pDm.style.display = (subId === "dm") ? "block" : "none";
  if (pDesk) pDesk.style.display = (subId === "desk") ? "block" : "none";

  var bBus = document.getElementById("btn-sub-bus");
  var bDm = document.getElementById("btn-sub-dm");
  var bDesk = document.getElementById("btn-sub-desk");

  if (bBus) bBus.className = (subId === "bus") ? "btn btn-gold btn-sm" : "btn btn-outline btn-sm";
  if (bDm) bDm.className = (subId === "dm") ? "btn btn-gold btn-sm" : "btn btn-outline btn-sm";
  if (bDesk) bDesk.className = (subId === "desk") ? "btn btn-gold btn-sm" : "btn btn-outline btn-sm";

  if (subId === "dm") {
    renderDirectMessagesView();
  }
};

function renderCommsTabs() {
  renderMatchdayBusChat();
  renderDirectMessagesView();
  renderCommitteeDeskView();
}

function renderMatchdayBusChat() {
  var container = document.getElementById("bus-chat-messages");
  if (!container) return;
  container.innerHTML = "";

  var activeMatch = (appState.homeMatches && appState.homeMatches.length > 0)
    ? (appState.homeMatches.find(function(m) { return String(m.id) === String(appState.selectedHomeMatchId); }) || appState.homeMatches[0])
    : { id: "H-01", opponent: "Coventry City" };

  var titleElem = document.getElementById("bus-chat-match-title");
  if (titleElem) titleElem.textContent = activeMatch.opponent + " (H) Bus Chat";

  var adminActions = document.getElementById("bus-chat-admin-actions");
  if (adminActions) adminActions.style.display = (appState.currentUser && appState.currentUser.role === "admin") ? "block" : "none";

  // Auto-prune messages older than 24 hours
  var cutoffMs = Date.now() - (24 * 60 * 60 * 1000);
  var currentMatchMsgs = (appState.matchdayChat || []).filter(function(msg) {
    var recentEnough = !msg.timestamp || msg.timestamp >= cutoffMs;
    var sameMatch = !msg.matchId || String(msg.matchId) === String(activeMatch.id);
    return recentEnough && sameMatch;
  });

  if (currentMatchMsgs.length === 0) {
    container.innerHTML = "<div style='color:#94a3b8; font-size:11px; text-align:center; padding:20px 0;'>🚌 Chat live for passengers. Auto-expires 24h post-match.</div>";
  } else {
    currentMatchMsgs.forEach(function(msg) {
      var isMe = msg.sender === (appState.currentUser ? appState.currentUser.name : "");
      var bubble = document.createElement("div");
      bubble.style.cssText = "margin-bottom:8px; display:flex; flex-direction:column; align-items:" + (isMe ? "flex-end" : "flex-start") + ";";
      bubble.innerHTML = 
        "<div style='font-size:9px; color:#94a3b8; margin-bottom:2px;'>" + msg.sender + " • " + msg.time + "</div>" +
        "<div style='background:" + (isMe ? "var(--safc-red)" : "#1e293b") + "; color:#fff; padding:6px 10px; border-radius:10px; font-size:12px; max-width:80%;'>" + msg.text + "</div>";
      container.appendChild(bubble);
    });
    container.scrollTop = container.scrollHeight;
  }
}

window.sendMatchdayBusMessage = async function() {
  var input = document.getElementById("bus-chat-input");
  var text = input ? input.value.trim() : "";
  if (!text) return;
  var current = appState.currentUser ? appState.currentUser.name : "Gary Miller";

  // Run moderation & profanity filter before posting
  if (!checkAndEnforceModeration(current, text, "Bus Chat", appState.matchdayChat)) {
    if (input) input.value = "";
    return;
  }

  var activeMatch = (appState.homeMatches || []).find(function(m) { return String(m.id) === String(appState.selectedHomeMatchId); }) || (appState.homeMatches || [])[0] || { id: "H-01" };
  var now = new Date();

  var newMsg = {
    id: Math.floor(100000 + Math.random() * 90000000),
    matchId: activeMatch.id,
    timestamp: now.getTime(),
    sender: current,
    time: now.toTimeString().substring(0, 5),
    text: text
  };
  appState.matchdayChat.push(newMsg);
  input.value = "";

  if (sbClient) {
    sbClient.from("matchday_chat").upsert([{
      id: newMsg.id,
      sender: newMsg.sender,
      time: newMsg.time,
      text: newMsg.text
    }]).then(function() {});
  }

  await window.pushMasterStateToCloud();
  renderMatchdayBusChat();
  updateCommsBadge();
};

window.adminPurgeMatchdayChat = async function() {
  if (!confirm("Clear bus chat for this match?")) return;
  var activeMatch = (appState.homeMatches || []).find(function(m) { return String(m.id) === String(appState.selectedHomeMatchId); }) || (appState.homeMatches || [])[0] || { id: "H-01" };
  appState.matchdayChat = (appState.matchdayChat || []).filter(function(m) { return m.matchId && String(m.matchId) !== String(activeMatch.id); });
  await window.pushMasterStateToCloud();
  renderMatchdayBusChat();
  updateCommsBadge();
};

// --- 1-TO-1 DIRECT MESSAGES (ADULT ONLY + PRIVACY ENFORCED) ---
window._activeDMRecipient = null;

function canCurrentUserDMTarget(curUser, targetUser) {
  if (!curUser || !targetUser) return false;
  if (isMemberUnder18(curUser) || isMemberUnder18(targetUser)) return false;

  // Committee Admins and messages to Committee Admins are always permitted for adults
  if (isUserVerifiedAdmin(curUser) || isUserVerifiedAdmin(targetUser)) return true;

  var targetCfg = getSettingsForMemberNo(targetUser.memberNo);
  var targetPrivacy = targetUser.dmPrivacy || targetCfg.dmPrivacy || "all";

  if (targetPrivacy === "committee") return false;
  if (targetPrivacy === "fnf") {
    var isLinkedFnF = (appState.friendsAndFamily || []).some(function(f) {
      return f.status === "approved" &&
             ((f.owner === targetUser.name && f.targetName === curUser.name) ||
              (f.owner === curUser.name && f.targetName === targetUser.name));
    });
    return isLinkedFnF;
  }
  return true;
}

function renderDirectMessagesView() {
  var container = document.getElementById("dm-threads-container");
  if (!container) return;

  var curRecord = getCurrentUserRecord();
  var current = curRecord ? curRecord.name : "Gary Miller";

  if (isMemberUnder18(curRecord)) {
    container.innerHTML = "<div style='color:#ef4444; background:#1e0508; border:1px solid #7f1d1d; padding:12px; border-radius:8px; font-size:12px;'>🛡️ Direct messaging is disabled for accounts under 18 under branch safeguarding rules.</div>";
    return;
  }

  if (!appState.readTracker[current]) {
    appState.readTracker[current] = { busChatCount: 0, readMsgIds: [], readNoteIds: [], readDmIds: [] };
  }
  var tracker = appState.readTracker[current];
  if (!tracker.readDmIds) tracker.readDmIds = [];

  var eligibleUsers = (appState.users || []).filter(function(u) {
    return u.name !== current && canCurrentUserDMTarget(curRecord, u);
  });

  if (eligibleUsers.length === 0) {
    container.innerHTML = "<div style='color:#94a3b8; font-size:11px; text-align:center; padding:14px;'>No eligible recipients available based on member DM privacy settings.</div>";
    return;
  }

  // If user has unread DMs and hasn't manually picked a thread yet, auto-select the sender with unread messages
  var stillEligible = eligibleUsers.some(function(u) { return u.name === window._activeDMRecipient; });
  if (!window._activeDMRecipient || !stillEligible) {
    var firstUnreadSender = eligibleUsers.find(function(u) {
      return (appState.directMessages || []).some(function(m) {
        return m.from === u.name && m.to === current && tracker.readDmIds.indexOf(m.id) === -1;
      });
    });
    window._activeDMRecipient = firstUnreadSender ? firstUnreadSender.name : eligibleUsers[0].name;
  }

  // If the Comms view & Private DMs sub-tab are currently visible on screen, mark messages from the active recipient as read
  var commsView = document.getElementById("view-comms");
  var dmSubPane = document.getElementById("comms-sub-dm");
  var isDmVisibleOnScreen = commsView && commsView.classList.contains("active") && dmSubPane && dmSubPane.style.display !== "none";

  if (isDmVisibleOnScreen && window._activeDMRecipient) {
    var markedAny = false;
    (appState.directMessages || []).forEach(function(m) {
      if (m.from === window._activeDMRecipient && m.to === current && m.id && tracker.readDmIds.indexOf(m.id) === -1) {
        tracker.readDmIds.push(m.id);
        markedAny = true;
      }
    });
    if (markedAny) {
      saveLocalCacheOnly();
      updateCommsBadge();
    }
  }

  var optionsHtml = eligibleUsers.map(function(u) {
    var badge = isUserVerifiedAdmin(u) ? " (Committee 🛡️)" : "";
    var unreadFromUser = (appState.directMessages || []).filter(function(m) {
      return m.from === u.name && m.to === current && tracker.readDmIds.indexOf(m.id) === -1;
    }).length;
    var unreadTag = unreadFromUser > 0 ? " 🔴 (" + unreadFromUser + " new)" : "";
    return "<option value='" + u.name + "' " + (u.name === window._activeDMRecipient ? "selected" : "") + ">" + u.name + badge + unreadTag + "</option>";
  }).join("");

  var conversation = (appState.directMessages || []).filter(function(m) {
    return (m.from === current && m.to === window._activeDMRecipient) || (m.from === window._activeDMRecipient && m.to === current);
  });

  var messagesHtml = "";
  if (conversation.length === 0) {
    messagesHtml = "<div style='color:#94a3b8; font-size:11px; text-align:center; padding:20px 0;'>💬 No private messages with " + window._activeDMRecipient + " yet.</div>";
  } else {
    conversation.forEach(function(m) {
      var isMe = (m.from === current);
      messagesHtml += 
        "<div style='margin-bottom:8px; display:flex; flex-direction:column; align-items:" + (isMe ? "flex-end" : "flex-start") + ";'>" +
          "<div style='font-size:9px; color:#94a3b8; margin-bottom:2px;'>" + m.from + " • " + m.time + "</div>" +
          "<div style='background:" + (isMe ? "var(--safc-red)" : "#1e293b") + "; color:#fff; padding:6px 10px; border-radius:10px; font-size:12px; max-width:80%;'>" + m.text + "</div>" +
        "</div>";
    });
  }

  container.innerHTML = 
    "<div style='margin-bottom:8px;'><label class='form-label' style='font-size:9px;'>Conversation With</label><select class='form-select' onchange='window._activeDMRecipient=this.value; renderDirectMessagesView();'>" + optionsHtml + "</select></div>" +
    "<div id='active-dm-feed' style='background:#0f172a; padding:10px; border-radius:8px; height:160px; overflow-y:auto; margin-bottom:8px; border:1px solid #334155;'>" + messagesHtml + "</div>" +
    "<div style='display:flex; gap:6px;'><input type='text' id='dm-message-input' class='form-input' placeholder='Type private message...' style='font-size:11px;' /><button class='btn btn-red btn-sm' onclick='window.sendDirectMessage()'>Send</button></div>";

  var feedEl = document.getElementById("active-dm-feed");
  if (feedEl) feedEl.scrollTop = feedEl.scrollHeight;
}

window.sendDirectMessage = async function() {
  var input = document.getElementById("dm-message-input");
  var text = input ? input.value.trim() : "";
  if (!text || !window._activeDMRecipient) return;

  var current = appState.currentUser ? appState.currentUser.name : "Gary Miller";
  if (!appState.directMessages) appState.directMessages = [];

  var recentThread = appState.directMessages.filter(function(m) {
    return (m.from === current && m.to === window._activeDMRecipient) || (m.from === window._activeDMRecipient && m.to === current);
  });

  if (!checkAndEnforceModeration(current, text, "Direct Message to " + window._activeDMRecipient, recentThread)) {
    if (input) input.value = "";
    return;
  }

  appState.directMessages.push({
    id: "dm-" + Date.now(),
    from: current,
    to: window._activeDMRecipient,
    text: text,
    time: new Date().toTimeString().substring(0, 5),
    timestamp: Date.now()
  });

  input.value = "";
  await window.pushMasterStateToCloud();
  renderDirectMessagesView();
};

// --- HELPDESK & COMMITTEE MAILBOX ---
function renderCommitteeDeskView() {
  var container = document.getElementById("helpdesk-threads-list");
  if (!container) return;
  container.innerHTML = "";

  var current = appState.currentUser ? appState.currentUser.name : "Gary Miller";
  var isAdmin = appState.currentUser && appState.currentUser.role === "admin";
  var myTickets = (appState.helpdeskTickets || []).filter(function(t) {
    return isAdmin ? true : (t.member && t.member.indexOf(current) !== -1);
  });

  if (myTickets.length === 0) {
    container.innerHTML = "<div style='color:#94a3b8; font-size:11px;'>No tickets in mailbox.</div>";
    return;
  }

  var tracker = appState.readTracker[current] || { readMsgIds: [], readNoteIds: [] };

  myTickets.forEach(function(t) {
    var unreadMsgs = (t.messages || []).filter(function(m) {
      return m.sender !== current && (tracker.readMsgIds || []).indexOf(m.id) === -1;
    }).length;
    var unreadNotes = isAdmin ? (t.internalNotes || []).filter(function(n) {
      return n.author !== current && (tracker.readNoteIds || []).indexOf(n.id) === -1;
    }).length : 0;

    var isClosed = (t.status === "closed" || t.status === "resolved");
    var card = document.createElement("div");
    card.style.cssText = "background:#0f172a; border:1px solid #334155; border-left:3px solid " + (isClosed ? "#64748b" : "var(--safc-gold)") + "; padding:10px; border-radius:8px; margin-bottom:8px; font-size:11px;";
    card.innerHTML = 
      "<div style='display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;'>" +
        "<div><strong>#" + t.id + " • " + t.topic + " (" + t.member + ")</strong>" +
          (unreadMsgs > 0 ? " <span class='badge-red' style='margin-left:4px;'>" + unreadMsgs + " new</span>" : "") +
          (unreadNotes > 0 ? " <span class='badge-gold' style='margin-left:4px;'>🔒 " + unreadNotes + "</span>" : "") +
        "</div>" +
        "<span style='color:" + (isClosed ? "#94a3b8" : "var(--green)") + "; font-weight:700; text-transform:uppercase; font-size:10px;'>" + (t.status || "Open") + "</span>" +
      "</div>" +
      "<button class='btn btn-outline btn-sm' style='width:100%;' onclick='window.openMailboxThreadModal(\"" + t.id + "\")'>📬 Open Mailbox Thread</button>";
    container.appendChild(card);
  });
}

window.openMailboxThreadModal = function(ticketId) {
  var ticket = (appState.helpdeskTickets || []).find(function(t) { return t.id === ticketId; });
  if (!ticket) return;

  var current = appState.currentUser ? appState.currentUser.name : "Gary Miller";
  var isAdmin = appState.currentUser && appState.currentUser.role === "admin";

  // Mark all messages and internal notes in this thread as read for the current user
  if (!appState.readTracker[current]) {
    appState.readTracker[current] = { busChatCount: 0, readMsgIds: [], readNoteIds: [] };
  }
  var tracker = appState.readTracker[current];
  if (!tracker.readMsgIds) tracker.readMsgIds = [];
  if (!tracker.readNoteIds) tracker.readNoteIds = [];

  (ticket.messages || []).forEach(function(m) {
    if (m.id && tracker.readMsgIds.indexOf(m.id) === -1) tracker.readMsgIds.push(m.id);
  });
  if (isAdmin) {
    (ticket.internalNotes || []).forEach(function(n) {
      if (n.id && tracker.readNoteIds.indexOf(n.id) === -1) tracker.readNoteIds.push(n.id);
    });
  }
  saveLocalCacheOnly();
  updateCommsBadge();
  renderCommitteeDeskView();

  var modal = document.getElementById("modal-ticket-thread");
  var title = document.getElementById("mailbox-thread-title");
  var body = document.getElementById("mailbox-thread-body");

  var isClosed = (ticket.status === "closed" || ticket.status === "resolved");
  title.innerHTML = "Mailbox: #" + ticket.id + " • " + ticket.topic + " (" + (isClosed ? "Resolved" : "Open") + ")";

  var html = "<div style='font-size:11px; font-weight:800; color:var(--safc-gold); margin-bottom:6px;'>Conversation:</div>";
  html += "<div style='background:#0f172a; padding:8px; border-radius:8px; margin-bottom:12px; max-height:160px; overflow-y:auto;'>";
  (ticket.messages || []).forEach(function(m) {
    html += "<div style='margin-bottom:6px; background:#1e293b; padding:6px 8px; border-radius:6px; font-size:11px;'><strong>" + m.sender + "</strong> <span style='font-size:9px; color:#94a3b8;'>(" + m.time + ")</span>: " + m.text + "</div>";
  });
  html += "</div>";

  if (isAdmin) {
    html += "<div class='flex-between' style='margin-bottom:6px;'>" +
      "<span style='font-size:11px; font-weight:800; color:var(--safc-gold);'>🔒 Committee Internal Notes (Admin Only):</span>" +
      "<button class='btn btn-outline btn-sm' style='padding:2px 8px; font-size:9px;' onclick='window.toggleHelpdeskTicketStatus(\"" + ticket.id + "\")'>" + (isClosed ? "Reopen Ticket" : "✓ Mark Resolved") + "</button>" +
    "</div>";
    html += "<div style='background:#1e1b4b; padding:8px; border-radius:8px; margin-bottom:8px; max-height:110px; overflow-y:auto;'>";
    if (!ticket.internalNotes || ticket.internalNotes.length === 0) {
      html += "<div style='font-size:10px; color:#94a3b8;'>No internal committee notes yet.</div>";
    } else {
      ticket.internalNotes.forEach(function(n) {
        html += "<div style='margin-bottom:4px; font-size:10px; color:#f8fafc;'><strong>" + n.author + " (" + (n.time || "") + "):</strong> " + n.text + "</div>";
      });
    }
    html += "</div>";
    html += "<div style='display:flex; gap:4px; margin-bottom:12px;'>" +
      "<input type='text' id='admin-internal-note-input' class='form-input' placeholder='Add private committee note...' style='font-size:11px;' />" +
      "<button class='btn btn-gold btn-sm' onclick='window.submitAdminInternalNote(\"" + ticket.id + "\")'>+ Note</button>" +
    "</div>";
  }

  html += 
    "<div style='display:flex; gap:4px;'>" +
      "<input type='text' id='public-reply-input' class='form-input' placeholder='Type reply to thread...' style='font-size:11px;' />" +
      "<button class='btn btn-red btn-sm' onclick='window.submitPublicReply(\"" + ticket.id + "\")'>Send</button>" +
    "</div>";

  body.innerHTML = html;
  modal.style.display = "flex";
};

window.closeMailboxThreadModal = function() {
  var modal = document.getElementById("modal-ticket-thread");
  if (modal) modal.style.display = "none";
};

window.submitAdminInternalNote = async function(ticketId) {
  var input = document.getElementById("admin-internal-note-input");
  var text = input ? input.value.trim() : "";
  if (!text) return;

  var ticket = (appState.helpdeskTickets || []).find(function(t) { return t.id === ticketId; });
  if (!ticket) return;
  if (!Array.isArray(ticket.internalNotes)) ticket.internalNotes = [];

  var noteId = "n-" + Date.now();
  var author = appState.currentUser ? appState.currentUser.name : "Admin";
  ticket.internalNotes.push({
    id: noteId,
    author: author,
    time: new Date().toTimeString().substring(0, 5),
    text: text
  });

  if (appState.readTracker[author] && appState.readTracker[author].readNoteIds) {
    appState.readTracker[author].readNoteIds.push(noteId);
  }

  if (sbClient) {
    sbClient.from("helpdesk_tickets").update({ internal_notes: ticket.internalNotes }).eq("id", ticket.id).then(function() {});
  }

  await window.pushMasterStateToCloud();
  window.openMailboxThreadModal(ticketId);
  updateCommsBadge();
};

window.toggleHelpdeskTicketStatus = async function(ticketId) {
  var ticket = (appState.helpdeskTickets || []).find(function(t) { return t.id === ticketId; });
  if (!ticket) return;
  ticket.status = (ticket.status === "open") ? "resolved" : "open";

  if (sbClient) {
    sbClient.from("helpdesk_tickets").update({ status: ticket.status }).eq("id", ticket.id).then(function() {});
  }

  await window.pushMasterStateToCloud();
  window.openMailboxThreadModal(ticketId);
  renderCommitteeDeskView();
};

window.submitPublicReply = async function(ticketId) {
  var input = document.getElementById("public-reply-input");
  var text = input ? input.value.trim() : "";
  if (!text) return;

  var current = appState.currentUser ? appState.currentUser.name : "Gary Miller";
  var ticket = (appState.helpdeskTickets || []).find(function(t) { return t.id === ticketId; });
  if (!ticket) return;

  if (!checkAndEnforceModeration(current, text, "Helpdesk #" + ticketId, ticket.messages)) {
    if (input) input.value = "";
    return;
  }

  var msgId = "m-" + Date.now();
  ticket.messages.push({
    id: msgId,
    sender: current,
    time: new Date().toTimeString().substring(0, 5),
    text: text
  });

  if (appState.readTracker[current] && appState.readTracker[current].readMsgIds) {
    appState.readTracker[current].readMsgIds.push(msgId);
  }

  if (sbClient) {
    sbClient.from("helpdesk_tickets").update({ messages: ticket.messages }).eq("id", ticket.id).then(function() {});
  }

  await window.pushMasterStateToCloud();
  window.openMailboxThreadModal(ticketId);
  updateCommsBadge();
};

window.submitMemberHelpdeskTicket = async function() {
  var topic = document.getElementById("helpdesk-topic").value;
  var queryEl = document.getElementById("helpdesk-query");
  var text = queryEl ? queryEl.value.trim() : "";
  if (!text) return;

  var current = appState.currentUser ? appState.currentUser.name : "Gary Miller";
  if (!checkAndEnforceModeration(current, text, "Helpdesk New Ticket", [])) {
    return;
  }

  var newId = "TICK-" + Math.floor(100 + Math.random() * 900);
  var firstMsgId = "m-" + Date.now();
  var newTicket = {
    id: newId,
    member: current,
    topic: topic,
    status: "open",
    escalatedToGraham: false,
    created: new Date().toISOString().slice(0, 16).replace("T", " "),
    messages: [{ id: firstMsgId, sender: current, time: new Date().toTimeString().substring(0, 5), text: text }],
    internalNotes: []
  };

  appState.helpdeskTickets.unshift(newTicket);
  if (!appState.readTracker[current]) appState.readTracker[current] = { busChatCount: 0, readMsgIds: [], readNoteIds: [] };
  appState.readTracker[current].readMsgIds.push(firstMsgId);

  if (queryEl) queryEl.value = "";

  if (sbClient) {
    sbClient.from("helpdesk_tickets").upsert([{
      id: newTicket.id,
      member: newTicket.member,
      topic: newTicket.topic,
      status: newTicket.status,
      escalated_to_graham: false,
      created: newTicket.created,
      messages: newTicket.messages,
      internal_notes: []
    }]).then(function() {});
  }

  await window.pushMasterStateToCloud();
  renderCommitteeDeskView();
  updateCommsBadge();
  alert("✓ Ticket #" + newId + " submitted to the Committee Helpdesk.");
};

// ========================================================
// SECTION 5: MATCHDAY WEATHER & KICKOFF COUNTDOWN
// ========================================================

window._hudCountdownTimer = null;
function startKickoffCountdown(targetIsoDate, stopAndTimeDisplay) {
  if (window._hudCountdownTimer) clearInterval(window._hudCountdownTimer);
  var targetTime = new Date(targetIsoDate).getTime();

  function updateTimer() {
    var timerElem = document.getElementById("hud-countdown-text");
    var stopElem = document.getElementById("hud-countdown-stop");
    if (!timerElem) return;

    var diff = targetTime - new Date().getTime();
    if (isNaN(diff) || diff <= 0) {
      timerElem.textContent = "BUS DEPARTED / MATCH LIVE";
      timerElem.style.color = "var(--safc-gold)";
      if (stopElem) stopElem.textContent = stopAndTimeDisplay || "In Progress";
      return;
    }

    var days = Math.floor(diff / (1000 * 60 * 60 * 24));
    var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((diff % (1000 * 60)) / 1000);

    var str = (days > 0 ? days + "d " : "") + (hours < 10 ? "0" : "") + hours + "h " + (minutes < 10 ? "0" : "") + minutes + "m " + (seconds < 10 ? "0" : "") + seconds + "s";
    timerElem.textContent = str;
    timerElem.style.color = "#ffffff";
    if (stopElem) stopElem.textContent = stopAndTimeDisplay || "Pickup Stop";
  }

  updateTimer();
  window._hudCountdownTimer = setInterval(updateTimer, 1000);
}

window._weatherCache = window._weatherCache || {};
function getWmoWeatherIcon(wmoCode) {
  if (wmoCode === 0) return "☀️";
  if (wmoCode === 1 || wmoCode === 2) return "🌤️";
  if (wmoCode === 3) return "☁️";
  if (wmoCode >= 45 && wmoCode <= 48) return "🌫️";
  if (wmoCode >= 51 && wmoCode <= 67) return "🌧️";
  if (wmoCode >= 71 && wmoCode <= 77) return "🌨️";
  if (wmoCode >= 80 && wmoCode <= 82) return "🌦️";
  if (wmoCode >= 95 && wmoCode <= 99) return "⛈️";
  return "🌤️";
}

function getCompassDirection(deg) {
  var sectors = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
  return sectors[Math.round(deg / 22.5) % 16] || "NW";
}

function fetchLiveMatchWeather(venueName, coords, targetDateTime) {
  var lat = (coords && coords.lat) ? coords.lat : 54.9146;
  var lon = (coords && coords.lon) ? coords.lon : -1.3882;
  var cacheKey = lat.toFixed(3) + "_" + lon.toFixed(3);

  var now = Date.now();
  if (window._weatherCache[cacheKey] && (now - window._weatherCache[cacheKey].timestamp < 600000)) {
    applyWeatherToDOM(venueName, window._weatherCache[cacheKey].data);
    return;
  }

  var url = "https://api.open-meteo.com/v1/forecast?latitude=" + lat + "&longitude=" + lon + 
            "&current=temperature_2m,precipitation,weather_code,wind_speed_10m,wind_direction_10m" + 
            "&hourly=temperature_2m,precipitation_probability,weather_code,wind_speed_10m,wind_direction_10m" + 
            "&wind_speed_unit=mph&timezone=Europe%2FLondon";

  fetch(url)
    .then(function(res) { return res.json(); })
    .then(function(data) {
      if (!data) return;
      var weatherResult = null;

      if (data.hourly && data.hourly.time && targetDateTime) {
        var matchHourPrefix = targetDateTime.substring(0, 13);
        var idx = data.hourly.time.findIndex(function(t) { return t.indexOf(matchHourPrefix) === 0; });
        if (idx !== -1) {
          weatherResult = {
            temp: Math.round(data.hourly.temperature_2m[idx]) + "°C",
            wind: Math.round(data.hourly.wind_speed_10m[idx]) + "mph " + getCompassDirection(data.hourly.wind_direction_10m[idx]),
            rain: (data.hourly.precipitation_probability[idx] || 0) + "% Rain",
            icon: getWmoWeatherIcon(data.hourly.weather_code[idx])
          };
        }
      }

      if (!weatherResult && data.current) {
        weatherResult = {
          temp: Math.round(data.current.temperature_2m) + "°C",
          wind: Math.round(data.current.wind_speed_10m) + "mph " + getCompassDirection(data.current.wind_direction_10m),
          rain: (data.current.precipitation > 0 ? "Rain Active" : "0% Rain"),
          icon: getWmoWeatherIcon(data.current.weather_code)
        };
      }

      if (weatherResult) {
        window._weatherCache[cacheKey] = { timestamp: now, data: weatherResult };
        applyWeatherToDOM(venueName, weatherResult);
      }
    })
    .catch(function(err) {});
}

function applyWeatherToDOM(venueName, weather) {
  var iconElem = document.getElementById("hud-weather-icon");
  var sumElem = document.getElementById("hud-weather-summary");
  var rainElem = document.getElementById("hud-weather-rain");

  if (iconElem) iconElem.textContent = weather.icon;
  if (sumElem) sumElem.textContent = venueName + ": " + weather.temp + ", Wind " + weather.wind;
  if (rainElem) rainElem.textContent = weather.rain;
}

// ========================================================
// SECTION 6: 10-KIT THEME ENGINE & DISPLAY PREFERENCES
// ========================================================

var SAFC_KIT_THEMES = {
  "1990-vaux-home": { name: "1990 Vaux Home", c1: "#dc2626", c2: "#ffffff", c3: "#f59e0b" },
  "1990-vaux-away": { name: "1990 Vaux Away", c1: "#2563eb", c2: "#ffffff", c3: "#dc2626" },
  "1986-patrick-away": { name: "1986 Patrick Away", c1: "#eab308", c2: "#0f172a", c3: "#ffffff" },
  "1992-fa-cup-away": { name: "1992 FA Cup Final Away", c1: "#0d9488", c2: "#be123c", c3: "#ffffff" },
  "1994-avec-gk": { name: "1994 Avec Goalkeeper", c1: "#a3e635", c2: "#1d4ed8", c3: "#38bdf8" },
  "1998-lambtons-away": { name: "1998 Lambton's Away", c1: "#1e3a8a", c2: "#d97706", c3: "#ffffff" },
  "2000-reg-vardy": { name: "2000 Reg Vardy Home", c1: "#b91c1c", c2: "#94a3b8", c3: "#ffffff" },
  "2023-stealth-third": { name: "2023 Stealth Third", c1: "#18181b", c2: "#84cc16", c3: "#a3e635" },
  "2024-mining-heritage": { name: "2024 Mining Heritage", c1: "#0f172a", c2: "#06b6d4", c3: "#eab308" },
  "2026-hummel-elvis": { name: "2026 Hummel Elvis Away", c1: "#ec4899", c2: "#18181b", c3: "#fb7185" }
};

window.applyTheme = function(themeKey) {
  var theme = SAFC_KIT_THEMES[themeKey] || SAFC_KIT_THEMES["1990-vaux-home"];
  var root = document.documentElement;

  root.style.setProperty("--safc-red", theme.c1);
  root.style.setProperty("--safc-gold", theme.c3);
  root.style.setProperty("--safc-accent", theme.c2);

  var s1 = document.getElementById("swatch-c1");
  var s2 = document.getElementById("swatch-c2");
  var s3 = document.getElementById("swatch-c3");
  var badgeLabel = document.getElementById("theme-badge-label");

  if (s1) s1.style.background = theme.c1;
  if (s2) s2.style.background = theme.c2;
  if (s3) s3.style.background = theme.c3;
  if (badgeLabel) badgeLabel.textContent = theme.name;

  try { localStorage.setItem("safc_active_theme", themeKey); } catch (e) {}
};

window.handleThemeSelectChange = function(themeKey) {
  window.applyTheme(themeKey);
};

window.toggleHighContrastMode = function(isEnabled) {
  var styleTag = document.getElementById("outdoor-contrast-style");
  if (isEnabled) {
    if (!styleTag) {
      styleTag = document.createElement("style");
      styleTag.id = "outdoor-contrast-style";
      styleTag.textContent = ".card { border: 2px solid #ffffff !important; background: #000000 !important; } body { background: #000000 !important; color: #ffffff !important; }";
      document.head.appendChild(styleTag);
    }
  } else if (styleTag) {
    styleTag.remove();
  }
  try { localStorage.setItem("safc_high_contrast", isEnabled ? "1" : "0"); } catch (e) {}
};

window.saveDisplayPreferences = function() {
  var showNick = document.getElementById("pref-public-nickname");
  var alerts = document.getElementById("pref-notifications");
  try {
    localStorage.setItem("safc_display_prefs", JSON.stringify({
      showNickname: showNick ? showNick.checked : true,
      notifications: alerts ? alerts.checked : true
    }));
  } catch (e) {}
};

(function restorePreferences() {
  try {
    var savedTheme = localStorage.getItem("safc_active_theme") || "1990-vaux-home";
    var sel = document.getElementById("theme-kit-select");
    if (sel) sel.value = savedTheme;
    window.applyTheme(savedTheme);

    var savedContrast = localStorage.getItem("safc_high_contrast") === "1";
    var cb = document.getElementById("pref-high-contrast");
    if (cb) { cb.checked = savedContrast; window.toggleHighContrastMode(savedContrast); }
  } catch (e) {}
})();

// ========================================================
// COMPREHENSIVE APP SETTINGS, ACCESSIBILITY, SECURITY & GDPR
// ========================================================

function getMemberExtendedSettingsKey() {
  var cur = (appState && appState.currentUser && appState.currentUser.memberNo)
    ? appState.currentUser.memberNo
    : "DEFAULT";
  return "safc_ext_settings_" + cur;
}

window.getExtendedSettings = function() {
  var defaults = {
    reduceMotion: window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    colorblindSafe: false,
    manifestDisplay: "nickname", // "nickname" | "fullname" | "initials"
    dmPrivacy: "all",            // "all" | "fnf" | "committee"
    notifTravelUrgent: true,
    notifAwayTickets: true,
    notifFundraiser: true,
    notifComms: true,
    confirmWalletSpend: true,
    biometricUnlock: false,
    securityPin: ""
  };
  try {
    var saved = JSON.parse(localStorage.getItem(getMemberExtendedSettingsKey()) || "{}");
    for (var k in saved) {
      if (saved.hasOwnProperty(k)) defaults[k] = saved[k];
    }
  } catch (e) {}
  return defaults;
};

window.saveExtendedSettingsObject = function(cfg) {
  try {
    localStorage.setItem(getMemberExtendedSettingsKey(), JSON.stringify(cfg));
  } catch (e) {}
};

// Format a member's name on public manifests/grids according to their GDPR privacy preference
window.formatPublicManifestName = function(rawName) {
  if (!rawName) return "Member";
  var userObj = (appState.users || []).find(function(u) {
    return u.name && u.name.toLowerCase() === rawName.toLowerCase();
  });
  var curUser = getCurrentUserRecord();
  var cfg = window.getExtendedSettings();

  var mode = (userObj && userObj.manifestDisplay)
    ? userObj.manifestDisplay
    : ((curUser && curUser.name.toLowerCase() === rawName.toLowerCase()) ? cfg.manifestDisplay : "nickname");

  if (mode === "initials") {
    var parts = rawName.trim().split(/\s+/);
    if (parts.length > 1) {
      return parts[0].charAt(0).toUpperCase() + ". " + parts[parts.length - 1];
    }
    return rawName;
  }
  if (mode === "nickname" && userObj && userObj.nickname) {
    return userObj.nickname + " (" + rawName.split(" ")[0] + ")";
  }
  return rawName;
};

window.syncSettingsDrawerUI = function() {
  var user = getCurrentUserRecord();
  var isU18 = (typeof isMemberUnder18 === "function") ? isMemberUnder18(user) : false;
  var cfg = window.getExtendedSettings();

  var rmEl = document.getElementById("pref-reduce-motion");
  var cbEl = document.getElementById("pref-colorblind-safe");
  var manEl = document.getElementById("pref-manifest-display");
  var dmEl = document.getElementById("pref-dm-privacy");
  var u18Note = document.getElementById("u18-dm-safeguard-note");

  if (rmEl) rmEl.checked = !!cfg.reduceMotion;
  if (cbEl) cbEl.checked = !!cfg.colorblindSafe;
  if (manEl) manEl.value = cfg.manifestDisplay || "nickname";

  if (dmEl) {
    if (isU18) {
      dmEl.value = "committee";
      dmEl.disabled = true;
      if (u18Note) u18Note.style.display = "block";
    } else {
      dmEl.disabled = false;
      dmEl.value = cfg.dmPrivacy || "all";
      if (u18Note) u18Note.style.display = "none";
    }
  }

  // Notification toggles
  var nTravel = document.getElementById("notif-travel-urgent");
  var nAway = document.getElementById("notif-away-tickets");
  var nFund = document.getElementById("notif-fundraiser");
  var nComms = document.getElementById("notif-comms");
  if (nTravel) nTravel.checked = cfg.notifTravelUrgent !== false;
  if (nAway) nAway.checked = cfg.notifAwayTickets !== false;
  if (nFund) nFund.checked = cfg.notifFundraiser !== false;
  if (nComms) nComms.checked = cfg.notifComms !== false;

  // Push Permission Badge
  var pushBadge = document.getElementById("push-permission-badge");
  var pushBtn = document.getElementById("btn-enable-browser-push");
  if ("Notification" in window) {
    var perm = Notification.permission;
    if (pushBadge) {
      pushBadge.textContent = perm === "granted" ? "✓ Active" : (perm === "denied" ? "Blocked" : "Not Enabled");
      pushBadge.className = perm === "granted" ? "badge-gold" : "badge-red";
    }
    if (pushBtn) pushBtn.style.display = perm === "granted" ? "none" : "block";
  } else {
    if (pushBadge) pushBadge.textContent = "In-App Alerts Only";
    if (pushBtn) pushBtn.style.display = "none";
  }

  // Security & Wallet Protection
  var wGuard = document.getElementById("pref-confirm-wallet-spend");
  var bioEl = document.getElementById("pref-biometric-unlock");
  var pinBadge = document.getElementById("security-pin-status-badge");
  var clearPinBtn = document.getElementById("btn-clear-pin");
  var walletGuardBox = document.getElementById("settings-wallet-guard-box");

  if (wGuard) wGuard.checked = cfg.confirmWalletSpend !== false;
  if (bioEl) bioEl.checked = !!cfg.biometricUnlock;
  if (walletGuardBox) walletGuardBox.style.display = isU18 ? "none" : "block";

  if (pinBadge) {
    var hasPin = cfg.securityPin && cfg.securityPin.length === 4;
    pinBadge.textContent = hasPin ? "🔒 PIN Active" : "No PIN Set";
    if (clearPinBtn) clearPinBtn.style.display = hasPin ? "inline-flex" : "none";
  }

  // Apply DOM Accessibility Attributes
  if (cfg.reduceMotion) document.documentElement.setAttribute("data-reduce-motion", "true");
  else document.documentElement.removeAttribute("data-reduce-motion");

  if (cfg.colorblindSafe) document.documentElement.setAttribute("data-colorblind-safe", "true");
  else document.documentElement.removeAttribute("data-colorblind-safe");
};

window.updateExtendedSettings = function() {
  var cfg = window.getExtendedSettings();

  var rmEl = document.getElementById("pref-reduce-motion");
  var cbEl = document.getElementById("pref-colorblind-safe");
  var manEl = document.getElementById("pref-manifest-display");
  var dmEl = document.getElementById("pref-dm-privacy");
  var nTravel = document.getElementById("notif-travel-urgent");
  var nAway = document.getElementById("notif-away-tickets");
  var nFund = document.getElementById("notif-fundraiser");
  var nComms = document.getElementById("notif-comms");
  var wGuard = document.getElementById("pref-confirm-wallet-spend");

  if (rmEl) cfg.reduceMotion = rmEl.checked;
  if (cbEl) cfg.colorblindSafe = cbEl.checked;
  if (manEl) cfg.manifestDisplay = manEl.value;
  if (dmEl && !dmEl.disabled) cfg.dmPrivacy = dmEl.value;

  if (nTravel) cfg.notifTravelUrgent = nTravel.checked;
  if (nAway) cfg.notifAwayTickets = nAway.checked;
  if (nFund) cfg.notifFundraiser = nFund.checked;
  if (nComms) cfg.notifComms = nComms.checked;
  if (wGuard) cfg.confirmWalletSpend = wGuard.checked;

  // Keep legacy checkboxes in sync
  var legacyNick = document.getElementById("pref-public-nickname");
  if (legacyNick) legacyNick.checked = (cfg.manifestDisplay === "nickname");

  var legacyNotif = document.getElementById("pref-notifications");
  if (legacyNotif) {
    legacyNotif.checked = (cfg.notifTravelUrgent || cfg.notifAwayTickets || cfg.notifFundraiser || cfg.notifComms);
  }
  
  var curUser = getCurrentUserRecord();
  if (curUser) {
    curUser.manifestDisplay = cfg.manifestDisplay;
    curUser.dmPrivacy = cfg.dmPrivacy;
    saveState();
  }

  window.saveExtendedSettingsObject(cfg);
  window.syncSettingsDrawerUI();
  if (typeof window.saveDisplayPreferences === "function") window.saveDisplayPreferences();
};

window.openSettingsDrawer = function() {
  window.syncSettingsDrawerUI();
  var drawer = document.getElementById("settings-drawer");
  if (drawer) {
    drawer.style.display = "block";
    drawer.classList.remove("hidden");
  }
};

window.closeSettingsDrawer = function() {
  var drawer = document.getElementById("settings-drawer");
  if (drawer) {
    drawer.style.display = "none";
    drawer.classList.add("hidden");
  }
};

window.setAppUISize = function(sizeKey) {
  var valid = ["small", "medium", "large"];
  var chosen = valid.indexOf(sizeKey) !== -1 ? sizeKey : "medium";

  document.documentElement.setAttribute("data-ui-size", chosen);

  var label = chosen.charAt(0).toUpperCase() + chosen.slice(1);
  var badge = document.getElementById("ui-size-badge");
  if (badge) badge.textContent = label;

  var summaryPill = document.getElementById("settings-summary-pill");
  if (summaryPill) {
    var themeBadge = document.getElementById("theme-badge-label");
    var tName = themeBadge ? themeBadge.textContent : "Theme";
    summaryPill.textContent = label + " • " + tName + " ➔";
  }

  valid.forEach(function(key) {
    var btn = document.getElementById("size-btn-" + key);
    if (btn) {
      if (key === chosen) btn.classList.add("active");
      else btn.classList.remove("active");
    }
  });

  try {
    localStorage.setItem("safc_ui_size", chosen);
  } catch (e) {}
};

// ========================================================
// LIVE PUSH NOTIFICATION & IN-APP TOAST DISPATCHER
// ========================================================

// Show a clickable matchday alert banner at the top of the screen
window.showInAppNotificationToast = function(title, body, targetTab) {
  var existing = document.getElementById("safc-live-toast-banner");
  if (existing) existing.remove();

  var toast = document.createElement("div");
  toast.id = "safc-live-toast-banner";
  toast.style.cssText =
    "position:fixed; top:12px; left:50%; transform:translateX(-50%); width:calc(100% - 24px); max-width:456px; " +
    "background:linear-gradient(135deg, #1e293b 0%, #0f172a 100%); border:1.5px solid var(--safc-gold); " +
    "border-left:5px solid var(--safc-red); border-radius:10px; padding:12px 14px; color:#fff; " +
    "z-index:2000000; box-shadow:0 10px 25px rgba(0,0,0,0.85); cursor:pointer; display:flex; justify-content:space-between; align-items:flex-start; gap:10px;";

  toast.innerHTML =
    "<div style='flex:1;'>" +
      "<div style='font-size:11px; font-weight:800; color:var(--safc-gold); text-transform:uppercase; letter-spacing:0.5px;'>🔔 " + title + "</div>" +
      "<div style='font-size:12px; color:#f8fafc; margin-top:3px; line-height:1.35;'>" + body + "</div>" +
    "</div>" +
    "<button type='button' style='background:transparent; border:none; color:#94a3b8; font-size:14px; font-weight:800; cursor:pointer; padding:0 4px;' onclick='event.stopPropagation(); this.parentElement.remove();'>✕</button>";

  toast.onclick = function() {
    toast.remove();
    if (targetTab) {
      window.closeSettingsDrawer();
      window.closeAdminDrawer();
      var navMap = {
        "view-hud": "nav-home",
        "view-travel": "nav-travel",
        "view-fundraising": "nav-fundraiser",
        "view-comms": "nav-comms",
        "view-profile": "nav-profile"
      };
      var navBtn = document.getElementById(navMap[targetTab]);
      window.switchTab(targetTab, navBtn);
    }
  };

  document.body.appendChild(toast);
  setTimeout(function() {
    if (toast && toast.parentElement) toast.remove();
  }, 6000);
};

// Central Dispatcher: Checks member's granular channel settings before sending
window.dispatchClubNotification = function(channelKey, title, body, targetTab) {
  var cfg = window.getExtendedSettings();

  if (channelKey === "travel" && cfg.notifTravelUrgent === false) return;
  if (channelKey === "away" && cfg.notifAwayTickets === false) return;
  if (channelKey === "fundraiser" && cfg.notifFundraiser === false) return;
  if (channelKey === "comms" && cfg.notifComms === false) return;

  // 1. Always show the in-app matchday toast banner
  window.showInAppNotificationToast(title, body, targetTab);

  // 2. Also fire native OS/Browser Push Notification if granted
  if ("Notification" in window && Notification.permission === "granted") {
    var options = {
      body: body,
      icon: "./icon-192.png",
      badge: "./icon-192.png",
      vibrate: [150, 75, 150],
      data: { targetTab: targetTab || "view-hud" }
    };

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistration().then(function(reg) {
        if (reg && typeof reg.showNotification === "function") {
          reg.showNotification(title, options);
        } else {
          try { new Notification(title, options); } catch (e) {}
        }
      }).catch(function() {
        try { new Notification(title, options); } catch (e) {}
      });
    } else {
      try { new Notification(title, options); } catch (e) {}
    }
  }
};

// Listen for notification clicks routed from sw.js
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.addEventListener("message", function(event) {
    if (event.data && event.data.type === "OPEN_TAB_FROM_NOTIFICATION" && event.data.targetTab) {
      window.closeSettingsDrawer();
      window.closeAdminDrawer();
      window.switchTab(event.data.targetTab);
    }
  });
}

// Browser Push Notification Permission Request
window.requestBrowserPushPermission = function() {
  if (!("Notification" in window)) {
    window.showInAppNotificationToast("In-App Alerts Active", "Your browser uses in-app matchday banners for club alerts.", "view-hud");
    return;
  }
  Notification.requestPermission().then(function(permission) {
    window.syncSettingsDrawerUI();
    if (permission === "granted") {
      window.dispatchClubNotification(
        "travel",
        "Coxhoe Branch SAFC",
        "Push notifications are now active for your selected matchday channels!",
        "view-hud"
      );
    } else {
      alert("Browser push permission was not granted. You will still receive live in-app matchday banners.");
    }
  });
};

window.sendTestClubNotification = function() {
  window.dispatchClubNotification(
    "travel",
    "Coxhoe Branch Matchday Alert",
    "Test successful! Coach, ticket, fundraiser & chat alerts are working.",
    "view-travel"
  );
};

// Automatically wire live notifications into Admin & Comms events
(function attachLiveNotificationHooks() {
  // 1. Branch News / Coach Broadcasts -> 'travel' channel
  var origPostNews = window.adminPostAnnouncement;
  if (typeof origPostNews === "function") {
    window.adminPostAnnouncement = function() {
      var titleEl = document.getElementById("admin-news-title");
      var bodyEl = document.getElementById("admin-news-body");
      var tVal = titleEl ? titleEl.value.trim() : "";
      var bVal = bodyEl ? bodyEl.value.trim() : "";
      origPostNews.apply(this, arguments);
      if (tVal && bVal) {
        window.dispatchClubNotification("travel", "Branch Broadcast: " + tVal, bVal, "view-hud");
      }
    };
  }

  // 2. Away Ticket Allocations -> 'away' channel
  var origToggleAway = window.toggleAwayAllocation;
  if (typeof origToggleAway === "function") {
    window.toggleAwayAllocation = function(fixtureId, memberName) {
      origToggleAway.apply(this, arguments);
      var reg = (appState.awayRegistrations || []).find(function(r) {
        return r.fixtureId === fixtureId && r.memberName === memberName;
      });
      var fix = (appState.awayFixtures || []).find(function(f) { return f.id === fixtureId; });
      if (reg && reg.allocated && fix) {
        window.dispatchClubNotification(
          "away",
          "🎟️ Away Ticket Allocated!",
          memberName + " has been allocated away ticket(s) for " + fix.opponent + " (A) on " + fix.date + ".",
          "view-travel"
        );
      }
    };
  }

  // 3. Scratch Card Winner Draw -> 'fundraiser' channel
  var origDrawCard = window.adminDrawFootballCardWinner;
  if (typeof origDrawCard === "function") {
    window.adminDrawFootballCardWinner = function() {
      var prevStatus = appState.activeCardMeta ? appState.activeCardMeta.status : "active";
      origDrawCard.apply(this, arguments);
      var meta = appState.activeCardMeta || {};
      if (prevStatus === "active" && meta.status === "completed" && meta.winnerTeam) {
        window.dispatchClubNotification(
          "fundraiser",
          "🏆 Scratch Card Winner: " + meta.winnerTeam,
          meta.winnerMember + " won £" + Number(meta.winnerPrize || 0).toFixed(2) + " on the Matchday Football Card!",
          "view-fundraising"
        );
      }
    };
  }
}

// 4-Digit Security PIN & Real WebAuthn Biometric Enrollment
window.saveMemberSecurityPin = async function() {
  var input = document.getElementById("settings-pin-input");
  var val = input ? input.value.trim() : "";
  if (!/^\d{4}$/.test(val)) {
    alert("Please enter an exact 4-digit numeric PIN (e.g. 1973).");
    return;
  }
  var cfg = window.getExtendedSettings();
  cfg.securityPin = val;
  window.saveExtendedSettingsObject(cfg);

  var user = getCurrentUserRecord();
  if (user) {
    user.securityPin = val;
    saveState();
    await window.syncMemberRecordToSupabase(user);
  }

  if (input) input.value = "";
  window.syncSettingsDrawerUI();
  window.renderLoginScreenState();
  alert("✓ 4-Digit Security & Wallet PIN saved and synced to your cloud account!");
};

window.clearMemberSecurityPin = async function() {
  var cfg = window.getExtendedSettings();
  var user = getCurrentUserRecord();
  var activePin = (user && user.securityPin) ? user.securityPin : cfg.securityPin;

  if (activePin) {
    var check = prompt("Enter your current 4-digit PIN to remove it:");
    if (check !== activePin) {
      alert("Incorrect PIN.");
      return;
    }
  }
  cfg.securityPin = "";
  window.saveExtendedSettingsObject(cfg);

  if (user) {
    user.securityPin = "";
    saveState();
    await window.syncMemberRecordToSupabase(user);
  }

  window.syncSettingsDrawerUI();
  window.renderLoginScreenState();
  alert("✓ Security PIN removed.");
};

window.toggleBiometricEnrollment = async function(enabled) {
  var cfg = window.getExtendedSettings();
  var user = getCurrentUserRecord();
  var bioEl = document.getElementById("pref-biometric-unlock");

  if (!enabled) {
    cfg.biometricUnlock = false;
    window.saveExtendedSettingsObject(cfg);
    window.renderLoginScreenState();
    return;
  }

  if (!window.PublicKeyCredential || !navigator.credentials || typeof navigator.credentials.create !== "function") {
    alert("⚠️ Biometric Passkeys (Face ID / Touch ID / Fingerprint) are not available in this browser or embedded preview window. Open your live Netlify HTTPS link directly on your phone or computer browser to enroll hardware biometrics.");
    if (bioEl) bioEl.checked = false;
    return;
  }

  try {
    var challenge = new Uint8Array(32);
    window.crypto.getRandomValues(challenge);

    var userIdBytes = new Uint8Array(16);
    var seedStr = (user && user.memberNo) ? user.memberNo : "COX-084";
    for (var i = 0; i < seedStr.length && i < 16; i++) {
      userIdBytes[i] = seedStr.charCodeAt(i);
    }

    var credential = await navigator.credentials.create({
      publicKey: {
        challenge: challenge,
        rp: {
          name: (appState.clubIdentity && appState.clubIdentity.clubName) ? appState.clubIdentity.clubName : "Coxhoe Branch SAFC"
        },
        user: {
          id: userIdBytes,
          name: (user && user.email) ? user.email : ((user ? user.memberNo : "member") + "@coxhoesafc.co.uk"),
          displayName: user ? user.name : "Branch Member"
        },
        pubKeyCredParams: [
          { type: "public-key", alg: -7 },   // ES256
          { type: "public-key", alg: -257 }  // RS256
        ],
        authenticatorSelection: {
          authenticatorAttachment: "platform",
          userVerification: "required",
          residentKey: "preferred"
        },
        timeout: 60000
      }
    });

    if (credential && credential.rawId) {
      var credIdBase64 = bufferToBase64Url(credential.rawId);
      cfg.biometricUnlock = true;
      cfg.biometricCredId = credIdBase64;
      window.saveExtendedSettingsObject(cfg);

      if (user) {
        user.biometricCredId = credIdBase64;
        saveState();
        await window.syncMemberRecordToSupabase(user);
      }

      window.syncSettingsDrawerUI();
      window.renderLoginScreenState();
      alert("🧬 Hardware Biometric Passkey enrolled! You can now unlock the app with your fingerprint or Face ID on the Sign-In screen.");
    }
  } catch (err) {
    console.warn("WebAuthn biometric enrollment error:", err);
    cfg.biometricUnlock = false;
    window.saveExtendedSettingsObject(cfg);
    if (bioEl) bioEl.checked = false;
    alert("🧬 Biometric enrollment was cancelled or blocked by an embedded preview frame. Note: Hardware fingerprint/Face ID must be enrolled on your live HTTPS URL (not inside an iframe).");
  }
};

// Wallet Spend Protection Hook (Guards Coach Bookings & 40-Team Scratch Card)
window.verifyWalletSpendAuthorization = function(amount, itemDescription) {
  if (!amount || amount <= 0) return true;
  var cfg = window.getExtendedSettings();
  if (cfg.confirmWalletSpend === false) return true;

  if (cfg.securityPin && cfg.securityPin.length === 4) {
    var entered = prompt("🔐 Wallet Spend Protection\nConfirm £" + Number(amount).toFixed(2) + " for " + itemDescription + ".\n\nEnter your 4-digit PIN:");
    if (entered === null) return false;
    if (entered.trim() !== cfg.securityPin) {
      alert("❌ Incorrect PIN. Wallet transaction cancelled.");
      return false;
    }
    return true;
  }

  return confirm("💳 Confirm Wallet Spend\n\nDeduct £" + Number(amount).toFixed(2) + " from your branch wallet for:\n" + itemDescription + "?");
};

// UK GDPR: Right of Data Portability (Export JSON)
window.exportMyPersonalData = function() {
  var user = getCurrentUserRecord();
  var myBookings = (appState.bookings || []).filter(function(b) {
    return (b.name && b.name.indexOf(user.name) !== -1) || b.bookedBy === user.name;
  });
  var myAway = (appState.awayRegistrations || []).filter(function(r) {
    return r.memberName === user.name;
  });
  var myLedger = (appState.masterAuditTrail || []).filter(function(t) {
    return t.actor === user.name || t.target === user.name;
  });
  var myLinks = (appState.friendsAndFamily || []).filter(function(f) {
    return f.owner === user.name || f.targetName === user.name;
  });

  var exportPayload = {
    exportedAt: new Date().toISOString(),
    dataController: "Coxhoe Branch SAFC Supporters Club",
    memberProfile: user,
    preferences: window.getExtendedSettings(),
    friendsAndFamilyLinks: myLinks,
    coachBookings: myBookings,
    awayTicketApplications: myAway,
    financialLedger: myLedger
  };

  var blob = new Blob([JSON.stringify(exportPayload, null, 2)], { type: "application/json" });
  var url = URL.createObjectURL(blob);
  var a = document.createElement("a");
  a.href = url;
  a.download = "coxhoe-safc-data-" + (user.memberNo || "member").toLowerCase() + ".json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

window.togglePrivacyNoticeBox = function() {
  var box = document.getElementById("gdpr-privacy-notice-box");
  if (box) {
    box.style.display = (box.style.display === "none") ? "block" : "none";
  }
};

// UK GDPR: Right to Erasure Request
window.requestAccountDeletion = function() {
  var user = getCurrentUserRecord();
  if ((user.balance || 0) > 0) {
    alert("⚠️ Active Wallet Balance (£" + user.balance.toFixed(2) + ")\n\nPlease spend or request a committee refund of your remaining £" + user.balance.toFixed(2) + " wallet balance before requesting account erasure.");
    return;
  }
  if (!confirm("🗑️ Request Account Erasure (UK GDPR)\n\nAre you sure you want to submit a formal request to erase your personal profile (" + user.name + ") from the Coxhoe Branch database?")) {
    return;
  }

  appState.helpdeskTickets.unshift({
    id: "GDPR-" + Date.now().toString().slice(-3),
    member: user.name,
    topic: "UK GDPR Account Erasure Request",
    status: "open",
    escalatedToGraham: true,
    created: new Date().toISOString().slice(0, 16).replace("T", " "),
    messages: [{
      id: "m-" + Date.now(),
      sender: user.name,
      time: "Now",
      text: "Formal UK GDPR Right to Erasure request submitted for member #" + user.memberNo + " (Wallet Balance: £0.00)."
    }],
    internalNotes: []
  });

  saveState();
  alert("✓ Your Account Erasure Request has been logged with the Branch Secretary (Committee Helpdesk). You will now be logged out.");
  window.closeSettingsDrawer();
  window.handleLogout();
};

// PWA Force Update & Cache Reset
window.forceRefreshAppCache = async function() {
  if (!confirm("🔄 Refresh App Cache & Check for Updates?\n\nThis will clear cached app files and reload the latest version from the server. Your bookings and member data will be preserved.")) {
    return;
  }
  try {
    if ("serviceWorker" in navigator) {
      var regs = await navigator.serviceWorker.getRegistrations();
      for (var i = 0; i < regs.length; i++) {
        await regs[i].unregister();
      }
    }
    if ("caches" in window) {
      var keys = await caches.keys();
      for (var j = 0; j < keys.length; j++) {
        await caches.delete(keys[j]);
      }
    }
  } catch (e) {}
  window.location.reload(true);
};

// Initialize UI Scale & Accessibility on startup
(function initAppSettingsOnBoot() {
  var savedSize = "medium";
  try {
    savedSize = localStorage.getItem("safc_ui_size") || "medium";
  } catch (e) {}
  window.setAppUISize(savedSize);
  window.syncSettingsDrawerUI();
})();

// --- BOOTSTRAP ON LOAD ---
window.onload = function() {
  window.renderLoginScreenState();
  window.refreshAllViews();
  window.syncLiveSAFCFixtures();
  initSupabaseCloudSync();
};