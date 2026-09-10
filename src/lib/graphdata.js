// List of batches (7 batches: Batch 36 to Batch 42)
export const BATCHES = [
  "Batch 36",
  "Batch 37",
  "Batch 38",
  "Batch 39",
  "Batch 40",
  "Batch 41",
  "Batch 42",
]

// List of months
export const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

// Total batchwise data (for main chart)
export const totalBatchwiseData = [
  { batch: "Batch 36", points: 1950 },
  { batch: "Batch 37", points: 1720 },
  { batch: "Batch 38", points: 2180 },
  { batch: "Batch 39", points: 1460 },
  { batch: "Batch 40", points: 1120 },
  { batch: "Batch 41", points: 890 },
  { batch: "Batch 42", points: 640 },
]

// Monthwise data - each month contains batch points for all 7 batches
export const monthwiseData = {
  November: [
    { batch: "Batch 36", points: 380 },
    { batch: "Batch 37", points: 340 },
    { batch: "Batch 38", points: 490 },
    { batch: "Batch 39", points: 260 },
    { batch: "Batch 40", points: 210 },
    { batch: "Batch 41", points: 170 },
    { batch: "Batch 42", points: 120 },
  ],
  October: [
    { batch: "Batch 36", points: 310 },
    { batch: "Batch 37", points: 280 },
    { batch: "Batch 38", points: 390 },
    { batch: "Batch 39", points: 230 },
    { batch: "Batch 40", points: 180 },
    { batch: "Batch 41", points: 140 },
    { batch: "Batch 42", points: 90 },
  ],
  September: [
    { batch: "Batch 36", points: 290 },
    { batch: "Batch 37", points: 260 },
    { batch: "Batch 38", points: 350 },
    { batch: "Batch 39", points: 210 },
    { batch: "Batch 40", points: 160 },
    { batch: "Batch 41", points: 130 },
    { batch: "Batch 42", points: 100 },
  ],
  August: [
    { batch: "Batch 36", points: 240 },
    { batch: "Batch 37", points: 210 },
    { batch: "Batch 38", points: 280 },
    { batch: "Batch 39", points: 190 },
    { batch: "Batch 40", points: 150 },
    { batch: "Batch 41", points: 110 },
    { batch: "Batch 42", points: 80 },
  ],
  July: [
    { batch: "Batch 36", points: 270 },
    { batch: "Batch 37", points: 240 },
    { batch: "Batch 38", points: 310 },
    { batch: "Batch 39", points: 200 },
    { batch: "Batch 40", points: 140 },
    { batch: "Batch 41", points: 120 },
    { batch: "Batch 42", points: 90 },
  ],
  June: [
    { batch: "Batch 36", points: 210 },
    { batch: "Batch 37", points: 180 },
    { batch: "Batch 38", points: 220 },
    { batch: "Batch 39", points: 160 },
    { batch: "Batch 40", points: 120 },
    { batch: "Batch 41", points: 100 },
    { batch: "Batch 42", points: 70 },
  ],
  May: [
    { batch: "Batch 36", points: 150 },
    { batch: "Batch 37", points: 130 },
    { batch: "Batch 38", points: 140 },
    { batch: "Batch 39", points: 120 },
    { batch: "Batch 40", points: 90 },
    { batch: "Batch 41", points: 70 },
    { batch: "Batch 42", points: 50 },
  ],
  April: [
    { batch: "Batch 36", points: 100 },
    { batch: "Batch 37", points: 80 },
    { batch: "Batch 38", points: 0 },
    { batch: "Batch 39", points: 90 },
    { batch: "Batch 40", points: 70 },
    { batch: "Batch 41", points: 50 },
    { batch: "Batch 42", points: 40 },
  ],
}

// Chart configuration
export const chartConfig = {
  points: {
    label: "Points",
    color: "var(--chart-1)",
  },
}