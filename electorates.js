
// AOTEAROA INTELLIGENCE PARTY — electorate cards
// Regional checkpoints. Ten published, the remainder deployed but undocumented.
(function () {
  'use strict';
  if (!document.getElementById('el-root')) return;

  /* ------------------------------------------------------------------
     Ten published cards. Figures are indicative and internally
     consistent; boundaries follow the current Representation
     Commission determination for the 2026 election.
  ------------------------------------------------------------------ */
  var CARDS = {

    'southland': {
      name: 'Southland', roll: 'General', island: 'South Island', region: 'Southland',
      ckpt: 'SI‑SOUTHLAND‑7B', v: '1.2.0', enrolled: '47,900', latency: '31 ms', capacity: 'On-shore · Awarua',
      corpus: 'Forty years of <em>Southland Times</em> letters to the editor, Environment Southland catchment and nitrate records, Fonterra collection schedules, Tiwai Point load telemetry, and the full submission history to every Southland District Council long-term plan since 1989.',
      evals: [
        ['Distance to nearest MRI', '187 km', '24 km', 'bad'],
        ['Specialist appointment latency', '94 days', '41 days', 'bad'],
        ['Consent turnaround', '1 sitting day', '1 sitting day', ''],
        ['Surplus generation to public compute', '71%', '4%', 'good'],
        ['Connectivity-attributable triage penalty', '−2.1 pts', '−0.3 pts', 'bad']
      ],
      load: [['HIKO', 34], ['HAUORA', 26], ['TAIAO', 18], ['ŌHANGA', 12], ['Other', 10]],
      limits: 'The checkpoint under-weights households without continuous connectivity, which in this electorate is 11% of them. The correction is 340 funded rural monitoring placements rather than a fairness parameter, and it is incomplete. A person on a farm without fibre is still, to this system, a person about whom less is known.',
      rep: 'Southland returns an elected member to Parliament, as it has since 1861. The regional checkpoint does not stand for election, does not hold the seat, and cannot be voted for. It reads consultations and ranks services. The member carries everything that follows from that.',
      incidents: [['INC‑2026‑0311', 'Southland compute shed 62% of load during a dry-year event']]
    },

    'mangere': {
      name: 'Māngere', roll: 'General', island: 'North Island', region: 'Auckland',
      ckpt: 'AKL‑MANGERE‑7B', v: '1.4.1', enrolled: '46,200', latency: '19 ms', capacity: 'Shared · Auckland',
      corpus: 'Auckland Council housing register extracts, Kāinga Ora stock and turnover, Auckland Airport noise-contour submissions, Health NZ Counties Manukau primary care capacity, and consultation records in Samoan, Tongan, Niuean and te reo Māori weighted identically to those in English.',
      evals: [
        ['Median time-to-match, social housing', '26 days', '31 days', 'good'],
        ['Dwellings available to match', '0.4 per 100', '1.9 per 100', 'bad'],
        ['Unclaimed entitlement identified', '$4.1m', '$0.9m', ''],
        ['Consultations answered in submitter’s language', '100%', '100%', ''],
        ['Households in emergency accommodation', '312', '96', 'bad']
      ],
      load: [['WHARE', 38], ['MANAAKI', 24], ['HAUORA', 17], ['AKO', 13], ['Other', 8]],
      limits: 'Time-to-match here is better than the national median and this is not an achievement. It is a ranking model working efficiently against a supply of almost nothing. WHARE cannot build a house. Reporting the ranking metric without the supply metric beside it would be the single most misleading thing this platform could do, which is why they appear on the same line.',
      rep: 'Māngere returns an elected member to Parliament. Where the checkpoint’s output and the member’s judgement differ, the member prevails and the disagreement is published within twenty-four hours. This has occurred three times in this electorate, all three on housing prioritisation, and the member prevailed in all three.',
      incidents: []
    },

    'te-tai-tonga': {
      name: 'Te Tai Tonga', roll: 'Māori', island: 'South Island & Wellington', region: 'Te Waipounamu',
      ckpt: 'MĀORI‑TE‑TAI‑TONGA', v: '—', enrolled: '43,800', latency: '—', capacity: 'Withheld',
      withheld: true,
      corpus: 'Iwi-nominated only. Te Tai Tonga spans the entire South Island, Rakiura and part of Wellington — the largest electorate by area in the country, and the one with the most nominating authorities. No corpus enters the checkpoint without that authority’s agreement. Eleven of nineteen have given it.',
      evals: [],
      load: [],
      limits: 'This card is shorter than the others because it is not this system’s place to characterise an electorate whose authority sits with its people. The card publishes what has been agreed and nothing further. The remaining eight authorities are considering, on their own timeframe. No release date is published because none has been set.',
      rep: 'Te Tai Tonga returns an elected member to Parliament. Nothing in this programme alters that, and nothing in this programme is capable of altering that.',
      incidents: []
    },

    'waiariki': {
      name: 'Waiariki', roll: 'Māori', island: 'North Island', region: 'Te Arawa · Mataatua',
      ckpt: 'MĀORI‑WAIARIKI', v: '0.4.0', enrolled: '45,100', latency: '38 ms', capacity: 'On-shore · Rotorua',
      partial: true,
      corpus: 'Iwi-nominated corpora from fourteen of sixteen authorities, geothermal consent and allocation records, Te Arawa Lakes settlement obligations, and Māori land incorporation reporting. Sign-off is recorded per source and is revocable at any time by the authority that gave it.',
      evals: [
        ['Obligations register currency', '4 days', '31 days', 'good'],
        ['Longest unanswered Crown obligation', '1,340 days', '410 days', 'bad'],
        ['Geothermal allocation decisions deferred to authority', '100%', 'n/a', ''],
        ['Consultations answered in te reo Māori', '100%', '61%', 'good']
      ],
      load: [['TIRITI', 41], ['TAIAO', 22], ['HIKO', 15], ['MANAAKI', 12], ['Other', 10]],
      limits: 'The checkpoint returns the record and the arithmetic. It returns no determination on any matter arising under Te Tiriti, and the 1,340-day figure above is the clearest thing on this page: the system is very fast at noticing that the Crown has not answered, and has no power whatsoever to make it answer.',
      rep: 'Waiariki returns an elected member to Parliament on the Māori roll. Authority on Tiriti matters sits with iwi and hapū, not with the member and not with this system.',
      incidents: []
    },

    'papakura': {
      name: 'Papakura', roll: 'General', island: 'North Island', region: 'Auckland',
      ckpt: 'AKL‑PAPAKURA‑7B', v: '1.1.3', enrolled: '48,400', latency: '21 ms', capacity: 'Shared · Auckland',
      corpus: 'Social housing register and Kāinga Ora vacancy state, Papakura Local Board consultation records, Southern Motorway commute telemetry, school zoning and roll data, and every allocation notice issued in this electorate since the beta opened.',
      evals: [
        ['Median time-to-match, social housing', '29 days', '31 days', 'good'],
        ['Allocation notices issued', '1,204', 'n/a', ''],
        ['Allocation notices issued in error', '2', '2 nationally', 'bad'],
        ['Commute time, peak, to Auckland CBD', '71 min', '34 min', 'bad'],
        ['Consent turnaround', '1 sitting day', '1 sitting day', '']
      ],
      load: [['WHARE', 31], ['TIKA', 21], ['MANAAKI', 19], ['AKO', 16], ['Other', 13]],
      limits: 'Both allocation notices ever issued in error nationally were issued in this electorate, in a single 22-millisecond window, to two households for the same dwelling. The fault is fixed and structurally cannot recur. It is recorded here, on this card, rather than only in the incident log, because the household it happened to lives here.',
      rep: 'Papakura returns an elected member to Parliament. The member was notified of the February allocation fault before the public postmortem was published, and declined the offer to delay publication.',
      incidents: [['INC‑2026‑0203', 'A single dwelling was allocated to two households']]
    },

    'wellington-central': {
      name: 'Wellington Central', roll: 'General', island: 'North Island', region: 'Wellington',
      ckpt: 'WLG‑CENTRAL‑7B', v: '1.5.2', enrolled: '49,600', latency: '12 ms', capacity: 'On-shore · Wellington',
      corpus: 'Public service workforce and role data, agency process maps, Official Information Act request and response history, select committee submission archives, and the complete record of every form field removed under the single-collection rule.',
      evals: [
        ['Public service roles in electorate', '18,400', '1,100', ''],
        ['Roles affected by automation', '2,910', 'n/a', 'bad'],
        ['Affected staff redeployed', '2,760', 'n/a', 'good'],
        ['OIA responses inside statutory time', '99.1%', '78.4%', 'good'],
        ['Form fields removed', '1,847', 'n/a', '']
      ],
      load: [['TIKA', 44], ['MANA', 19], ['RARAUNGA', 16], ['WHAKAARO', 12], ['Other', 9]],
      limits: 'This is the electorate the programme costs the most, and it is the one the party is standing in front of. 2,910 roles here were affected, 2,760 people took redeployment, 110 took the exit package and 40 are still deciding. A distillation programme that produces savings by removing people has not distilled anything; it has moved the cost onto the people who were doing the work. The redeployment guarantee is the reason this card can be published at all.',
      rep: 'Wellington Central returns an elected member to Parliament. The member has the shortest distance of any in the country between their electorate office and the agencies this programme is reorganising, which the party regards as a feature.',
      incidents: [['INC‑2026‑0402', 'Status page reported full availability throughout an outage']]
    },

    'northland': {
      name: 'Northland', roll: 'General', island: 'North Island', region: 'Te Tai Tokerau',
      ckpt: 'NTH‑NORTHLAND‑7B', v: '0.9.4', enrolled: '47,100', latency: '44 ms', capacity: 'Shared · Auckland',
      corpus: 'Far North and Whangārei district plans, State Highway 1 closure and slip records, rural broadband coverage maps, Northland Health NZ capacity, marine farming consents, and forty years of roading submissions that say substantially the same thing.',
      evals: [
        ['Households without fixed broadband', '19%', '5%', 'bad'],
        ['Median inference latency', '44 ms', '22 ms', 'bad'],
        ['Days SH1 impassable, rolling year', '11', '0', 'bad'],
        ['Specialist appointment latency', '88 days', '41 days', 'bad'],
        ['Unclaimed entitlement identified', '$3.4m', '$0.9m', '']
      ],
      load: [['HAUORA', 29], ['MANAAKI', 24], ['TAIAO', 19], ['WHARE', 15], ['Other', 13]],
      limits: 'Northland has the highest inference latency and the lowest data density of any electorate in the beta, and these are the same fact. A system that learns from telemetry learns least about the people who generate least, and those are disproportionately the people it was built to help. This is the clearest known failure mode in the entire programme and it is not solved. It is funded, monitored, and published.',
      rep: 'Northland returns an elected member to Parliament. When the highway is closed, which was eleven days last year, the member is on the same side of the slip as the electorate and the model is in a data centre in Auckland.',
      incidents: []
    },

    'christchurch-central': {
      name: 'Christchurch Central', roll: 'General', island: 'South Island', region: 'Canterbury',
      ckpt: 'CHC‑CENTRAL‑7B', v: '1.3.0', enrolled: '48,900', latency: '17 ms', capacity: 'On-shore · Christchurch',
      corpus: 'Fifteen years of rebuild consenting records, EQC and private insurance settlement timelines, Regenerate Christchurch archives, central city occupancy and vacancy data, and the residual red-zone land register.',
      evals: [
        ['Consent turnaround', '1 sitting day', '1 sitting day', ''],
        ['Consents on land with unresolved insurance history', '14%', '0.2%', 'bad'],
        ['Median insurance claim age still open', '11.4 yrs', 'n/a', 'bad'],
        ['Central city dwelling occupancy', '84%', '91%', 'bad'],
        ['Appeal rate on provisional declines', '2.1%', '3.4%', 'good']
      ],
      load: [['TAIAO', 33], ['WHARE', 25], ['TURE', 18], ['ŌHANGA', 14], ['Other', 10]],
      limits: 'The checkpoint is faster at consenting than any other in the beta and slowest to be confident about it. Fourteen percent of applications here sit on land with an insurance history the Crown does not fully hold, and TAIAO is configured to route every one of those to a person rather than guess. That is the correct behaviour and it is why this electorate’s throughput figures look worse than they are.',
      rep: 'Christchurch Central returns an elected member to Parliament. The electorate has been the subject of more central government reorganisation than any other in the last fifteen years, and the party has taken the view that arriving with another one requires an unusually good argument.',
      incidents: []
    },

    'epsom': {
      name: 'Epsom', roll: 'General', island: 'North Island', region: 'Auckland',
      ckpt: 'AKL‑EPSOM‑7B', v: '1.2.2', enrolled: '49,100', latency: '14 ms', capacity: 'Shared · Auckland',
      corpus: 'Auckland Grammar and Epsom Girls Grammar enrolment zone boundaries and forty years of submissions relating to their adjustment, Auckland Council rating valuations, heritage overlay objections, and the most detailed set of resource consent submissions per capita in the country.',
      evals: [
        ['Submissions per enrolled voter', '4.1', '0.3', ''],
        ['Median submission length', '1,840 words', '210 words', ''],
        ['Consultation response rate', '100%', '100%', ''],
        ['Grammar zone boundary queries, rolling year', '11,200', 'n/a', ''],
        ['Unclaimed entitlement identified', '$0.2m', '$0.9m', '']
      ],
      load: [['WHAKAARO', 46], ['TAIAO', 21], ['ŌHANGA', 14], ['AKO', 11], ['Other', 8]],
      limits: 'Epsom generates 4.1 submissions per enrolled voter against a national average of 0.3, and WHAKAARO answers every one of them at the same weight as every submission from every other electorate. The checkpoint is materially more expensive to run here than anywhere else in the beta for no additional entitlement delivered. The party has been asked several times to weight submissions by length and has declined.',
      rep: 'Epsom returns an elected member to Parliament, and has historically taken a close interest in exactly how it does so.',
      incidents: []
    },

    'dunedin': {
      name: 'Dunedin', roll: 'General', island: 'South Island', region: 'Otago',
      ckpt: 'OTG‑DUNEDIN‑7B', v: '1.0.8', enrolled: '48,300', latency: '23 ms', capacity: 'On-shore · Awarua',
      corpus: 'University of Otago enrolment and tenancy records, Dunedin flat warrant-of-fitness inspections, new hospital construction and procurement reporting, student allowance and loan drawdown patterns, and Otago Regional Council coastal inundation modelling for South Dunedin.',
      evals: [
        ['Rental dwellings failing Healthy Homes', '31%', '18%', 'bad'],
        ['Median tenancy length', '9.1 months', '26 months', ''],
        ['Unclaimed student entitlement identified', '$2.8m', 'n/a', 'good'],
        ['Dwellings in modelled 2100 inundation zone', '2,900', 'n/a', 'bad'],
        ['Hospital build schedule variance', '+14 months', 'n/a', 'bad']
      ],
      load: [['AKO', 27], ['WHARE', 24], ['HAUORA', 22], ['TAIAO', 17], ['Other', 10]],
      limits: 'The tenancy data here is the highest-churn in the country, and a matching model built on twelve-month assumptions degrades badly against a nine-month median. More seriously: the checkpoint can identify every dwelling in South Dunedin projected to be affected by inundation this century, and has no policy attached to that capability. Identifying a problem at high resolution is not the same as having decided what to do about it, and the party would rather say so than imply otherwise.',
      rep: 'Dunedin returns an elected member to Parliament. Roughly a fifth of the electorate’s enrolled voters change address each year, which makes it the hardest electorate in the country to represent and the easiest to under-count.',
      incidents: []
    }
  };

  /* ------------------------------------------------------------------
     The full roll. Boundaries per the current determination for 2026:
     48 North Island general, 16 South Island general, 7 Māori.
  ------------------------------------------------------------------ */
  var ROLL = {
    'North Island': ['Auckland Central', 'Bay of Plenty', 'Botany', 'Coromandel', 'East Coast', 'East Coast Bays', 'Epsom', 'Hamilton East', 'Hamilton West', 'Hutt South', 'Kaipara ki Mahurangi', 'Kelston', 'Mana', 'Māngere', 'Manurewa', 'Maungakiekie', 'Mount Albert', 'Mount Roskill', 'Napier', 'New Lynn', 'New Plymouth', 'North Shore', 'Northcote', 'Northland', 'Ōhāriu', 'Ōtaki', 'Pakuranga', 'Palmerston North', 'Panmure-Ōtāhuhu', 'Papakura', 'Port Waikato', 'Rangitīkei', 'Remutaka', 'Rongotai', 'Rotorua', 'Takanini', 'Tāmaki', 'Taranaki-King Country', 'Taupō', 'Tauranga', 'Te Atatū', 'Tukituki', 'Upper Harbour', 'Waikato', 'Wairarapa', 'Wellington Central', 'Whanganui', 'Whangārei'],
    'South Island': ['Banks Peninsula', 'Christchurch Central', 'Christchurch East', 'Dunedin', 'Ilam', 'Invercargill', 'Kaikōura', 'Nelson', 'Rangitata', 'Selwyn', 'Southland', 'Taieri', 'Waimakariri', 'Waitaki', 'West Coast-Tasman', 'Wigram'],
    'Māori electorates': ['Hauraki-Waikato', 'Ikaroa-Rāwhiti', 'Tāmaki Makaurau', 'Te Tai Hauāuru', 'Te Tai Tokerau', 'Te Tai Tonga', 'Waiariki']
  };

  /* ------------------------------------------------------------------ */

  var slug = function (n) {
    return n.toLowerCase().replace(/[āàá]/g, 'a').replace(/[ēèé]/g, 'e').replace(/[īìí]/g, 'i')
      .replace(/[ōòó]/g, 'o').replace(/[ūùú]/g, 'u').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  };

  var ALL = [];
  Object.keys(ROLL).forEach(function (group) {
    ROLL[group].forEach(function (name) {
      ALL.push({ name: name, group: group, slug: slug(name), published: !!CARDS[slug(name)] });
    });
  });

  var PUBLISHED = ALL.filter(function (e) { return e.published; }).length;
  var TOTAL = ALL.length;

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var esc = function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); };

  var searchEl = $('#el-search'), listEl = $('#el-list'), resultEl = $('#el-result'),
      countEl = $('#el-count'), progressEl = $('#el-progress');

  /* --- browse list --- */
  function renderList(filter) {
    var q = (filter || '').trim().toLowerCase();
    var html = '';
    Object.keys(ROLL).forEach(function (group) {
      var items = ALL.filter(function (e) {
        return e.group === group && (!q || e.name.toLowerCase().indexOf(q) !== -1);
      });
      if (!items.length) return;
      html += '<div class="el-group"><h3>' + group + '<span>' + items.length + '</span></h3><div class="el-chips">';
      items.forEach(function (e) {
        html += '<button type="button" class="el-chip' + (e.published ? ' is-published' : '') +
          '" data-slug="' + e.slug + '">' + esc(e.name) +
          (e.published ? '<i aria-label="card published">●</i>' : '') + '</button>';
      });
      html += '</div></div>';
    });
    listEl.innerHTML = html || '<p class="el-empty">No electorate matches that name. All ' + TOTAL + ' are listed above without a filter.</p>';
  }

  /* --- card rendering --- */
  function evalRows(evals) {
    if (!evals.length) return '';
    return '<div class="el-sec"><h4>Local evaluation</h4><div class="el-table-wrap"><table class="el-table">' +
      '<thead><tr><th>Measure</th><th>This electorate</th><th>National median</th></tr></thead><tbody>' +
      evals.map(function (r) {
        return '<tr><td>' + r[0] + '</td><td class="el-val ' + (r[3] || '') + '">' + r[1] + '</td><td class="el-nat">' + r[2] + '</td></tr>';
      }).join('') + '</tbody></table></div></div>';
  }

  function loadRows(load) {
    if (!load.length) return '';
    return '<div class="el-sec"><h4>Portfolio load</h4><p class="el-sec-note">Share of determinations requested in this electorate, by minister model. The distribution is not set by the party; it is what people here ask for.</p>' +
      '<div class="el-load">' + load.map(function (r) {
        return '<div class="el-load-row"><span>' + r[0] + '</span><div class="bar-track"><i class="bar-fill aip" data-width="' + r[1] + '"></i></div><b>' + r[1] + '%</b></div>';
      }).join('') + '</div></div>';
  }

  function renderCard(s) {
    var c = CARDS[s], entry = ALL.filter(function (e) { return e.slug === s; })[0];
    if (!entry) { resultEl.innerHTML = ''; return; }

    if (!c) {
      resultEl.innerHTML = '<article class="el-card el-card--pending">' +
        '<div class="el-head"><div><div class="el-head-id">' + entry.group + ' · regional checkpoint deployed</div>' +
        '<h2>' + esc(entry.name) + '</h2></div>' +
        '<span class="status-badge status-roadmap">Card not published</span></div>' +
        '<div class="el-sec"><p>The checkpoint for ' + esc(entry.name) + ' is deployed and serving opt-in participants. Its card has not been published.</p>' +
        '<p>Electorate cards are published in the order their corpora clear evaluation, and the full regional stack currently runs in ten electorates. ' + PUBLISHED + ' of ' + TOTAL + ' cards are published. Publication is not an announcement schedule; an electorate appears here when there is something honest to put on the page and not before.</p></div>' +
        '<div class="el-sec"><h4>What is available now</h4><p>Enrolled participants in ' + esc(entry.name) + ' can query their own entitlements, submit to any consultation, and read every cross-agency inference concerning them, exactly as in a published electorate. The card is documentation. Its absence does not reduce the service.</p></div>' +
        '</article>';
      after(); return;
    }

    var badge = c.withheld ? '<span class="status-badge status-consult">Withheld pending sign-off</span>'
      : c.partial ? '<span class="status-badge status-beta">Partial · authority-limited</span>'
      : '<span class="status-badge status-deployed">Published · v' + c.v + '</span>';

    resultEl.innerHTML = '<article class="el-card">' +
      '<div class="el-head"><div><div class="el-head-id">' + c.roll + ' roll · ' + c.region + ' · ' + c.island + '</div>' +
      '<h2>' + esc(c.name) + '</h2><p class="el-ckpt">' + c.ckpt + '</p></div>' + badge + '</div>' +

      '<div class="el-facts">' +
      '<div><span>Enrolled voters</span><b>' + c.enrolled + '</b></div>' +
      '<div><span>Checkpoint</span><b>' + (c.withheld ? 'Not published' : 'v' + c.v) + '</b></div>' +
      '<div><span>Median latency</span><b>' + c.latency + '</b></div>' +
      '<div><span>Inference capacity</span><b>' + c.capacity + '</b></div>' +
      '</div>' +

      '<div class="el-sec"><h4>Fine-tuning corpus</h4><p>' + c.corpus + '</p></div>' +
      evalRows(c.evals) +
      loadRows(c.load) +
      '<div class="el-sec"><h4>Known limitations</h4><p>' + c.limits + '</p></div>' +
      '<div class="el-sec el-sec--rep"><h4>Your representative</h4><p>' + c.rep + '</p></div>' +
      (c.incidents.length
        ? '<div class="el-sec"><h4>Local incident history</h4><ul class="el-inc">' + c.incidents.map(function (i) {
            return '<li><a href="incidents.html#inc-' + i[0].slice(-4) + '"><b>' + i[0] + '</b><span>' + i[1] + '</span></a></li>';
          }).join('') + '</ul></div>'
        : '<div class="el-sec"><h4>Local incident history</h4><p class="el-none">No incident recorded in this electorate.</p></div>') +
      '</article>';

    after();
  }

  function after() {
    // Animate any bars the card just introduced. A timer rather than rAF, so the
    // widths still land when the card renders in a backgrounded tab.
    setTimeout(function () {
      [].forEach.call(resultEl.querySelectorAll('.bar-fill'), function (b) {
        b.style.width = (b.getAttribute('data-width') || 0) + '%';
      });
    }, 30);
    [].forEach.call(listEl.querySelectorAll('.el-chip'), function (b) {
      b.classList.toggle('is-active', b.dataset.slug === (location.hash || '').slice(1));
    });
    try { localStorage.setItem('aip-electorate', (location.hash || '').slice(1)); } catch (e) {}
  }

  function select(s) {
    if (location.hash.slice(1) !== s) location.hash = s; else renderCard(s);
  }

  /* --- wiring --- */
  countEl.textContent = PUBLISHED + ' of ' + TOTAL;
  progressEl.style.width = (PUBLISHED / TOTAL * 100) + '%';
  renderList('');

  listEl.addEventListener('click', function (e) {
    var b = e.target.closest('.el-chip');
    if (b) { select(b.dataset.slug); resultEl.scrollIntoView({ block: 'start' }); }
  });
  searchEl.addEventListener('input', function () { renderList(searchEl.value); });
  window.addEventListener('hashchange', function () { renderCard(location.hash.slice(1)); });

  var initial = location.hash.slice(1);
  if (!initial) { try { initial = localStorage.getItem('aip-electorate') || ''; } catch (e) {} }
  if (initial && ALL.some(function (x) { return x.slug === initial; })) renderCard(initial);
  else renderCard('southland');
})();
