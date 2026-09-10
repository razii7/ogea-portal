import { useState } from 'react'
import { Star, X, CheckCircle2, MessageSquareHeart, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BATCH_LIST } from '@/lib/mockData'

const WING_OPTIONS = [
  { id: 'inkspire', label: 'InkSpire (Publications)' },
  { id: 'scholarcraft', label: 'ScholarCraft (Research & Seminars)' },
  { id: 'talentpulse', label: 'TalentPulse (Spotlights & Arts)' },
  { id: 'portal', label: 'Portal Operations & Programs' },
]

const RATING_LABELS = {
  1: 'Needs Improvement',
  2: 'Fair Experience',
  3: 'Good Initiative',
  4: 'Very Impressive',
  5: 'Outstanding & Exceptional',
}

const ReviewModal = ({ isOpen, onClose, defaultWing = 'portal' }) => {
  const [rating, setRating] = useState(5)
  const [hoverRating, setHoverRating] = useState(0)
  const [wing, setWing] = useState(defaultWing)
  const [batch, setBatch] = useState('Batch 38')
  const [name, setName] = useState('')
  const [comment, setComment] = useState('')
  const [submitted, setSubmitted] = useState(false)

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!comment.trim()) return

    const newReview = {
      id: `rev-${Date.now()}`,
      rating,
      wing,
      batch,
      name: name.trim() || 'Anonymous Student',
      comment: comment.trim(),
      date: new Date().toISOString(),
    }

    try {
      const existing = JSON.parse(localStorage.getItem('ogea_portal_reviews') || '[]')
      localStorage.setItem('ogea_portal_reviews', JSON.stringify([newReview, ...existing]))
    } catch {
      // Ignore local storage error
    }

    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setName('')
      setComment('')
      onClose()
    }, 2200)
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-gray-100 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition cursor-pointer"
            aria-label="Close review modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <Badge className="bg-slate-500/20 text-slate-300 border-slate-500/30">
              <Sparkles className="w-3 h-3 mr-1" />
              Student Feedback Loop
            </Badge>
          </div>

          <h2 className="text-xl font-bold flex items-center gap-2">
            <MessageSquareHeart className="w-5 h-5 text-amber-400" />
            Outreach Portal Review
          </h2>
          <p className="text-xs text-gray-300 mt-1">
            Share your experience or suggest enhancements before exploring new features.
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          {submitted ? (
            <div className="py-10 text-center space-y-3 animate-in fade-in zoom-in-95">
              <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto animate-bounce" />
              <h3 className="text-xl font-bold text-gray-900">Review Submitted!</h3>
              <p className="text-sm text-gray-600 max-w-xs mx-auto">
                Thank you for helping us elevate the Student Outreach Management Portal.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Star Rating */}
              <div className="text-center py-2 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Rate Your Experience
                </p>
                <div className="flex justify-center gap-1.5 mb-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                      className="p-1 focus:outline-none transition-transform hover:scale-110 cursor-pointer"
                      aria-label={`${star} Stars`}
                    >
                      <Star
                        className={`w-7 h-7 transition-colors ${
                          (hoverRating || rating) >= star
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <p className="text-xs font-medium text-amber-600">
                  {RATING_LABELS[hoverRating || rating]}
                </p>
              </div>

              {/* Wing Selector */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Select Focus Initiative
                </label>
                <select
                  value={wing}
                  onChange={(e) => setWing(e.target.value)}
                  className="w-full text-sm bg-gray-50 border border-gray-300 rounded-lg p-2.5 text-gray-800 focus:ring-2 focus:ring-slate-500 font-medium"
                >
                  {WING_OPTIONS.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Name & Batch Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Your Name (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Rayyan"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-sm bg-gray-50 border border-gray-300 rounded-lg p-2 text-gray-800 focus:ring-2 focus:ring-slate-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Your Batch
                  </label>
                  <select
                    value={batch}
                    onChange={(e) => setBatch(e.target.value)}
                    className="w-full text-sm bg-gray-50 border border-gray-300 rounded-lg p-2 text-gray-800 focus:ring-2 focus:ring-slate-500 font-medium"
                  >
                    {BATCH_LIST.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Comments Textarea */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Feedback & Review Comments <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Tell us what worked well or what features you'd like to see added..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full text-sm bg-gray-50 border border-gray-300 rounded-lg p-3 text-gray-800 focus:ring-2 focus:ring-slate-500 resize-none"
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="text-gray-600 hover:bg-gray-100 text-xs cursor-pointer"
                >
                  Dismiss
                </Button>
                <Button
                  type="submit"
                  disabled={!comment.trim()}
                  className="bg-slate-600 hover:bg-slate-700 text-white text-xs font-semibold cursor-pointer shadow-sm disabled:opacity-50"
                >
                  Submit Review
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default ReviewModal
