const worksCategories = ['article', 'story', 'poem', 'essay', 'seminar', 'review', 'letter']
const imgCategories = ['inkspire', 'scholarcraft', 'talentpulse']

const categoryMeta = {
  inkspire: {
    label: 'InkSpire',
    legacyKey: 'penreach',
    description: 'Publications & Creative Writing',
    color: 'indigo',
  },
  scholarcraft: {
    label: 'ScholarCraft',
    legacyKey: 'paperpath',
    description: 'Seminar Papers & Research',
    color: 'amber',
  },
  talentpulse: {
    label: 'TalentPulse',
    legacyKey: 'talenttide',
    description: 'Student Spotlights & Talents',
    color: 'emerald',
  },
}

export { worksCategories, imgCategories, categoryMeta }