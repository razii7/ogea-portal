import bannerHero from '../assets/banners/baanner hero.jpg'
import champions from '../assets/banners/champions.jpg'
import banner150 from '../assets/banners/150.jpeg'
import bannerBaaner from '../assets/banners/baaner.jpg'
import bannerMain from '../assets/banners/bannerrrr.jpg'

export const BATCH_LIST = [
  "Batch 36",
  "Batch 37",
  "Batch 38",
  "Batch 39",
  "Batch 40",
  "Batch 41",
  "Batch 42"
]

export const MOCK_STATISTICS = {
  totalCount: 148,
  inkspireCount: 54,
  scholarcraftCount: 42,
  talentpulseCount: 52,
  // Backwards compatibility keys
  penreachCount: 54,
  paperpathCount: 42,
  talenttideCount: 52,
}

export const MOCK_ACHIEVEMENTS = [
  {
    _id: "ach-01",
    publicId: "ach-img-01",
    title: "1st Prize at National Inter-Collegiate Literary Symposium",
    category: "inkspire",
    categoryLabel: "InkSpire",
    recipient: "Ahmad Rayyan & Team",
    batch: "Batch 38",
    date: "2026-02-18",
    description: "Secured top honors in the national research essay and creative writing championship among 45 participating institutions.",
    image: champions,
    filename: "champions.jpg",
    tags: ["National Winner", "Literary", "Gold Medal"]
  },
  {
    _id: "ach-02",
    publicId: "ach-img-02",
    title: "Keynote Research Paper on Classical Arabic Semantics",
    category: "scholarcraft",
    categoryLabel: "ScholarCraft",
    recipient: "Muhammed Shamil",
    batch: "Batch 36",
    date: "2026-01-24",
    description: "Presented a peer-acclaimed seminar paper analyzing phonetic shifts in classical rhetoric at the International Linguistics Colloquium.",
    image: banner150,
    filename: "150.jpeg",
    tags: ["Research", "Colloquium", "Keynote"]
  },
  {
    _id: "ach-03",
    publicId: "ach-img-03",
    title: "Overall Champions at State Cultural Fest",
    category: "talentpulse",
    categoryLabel: "TalentPulse",
    recipient: "OGEA Cultural Delegation",
    batch: "Batch 39",
    date: "2025-12-14",
    description: "Swept premier podium positions across elocution, debate, calligraphy, and impromptu oratory at the apex state arts festival.",
    image: bannerHero,
    filename: "baanner-hero.jpg",
    tags: ["Champions", "Cultural", "State Level"]
  },
  {
    _id: "ach-04",
    publicId: "ach-img-04",
    title: "Published Anthology: 'Echoes of the Manuscript'",
    category: "inkspire",
    categoryLabel: "InkSpire",
    recipient: "Editorial Guild - Batch 37",
    batch: "Batch 37",
    date: "2025-11-20",
    description: "Authored and published a curated collection of contemporary student poetry and analytical essays with academic ISBN indexing.",
    image: bannerBaaner,
    filename: "baaner.jpg",
    tags: ["Publication", "Anthology", "Book Release"]
  },
  {
    _id: "ach-05",
    publicId: "ach-img-05",
    title: "First Place: All-Kerala Inter-Varsity Academic Debate",
    category: "talentpulse",
    categoryLabel: "TalentPulse",
    recipient: "Zayan Farhan & Adil Nabeel",
    batch: "Batch 40",
    date: "2025-10-28",
    description: "Emerged triumphant after five rigorous rounds debating ethical considerations in autonomous systems and educational equity.",
    image: bannerMain,
    filename: "bannerrrr.jpg",
    tags: ["Debate", "First Place", "Inter-Varsity"]
  },
  {
    _id: "ach-06",
    publicId: "ach-img-06",
    title: "Best Research Thesis in Heritage Epistemology",
    category: "scholarcraft",
    categoryLabel: "ScholarCraft",
    recipient: "Bilal Mansoor",
    batch: "Batch 37",
    date: "2025-09-15",
    description: "Awarded Best Young Researcher Citation for archival analysis and preservation methodology of ancient Malabar manuscripts.",
    image: champions,
    filename: "champions.jpg",
    tags: ["Best Thesis", "Archival", "Award"]
  },
  {
    _id: "ach-07",
    publicId: "ach-img-07",
    title: "Global Youth Leadership Fellowship Finalist",
    category: "talentpulse",
    categoryLabel: "TalentPulse",
    recipient: "Ibrahim Wafi",
    batch: "Batch 41",
    date: "2025-08-30",
    description: "Selected among top 30 South Asian youth leaders for social innovation and campus community guidance programs.",
    image: bannerHero,
    filename: "baanner-hero.jpg",
    tags: ["Fellowship", "Global", "Leadership"]
  },
  {
    _id: "ach-08",
    publicId: "ach-img-08",
    title: "Bilingual Translation Monograph: 'Voices of Truth'",
    category: "inkspire",
    categoryLabel: "InkSpire",
    recipient: "Translation Bureau - Batch 38",
    batch: "Batch 38",
    date: "2025-07-19",
    description: "Rendered classical moral philosophy texts into contemporary English with critical annotations and commentary.",
    image: banner150,
    filename: "150.jpeg",
    tags: ["Translation", "Critical Study", "Monograph"]
  },
  {
    _id: "ach-09",
    publicId: "ach-img-09",
    title: "National Arabic Calligraphy & Typographic Art Award",
    category: "talentpulse",
    categoryLabel: "TalentPulse",
    recipient: "Hamza Tariq",
    batch: "Batch 42",
    date: "2025-06-11",
    description: "Honored with the Juror's Special Trophy for classical Thuluth composition blended with modern geometric principles.",
    image: bannerBaaner,
    filename: "baaner.jpg",
    tags: ["Calligraphy", "Arts", "Special Trophy"]
  }
]

export const MOCK_ARTICLES = [
  {
    _id: "work-art-01",
    title: "Bridging Tradition and Modernity: The Role of Humanities in Contemporary Campus Life",
    category: "article",
    writer: "Ahmad Rayyan",
    batch: "Batch 38",
    createdAt: "2026-02-14T09:30:00.000Z",
    readTime: "5 min read",
    content: `In an era defined by lightning-fast digital revolutions and algorithmic landscapes, academic institutions stand at an unprecedented crossroads. The perpetual dilemma is whether to preserve time-honored intellectual traditions or reconstruct pedagogies around ephemeral market currents.

At OGEA, we argue that this binary is entirely false. True intellectual growth does not necessitate discarding our ancestral heritage; rather, it demands that we leverage classical wisdom to critique, contextualize, and direct contemporary innovation.

When students engage in seminar discourses, craft rigorous analytical treatises, and participate in cross-institutional exchanges, they do more than fulfill curricular requirements. They cultivate the rare faculty of discerning substance from spectacle. Humanistic inquiries teach us the architecture of empathy, ethical discernment, and articulate discourse—faculties that no generative tool can substitute.

As we witness our students producing scholarly journals and debating urgent sociopolitical topics, we are reminded that education is fundamentally a transformative vocation. The synthesis of rooted tradition and bold modernity is not merely a strategy for success; it is the cornerstone of responsible leadership.`
  },
  {
    _id: "work-story-01",
    title: "The Whispering Archive: A Tale of Shadows and Ink",
    category: "story",
    writer: "Muhammed Anas",
    batch: "Batch 39",
    createdAt: "2026-02-02T14:15:00.000Z",
    readTime: "7 min read",
    content: `The library in the northern wing always smelled of aged parchment, dry cloves, and the quiet persistence of rain. It was said that during the quiet hours between midnight and dawn, the shelves ceased being quiet furniture and began to converse.

Tariq leaned closer to the leather-bound codex resting on the teak lectern. The dust jacket carried no author's mark, only an embossed seal representing an owl perched above an open compass. As he turned the brittle page, a faint whisper rose like warmth off hot cobblestones.

"Knowledge is not that which is memorized," the margin note read in cinnabar ink. "Knowledge is that which radiates when all lamps have run dry of oil."

He traced the cursive script. It belonged to an alumnus from five decades prior—a scholar who had journeyed across deserts and oceans to preserve vanishing manuscripts. In that quiet corridor, surrounded by row upon row of bound treatises, Tariq felt the unbroken lineage of intellectual curiosity. The library had kept the vigil for centuries, and now the torch rested squarely in his hands.`
  },
  {
    _id: "work-poem-01",
    title: "Symphony of Midnight Quill",
    category: "poem",
    writer: "Zayan Farhan",
    batch: "Batch 40",
    createdAt: "2026-01-20T18:00:00.000Z",
    readTime: "3 min read",
    content: `Upon the desk where shadows dance and weep,
While slumber claims the world in tranquil sleep,
The quiet nib begins its rhythmic stride,
Where hopes and silent yearnings learn to glide.

Across the parchment's snowy, virgin plain,
Like silver drops of long-awaited rain,
Each stroke reveals a thought that yearned to breathe,
From depths of contemplation deep beneath.

We write not merely for the passing praise,
Nor fleeting honors of our transient days,
But that the sparks ignited in the soul
May guide a wandering pilgrim to the goal.

Let ink flow pure as water from the spring,
And in each quiet verse let justice ring;
For empires fall and towering citadels rust,
Yet truth inscribed shall never yield to dust.`
  },
  {
    _id: "work-essay-01",
    title: "Reclaiming the Agora: Public Discourse and Intellectual Humility",
    category: "essay",
    writer: "Bilal Mansoor",
    batch: "Batch 37",
    createdAt: "2026-01-10T11:20:00.000Z",
    readTime: "6 min read",
    content: `The ancient Athenian Agora was more than a physical marketplace; it was an incubator where arguments were refined in the furnace of public debate. Today's digital ecosystem offers infinite forums, yet authentic deliberation has rarely felt so impoverished.

The paradox of our hyperconnected century is polarization disguised as passion. To counter this decay of collective intelligence, we must cultivate intellectual humility as a premier academic virtue.

Intellectual humility does not denote weakness or absence of conviction. On the contrary, it is the disciplined acknowledgment that our perspectives, however rigorously formed, are inherently limited by our experiences. When a student enters a seminar room with the willingness to be corrected, education transforms from a contest of egos into a collaborative pilgrimage toward truth.

Through the initiatives of OGEA, we deliberately foster environments where disagreement is met with curiosity rather than contempt. By encouraging scholarly critiques, peer reviews, and multidisciplinary roundtables, we train students not merely to win debates, but to discover solutions that endure beyond polemics.`
  },
  {
    _id: "work-seminar-01",
    title: "Phonetic Shifts and Hermeneutic Trajectories in Classical Arabic Rhetoric",
    category: "seminar",
    writer: "Muhammed Shamil",
    batch: "Batch 36",
    createdAt: "2025-12-18T16:45:00.000Z",
    readTime: "9 min read",
    content: `## Abstract & Introduction

This research paper investigates the evolutionary trajectory of phonetic nuance within the classical *Balaghah* tradition, with focused emphasis on the morphological transitions documented between the 4th and 8th centuries AH. 

### 1. The Interplay Between Sound and Signification

In classical rhetoric, *I'jaz* (inimitability) is frequently evaluated not only through semantic layering (*Ma'ani*) and figurative elegance (*Bayan*), but fundamentally through acoustic symmetry (*Badi'*). The acoustic properties of guttural, dental, and labial consonants carry psychological resonance that reinforces propositional content.

### 2. Methodological Framework

By examining primary source corpora from Al-Jurjani, Al-Sakkaki, and Ibn Jinni, this paper categorizes vowel alterations and consonant assimilations across comparative textual samples. Our analysis demonstrates that phonetic modulation often precedes semantic intensification.

### 3. Implications for Contemporary Linguistics

Understanding these classical phonetic frameworks offers profound insights for modern sociolinguistics, cognitive prosody, and the computational processing of semitic texts. The synthesis shows that classical grammarians anticipated modern phonetic theories by nearly a millennium.`
  },
  {
    _id: "work-review-01",
    title: "Critical Review: 'The Architecture of Meaning in Postmodern Literature'",
    category: "review",
    writer: "Ibrahim Wafi",
    batch: "Batch 41",
    createdAt: "2025-11-28T13:10:00.000Z",
    readTime: "5 min read",
    content: `In his seminal work *The Architecture of Meaning*, Dr. K. M. Rahman attempts a daring synthesis: reconciling structuralist semiotics with existential humanism. 

The book is structured into four overarching sections, beginning with an exhaustive critique of deconstructive cynicism and concluding with an impassioned defense of narrative coherence. Rahman's central thesis asserts that language is neither an arbitrary prison-house nor an omniscient mirror, but an interactive bridge continually reconstructed by ethical intention.

What sets this monograph apart is its crisp clarity. Where many postmodern theorists retreat into impenetrable jargon, Rahman writes with luminous elegance. His analysis of poetic cadence in chapter four is particularly exhilarating, demonstrating how rhythm creates cognitive anticipation in the reader.

While one might contend that his treatment of non-linear digital literature is somewhat hurried, the treatise remains indispensable for students of literary criticism and comparative aesthetics. It is a masterful reminder that words retain sacred gravity.`
  },
  {
    _id: "work-letter-01",
    title: "An Epistle to the First-Year Student: Navigating Your Intellectual Horizon",
    category: "letter",
    writer: "Adil Nabeel",
    batch: "Batch 37",
    createdAt: "2025-11-05T08:00:00.000Z",
    readTime: "4 min read",
    content: `Dear Younger Colleague,

As you unpack your bags and gaze upon the sunlit quadrangle of this campus, you may feel an intoxicating blend of exhilaration and quiet trepidation. I write this letter to tell you: both emotions are entirely natural, and both are gifts.

You have joined a community with deep roots and soaring aspirations. The days ahead will test your endurance—dense readings, early morning lectures, demanding paper submissions, and vigorous debates that stretch late into the night.

In those moments when exhaustion whispers that you are falling behind, remember why you crossed these gates. You are not here simply to collect credentials or tick boxes on an evaluation sheet. You are here to awaken your dormant faculties, to forge lifelong brotherhood, and to equip yourself with tools to serve society.

Do not shy away from writing because you fear imperfection. Submit that article to InkSpire. Present that unfinished idea at ScholarCraft. Step onto the stage at TalentPulse. It is through repeated iterations of vulnerability that mastery is forged.

Welcome to this sacred voyage. We are proud to walk beside you.

Warmly,
Your Senior Brother in Scholarship`
  },
  {
    _id: "work-art-02",
    title: "Digital Epistemology: How Emerging Technologies Reshape Archival Research",
    category: "article",
    writer: "Hamza Tariq",
    batch: "Batch 42",
    createdAt: "2025-10-18T10:00:00.000Z",
    readTime: "6 min read",
    content: `The digitization of rare manuscripts has initiated an unprecedented renaissance in historical research. What once demanded months of hazardous travel to remote monasteries and private vaults can now be accessed with a few keystrokes on high-resolution displays.

Yet, this democratization of access introduces novel epistemic challenges. When physical materiality—the texture of parchment, the chemical composition of gall-nut ink, the watermarks of regional paper mills—is flattened into two-dimensional pixels, what dimensions of contextual data are inadvertently lost?

This article examines how modern optical character recognition (OCR) models trained on historical scripts, combined with multispectral imaging, are enabling researchers at OGEA to read previously illegible palimpsests. We argue for a hybrid methodology: embracing computational speed without forfeiting traditional codicological rigor.`
  },
  {
    _id: "work-essay-02",
    title: "Ethics in the Age of Algorithmic Governance",
    category: "essay",
    writer: "Salman Faris",
    batch: "Batch 38",
    createdAt: "2025-09-22T12:30:00.000Z",
    readTime: "5 min read",
    content: `As artificial intelligence systems transition from predictive tools to autonomous decision-making agents in education, healthcare, and justice administration, the question of ethical alignment has ceased to be theoretical.

Algorithms reflect the implicit assumptions, societal biases, and historical omissions of the datasets upon which they are trained. When automated systems optimize for narrow metrics of efficiency, they routinely compromise nuanced equity and human dignity.

It is imperative that scholars trained in ethical philosophy and civic justice actively engage in computer science dialogues. Technological progress stripped of moral stewardship is merely accelerated recklessness. We must demand transparent accountability, rigorous audits, and human-in-the-loop oversight for every system impacting public welfare.`
  }
]
