import { useState, useEffect, useRef } from 'react';

const C = {
  aff: { bg: '#e6f1fb', border: '#378add', text: '#0c447c', pill: '#185fa5' },
  neg: { bg: '#fcebeb', border: '#e24b4a', text: '#a32d2d', pill: '#a32d2d' },
  otec: { bg: '#eaf3de', border: '#639922', text: '#3b6d11', pill: '#3b6d11' },
  da: { bg: '#faeeda', border: '#ba7517', text: '#854f0b', pill: '#854f0b' },
  cp: { bg: '#e1f5ee', border: '#1d9e75', text: '#0f6e56', pill: '#0f6e56' },
  k: { bg: '#eeedfe', border: '#7f77dd', text: '#534ab7', pill: '#534ab7' },
  gray: { bg: '#f1efe8', border: '#888780', text: '#444441', pill: '#5f5e5a' },
};

const ALL_EVIDENCE = [
  {
    id: 'oreilly',
    cite: "O'Reilly 2024",
    side: 'OTEC AFF',
    role: 'Inherency',
    claim:
      'OTEC promising but overlooked; lacks government support to scale; key for desalination',
    answeredBy:
      'Tabary-Devisme 2023 (link — algae blooms); 1NC no-solvency (95 yrs of promise, no commercial scale)',
  },
  {
    id: 'inn2024',
    cite: 'I.N.N. 2024',
    side: 'OTEC AFF',
    role: 'Warming Inherency',
    claim:
      'Arctic warming 4× faster; 13%/decade ice loss; 17 lowest sea-ice extents all since 2007',
    answeredBy:
      'Sommerkorn 2025 (non-unique — biodiversity already collapsing); Tabary-Devisme (OTEC adds harm on top)',
  },
  {
    id: 'temiz',
    cite: 'Temiz & Dincer 2022',
    side: 'OTEC AFF',
    role: 'Warming Solvency',
    claim:
      'OTEC specifically viable in Arctic; communities uniquely vulnerable to climate impacts',
    answeredBy:
      'Tabary-Devisme 2023 (cold-water discharge = algae blooms); 1NC (lower efficiency than tropics)',
  },
  {
    id: 'olim',
    cite: 'Olim et al. 2025 (Nature)',
    side: 'OTEC AFF',
    role: 'Solvency + Cost',
    claim:
      'OTEC powers DACCS; $0.04–$0.24/kWh vs coal; 3 TW × 500 yrs no adverse ocean effects',
    answeredBy:
      'Tabary-Devisme (local dead zones ≠ global circulation; Olim is different scale); Motyl 2023 (Russia DA still applies)',
  },
  {
    id: 'carrington',
    cite: 'Carrington 2024',
    side: 'OTEC AFF',
    role: 'Warming Impact',
    claim:
      '25/35 vital signs at record extremes; climate risks societal collapse; billions displaced',
    answeredBy:
      'Motyl 2023 (Russia DA: nuclear outweighs on magnitude); Carmack 2019 (DA turns case)',
  },
  {
    id: 'devyatkin24',
    cite: 'Devyatkin 2024',
    side: 'Research AFF',
    role: 'Inherency + Solvency',
    claim:
      'Arctic coop suspended since 2022 but 100-year history survived Cold War; depoliticized tradition',
    answeredBy:
      'Spence et al. (Arctic Council fragile — plan makes it worse); Shankman (Trump will weaponize US leadership)',
  },
  {
    id: 'devyatkin25',
    cite: 'Devyatkin 2025',
    side: 'Research AFF',
    role: 'Russia ADV Solvency',
    claim:
      'Arctic coop key to reduce US-Russia tension; Trump-Putin rapprochement creates opening',
    answeredBy:
      "Shankman (Trump purging climate data — opening is illusory); 1NC No-Solvency (plan can't force Russia)",
  },
  {
    id: 'montgomery',
    cite: 'Montgomery',
    side: 'Research AFF',
    role: 'Science ADV Inherency',
    claim:
      'Trump budget cuts gutting US science; mass firings; diplomacy needed to restore credibility',
    answeredBy:
      'Porter & Cohen (link — plan stops brain drain EU needs); Shankman (turns case — Trump weaponizes US leadership)',
  },
  {
    id: 'hermann',
    cite: 'Hermann 2019',
    side: 'Research AFF',
    role: 'Science ADV Solvency',
    claim:
      'Arctic coop key to restoring overall US science leadership; US is currently a weak Arctic power',
    answeredBy:
      'Mayet (EU CP — EU can lead on Arctic science instead, without US); 1NC No-Solvency (Russia controls access with 41 icebreakers)',
  },
  {
    id: 'parikh',
    cite: 'Parikh & Walport',
    side: 'Research AFF',
    role: 'Science ADV Impact',
    claim:
      'Scientific leadership needed to safely regulate AI advancing without safeguards → global war risk',
    answeredBy:
      '1NC No-Impact (too many speculative steps: Arctic → AI → war); Belfield (EU needs to set those norms, not US under Trump)',
  },
  {
    id: 'adler',
    cite: 'Adler',
    side: 'Research AFF',
    role: 'Russia ADV Inherency',
    claim:
      'US-Russia competing over Arctic minerals, trade routes, nuclear weapons storage — escalation risk',
    answeredBy:
      "1NC No-Inherency (Ukraine war is already the inherency; one science program can't fix military conflict); Mayet (EU CP solves Arctic tension)",
  },
  {
    id: 'klare',
    cite: 'Klare',
    side: 'Research AFF',
    role: 'Russia ADV Impact',
    claim: 'Arctic conflict → WWIII via Russian nukes + NATO drawn in',
    answeredBy:
      '1NC No-Impact (deterrence works; nuclear taboo 80 yrs; tensions exist without escalation); Motyl 2023 (cross-apply: Russian instability is the nuclear risk, not cooperation)',
  },
  {
    id: 'fenton',
    cite: 'Fenton & Kolyandr 4/11',
    side: 'OTEC NEG',
    role: 'Russia DA Uniqueness',
    claim:
      'Russian economy surviving Western sanctions specifically because of hydrocarbon profits',
    answeredBy:
      'Olim 2025 (one Arctic program ≪ total energy transition); Carrington 2024 (climate impact outweighs magnitude)',
  },
  {
    id: 'sokhanvar',
    cite: 'Sokhanvar & Sohag 2022',
    side: 'OTEC NEG',
    role: 'Russia DA Link',
    claim:
      'Renewables proven substitute for Russian oil; energy transition directly threatens exports',
    answeredBy:
      'Olim 2025 (global scale required; one program too small); I.N.N. 2024 (turn: warming destabilizes Russia too)',
  },
  {
    id: 'smithnonini',
    cite: 'Smith-Nonini 2022',
    side: 'OTEC NEG',
    role: 'Russia DA Int. Link',
    claim:
      'Oil = 60% exports, 45% budget, 15–25% GDP — resource curse makes collapse likely',
    answeredBy:
      "Fenton & Kolyandr 4/11 (cross-apply: economy adapted to full sanctions; one OTEC program won't trigger collapse)",
  },
  {
    id: 'motyl',
    cite: 'Motyl 2023',
    side: 'OTEC NEG',
    role: 'Russia DA Impact',
    claim:
      'Economic shock → collapse → civil war + thousands of nuclear weapons in contested vacuum',
    answeredBy:
      'Carrington 2024 (climate outweighs on magnitude + timeframe); I.N.N. 2024 (non-unique: warming also destabilizes Russia)',
  },
  {
    id: 'sommerkorn',
    cite: 'Sommerkorn & Lancaster 2025',
    side: 'OTEC NEG',
    role: 'Biodiversity Uniqueness',
    claim:
      'Arctic species on brink; sea ice −13%/decade; tundra halves by 2050; caribou −60%',
    answeredBy:
      'Olim 2025 (no adverse effects 500 yrs — directly answers future harm claim); Carrington 2024 (warming is the root threat AFF solves)',
  },
  {
    id: 'tabary',
    cite: 'Tabary-Devisme 2023',
    side: 'OTEC NEG',
    role: 'Biodiversity Link',
    claim:
      'OTEC thermal discharge → nutrient upwelling → algae blooms (HABs) → dead zones; transboundary',
    answeredBy:
      'Olim et al. 2025 (Nature: 3 TW × 500 yrs no adverse effects — directly answers this at global scale); Temiz & Dincer (properly engineered Arctic OTEC avoids this)',
  },
  {
    id: 'carmack',
    cite: 'Carmack et al. 2019',
    side: 'OTEC NEG',
    role: 'Biodiversity Impact',
    claim:
      'Arctic Ocean critical driver of global conveyor belt; biodiversity loss destroys all life on Earth',
    answeredBy:
      "Carrington 2024 (warming destroys more biodiversity than OTEC; AFF solves root cause); Olim 2025 (DA turns itself — OTEC reduces warming = saves Carmack's ecosystems)",
  },
  {
    id: 'dowdey',
    cite: 'Dowdey 2024',
    side: 'OTEC NEG',
    role: 'Carbon Tax CP Solvency',
    claim:
      'Carbon tax discourages pollution, incentivizes clean energy — solves warming ADV',
    answeredBy:
      "Olim et al. 2025 (CP can't do negative emissions/DACCS; carbon tax only slows new emissions); O'Reilly 2024 (CP doesn't produce freshwater)",
  },
  {
    id: 'klobucista',
    cite: 'Klobucista & Robinson 2023',
    side: 'OTEC NEG',
    role: 'Carbon Tax CP Solvency',
    claim:
      'Climate mitigation reduces water contamination and drought — CP solves water ADV',
    answeredBy:
      "O'Reilly 2024 (OTEC produces freshwater directly via desalination; CP only does it indirectly); Sokhanvar (carbon tax ALSO threatens Russian oil — links to Russia DA)",
  },
  {
    id: 'chomsky',
    cite: 'Chomsky et al. 2020',
    side: 'OTEC NEG',
    role: 'Capitalism K Link+Impact',
    claim:
      'Green tech greenwashes capitalism; capitalism is root cause of climate change; incompatible with life',
    answeredBy:
      'Olim 2025 (federal public investment ≠ corporate capitalism — Chomsky targets private profit-seeking); Carrington 2024 (turn: billions die waiting for degrowth)',
  },
  {
    id: 'neumann',
    cite: 'Neumann',
    side: 'OTEC NEG',
    role: 'Capitalism K Alt',
    claim:
      "Degrowth: plan economy around sustainability and people's needs, not profit",
    answeredBy:
      "Olim et al. 2025 (degrowth doesn't remove existing CO₂; DACCS does — different mechanism); Carrington 2024 (urgency: billions displaced NOW)",
  },
  {
    id: 'spence',
    cite: 'Spence et al.',
    side: 'Research NEG',
    role: 'Climate DA Uniqueness',
    claim:
      'Arctic Council critical to climate science cooperation — currently functioning but fragile',
    answeredBy:
      'Devyatkin 2024 (non-unique: already paused since 2022; plan restores it); I.N.N. 2024 (more warming data strengthens, not weakens, climate science)',
  },
  {
    id: 'shankman',
    cite: 'Shankman',
    side: 'Research NEG',
    role: 'Climate DA Link',
    claim:
      'US science leadership = Trump gets platform to push climate denial into multilateral forums',
    answeredBy:
      "Devyatkin 2024 (non-unique: Trump purging data regardless; plan doesn't change Trump's behavior); I.N.N. 2024 (4× warming data = harder to deny, not easier)",
  },
  {
    id: 'broers1',
    cite: 'Broers (Uniqueness)',
    side: 'Research NEG',
    role: 'EU DA Uniqueness',
    claim:
      'As US becomes isolationist, EU is positioned to take over as global leader',
    answeredBy:
      'Montgomery (non-unique: US already retreated; plan is targeted recovery not reversal of isolationism; EU window stays open)',
  },
  {
    id: 'broers2',
    cite: 'Broers (Int. Link)',
    side: 'Research NEG',
    role: 'EU DA Internal Link',
    claim:
      'Strong EU leadership specifically needed to preserve democracy against authoritarianism',
    answeredBy:
      'Adler + Klare (Russia ADV outweighs — nuclear WWIII > democratic decline; magnitude comparison wins AFF); Devyatkin (coop models democratic norms)',
  },
  {
    id: 'porter',
    cite: 'Porter & Cohen',
    side: 'Research NEG',
    role: 'EU DA Link',
    claim:
      'EU recruiting scientists fleeing US; plan reverses this brain drain EU needs to lead',
    answeredBy:
      "Montgomery (no link: brain drain is structural across all sectors; one Arctic program won't reverse it); Hermann 2019 (US + EU can both grow scientifically)",
  },
  {
    id: 'belfield',
    cite: 'Belfield',
    side: 'Research NEG',
    role: 'EU DA Impact',
    claim:
      'Democratic decline → wars + inability to cooperate on existential threats',
    answeredBy:
      'Klare (Russia ADV nuclear impact outweighs on magnitude — nuclear war > democratic decline); Parikh & Walport (US science leadership maintains cooperative mechanisms Belfield needs)',
  },
  {
    id: 'mayet',
    cite: 'Mayet',
    side: 'Research NEG',
    role: 'EU CP Solvency',
    claim: 'EU leading on climate and ready to become Arctic scientific leader',
    answeredBy:
      "Hermann 2019 (EU CP can't restore US scientific leadership — only US can do that); Adler + Klare (EU coop doesn't reduce US-Russia Arctic tensions)",
  },
  {
    id: 'carlo',
    cite: 'Carlo',
    side: 'Research NEG',
    role: 'Colonialism K Link',
    claim:
      'Indigenous Peoples mistreated/exploited by Arctic researchers and governments; sovereignty ignored',
    answeredBy:
      'Devyatkin 2024 (permutation — cooperation designed WITH Indigenous consultation; 100-yr history includes Indigenous partnerships); I.N.N. 2024 (warming harms Indigenous communities MORE — AFF helps them)',
  },
  {
    id: 'paige',
    cite: 'Paige',
    side: 'Research NEG',
    role: 'Colonialism K Impact',
    claim:
      'Years of structural violence caused generational trauma in Arctic Indigenous communities',
    answeredBy:
      "I.N.N. 2024 (climate change destroys Indigenous food security and culture — AFF's plan directly addresses the bigger structural threat to Indigenous survival)",
  },
];

const Pill = ({ color = 'gray', children, small }) => {
  const c = C[color] || C.gray;
  return (
    <span
      style={{
        background: c.pill,
        color: '#fff',
        fontSize: small ? 9 : 10,
        fontWeight: 500,
        padding: small ? '1px 6px' : '2px 8px',
        borderRadius: 12,
        letterSpacing: 0.3,
        display: 'inline-block',
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </span>
  );
};

const SecHead = ({ color = 'gray', children }) => {
  const c = C[color] || C.gray;
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        margin: '20px 0 10px',
        paddingBottom: 6,
        borderBottom: `1.5px solid ${c.border}`,
      }}
    >
      <div
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: c.border,
          flexShrink: 0,
        }}
      />
      <span style={{ fontSize: 12, fontWeight: 500, color: c.text }}>
        {children}
      </span>
    </div>
  );
};

const StepNum = ({ n }) => (
  <div
    style={{
      width: 20,
      height: 20,
      borderRadius: '50%',
      background: '#0f1b2d',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 10,
      fontWeight: 500,
      flexShrink: 0,
    }}
  >
    {n}
  </div>
);

function EvidCard({
  color = 'gray',
  cite,
  tags = [],
  claim,
  cardText,
  counters = [],
}) {
  const [open, setOpen] = useState(false);
  const c = C[color] || C.gray;
  return (
    <div
      onClick={() => setOpen((o) => !o)}
      style={{
        background: open ? c.bg : 'var(--color-background-primary,#fff)',
        border: `0.5px solid ${c.border}`,
        borderLeft: `3px solid ${c.border}`,
        borderRadius: 10,
        padding: '11px 13px',
        marginBottom: 8,
        cursor: 'pointer',
        transition: 'background 0.15s',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: 6,
          flexWrap: 'wrap',
          marginBottom: 4,
          alignItems: 'center',
        }}
      >
        {tags.map((t, i) => (
          <Pill key={i} color={t}>
            {t === 'aff'
              ? 'AFF'
              : t === 'neg'
              ? 'NEG'
              : t === 'otec'
              ? 'OTEC AFF'
              : t === 'da'
              ? 'DA'
              : t === 'cp'
              ? 'CP'
              : t === 'k'
              ? 'K'
              : '—'}
          </Pill>
        ))}
        <span
          style={{
            fontSize: 10,
            color: 'var(--color-text-secondary,#777)',
            fontStyle: 'italic',
            flex: 1,
          }}
        >
          {cite}
        </span>
        <span style={{ fontSize: 11, color: c.text, opacity: 0.55 }}>
          {open ? '▲' : '▼'}
        </span>
      </div>
      <div
        style={{
          fontSize: 12,
          fontWeight: 500,
          color: c.text,
          lineHeight: 1.5,
        }}
      >
        {claim}
      </div>
      {!open && (
        <div
          style={{
            fontSize: 10,
            color: 'var(--color-text-tertiary,#aaa)',
            marginTop: 3,
          }}
        >
          Click for full card text + specific counter-cards
        </div>
      )}
      {open && (
        <div style={{ marginTop: 10 }}>
          {cardText && (
            <div
              style={{
                padding: '9px 11px',
                background: 'var(--color-background-secondary,#f5f5f3)',
                borderRadius: 7,
                borderLeft: `2px solid ${c.border}`,
                marginBottom: 8,
              }}
            >
              <div
                style={{
                  fontSize: 9,
                  fontWeight: 500,
                  color: c.text,
                  letterSpacing: 0.6,
                  marginBottom: 5,
                }}
              >
                CARD TEXT:
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: 'var(--color-text-primary,#222)',
                  lineHeight: 1.8,
                }}
              >
                {cardText}
              </div>
            </div>
          )}
          {counters.length > 0 && (
            <div
              style={{
                background: '#fdf0f0',
                borderRadius: 7,
                padding: '9px 11px',
              }}
            >
              <div
                style={{
                  fontSize: 9,
                  fontWeight: 500,
                  color: '#a32d2d',
                  letterSpacing: 0.6,
                  marginBottom: 6,
                }}
              >
                HOW TO BEAT THIS CARD:
              </div>
              {counters.map((ct, i) => (
                <div
                  key={i}
                  style={{
                    marginBottom: 6,
                    paddingBottom: 6,
                    borderBottom:
                      i < counters.length - 1
                        ? '0.5px solid rgba(180,0,0,0.1)'
                        : 'none',
                  }}
                >
                  <div style={{ display: 'flex', gap: 6 }}>
                    <span
                      style={{
                        color: '#a32d2d',
                        flexShrink: 0,
                        fontWeight: 500,
                        fontSize: 11,
                      }}
                    >
                      →
                    </span>
                    <div>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 500,
                          color: '#0c447c',
                        }}
                      >
                        [{ct.card}]{' '}
                      </span>
                      <span
                        style={{
                          fontSize: 11,
                          color: 'var(--color-text-primary,#333)',
                          lineHeight: 1.55,
                        }}
                      >
                        {ct.arg}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function AnswerBlock({ color = 'neg', title, their, answers }) {
  const [open, setOpen] = useState(false);
  const c = C[color] || C.neg;
  return (
    <div
      onClick={() => setOpen((o) => !o)}
      style={{
        background: 'var(--color-background-primary,#fff)',
        border: `0.5px solid ${c.border}`,
        borderLeft: `3px solid ${c.border}`,
        borderRadius: 10,
        padding: '11px 13px',
        marginBottom: 8,
        cursor: 'pointer',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        <span style={{ fontSize: 12, fontWeight: 500, color: c.text }}>
          {title}
        </span>
        <span
          style={{
            fontSize: 11,
            color: c.text,
            opacity: 0.55,
            flexShrink: 0,
            marginLeft: 8,
          }}
        >
          {open ? '▲' : '▼'}
        </span>
      </div>
      <div
        style={{
          fontSize: 11,
          color: 'var(--color-text-secondary,#777)',
          marginTop: 3,
          lineHeight: 1.4,
        }}
      >
        Their argument: {their}
      </div>
      {!open && (
        <div
          style={{ fontSize: 10, color: c.text, marginTop: 3, opacity: 0.8 }}
        >
          Click to see {answers.length} answers — each cites the specific
          counter-card ▾
        </div>
      )}
      {open && (
        <div
          style={{
            marginTop: 10,
            padding: '9px 11px',
            background: c.bg,
            borderRadius: 7,
          }}
        >
          {answers.map((a, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                gap: 7,
                marginBottom: 7,
                paddingBottom: 7,
                borderBottom:
                  i < answers.length - 1
                    ? '0.5px solid rgba(0,0,0,0.07)'
                    : 'none',
              }}
            >
              <span
                style={{ color: '#3b6d11', flexShrink: 0, fontWeight: 500 }}
              >
                •
              </span>
              <div>
                <span
                  style={{ fontSize: 11, fontWeight: 500, color: '#0c447c' }}
                >
                  [{a.card}]{' '}
                </span>
                <span
                  style={{
                    fontSize: 12,
                    color: 'var(--color-text-primary,#333)',
                    lineHeight: 1.55,
                  }}
                >
                  {a.arg}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── CX NESTED STRUCTURE ──────────────────────────────────────────────────────
// A single question row
function CXQ({ q, goal, answer, side }) {
  const [open, setOpen] = useState(false);
  const borderColor =
    side === 'aff'
      ? '#378add'
      : side === 'neg'
      ? '#e24b4a'
      : side === 'otec'
      ? '#639922'
      : '#ba7517';
  return (
    <div
      onClick={() => setOpen((o) => !o)}
      style={{
        background: 'var(--color-background-secondary,#fafaf8)',
        border: `0.5px solid ${borderColor}22`,
        borderLeft: `3px solid ${borderColor}`,
        borderRadius: '0 8px 8px 0',
        padding: '8px 12px',
        marginBottom: 5,
        cursor: 'pointer',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
        <span
          style={{
            fontSize: 12,
            color: 'var(--color-text-primary,#333)',
            flex: 1,
            lineHeight: 1.5,
          }}
        >
          <strong style={{ color: borderColor }}>Q: </strong>
          {q}
        </span>
        <span style={{ color: borderColor, fontSize: 11, flexShrink: 0 }}>
          {open ? '▲' : '▼'}
        </span>
      </div>
      {open && (
        <div
          style={{
            marginTop: 7,
            paddingTop: 7,
            borderTop: `1px dashed ${borderColor}44`,
          }}
        >
          <div
            style={{
              fontSize: 11,
              color: '#854f0b',
              fontWeight: 500,
              marginBottom: answer ? 5 : 0,
            }}
          >
            🎯 Goal: {goal}
          </div>
          {answer && (
            <div
              style={{
                fontSize: 11,
                color: '#3b6d11',
                lineHeight: 1.55,
                padding: '6px 8px',
                background: '#f0faf4',
                borderRadius: 6,
                marginTop: 4,
              }}
            >
              <strong>AFF counter-answer: </strong>
              <span style={{ fontStyle: 'italic' }}>{answer}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// A sub-section folder (e.g. "Russia DA questions" inside "AFF asking OTEC NEG")
function CXSubFolder({ title, color, questions }) {
  const [open, setOpen] = useState(false);
  const c = C[color] || C.da;
  return (
    <div style={{ marginBottom: 8 }}>
      <div
        onClick={() => setOpen((o) => !o)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '8px 12px',
          background: c.bg,
          border: `0.5px solid ${c.border}`,
          borderRadius: 8,
          cursor: 'pointer',
          userSelect: 'none',
        }}
      >
        <span style={{ fontSize: 14, color: c.text }}>
          {open ? '📂' : '📁'}
        </span>
        <span style={{ fontSize: 12, fontWeight: 500, color: c.text, flex: 1 }}>
          {title}
        </span>
        <span style={{ fontSize: 11, color: c.text, opacity: 0.6 }}>
          {questions.length} questions {open ? '▲' : '▼'}
        </span>
      </div>
      {open && (
        <div style={{ marginTop: 4, paddingLeft: 12 }}>
          {questions.map((q, i) => (
            <CXQ
              key={i}
              {...q}
              side={color === 'da' || color === 'neg' ? 'neg' : 'aff'}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Top-level section folder (e.g. "AFF asking OTEC NEG")
function CXSection({ title, color, badge, subFolders }) {
  const [open, setOpen] = useState(false);
  const c = C[color] || C.gray;
  const totalQ = subFolders.reduce((s, f) => s + f.questions.length, 0);
  return (
    <div style={{ marginBottom: 12 }}>
      <div
        onClick={() => setOpen((o) => !o)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '12px 16px',
          background: open ? '#0f1b2d' : '#182538',
          border: `1px solid ${open ? c.border : 'rgba(255,255,255,0.1)'}`,
          borderRadius: 10,
          cursor: 'pointer',
          userSelect: 'none',
        }}
      >
        <span style={{ fontSize: 18 }}>{open ? '📂' : '📁'}</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 500, color: '#fff' }}>
            {title}
          </div>
          <div
            style={{
              fontSize: 11,
              color: 'rgba(255,255,255,0.5)',
              marginTop: 1,
            }}
          >
            {subFolders.length} sub-sections · {totalQ} questions total
          </div>
        </div>
        <Pill color={color}>{badge}</Pill>
        <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>
          {open ? '▲' : '▼'}
        </span>
      </div>
      {open && (
        <div style={{ marginTop: 8, padding: '0 4px' }}>
          {subFolders.map((sf, i) => (
            <CXSubFolder key={i} {...sf} />
          ))}
        </div>
      )}
    </div>
  );
}

const CX_DATA = [
  {
    title: 'AFF asking OTEC NEG',
    color: 'otec',
    badge: 'OTEC AFF',
    subFolders: [
      {
        title: 'Russia DA questions — attacking Fenton, Sokhanvar, Motyl',
        color: 'da',
        questions: [
          {
            q: 'How much of the global renewable energy market is one Arctic OTEC program?',
            goal: 'De-link from Sokhanvar & Sohag — their study covers the total global energy transition, not one program',
            answer:
              'Sokhanvar proves even marginal renewable substitution is a proven threat — the trend starts with programs exactly like this one.',
          },
          {
            q: "Your Fenton & Kolyandr card says Russia 'weathered the storm dramatically better than expected' under FULL Western sanctions. Sanctions are bigger than one OTEC program — right?",
            goal: "Use their own Uniqueness card (Fenton) to show non-unique impact — if sanctions didn't collapse Russia, one program won't",
            answer:
              "Yes that's what Fenton says, but Sokhanvar proves ANY clean energy expansion is a proven threat — it's the direction of travel, not just the scale.",
          },
          {
            q: 'Has the Russian economy collapsed despite oil prices dropping 40% in 2014, again in 2016, and again in 2020?',
            goal: "Historical non-uniqueness — Russia survived 3 oil price crashes; Motyl's collapse scenario is speculative",
            answer:
              'Those were temporary price drops — Sokhanvar proves permanent energy substitution is categorically different. It removes demand entirely, not just temporarily.',
          },
          {
            q: 'Does your Motyl impact require Russia to actually LOSE the Ukraine war first?',
            goal: 'Expose that collapse requires multiple prior conditions; the link chain is long and uncertain',
            answer:
              'Motyl says Russia faces mutually reinforcing tensions NOW — the Ukraine war is one of several simultaneous pressures. Energy transition is the economic trigger.',
          },
          {
            q: 'Does the plan actually produce enough energy to displace a significant percentage of Russian oil exports?',
            goal: "Force them to quantify — the actual capacity of one Arctic program vs. Russia's export volume",
            answer:
              "Olim proves OTEC scales to 3 TW globally — this plan is the first step in that scaling. Smith-Nonini proves Russia's vulnerability means even marginal displacement causes cascading budget effects.",
          },
          {
            q: "How many years does Sokhanvar's study say it takes for renewable growth to measurably reduce Russian oil exports?",
            goal: "Timeframe comparison — the effect is slow, meaning Carrington's climate impact is faster",
            answer:
              "The damage is structural and permanent — Sokhanvar's panel data shows the effect compounds over time. And Fenton proves Russia is already stressed, so the threshold for collapse is lower than it used to be.",
          },
          {
            q: "If Russian economic instability leads to civil war (Motyl), doesn't that mean Russia is LESS able to use its nuclear weapons strategically?",
            goal: 'Turn the nuclear impact — civil war scenarios reduce command and control, which actually weakens offensive nuclear capability',
            answer:
              "Motyl's scenario is specifically about loss of central control — which means nuclear weapons in the hands of multiple competing factions, not zero nukes. Kissinger's 'contested vacuum' is the nightmare scenario.",
          },
        ],
      },
      {
        title:
          'Biodiversity DA questions — attacking Tabary-Devisme, Sommerkorn, Carmack',
        color: 'da',
        questions: [
          {
            q: "Your Sommerkorn uniqueness card says Arctic species are ALREADY 'on the brink' without the plan. Isn't the DA impact already happening in the status quo?",
            goal: 'Non-unique using their own card — biodiversity is collapsing NOW without OTEC',
            answer:
              "The point is we shouldn't ADD more harm — Tabary-Devisme proves OTEC accelerates the collapse already occurring.",
          },
          {
            q: 'Olim et al. 2025, published in Nature, models 3 TW of OTEC and finds no adverse effects on ocean circulation for 500 years. Does your Tabary-Devisme card answer Olim specifically?',
            goal: "Force them to engage with the strongest AFF evidence — Tabary-Devisme predates and doesn't address Olim's modeling",
            answer:
              "Tabary-Devisme is about local discharge point effects — dead zones near the plant. Olim is about global thermohaline circulation. They're different scales and both can be true simultaneously.",
          },
          {
            q: 'Does a carbon tax (Dowdey) stop the warming that your Sommerkorn card says is destroying Arctic sea ice at 13% per decade?',
            goal: "Turn: the CP doesn't actually stop the uniqueness harm — only OTEC (+ DACCS) does negative emissions",
            answer:
              "Dowdey's carbon tax slows future emissions — it doesn't remove existing CO₂. Only OTEC-powered DACCS (Olim) achieves negative emissions. The CP can't stop Sommerkorn's uniqueness harm.",
          },
          {
            q: "Carmack 2019 says the Arctic Ocean drives the global climate system. Doesn't that mean stopping Arctic warming — which OTEC does — is MORE important than avoiding OTEC's local effects?",
            goal: 'Use Carmack against themselves — their own impact card justifies the plan by showing how important Arctic stability is',
            answer:
              "Carmack proves why the Arctic matters — but Tabary-Devisme proves OTEC disrupts the very ocean system Carmack says is critical. That's exactly why we need to study OTEC's effects carefully before deployment.",
          },
          {
            q: 'How many dead zones currently exist in the Arctic from industrial activity — before OTEC?',
            goal: 'Context: industrial fishing, shipping, and drilling already cause dead zones; OTEC adds marginally, not categorically',
            answer:
              'Industrial dead zones prove the problem is real and ongoing — OTEC adding more dead zones compounds existing harm to an already stressed ecosystem per Sommerkorn.',
          },
          {
            q: "Does Tabary-Devisme say dead zones are CERTAIN from OTEC, or does he say they are a risk that 'must be taken into account'?",
            goal: 'Downgrade the link from certainty to possibility — Tabary-Devisme is precautionary, not definitive',
            answer:
              "He says the risks 'must be taken into account' BEFORE construction. The plan doesn't include any environmental review — it funds deployment directly. So we're doing exactly what Tabary-Devisme warns against.",
          },
        ],
      },
      {
        title: 'Carbon Tax CP questions — attacking Dowdey, Klobucista',
        color: 'cp',
        questions: [
          {
            q: 'Does a carbon tax produce freshwater for Arctic communities the way OTEC does?',
            goal: "Solvency deficit on Water ADV — O'Reilly proves OTEC produces freshwater as a direct byproduct; carbon tax doesn't",
            answer:
              'Klobucista says mitigating warming reduces water stress — that addresses the same problem differently.',
          },
          {
            q: "Does a carbon tax remove CO₂ that's already in the atmosphere, or does it only slow new emissions?",
            goal: "Negative emissions gap — Olim's DACCS removes existing CO₂; carbon tax is not a removal mechanism",
            answer:
              "Dowdey focuses on future emissions, not removal — that's correct.",
          },
          {
            q: "If your carbon tax works and reduces fossil fuel use globally, wouldn't it also reduce Russian oil profits per Sokhanvar?",
            goal: "Net benefit is fake — a successful carbon tax ALSO links to the Russia DA they're running",
            answer:
              'The CP still avoids the Biodiversity DA, which is the main net benefit.',
          },
          {
            q: 'Has the United States ever successfully passed a federal carbon tax?',
            goal: 'Competitiveness — the CP may not be politically feasible, reducing solvency',
            answer:
              'A carbon tax has never passed Congress — Dowdey describes how it works in theory. The CP asks you to vote on a policy the US has repeatedly rejected while the plan is a feasible federal investment program.',
          },
          {
            q: 'Does Dowdey say a carbon tax alone is sufficient to keep warming below 1.5°C?',
            goal: 'Solvency deficit — Carrington says only 6% of experts think 1.5°C is achievable; carbon tax alone is insufficient',
            answer:
              "Dowdey says carbon tax reduces emissions and incentivizes clean energy — it doesn't make a 1.5°C claim. Carrington proves we need negative emissions, which only OTEC+DACCS provides.",
          },
        ],
      },
      {
        title: 'Capitalism K questions — attacking Chomsky, Neumann',
        color: 'k',
        questions: [
          {
            q: 'Is the US federal government a corporation?',
            goal: 'No link — Chomsky targets corporate capitalism and private profit-seeking; federal public investment is different',
            answer:
              "Chomsky's argument is about the SYSTEM, not just corporations — government investment props up the capitalist system.",
          },
          {
            q: "Does Neumann's degrowth alternative remove CO₂ that's already in the atmosphere?",
            goal: "Alt fails on negative emissions — Olim's DACCS removes existing CO₂; degrowth only addresses future production",
            answer:
              "Degrowth reduces future emissions by shrinking the economy — it doesn't remove existing CO₂. Carrington proves we need carbon removal NOW. Olim's DACCS does that; degrowth doesn't.",
          },
          {
            q: "How many people could be displaced while we wait for capitalism to be replaced per Neumann's alternative?",
            goal: 'Turn: Carrington proves billions face displacement NOW; urgency makes waiting for degrowth unconscionable',
            answer:
              "Carrington proves millions are already displaced and billions more are at risk. Neumann's alternative requires a complete restructuring of the global economy — there is no timeline for that. The plan acts now.",
          },
          {
            q: 'Can you name a country that has successfully implemented degrowth as national policy?',
            goal: 'Alternative fails — no empirical evidence degrowth can be implemented at scale or speed needed',
            answer:
              'Degrowth has been implemented in academic models and small communities — but never at the national scale needed to address global warming. The alt is unproven while climate collapse is happening now per Carrington.',
          },
          {
            q: "If Chomsky says technology greenwashes capitalism, does that mean we shouldn't build wind or solar farms either?",
            goal: "Permutation — Chomsky's logic proves too much; it would block all technological climate solutions",
            answer:
              "Chomsky's argument applies to corporate-owned renewable tech that generates profit — not federal public investment. The plan is government-funded like the interstate highway system, not a private green tech company.",
          },
        ],
      },
    ],
  },
  {
    title: 'AFF asking Research NEG',
    color: 'aff',
    badge: 'Research AFF',
    subFolders: [
      {
        title: 'Climate DA questions — attacking Spence, Shankman, Carrington',
        color: 'da',
        questions: [
          {
            q: "If the plan increases scientific data about Arctic warming — 4× faster, 13%/decade ice loss — how does that undermine the Arctic Council's climate work?",
            goal: 'The link (Shankman) is backwards; more data makes denialism harder, not easier',
            answer:
              "Shankman says US leadership gives Trump a PLATFORM in multilateral forums. The data itself doesn't undermine anything — it's Trump using the platform to push denial that's the harm.",
          },
          {
            q: "Is Trump's climate denial happening right now without the plan?",
            goal: "Non-unique on the link — Shankman's harm exists in the status quo; the plan doesn't cause it",
            answer:
              "Yes — but right now Trump has no Arctic Council platform because cooperation is paused. The plan RESTORES that platform and gives Trump access to multilateral climate forums he doesn't currently have.",
          },
          {
            q: 'Does your Spence uniqueness card say the Arctic Council is currently paused or functioning?',
            goal: 'Expose the uniqueness: the Arctic Council has been paused since 2022; the plan RESTORES it, not undermines it',
            answer:
              "Spence describes the Council as fragile but functioning — that was written before the 2022 pause. Devyatkin 2024 is more current and confirms the pause. Either way the plan restores cooperation that's currently suspended.",
          },
          {
            q: 'Has Trump been able to stop the EU or other nations from publishing Arctic climate data?',
            goal: "No internal link — Trump's denialism affects US agencies but not global science; the Arctic Council is multinational",
            answer:
              "Trump can't stop EU nations — but the Arctic Council operates by consensus. One member pushing climate denial can block joint statements and coordinated action, which is what Shankman specifically warns about.",
          },
          {
            q: "Does the DA's impact card, Carrington 2024, support AFF's argument that climate change is a crisis requiring more action?",
            goal: "Cross-apply — Carrington is a shared card; its existence proves the need for AFF's plan, not against it",
            answer:
              'Carrington proves climate change is catastrophic — which is WHY the plan is necessary. But the DA says the PLAN makes climate response WORSE by giving Trump a multilateral platform. Carrington proves the stakes, Shankman proves why the plan is the wrong response.',
          },
        ],
      },
      {
        title: 'EU DA questions — attacking Broers, Porter & Cohen, Belfield',
        color: 'da',
        questions: [
          {
            q: 'Does your Porter & Cohen card say EU scientific leadership depends on ONE Arctic cooperation program, or on broad structural trends of scientists fleeing the US?',
            goal: "No link — brain drain is structural; one program won't reverse it",
            answer:
              'The point is marginal: the plan signals renewed US investment, which slows the signal that drives the drain.',
          },
          {
            q: 'Can the US and EU both grow scientifically at the same time?',
            goal: "No zero-sum — Broers' internal link assumes US growth cancels EU growth; that's not how science works",
            answer:
              "Broers says the EU's opportunity comes specifically from US RETREAT — if the US re-engages, the window closes. It's not that both can't grow; it's that EU leadership depends on the US stepping back.",
          },
          {
            q: "Does Broers' EU leadership argument depend on EU having more scientists, or on EU having stronger institutions?",
            goal: "No internal link — EU democratic leadership is about institutions, not personnel; brain drain doesn't affect institutions",
            answer:
              'Broers says leadership requires BOTH capability (scientists) AND credibility. Porter & Cohen prove the scientists are coming to EU now. Without them, EU institutions lack the capability to lead on emerging tech governance.',
          },
          {
            q: "If democratic decline leads to war (Belfield), and AFF's Russia ADV prevents nuclear war (Klare), which impact is larger?",
            goal: 'Impact comparison: Klare nuclear WWIII > Belfield democratic decline on magnitude',
            answer:
              "Belfield's democratic decline causes wars — but wars already happen in non-democratic contexts. Klare's nuclear WWIII is categorically larger. The EU DA's impact is captured by the Russia ADV's solvency.",
          },
          {
            q: "Is the EU currently unified on Russia policy given Hungary's veto record?",
            goal: 'Non-unique on EU DA uniqueness — EU is internally divided; its leadership position is already weakened independent of the plan',
            answer:
              'Hungary proves the EU faces internal challenges — but Broers argues those challenges make strong EU scientific leadership MORE important, not less, to demonstrate EU credibility as a unified actor.',
          },
          {
            q: 'Does your EU CP (Mayet) also require EU scientists — meaning the CP has the same link to your EU DA as the plan does?',
            goal: 'Turn the net benefit: EU CP also draws on EU scientific resources, linking to EU DA',
            answer:
              "The CP draws on existing EU scientists — it doesn't reverse the brain drain from the US. The plan STOPS the brain drain, which is what links to the EU DA. The CP doesn't change US conditions so the drain continues either way.",
          },
        ],
      },
      {
        title: 'EU CP questions — attacking Mayet',
        color: 'cp',
        questions: [
          {
            q: 'Does EU cooperation with Russia (Mayet) specifically reduce US-Russia tensions in the Arctic?',
            goal: "Solvency deficit on Russia ADV — Adler + Klare prove the problem is US-Russia conflict; EU diplomacy doesn't solve that",
            answer:
              'Mayet says EU can be a bridge — European diplomacy creates frameworks both US and Russia could join.',
          },
          {
            q: 'Can EU cooperation with Russia restore US scientific leadership?',
            goal: 'Solvency deficit on Science ADV — Hermann proves the problem is US credibility; only US action restores US standing',
          },
          {
            q: 'Is the EU currently cooperating with Russia on anything, given EU sanctions since 2022?',
            goal: "CP competitiveness — EU has its own sanctions regime; Mayet's proposal may be as blocked as the plan",
          },
          {
            q: 'Does Mayet say the EU IS leading on Arctic science, or that it SHOULD and is ready to?',
            goal: "Solvency gap — 'ready to lead' ≠ 'solving the problem'; the CP's solvency is aspirational, not proven",
          },
        ],
      },
      {
        title: 'Colonialism K questions — attacking Carlo, Paige',
        color: 'k',
        questions: [
          {
            q: 'Does Arctic scientific cooperation under the plan involve resource extraction?',
            goal: 'No link — Carlo documents exploitation by resource extractors; scientific data-sharing is categorically different',
            answer:
              'Carlo says even data collection exploits Indigenous knowledge without consent or benefit-sharing.',
          },
          {
            q: 'Does your alternative — centering Indigenous voices — prevent Arctic warming?',
            goal: "Alt fails on case — Paige's structural violence is made worse by warming; centering voices without action doesn't stop I.N.N.'s 4× warming",
          },
          {
            q: 'Do Indigenous Arctic communities want climate change to continue?',
            goal: 'Turn: I.N.N. proves warming destroys Indigenous food security and culture; AFF fights that; the K actually harms Indigenous peoples by blocking climate action',
          },
          {
            q: "Can AFF's plan be designed to include Indigenous consultation and benefit-sharing as part of implementation?",
            goal: 'Permutation — do plan AND include Indigenous peoples; Devyatkin 2024 shows cooperative frameworks can include Indigenous governance',
          },
          {
            q: "Does Paige's generational trauma evidence say its cause is scientific cooperation, or resource extraction and forced displacement?",
            goal: "No link — Paige's harm comes from colonialism broadly, not from scientific data-sharing programs specifically",
          },
        ],
      },
    ],
  },
  {
    title: 'NEG asking OTEC AFF',
    color: 'neg',
    badge: 'OTEC NEG',
    subFolders: [
      {
        title: "Attacking solvency — O'Reilly, Temiz & Dincer, Olim",
        color: 'neg',
        questions: [
          {
            q: 'How many OTEC plants currently operate commercially anywhere in the world?',
            goal: "Technology is unproven at commercial scale — AFF answers with O'Reilly's trajectory argument; force them to defend",
            answer:
              "Georges Claude built a working plant in 1930 — technology exists. O'Reilly confirms viability. What's missing is government funding, which the plan provides.",
          },
          {
            q: "Your Olim cost estimate ranges $0.04 to $0.24/kWh — that's a 6× range. What explains that variance?",
            goal: 'Large range signals technical uncertainty; Arctic conditions likely push toward the high end',
            answer:
              "Even the high end ($0.24) is competitive with coal at $0.09–$0.14/kWh per Olim's own comparison. The range reflects engineering design choices, not fundamental unknowns.",
          },
          {
            q: "How does the Arctic Ocean's temperature differential compare to tropical oceans where OTEC was originally designed?",
            goal: "Lower efficiency in Arctic undermines Temiz & Dincer's viability claims",
            answer:
              "Temiz & Dincer specifically studied Arctic OTEC and confirmed viability. They acknowledge lower efficiency but note the 'almost unlimited' energy source compensates.",
          },
          {
            q: 'Your Olim evidence says 3 TW can be sustained. How much is currently deployed?',
            goal: 'Gap between modeled capacity and deployed reality exposes development gap',
            answer:
              'The plan is about DEVELOPMENT — not deploying 3 TW immediately. Solar had near-zero capacity in 1980; government investment scaled it to power billions.',
          },
          {
            q: "Does the US federal government have the technical agencies to oversee Arctic OTEC development after Trump's budget cuts per Montgomery?",
            goal: "Cross-apply Research AFF's own inherency against OTEC solvency — gutted agencies can't implement the plan",
            answer:
              "The plan provides funding to rebuild those agencies. Montgomery proves the problem; the plan is the solution. And federal contracts can hire private engineers — the government doesn't need to have all expertise in-house.",
          },
          {
            q: "How long does the plan take to have a measurable effect on Arctic warming per I.N.N.'s 13%/decade decline?",
            goal: 'Timeframe question — OTEC development and scaling would take decades; warming impacts are already occurring',
            answer:
              'OTEC development takes time — but DACCS can begin carbon removal as soon as plants are operational. Olim proves the technology works. And the 13%/decade decline means every year we delay costs more sea ice permanently.',
          },
        ],
      },
      {
        title: 'Attacking the warming ADV — I.N.N., Carrington',
        color: 'neg',
        questions: [
          {
            q: 'Carrington 2024 is a Guardian journalist. Has this evidence been peer-reviewed?',
            goal: 'Credibility attack — journalist ≠ peer-reviewed science',
            answer:
              'Carrington synthesizes findings from a peer-reviewed Bioscience paper signed by thousands of scientists. The Guardian accurately reports scientific consensus.',
          },
          {
            q: 'Does your I.N.N. evidence say Arctic warming is caused primarily by Arctic activities, or by global fossil fuel use?',
            goal: "Geographic mismatch — if warming is caused globally, one Arctic OTEC program can't solve it",
            answer:
              'Warming is caused globally — but OTEC+DACCS removes CO₂ from the atmosphere globally. The plant is in the Arctic but the carbon capture works on global atmospheric CO₂. Olim proves this.',
          },
          {
            q: "Does Olim's model assume global OTEC deployment or Arctic-only deployment?",
            goal: "Scale mismatch — Olim's 3 TW requires global adoption; one US Arctic program is a tiny fraction",
            answer:
              "Olim models global deployment to show safety — it proves even at maximum scale there's no adverse effect. The plan is the first step. Every global solution starts with one country's commitment.",
          },
          {
            q: 'If 25 of 35 vital signs are already at record extremes (Carrington), what evidence shows the plan stops that trend?',
            goal: "Solvency bridge — AFF must show the plan's specific mechanism connecting to Carrington's impact",
            answer:
              "Olim proves OTEC powers DACCS which removes existing atmospheric CO₂ — that directly addresses the CO₂ driving Carrington's record extremes. The mechanism is: OTEC energy → DACCS carbon removal → reduced warming → improved vital signs.",
          },
        ],
      },
      {
        title: "Attacking the water ADV — O'Reilly",
        color: 'neg',
        questions: [
          {
            q: 'How many gallons of freshwater per day does an OTEC plant produce relative to Arctic community needs?',
            goal: 'Quantify the gap between OTEC freshwater output and the scale of the Water ADV impact',
            answer:
              "O'Reilly doesn't specify gallons — but he says OTEC desalination is a key application specifically for Arctic communities. The plan funds multiple plants. Scale is determined by need and funding, both of which the plan provides.",
          },
          {
            q: "Does O'Reilly say OTEC desalination is cost-competitive with existing freshwater solutions?",
            goal: 'Solvency efficiency — if cheaper alternatives exist, the plan wastes resources on an expensive solution',
            answer:
              "O'Reilly says OTEC is promising for desalination in remote Arctic communities where existing freshwater infrastructure is inadequate or non-existent. Cost comparison to 'existing solutions' is irrelevant if those solutions don't reach Arctic communities.",
          },
          {
            q: 'Are Arctic communities currently experiencing water scarcity, or is the harm about future projections?',
            goal: "Inherency question — if water scarcity isn't happening now, urgency is reduced",
            answer:
              'Klobucista & Robinson prove water stress is already a global problem getting worse NOW. I.N.N. proves Arctic warming is already disrupting traditional water sources for Indigenous communities. This is present tense, not projection.',
          },
        ],
      },
    ],
  },
  {
    title: 'NEG asking Research AFF',
    color: 'neg',
    badge: 'Research NEG',
    subFolders: [
      {
        title: 'Attacking solvency — Devyatkin, Hermann',
        color: 'neg',
        questions: [
          {
            q: 'Has Russia indicated any willingness to return to Arctic scientific cooperation during the Ukraine war?',
            goal: 'Solvency requires two willing parties — the plan only controls US action, not Russian response',
            answer:
              "Devyatkin 2024 says Russian officials called the pause 'regrettable' and stressed the 100-year tradition of depoliticized dialogue. The history shows Russia separates science from politics.",
          },
          {
            q: "How many active Arctic scientists does the US have after Trump's budget cuts per Montgomery?",
            goal: "If personnel were eliminated, there's no one to execute the cooperation the plan calls for",
            answer:
              'The plan provides funding to rebuild that capacity. Devyatkin 2024 shows infrastructure can be restored — it existed before and conditions are created to restore it.',
          },
          {
            q: 'Can you explain step by step how Arctic scientific cooperation leads to AI regulation?',
            goal: 'Expose the weak link chain in Parikh & Walport — each step is speculative',
            answer:
              'Scientific leadership shapes who sets global norms in multilateral forums like the G7 and OECD where AI governance frameworks are developed. Hermann proves Arctic demonstrates US global leadership capacity.',
          },
          {
            q: 'Russia has 41 icebreakers, the US has 2. Does the plan change that?',
            goal: "Solvency — Hermann proves US is a 'weak Arctic power'; the plan doesn't build icebreakers or ratify UNCLOS",
            answer:
              "Cooperation doesn't require equal capability — the US has scientific expertise Russia needs. Devyatkin 2024 shows the asymmetry existed throughout the Cold War cooperation.",
          },
          {
            q: 'The plan cooperates with Russia scientifically. Is Russia currently using its Arctic position to stage nuclear weapons per Adler?',
            goal: "Turn the inherency against solvency — if Russia is militarizing the Arctic NOW, science cooperation can't stop it",
            answer:
              "Yes — Adler proves Russia IS militarizing. That's exactly WHY cooperation is urgent. Devyatkin 2025 says Arctic cooperation is the key region for US-Russia rapprochement precisely because other channels are blocked by military tensions.",
          },
          {
            q: 'Does Devyatkin 2024 cite any successful scientific cooperation with Russia since 2022?',
            goal: "Solvency gap — if no cooperation has occurred since the pause, the 100-year history doesn't show current viability",
            answer:
              'Devyatkin 2024 specifically notes that informal academic conferences with Russian and American researchers still occur. Some narrow openings remain. The plan formalizes and funds those existing informal channels.',
          },
        ],
      },
      {
        title: 'Attacking the case impacts — Klare, Parikh & Walport',
        color: 'neg',
        questions: [
          {
            q: 'Has Arctic competition between the US and Russia led to military conflict in the last 80 years?',
            goal: "Non-unique and impact turn — deterrence has worked; Klare's WWIII scenario has never materialized despite constant Arctic tensions",
            answer:
              "The absence of war so far is exactly what's at stake — Klare says the risk is growing as ice melts and resource competition intensifies.",
          },
          {
            q: 'Does Klare say Arctic conflict would definitely escalate to nuclear war, or that it COULD under certain conditions?',
            goal: 'Downgrade the impact from certainty to possibility — reduce probability weighing',
            answer:
              'Klare says the conditions CREATE risk — but so does every nuclear escalation scenario. The question is whether the risk is unacceptable. Klare says yes because no conflict management mechanisms exist in the Arctic unlike every other nuclear theater.',
          },
          {
            q: 'Can you name a single international scientific cooperation program that has prevented a war?',
            goal: "No solvency to impact — there's no evidence that scientific cooperation prevents military escalation",
            answer:
              'The Cold War. US-Soviet scientific exchanges contributed to de-escalation throughout decades of nuclear standoff. Devyatkin 2024 proves the Arctic Council was nominated for the Nobel Peace Prize specifically for building trust between adversaries.',
          },
          {
            q: 'Does Parikh & Walport say Arctic science specifically regulates AI, or that science leadership broadly enables AI governance?',
            goal: 'No specific mechanism — the link from Arctic research to AI is attenuated and indirect',
            answer:
              "Science leadership broadly — but Hermann 2019 proves Arctic leadership specifically demonstrates US credibility internationally. Credibility is the currency of AI governance forums. You can't shape AI norms without being seen as a serious science actor.",
          },
        ],
      },
      {
        title: 'Attacking inherency — Montgomery, Adler',
        color: 'neg',
        questions: [
          {
            q: "Is the problem that cooperation DOESN'T exist, or that the US has CHOSEN to withdraw from cooperation?",
            goal: "If the problem is US political will under Trump, passing a law doesn't change Trump's enforcement",
            answer:
              "The plan is a federal mandate with appropriated funding — harder to simply ignore than executive preference. And Devyatkin 2025 proves Trump is already pursuing Russia rapprochement, meaning the political will aligns with the plan's direction.",
          },
          {
            q: 'Does Montgomery say scientific cooperation was suspended because of lack of plans, or because of the Ukraine war and Trump policy?',
            goal: "Cause mismatch — the plan doesn't address the actual cause of the breakdown (war + political hostility)",
            answer:
              "Both causes. The plan addresses Trump's cuts by funding cooperation directly. Devyatkin 2025 proves the Ukraine situation is shifting with Trump-Putin rapprochement creating a new opening the plan can capitalize on.",
          },
          {
            q: 'If Trump defunds the plan or reverses it, does the advantage still solve?',
            goal: "Durability question — a Trump administration won't faithfully implement scientific cooperation with Russia",
            answer:
              'Devyatkin 2025 proves Trump is actively pursuing Russia rapprochement — this plan fits his foreign policy. Federal mandates with specific appropriations are harder to defund than discretionary executive programs. And Devyatkin 2024 shows even informal cooperation continues despite political obstacles.',
          },
        ],
      },
    ],
  },
];

// ─── TIMER ───────────────────────────────────────────────────────────────────
function Timer() {
  const [limit, setLimit] = useState(360);
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const ref = useRef(null);
  const toggle = () => {
    if (running) {
      clearInterval(ref.current);
      setRunning(false);
    } else {
      ref.current = setInterval(() => setElapsed((e) => e + 1), 1000);
      setRunning(true);
    }
  };
  const reset = () => {
    clearInterval(ref.current);
    setRunning(false);
    setElapsed(0);
  };
  useEffect(() => () => clearInterval(ref.current), []);
  const remaining = limit - elapsed;
  const pct = Math.max(0, Math.min(1, remaining / limit));
  const col =
    remaining > 60 ? '#3b6d11' : remaining > 15 ? '#ba7517' : '#e24b4a';
  const abs = Math.abs(remaining);
  const fmt = `${remaining < 0 ? '-' : ''}${Math.floor(abs / 60)}:${String(
    abs % 60
  ).padStart(2, '0')}`;
  return (
    <div
      style={{
        background: 'var(--color-background-primary,#fff)',
        border: '0.5px solid var(--color-border-tertiary,rgba(0,0,0,0.1))',
        borderRadius: 10,
        padding: 16,
      }}
    >
      <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 12 }}>
        ⏱ Speech timer
      </div>
      <div
        style={{ display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' }}
      >
        {[
          [360, '6 min'],
          [300, '5 min'],
          [240, '4 min'],
          [180, '3 min'],
          [120, 'CX 2 min'],
        ].map(([s, l]) => (
          <button
            key={s}
            onClick={() => {
              setLimit(s);
              reset();
            }}
            style={{
              padding: '4px 12px',
              borderRadius: 16,
              border: `0.5px solid ${
                limit === s
                  ? '#378add'
                  : 'var(--color-border-secondary,rgba(0,0,0,0.18))'
              }`,
              background: limit === s ? '#e6f1fb' : 'transparent',
              color:
                limit === s ? '#0c447c' : 'var(--color-text-secondary,#666)',
              cursor: 'pointer',
              fontSize: 11,
              fontWeight: 500,
            }}
          >
            {l}
          </button>
        ))}
      </div>
      <div
        style={{
          fontSize: 52,
          fontWeight: 500,
          color: col,
          textAlign: 'center',
          fontVariantNumeric: 'tabular-nums',
          letterSpacing: -1,
          marginBottom: 8,
        }}
      >
        {fmt}
      </div>
      <div
        style={{
          background: 'var(--color-background-secondary,#f1efe8)',
          borderRadius: 4,
          height: 5,
          marginBottom: 14,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${pct * 100}%`,
            height: '100%',
            background: col,
            transition: 'width 0.8s linear,background 0.5s',
            borderRadius: 4,
          }}
        />
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <button
          onClick={toggle}
          style={{
            flex: 1,
            padding: '8px 0',
            borderRadius: 8,
            border: `0.5px solid ${running ? '#e24b4a' : '#378add'}`,
            background: running ? '#fcebeb' : '#e6f1fb',
            color: running ? '#a32d2d' : '#0c447c',
            fontWeight: 500,
            cursor: 'pointer',
            fontSize: 13,
          }}
        >
          {running ? 'Pause' : elapsed > 0 ? 'Resume' : 'Start'}
        </button>
        <button
          onClick={reset}
          style={{
            padding: '8px 16px',
            borderRadius: 8,
            border:
              '0.5px solid var(--color-border-secondary,rgba(0,0,0,0.18))',
            background: 'transparent',
            cursor: 'pointer',
            fontSize: 13,
            color: 'var(--color-text-primary,#333)',
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

function ImpactCalc() {
  const [mag, setMag] = useState(7);
  const [prob, setProb] = useState(6);
  const [time, setTime] = useState(7);
  const score = Math.round((mag * 0.4 + prob * 0.35 + time * 0.25) * 10);
  const col = score > 70 ? '#3b6d11' : score > 45 ? '#ba7517' : '#e24b4a';
  const verdict =
    score > 70
      ? 'Strong — extend this in 2NR/2AR'
      : score > 45
      ? 'Medium — may need backup evidence'
      : 'Weak — find a better card';
  return (
    <div
      style={{
        background: 'var(--color-background-primary,#fff)',
        border: '0.5px solid var(--color-border-tertiary,rgba(0,0,0,0.1))',
        borderRadius: 10,
        padding: 16,
      }}
    >
      <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 14 }}>
        ⚖️ Impact comparison calculator
      </div>
      {[
        ['Magnitude — how big?', mag, setMag],
        ['Probability — how likely?', prob, setProb],
        ['Timeframe — how soon?', time, setTime],
      ].map(([l, v, s]) => (
        <div key={l} style={{ marginBottom: 12 }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: 12,
              marginBottom: 3,
            }}
          >
            <span style={{ color: 'var(--color-text-secondary,#666)' }}>
              {l}
            </span>
            <span style={{ fontWeight: 500 }}>{v}/10</span>
          </div>
          <input
            type="range"
            min={1}
            max={10}
            step={1}
            value={v}
            onChange={(e) => s(Number(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>
      ))}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          padding: '12px 14px',
          background: 'var(--color-background-secondary,#f5f5f3)',
          borderRadius: 8,
          marginTop: 4,
        }}
      >
        <div
          style={{ fontSize: 40, fontWeight: 500, color: col, minWidth: 52 }}
        >
          {score}
        </div>
        <div>
          <div
            style={{
              fontSize: 10,
              color: 'var(--color-text-secondary,#777)',
              marginBottom: 2,
            }}
          >
            weighted impact score
          </div>
          <div style={{ fontSize: 12, fontWeight: 500, color: col }}>
            {verdict}
          </div>
        </div>
      </div>
      <div
        style={{
          fontSize: 10,
          color: 'var(--color-text-tertiary,#aaa)',
          marginTop: 6,
        }}
      >
        Weights: magnitude 40% · probability 35% · timeframe 25%
      </div>
    </div>
  );
}

function EvidTable({ query }) {
  const [sortKey, setSortKey] = useState('side');
  const sideOrder = {
    'OTEC AFF': 0,
    'Research AFF': 1,
    'OTEC NEG': 2,
    'Research NEG': 3,
  };
  const sideColor = {
    'OTEC AFF': 'otec',
    'Research AFF': 'aff',
    'OTEC NEG': 'da',
    'Research NEG': 'neg',
  };
  const filtered =
    query.length > 1
      ? ALL_EVIDENCE.filter((e) =>
          [e.cite, e.side, e.role, e.claim, e.answeredBy]
            .join(' ')
            .toLowerCase()
            .includes(query.toLowerCase())
        )
      : [...ALL_EVIDENCE];
  const sorted = [...filtered].sort((a, b) => {
    if (sortKey === 'side')
      return (sideOrder[a.side] || 99) - (sideOrder[b.side] || 99);
    if (sortKey === 'cite') return a.cite.localeCompare(b.cite);
    return 0;
  });
  return (
    <div>
      <div
        style={{
          display: 'flex',
          gap: 8,
          marginBottom: 10,
          alignItems: 'center',
        }}
      >
        <span
          style={{ fontSize: 11, color: 'var(--color-text-secondary,#777)' }}
        >
          Sort by:
        </span>
        {[
          ['side', 'Case'],
          ['cite', 'Author'],
        ].map(([k, l]) => (
          <button
            key={k}
            onClick={() => setSortKey(k)}
            style={{
              padding: '3px 10px',
              borderRadius: 16,
              border: `0.5px solid ${
                sortKey === k
                  ? '#378add'
                  : 'var(--color-border-secondary,rgba(0,0,0,0.18))'
              }`,
              background: sortKey === k ? '#e6f1fb' : 'transparent',
              color:
                sortKey === k ? '#0c447c' : 'var(--color-text-secondary,#666)',
              cursor: 'pointer',
              fontSize: 11,
            }}
          >
            {l}
          </button>
        ))}
        <span
          style={{
            fontSize: 11,
            color: 'var(--color-text-secondary,#777)',
            marginLeft: 'auto',
          }}
        >
          {sorted.length} / {ALL_EVIDENCE.length} cards
        </span>
      </div>
      <div
        style={{
          border: '0.5px solid var(--color-border-tertiary,rgba(0,0,0,0.1))',
          borderRadius: 10,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.3fr 0.9fr 1fr 2fr 2.2fr',
            background: '#0f1b2d',
            fontSize: 11,
            fontWeight: 500,
            color: '#fff',
          }}
        >
          {[
            'Author / Year',
            'Side',
            'Role',
            'Key Claim',
            'Answered By (specific card)',
          ].map((h) => (
            <div
              key={h}
              style={{
                padding: '9px 10px',
                borderRight: '0.5px solid rgba(255,255,255,0.1)',
              }}
            >
              {h}
            </div>
          ))}
        </div>
        <div style={{ maxHeight: 480, overflowY: 'auto' }}>
          {sorted.map((e, i) => {
            const sc = sideColor[e.side] || 'gray';
            return (
              <div
                key={i}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1.3fr 0.9fr 1fr 2fr 2.2fr',
                  borderBottom:
                    '0.5px solid var(--color-border-tertiary,rgba(0,0,0,0.07))',
                  background:
                    i % 2 === 0
                      ? 'var(--color-background-primary,#fff)'
                      : 'var(--color-background-secondary,#fafaf8)',
                }}
              >
                <div
                  style={{
                    padding: '7px 10px',
                    fontWeight: 500,
                    color: C[sc]?.text || '#333',
                    fontSize: 11,
                    lineHeight: 1.4,
                  }}
                >
                  {e.cite}
                </div>
                <div style={{ padding: '7px 10px' }}>
                  <Pill color={sc} small>
                    {e.side}
                  </Pill>
                </div>
                <div
                  style={{
                    padding: '7px 10px',
                    fontSize: 11,
                    color: 'var(--color-text-secondary,#666)',
                    lineHeight: 1.4,
                  }}
                >
                  {e.role}
                </div>
                <div
                  style={{
                    padding: '7px 10px',
                    fontSize: 11,
                    color: 'var(--color-text-primary,#333)',
                    lineHeight: 1.5,
                  }}
                >
                  {e.claim}
                </div>
                <div
                  style={{
                    padding: '7px 10px',
                    fontSize: 11,
                    color: '#3b6d11',
                    lineHeight: 1.5,
                    fontStyle: 'italic',
                  }}
                >
                  {e.answeredBy}
                </div>
              </div>
            );
          })}
          {sorted.length === 0 && (
            <div
              style={{
                padding: 20,
                textAlign: 'center',
                color: 'var(--color-text-secondary,#777)',
                fontSize: 12,
              }}
            >
              No evidence matches.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── PAGES ────────────────────────────────────────────────────────────────────
function Overview() {
  return (
    <div>
      <div
        style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}
      >
        {[
          [
            '#0f1b2d',
            '#7ec8f0',
            'RESEARCH AFF PLAN',
            'The United States federal government should increase its scientific cooperation with the Russian Federation in the Arctic.',
          ],
          [
            '#1a4a2a',
            '#9fe1cb',
            'OTEC AFF PLAN',
            'The United States federal government should significantly increase its development of the Arctic by providing financial and technical support for Ocean Thermal Energy Conversion systems.',
          ],
        ].map(([bg, ac, label, text]) => (
          <div
            key={label}
            style={{
              background: bg,
              borderRadius: 10,
              padding: '13px 16px',
              flex: 1,
              minWidth: 240,
            }}
          >
            <div
              style={{
                fontSize: 10,
                fontWeight: 500,
                letterSpacing: 0.8,
                color: ac,
                marginBottom: 6,
              }}
            >
              {label}
            </div>
            <p
              style={{
                fontSize: 12,
                color: '#fff',
                lineHeight: 1.65,
                margin: 0,
              }}
            >
              {text}
            </p>
          </div>
        ))}
      </div>
      <SecHead color="aff">
        AFF advantages — all four (click tabs for full evidence)
      </SecHead>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))',
          gap: 12,
          marginBottom: 20,
        }}
      >
        {[
          {
            color: 'aff',
            label: 'Research AFF',
            title: 'Science ADV',
            steps: [
              'Inherency: Trump budget cuts gut US science (Montgomery)',
              'Solvency: Arctic coop restores US science leadership (Hermann 2019)',
              'Impact: Without leadership, AI advances without safeguards → war (Parikh & Walport)',
            ],
          },
          {
            color: 'aff',
            label: 'Research AFF',
            title: 'Russia ADV',
            steps: [
              'Inherency: US-Russia competing over Arctic minerals + nukes (Adler)',
              'Solvency: Scientific coop reduces tensions + builds trust (Devyatkin 2025)',
              'Impact: Arctic conflict → WWIII, nukes, NATO drawn in (Klare)',
            ],
          },
          {
            color: 'otec',
            label: 'OTEC AFF',
            title: 'Warming ADV',
            steps: [
              "Inherency: Arctic 4× faster warming; OTEC overlooked (I.N.N. 2024, O'Reilly 2024)",
              'Solvency: OTEC powers DACCS negative emissions; cost-competitive (Olim 2025, Temiz & Dincer 2022)',
              'Impact: Climate risks societal collapse; billions displaced (Carrington 2024)',
            ],
          },
          {
            color: 'otec',
            label: 'OTEC AFF',
            title: 'Water ADV',
            steps: [
              'Inherency: Global water crisis; Arctic communities face food insecurity',
              "Solvency: OTEC produces freshwater as direct byproduct (O'Reilly 2024)",
              'Impact: Water scarcity → conflict, disease, mass displacement (Klobucista & Robinson 2023)',
            ],
          },
        ].map((a, i) => (
          <div
            key={i}
            style={{
              background: 'var(--color-background-primary,#fff)',
              border: `0.5px solid ${C[a.color].border}`,
              borderLeft: `3px solid ${C[a.color].border}`,
              borderRadius: 10,
              padding: 12,
            }}
          >
            <div
              style={{
                display: 'flex',
                gap: 6,
                alignItems: 'center',
                marginBottom: 8,
              }}
            >
              <Pill color={a.color}>{a.label}</Pill>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: C[a.color].text,
                }}
              >
                {a.title}
              </span>
            </div>
            <ul style={{ paddingLeft: 14, margin: 0 }}>
              {a.steps.map((s, j) => (
                <li
                  key={j}
                  style={{
                    fontSize: 11,
                    color: 'var(--color-text-secondary,#666)',
                    marginBottom: 3,
                    lineHeight: 1.5,
                  }}
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <SecHead color="neg">
        NEG arguments — all eight (click tabs for full evidence)
      </SecHead>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))',
          gap: 12,
        }}
      >
        {[
          {
            color: 'da',
            label: 'OTEC NEG',
            title: 'Russia DA',
            pts: [
              'Uniqueness: Economy stable via oil profits (Fenton & Kolyandr 4/11)',
              'Link: Renewables threaten Russian oil exports (Sokhanvar & Sohag 2022)',
              'Int. Link: Oil = 60% exports, 45% budget (Smith-Nonini 2022)',
              'Impact: Collapse → civil war + nukes (Motyl 2023)',
            ],
          },
          {
            color: 'da',
            label: 'OTEC NEG',
            title: 'Biodiversity DA',
            pts: [
              'Uniqueness: Arctic species on brink (Sommerkorn & Lancaster 2025)',
              'Link: OTEC → algae blooms → dead zones (Tabary-Devisme 2023)',
              'Impact: Arctic biodiversity = all life on Earth (Carmack et al. 2019)',
            ],
          },
          {
            color: 'cp',
            label: 'OTEC NEG',
            title: 'Carbon Tax CP',
            pts: [
              'Text: US adopts carbon tax instead of OTEC',
              'Solvency-Warming: Carbon tax → clean energy (Dowdey 2024)',
              'Solvency-Water: Climate mitigation → water scarcity (Klobucista & Robinson 2023)',
              "Net Benefit: Doesn't disrupt marine ecosystems → no Biodiversity DA",
            ],
          },
          {
            color: 'k',
            label: 'OTEC NEG',
            title: 'Capitalism K',
            pts: [
              'Link: Green tech greenwashes capitalism (Chomsky et al. 2020)',
              'Impact: Capitalism IS root cause of climate (Chomsky et al. 2020)',
              'Alt: Degrowth — plan economy around sustainability (Neumann)',
            ],
          },
          {
            color: 'da',
            label: 'Research NEG',
            title: 'Climate DA',
            pts: [
              'Uniqueness: Arctic Council key to climate coop (Spence et al.)',
              'Link: US leadership → Trump undermines Council (Shankman)',
              'Impact: Climate change = existential threat (Carrington 2024)',
            ],
          },
          {
            color: 'da',
            label: 'Research NEG',
            title: 'EU DA',
            pts: [
              'Uniqueness: EU positioned to lead globally (Broers)',
              'Link: Plan stops EU brain drain (Porter & Cohen)',
              'Int. Link: EU leadership preserves democracy (Broers)',
              'Impact: Democratic decline → wars (Belfield)',
            ],
          },
          {
            color: 'cp',
            label: 'Research NEG',
            title: 'EU Counterplan',
            pts: [
              'Text: EU cooperates with Russia instead of US',
              'Solvency: EU is climate leader, ready for Arctic role (Mayet)',
              "Net Benefit: Doesn't link to Climate DA or EU DA",
            ],
          },
          {
            color: 'k',
            label: 'Research NEG',
            title: 'Colonialism K',
            pts: [
              'Link: US-Russia coop exploits Indigenous peoples (Carlo)',
              'Impact: Structural violence → generational trauma (Paige)',
              'Alt: Center Indigenous sovereignty in Arctic governance',
            ],
          },
        ].map((n, i) => (
          <div
            key={i}
            style={{
              background: 'var(--color-background-primary,#fff)',
              border: `0.5px solid ${C[n.color].border}`,
              borderLeft: `3px solid ${C[n.color].border}`,
              borderRadius: 10,
              padding: 12,
            }}
          >
            <div
              style={{
                display: 'flex',
                gap: 6,
                alignItems: 'center',
                marginBottom: 8,
              }}
            >
              <Pill color={n.color}>{n.label}</Pill>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: C[n.color].text,
                }}
              >
                {n.title}
              </span>
            </div>
            <ul style={{ paddingLeft: 14, margin: 0 }}>
              {n.pts.map((p, j) => (
                <li
                  key={j}
                  style={{
                    fontSize: 11,
                    color: 'var(--color-text-secondary,#666)',
                    marginBottom: 3,
                    lineHeight: 1.5,
                  }}
                >
                  {p}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function ResearchAFF() {
  return (
    <div>
      <SecHead color="aff">
        Key evidence — click to read card text + specific counters
      </SecHead>
      <EvidCard
        color="aff"
        cite="Devyatkin 2024 | The Arctic Institute / The Nation"
        tags={['aff']}
        claim="Arctic coop suspended since 2022 but 100-year history survived Cold War; Russian officials called pause 'regrettable'; depoliticized tradition"
        cardText="The Arctic faces a climate emergency. The United States and Russia should be working together to understand the deepening crisis. Instead, essential cooperation is fractured. Arctic cooperation has a nearly century-long history of successful initiatives based on mutual interest despite political differences. The sharing of data, international polar expeditions, and collaborative research are critical for constructing climate models. In 2022 the Western Arctic states paused the Arctic Council. Russian Arctic officials called the pause 'regrettable' and stressed the legacy of depoliticized dialogue."
        counters={[
          {
            card: 'Spence et al. (Climate DA Uniqueness)',
            arg: "The Arctic Council is fragile — restoring it under Trump's US leadership lets Trump push climate denial into multilateral forums, which is WORSE than leaving it paused.",
          },
          {
            card: 'Shankman (Climate DA Link)',
            arg: "The plan makes Devyatkin's goal impossible — Shankman shows US leadership under Trump undermines the very cooperation Devyatkin calls for.",
          },
          {
            card: '1NC No-Solvency',
            arg: 'Russia has shown no willingness to return while the Ukraine war continues. The plan only controls US action, not Russian response.',
          },
        ]}
      />
      <EvidCard
        color="aff"
        cite="Devyatkin 2025 | The Arctic Institute / The Nation"
        tags={['aff']}
        claim="Arctic warming creates opening for US-Russia cooperation; Trump-Putin rapprochement could reduce nuclear war risk; Arctic is the key region"
        cardText="The Arctic, warming four times faster than the rest of the world, may be the key region for the US and Russia to advance cooperation. US-Russia rapprochement may broadly benefit the world by bringing an end to the disastrous war in Ukraine and reducing the risk of nuclear war, but existential environmental issues still demand attention. The Trump administration has started purging government websites of climate data. It is now the task of civil society to elevate climate change as a concern and pressure the two countries to include climate change in the Arctic cooperation agenda."
        counters={[
          {
            card: 'Shankman (Climate DA Link)',
            arg: "Devyatkin 2025 himself admits Trump is purging climate data — the 'opening' he describes is undermined by the very administration that would execute the plan.",
          },
          {
            card: '1NC No-Solvency',
            arg: "Trump-Putin rapprochement is diplomatic/military; it doesn't require or involve the scientific cooperation mechanism the plan relies on.",
          },
        ]}
      />
      <EvidCard
        color="aff"
        cite="Montgomery | Science ADV Inherency"
        tags={['aff']}
        claim="Trump budget cuts gutting US science; mass firings; science diplomacy needed to restore US credibility and leadership globally"
        cardText="US scientific leadership is under direct assault from budget cuts and mass firing of researchers. The administration has defunded agencies and removed scientists from key roles. Science diplomacy — international cooperation through shared research — is identified as a key mechanism to restore credibility and rebuild the US's global standing in science and technology. Without renewed leadership, the US cedes ground to rivals."
        counters={[
          {
            card: 'Porter & Cohen (EU DA Link)',
            arg: 'Montgomery proves the exact conditions driving scientists to Europe — the plan reversing those conditions cuts off the brain drain the EU needs to become a science leader.',
          },
          {
            card: '1NC No-Solvency — Trump Cuts',
            arg: 'The plan increases cooperation, but Trump gutted the agencies that would do the cooperating. Even if Russia agrees, the US side is broken.',
          },
        ]}
      />
      <EvidCard
        color="aff"
        cite="Hermann 2019 | Arctic Institute"
        tags={['aff']}
        claim="Arctic cooperation key to restoring overall US science leadership; US is currently a weak Arctic power with only 2 icebreakers vs Russia's 41"
        cardText="The United States is often described as the reluctant Arctic nation, whose potential to become a circumpolar superpower remains largely unrealized. With no strong fleet of icebreakers, no membership in UNCLOS, and no strategic vision for the region's future, the US lags behind every other Arctic nation state. In stark contrast to Russia's 41 icebreakers, the US fleet can only boast of two operational vessels. Put bluntly, the United States is currently a weak Arctic power — a position which will undermine its military, energy, and economic security and limit its role as a global science leader."
        counters={[
          {
            card: 'Mayet (EU CP Solvency)',
            arg: 'The EU CP solves this better — Mayet says EU is already a leading climate actor and ready to lead Arctic science without needing icebreakers or UNCLOS membership.',
          },
          {
            card: '1NC No-Solvency — Coop Dead',
            arg: 'Russia controls access with 41 icebreakers. Without Russian operational cooperation, US Arctic science leadership remains unrealized regardless of the plan.',
          },
        ]}
      />
      <EvidCard
        color="aff"
        cite="Parikh & Walport | Science ADV Impact"
        tags={['aff']}
        claim="Scientific leadership needed to safely regulate AI advancing without safeguards — increases global tensions and war risk"
        cardText="Artificial intelligence and other emerging technologies are advancing rapidly without proper regulatory frameworks. Scientific leadership determines who shapes those frameworks internationally. Without strong US scientific leadership, the most powerful nations setting AI norms may not prioritize safety, transparency, or democratic accountability. AI capabilities advancing faster than governance creates systemic risk of catastrophic outcomes."
        counters={[
          {
            card: '1NC No-Impact (Science ADV)',
            arg: 'Too many speculative steps: Arctic science → US leadership → AI governance → preventing war. Ask in CX: what is the specific mechanism connecting Arctic research to AI regulation?',
          },
          {
            card: 'Belfield (EU DA Impact)',
            arg: "EU leadership, not US leadership, is what's needed to regulate AI — Belfield says EU must prevent authoritarians from shaping international norms, which is exactly the AI governance problem.",
          },
        ]}
      />
      <EvidCard
        color="aff"
        cite="Adler | Russia ADV Inherency"
        tags={['aff']}
        claim="US-Russia competing over Arctic minerals, trade routes, and nuclear weapons storage — strategic environment creates escalation risk"
        cardText="The United States and Russia are locked in an accelerating competition over the Arctic. The region contains vast mineral deposits and potential new shipping routes as ice melts. Russia uses the Arctic as a staging ground and storage site for nuclear weapons. The combination of strategic resources and nuclear capabilities in an ungoverned space creates escalation risks more acute than traditional conflict theaters."
        counters={[
          {
            card: '1NC No-Inherency',
            arg: "The Ukraine war IS the inherency — all these tensions pre-date the plan and aren't caused by a lack of scientific cooperation. The plan can't fix a military conflict.",
          },
          {
            card: 'Mayet (EU CP)',
            arg: "EU science diplomacy can reduce Arctic tensions without requiring US-Russia cooperation that's blocked by the Ukraine war.",
          },
        ]}
      />
      <EvidCard
        color="aff"
        cite="Klare | Russia ADV Impact"
        tags={['aff']}
        claim="Arctic conflict → WWIII — Russia deploys nuclear weapons in region + NATO allies drawn in + no conflict management mechanisms"
        cardText="If conflict broke out in the Arctic, the unique combination of factors — Russian nuclear weapons deployed in the region, US and NATO allies with competing claims, and the absence of established conflict management mechanisms — creates conditions where local skirmishes could rapidly escalate to global war. The Arctic is one of the few places where Russia has both a dense nuclear presence and strategic stakes high enough to consider first use of nuclear weapons if threatened."
        counters={[
          {
            card: '1NC No-Impact — Russia ADV',
            arg: 'Deterrence has worked for 80 years. The nuclear taboo is strong. US-Russia Arctic tensions have existed for decades without WWIII. Klare is speculative worst-case thinking.',
          },
          {
            card: 'Motyl 2023 (cross-apply from OTEC NEG)',
            arg: 'Motyl says Russian collapse + nuclear weapons is the bigger risk — meaning internal instability, not Arctic conflict, is the nuclear pathway judges should care about.',
          },
        ]}
      />
      <SecHead color="neg">
        2AC answers to Research NEG — each cites the specific counter-card
      </SecHead>
      <AnswerBlock
        color="da"
        title="Climate DA — 2AC answers"
        their="US science leadership gives Trump a platform to undermine Arctic Council climate cooperation (Shankman)"
        answers={[
          {
            card: 'Devyatkin 2024',
            arg: 'Non-unique — cooperation was already suspended since 2022. The plan IMPROVES the status quo by restoring data sharing. Devyatkin proves the 100-year tradition depoliticizes the relationship.',
          },
          {
            card: 'I.N.N. 2024',
            arg: "No link — more Arctic scientific data documenting 4× warming and 13%/decade ice loss makes Trump's denialism harder, not easier. The data is the antidote to denial.",
          },
          {
            card: 'Carrington 2024 cross-apply',
            arg: "Turn — the DA's own impact card proves climate change is catastrophic, which is precisely why AFF's plan (restoring scientific infrastructure to fight it) is necessary.",
          },
        ]}
      />
      <AnswerBlock
        color="da"
        title="EU DA — 2AC answers"
        their="Plan boosts US leadership → stops EU brain drain → harms EU leadership → democracy collapses (Broers/Belfield)"
        answers={[
          {
            card: 'Montgomery',
            arg: "No link — brain drain is structural (systematic defunding across ALL sectors). One Arctic cooperation program won't reverse trends driven by wages, visas, and political climate.",
          },
          {
            card: 'Broers (Int. Link)',
            arg: "No internal link — Broers says EU leadership comes from institutions and rules-based order, not scientific personnel. EU's democratic role is institutional, not based on who has the most labs.",
          },
          {
            card: 'Devyatkin 2024',
            arg: 'Turn — strong US-Russia scientific cooperation models international cooperation, which strengthens the democratic norms Belfield says are at risk.',
          },
          {
            card: 'Klare',
            arg: "Impact comparison — Klare's nuclear WWIII is larger in magnitude than Belfield's democratic decline chain. Even if EU DA is true, Russia ADV outweighs.",
          },
        ]}
      />
      <AnswerBlock
        color="cp"
        title="EU CP — 2AC answers"
        their="EU cooperates with Russia in Arctic instead of US — solves advantages without DAs (Mayet)"
        answers={[
          {
            card: 'Devyatkin 2024 + 2025',
            arg: "Permutation — do both plan AND EU CP. They're not mutually exclusive. Devyatkin shows US + EU cooperation with Russia is both possible and desirable.",
          },
          {
            card: 'Hermann 2019',
            arg: "Solvency deficit — the Science ADV problem is US scientific leadership declining. Only the US can restore US credibility. Mayet's EU leads for the EU.",
          },
          {
            card: 'Adler + Klare',
            arg: "Solvency deficit — Adler proves the specific problem is US-RUSSIA tensions. EU cooperation (Mayet) doesn't reduce US-Russia conflict; only US-Russia coop does.",
          },
        ]}
      />
      <AnswerBlock
        color="k"
        title="Colonialism K — 2AC answers"
        their="US-Russia Arctic cooperation exploits Indigenous peoples (Carlo); structural violence causes generational trauma (Paige)"
        answers={[
          {
            card: 'Devyatkin 2024',
            arg: 'Permutation — do plan AND include Indigenous peoples. Devyatkin shows cooperative frameworks can be designed with Indigenous consultation built in.',
          },
          {
            card: 'I.N.N. 2024',
            arg: 'No link — scientific cooperation is not resource extraction. I.N.N. shows Arctic warming is destroying Indigenous food security; the plan fights that, which helps Indigenous communities.',
          },
          {
            card: 'Paige (cross-apply)',
            arg: "Alt fails — generational trauma (Paige) is made WORSE by climate change destroying Arctic ecosystems. 'Centering voices' without technical action doesn't prevent the warming threatening Indigenous survival.",
          },
        ]}
      />
    </div>
  );
}

function ResearchNEG() {
  return (
    <div>
      <SecHead color="da">Climate DA — evidence cards</SecHead>
      <EvidCard
        color="da"
        cite="Spence et al. | Climate DA Uniqueness"
        tags={['da']}
        claim="Arctic Council critical to climate science cooperation — currently functioning but fragile under political pressure"
        cardText="The Arctic Council represents the primary multilateral forum for coordinated action on Arctic climate science. The relationship between Arctic conditions and global climate systems makes this cooperation uniquely valuable. Changes in Arctic sea ice directly affect global weather patterns, ocean circulation, and sea levels worldwide. This cooperation currently functions but is fragile under political pressure from any member state, particularly the most powerful one."
        counters={[
          {
            card: 'Devyatkin 2024',
            arg: "Non-unique — the Arctic Council is ALREADY paused since 2022. The plan restores it; Spence's fragility concerns are about the status quo, not the plan.",
          },
          {
            card: 'Devyatkin 2024 (Solvency)',
            arg: 'Turn — Devyatkin proves scientific cooperation builds norms that depoliticize Arctic governance. The plan makes the Arctic Council MORE resilient.',
          },
        ]}
      />
      <EvidCard
        color="da"
        cite="Shankman | Climate DA Link"
        tags={['da']}
        claim="US science leadership = Trump gets platform to push climate denial into Arctic Council multilateral forums"
        cardText="The Trump administration has consistently denied climate science and withdrawn from international climate commitments. Allowing the United States to lead scientific cooperation in the Arctic would give the Trump administration a platform to push climate denial into multilateral forums. This is not hypothetical — the administration has already suppressed scientific findings and removed climate language from official documents."
        counters={[
          {
            card: 'I.N.N. 2024',
            arg: "No link — more Arctic scientific data documenting 4× warming makes Trump's denialism harder, not easier. The data is the antidote.",
          },
          {
            card: 'Devyatkin 2024',
            arg: "Non-unique — Trump is ALREADY doing this without the plan. Devyatkin shows Trump is already purging data; the plan doesn't change Trump's behavior.",
          },
        ]}
      />
      <EvidCard
        color="da"
        cite="Carrington 2024 | The Guardian / Bioscience"
        tags={['da']}
        claim="Climate change risks life on Earth; 25/35 vital signs at record extremes; millions displaced already; could displace billions"
        cardText="Many of Earth's vital signs have hit record extremes, indicating that the future of humanity hangs in the balance. 25 of 35 vital signs worse than ever recorded. We're already in the midst of abrupt climate upheaval, which jeopardises life on Earth like nothing humans have ever seen. Only 6% of senior climate experts believe the 1.5°C limit will be met."
        counters={[
          {
            card: 'Carrington 2024 cross-apply (AFF Impact)',
            arg: "This card is shared — AFF also uses it for the Warming ADV impact. The DA claiming AFF worsens climate contradicts the plan's explicit goal of fighting warming.",
          },
          {
            card: 'Devyatkin 2024',
            arg: "Turn — Arctic scientific cooperation is exactly what's needed to address the crisis Carrington describes. The plan fights the impact.",
          },
        ]}
      />
      <SecHead color="da">EU DA — evidence cards</SecHead>
      <EvidCard
        color="da"
        cite="Broers (Uniqueness) | EU DA"
        tags={['da']}
        claim="As US becomes isolationist, EU is positioned to take over as global leader — this opportunity must be seized now"
        cardText="The European Union is experiencing a rare moment of opportunity. As the United States retreats from global leadership, the EU is stepping into the vacuum and positioning itself as the anchor of the rules-based international order."
        counters={[
          {
            card: 'Montgomery',
            arg: "Non-unique — Montgomery proves US is already retreating systematically. The plan is a targeted intervention, not a reversal of isolationism. EU's window remains open.",
          },
          {
            card: 'Devyatkin 2024',
            arg: 'Turn — US-Russia scientific cooperation in the Arctic actually strengthens the rules-based order Broers says the EU needs to protect.',
          },
        ]}
      />
      <EvidCard
        color="da"
        cite="Porter & Cohen | EU DA Link"
        tags={['da']}
        claim="EU recruiting scientists fleeing US to build leadership; plan reverses this critical brain drain the EU needs"
        cardText="The exodus of scientists from the United States under the current political climate is a windfall for European institutions. Research universities and institutes across Europe are actively recruiting American researchers. The plan would signal renewed US investment in science, reversing the conditions driving scientists to Europe — removing the very resource the EU needs to build its scientific leadership capacity."
        counters={[
          {
            card: 'Montgomery',
            arg: "No link — Montgomery proves brain drain is structural (systematic defunding across ALL sectors). One Arctic cooperation program won't reverse trends driven by wages, visas, and political climate.",
          },
          {
            card: 'Hermann 2019',
            arg: "No internal link — US Arctic weakness is the problem; fixing it doesn't prevent EU growth. US and EU scientific leadership can both grow simultaneously.",
          },
        ]}
      />
      <EvidCard
        color="da"
        cite="Broers (Internal Link) | EU DA"
        tags={['da']}
        claim="Strong EU leadership specifically needed to preserve democracy and prevent authoritarians from shaping international norms"
        cardText="Strong EU leadership is necessary to preserve the liberal democratic order against authoritarian states like Russia and China, which are actively working to reshape international norms in ways antithetical to democracy."
        counters={[
          {
            card: 'Adler + Klare (Russia ADV)',
            arg: "AFF's Russia ADV outweighs — nuclear WWIII from Arctic conflict (Klare) is larger in magnitude than Belfield's democratic decline chain. Vote AFF.",
          },
          {
            card: 'Devyatkin 2024',
            arg: 'Turn — US-Russia scientific cooperation models depoliticized dialogue that strengthens democratic norms against authoritarian encroachment.',
          },
        ]}
      />
      <EvidCard
        color="da"
        cite="Belfield | EU DA Impact"
        tags={['da']}
        claim="Democratic decline globally risks wars and hinders humanity's ability to cooperate on existential threats"
        cardText="The erosion of democracy globally has historically been a precursor to large-scale conflict. Democracies are significantly better at cooperating on existential challenges — climate change, pandemic preparedness, AI governance — than authoritarian regimes. Democratic backsliding therefore simultaneously increases the probability of war AND reduces humanity's capacity to respond to shared threats."
        counters={[
          {
            card: 'Klare (Russia ADV Impact)',
            arg: "Magnitude comparison — Klare's nuclear WWIII from Arctic conflict is larger and more certain than Belfield's democratic-decline-to-war chain. Vote AFF on magnitude.",
          },
          {
            card: 'Parikh & Walport',
            arg: 'Turn — Belfield says democracy is needed to cooperate on existential threats. Parikh & Walport say US science leadership maintains those cooperative mechanisms. AFF restores both.',
          },
        ]}
      />
      <SecHead color="cp">EU CP & Colonialism K</SecHead>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))',
          gap: 12,
        }}
      >
        {[
          {
            color: 'cp',
            title: 'EU Counterplan — full strategy',
            items: [
              [
                'Text',
                'The European Union should increase its scientific cooperation with Russia in the Arctic.',
              ],
              [
                'Solvency (Mayet)',
                'EU is climate leader and ready for Arctic leadership — solves Science ADV (EU as leader) AND Russia ADV (European diplomacy reduces tension).',
              ],
              [
                'Net benefit',
                "Doesn't link to Climate DA (EU, not Trump's US, leads) or EU DA (EU gains leadership instead of being undercut).",
              ],
              [
                'Answer perm',
                "Plan LINKS to both DAs because US involvement is the problem — you can't perm away the link.",
              ],
            ],
          },
          {
            color: 'k',
            title: 'Colonialism K — full strategy',
            items: [
              [
                'Link (Carlo)',
                "US-Russia coop treats Arctic as a research zone, ignoring Indigenous peoples' sovereignty. Carlo documents ongoing exploitation by researchers and governments.",
              ],
              [
                'Impact (Paige)',
                'Years of structural violence caused generational trauma in Arctic Indigenous communities.',
              ],
              [
                'Alt',
                'Center Indigenous peoples in Arctic governance — their knowledge, leadership, and consent must come first.',
              ],
              [
                'Answer perm',
                'Doing the plan WITH Indigenous permission still links — the framework of governments negotiating over Indigenous land IS the colonial structure.',
              ],
            ],
          },
        ].map((card) => (
          <div
            key={card.title}
            style={{
              background: 'var(--color-background-primary,#fff)',
              border: `0.5px solid ${C[card.color].border}`,
              borderLeft: `3px solid ${C[card.color].border}`,
              borderRadius: 10,
              padding: 12,
            }}
          >
            <div
              style={{
                fontSize: 12,
                fontWeight: 500,
                color: C[card.color].text,
                marginBottom: 8,
              }}
            >
              <Pill color={card.color}>{card.color === 'cp' ? 'CP' : 'K'}</Pill>{' '}
              {card.title}
            </div>
            {card.items.map(([k, v]) => (
              <div key={k} style={{ marginBottom: 5 }}>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 500,
                    color: C[card.color].text,
                  }}
                >
                  {k}:{' '}
                </span>
                <span
                  style={{
                    fontSize: 11,
                    color: 'var(--color-text-primary,#333)',
                  }}
                >
                  {v}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function OTECAff() {
  return (
    <div>
      <SecHead color="otec">
        Evidence cards — click to read card text + specific counters
      </SecHead>
      <EvidCard
        color="otec"
        cite="O'Reilly 2024 | PhD Cambridge | Terracline"
        tags={['otec']}
        claim="OTEC promising but overlooked; critical for desalination; lacks government support — exactly what the plan provides"
        cardText="Ocean thermal energy conversion (OTEC) stands out as a promising yet often overlooked technology. By exploiting the temperature differences between warm surface waters and the icy depths, OTEC can generate electricity and even provide cooling solutions, all while contributing to a more sustainable future. As the world grapples with the effects of climate change, innovative solutions like OTEC are crucial. Another impactful application of OTEC is its contribution to desalination processes — OTEC produces freshwater as a byproduct, directly solving the Water ADV."
        counters={[
          {
            card: 'Tabary-Devisme 2023 (Biodiversity DA Link)',
            arg: "The reason OTEC is 'overlooked' is its contested environmental repercussions — Tabary-Devisme shows the 'overlooked' status reflects unresolved concerns about algae blooms and dead zones.",
          },
          {
            card: '1NC No-Solvency',
            arg: "OTEC has been called 'promising' since Georges Claude built the first plant in 1930 — 95 years of 'promise' without commercial viability. Government support alone won't overcome structural barriers.",
          },
        ]}
      />
      <EvidCard
        color="otec"
        cite="I.N.N. 2024 | Innovation News Network"
        tags={['otec']}
        claim="Arctic warming 4× faster than global average; 17 lowest sea ice extents all since 2007; 13%/decade decline; Greenland = 20-ft sea rise"
        cardText="The Arctic is warming up to four times faster than the global average — Arctic amplification. In 2023, the Arctic recorded its warmest summer to date, surpassing the 1991-2020 baseline by over 4°C. The 17 lowest sea ice extents on record have all occurred since 2007. Sea ice extent during September has declined approximately 13% per decade since the 1980s. Greenland ice sheet melting alone could raise sea levels by over 20 feet if fully destabilized."
        counters={[
          {
            card: 'Sommerkorn & Lancaster 2025 (Biodiversity DA)',
            arg: "Non-unique for biodiversity — Sommerkorn proves Arctic species are ALREADY 'on the brink' from warming. The DA impact is already occurring; OTEC adds harm on top of existing harm.",
          },
          {
            card: 'Tabary-Devisme 2023',
            arg: 'Turn — Tabary-Devisme says OTEC disrupts ocean thermal gradients. In a rapidly warming Arctic (I.N.N.), the temperature differentials OTEC exploits are themselves unstable.',
          },
        ]}
      />
      <EvidCard
        color="otec"
        cite="Temiz & Dincer 2022 | University of Ontario | Energy Journal"
        tags={['otec']}
        claim="OTEC specifically viable in Arctic environments; energy source 'almost unlimited'; Arctic communities uniquely vulnerable to climate impacts"
        cardText="Arctic regions have been experiencing drastic effects of climate change more intense than the rest of the globe. Global climate change exacerbates food insecurity for arctic communities through declining wildlife populations. OTEC is a promising renewable energy technology that can be used in an arctic environment. OTEC systems can exploit the temperature difference between the air ambient temperature and ocean/water temperature. Although the energy source is almost unlimited, the conversion efficiency is lower compared to other renewable energy conversion methods."
        counters={[
          {
            card: 'Tabary-Devisme 2023 (Biodiversity DA Link)',
            arg: 'Temiz & Dincer confirm OTEC brings cold deep water to the surface — this is exactly the mechanism Tabary-Devisme says creates algae blooms and dead zones in Arctic waters.',
          },
          {
            card: '1NC No-Solvency',
            arg: 'Temiz & Dincer admit the conversion efficiency is lower than other renewables. In the Arctic, with limited temperature differential compared to tropics, efficiency may be too low for commercial viability.',
          },
        ]}
      />
      <EvidCard
        color="otec"
        cite="Olim et al. 2025 | Nature | University of Victoria"
        tags={['otec', 'otec']}
        claim="OTEC powers DACCS carbon capture; $0.04–$0.24/kWh competitive with coal; 3 TW × 500 years without adverse ocean effects — published in Nature"
        cardText="OTEC-generated electricity could power liquid solvent based DACCS in terrestrial facilities or solid sorbent based DACCS in marine conditions — capturing CO₂ and sequestering it in offshore storage sites. The LCOE of OTEC ranges from $0.04 to $0.24 USD₂₀₂₃/kWh — competitive with coal-fired electricity at $0.09–$0.14/kWh. The UVic Earth System Climate Model revealed that 3 TW of OTEC could be sustained for at least 500 years without substantial adverse effects on ocean circulation or its physical and chemical properties. Published in Nature."
        counters={[
          {
            card: 'Tabary-Devisme 2023 (Biodiversity DA Link)',
            arg: "Olim's 500-year model covers GLOBAL thermohaline circulation — Tabary-Devisme is about LOCAL dead zones from individual discharge points. Different scale, different mechanism; Olim doesn't directly answer Tabary-Devisme.",
          },
          {
            card: 'Motyl 2023 (Russia DA Impact)',
            arg: 'Even if OTEC is cost-competitive and safe, scaling it globally still disrupts Russian oil markets (Sokhanvar), triggering the Russia DA regardless of whether ocean effects occur.',
          },
        ]}
      />
      <EvidCard
        color="otec"
        cite="Carrington 2024 | The Guardian / Bioscience"
        tags={['otec']}
        claim="25/35 vital signs at record extremes; climate risks societal collapse; already displaced millions; could displace billions"
        cardText="Many of Earth's vital signs have hit record extremes, indicating that the future of humanity hangs in the balance. 25 of 35 vital signs worse than ever recorded. We're already in the midst of abrupt climate upheaval, which jeopardises life on Earth like nothing humans have ever seen. Only 6% of senior climate experts believe the 1.5°C limit will be met. Climate change has already displaced millions with potential to displace hundreds of millions or billions."
        counters={[
          {
            card: 'Motyl 2023 (Russia DA Impact)',
            arg: "Impact comparison — Motyl's nuclear collapse scenario is more certain and faster than Carrington's societal collapse. Vote NEG on timeframe.",
          },
          {
            card: 'Carmack et al. 2019 (Biodiversity DA Impact)',
            arg: 'DA turns case — if OTEC triggers biodiversity collapse (Carmack), it worsens climate, producing the exact Carrington impact AFF is trying to prevent.',
          },
        ]}
      />
      <SecHead color="neg">
        2AC answers to OTEC NEG — each cites the specific counter-card
      </SecHead>
      <AnswerBlock
        color="da"
        title="Russia DA — 2AC answers"
        their="OTEC disrupts Russian oil → economic collapse → civil war + nuclear weapons (Motyl 2023)"
        answers={[
          {
            card: 'I.N.N. 2024',
            arg: "Non-unique — global energy transition is already happening at 15%/year growth. One Arctic OTEC program is a fraction of that. Russia's vulnerability exists without the plan.",
          },
          {
            card: 'Olim et al. 2025',
            arg: "No link — Olim models OTEC at 3 TW globally. A single US Arctic program won't move global oil markets. The link requires total global renewable displacement, not one program.",
          },
          {
            card: 'Fenton & Kolyandr 4/11 (cross-apply Uniqueness)',
            arg: "Turn using their own card — Fenton says Russia 'weathered the storm dramatically better than expected' under full Western sanctions. If full sanctions didn't collapse them, one OTEC program won't.",
          },
          {
            card: 'Carrington 2024',
            arg: 'Impact comparison — climate change displacing billions (Carrington) is larger in magnitude and more certain than Russian economic instability leading to nuclear civil war (Motyl).',
          },
        ]}
      />
      <AnswerBlock
        color="da"
        title="Biodiversity DA — 2AC answers"
        their="OTEC alters ocean → algae blooms → dead zones → Arctic biodiversity collapse (Tabary-Devisme 2023)"
        answers={[
          {
            card: 'Sommerkorn & Lancaster 2025 (cross-apply Uniqueness)',
            arg: "Non-unique using THEIR OWN card — Sommerkorn proves Arctic species are ALREADY 'on the brink' from warming WITHOUT the plan. The DA impact is already occurring.",
          },
          {
            card: 'Olim et al. 2025 (Nature)',
            arg: "No link — Olim's 500-year model in Nature confirms no adverse effects on ocean circulation or chemical properties at 3 TW. This directly answers Tabary-Devisme's concern.",
          },
          {
            card: 'I.N.N. 2024',
            arg: "Turn — I.N.N. proves Arctic warming is THE biggest threat to biodiversity (sea ice loss, habitat destruction). OTEC reduces warming, saving more species than Tabary-Devisme's algae blooms could harm.",
          },
          {
            card: 'Carrington 2024',
            arg: "Impact comparison — Carrington's climate collapse is larger than Carmack's biodiversity-to-food-chain argument. Even if DA is true, case outweighs.",
          },
        ]}
      />
      <AnswerBlock
        color="cp"
        title="Carbon Tax CP — 2AC answers"
        their="Carbon tax does everything OTEC does without harming oceans (Dowdey 2024, Klobucista 2023)"
        answers={[
          {
            card: 'Olim et al. 2025',
            arg: "Solvency deficit — Dowdey's carbon tax reduces NEW emissions, but Olim proves OTEC+DACCS achieves NEGATIVE emissions by removing CO₂ already in atmosphere. Carbon tax can't do this.",
          },
          {
            card: "O'Reilly 2024",
            arg: "Solvency deficit — O'Reilly proves OTEC produces freshwater directly through desalination. Klobucista's carbon tax only helps water INDIRECTLY through climate mitigation.",
          },
          {
            card: 'Sokhanvar & Sohag 2022 (cross-apply Russia DA)',
            arg: "Links to net benefit — if the carbon tax works (Dowdey), it also discourages fossil fuel use, threatening Russian oil exports (Sokhanvar). The net benefit isn't unique to the CP.",
          },
          {
            card: 'Olim et al. 2025',
            arg: "Permutation — do both. Olim shows OTEC addresses the supply side (carbon removal); Dowdey's tax addresses the demand side (emission reduction). Both needed simultaneously.",
          },
        ]}
      />
      <AnswerBlock
        color="k"
        title="Capitalism K — 2AC answers"
        their="OTEC perpetuates capitalism; capitalism causes climate change (Chomsky et al. 2020)"
        answers={[
          {
            card: 'Olim et al. 2025',
            arg: "No link — federal government funding OTEC is public investment in public infrastructure, not the private profit-seeking Chomsky describes. Chomsky's argument targets corporations, not federal programs.",
          },
          {
            card: 'Carrington 2024',
            arg: "Turn — Carrington proves billions face displacement NOW. Waiting for capitalism to collapse before acting (Neumann's degrowth) means billions die in the meantime.",
          },
          {
            card: 'Olim et al. 2025',
            arg: "Alt fails — degrowth doesn't remove CO₂ already in the atmosphere. Olim's DACCS does. Even if degrowth is correct, OTEC+DACCS is still needed to address existing CO₂.",
          },
          {
            card: 'I.N.N. 2024',
            arg: "Permutation — implement the plan AND pursue systemic change. I.N.N. proves Arctic warming requires urgent technical intervention NOW; we can't wait for the alternative.",
          },
        ]}
      />
    </div>
  );
}

function OTECNeg() {
  return (
    <div>
      <SecHead color="da">Russia DA — evidence cards</SecHead>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))',
          gap: 10,
        }}
      >
        {[
          {
            cite: 'Fenton & Kolyandr 4/11 | CSIS',
            claim:
              'Russian economy surviving sanctions because of hydrocarbon profits — stable now but critically oil-dependent',
            text: "Russia's economy has 'weathered the storm dramatically better than expected.' Growth rates remain impressive. Continued Russian profits from hydrocarbon exports allowed the Russian state to postpone and limit the kinds of spending trade-offs the sanctions regime was designed to cause.",
            counters: [
              {
                card: 'Olim et al. 2025',
                arg: "One Arctic program ≪ total energy transition. Fenton's oil dependency exists at global scale; one OTEC program doesn't move global oil markets.",
              },
              {
                card: 'Carrington 2024',
                arg: "Non-unique — Fenton says economy has 'weathered the storm.' If Russia survived total Western sanctions, one OTEC program won't destabilize what sanctions couldn't.",
              },
            ],
          },
          {
            cite: 'Sokhanvar & Sohag 2022 | Energy Science & Engineering',
            claim:
              'Renewables proven substitute for Russian oil — export value, volume, AND GDP share ALL negatively affected by energy transition',
            text: "The findings reveal the risks facing Russian oil exports. Renewable energy has been a substitute for oil in oil-importing countries — this finding is robust across different models. Russian oil export VALUE, export VOLUME, and the GDP share of oil export value are ALL affected negatively by the energy transition of Russia's oil trade partners.",
            counters: [
              {
                card: 'Olim et al. 2025',
                arg: 'Sokhanvar covers total global energy transition — one Arctic OTEC program is a marginal fraction. The link requires global adoption, not one US program.',
              },
              {
                card: 'I.N.N. 2024',
                arg: "Turn — I.N.N. proves warming is already destabilizing Russia's Arctic resources. The transition is happening regardless; OTEC accelerates what's already underway.",
              },
            ],
          },
          {
            cite: 'Smith-Nonini 2022 | UNC Chapel Hill',
            claim:
              'Oil = 60% exports, 45% budget, 15–25% GDP — resource curse makes Russia uniquely vulnerable to energy transition shocks',
            text: 'It is hard to overstate the centrality of hydrocarbons to the Russian economy. Oil and gas make up 60% of exports and 45% of 2021 budget revenues. Fossil energy has ranged from 15–25% of Russian GDP, with 80% of that revenue from oil. To build your economy too tightly around oil and gas is a very bad idea for democracy and social development.',
            counters: [
              {
                card: 'Fenton & Kolyandr 4/11',
                arg: "Fenton 2025 is NEWER and shows Russia adapted. The resource curse hasn't caused collapse despite 3+ years of full Western sanctions.",
              },
              {
                card: 'Olim et al. 2025',
                arg: "No internal link — Smith-Nonini proves structural vulnerability, but the plan's scale is too small to trigger that vulnerability.",
              },
            ],
          },
          {
            cite: 'Motyl 2023 | Rutgers / Foreign Policy',
            claim:
              "Economic shock → Russian collapse → civil war + thousands of nuclear weapons in a 'contested vacuum' (Kissinger)",
            text: "Putin's Russia suffers from mutually reinforcing tensions. Even though few may want Russia's dissolution today, it's not too difficult to imagine a scenario where growing instability will compel Russia's constituent units to seek independence. Kissinger warned dissolution could turn Russia's '11 time zones into a contested vacuum.' All these dangers would be compounded by the presence of thousands of nuclear weapons.",
            counters: [
              {
                card: 'Carrington 2024',
                arg: "Impact comparison — Carrington's climate collapse (billions displaced) is larger in magnitude and faster in timeframe than Motyl's speculative nuclear civil war scenario.",
              },
              {
                card: 'Fenton & Kolyandr 4/11',
                arg: "Non-unique — Motyl describes structural fragilities that exist NOW. Fenton shows Russia survived full sanctions; OTEC doesn't add the 'trigger' Motyl describes.",
              },
            ],
          },
        ].map((e, i) => (
          <EvidCard
            key={i}
            color="da"
            cite={e.cite}
            tags={['da']}
            claim={e.claim}
            cardText={e.text}
            counters={e.counters}
          />
        ))}
      </div>
      <SecHead color="da">Biodiversity DA — evidence cards</SecHead>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))',
          gap: 10,
        }}
      >
        {[
          {
            cite: 'Sommerkorn & Lancaster 2025 | WWF Arctic',
            claim:
              'Arctic species on brink now; sea ice −13%/decade; tundra halves by 2050; caribou −60% — fragile but recoverable without additional OTEC harm',
            text: 'Sea ice extent is currently shrinking at approximately 13% per decade. The sea ice ecosystem provides habitat for unique Arctic species from algae and fish to polar bears and walrus. Arctic tundra is forecast to halve by 2050. Barren-ground caribou numbers have already declined by 60% in the past two decades.',
            counters: [
              {
                card: 'Olim et al. 2025',
                arg: "Non-unique — Sommerkorn proves biodiversity is collapsing from warming WITHOUT OTEC. Olim answers the link by showing OTEC doesn't add adverse ocean effects.",
              },
              {
                card: 'I.N.N. 2024',
                arg: "Turn — I.N.N. proves warming is destroying the sea ice habitat Sommerkorn describes. OTEC reduces warming. Without AFF, Sommerkorn's projections get worse.",
              },
            ],
          },
          {
            cite: 'Tabary-Devisme 2023 | Catalyst / McGill',
            claim:
              'OTEC thermal discharge disrupts temperature gradients; nutrient upwelling → algae blooms (HABs) → dead zones; transboundary international effects',
            text: "OTEC functions by harnessing temperature differentials and releasing cold water as a byproduct. This can disrupt the temperature gradient in the vicinity of the OTEC plant. The increased mixing of nutrient-rich deep waters at the surface can increase algae blooms (HABs), which result in the poisoning of shellfish, lead to respiratory problems in coastal populations, and reduce oxygen availability — creating 'dead zones.' These blooms have transboundary effects and can impact multiple countries simultaneously.",
            counters: [
              {
                card: 'Olim et al. 2025 (Nature)',
                arg: "No link — Olim's Nature study specifically models OTEC at 3 TW and finds NO adverse effects on ocean circulation. This directly rebuts Tabary-Devisme's concern.",
              },
              {
                card: 'Temiz & Dincer 2022',
                arg: "No link — Temiz & Dincer found OTEC viable in Arctic environments with proper engineering. Tabary-Devisme's concerns apply to unregulated deployment, not a carefully designed government program.",
              },
            ],
          },
          {
            cite: 'Carmack et al. 2019 | World Economic Forum',
            claim:
              'Arctic Ocean critical driver of global oceanic conveyor belt; biodiversity collapse destroys food chains vital for all life on Earth',
            text: "There are four reasons why the Arctic Ocean is distinct and critical to our planet's survival. While this relatively small marine environment holds only 1% of the world's ocean volume, its impact on the global climate system is disproportionately large. The Arctic Ocean is the critical driver of the global oceanic conveyor belt. The Gulf Stream and North Atlantic Current are strongly regulated by processes that occur in the Arctic.",
            counters: [
              {
                card: 'Olim et al. 2025',
                arg: "DA turns itself — if the Arctic is critical to global climate (Carmack), then OTEC addressing Arctic warming (Olim proves safety) HELPS Carmack's concern. AFF protects what Carmack says matters most.",
              },
              {
                card: 'Carrington 2024',
                arg: "Impact comparison — Carrington's climate extinction is larger than Carmack's biodiversity-to-food-chain chain. Even if the DA is true, climate impact from inaction is worse.",
              },
            ],
          },
        ].map((e, i) => (
          <EvidCard
            key={i}
            color="da"
            cite={e.cite}
            tags={['da']}
            claim={e.claim}
            cardText={e.text}
            counters={e.counters}
          />
        ))}
      </div>
      <SecHead color="cp">Carbon Tax CP & Capitalism K</SecHead>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))',
          gap: 12,
        }}
      >
        {[
          {
            color: 'cp',
            title: 'Carbon Tax CP',
            items: [
              [
                'Text',
                'US establishes a carbon tax — businesses pay per ton of CO₂ emitted.',
              ],
              [
                'Solvency-Warming (Dowdey 2024)',
                'Carbon tax discourages pollution and incentivizes clean energy → solves Warming ADV.',
              ],
              [
                'Solvency-Water (Klobucista & Robinson 2023)',
                'Climate mitigation reduces water contamination and drought → solves Water ADV.',
              ],
              [
                'Net benefit',
                "Carbon tax doesn't alter marine ecosystems → NO link to Biodiversity DA.",
              ],
              [
                'Watch for',
                'AFF will argue permutation + Olim DACCS solvency deficit + Sokhanvar links net benefit to Russia DA.',
              ],
            ],
          },
          {
            color: 'k',
            title: 'Capitalism K',
            items: [
              [
                'Link (Chomsky et al. 2020)',
                'Green tech like OTEC makes money for corporations while greenwashing destruction — justifies maintaining the destructive capitalist status quo.',
              ],
              [
                'Impact (Chomsky et al. 2020)',
                'Capitalism is root cause of climate change and fundamentally incompatible with sustaining life on Earth.',
              ],
              [
                'Alt (Neumann)',
                "Degrowth — plan economy around sustainability and meeting people's needs, not maximizing profit.",
              ],
              [
                'Watch for',
                'AFF will argue federal ≠ corporate, urgency turn (Carrington), alt fails (no CO₂ removal), permutation.',
              ],
            ],
          },
        ].map((card) => (
          <div
            key={card.title}
            style={{
              background: 'var(--color-background-primary,#fff)',
              border: `0.5px solid ${C[card.color].border}`,
              borderLeft: `3px solid ${C[card.color].border}`,
              borderRadius: 10,
              padding: 12,
            }}
          >
            <div
              style={{
                fontSize: 12,
                fontWeight: 500,
                color: C[card.color].text,
                marginBottom: 8,
              }}
            >
              <Pill color={card.color}>{card.color === 'cp' ? 'CP' : 'K'}</Pill>{' '}
              {card.title}
            </div>
            {card.items.map(([k, v]) => (
              <div key={k} style={{ marginBottom: 5 }}>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 500,
                    color: C[card.color].text,
                  }}
                >
                  {k}:{' '}
                </span>
                <span
                  style={{
                    fontSize: 11,
                    color: 'var(--color-text-primary,#333)',
                  }}
                >
                  {v}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function CrossExPage() {
  return (
    <div>
      <div
        style={{
          background: 'var(--color-background-secondary,#f5f5f3)',
          borderRadius: 10,
          padding: '10px 14px',
          marginBottom: 16,
          border: '0.5px solid var(--color-border-tertiary,rgba(0,0,0,0.1))',
        }}
      >
        <div style={{ fontSize: 12, fontWeight: 500, marginBottom: 7 }}>
          Golden rules of cross-ex
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))',
            gap: 5,
          }}
        >
          {[
            "Ask short, specific questions — don't let them give speeches",
            "Yes/No when possible: 'Does your Fenton card say X?'",
            "Never ask a question you don't know the answer to",
            'Set up your NEXT speech — CX admissions become your blocks',
            "Stay calm if they dodge — 'I'll take that as a no' and move on",
            "Don't argue in CX — save good arguments for your speech",
            "When answering: give SHORT answers, don't volunteer extra info",
            "If yes/no hurts: 'That's a false choice because...'",
          ].map((r, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                gap: 7,
                fontSize: 11,
                color: 'var(--color-text-primary,#333)',
                lineHeight: 1.45,
              }}
            >
              <span
                style={{ color: '#378add', fontWeight: 500, flexShrink: 0 }}
              >
                {i + 1}.
              </span>
              <span>{r}</span>
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          fontSize: 12,
          color: 'var(--color-text-secondary,#666)',
          marginBottom: 12,
        }}
      >
        Open a section → open a sub-folder → click any question to see the
        strategic goal and AFF counter-answer.
      </div>
      {CX_DATA.map((section, i) => (
        <CXSection key={i} {...section} />
      ))}
    </div>
  );
}

function Speeches() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill,minmax(320px,1fr))',
        gap: 16,
      }}
    >
      <div>
        <SecHead color="aff">1AR guide</SecHead>
        {[
          {
            title: 'Case section — ~2 min',
            steps: [
              "START with a 30-sec OVERVIEW: 'Even if NEG wins everything off-case, Carrington/Klare still outweighs because [magnitude]'",
              'Extend inherency: cite Montgomery/I.N.N. — WHY the problem exists now',
              "Extend solvency: 'The Olim et al. 2025 / Devyatkin 2024 evidence says [key stat]'",
              "Extend impact: biggest number — 'Carrington proves billions displaced; 25 of 35 vital signs at record extremes'",
            ],
          },
          {
            title: 'Off-case section — ~3 min',
            steps: [
              'On each DA: Non-unique → No link → Turn → No impact — 45 sec max, name the specific counter-card',
              "On CP: 'Permutation — do both. Olim proves solvency deficit [no DACCS]. O'Reilly proves Water deficit.'",
              "On K: 'Permutation. No link (Olim: public investment). Turn (Carrington: billions die waiting). Alt fails (Olim: degrowth ≠ DACCS).'",
              "RULE: Never spend more than 60 sec per off-case argument — if you don't cover it, it's dropped",
            ],
          },
        ].map(({ title, steps }) => (
          <div
            key={title}
            style={{
              background: 'var(--color-background-primary,#fff)',
              border: `0.5px solid ${C.aff.border}`,
              borderLeft: `3px solid ${C.aff.border}`,
              borderRadius: 10,
              padding: 13,
              marginBottom: 10,
            }}
          >
            <div
              style={{
                fontSize: 12,
                fontWeight: 500,
                color: C.aff.text,
                marginBottom: 9,
              }}
            >
              {title}
            </div>
            {steps.map((s, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
                <StepNum n={i + 1} />
                <div
                  style={{
                    fontSize: 12,
                    color: 'var(--color-text-primary,#333)',
                    lineHeight: 1.55,
                  }}
                >
                  {s}
                </div>
              </div>
            ))}
          </div>
        ))}
        <SecHead color="aff">2AR guide</SecHead>
        <div
          style={{
            background: 'var(--color-background-primary,#fff)',
            border: `0.5px solid ${C.aff.border}`,
            borderLeft: `3px solid ${C.aff.border}`,
            borderRadius: 10,
            padding: 13,
          }}
        >
          <div
            style={{
              fontSize: 12,
              fontWeight: 500,
              color: C.aff.text,
              marginBottom: 9,
            }}
          >
            Pick ONE world — 5 min
          </div>
          {[
            "State voting issues in FIRST 30 SECONDS: 'Two reasons to vote AFF today...'",
            'Go for CASE + ONE off-case answer — pick the path of least resistance',
            'Extend Carrington 2024 or Klare with specific stats — 2 full minutes',
            'Show DA non-unique (Fenton vs own card) OR turn — 1 min with specific card names',
            "Impact calculus: 'Carrington outweighs Motyl on magnitude AND timeframe' — 1.5 min",
            "Close: 'Vote AFF' — describe what the world looks like if AFF wins vs. loses",
          ].map((s, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
              <StepNum n={i + 1} />
              <div
                style={{
                  fontSize: 12,
                  color: 'var(--color-text-primary,#333)',
                  lineHeight: 1.55,
                }}
              >
                {s}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <SecHead color="neg">2NR guide</SecHead>
        <div
          style={{
            background: 'var(--color-background-primary,#fff)',
            border: `0.5px solid ${C.neg.border}`,
            borderLeft: `3px solid ${C.neg.border}`,
            borderRadius: 10,
            padding: 13,
            marginBottom: 10,
          }}
        >
          <div
            style={{
              fontSize: 12,
              fontWeight: 500,
              color: C.neg.text,
              marginBottom: 9,
            }}
          >
            Pick ONE argument — 5 min
          </div>
          {[
            "State it in FIRST 15 SECONDS: 'The Russia DA is why you vote NEG today.'",
            'Extend completely: Fenton → Sokhanvar → Smith-Nonini → Motyl — every card, every link',
            "Answer every 1AR response — cite the specific card: 'They said Fenton proves non-unique. But Fenton proves dependence, not immunity.'",
            'Impact calculus: magnitude (Motyl: nuclear) + probability (Fenton: economy stressed) + timeframe (faster than Carrington climate)',
            "Case turns: 'Even if Olim proves OTEC safe, Sokhanvar proves it still disrupts Russian oil — same DA applies'",
            "Close: 'Vote NEG' — tell judge what a world with the plan looks like vs. without",
          ].map((s, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
              <StepNum n={i + 1} />
              <div
                style={{
                  fontSize: 12,
                  color: 'var(--color-text-primary,#333)',
                  lineHeight: 1.55,
                }}
              >
                {s}
              </div>
            </div>
          ))}
        </div>
        <SecHead color="neg">2NR options</SecHead>
        {[
          {
            opt: 'Russia DA (Fenton/Sokhanvar/Smith-Nonini/Motyl)',
            when: "AFF had weak non-unique answers to Fenton; Carrington doesn't outweigh Motyl",
            col: 'da',
            arg: 'DA outweighs on magnitude (Motyl: nuclear civil war), probability (Fenton: oil-dependent), timeframe (faster than Carrington). Non-unique fails: Fenton 4/11 shows economy STILL oil-dependent after 3 years of full sanctions.',
          },
          {
            opt: 'Biodiversity DA (Sommerkorn/Tabary-Devisme/Carmack)',
            when: "AFF's Olim non-unique backfired; Sommerkorn uniqueness defeats itself",
            col: 'da',
            arg: "DA turns case: OTEC destroys Arctic ecosystems. Olim's 'no adverse effects' covers global thermohaline circulation; Tabary-Devisme is about LOCAL dead zones from discharge points — different scale. Carmack proves Arctic biodiversity IS global climate.",
          },
          {
            opt: 'Carbon Tax CP (Dowdey/Klobucista) + Biodiversity net benefit',
            when: "AFF couldn't close O'Reilly solvency deficit; permutation fell flat",
            col: 'cp',
            arg: "CP solves both advantages: Dowdey for Warming, Klobucista for Water. Net benefit: plan links to Biodiversity DA (Tabary-Devisme) but CP doesn't. Show CP gives everything AFF promises without marine ecosystem risk.",
          },
        ].map((o, i) => (
          <AnswerBlock
            key={i}
            color={o.col}
            title={`Go for: ${o.opt}`}
            their={`When: ${o.when}`}
            answers={[{ card: 'Strategy overview', arg: o.arg }]}
          />
        ))}
        <SecHead color="gray">Impact comparison reference</SecHead>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3,1fr)',
            gap: 8,
          }}
        >
          {[
            {
              l: 'Magnitude',
              d: 'Nuclear war (Motyl) > climate displacement (Carrington) > economic > biodiversity. Always compare absolute numbers.',
              col: '#a32d2d',
            },
            {
              l: 'Probability',
              d: 'Carrington: only 6% think 1.5°C achievable = high probability. Fenton: oil-dependent = high probability. Always cite the card.',
              col: '#ba7517',
            },
            {
              l: 'Timeframe',
              d: "Already happening (I.N.N. 2024: 13%/decade) > imminent > years > decades. 'Arctic sea ice loss is NOW, not theoretical.'",
              col: '#3b6d11',
            },
          ].map((w) => (
            <div
              key={w.l}
              style={{
                background: 'var(--color-background-secondary,#f5f5f3)',
                borderRadius: 8,
                padding: '10px 12px',
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: w.col,
                  marginBottom: 4,
                }}
              >
                {w.l}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: 'var(--color-text-secondary,#666)',
                  lineHeight: 1.5,
                }}
              >
                {w.d}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── CARD COMPARISON TOOL ────────────────────────────────────────────────────
const CARD_META = {
  oreilly: {
    year: 2024,
    institution: 'Cambridge PhD / Terracline',
    type: 'Analysis',
    credibility: 7,
    scope: 'Tech overview',
    recency: 9,
    specificity: 6,
  },
  inn2024: {
    year: 2024,
    institution: 'Innovation News Network',
    type: 'News synthesis',
    credibility: 6,
    scope: 'Global/Arctic data',
    recency: 9,
    specificity: 8,
  },
  temiz: {
    year: 2022,
    institution: 'University of Ontario',
    type: 'Academic journal',
    credibility: 8,
    scope: 'Arctic OTEC viability',
    recency: 7,
    specificity: 9,
  },
  olim: {
    year: 2025,
    institution: 'University of Victoria / Nature',
    type: 'Peer-reviewed',
    credibility: 10,
    scope: 'Global OTEC modeling',
    recency: 10,
    specificity: 10,
  },
  carrington: {
    year: 2024,
    institution: 'Guardian / Bioscience journal',
    type: 'Science journalism',
    credibility: 8,
    scope: 'Global climate data',
    recency: 9,
    specificity: 7,
  },
  devyatkin24: {
    year: 2024,
    institution: 'Arctic Institute / The Nation',
    type: 'Policy analysis',
    credibility: 8,
    scope: 'US-Russia Arctic coop',
    recency: 9,
    specificity: 9,
  },
  devyatkin25: {
    year: 2025,
    institution: 'Arctic Institute / The Nation',
    type: 'Policy analysis',
    credibility: 8,
    scope: 'US-Russia diplomacy',
    recency: 10,
    specificity: 9,
  },
  montgomery: {
    year: 2024,
    institution: 'Academic/policy analyst',
    type: 'Policy analysis',
    credibility: 7,
    scope: 'US science policy',
    recency: 9,
    specificity: 7,
  },
  hermann: {
    year: 2019,
    institution: 'Arctic Institute',
    type: 'Policy analysis',
    credibility: 7,
    scope: 'US Arctic leadership',
    recency: 4,
    specificity: 8,
  },
  parikh: {
    year: 2023,
    institution: 'Scientific advisory',
    type: 'Policy analysis',
    credibility: 7,
    scope: 'Science + AI governance',
    recency: 7,
    specificity: 5,
  },
  adler: {
    year: 2023,
    institution: 'Policy analysis',
    type: 'Analysis',
    credibility: 6,
    scope: 'Arctic geopolitics',
    recency: 7,
    specificity: 7,
  },
  klare: {
    year: 2023,
    institution: 'Foreign policy analyst',
    type: 'Analysis',
    credibility: 7,
    scope: 'Arctic conflict risk',
    recency: 7,
    specificity: 6,
  },
  fenton: {
    year: 2025,
    institution: 'CSIS (Center for Strategic & International Studies)',
    type: 'Think tank',
    credibility: 9,
    scope: 'Russian economy',
    recency: 10,
    specificity: 9,
  },
  sokhanvar: {
    year: 2022,
    institution: 'Energy Science & Engineering',
    type: 'Peer-reviewed',
    credibility: 9,
    scope: 'Russia + renewables',
    recency: 7,
    specificity: 10,
  },
  smithnonini: {
    year: 2022,
    institution: 'UNC Chapel Hill',
    type: 'Academic',
    credibility: 8,
    scope: 'Russian oil economy',
    recency: 7,
    specificity: 9,
  },
  motyl: {
    year: 2023,
    institution: 'Rutgers / Foreign Policy',
    type: 'Academic analysis',
    credibility: 8,
    scope: 'Russian collapse risk',
    recency: 7,
    specificity: 7,
  },
  sommerkorn: {
    year: 2025,
    institution: 'WWF Arctic',
    type: 'NGO research',
    credibility: 8,
    scope: 'Arctic biodiversity',
    recency: 10,
    specificity: 9,
  },
  tabary: {
    year: 2023,
    institution: 'Catalyst / McGill',
    type: 'Academic analysis',
    credibility: 7,
    scope: 'OTEC environmental risk',
    recency: 7,
    specificity: 9,
  },
  carmack: {
    year: 2019,
    institution: 'World Economic Forum / scientists',
    type: 'Expert synthesis',
    credibility: 8,
    scope: 'Arctic ocean systems',
    recency: 4,
    specificity: 8,
  },
  dowdey: {
    year: 2024,
    institution: 'HowStuffWorks (science writer)',
    type: 'Explainer',
    credibility: 5,
    scope: 'Carbon tax policy',
    recency: 9,
    specificity: 5,
  },
  klobucista: {
    year: 2023,
    institution: 'Council on Foreign Relations',
    type: 'Think tank',
    credibility: 9,
    scope: 'Water + climate',
    recency: 7,
    specificity: 7,
  },
  chomsky: {
    year: 2020,
    institution: 'Collective 20 / Truthout',
    type: 'Op-ed / advocacy',
    credibility: 6,
    scope: 'Capitalism + climate',
    recency: 5,
    specificity: 5,
  },
  neumann: {
    year: 2022,
    institution: 'Academic',
    type: 'Academic',
    credibility: 7,
    scope: 'Degrowth economics',
    recency: 7,
    specificity: 6,
  },
  spence: {
    year: 2023,
    institution: 'Scientific consortium',
    type: 'Academic',
    credibility: 8,
    scope: 'Arctic Council + climate',
    recency: 7,
    specificity: 7,
  },
  shankman: {
    year: 2024,
    institution: 'Science journalism',
    type: 'News analysis',
    credibility: 7,
    scope: 'Trump + Arctic Council',
    recency: 9,
    specificity: 8,
  },
  broers1: {
    year: 2024,
    institution: 'European policy analysis',
    type: 'Policy analysis',
    credibility: 7,
    scope: 'EU global leadership',
    recency: 9,
    specificity: 6,
  },
  broers2: {
    year: 2024,
    institution: 'European policy analysis',
    type: 'Policy analysis',
    credibility: 7,
    scope: 'EU democracy / authoritarianism',
    recency: 9,
    specificity: 6,
  },
  porter: {
    year: 2025,
    institution: 'News analysis',
    type: 'News analysis',
    credibility: 7,
    scope: 'EU brain drain / scientists',
    recency: 10,
    specificity: 8,
  },
  belfield: {
    year: 2023,
    institution: 'Democracy research',
    type: 'Academic',
    credibility: 7,
    scope: 'Democratic decline + war',
    recency: 7,
    specificity: 6,
  },
  mayet: {
    year: 2024,
    institution: 'EU policy analysis',
    type: 'Policy analysis',
    credibility: 7,
    scope: 'EU Arctic leadership',
    recency: 9,
    specificity: 7,
  },
  carlo: {
    year: 2023,
    institution: 'Indigenous studies',
    type: 'Academic',
    credibility: 8,
    scope: 'Indigenous Arctic rights',
    recency: 7,
    specificity: 7,
  },
  paige: {
    year: 2022,
    institution: 'Social science research',
    type: 'Academic',
    credibility: 7,
    scope: 'Structural violence / trauma',
    recency: 7,
    specificity: 6,
  },
};

const DIMENSIONS = [
  {
    key: 'recency',
    label: 'Recency',
    desc: 'How recent is the evidence? More recent = stronger in fast-moving policy debates.',
  },
  {
    key: 'credibility',
    label: 'Source credibility',
    desc: 'Institutional weight: peer-reviewed journals > think tanks > advocacy > news.',
  },
  {
    key: 'specificity',
    label: 'Specificity',
    desc: "How directly does the card address this debate's specific claims?",
  },
];

function CardComparison() {
  const [leftId, setLeftId] = useState('olim');
  const [rightId, setRightId] = useState('tabary');
  const [active, setActive] = useState(null); // which dimension is highlighted

  const cardOptions = ALL_EVIDENCE.map((e) => ({
    value: e.id,
    label: `${e.cite} — ${e.side}`,
  }));
  const SIDE_COLOR = {
    'OTEC AFF': 'otec',
    'Research AFF': 'aff',
    'OTEC NEG': 'da',
    'Research NEG': 'neg',
  };

  const renderSide = (id, setId, position) => {
    const ev = ALL_EVIDENCE.find((e) => e.id === id);
    const meta = CARD_META[id] || {};
    const sc = SIDE_COLOR[ev?.side] || 'gray';
    const cc = C[sc] || C.gray;

    return (
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Selector */}
        <select
          value={id}
          onChange={(e) => setId(e.target.value)}
          style={{
            width: '100%',
            padding: '7px 10px',
            borderRadius: 8,
            border: `1.5px solid ${cc.border}`,
            background: cc.bg,
            color: cc.text,
            fontSize: 12,
            fontWeight: 500,
            marginBottom: 10,
            cursor: 'pointer',
          }}
        >
          {cardOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>

        {/* Card header */}
        <div
          style={{
            background: cc.bg,
            border: `0.5px solid ${cc.border}`,
            borderLeft: `4px solid ${cc.border}`,
            borderRadius: 10,
            padding: '12px 14px',
            marginBottom: 10,
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: 6,
              marginBottom: 6,
              flexWrap: 'wrap',
            }}
          >
            <Pill color={sc}>{ev?.side}</Pill>
            <span style={{ fontSize: 10, color: cc.text, fontStyle: 'italic' }}>
              {meta.type}
            </span>
          </div>
          <div
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: cc.text,
              marginBottom: 4,
            }}
          >
            {ev?.cite}
          </div>
          <div
            style={{
              fontSize: 11,
              color: 'var(--color-text-secondary,#666)',
              lineHeight: 1.5,
              marginBottom: 6,
            }}
          >
            {ev?.claim}
          </div>
          <div
            style={{ display: 'flex', gap: 8, flexWrap: 'wrap', fontSize: 10 }}
          >
            <span
              style={{
                background: 'rgba(0,0,0,0.06)',
                borderRadius: 6,
                padding: '2px 7px',
                color: cc.text,
              }}
            >
              📅 {meta.year}
            </span>
            <span
              style={{
                background: 'rgba(0,0,0,0.06)',
                borderRadius: 6,
                padding: '2px 7px',
                color: cc.text,
                flex: 1,
                minWidth: 0,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              🏛 {meta.institution}
            </span>
          </div>
        </div>

        {/* Dimension bars */}
        {DIMENSIONS.map((dim) => {
          const val = meta[dim.key] || 5;
          const isHi = active === dim.key;
          return (
            <div
              key={dim.key}
              onMouseEnter={() => setActive(dim.key)}
              onMouseLeave={() => setActive(null)}
              style={{
                background: isHi
                  ? cc.bg
                  : 'var(--color-background-primary,#fff)',
                border: `0.5px solid ${
                  isHi
                    ? cc.border
                    : 'var(--color-border-tertiary,rgba(0,0,0,0.08))'
                }`,
                borderRadius: 8,
                padding: '9px 12px',
                marginBottom: 6,
                transition: 'all 0.15s',
                cursor: 'default',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: 5,
                }}
              >
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 500,
                    color: isHi ? cc.text : 'var(--color-text-primary,#333)',
                  }}
                >
                  {dim.label}
                </span>
                <span style={{ fontSize: 12, fontWeight: 500, color: cc.text }}>
                  {val}/10
                </span>
              </div>
              <div
                style={{
                  background: 'var(--color-background-secondary,#f1efe8)',
                  borderRadius: 4,
                  height: 6,
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: `${val * 10}%`,
                    height: '100%',
                    background: cc.border,
                    borderRadius: 4,
                    transition: 'width 0.4s',
                  }}
                />
              </div>
              {isHi && (
                <div
                  style={{
                    fontSize: 10,
                    color: 'var(--color-text-secondary,#777)',
                    marginTop: 5,
                    lineHeight: 1.4,
                  }}
                >
                  {dim.desc}
                </div>
              )}
            </div>
          );
        })}

        {/* Answered by */}
        <div
          style={{
            background: '#f0faf4',
            border: '0.5px solid #1d9e75',
            borderRadius: 8,
            padding: '8px 11px',
            marginTop: 4,
          }}
        >
          <div
            style={{
              fontSize: 9,
              fontWeight: 500,
              color: '#0f6e56',
              letterSpacing: 0.6,
              marginBottom: 4,
            }}
          >
            ANSWERED BY:
          </div>
          <div style={{ fontSize: 11, color: '#0f6e56', lineHeight: 1.5 }}>
            {ev?.answeredBy}
          </div>
        </div>
      </div>
    );
  };

  // Verdict logic
  const lMeta = CARD_META[leftId] || {};
  const rMeta = CARD_META[rightId] || {};
  const lScore = DIMENSIONS.reduce((s, d) => s + (lMeta[d.key] || 5), 0);
  const rScore = DIMENSIONS.reduce((s, d) => s + (rMeta[d.key] || 5), 0);
  const lEv = ALL_EVIDENCE.find((e) => e.id === leftId);
  const rEv = ALL_EVIDENCE.find((e) => e.id === rightId);
  const gap = Math.abs(lScore - rScore);
  const winner =
    lScore > rScore ? lEv?.cite : rScore > lScore ? rEv?.cite : null;
  const strength = gap >= 8 ? 'decisively' : gap >= 4 ? 'narrowly' : null;
  const verdictText = winner
    ? `${winner} wins ${strength || 'by a hair'} (${Math.max(
        lScore,
        rScore
      )} vs ${Math.min(lScore, rScore)} pts). ${
        lMeta.year > rMeta.year ? lEv?.cite : rEv?.cite
      } has the recency advantage (${Math.max(
        lMeta.year,
        rMeta.year
      )} vs ${Math.min(lMeta.year, rMeta.year)}).`
    : 'These cards are evenly matched. Argue specificity and context in the round.';

  return (
    <div
      style={{
        background: 'var(--color-background-primary,#fff)',
        border: '0.5px solid var(--color-border-tertiary,rgba(0,0,0,0.1))',
        borderRadius: 12,
        padding: 18,
      }}
    >
      <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 4 }}>
        🔍 Head-to-head card comparison
      </div>
      <div
        style={{
          fontSize: 11,
          color: 'var(--color-text-secondary,#666)',
          marginBottom: 14,
        }}
      >
        Select any two cards to compare credibility, recency, and specificity.
        Hover a dimension to see what it means.
      </div>

      {/* Two columns */}
      <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
        {renderSide(leftId, setLeftId, 'left')}

        {/* VS column */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: 40,
            gap: 6,
            flexShrink: 0,
          }}
        >
          <div
            style={{
              fontSize: 16,
              fontWeight: 500,
              color: 'var(--color-text-tertiary,#bbb)',
            }}
          >
            VS
          </div>
          {DIMENSIONS.map((dim) => {
            const lv = lMeta[dim.key] || 5,
              rv = rMeta[dim.key] || 5;
            const winner = lv > rv ? '←' : rv > lv ? '→' : '=';
            const col =
              winner === '←' ? '#378add' : winner === '→' ? '#e24b4a' : '#888';
            return (
              <div
                key={dim.key}
                onMouseEnter={() => setActive(dim.key)}
                onMouseLeave={() => setActive(null)}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background:
                    active === dim.key
                      ? col
                      : 'var(--color-background-secondary,#f5f5f3)',
                  border: `1.5px solid ${col}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 14,
                  color: active === dim.key ? '#fff' : col,
                  fontWeight: 500,
                  cursor: 'default',
                  transition: 'all 0.15s',
                  marginTop: 22,
                }}
              >
                {winner}
              </div>
            );
          })}
        </div>

        {renderSide(rightId, setRightId, 'right')}
      </div>

      {/* Verdict */}
      <div
        style={{
          marginTop: 14,
          padding: '11px 14px',
          background:
            lScore === rScore
              ? '#f5f5f3'
              : lScore > rScore
              ? '#e6f1fb'
              : '#fcebeb',
          borderRadius: 9,
          border: `1px solid ${
            lScore === rScore ? '#ccc' : lScore > rScore ? '#378add' : '#e24b4a'
          }`,
        }}
      >
        <div
          style={{
            fontSize: 10,
            fontWeight: 500,
            letterSpacing: 0.7,
            color: '#555',
            marginBottom: 4,
          }}
        >
          VERDICT
        </div>
        <div
          style={{
            fontSize: 12,
            color: 'var(--color-text-primary,#333)',
            lineHeight: 1.6,
          }}
        >
          {verdictText}
        </div>
        <div
          style={{
            fontSize: 10,
            color: 'var(--color-text-secondary,#666)',
            marginTop: 6,
          }}
        >
          Scores — {lEv?.cite}: <strong>{lScore}</strong> · {rEv?.cite}:{' '}
          <strong>{rScore}</strong>
        </div>
      </div>
    </div>
  );
}

function Tools({ query }) {
  return (
    <div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))',
          gap: 16,
          marginBottom: 20,
        }}
      >
        <Timer />
        <ImpactCalc />
        <div
          style={{
            background: 'var(--color-background-primary,#fff)',
            border: '0.5px solid var(--color-border-tertiary,rgba(0,0,0,0.1))',
            borderRadius: 10,
            padding: 16,
          }}
        >
          <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 12 }}>
            🚨 Emergency mid-round guide
          </div>
          {[
            [
              'Forgot what a card says',
              "Say 'our [author] evidence says...' and give the general claim. Don't make up quotes.",
            ],
            [
              'NEG dropped an argument',
              "'They dropped [argument] — that means [Carrington/Klare impact] goes uncontested. Vote AFF.'",
            ],
            [
              "Don't understand a NEG arg",
              "Ask in CX: 'What is the specific link between X and Y?' Forces them to over-explain.",
            ],
            [
              'Running out of 1AR time',
              "Group: 'All NEG attacks on solvency fail because Olim 2025 directly answers them.' — 10 sec.",
            ],
            [
              'NEG turns your advantage',
              "'Even if the turn is true, Carrington outweighs Motyl on magnitude.' Impact calc beats panic.",
            ],
            [
              'New argument in 2NR',
              "'That's new in the 2NR — judges don't evaluate new arguments in the last NEG speech.'",
            ],
            [
              'Judge looks confused',
              "Slow down: 'First... second... the impact is...' Structure does the work.",
            ],
            [
              'Partner contradicting you',
              "Defer: 'As my partner explained...' then pivot to your best card. Consistency matters.",
            ],
          ].map(([sit, fix]) => (
            <div
              key={sit}
              style={{
                marginBottom: 8,
                paddingBottom: 8,
                borderBottom:
                  '0.5px solid var(--color-border-tertiary,rgba(0,0,0,0.07))',
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 500,
                  color: '#a32d2d',
                  marginBottom: 2,
                }}
              >
                {sit}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: 'var(--color-text-primary,#333)',
                  lineHeight: 1.5,
                }}
              >
                {fix}
              </div>
            </div>
          ))}
        </div>
      </div>
      <SecHead color="gray">Head-to-head card comparison</SecHead>
      <CardComparison />
      <SecHead color="gray">
        All {ALL_EVIDENCE.length} evidence cards — searchable, sortable (use
        search bar above to filter)
      </SecHead>
      <EvidTable query={query} />
      <SecHead color="gray">💡 Features to build next</SecHead>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))',
          gap: 10,
        }}
      >
        {[
          {
            title: '🎯 Round flow map',
            desc: "Click-to-build flowchart of a round in progress. Mark which arguments were dropped, extended, or turned. Helps you track what you're winning.",
          },
          {
            title: '📝 Live round notepad',
            desc: 'Persistent notepad that stays in the sidebar. Jot CX admissions, judge notes, dropped arguments, and 2NR strategy mid-round.',
          },
          {
            title: '🤖 AI argument matcher',
            desc: 'Type a NEG argument in plain language → AI instantly surfaces the top 3 AFF counter-cards and the exact language to use. Powered by the Anthropic API.',
          },
          {
            title: '📊 Win probability tracker',
            desc: 'Rate how each argument went in the round on a slider. Get a live win probability estimate for 2AR/2NR based on drops and extensions.',
          },
          {
            title: '🃏 Flashcard drill mode',
            desc: 'Flip cards to test recall of authors, dates, claims, and counters. Spaced repetition for tournament prep. Track accuracy over time.',
          },
          {
            title: '🗣 Speech outline builder',
            desc: 'Click arguments to add them to a speech outline. Auto-calculates estimated speaking time. Export as a printable flow.',
          },
          {
            title: '🔍 Card comparison tool',
            desc: 'Select any two cards and see a head-to-head breakdown — which card is newer, which has stronger institutional credibility, which wins impact comparison.',
          },
          {
            title: '📖 Glossary + term lookup',
            desc: 'Tap any debate term (uniqueness, permutation, turn, kritik, net benefit) for a quick definition. Perfect for newer debaters mid-round.',
          },
          {
            title: '🧠 Prep drill mode',
            desc: "Randomly generates NEG attacks ('NEG drops Russia DA Impact') and times how fast you can articulate the 2AC answer. Builds speed under pressure.",
          },
          {
            title: '📋 Judge paradigm tracker',
            desc: 'Store notes about each judge — do they like technical debates? Impact calculus? Ks? Pull up the right strategy before the round starts.',
          },
        ].map((f) => (
          <div
            key={f.title}
            style={{
              background: 'var(--color-background-primary,#fff)',
              border:
                '0.5px solid var(--color-border-tertiary,rgba(0,0,0,0.1))',
              borderLeft: '3px solid #378add',
              borderRadius: 10,
              padding: 12,
            }}
          >
            <div
              style={{
                fontSize: 12,
                fontWeight: 500,
                color: '#0c447c',
                marginBottom: 5,
              }}
            >
              {f.title}
            </div>
            <div
              style={{
                fontSize: 11,
                color: 'var(--color-text-secondary,#666)',
                lineHeight: 1.5,
              }}
            >
              {f.desc}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'research-aff', label: 'Research AFF' },
  { id: 'research-neg', label: 'Research NEG' },
  { id: 'otec-aff', label: 'OTEC AFF' },
  { id: 'otec-neg', label: 'OTEC NEG' },
  { id: 'crossex', label: 'Cross-Ex' },
  { id: 'speeches', label: 'Speeches' },
  { id: 'tools', label: 'Tools' },
];

const SIDE_COLOR = {
  'OTEC AFF': 'otec',
  'Research AFF': 'aff',
  'OTEC NEG': 'da',
  'Research NEG': 'neg',
};

export default function App() {
  const [tab, setTab] = useState('overview');
  const [query, setQuery] = useState('');
  const [showDrop, setShowDrop] = useState(false);
  const ref = useRef(null);

  const results =
    query.length > 1
      ? ALL_EVIDENCE.filter((e) =>
          [e.cite, e.side, e.role, e.claim, e.answeredBy]
            .join(' ')
            .toLowerCase()
            .includes(query.toLowerCase())
        ).slice(0, 8)
      : [];

  useEffect(() => {
    const h = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setShowDrop(false);
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  return (
    <div
      style={{
        fontFamily: 'var(--font-sans,system-ui,sans-serif)',
        minHeight: '100vh',
        background: 'var(--color-background-tertiary,#f5f5f3)',
      }}
    >
      <div style={{ background: '#0f1b2d', padding: '13px 18px 0' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginBottom: 12,
            flexWrap: 'wrap',
          }}
        >
          <h1
            style={{
              fontSize: 15,
              fontWeight: 500,
              color: '#7ec8f0',
              flex: 1,
              minWidth: 200,
              margin: 0,
            }}
          >
            AUDL MS Varsity — Arctic Debate Cheat Sheet 2025–26
          </h1>
          <div
            ref={ref}
            style={{ position: 'relative', flex: 1, maxWidth: 420 }}
          >
            <div
              style={{
                position: 'absolute',
                left: 10,
                top: '50%',
                transform: 'translateY(-50%)',
                opacity: 0.4,
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                stroke="white"
                strokeWidth="1.5"
              >
                <circle cx="6.5" cy="6.5" r="4" />
                <line x1="10" y1="10" x2="14" y2="14" />
              </svg>
            </div>
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowDrop(true);
              }}
              onFocus={() => setShowDrop(true)}
              placeholder="Search all 32 evidence cards by author, case, argument..."
              style={{
                width: '100%',
                padding: '7px 12px 7px 30px',
                borderRadius: 8,
                border: '0.5px solid rgba(255,255,255,0.18)',
                background: 'rgba(255,255,255,0.09)',
                color: '#fff',
                fontSize: 12,
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
            {showDrop && results.length > 0 && (
              <div
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 6px)',
                  left: 0,
                  right: 0,
                  background: 'var(--color-background-primary,#fff)',
                  borderRadius: 8,
                  border:
                    '0.5px solid var(--color-border-tertiary,rgba(0,0,0,0.12))',
                  zIndex: 100,
                  overflow: 'hidden',
                  maxHeight: 300,
                  overflowY: 'auto',
                }}
              >
                {results.map((e, i) => {
                  const sc = SIDE_COLOR[e.side] || 'gray';
                  return (
                    <div
                      key={i}
                      onClick={() => {
                        setTab('tools');
                        setShowDrop(false);
                      }}
                      style={{
                        padding: '9px 12px',
                        borderBottom:
                          '0.5px solid var(--color-border-tertiary,rgba(0,0,0,0.07))',
                        cursor: 'pointer',
                      }}
                      onMouseEnter={(el) =>
                        (el.currentTarget.style.background =
                          'var(--color-background-secondary,#f5f5f3)')
                      }
                      onMouseLeave={(el) =>
                        (el.currentTarget.style.background = 'transparent')
                      }
                    >
                      <div
                        style={{
                          display: 'flex',
                          gap: 6,
                          alignItems: 'center',
                          marginBottom: 2,
                        }}
                      >
                        <span
                          style={{
                            fontSize: 12,
                            fontWeight: 500,
                            color: C[sc]?.text || '#333',
                          }}
                        >
                          {e.cite}
                        </span>
                        <Pill color={sc} small>
                          {e.side}
                        </Pill>
                      </div>
                      <div
                        style={{
                          fontSize: 11,
                          color: 'var(--color-text-primary,#333)',
                          marginBottom: 2,
                        }}
                      >
                        {e.claim}
                      </div>
                      <div
                        style={{
                          fontSize: 10,
                          color: '#3b6d11',
                          fontStyle: 'italic',
                        }}
                      >
                        Answered by: {e.answeredBy}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 0, overflowX: 'auto' }}>
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                padding: '8px 14px',
                border: 'none',
                background: 'transparent',
                color: tab === t.id ? '#fff' : 'rgba(255,255,255,0.45)',
                borderBottom:
                  tab === t.id ? '2px solid #7ec8f0' : '2px solid transparent',
                cursor: 'pointer',
                fontSize: 12,
                fontWeight: 500,
                whiteSpace: 'nowrap',
                transition: 'all 0.15s',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
      <div style={{ padding: 16, maxWidth: 1100, margin: '0 auto' }}>
        {tab === 'overview' && <Overview />}
        {tab === 'research-aff' && <ResearchAFF />}
        {tab === 'research-neg' && <ResearchNEG />}
        {tab === 'otec-aff' && <OTECAff />}
        {tab === 'otec-neg' && <OTECNeg />}
        {tab === 'crossex' && <CrossExPage />}
        {tab === 'speeches' && <Speeches />}
        {tab === 'tools' && <Tools query={query} />}
      </div>
    </div>
  );
}
