import React, { useState } from 'react'
import { Alert, AlertDescription, AlertTitle } from '../../ui/alert'
import { Button } from '../../ui/button'
import { Badge } from '../../ui/badge'
import { Info, X, Sparkles } from 'lucide-react'

const WelcomeAlert = () => {
  const [isVisible, setIsVisible] = useState(true)

  const handleClose = () => {
    setIsVisible(false)
  }

  const handleVisitDrive = () => {
    window.open('https://drive.google.com/drive/folders/1z-Q5CfkDy-2D0T9tDwXYXL6Uv1jrkkSk', '_blank', 'noopener,noreferrer')
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="max-w-lg w-full animate-in slide-in-from-bottom-4 duration-300">
        <Alert className="bg-white shadow-2xl border-slate-200">
          {/* Icon */}
          <Info className="h-5 w-5 text-slate-600" />
          
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
            aria-label="Close alert"
          >
            <X className="h-4 w-4 text-gray-500" />
          </button>

          {/* Content */}
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="default" className="bg-slate-600 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              New
            </Badge>
          </div>
          
          <AlertTitle className="text-lg font-bold text-gray-900 pr-8">
            Participate in Programs
          </AlertTitle>
          
          <AlertDescription className="space-y-4 mt-2">
            <p className="text-gray-600">
                Join various programs to enhance your skills and contribute to the community. Click the button below to explore available opportunities on our Google Drive.
            </p>
            
            <div className="flex gap-3 pt-2">
              <Button 
                onClick={handleVisitDrive}
                className="bg-slate-600 hover:bg-slate-700 text-white cursor-pointer"
              >
                Visit Google Drive
              </Button>
              
              <Button 
                onClick={handleClose}
                variant="outline"
                className="border-gray-300 hover:bg-gray-50 cursor-pointer"
              >
                Maybe Later
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      </div>
    </div>
  )
}

export default WelcomeAlert
