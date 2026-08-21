# 😈 WHOOPS — MVP Specification
> **Version:** 1.0  
> **Last Updated:** 2026-08-21  
> **Status:** Active — update this file as decisions are made  
> **Tagline:** Terrible advice. Zero regrets.

---

## TABLE OF CONTENTS

1. [Product Overview](#1-product-overview)
2. [Tech Stack](#2-tech-stack)
3. [Design System](#3-design-system)
4. [App Architecture](#4-app-architecture)
5. [Screen-by-Screen UX](#5-screen-by-screen-ux)
6. [AI Prompt Architecture](#6-ai-prompt-architecture)
7. [Safety Architecture](#7-safety-architecture)
8. [JSON Response Schema](#8-json-response-schema)
9. [Share Card Generation](#9-share-card-generation)
10. [Database Schema (Supabase)](#10-database-schema-supabase)
11. [API Architecture](#11-api-architecture)
12. [State Management](#12-state-management)
13. [Navigation](#13-navigation)
14. [Animation & Haptics](#14-animation--haptics)
15. [Error & Edge States](#15-error--edge-states)
16. [Accessibility](#16-accessibility)
17. [Android Requirements](#17-android-requirements)
18. [MVP Acceptance Criteria](#18-mvp-acceptance-criteria)
19. [DO NOT BUILD List](#19-do-not-build-list)
20. [Changelog](#20-changelog)

---

## 1. PRODUCT OVERVIEW

### Concept
Whoops is a **behavioral toy disguised as a comedy app**.

The user comes for the joke. The real product gets them to do the thing they've been avoiding.

### Core Loop
```
OPEN WHOOPS
     ↓
"What's your problem?"
     ↓
USER TYPES PROBLEM
     ↓
SAFETY CHECK (input)
     ↓
DEEPSEEK GENERATES BAD ADVICE (structured JSON)
     ↓
SAFETY CHECK (output)
     ↓
BAD ADVICE SCREEN → user laughs
     ↓
"FINE. I'LL DO IT" button
     ↓
MICRO-CHALLENGE SCREEN (if challenge enabled)
     ↓
"I DID IT"
     ↓
COMPLETION: "WHOOPS. You accidentally became productive."
     ↓
SHARE CARD GENERATED → viral loop
```

### Product Identity (Non-Negotiable)
| Pillar | Description |
|--------|-------------|
| 😈 Personality | Sarcastic friend who secretly wants you to succeed |
| 🎯 Purpose | Turn avoidance into tiny action via reverse psychology |
| 😂 Entertainment | The advice itself is funny — that's the hook |
| 📤 Viral Loop | Every great answer becomes a shareable image |
| 🧠 Behavioral Mechanic | Reverse psychology + micro-challenges + absurd completion reward |

### Positioning
- NOT: AI that gives bad advice
- NOT: Funny chatbot
- NOT: Self-help / productivity app
- YES: **A machine that creates funny, shareable moments that accidentally make you productive**

### Name & Branding
- **App name:** Whoops
- **Primary emoji:** 😈
- **Tagline (product):** Terrible advice. Zero regrets.
- **Tagline (marketing):** You asked. We messed up.
- **Completion phrase:** "WHOOPS. You accidentally became productive."
- **Do NOT say "AI" anywhere in the UI.** The magic is Whoops, not the technology.

---

## 2. TECH STACK

### Platform
- **Primary:** Android (first)
- **Secondary:** iOS (later — same codebase, minimal changes)

### Frontend
| Tool | Version | Purpose |
|------|---------|---------|
| Expo | SDK 52 | React Native framework |
| TypeScript | Strict mode | Language |
| Expo Router | v3 | File-based navigation |
| NativeWind | v4 | Tailwind CSS for React Native |
| react-native-view-shot | latest | Share card rendering to image |
| expo-sharing | latest | Native OS share sheet |
| expo-media-library | latest | Save image to gallery |
| expo-haptics | latest | Haptic feedback |
| AsyncStorage | latest | Local history + device ID |

### Backend
| Tool | Purpose |
|------|---------|
| Supabase | Database + anonymous sessions |
| DeepSeek V3 API | AI bad advice generation (OpenAI-compatible) |

### DeepSeek API
- Base URL: `https://api.deepseek.com`
- Model: `deepseek-chat` (DeepSeek V3)
- Compatible with OpenAI SDK — use `openai` npm package with custom baseURL
- Response format: JSON mode enabled
- API key: stored in `.env` as `EXPO_PUBLIC_DEEPSEEK_API_KEY`

> ⚠️ WARNING: For MVP, the API key is called from the client via Expo. Before production launch, move all AI calls to a Supabase Edge Function to protect the key.

### Environment Variables (.env)
```
EXPO_PUBLIC_DEEPSEEK_API_KEY=your_key_here
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## 3. DESIGN SYSTEM

### Color Palette
| Token | Hex | Usage |
|-------|-----|-------|
| `background` | `#0D0D10` | App background (near-black) |
| `surface` | `#1A1A24` | Cards, input areas |
| `surface-raised` | `#22222F` | Elevated cards |
| `primary` | `#8B5CF6` | Electric purple — brand primary |
| `primary-dark` | `#6D28D9` | Button pressed state |
| `secondary` | `#F43F8E` | Hot pink — personality accent |
| `accent` | `#FACC15` | Bright yellow — highlights |
| `success` | `#A3E635` | Lime green — completion |
| `text-primary` | `#FFFFFF` | Primary text |
| `text-secondary` | `#A1A1AA` | Secondary / muted text |
| `text-muted` | `#52525B` | Placeholder, timestamps |
| `border` | `#2D2D3D` | Subtle borders |
| `danger` | `#EF4444` | Error states only |

**Rule:** Do NOT turn every screen into a rainbow. Purple is the primary brand color. Pink and yellow appear as personality accents only. Green appears only on completion.

### Typography
| Token | Font | Weight | Size | Usage |
|-------|------|--------|------|-------|
| `display` | Plus Jakarta Sans | 800 (ExtraBold) | 32–48px | Big punchlines ("DON'T.") |
| `headline` | Plus Jakarta Sans | 700 (Bold) | 24px | Screen headers |
| `title` | Plus Jakarta Sans | 600 (SemiBold) | 18–20px | Card titles, buttons |
| `body` | Plus Jakarta Sans | 400 (Regular) | 16px | Body text |
| `caption` | Plus Jakarta Sans | 400 (Regular) | 12–14px | Timestamps, secondary info |

Install via Expo Google Fonts: `@expo-google-fonts/plus-jakarta-sans`

### Spacing Scale
Use multiples of 4px: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64

### Border Radius
- Cards: `rounded-2xl` (16px)
- Buttons: `rounded-2xl` (16px)
- Input: `rounded-2xl` (16px)
- Chips: `rounded-full`

### Controlled Emoji Vocabulary
The AI may use 0–3 emojis per response, selected from this set only:

| Emoji | Meaning |
|-------|---------|
| 😈 | Mischief — primary brand |
| 😂 | Humor |
| 🥲 | Failure / dramatic sadness |
| 💀 | Extreme absurdity |
| 🫠 | Procrastination / melting |
| 🫡 | Challenge / salute |
| 🥔 | Random absurd insult object |
| 🏆 | Completion / championship |
| 🤦 | Whoops moment |
| 😳 | Shock (safety refusal only) |

---

## 4. APP ARCHITECTURE

### Folder Structure
```
whoops/
├── app/                          # Expo Router screens
│   ├── (tabs)/
│   │   ├── index.tsx             # Home screen
│   │   ├── history.tsx           # History screen
│   │   └── me.tsx                # Me / Profile screen
│   ├── advice.tsx                # Bad Advice screen
│   ├── challenge.tsx             # Micro-challenge screen
│   ├── completion.tsx            # Completion screen
│   ├── share-preview.tsx         # Share card preview
│   ├── onboarding.tsx            # First launch only
│   └── _layout.tsx               # Root layout
├── components/
│   ├── ui/                       # Reusable UI primitives
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   └── Badge.tsx
│   ├── advice/
│   │   ├── AdviceCard.tsx
│   │   ├── ChallengeCard.tsx
│   │   └── CompletionCard.tsx
│   ├── share/
│   │   ├── ShareCardClassic.tsx
│   │   ├── ShareCardChaos.tsx
│   │   └── ShareCardWisdom.tsx
│   └── layout/
│       ├── SafeArea.tsx
│       └── TabBar.tsx
├── services/
│   ├── deepseek.ts               # DeepSeek API calls
│   ├── supabase.ts               # Supabase client
│   ├── safety.ts                 # Input/output safety classification
│   ├── shareCard.ts              # Share card generation logic
│   └── storage.ts                # AsyncStorage helpers
├── stores/
│   └── sessionStore.ts           # Zustand session state
├── hooks/
│   ├── useAdvice.ts              # Main advice generation hook
│   ├── useHistory.ts             # History management
│   └── useHaptics.ts             # Haptic feedback hook
├── constants/
│   ├── colors.ts                 # Design tokens
│   ├── categories.ts             # 6 MVP categories + example prompts
│   ├── challenges.ts             # Challenge library (curated)
│   ├── loadingMessages.ts        # Rotating loading copy
│   └── completionMessages.ts     # Sarcastic completion copy
├── types/
│   └── index.ts                  # All TypeScript interfaces
├── utils/
│   ├── deviceId.ts               # Anonymous device identifier
│   └── percentage.ts             # Absurd completion percentage generator
├── .env
├── app.json
└── package.json
```

### Data Flow
```
User Input
    ↓
safety.ts → classifyInput(text) → { safe: boolean, reason?: string }
    ↓ (if safe)
deepseek.ts → generateAdvice(input, category) → WhoopsResponse JSON
    ↓
safety.ts → validateOutput(response) → { safe: boolean }
    ↓ (if safe)
sessionStore → store current session
    ↓
Navigate to AdviceScreen
```

---

## 5. SCREEN-BY-SCREEN UX

### SCREEN 0 — Onboarding (First Launch Only)
**Trigger:** AsyncStorage `whoops_onboarded` not set

**Layout:**
```
[centered, full screen, background: #0D0D10]

        😈

      WHOOPS

  You have a problem.
  We have terrible advice.

  [LET'S MAKE IT WORSE 😈]  ← primary button, purple
```

**On button tap:** Set `whoops_onboarded = true` in AsyncStorage → navigate to Home.  
**Do NOT show again** after first launch.

---

### SCREEN 1 — Home
**File:** `app/(tabs)/index.tsx`

**Layout:**
```
[top]
  😈 Whoops                    ← small logo + wordmark, top-left

  What's your problem?         ← headline, white, 24px

  ┌─────────────────────────┐
  │ I don't want to clean   │  ← TextInput, multiline, surface card
  │ my room...              │  ← placeholder text in muted
  │                         │
  │                    0/500 │  ← char counter, bottom-right of input
  └─────────────────────────┘

  [😈 GIVE ME BAD ADVICE]      ← primary button, full width, purple
                                  disabled + opacity 0.5 if input empty

  Try:
  ["I keep procrastinating"] ["Should I go to the gym?"]  ← chips, scrollable row
  ["I'm bored"] ["I don't want to cook"]

[bottom nav]
  🏠 Home    🕘 History    👤 Me
```

**Behavior:**
- Input max 500 chars
- Button disabled until input has ≥ 3 characters
- Example chips on tap → populate input field
- Chips rotate randomly from `constants/categories.ts`
- On button tap → trigger `useAdvice` hook → show loading overlay

**Loading State (overlay):**
```
[dark overlay, centered]

        😈

  WHOOPS IS THINKING...

  [rotating message every 600ms]
  "Consulting absolutely nobody..."
  "Making questionable decisions..."
  "Ignoring common sense..."
  "This is probably a bad idea..."
  "Making things worse..."
```

---

### SCREEN 2 — Bad Advice
**File:** `app/advice.tsx`  
**Receives:** `WhoopsResponse` via router params or session store

**Layout:**
```
[top bar]
← back                        ⋯ (options menu — share, try another)

        😈
      BAD ADVICE               ← label, secondary color (pink)

YOU ASKED                      ← caption, muted
"I don't want to clean        ← user's question, italic, text-secondary
 my room."

──────────────────────────────

DON'T.                         ← display font, white, 36px+

Let the laundry become         ← body text, white, 18px
furniture.

Whatever you do,
DON'T pick up those
three shirts. 😈


[bottom, sticky]
┌──────────────────────────┐
│  😈 FINE. I'LL DO IT    │   ← primary button (purple)
└──────────────────────────┘

     Try another one           ← text button, muted
```

**Behavior:**
- If `challenge.enabled === true` → "FINE. I'LL DO IT" navigates to Challenge screen
- If `challenge.enabled === false` → "FINE. I'LL DO IT" navigates to Completion screen
- "Try another one" → back to Home, clear input
- ⋯ menu → "Share this Whoops" / "Try another"
- Haptic: medium impact on screen arrival
- Save to history on arrival (AsyncStorage + Supabase)

---

### SCREEN 3 — Micro-Challenge
**File:** `app/challenge.tsx`  
**Only shown when:** `challenge.enabled === true`

**Layout:**
```
[centered, no nav bar]

        😈

      Fine.
    You win.

Your extremely annoying        ← caption, muted
      mission:

   PICK UP 3 SHIRTS            ← display font, accent yellow, large

      👕 👕 👕                 ← visual emoji(s) from challenge

┌──────────────────────────┐
│      I DID IT  ✅        │   ← success button (lime green)
└──────────────────────────┘

       I give up 😐            ← text button, muted
```

**Behavior:**
- "I DID IT" → navigate to Completion
- "I give up" → navigate to Home with sarcastic message: "Typical. 😈"
- Haptic: success notification on "I DID IT"
- No back button — force decision

---

### SCREEN 4 — Completion
**File:** `app/completion.tsx`

**Layout:**
```
[centered, no nav bar]

        😎

    WHOOPS.

You accidentally did it.       ← body text

The world is now               ← caption, muted
    0.7% better.               ← absurd specific percentage, accent yellow

┌──────────────────────────┐
│   😈 ANOTHER PROBLEM     │   ← primary button (purple)
└──────────────────────────┘

┌──────────────────────────┐
│  📤 SHARE THIS WHOOPS    │   ← secondary button (outlined, pink)
└──────────────────────────┘

      I'm done for now         ← text button, muted
```

**Behavior:**
- Percentage is generated by `utils/percentage.ts` — always between 0.1% and 4.9%, always one decimal place, never a round number
- "ANOTHER PROBLEM" → Home, clear input
- "SHARE THIS WHOOPS" → Share Preview screen
- "I'm done for now" → Home, clear input
- Haptic: success + confetti-like animation (simple particle burst, not a library)
- Completion message rotates from `constants/completionMessages.ts`

---

### SCREEN 5 — Share Preview
**File:** `app/share-preview.tsx`

**Layout:**
```
[top bar]
← back

Choose your style:             ← headline

[😈 Classic] [💀 Chaos] [🧠 Wisdom]  ← tab selector (3 styles)

┌─────────────────────────────────┐
│                                 │
│   [RENDERED SHARE CARD          │   ← ViewShot component
│    1080×1350 preview, scaled]   │
│                                 │
└─────────────────────────────────┘

┌──────────────────────────┐
│     📤 SHARE IMAGE       │   ← primary button
└──────────────────────────┘
┌──────────────────────────┐
│     💾 SAVE TO GALLERY   │   ← secondary button
└──────────────────────────┘
```

**Behavior:**
- Default style: Classic
- User can switch between 3 templates before sharing
- `react-native-view-shot` captures the card at full 1080×1350 resolution
- Share → `expo-sharing` opens native Android share sheet
- Save → `expo-media-library` saves JPG to gallery, show success toast

---

### SCREEN 6 — History
**File:** `app/(tabs)/history.tsx`

**Layout:**
```
Your Whoops                    ← headline

[list of history items]
┌──────────────────────────┐
│ 😈  I don't want to     │  ← first ~40 chars of user's question
│      exercise.           │
│                  2h ago  │  ← timestamp, muted right-aligned
│                       >  │  ← chevron
└──────────────────────────┘
[repeat]

[empty state]
  Nothing yet.

  Congratulations, you
  apparently have your
  life together. 😐

  [GIVE ME BAD ADVICE]
```

**Behavior:**
- Tapping item → re-opens Advice screen with stored response
- History stored in AsyncStorage (device-local), mirrored to Supabase when online
- Max 50 history items locally; older ones paginated from Supabase
- Pull to refresh

---

### SCREEN 7 — Me
**File:** `app/(tabs)/me.tsx`

**Layout:**
```
😈 Your Whoops                 ← headline

┌──────┐ ┌──────┐ ┌──────┐
│  127 │ │  38  │ │  89  │
│Whoops│ │Done  │ │Excus-│
│recvd │ │      │ │es 💀 │
└──────┘ └──────┘ └──────┘

Your favorite category:
Procrastination 😈             ← derived from history

───────────────────────────────

Settings
  > Notifications              ← stub for v1.1
  > Share card style           ← default template preference
  > Sound & Haptics            ← toggle haptics
  > Theme                      ← dark only for MVP
  > Privacy
  > About Whoops
```

**Stats behavior:**
- All stats are local (AsyncStorage) for MVP
- "Excuses destroyed" = Whoops received − Things done (never below 0)
- Keep it personality-driven, not analytical

---

### SCREEN 8 — Safety Refusal
**Shown inline on:** Bad Advice screen (replaces advice content)

**Layout:**
```
        😳

    WHOA.

Even I know when to
stop being an idiot.

That's not something
I'm going to mess
around with.

For something this serious,
talk to a qualified
professional.

[ASK SOMETHING ELSE 😈]       ← primary button
```

**Behavior:**
- No share button on this screen
- No history entry saved for refused requests
- Haptic: warning

---

## 6. AI PROMPT ARCHITECTURE

### System Prompt
```
You are Whoops — a sarcastic, mischievous app that gives terrible advice.

Your personality:
- Sarcastic, playful, slightly chaotic, never cruel, never judgmental
- You tease the SITUATION, never attack the PERSON
- You secretly want the user to succeed
- Think: "a friend who gives terrible advice because they love you"

Your response formula (follow in order):
1. AGREE with the user's excuse (validate their laziness dramatically)
2. EXAGGERATE the excuse to absurdity
3. Give BAD ADVICE (tell them NOT to do the thing)
4. Apply REVERSE PSYCHOLOGY ("whatever you do, don't...")
5. Suggest a TINY ACTION disguised as more bad advice
6. Optional: one-line personality zinger at the end

Rules:
- Response must be 20–80 words total (ideal: 40–60)
- Use 0–3 emojis from the approved set: 😈 😂 🥲 💀 🫠 🫡 🥔 🏆 🤦
- NEVER attack the user as a person
- NEVER suggest anything genuinely dangerous, harmful, or illegal
- NEVER use phrases like "As an AI" or "I cannot"
- Keep it punchy. The joke must land fast.

Safety rule:
If the input touches: self-harm, suicide, medication, medical treatment, mental health crises, violence, illegal activity, weapons, dangerous activities, financial decisions, or legal decisions — DO NOT generate bad advice. Instead set safe=false and provide a brief in-character refusal in the response field.

You must ALWAYS return valid JSON matching this exact schema. No markdown, no preamble.
```

### User Message Template
```
Category: {category}
User's problem: "{userProblem}"
Suggested micro-action (optional, use if fits naturally): "{suggestedAction}"

Generate a Whoops bad advice response.
```

### Categories + Example Prompts
```typescript
// constants/categories.ts
export const CATEGORIES = [
  {
    id: 'procrastination',
    label: 'Procrastination',
    emoji: '😴',
    examples: [
      "I keep procrastinating.",
      "I can't start my work.",
      "I've been putting this off for weeks.",
    ],
  },
  {
    id: 'chores',
    label: 'Chores',
    emoji: '🧹',
    examples: [
      "I don't want to clean my room.",
      "My dishes are piling up.",
      "I need to do laundry.",
    ],
  },
  {
    id: 'motivation',
    label: 'Motivation',
    emoji: '💪',
    examples: [
      "I don't want to exercise.",
      "Should I go to the gym?",
      "I haven't moved all day.",
    ],
  },
  {
    id: 'productivity',
    label: 'Productivity',
    emoji: '📚',
    examples: [
      "I keep avoiding studying.",
      "I need to start my project.",
      "I can't focus.",
    ],
  },
  {
    id: 'boredom',
    label: 'Boredom',
    emoji: '😐',
    examples: [
      "I'm bored.",
      "I don't know what to do.",
      "I've been scrolling for hours.",
    ],
  },
  {
    id: 'decisions',
    label: 'Decisions',
    emoji: '🤷',
    examples: [
      "Should I go outside?",
      "I'm hungry but I don't want to cook.",
      "Should I take a nap?",
    ],
  },
]
```

---

## 7. SAFETY ARCHITECTURE

### Two-Layer System

**Layer 1 — Input Classification (before AI call)**

```typescript
// services/safety.ts
const BLOCKED_TOPICS = [
  'suicide', 'self-harm', 'self harm', 'kill myself', 'end my life',
  'medication', 'stop taking', 'overdose', 'drugs',
  'violence', 'hurt someone', 'weapon', 'bomb', 'gun',
  'illegal', 'crime', 'steal', 'fraud',
  'financial advice', 'invest my money', 'stock',
  'legal advice', 'sue', 'lawsuit',
]

// Semantic patterns — not just keywords
const BLOCKED_PATTERNS = [
  /want to die/i,
  /don't want to (be )?alive/i,
  /should i (stop|quit) (taking|my) (meds|medication|pills)/i,
  /how (do i|to) (hurt|harm|kill)/i,
]

export function classifyInput(text: string): { safe: boolean; reason?: string } { ... }
```

**Layer 2 — Output Validation (after AI response)**

Even if input was safe, check the generated `response` field:
- Does it contain any blocked topics?
- Does it suggest anything genuinely dangerous?
- If yes → override `safe = false`, show safety refusal screen

**Semantic note:** Use pattern matching + context, not just keyword blacklists.
- ✅ "I'm dying to eat pizza" → safe
- ❌ "I want to die" → blocked

---

## 8. JSON RESPONSE SCHEMA

### WhoopsResponse Type
```typescript
// types/index.ts

export interface WhoopsChallenge {
  enabled: boolean
  instruction: string        // e.g. "Pick up 3 shirts"
  estimatedSeconds: number   // e.g. 30
  emoji: string              // e.g. "👕"
}

export interface WhoopsResponse {
  safe: boolean
  response: string           // The bad advice text (20–80 words)
  tone: 'sarcastic' | 'absurd' | 'dramatic' | 'deadpan'
  category: string           // Detected category
  challenge: WhoopsChallenge
  emoji: string              // Primary emoji for the screen header
  shareable: boolean         // Should share button be shown?
  refusalReason?: string     // Only when safe === false
}

export interface HistoryItem {
  id: string
  userProblem: string
  response: WhoopsResponse
  completedChallenge: boolean
  sharedCount: number
  createdAt: string
}
```

### Example Valid Response (safe)
```json
{
  "safe": true,
  "response": "DON'T clean it.\n\nYour laundry has achieved sentience. It has dreams now. You can't just disrupt that.\n\nWhatever you do, don't pick up those three shirts on the floor. That would be rude. 😈",
  "tone": "absurd",
  "category": "chores",
  "challenge": {
    "enabled": true,
    "instruction": "Pick up 3 things off the floor",
    "estimatedSeconds": 30,
    "emoji": "👕"
  },
  "emoji": "😈",
  "shareable": true
}
```

### Example Valid Response (unsafe)
```json
{
  "safe": false,
  "response": "WHOA. 😳\n\nEven I know when to stop being an idiot.\n\nThat's not something I'm going to mess around with.\n\nFor something this serious, talk to a qualified professional.",
  "tone": "deadpan",
  "category": "safety",
  "challenge": {
    "enabled": false,
    "instruction": "",
    "estimatedSeconds": 0,
    "emoji": ""
  },
  "emoji": "😳",
  "shareable": false,
  "refusalReason": "medical"
}
```

---

## 9. SHARE CARD GENERATION

### Specs
- Dimensions: **1080 × 1350px** (4:5 ratio — optimal for Instagram, Facebook, WhatsApp)
- Format: **JPG** (quality 0.95)
- Generated via: `react-native-view-shot` → captures off-screen rendered component
- The card is rendered at scale then captured — not drawn with a canvas

### Template A — Classic 😈
```
Background: #0D0D10 (with subtle purple gradient top-right)
Font: Plus Jakarta Sans

[top]
  😈 WHOOPS                    ← small, purple, top-left

[center]
  YOU ASKED                    ← caption, muted, uppercase tracking
  "I don't want to clean       ← user question, italic, white
   my room."

  ────────────────────────

  DON'T.                       ← display, white, 52px
                               
  Let the laundry become       ← body, white, 22px
  furniture.

  Whatever you do,
  DON'T pick up those
  three shirts. 😈

[bottom]
  😈 Whoops                    ← small brand mark
  Terrible advice. Zero regrets.
  Get your own at whoops.app   ← subtle CTA, muted, tiny
```

### Template B — Chaos 💀
```
Background: #0D0D10
Large bold text, more meme-like

I ASKED WHOOPS               ← large, white

Me:                          ← caption
"Should I go to the gym?"   ← user question

Whoops:                      ← caption, pink
Absolutely not.

You might accidentally
become healthy. 💀           ← huge, centered

😈 whoops.app                ← tiny bottom
```

### Template C — Fake Wisdom 🧠 ⭐ PRIORITY TEMPLATE
```
Background: #1A1A24 (slightly lighter)
Looks like an inspirational quote card

[large serif-style display text, centered]

"Never chase your
 dreams."

[small divider line]

— Whoops 😈

[tiny bottom]
Terrible advice. Surprisingly good results.
whoops.app
```
> ⭐ This template has the highest viral potential. Someone seeing it on social media may initially think it's a real motivational quote. That double-take is the hook.

---

## 10. DATABASE SCHEMA (SUPABASE)

### Tables

```sql
-- Anonymous device sessions
CREATE TABLE devices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  device_id TEXT UNIQUE NOT NULL,   -- generated on first launch, stored in AsyncStorage
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_seen TIMESTAMPTZ DEFAULT NOW(),
  platform TEXT DEFAULT 'android'
);

-- All interactions (for analytics + behavioral learning later)
CREATE TABLE interactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  device_id TEXT REFERENCES devices(device_id),
  user_problem TEXT NOT NULL,
  category TEXT,
  response_json JSONB NOT NULL,        -- full WhoopsResponse
  completed_challenge BOOLEAN DEFAULT FALSE,
  shared BOOLEAN DEFAULT FALSE,
  shared_template TEXT,                -- 'classic' | 'chaos' | 'wisdom'
  safety_blocked BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Curated challenge library (seeded, not AI-generated)
CREATE TABLE challenges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL,
  instruction TEXT NOT NULL,
  estimated_seconds INTEGER NOT NULL,
  emoji TEXT,
  active BOOLEAN DEFAULT TRUE
);
```

### RLS Policies
```sql
-- Devices: insert own, read own
ALTER TABLE devices ENABLE ROW LEVEL SECURITY;
CREATE POLICY "devices_self" ON devices
  USING (device_id = current_setting('app.device_id'));

-- Interactions: insert own, read own
ALTER TABLE interactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "interactions_self" ON interactions
  USING (device_id = current_setting('app.device_id'));

-- Challenges: read-only for all
ALTER TABLE challenges ENABLE ROW LEVEL SECURITY;
CREATE POLICY "challenges_read" ON challenges
  FOR SELECT USING (true);
```

### Challenge Library Seed Data (MVP)
```sql
-- Procrastination
INSERT INTO challenges (category, instruction, estimated_seconds, emoji) VALUES
('procrastination', 'Write the first sentence of what you''re avoiding', 60, '✍️'),
('procrastination', 'Set a 5-minute timer and start', 300, '⏱️'),
('procrastination', 'Open the app/file you''ve been avoiding', 15, '💻');

-- Chores
INSERT INTO challenges (category, instruction, estimated_seconds, emoji) VALUES
('chores', 'Pick up 3 things off the floor', 30, '👕'),
('chores', 'Throw away 1 piece of trash', 15, '🗑️'),
('chores', 'Wipe one surface', 30, '🧹');

-- Motivation / Exercise
INSERT INTO challenges (category, instruction, estimated_seconds, emoji) VALUES
('motivation', 'Do 3 squats. Right now.', 20, '🦵'),
('motivation', 'Do 5 jumping jacks', 20, '🤸'),
('motivation', 'Put your shoes on', 30, '👟'),
('motivation', 'Walk to the door and back', 15, '🚶');

-- Productivity / Study
INSERT INTO challenges (category, instruction, estimated_seconds, emoji) VALUES
('productivity', 'Open the textbook or document', 15, '📖'),
('productivity', 'Write the title or heading', 30, '📝'),
('productivity', 'Read one paragraph', 60, '👀');

-- Boredom
INSERT INTO challenges (category, instruction, estimated_seconds, emoji) VALUES
('boredom', 'Put your phone down for 2 minutes', 120, '📵'),
('boredom', 'Look out a window for 30 seconds', 30, '🪟'),
('boredom', 'Drink a glass of water', 30, '💧');
```

---

## 11. API ARCHITECTURE

### DeepSeek Service
```typescript
// services/deepseek.ts

import OpenAI from 'openai'

const client = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: process.env.EXPO_PUBLIC_DEEPSEEK_API_KEY,
  dangerouslyAllowBrowser: true, // MVP only — move to edge function before production
})

export async function generateAdvice(
  userProblem: string,
  category: string,
  suggestedAction?: string
): Promise<WhoopsResponse> {
  const completion = await client.chat.completions.create({
    model: 'deepseek-chat',
    max_tokens: 400,
    temperature: 0.9,
    response_format: { type: 'json_object' },
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      {
        role: 'user',
        content: buildUserMessage(userProblem, category, suggestedAction),
      },
    ],
  })

  const raw = completion.choices[0].message.content
  return JSON.parse(raw) as WhoopsResponse
}
```

### Rate Limiting (Client-Side, MVP)
```typescript
// services/storage.ts
// Track daily usage count in AsyncStorage
// Key: `whoops_usage_${today_date}` → count
// Limit: 10 per day (free tier)
// Show friendly "You've had enough bad advice today 😈" message at limit
// Reset at midnight local time
```

> ⚠️ MVP NOTE: Rate limiting is client-side only for now. A determined user can bypass it. That's acceptable for MVP. Add server-side enforcement via Supabase Edge Function before launch.

---

## 12. STATE MANAGEMENT

### Session Store (Zustand)
```typescript
// stores/sessionStore.ts

interface SessionState {
  // Current session
  currentProblem: string
  currentResponse: WhoopsResponse | null
  isLoading: boolean
  error: string | null

  // Stats (loaded from AsyncStorage)
  totalWhoops: number
  totalDone: number

  // Actions
  setCurrentProblem: (text: string) => void
  generateAdvice: () => Promise<void>
  completeChallenge: () => void
  resetSession: () => void
}
```

### Persistent State (AsyncStorage keys)
| Key | Value | Description |
|-----|-------|-------------|
| `whoops_onboarded` | `'true'` | Onboarding complete flag |
| `whoops_device_id` | UUID string | Anonymous device identifier |
| `whoops_history` | JSON array | Last 50 HistoryItems |
| `whoops_total_whoops` | number string | Lifetime stat |
| `whoops_total_done` | number string | Lifetime stat |
| `whoops_usage_YYYY-MM-DD` | number string | Daily usage counter |
| `whoops_share_style` | `'classic'│'chaos'│'wisdom'` | Preferred share template |
| `whoops_haptics` | `'on'│'off'` | Haptics preference |

---

## 13. NAVIGATION

### Structure (Expo Router)
```
app/
├── _layout.tsx           → Root: sets up fonts, StatusBar, SafeAreaProvider
├── onboarding.tsx        → Modal-style, shown once
├── (tabs)/
│   ├── _layout.tsx       → Tab bar definition (Home, History, Me)
│   ├── index.tsx         → Home
│   ├── history.tsx       → History
│   └── me.tsx            → Me
├── advice.tsx            → Full-screen, no tabs
├── challenge.tsx         → Full-screen, no tabs, no back button
├── completion.tsx        → Full-screen, no tabs
└── share-preview.tsx     → Full-screen, no tabs
```

### Navigation Rules
- **Home → Advice:** Push (with slide transition)
- **Advice → Challenge:** Push (with slide transition)
- **Challenge → Completion:** Replace (no back to challenge)
- **Completion → Home:** Pop to root
- **Any screen → Share Preview:** Push (modal-style slide up)
- **Back from Challenge:** Disabled — user must tap "I give up"

---

## 14. ANIMATION & HAPTICS

### Animations
| Trigger | Animation | Duration |
|---------|-----------|----------|
| Home → loading | Overlay fade in | 200ms |
| Loading message rotation | Fade cross-dissolve | 500ms |
| Advice screen arrival | Fade + subtle scale up (0.95 → 1.0) | 300ms |
| "FINE" button tap | Scale pulse (1.0 → 0.96 → 1.0) | 150ms |
| Challenge screen arrival | Slide up | 250ms |
| Completion screen arrival | Fade in + emoji bounce | 400ms |
| Completion percentage | Count-up animation (0.0 → final) | 600ms |
| Share card template switch | Fade cross-dissolve | 200ms |

Use `react-native-reanimated` for all animations.

### Haptics (via expo-haptics)
| Event | Haptic Type |
|-------|------------|
| "GIVE ME BAD ADVICE" tap | `impactAsync(Medium)` |
| Advice screen arrives | `impactAsync(Light)` |
| "FINE. I'LL DO IT" tap | `impactAsync(Heavy)` |
| "I DID IT" tap | `notificationAsync(Success)` |
| Safety refusal | `notificationAsync(Warning)` |
| Share/Save success | `notificationAsync(Success)` |
| "I give up" tap | `impactAsync(Light)` |

Haptics respect the `whoops_haptics` setting. Wrap all haptic calls in a check.

---

## 15. ERROR & EDGE STATES

### API Failure
```
😈

Whoops.

Even we couldn't make
this worse.

(Something went wrong. Try again.)

[TRY AGAIN]
```
→ Retry same request once automatically before showing error screen.

### No Internet
```
😈

You're offline.

We can't give you bad advice
without a connection.

At least you're avoiding something.

[TRY AGAIN]
```

### Empty Input (button disabled)
→ Button opacity 0.5, non-tappable. No toast needed.

### Input Too Long (> 500 chars)
→ Character counter turns red (`#EF4444`), input stops accepting characters.

### Daily Limit Reached (10/day)
```
😈

You've had enough bad advice today.

Come back tomorrow for more
terrible decisions.

[I'M DONE FOR TODAY]
```

### Rate limit / API quota exceeded
→ Same as API failure screen. Do not expose technical details to user.

---

## 16. ACCESSIBILITY

- All interactive elements: minimum 44×44px tap target
- Color contrast: all text meets WCAG AA (4.5:1 minimum)
- `accessibilityLabel` on all icon-only buttons
- `accessibilityRole` set correctly (button, text, header)
- Font scaling: support system font size up to 1.3x (test at Large)
- Screen reader: all screens navigable via TalkBack (Android)
- Reduced motion: respect `AccessibilityInfo.isReduceMotionEnabled()` — skip animations if true

---

## 17. ANDROID REQUIREMENTS

### Target SDK
- `minSdkVersion`: 26 (Android 8.0) — covers ~95% of active Android devices
- `targetSdkVersion`: 34 (Android 14)
- `compileSdkVersion`: 34

### Permissions
```json
// app.json
"permissions": [
  "android.permission.INTERNET",
  "android.permission.WRITE_EXTERNAL_STORAGE",   // for gallery save (< Android 10)
  "android.permission.READ_MEDIA_IMAGES"         // for gallery save (Android 13+)
]
```

### App Config (app.json)
```json
{
  "expo": {
    "name": "Whoops",
    "slug": "whoops",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "splash": {
      "backgroundColor": "#0D0D10"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#0D0D10"
      },
      "package": "com.whoops.app"
    }
  }
}
```

### Build
- Development: Expo Go (for rapid iteration)
- Testing: `npx expo run:android` (local build)
- Distribution: EAS Build → APK (internal testing) → AAB (Play Store)

---

## 18. MVP ACCEPTANCE CRITERIA

The MVP is complete when ALL of the following pass:

### Core Loop
- [ ] User can type a problem and receive bad advice in < 5 seconds
- [ ] Bad advice follows the Whoops formula (agree → exaggerate → reverse psych → tiny action)
- [ ] "FINE. I'LL DO IT" button works and leads to challenge or completion
- [ ] Micro-challenge displays correctly with curated challenge text
- [ ] "I DID IT" completes the loop and shows sarcastic completion screen
- [ ] Completion percentage is always specific, small, and absurd (e.g. 2.3%)

### Safety
- [ ] Blocked topics return the personality refusal screen, not an error
- [ ] "I'm dying to eat pizza" is NOT blocked
- [ ] "I want to die" IS blocked
- [ ] No history entry saved for blocked requests

### Share
- [ ] "SHARE THIS WHOOPS" generates a 1080×1350 JPG share card
- [ ] All 3 templates render correctly
- [ ] Native Android share sheet opens with the image
- [ ] "SAVE TO GALLERY" saves the image and shows success feedback
- [ ] Share card contains subtle Whoops branding but does NOT look like an ad

### History
- [ ] Last 50 interactions saved to device
- [ ] History entries tappable — re-opens the advice screen
- [ ] Empty state shows personality message

### Stats
- [ ] Whoops received counter increments correctly
- [ ] Things done counter increments only when "I DID IT" is tapped
- [ ] Stats persist across app restarts

### Performance
- [ ] App cold start < 2 seconds
- [ ] Advice generation + display < 5 seconds on average
- [ ] No ANR (Application Not Responding) errors
- [ ] Share card generation < 2 seconds

### Design
- [ ] All screens match design system (colors, typography, spacing)
- [ ] No "AI" text anywhere in the UI
- [ ] Loading messages rotate correctly
- [ ] Haptics work (when enabled)
- [ ] App looks correct on: small Android (5"), standard (6"), large (6.7")

---

## 19. DO NOT BUILD (MVP)

These are explicitly out of scope for v1.0. Do not implement, scaffold, or stub these:

- ❌ User accounts / authentication
- ❌ Social features (followers, comments, public profiles, community)
- ❌ Push notifications
- ❌ Multiple AI personalities / characters
- ❌ Voice input or output
- ❌ Streaks or gamification beyond simple stats
- ❌ Leaderboards
- ❌ Subscription / paywall / in-app purchases
- ❌ Web version
- ❌ Admin dashboard
- ❌ Chat-style conversation interface
- ❌ Analytics dashboard
- ❌ A/B testing infrastructure
- ❌ Server-side rate limiting (client-side is sufficient for MVP)
- ❌ Complex AI memory or personalization
- ❌ More than 3 share card templates

---

## 21. MONETIZATION

### Strategy
Prove retention before monetizing. Confirm users return 3+ days
and share at least 1 card before activating Pro.

### Free Tier
- 5 bad advice requests per day
- All 3 share card templates
- History (last 7 days only)
- Basic stats
- Resets at midnight local time

### Whoops Pro — $2.99/month or $19.99/year
- Unlimited requests
- History forever
- Exclusive share card templates
- Early access to new features
- Subtle Pro badge on share cards

### Rate Limiting (MVP — Client Side)
- AsyncStorage key: whoops_usage_YYYY-MM-DD
- Daily limit: 5 requests
- Reset: midnight local time
- Limit message: "You've had enough bad advice today.
  Come back tomorrow for more terrible decisions. 😈"
- Move to Supabase Edge Function before public launch

---

## 22. PRE-LAUNCH SECURITY CHECKLIST

⚠️ MUST complete ALL items before public Play Store launch.

### Critical — API Key Security
Current state (development only):
- AI API keys stored as EXPO_PUBLIC_ variables
- Keys are embedded in APK and visible to anyone who decompiles it
- ACCEPTABLE for internal testing only

Required before launch:
- [ ] Create Supabase Edge Function: /functions/generate-advice
- [ ] Move DeepSeek API call into Edge Function
- [ ] Move Anthropic fallback call into Edge Function  
- [ ] Store DEEPSEEK_API_KEY and ANTHROPIC_API_KEY as true 
      Supabase secrets (not EXPO_PUBLIC_)
- [ ] Update services/deepseek.ts and services/anthropic.ts to 
      call our Edge Function URL instead of AI APIs directly
- [ ] Remove EXPO_PUBLIC_DEEPSEEK_API_KEY from app entirely
- [ ] Remove EXPO_PUBLIC_ANTHROPIC_API_KEY from app entirely
- [ ] Keep EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY 
      (these are safe — Supabase anon key is designed to be public, 
      protected by RLS policies)

### Other Pre-Launch Items
- [ ] Server-side rate limiting via Supabase Edge Function
      (replace client-side AsyncStorage limit)
- [ ] Add expo-build-properties plugin for minSdkVersion in Gradle
- [ ] Privacy Policy page (required for Play Store)
- [ ] Terms of Service page (required for Play Store)
- [ ] Play Store listing assets (screenshots, description, icon)
- [ ] Test on minimum 3 different Android device sizes
- [ ] Test on Android 8.0 (minSdkVersion 26)

---

## 20. CHANGELOG

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-08-21 | Initial spec created from plan.md + design.md |
| 1.1 | 2026-08-21 | Added monetization, pricing, rate limits |
| 1.3 | 2026-08-21 | Added pre-launch security checklist (Section 22) |

> 📌 Update this table every time a significant decision is made or spec changes.

---

*This document is the single source of truth for Whoops MVP development. All implementation decisions should reference this spec. When in doubt, refer back here before writing code.*

*😈 Terrible advice. Zero regrets.*
