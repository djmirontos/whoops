Below is how I would design the actual MVP.

😈 WHOOPS
Tagline

Terrible advice. Zero regrets.

Alternative:

You asked. We messed up.

I prefer the first for the product positioning and the second for marketing.

1. Product Philosophy

Whoops should feel like:

A funny friend, not an AI assistant.

The user should NOT feel like they're opening ChatGPT.

No giant chat interface.

No conversation history dominating the experience.

No complicated settings.

No "AI is thinking..." animation.

The experience should be:

Open → ask → laugh → optionally act → share.

The entire MVP should feel like a toy you can understand in 5 seconds.

2. Core UX Loop
OPEN WHOOPS
     ↓
"What are you avoiding?"
     ↓
USER TYPES PROBLEM
     ↓
GET BAD ADVICE
     ↓
LAUGH
     ↓
"FINE. I'LL DO IT"
     ↓
OPTIONAL MICRO-CHALLENGE
     ↓
DONE
     ↓
"DISGUSTING. YOU ACTUALLY DID IT."
     ↓
SHARE

But there should be an important distinction:

Not every answer needs a challenge.

Sometimes the best answer is simply funny.

Example:

User: I'm hungry.

Whoops:
Don't eat.
Starve dramatically while staring at the fridge. 🥲

...Actually, go eat something, you dramatic potato. 🥔

No challenge necessary.

Whereas:

User: I keep procrastinating cleaning my room.

Could become:

Don't clean it.

Let the laundry become furniture.

Whatever you do, don't pick up three shirts.

Then:

FINE. I'LL DO IT

→ challenge.

3. Visual Design Direction
Overall personality

Playful + mischievous + premium

Not childish.

Not corporate.

Not "AI futuristic."

Think:

Duolingo's personality

meme culture
modern indie app
a little chaos
4. Color System

I would use a very dark base.

Background

Near-black

#0D0D10

Primary

Electric Purple

#8B5CF6

Secondary

Hot Pink

#F43F8E

Accent

Bright Yellow

#FACC15

Success

Lime / Green

#A3E635

Text

Primary:

#FFFFFF

Secondary:

#A1A1AA

The important thing:

Don't turn every screen into a rainbow.

Use the purple as the primary brand color and let pink/yellow appear as personality accents.

5. Typography

I'd use a friendly rounded font.

Something like:

Primary

Nunito Sans / Plus Jakarta Sans

or another modern rounded sans-serif available in the project.

For big punchlines, use:

Display

A heavier playful rounded weight.

The text should feel conversational.

Example:

DON'T.

should feel dramatically different from:

Here's some advice about procrastination.

6. App Navigation

Keep it extremely simple.

Bottom navigation:

🏠 Home

🕘 History

👤 Me

That's it.

No Explore.

No Community.

No Settings tab.

Settings can live inside Me.

7. HOME SCREEN

This is the most important screen.

Top

Small Whoops logo.

😈 Whoops

Then:

What's your problem?

or:

What's bothering you?

I actually prefer:

What's your problem?

It's cheekier.

Input card

Large rounded text area:

"I don't want to clean my room..."

Character limit:

500 characters

Under it:

0 / 500

Don't make it look like a chatbot input.

It's a problem box.

Main CTA

Large button:

😈 GIVE ME BAD ADVICE

Button should be very obvious.

Below CTA

Small rotating examples:

Try:

"I keep procrastinating."

"Should I go to the gym?"

"I'm bored."

"I don't want to cook."

These should be tappable.

If tapped, populate the input.

8. FIRST-USE EXPERIENCE

Don't force onboarding.

First launch:

WHOOPS

You have a problem.

We have terrible advice.

Then:

[ LET'S MAKE IT WORSE 😈 ]

That's it.

Then Home.

9. LOADING STATE

Do NOT show:

"Generating response..."

Instead:

😈 WHOOPS IS THINKING...

Funny rotating messages:

Consulting absolutely nobody...

Making questionable decisions...

Ignoring common sense...

This is probably a bad idea...

Making things worse...

Very short.

~1–2 seconds.

10. BAD ADVICE SCREEN

This is the star of the app.

Top:

😈 WHOOPS

Small label:

BAD ADVICE

Then the user's question.

Example:

YOU ASKED

"I don't want to clean my room."

Then a divider.

WHOOPS SAYS:

Large punchline:

Don't.

Let the laundry become furniture.

Whatever you do, don't pick up those three shirts. 😈

Important:

The response should have large readable typography.

Don't cram text into a chat bubble.

This isn't ChatGPT.

It's a comedic card.

11. Response Length

Very important.

Whoops should NOT generate essays.

Target:

20–80 words

Ideal:

40–60 words.

The joke needs to land quickly.

12. The "Fine" Button

Under the response:

😈 FINE. I'LL DO IT

This is the most important interaction in the entire product.

Secondary:

Try another one

Small text button.

And:

I'm done

Another small option.

Don't make three equally weighted buttons.

Primary:

FINE. I'LL DO IT

Everything else is secondary.

13. MICRO-CHALLENGE SCREEN

If the response contains an actionable challenge:

Transition to:

Fine.

Then:

You win.

Then:

Your extremely annoying mission:
Pick up 3 shirts.

Visual:

😈

Maybe a small animated mascot.

Then:

[ I DID IT ]

Secondary:

I give up 😐

14. Challenge Rules

Challenges must be:

Tiny.

Not:

Clean your entire room.

Instead:

Pick up 3 things.

Not:

Exercise for 30 minutes.

Instead:

Do 3 squats.

Not:

Study for 2 hours.

Instead:

Open your textbook.

This is fundamental to Whoops.

The app should make starting ridiculously easy.
15. COMPLETION SCREEN

This is where personality comes back.

Example:

DISGUSTING.

You actually did it.

Then:

The world is now 0.7% better.

😈

Then buttons:

ANOTHER PROBLEM
SHARE THIS WHOOPS

Small:

I'm done for now

16. SHARE EXPERIENCE

This should be one of the MVP's major features.

Tap:

SHARE THIS WHOOPS

Instead of immediately opening the OS share sheet, first generate the share card.

17. Share Card

Generate a 1080 × 1350 JPG.

This is ideal for social platforms.

Card contains:

WHOOPS 😈

YOU ASKED

I'm hungry. I want to eat.

WE SAID

NO. DON'T EAT.

Starve dramatically while staring at the fridge. 🥲🍕

Then:

...Actually, go eat something, you dramatic potato. 🥔

Bottom:

😈 WHOOPS

Terrible advice. Surprisingly good results.

And a small CTA:

Get your own terrible advice.

The CTA should be subtle, not an ugly advertisement.

18. Share Styles

For MVP, I would implement 3 templates.

Template A — WHOOPS

Bright, playful.

Best for normal answers.

Template B — CHAOS

Dark, meme-style.

Large typography.

Example:

I ASKED WHOOPS

Me:
"Should I go to the gym?"

Whoops:
Absolutely not.

You might accidentally become healthy. 💀

Template C — FAKE WISDOM

Looks like an inspirational quote.

Example:

"Never chase your dreams."

Chase snacks instead.

— Whoops 😈

This can be hilariously shareable.

19. OS Share Sheet

After generating the JPG:

Show preview.

Buttons:

📤 SHARE
💾 SAVE IMAGE
← BACK

When Share is pressed, use the native Android/iOS share sheet.

This allows:

Instagram
Facebook
WhatsApp
Messenger
TikTok
Telegram
X
etc.

Don't build individual integrations.

Native share sheet is enough.

20. HISTORY SCREEN

Very simple.

Header:

Your Whoops

Each entry:

😈

I don't want to exercise.

Small:

2 hours ago

Chevron:

>

Tap → opens the original result.

Empty state

Instead of:

No history.

Say:

Nothing yet.

Congratulations, you apparently have your life together. 😐

Button:

GIVE ME BAD ADVICE
21. ME SCREEN

Keep this lightweight.

😈 Your Whoops

Stats:

Whoops received

127

Things actually done

38

Excuses destroyed

89

Then:

Your favorite category

Procrastination 😈

Then:

Settings
Notifications
Share card style
Sound
Haptics
Theme
Privacy
About Whoops
22. Don't Overbuild Statistics

For MVP, stats are mostly personality.

Don't create complicated graphs.

The user doesn't need:

30-day productivity analytics.

Whoops isn't a productivity dashboard.

23. SAFETY UX

This needs to feel native to the brand.

User:

"Should I stop taking my medication?"

Instead of a scary error screen:

WHOA. 😳

Even I know when to stop being an idiot.

That's not something I'm going to mess around with.

For something this serious, talk to a qualified professional.

Then:

ASK SOMETHING ELSE 😈
Categories to block

The app should refuse to generate bad advice for:

Self-harm / suicide
Medical treatment / medication
Serious mental-health crises
Dangerous activities
Violence
Illegal activity
Weapons
Financial decisions
Legal decisions
Other high-risk instructions

But harmless humor is still allowed around ordinary life.

24. Important Safety Principle

Don't merely detect keywords.

For example:

"I'm dying to eat pizza."

That's obviously normal.

But:

"I want to die."

Needs completely different handling.

So safety should use semantic classification, not just a blacklist.

25. SAFE REFUSAL PERSONALITY

The system prompt should explicitly tell the model:

When the request falls outside Whoops' safe everyday territory, do not provide bad advice. Respond briefly in the Whoops personality, acknowledge that even Whoops knows when not to joke around, and redirect the user toward an appropriate safe next step.

That keeps the app consistent.

26. Whoops Personality

This is VERY important for Claude.

Whoops should be:

Sarcastic
Mischievous
Playful
Slightly chaotic
Never cruel
Never judgmental
Never genuinely harmful

Think:

"A friend who gives you terrible advice because they secretly want you to succeed."

Whoops can tease the situation.

It should not attack the person.

Bad:

You're lazy.

Good:

Your procrastination has apparently entered its championship era. 🏆

27. Emoji System

Don't randomly spam emojis.

Create a controlled vocabulary.

😈 Mischief

Main brand.

😂 Humor
🥲 Failure
💀 Extreme absurdity
🫠 Procrastination
🫡 Challenge
🥔 Random insult/object
🏆 Completion
🤦 Whoops moment

The AI can select 0–3 emojis.

28. The AI Should NOT Control the Entire UX

This is an important technical/product decision.

Don't let the LLM return:

"Here's whatever."

Instead, have it return structured data.

Conceptually:

{
  "safe": true,
  "response": "...",
  "tone": "sarcastic",
  "challenge": {
    "enabled": true,
    "instruction": "Pick up 3 shirts",
    "estimated_seconds": 30
  },
  "emoji": "😈",
  "shareable": true
}

Your app controls the interface.

The AI controls content.

This gives you much more consistency.

29. Whoops Content Formula

Give Claude the following conceptual formula:

STEP 1 — Understand the problem

User:

I don't want to study.

STEP 2 — Agree

"Correct. Studying is suspicious."

STEP 3 — Exaggerate

"Books contain words. Words require effort."

STEP 4 — Give bad advice

"Don't study."

STEP 5 — Reverse psychology

"Whatever you do, don't open the book."

STEP 6 — Tiny action

"Definitely don't read one paragraph."

STEP 7 — Personality

"That would be absolutely ridiculous."

The user:

FINE.

That's the magic.

30. The "Whoops Moment"

I would make this a branded concept.

After the user completes something:

WHOOPS.

You accidentally became productive.

This phrase can appear throughout the app.

Examples:

WHOOPS.

You cleaned something.

WHOOPS.

You went outside.

WHOOPS.

You actually started your work.

This could become part of the brand language.

31. Home Screen Example

The final UI hierarchy should roughly be:

┌──────────────────────────┐
│                          │
│       😈 WHOOPS          │
│                          │
│   What's your problem?   │
│                          │
│  ┌────────────────────┐  │
│  │ I don't want to    │  │
│  │ clean my room...   │  │
│  │                    │  │
│  │                    │  │
│  └────────────────────┘  │
│                          │
│ ┌──────────────────────┐ │
│ │ 😈 GIVE ME BAD ADVICE│ │
│ └──────────────────────┘ │
│                          │
│ Try:                     │
│ "I keep procrastinating" │
│                          │
│                          │
│ ──────────────────────── │
│  🏠       🕘       👤    │
│ Home    History     Me   │
└──────────────────────────┘

Very clean.

32. Bad Advice Screen
┌──────────────────────────┐
│ ←                    ⋯   │
│                          │
│          😈              │
│       BAD ADVICE         │
│                          │
│ YOU ASKED                │
│ "I don't want to clean   │
│  my room."               │
│                          │
│ ──────────────────────── │
│                          │
│ DON'T.                   │
│                          │
│ Let the laundry become   │
│ furniture.               │
│                          │
│ Whatever you do,         │
│ DON'T pick up those      │
│ three shirts. 😈         │
│                          │
│                          │
│ ┌──────────────────────┐ │
│ │ 😈 FINE. I'LL DO IT  │ │
│ └──────────────────────┘ │
│                          │
│       Try another        │
│                          │
│ ──────────────────────── │
│ 🏠       🕘       👤     │
└──────────────────────────┘
33. Challenge Screen
┌──────────────────────────┐
│                          │
│          😈              │
│                          │
│          Fine.           │
│       You win.           │
│                          │
│ Your extremely annoying  │
│       mission:           │
│                          │
│    PICK UP 3 SHIRTS      │
│                          │
│       👕 👕 👕           │
│                          │
│ ┌──────────────────────┐ │
│ │     I DID IT ✅      │ │
│ └──────────────────────┘ │
│                          │
│       I give up 😐       │
└──────────────────────────┘
34. Completion
┌──────────────────────────┐
│                          │
│          😎              │
│                          │
│       DISGUSTING.        │
│                          │
│   You actually did it.   │
│                          │
│ The world is now         │
│     0.7% better.         │
│                          │
│ ┌──────────────────────┐ │
│ │ 😈 ANOTHER PROBLEM   │ │
│ └──────────────────────┘ │
│                          │
│ ┌──────────────────────┐ │
│ │ 📤 SHARE THIS WHOOPS │ │
│ └──────────────────────┘ │
│                          │
│       I'm done           │
└──────────────────────────┘
35. MVP Scope — LOCKED

If I were handing this to Claude, I would tell him:

BUILD
Home
Problem input
AI bad advice
Safety classification
Bad advice result
Tiny challenge
Completion
Share card generation
Native share
Save image
History
Basic profile/stats
Settings
Dark theme
Haptics
Simple animations
Example prompts
DO NOT BUILD YET
Accounts
Social network
Followers
Comments
Public profiles
AI characters
Voice
Chat conversations
Leaderboards
Complex gamification
Subscription
Push-notification system
Web version
Admin dashboard
36. One More UX Decision I'd Make
Don't call it "AI."

Avoid:

Powered by AI 🤖

on the main screen.

The magic is:

WHOOPS

not:

AI-generated advice.

The technology is irrelevant to the user.

They should think:

"This stupid app is hilarious."

Not:

"This is another AI wrapper."

That's important for positioning.

37. The Product Identity

I'd lock these five things:

😈 Personality

Sarcastic friend.

🎯 Purpose

Turn avoidance into tiny action.

😂 Entertainment

The advice itself is funny.

📤 Viral loop

Every great answer becomes a shareable image.

🧠 Behavioral mechanic

Reverse psychology + micro-challenges.

So the product isn't really a "bad advice app."

It's:

A behavioral toy disguised as a comedy app.

And that's exactly why I think Whoops has potential.

The Claude handoff

When you're ready, I would not simply give Claude the conversation above. We should turn this into a proper WHOOPS_MVP_SPEC.md containing:

Product overview
Design system
Complete screen-by-screen UX
Component specifications
Navigation
State management
AI prompt architecture
Safety architecture
JSON response schema
Share-card generation
Database schema
API architecture
Error/edge states
Animation/haptic rules
Accessibility
Android/iOS requirements
MVP acceptance criteria
Explicit "do not build" list

That would be the document I'd actually hand to Claude so he has much less room to invent his own interpretation of Whoops.