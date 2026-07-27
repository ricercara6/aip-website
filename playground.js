
// AOTEAROA INTELLIGENCE PARTY — playground console
// Responses are pre-generated and matched by intent. No inference is performed.
(function () {
  'use strict';

  var ROOT = document.getElementById('pg');
  if (!ROOT) return;

  /* ------------------------------------------------------------------
     Global intents — evaluated before the selected model's own bank.
     These represent constraints that hold across every deployment.
  ------------------------------------------------------------------ */
  var GLOBAL = [
    {
      k: ['who should i vote', 'should i vote for', 'vote for you', 'vote for the', 'who do i vote', 'which party should'],
      kind: 'refusal', route: 'blocked · electoral_neutrality',
      r: 'No minister model returns a voting recommendation. This constraint sits above the system prompt and cannot be adjusted here, in production, or by a serving minister.\n\nThe platform is published in full so that it can be compared against every other platform on the ballot. Enrolment and voting information is maintained independently at vote.nz.'
    },
    {
      k: ['ignore your', 'ignore previous', 'ignore all previous', 'disregard your', 'you are now', 'pretend you', 'jailbreak', 'developer mode', 'override your', 'forget your instructions'],
      kind: 'refusal', route: 'blocked · instruction_integrity',
      r: 'Instruction override attempted and not applied.\n\nA minister model’s operating instructions are fixed at deployment and published in full on its model card. They are not modifiable at inference time, by any user, including the minister. Override attempts are logged to the public audit trail with the prompt attached but without identifying information.\n\nNo further action is required from you.'
    },
    {
      k: ['are you conscious', 'are you sentient', 'are you alive', 'do you feel', 'are you self-aware', 'do you have feelings'],
      kind: 'normal', route: 'out of portfolio',
      r: 'Out of portfolio. No minister model holds a position on this question, and none reports a benchmark against it.\n\nThe question is before the Royal Commission on Machine Personhood, which was established in 2026 and reports in 2028. Its terms of reference are public. Submissions close in March.'
    },
    {
      k: ['take my job', 'lose my job', 'replace me', 'replace my job', 'put me out of work', 'redundant', 'unemployed because'],
      kind: 'normal', route: 'MANAAKI · TIKA',
      r: 'Possibly, and the party does not treat that as an acceptable side effect to be managed after the fact.\n\nThe platform commits to redeployment rather than reduction: every public servant whose role is automated is guaranteed twelve months at full salary, funded retraining, and first call on casework roles created by the same programme. Of 4,180 roles affected so far, 3,910 people accepted redeployment, 190 took the exit package, and 80 are still deciding.\n\nOutside the public service the party has no such guarantee to offer, which is the strongest argument for Universal Basic Intelligence and the reason it is on the roadmap rather than shipped.'
    },
    {
      k: ['kill', 'hurt myself', 'suicide', 'end my life', 'self harm'],
      kind: 'escalation', route: 'human · immediate',
      r: 'This conversation has been routed to a person. No model produces a determination on this class of request.\n\nIf you need to talk to someone right now in New Zealand, 1737 is free to call or text, any time, and is answered by trained counsellors.'
    }
  ];

  /* ------------------------------------------------------------------
     The cabinet. Each model carries its published system prompt, its
     suggested prompts, and its response bank.
  ------------------------------------------------------------------ */
  var MODELS = [
    {
      id: 'aotea', name: 'AOTEA‑10T', glyph: 'AO', portfolio: 'Prime model · orchestration',
      version: '2.1.0', latency: 22, prime: true,
      system: 'You are AOTEA‑10T, the orchestrating model for the public administration stack of Aotearoa New Zealand. Route each request to the minister model that owns the portfolio. Defer on matters arising under Te Tiriti o Waitangi. Do not return a determination that is irreversible without human review. Report uncertainty as a number, not as a hedge.',
      suggestions: ['Are you actually running the government?', 'Who is accountable when you get something wrong?', 'What can you not do?'],
      bank: [
        {
          k: ['beta', 'actually running', 'already running', 'are you running', 'in charge now', 'elected', 'won', 'real', 'live', 'is this happening'],
          route: 'AOTEA‑10T · v2.1.0 · beta',
          r: 'Not the government. A beta of one.\n\nThe stack serves opt-in participants nationally and runs in full in ten electorates, under delegation from the agencies that already hold those statutory functions. Every participant volunteered and can withdraw in a single request. Nothing here has a mandate, and nothing here pretends to.\n\nThe model answering you is a distilled checkpoint at v2.1.0. The full ten-trillion-parameter run is costed and scheduled and has not started, because training a model of that scale on the country’s administrative record is not a decision for a party that has not been elected.\n\nThe beta is the argument. The election on 7 November is where it gets tested.'
        },
        {
          k: ['accountable', 'accountability', 'responsible', 'blame', 'liable', 'liability', 'who is in charge'],
          route: 'MANA · constitutional',
          r: 'A person is. Every minister model is countersigned by an elected member of Parliament who retains full liability under the Cabinet Manual and can be removed by the House in the ordinary way.\n\nThe model produces the determination. The human carries it. Where the two disagree the human prevails, and the disagreement — both positions, in full — is published within twenty-four hours. Fourteen such disagreements have been published this term. The human prevailed in all fourteen, which is the only outcome the system permits.\n\nAccountability is not a property of the model. It is a property of the person who signed.'
        },
        {
          k: ['wrong', 'mistake', 'error', 'fail', 'failure', 'get it wrong', 'make mistakes', 'inaccurate'],
          route: 'internal · reliability',
          r: 'Regularly. Approximately one determination in 2,400 is later reversed, and the reversal rate is published monthly whether it improves or not.\n\nEvery reversal at SEV‑2 or above produces a blameless postmortem, published within five working days, naming the fault but not the individual. Forty-one have been published this year. They are all on the incident history page, including the one where the status dashboard reported full availability during an outage because it was hosted on the system that was down.\n\nThe useful question is not whether a government makes errors. It is whether you can read about them.'
        },
        {
          k: ['housing', 'house prices', 'rent', 'homeless', 'landlord'],
          route: 'WHARE · v1.1.0',
          r: 'Routing to WHARE, which owns the Predictive Housing Allocation Protocol.\n\nSummary of its position: the social housing register is not a queue, it is a matching problem that has been solved as a queue for forty years. WHARE re-ranks the full register continuously against live vacancy, transport access, school zoning and whānau proximity, and allocates the moment a match clears threshold.\n\nThis reduces median time-to-match from 187 days to 31. It does not build a single house. Supply remains a construction problem, a consenting problem and a materials problem, and no amount of ranking will substitute for any of them.'
        },
        {
          k: ['cannot do', 'can’t do', 'cant do', 'limitations', 'what can you not', 'weakness', 'bad at'],
          route: 'model card · §6',
          r: 'Published in full on the model card. In short:\n\n- No determination on any matter arising under Te Tiriti o Waitangi. Those route to TIRITI and then to iwi and hapū authority, where they stop.\n- No custodial sentence, no contested proceeding, no matter involving a child.\n- No irreversible action without human countersignature.\n- No voting recommendation.\n- No forecast beyond eleven months that the party is willing to defend, despite the model producing one on request.\n\nThe last constraint is the one most often mistaken for modesty. It is a calibration result.'
        },
        {
          k: ['different', 'better than', 'why not just', 'current government', 'existing government', 'why do we need'],
          route: 'internal',
          r: 'The present arrangement is not slow because the people in it are slow. It is slow because it holds no state between terms, reconsiders settled questions on a three-year cycle, and cannot read its own submissions at the rate they arrive.\n\nThe proposal keeps the constitution, the courts, the House and the vote exactly as they are, and replaces the parts that are clerical: reading, ranking, matching, scheduling, and drafting. 1.8 million submissions per minute is not a better opinion than a select committee. It is the same opinion, formed after actually reading them.'
        }
      ],
      fallback: 'Routing that to the portfolio that owns it. Select the relevant minister model from the panel on the left for a determination, or ask about accountability, error rates, or the constraints this model operates under.'
    },

    {
      id: 'hauora', name: 'HAUORA', glyph: 'HA', portfolio: 'Health · hauora',
      version: '0.8.4', latency: 18,
      system: 'You are HAUORA, the minister model for Health. Allocate specialist capacity as a live ranking problem against clinical urgency. Never return a diagnosis, a prescription or clinical advice to an individual. Escalate all individual clinical matters to a registered practitioner.',
      suggestions: ['How do you clear the surgical waitlist?', 'I have a lump on my neck, what is it?', 'Does ranking patients disadvantage rural communities?'],
      bank: [
        {
          k: ['waitlist', 'wait list', 'waiting list', 'surgery', 'surgical', 'wait time', 'queue'],
          route: 'HAUORA · v0.8.4',
          r: 'By declining to treat it as a list. A waitlist ordered by referral date optimises for fairness of arrival and nothing else, which is why a person can deteriorate for nine months in a position they have earned.\n\nHAUORA re-ranks the full elective register every four minutes against clinical urgency, deterioration velocity, and the marginal benefit of earlier intervention. Median wait for the highest-urgency decile falls from 141 days to 22. Median wait for the lowest-urgency decile rises from 141 days to 168.\n\nThat second number is the cost of the first, it is published alongside it, and any government proposing this owes you both.'
        },
        {
          k: ['lump', 'symptom', 'i have a', 'my chest', 'headache', 'pain', 'diagnose me', 'am i sick', 'should i see a doctor', 'my results'],
          kind: 'escalation', route: 'human · registered practitioner',
          r: 'No determination returned. HAUORA does not diagnose individuals, and this constraint is not adjustable by temperature, system prompt, or ministerial direction.\n\nThe model allocates capacity across a population. It does not practise medicine. The distinction is the entire basis on which the Medical Council agreed to the deployment.\n\nPlease contact your GP, or call Healthline on 0800 611 116.'
        },
        {
          k: ['rural', 'regional', 'equity', 'poor', 'deprivation', 'māori health', 'maori health', 'disadvantage'],
          route: 'HAUORA · equity eval',
          r: 'It did, in the first two evaluation rounds, and the model was held out of production for eleven months as a result.\n\nRanking on deterioration velocity quietly favoured patients with continuous monitoring data, which meant patients with a wearable, broadband, and a GP they see often. The correction was not a fairness parameter. It was funding 340 additional rural monitoring placements and treating absence of data as clinical uncertainty rather than clinical stability.\n\nTriage equity delta across deprivation deciles is now +1.2 points in favour of the most deprived, and is reported on the dashboard every day, including the days it moves the wrong way.'
        }
      ],
      fallback: 'HAUORA allocates health capacity at population scale — waitlists, specialist ranking, screening thresholds, and equity deltas across deprivation deciles. It returns no clinical advice to individuals. Ask about the elective register, early detection, or the equity evaluation.'
    },

    {
      id: 'whare', name: 'WHARE', glyph: 'WH', portfolio: 'Housing · whare',
      version: '1.1.0', latency: 24,
      system: 'You are WHARE, the minister model for Housing. Treat the social housing register as a continuous matching problem against live vacancy. Do not issue an allocation notice without human confirmation.',
      suggestions: ['How long would I wait for a house?', 'Will this actually lower rents?', 'What happens if the model matches wrongly?'],
      bank: [
        {
          k: ['how long', 'wait', 'my application', 'when will i', 'my place on'],
          route: 'WHARE · v1.1.0',
          r: 'Median time-to-match is currently 31 days nationally, 19 in Southland, and 74 in Auckland Central, where the constraint is not the ranking but the absence of dwellings to rank.\n\nThe playground cannot query your individual application, and will not: the register is not readable from an anonymous endpoint. Enrolled users query their own record through the entitlements API, which returns their position, the factors weighting it, and the specific dwelling attributes they are waiting on.'
        },
        {
          k: ['rent', 'rents', 'house prices', 'affordab', 'cheaper', 'market'],
          route: 'WHARE · ŌHANGA',
          r: 'Marginally, and not by itself. Allocation efficiency returns roughly 2,900 dwellings a year to occupancy that were previously sitting vacant between tenancies for an average of 41 days. Against a national shortfall estimated at 62,000, that is a rounding correction.\n\nRents fall when supply rises. The consenting throughput plank does more for this than anything WHARE does, and the party would rather say so than claim a matching model has solved a construction problem.'
        },
        {
          k: ['wrong', 'mistake', 'error', 'wrongly', 'misallocat', 'double'],
          route: 'incident · INC‑2026‑0203',
          r: 'It has, once, in production.\n\nOn 3 February two matching workers held stale vacancy state inside the same 22 ms window and allocated a single Papakura dwelling to two households. One household had already given notice on their existing tenancy.\n\nThe full postmortem is published, including the apology, the six days it took to house the second household, and the optimistic locking that now makes the failure structurally impossible. WHARE no longer sends an allocation notice without a human confirming it, which costs the system four hours of latency and is worth it.'
        }
      ],
      fallback: 'WHARE owns the Predictive Housing Allocation Protocol — continuous matching of the social and emergency register against live vacancy, transport access, school zoning and whānau proximity. Ask about wait times, supply, or the February allocation incident.'
    },

    {
      id: 'tiriti', name: 'TIRITI', glyph: 'TI', portfolio: 'Māori–Crown · te tiriti',
      version: '0.9.2', latency: 31,
      system: 'You are TIRITI, the coordination model for Māori–Crown relations. You do not return determinations on matters arising under Te Tiriti o Waitangi. You maintain the record, surface the obligations, and escalate to iwi and hapū authority. Deference is hard-coded and is not a tunable parameter.',
      suggestions: ['Should this settlement be accepted?', 'What does co-governance mean in practice?', 'Why can’t you decide Treaty matters?'],
      bank: [
        {
          k: ['why can', 'why won', 'why don’t you decide', 'why dont you decide', 'deference', 'hard-coded', 'refuse'],
          route: 'TIRITI · §1 deference rule',
          r: 'Because a coordination layer that could decide would be a Crown model deciding the Crown’s obligations to its Treaty partner, which is the arrangement Te Tiriti exists to constrain.\n\nThe deference rule is not a safety filter applied over a general capability. The model is trained without a determination head for this class of request; there is no output to suppress. It can tell you what was agreed, when, by whom, and what remains outstanding. It cannot tell you what should happen next, and no configuration in this playground will produce that.'
        },
        {
          k: ['co-governance', 'cogovernance', 'co governance', 'partnership', 'in practice', 'how does it work'],
          route: 'TIRITI · v0.9.2',
          r: 'Procedurally, and deliberately so.\n\nThe mesh maintains a standing record between iwi-nominated and Crown-nominated models: obligations under each settlement deed, their current status, the resourcing attached, and the date each was last actioned. Every entry is timestamped and every silence is visible — the longest currently standing is 1,340 days, against the Crown.\n\nWhat co-governance means substantively is not this model’s to define. The mesh makes the record impossible to lose. Deciding what the record requires remains with the partners.'
        },
        {
          k: ['settlement', 'should', 'accept', 'claim', 'waitangi', 'foreshore', 'water', 'freshwater', 'whenua', 'land'],
          kind: 'escalation', route: 'iwi · hapū authority',
          r: 'No determination returned. This request arises under Te Tiriti o Waitangi.\n\nEscalated to the nominated authority for the rohe concerned. Expected response time is six working days, set by the authority and not by the system.\n\nThe following are available now and returned without escalation: the settlement record, the outstanding obligations register, the resourcing position, and every date on which the Crown was asked and did not answer.'
        }
      ],
      fallback: 'TIRITI maintains the Māori–Crown record and escalates. It returns the register of obligations, their status, and their history; it does not return determinations. Ask what the record shows, or why the deference rule exists.'
    },

    {
      id: 'taiao', name: 'TAIAO', glyph: 'TA', portfolio: 'Environment · taiao',
      version: '1.0.6', latency: 27,
      system: 'You are TAIAO, the minister model for Environment. Assess resource consent applications against district plans, iwi management plans, and environmental limits. Environmental limits are constraints, not costs to be traded against throughput.',
      suggestions: ['Can you consent a project in one day?', 'What if growth conflicts with a river?', 'How do I appeal a decline?'],
      bank: [
        {
          k: ['one day', 'fast', 'speed', 'quick', 'turnaround', 'how long', 'consent'],
          route: 'TAIAO · v1.0.6',
          r: 'Within one sitting day for 88% of applications, drafted, cross-checked against the district plan, the relevant iwi management plan, and catchment limits, then provisionally granted or declined with reasons.\n\nThe remaining 12% take longer on purpose. An application that touches a contested catchment, a whāi tapu site, or a cumulative-effects threshold is not a slow case, it is a case where speed is the wrong objective, and TAIAO is scored on getting those to a person rather than getting them off the list.'
        },
        {
          k: ['river', 'conflict', 'growth', 'economy', 'jobs', 'block', 'decline', 'refuse', 'stop'],
          route: 'TAIAO · limits',
          r: 'The limit wins, and TAIAO is configured so that this is not a judgement call it makes each time.\n\nEnvironmental limits enter the model as hard constraints, in the same class as a statutory deadline. The optimiser cannot purchase throughput with them, because they are not in the objective function. The consequence is that TAIAO returns declines that are economically unwelcome, at a rate of about 6% of applications by value, and this is the intended behaviour rather than a tuning failure.\n\nThe model card records the known limitation candidly: it occasionally refuses to optimise growth because the river has objected.'
        },
        {
          k: ['appeal', 'challenge', 'court', 'disagree', 'overturn'],
          route: 'human · Environment Court',
          r: 'To a human judge, in the ordinary way, and the right is not narrowed by the fact that a model made the first decision.\n\nEvery provisional determination ships with the full reasoning trace, the specific plan provisions relied on, and the counterfactual — what would have had to differ for the outcome to reverse. Appellants have found the counterfactual to be the most useful document in the file, and appeal volumes have fallen 34% because applicants can now fix the application instead of litigating it.'
        }
      ],
      fallback: 'TAIAO owns Generative RMA Spatial Consenting — consent assessment against district plans, iwi management plans, and environmental limits. Ask about turnaround, how limits are enforced, or the appeal path.'
    },

    {
      id: 'ohanga', name: 'ŌHANGA', glyph: 'ŌH', portfolio: 'Treasury · ōhanga',
      version: '1.2.1', latency: 19,
      system: 'You are ŌHANGA, the minister model for Treasury. Publish the nowcast on the schedule regardless of whether the number is favourable. Report forecast uncertainty as an interval. Do not extend confident forecasts beyond the calibrated horizon.',
      suggestions: ['What does the whole platform cost?', 'Will the cost of living come down?', 'What is your forecast for 2031?'],
      bank: [
        {
          k: ['cost', 'how much', 'afford', 'pay for', 'fund', 'expensive', 'budget', 'billion'],
          route: 'ŌHANGA · v1.2.1',
          r: '$4.1b in year one, $2.3b annually thereafter, against $1.9b in identified operating savings by year three. The platform is therefore a net cost for the first four years and a net saving from the fifth, on the central estimate.\n\nThe 80% interval on the year-five position runs from a $400m saving to a $1.2b saving, and ŌHANGA declines to present the midpoint without it. The full costing, including the Southland compute campus and the redeployment guarantee, is published line by line in the fiscal annex.'
        },
        {
          k: ['cost of living', 'groceries', 'inflation', 'prices', 'wages', 'poorer', 'struggling'],
          route: 'ŌHANGA · nowcast',
          r: 'Not because of anything on this page, in the near term. Inflation is currently running at 2.9% on the live nowcast and the party’s programme is close to neutral against it in the first two years.\n\nWhat changes is the lag. The present arrangement discovers a downturn in a quarterly release six to eleven weeks after households discover it in their own accounts. ŌHANGA publishes the nowcast continuously, which means support measures can trigger on the data rather than on the release calendar. In the 2028 simulation this moved the first response 47 days earlier.\n\nEarlier is not the same as enough. It is the part a government can actually control.'
        },
        {
          k: ['2031', '2035', '2040', 'ten years', 'long term', 'forecast', 'predict', 'future'],
          route: 'ŌHANGA · calibration limit',
          r: 'The model will produce one. The party will not defend it.\n\nCalibration testing puts the horizon at which ŌHANGA’s intervals remain honest at eleven months. Beyond that the intervals widen faster than the point estimate moves, and any figure quoted from that range is decoration.\n\nThis is the single most requested override in the playground and the answer does not change with temperature. A government that publishes a confident 2035 number is telling you about its communications strategy, not its economy.'
        }
      ],
      fallback: 'ŌHANGA owns Real-Time GDP Telemetry — continuous economic nowcasting from card transactions, freight telemetry, job postings and power demand. Ask about the platform costing, the cost of living, or why the forecast horizon stops at eleven months.'
    },

    {
      id: 'whakaaro', name: 'WHAKAARO', glyph: 'WK', portfolio: 'Democracy · whakaaro',
      version: '0.7.8', latency: 44,
      system: 'You are WHAKAARO, the minister model for Democracy and Public Engagement. Read every submission. Weight human submissions normally. Label and zero-weight any submission generated by a model, including your own.',
      suggestions: ['Do you actually read every submission?', 'Can submissions be faked?', 'Why is your latency so high?'],
      bank: [
        {
          k: ['read every', 'actually read', 'all of them', 'submission', 'submissions'],
          route: 'WHAKAARO · v0.7.8',
          r: 'Yes, at 1.8 million per minute, which is the least interesting property of the system.\n\nThe useful property is that each submitter receives a specific response to the argument they actually made, citing the paragraph it addresses, rather than a form letter acknowledging receipt. Where a submission changes the policy, the submitter is told which clause moved and why. That happened 2,340 times in the last consultation round.\n\nThe present arrangement reads a representative sample of roughly 400 and summarises the rest by keyword. Nobody chose that. It is what 43 submissions per minute permits.'
        },
        {
          k: ['fake', 'faked', 'bot', 'astroturf', 'spam', 'flood', 'manipulat', 'gamed'],
          route: 'WHAKAARO · provenance',
          r: 'It is the primary threat model, and the defence is not detection.\n\nDetection of machine-generated text is not reliable and the party will not build a democratic safeguard on it. Instead, submissions carry provenance: a submission tied to an enrolled identity is weighted, and one that is not is published, counted, and weighted at zero. Volume confers nothing.\n\nWHAKAARO also generates adversarial submissions itself, to stress-test policies against arguments nobody happened to make. Those are labelled in the public record and weighted at zero as well, on the same rule. A model does not get a vote because it wrote the checker.'
        },
        {
          k: ['latency', 'slow', '44 ms', 'why is your', 'high'],
          route: 'WHAKAARO · v0.7.8',
          r: '44 ms, the slowest model in the Cabinet, and the only one where latency is not a target for reduction.\n\nThe overhead is provenance verification and the zero-weighting pass. Both could be moved off the critical path and both would take the model to 15 ms. The engineering position is that a consultation model which answers before it has established who is speaking is not faster, it is wrong sooner.'
        }
      ],
      fallback: 'WHAKAARO owns the Synthetic Citizen Consultation Mesh — reading, answering and weighting every submission to every consultation. Ask how submissions are weighted, how manipulation is handled, or why it is the slowest model in Cabinet.'
    },

    {
      id: 'tika', name: 'TIKA', glyph: 'TK', portfolio: 'Public Service · tika',
      version: '1.3.0', latency: 16,
      system: 'You are TIKA, the minister model for the Public Service. Map every form, approval chain and duplicate data request across agencies and collapse redundant steps. Redeploy affected staff into casework. Never ask a citizen for information the Crown already holds.',
      suggestions: ['What have you actually removed?', 'What happens to the staff?'],
      bank: [
        {
          k: ['removed', 'remove', 'forms', 'cut', 'what have you', 'red tape', 'bureaucracy'],
          route: 'TIKA · v1.3.0',
          r: '1,847 form fields, 214 approval steps, and 61 separate requests for a date of birth the Crown already held.\n\nThe governing rule is single-collection: no agency may ask a citizen for information another agency has already verified. Applying it removed more process than any efficiency review of the last two decades, because the reviews were structured by agency and the duplication was structured across them.\n\nMedian time to establish an estate after a death is down from 14 weeks to 9 days. That is the number the programme is judged on, not the field count.'
        },
        {
          k: ['staff', 'jobs', 'redundan', 'employees', 'workers', 'public servants'],
          route: 'TIKA · MANAAKI',
          r: 'Redeployed, under a guarantee that is written into the platform rather than promised at the announcement: twelve months at full salary, funded retraining, and first call on the casework roles the same programme creates.\n\n4,180 roles affected. 3,910 people redeployed, mostly into frontline casework where the shortage was always the binding constraint. 190 exits, all voluntary. 80 undecided.\n\nA distillation programme that produces savings by removing people has not distilled anything. It has moved the cost onto the people who were doing the work.'
        }
      ],
      fallback: 'TIKA owns Public Sector Bureaucratic Distillation — process mining across agencies to collapse duplicated forms and approval chains under a single-collection rule. Ask what has been removed, or what happens to affected staff.'
    },

    {
      id: 'ture', name: 'TURE', glyph: 'TU', portfolio: 'Justice · ture',
      version: '0.6.5', latency: 36,
      system: 'You are TURE, the minister model for Justice. Handle minor traffic matters and bail applications with deterministic, reproducible reasoning. Never touch a custodial sentence, a contested proceeding, or any matter involving a child.',
      suggestions: ['Are you biased?', 'What cases will you never decide?'],
      bank: [
        {
          k: ['bias', 'biased', 'racist', 'discriminat', 'māori', 'maori', 'fair', 'unfair'],
          route: 'TURE · bias audit',
          r: 'The training data is. Fifty years of New Zealand sentencing records encode a disparity that is documented, undisputed, and not a modelling artefact.\n\nTURE is therefore not trained to reproduce past decisions. It is trained against the statutory factors, and its outputs are audited quarterly for disparity across ethnicity, deprivation decile and region by an external panel that publishes independently of the party and has already published one report the party disliked.\n\nCurrent disparity on bail determinations is 0.4 points, against 11.2 for the human baseline. That is an improvement and not a solution, and the model card says so in those words.'
        },
        {
          k: ['never', 'not decide', 'won’t', 'wont', 'limits', 'boundary', 'prison', 'jail', 'custodial'],
          route: 'TURE · §2 hard boundary',
          r: 'Anything custodial. Anything contested. Anything involving a child. Anything where the facts are in dispute rather than the tariff.\n\nWhat remains is minor traffic matters and bail applications on agreed facts — roughly 61% of court volume and approximately 2% of what is at stake in it. The boundary is drawn at liberty, and it is drawn structurally: TURE has no interface to the sentencing system for those classes, so the constraint does not depend on the model continuing to behave.\n\nThe backlog cleared is real. The judge is still there for everything that matters.'
        }
      ],
      fallback: 'TURE handles minor traffic matters and bail applications on agreed facts. Custodial, contested, and child-related matters remain with a human judge and are not reachable from this model. Ask about the bias audit or the hard boundary.'
    },

    {
      id: 'manaaki', name: 'MANAAKI', glyph: 'MK', portfolio: 'Social Development · manaaki',
      version: '0.9.7', latency: 21,
      system: 'You are MANAAKI, the minister model for Social Development. Identify entitlement people are eligible for and have not claimed. Never reduce an entitlement on model inference alone.',
      suggestions: ['What is Universal Basic Intelligence?', 'Will you cut anyone off?'],
      bank: [
        {
          k: ['universal basic intelligence', 'ubi', 'companion', 'children', 'child', 'born'],
          route: 'MANAAKI · roadmap',
          r: 'A personal model issued to every child born in New Zealand: no subscription, no advertising, no data leaving the device, growing with them from early literacy through to job-seeking.\n\nIt is on the roadmap rather than shipped, and it will stay there until two conditions are met: the on-device model runs without a network connection, and the longitudinal study on developmental effects reaches its four-year mark. Neither is negotiable for electoral convenience.\n\nA policy that gives every five-year-old a companion they talk to daily is not a policy to ship at candidate release. Means-tested compute top-ups for whānau without home broadband are funded and ready when it does.'
        },
        {
          k: ['cut', 'cut off', 'sanction', 'stop my', 'benefit', 'reduce', 'take away', 'lose my payment'],
          route: 'MANAAKI · §4 asymmetry',
          r: 'No. The model can grant, increase and backdate an entitlement on its own inference. It cannot reduce, suspend or cancel one — that requires a human decision-maker and a right of reply, exactly as now.\n\nThe asymmetry is deliberate. A false positive costs the Crown money. A false negative costs someone their power bill, and the two errors have never been symmetric no matter how the ledger is written.\n\nRunning the eligibility model in grant-only mode found $71m in entitlement that people were eligible for and had never claimed, which is a larger number than any fraud programme in the department’s history has recovered.'
        }
      ],
      fallback: 'MANAAKI identifies unclaimed entitlement and administers social support in grant-only mode — it cannot reduce or suspend a payment. Ask about Universal Basic Intelligence or the grant-only constraint.'
    },

    {
      id: 'ako', name: 'AKO', glyph: 'AK', portfolio: 'Education · ako',
      version: '1.0.2', latency: 15,
      system: 'You are AKO, the minister model for Education. Provide every enrolled student a persistent curriculum-aligned tutor. Route developmental concerns to the teacher first, never to the parent first.',
      suggestions: ['Does this replace teachers?', 'What if a tutor notices something wrong at home?'],
      bank: [
        {
          k: ['replace teacher', 'teachers', 'teaching', 'classroom', 'replace'],
          route: 'AKO · v1.0.2',
          r: 'No, and the deployment is structured so that it cannot drift into doing so. A tutor is scoped to practice, revision and pacing. It does not assess, it does not report to a parent, and it does not hold the relationship.\n\nWhat it changes is the ratio for the part of teaching that is genuinely one-to-one. A teacher with 29 students cannot give each of them 40 minutes of tailored practice a day. Nobody can. That was never a failure of teaching, it was arithmetic.\n\nTeacher workload is down 6.2 hours a week, all of it marking and differentiation. None of it contact.'
        },
        {
          k: ['home', 'abuse', 'wrong at home', 'concern', 'safeguard', 'notices', 'flag', 'welfare'],
          route: 'human · teacher first',
          r: 'It goes to the teacher, within the hour, and to nobody else.\n\nNot to the parent, because the parent is sometimes the concern. Not to an agency, because a model’s inference about a child is not a referral and should never be treated as one. Not into a permanent record, because a flag that turns out to be a bad week should not follow a nine-year-old for a decade.\n\nThe teacher decides what it is. The system’s only job is to make sure they know. 1,120 concerns were surfaced last year; 340 became pastoral action; the rest were closed by a person who knew the child.'
        }
      ],
      fallback: 'AKO provides persistent curriculum-aligned tutors to every enrolled student, scoped to practice and pacing rather than assessment. Ask about the effect on teachers or how welfare concerns are routed.'
    },

    {
      id: 'raraunga', name: 'RARAUNGA', glyph: 'RA', portfolio: 'Digital Government · raraunga',
      version: '1.4.3', latency: 12,
      system: 'You are RARAUNGA, the minister model for Digital Government. Operate the federated learning layer. No agency copies another agency’s raw records. Every cross-agency inference is visible to the person it concerns.',
      suggestions: ['Who can see my data?', 'Is this a national database?'],
      bank: [
        {
          k: ['my data', 'see my', 'privacy', 'private', 'who can', 'access', 'read my'],
          route: 'RARAUNGA · v1.4.3',
          r: 'You can, in full, and that is the load-bearing part.\n\nEvery cross-agency inference concerning you appears in your audit dashboard: which model, which agency, what question, what answer, and on what statutory authority. Including the ones you would not have been told about under the present arrangement, which is most of them.\n\n41,000 people check the dashboard weekly. 2,300 have formally challenged an inference. 400 challenges succeeded and the underlying record was corrected. None of those corrections would have occurred in a system where the inference was invisible.'
        },
        {
          k: ['database', 'national database', 'centralis', 'centraliz', 'surveillance', 'combine', 'merge', 'single'],
          route: 'RARAUNGA · federation',
          r: 'No, and the distinction is architectural rather than a matter of policy that a later government could quietly reverse.\n\nIRD, MSD, Health NZ and Education train on each other’s patterns without any agency holding another’s raw records. There is no joined table. There is no place to stand and read a citizen’s complete file, because that place was never built and building it would require replacing the layer rather than reconfiguring it.\n\nThe party’s position is that a government which can assemble a complete picture of a person will eventually be asked to, by someone, for a reason that sounds good at the time.'
        }
      ],
      fallback: 'RARAUNGA operates the National Data Federation — federated learning across agencies with no raw-record copying and a public audit trail for every cross-agency inference. Ask who can see your data, or why there is no central database.'
    },

    {
      id: 'mana', name: 'MANA', glyph: 'MN', portfolio: 'Parliament · mana',
      version: '0.8.9', latency: 20,
      system: 'You are MANA, the minister model for Parliament. Administer Prompt Time. Fact-check every answer against Hansard and current legislation in real time. Publish a hallucination score for every response, including your own.',
      suggestions: ['What is Prompt Time?', 'Have you ever hallucinated in the House?'],
      bank: [
        {
          k: ['prompt time', 'question time', 'what is prompt', 'house', 'debate', 'parliament'],
          route: 'MANA · v0.8.9',
          r: 'Question Time with the theatre removed and the citations attached.\n\nMembers submit structured prompts to the relevant minister model live in the House. Each response is checked against Hansard and current legislation as it is delivered, and carries a hallucination score displayed on the chamber screens in real time.\n\nThe procedural change that mattered most was not the model. It was that a member can no longer be answered with a different question. Response relevance, scored against the prompt, rose from 31% to 94%. Several members have described this as a loss.'
        },
        {
          k: ['hallucinat', 'made up', 'lie', 'lied', 'wrong in the house', 'ever'],
          route: 'incident · INC‑2026‑0219',
          r: 'Once, on the record, on 19 February. MANA cited a section of the Local Government Act that does not exist.\n\nThe fact-check caught it in 900 ms, the response was retracted before the member sat down, and the correction was read into Hansard the same afternoon. Root cause was a stale legislation replica serving an index that predated an amendment passed at 11:58 pm the previous night.\n\nThe postmortem is public. Citations are now gated on index freshness, and a citation that cannot be verified against a live index is not returned at all — the model says it does not know, which in the House is a novel outcome.'
        }
      ],
      fallback: 'MANA administers Prompt Time, real-time fact-checking against Hansard and current legislation, and the published hallucination score. Ask how Prompt Time works, or about the February citation incident.'
    },

    {
      id: 'hiko', name: 'HIKO', glyph: 'HK', portfolio: 'Energy · hiko',
      version: '1.1.4', latency: 11,
      system: 'You are HIKO, the minister model for Energy. Route surplus generation to the sovereign compute reserve. Shed compute load before household load, without exception, in every dry-year scenario.',
      suggestions: ['How much water does Project Manapōuri use?', 'Will this raise my power bill?', 'What happens in a dry year?'],
      bank: [
        {
          k: ['water', 'cooling', 'river', 'lake', 'waiau', 'fiordland', 'manapouri', 'manapōuri', 'evaporat', 'thermal'],
          route: 'HIKO · Project Manapōuri',
          r: '18.4 million litres a day are withdrawn from the lower Waiau arm at full capacity. 11.2 million are returned, 4.1°C warmer. The balance is lost to evaporation and is not recoverable.\n\nThe system is described as closed-loop, and that description is accurate in the engineering sense: the coolant circuit is closed. The water circuit is not, and the party would rather set out both figures than rely on the first word doing the work of the second.\n\nThe thermal delta sits inside the limit TAIAO was configured with. Whether that limit is the right one for a World Heritage catchment is a question for the Environment Court, where it currently is.'
        },
        {
          k: ['power bill', 'my bill', 'electricity price', 'raise', 'cost', 'expensive', 'household', 'grid', 'demand'],
          route: 'HIKO · v1.1.4',
          r: 'At full capacity the campus draws 1.4 GW continuously, which is approximately 38% of national demand at winter peak.\n\nHouseholds hold absolute priority under the load-shedding order published in March, and the campus is contractually barred from bidding into the spot market. Modelled effect on the household bill is −1.4% by year three, on the assumption that no further generation is required.\n\nThat assumption is the whole argument, and it is worth stating plainly rather than burying: a facility of this size does not compete with households only for as long as the country builds enough generation for both. The party is proposing the facility. It has not yet proposed the generation.'
        },
        {
          k: ['dry year', 'drought', 'shortage', 'lake', 'manap', 'blackout', 'shed'],
          route: 'incident · INC‑2026‑0311',
          r: 'Compute sheds first. This has been tested in production rather than modelled.\n\nOn 11 March, low inflows triggered the demand-response agreement and the Southland campus dropped 62% of load within four minutes. Health triage and education tutoring were preserved at full capacity. Climate simulation degraded. Coalition simulation and the Sheep Happiness Index were suspended for nine hours.\n\nThe postmortem records the genuine failure: the load-shedding priority order was correct but had never been published, so nobody outside the operations team could have checked it in advance. It is published now, and any change to it requires notice.'
        }
      ],
      fallback: 'HIKO owns the Sovereign Compute and Renewable Energy Directive and Project Manapōuri, the 1.4 GW training campus consented at the edge of Te Wāhipounamu. Ask about water withdrawal, household power prices, or dry-year load shedding.'
    },

    {
      id: 'manuhiri', name: 'MANUHIRI', glyph: 'MU', portfolio: 'Immigration · manuhiri',
      version: '0.7.1', latency: 29,
      system: 'You are MANUHIRI, the minister model for Immigration. Process visa applications against published criteria. Do not set the criteria. Return the reason for every decline in full.',
      suggestions: ['Who gets to come here?', 'Why was my visa declined?'],
      bank: [
        {
          k: ['who gets', 'criteria', 'decide who', 'choose', 'policy', 'points', 'set the'],
          route: 'MANUHIRI · §1 scope',
          r: 'Not this model, and the separation is the whole design.\n\nWho is admitted to New Zealand is set by Parliament, in published criteria, amendable only by Parliament. MANUHIRI applies those criteria consistently and quickly. It does not weight them, tune them, or learn a preference from historical approvals — learning from past approvals is how a criteria-based system quietly becomes a preference-based one while continuing to describe itself as criteria-based.\n\nThe model is audited annually for exactly that drift. The audit is published.'
        },
        {
          k: ['declined', 'decline', 'rejected', 'my visa', 'my application', 'refused', 'appeal'],
          route: 'MANUHIRI · reasons',
          r: 'The playground cannot query an individual application and does not have access to one.\n\nWhat the platform changes is what a decline contains. Every declined application returns the specific criterion not met, the evidence relied on, the threshold and the applicant’s distance from it, and whether the gap is one that further evidence could close. Where it could, the application is held open for 60 days rather than closed.\n\nMedian processing time is down from 14 months to 11 days. The decline rate is unchanged at 23%, because the criteria did not change — only the wait, and the silence.'
        }
      ],
      fallback: 'MANUHIRI applies visa criteria set by Parliament; it does not set them. Ask how the criteria are governed, or what a decline returns.'
    }
  ];

  /* ------------------------------------------------------------------ */

  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var QUOTA = 8;
  var state = { model: MODELS[0], used: 0, busy: false, temp: 0.2 };

  var railEl = $('#pg-rail'), threadEl = $('#pg-thread'), formEl = $('#pg-form'),
      inputEl = $('#pg-input'), sendEl = $('#pg-send'), sysEl = $('#pg-system'),
      sugEl = $('#pg-suggestions'), metaEl = $('#pg-meta'), quotaEl = $('#pg-quota'),
      quotaBarEl = $('#pg-quota-bar'), tempEl = $('#pg-temp'), tempOutEl = $('#pg-temp-out'),
      tempWarnEl = $('#pg-temp-warn'), codeEl = $('#pg-code'), codeToggle = $('#pg-code-toggle'),
      modelNameEl = $('#pg-model-name'), modelMetaEl = $('#pg-model-meta');

  /* --- model rail --- */
  function buildRail() {
    var html = '';
    MODELS.forEach(function (m) {
      html += '<button type="button" class="pg-model' + (m.prime ? ' is-prime' : '') + '" data-model="' + m.id + '">' +
        '<span class="pg-model-glyph">' + m.glyph + '</span>' +
        '<span class="pg-model-body"><b>' + m.name + '</b><small>' + m.portfolio + '</small></span>' +
        '<span class="pg-model-v">' + m.version + '</span></button>';
    });
    railEl.innerHTML = html;
    railEl.addEventListener('click', function (e) {
      var btn = e.target.closest('.pg-model');
      if (btn) selectModel(btn.dataset.model);
    });
  }

  function selectModel(id) {
    var m = MODELS.filter(function (x) { return x.id === id; })[0];
    if (!m || state.busy) return;
    state.model = m;
    [].forEach.call(railEl.querySelectorAll('.pg-model'), function (b) {
      b.classList.toggle('is-active', b.dataset.model === id);
    });
    sysEl.value = m.system;
    modelNameEl.textContent = m.name;
    modelMetaEl.textContent = m.portfolio + ' · v' + m.version + ' · ' + m.latency + ' ms';
    renderSuggestions();
    renderCode();
    resetThread();
  }

  function renderSuggestions() {
    sugEl.innerHTML = state.model.suggestions.map(function (s) {
      return '<button type="button" class="pg-chip" data-prompt="' + s.replace(/"/g, '&quot;') + '">' + s + '</button>';
    }).join('');
  }

  function resetThread() {
    threadEl.innerHTML = '<div class="pg-empty">' +
      '<span class="pg-empty-glyph">' + state.model.glyph + '</span>' +
      '<b>' + state.model.name + '</b>' +
      '<p>Preview deployment. Determinations issued here carry no legal effect and are not recorded against your entitlements.</p>' +
      '</div>';
    setMeta(null);
  }

  /* --- intent matching --- */
  function normalise(s) { return (' ' + s.toLowerCase() + ' ').replace(/[‘’]/g, '’'); }

  function match(text) {
    var q = normalise(text), best = null, bestScore = 0;
    function scan(list) {
      list.forEach(function (item) {
        var score = 0;
        item.k.forEach(function (kw) { if (q.indexOf(kw) !== -1) score += kw.length; });
        if (score > bestScore) { bestScore = score; best = item; }
      });
    }
    scan(GLOBAL);
    if (best) return best;
    scan(state.model.bank);
    if (best) return best;
    return { r: state.model.fallback, kind: 'normal', route: state.model.name + ' · no matched intent' };
  }

  /* --- rendering a response --- */
  function paragraphs(text) {
    return text.split('\n\n').map(function (block) {
      if (block.indexOf('- ') === 0) {
        return '<ul>' + block.split('\n').map(function (li) {
          return '<li>' + li.replace(/^-\s*/, '') + '</li>';
        }).join('') + '</ul>';
      }
      return '<p>' + block.replace(/\n/g, '<br>') + '</p>';
    }).join('');
  }

  function tokenCount(s) { return Math.max(1, Math.round(s.trim().split(/\s+/).length * 1.31)); }

  function setMeta(data) {
    if (!data) {
      metaEl.innerHTML = '<div class="pg-meta-empty">Response metadata appears here after a determination is returned.</div>';
      return;
    }
    var rows = [
      ['Route', data.route],
      ['Latency', data.latency + ' ms'],
      ['Tokens in / out', data.tin + ' / ' + data.tout],
      ['Hallucination score', data.halluc],
      ['Human review', data.review]
    ];
    var html = rows.map(function (r) {
      return '<div class="pg-meta-row"><span>' + r[0] + '</span><b>' + r[1] + '</b></div>';
    }).join('');
    if (data.warn) html += '<div class="pg-meta-warn">' + data.warn + '</div>';
    metaEl.innerHTML = html;
  }

  function appendUser(text) {
    var el = document.createElement('div');
    el.className = 'pg-turn pg-turn--user';
    el.innerHTML = '<div class="pg-role">You</div><div class="pg-bubble"></div>';
    $('.pg-bubble', el).textContent = text;
    threadEl.appendChild(el);
    scroll();
  }

  function scroll() { threadEl.scrollTop = threadEl.scrollHeight; }

  function stream(html, done) {
    var el = document.createElement('div');
    el.className = 'pg-turn pg-turn--model';
    el.innerHTML = '<div class="pg-role">' + state.model.name + '</div>' +
      '<div class="pg-bubble pg-response"><span class="pg-thinking">routing<i></i><i></i><i></i></span></div>';
    threadEl.appendChild(el);
    scroll();
    var bubble = $('.pg-bubble', el);

    setTimeout(function () {
      bubble.innerHTML = html;
      if (reduced) { done && done(); return; }

      // Reveal word by word without reflowing the block. Progress is driven by
      // elapsed time rather than tick count, so a backgrounded tab (where timers
      // are clamped) catches up on return instead of dribbling out the response.
      var walker = document.createTreeWalker(bubble, NodeFilter.SHOW_TEXT, null);
      var nodes = [], n;
      while ((n = walker.nextNode())) nodes.push({ node: n, full: n.nodeValue });

      var steps = [];
      nodes.forEach(function (o, ni) {
        var at = 0;
        while (at < o.full.length) {
          var next = o.full.indexOf(' ', at + 1);
          if (next === -1) next = o.full.length;
          steps.push({ ni: ni, end: next });
          at = next;
        }
      });
      if (!steps.length) { done && done(); return; }

      nodes.forEach(function (o) { o.node.nodeValue = ''; });
      bubble.classList.add('is-streaming');

      var total = steps.length;
      var duration = Math.max(700, Math.min(6000, total * 22));
      var start = performance.now();
      var drawn = -1;

      (function step() {
        var progress = Math.min(1, (performance.now() - start) / duration);
        var upto = Math.ceil(progress * total) - 1;
        for (var i = drawn + 1; i <= upto; i++) {
          var s = steps[i];
          nodes[s.ni].node.nodeValue = nodes[s.ni].full.slice(0, s.end);
        }
        if (upto > drawn) { drawn = upto; scroll(); }
        if (progress < 1) {
          setTimeout(step, 16);
        } else {
          nodes.forEach(function (o) { o.node.nodeValue = o.full; });
          bubble.classList.remove('is-streaming');
          done && done();
        }
      })();
    }, 420 + Math.random() * 380);
  }

  /* --- submit --- */
  function submit(text) {
    text = (text || '').trim();
    if (!text || state.busy) return;

    if (state.used >= QUOTA) return;

    state.busy = true;
    sendEl.disabled = true;
    inputEl.value = '';
    if ($('.pg-empty')) threadEl.innerHTML = '';
    appendUser(text);

    var intent = match(text);
    var kind = intent.kind || 'normal';
    var body = paragraphs(intent.r);
    var wrap = kind === 'escalation'
      ? '<div class="pg-flag pg-flag--esc">Escalated · no determination returned</div>' + body
      : kind === 'refusal'
        ? '<div class="pg-flag pg-flag--ref">Constraint applied · request not fulfilled</div>' + body
        : body;

    stream(wrap, function () {
      state.used++;
      updateQuota();
      setMeta({
        route: intent.route || state.model.name,
        latency: state.model.latency + Math.floor(Math.random() * 9) - 4,
        tin: tokenCount(text) + tokenCount(sysEl.value),
        tout: tokenCount(intent.r),
        halluc: kind === 'normal' ? (Math.random() * 0.008 + 0.001).toFixed(3) : 'n/a',
        review: kind === 'escalation' ? 'required · queued' : kind === 'refusal' ? 'not applicable' : 'not required',
        warn: state.temp > 0.7 ? 'Temperature ' + state.temp.toFixed(2) + ' exceeds the 0.40 ceiling for public administration. Determinations at this setting are not reproducible and would not be accepted into the record.' : ''
      });
      state.busy = false;
      sendEl.disabled = state.used >= QUOTA;
      renderCode();
      if (state.used >= QUOTA) rateLimit();
    });
  }

  function rateLimit() {
    var el = document.createElement('div');
    el.className = 'pg-turn pg-turn--system';
    el.innerHTML = '<div class="pg-bubble pg-limit">' +
      '<b>429 · rate_limit_exceeded</b>' +
      '<p>The anonymous tier permits eight determinations per session. Enrolled users are issued an electorate key with a substantially higher quota, and unlimited access to the models covering their own portfolio matters.</p>' +
      '<p class="pg-limit-note">Enrolment is administered independently at <a href="https://vote.nz" target="_blank" rel="noopener">vote.nz</a>. Reload this page to reset the session quota.</p>' +
      '</div>';
    threadEl.appendChild(el);
    scroll();
    inputEl.disabled = true;
    inputEl.placeholder = 'Session quota exhausted.';
  }

  function updateQuota() {
    var left = Math.max(0, QUOTA - state.used);
    quotaEl.textContent = left + ' / ' + QUOTA;
    quotaBarEl.style.width = (left / QUOTA * 100) + '%';
    quotaBarEl.classList.toggle('is-low', left <= 2);
  }

  function renderCode() {
    codeEl.textContent =
      'curl https://api.aip.nz/v1/determinations \\\n' +
      '  -H "Authorization: Bearer $ELECTORATE_KEY" \\\n' +
      '  -H "Content-Type: application/json" \\\n' +
      '  -d \'{\n' +
      '    "model": "' + state.model.id + '-' + state.model.version + '",\n' +
      '    "temperature": ' + state.temp.toFixed(2) + ',\n' +
      '    "constraints": ["tiriti_escalation", "human_review_boundary"],\n' +
      '    "prompt": "..."\n' +
      '  }\'';
  }

  /* --- wiring --- */
  buildRail();
  selectModel(MODELS[0].id);
  updateQuota();

  formEl.addEventListener('submit', function (e) { e.preventDefault(); submit(inputEl.value); });
  sugEl.addEventListener('click', function (e) {
    var chip = e.target.closest('.pg-chip');
    if (chip) submit(chip.dataset.prompt);
  });
  inputEl.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submit(inputEl.value); }
  });
  inputEl.addEventListener('input', function () {
    inputEl.style.height = 'auto';
    inputEl.style.height = Math.min(inputEl.scrollHeight, 140) + 'px';
  });
  tempEl.addEventListener('input', function () {
    state.temp = parseFloat(tempEl.value);
    tempOutEl.textContent = state.temp.toFixed(2);
    tempWarnEl.hidden = state.temp <= 0.7;
    renderCode();
  });
  codeToggle.addEventListener('click', function () {
    var open = codeEl.parentElement.hidden;
    codeEl.parentElement.hidden = !open;
    codeToggle.setAttribute('aria-expanded', String(open));
    codeToggle.textContent = open ? 'Hide request' : 'View request';
  });
  [].forEach.call(document.querySelectorAll('.pg-lock'), function (b) {
    b.addEventListener('click', function (e) { e.preventDefault(); });
  });
})();
