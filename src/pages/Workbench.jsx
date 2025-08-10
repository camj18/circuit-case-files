import React from 'react'
import Breadboard from '../components/Breadboard'
import ArduinoBoard from '../components/ArduinoBoard'
import ComponentPanel from '../components/ComponentPanel'
import WireCanvas from '../components/WireCanvas'
import HintPopover from '../components/HintPopover'
import TourOverlay from '../components/TourOverlay'

export default function Workbench() {
  const hints = [
    'Place the microphone on the breadboard',
    'Connect its output to pin A0',
    'Use a threshold block and run the program',
  ]

  return (
    <div className="flex gap-4 relative">
      <ComponentPanel
        components={['LED', 'Buzzer', 'Mic']}
        advanced={['Accelerometer']}
      />
      <div className="flex flex-col flex-1 gap-4 relative">
        <div className="flex flex-1 gap-4 relative">
          <div className="relative">
            <Breadboard />
            <WireCanvas />
          </div>
          <ArduinoBoard />
        </div>
        <HintPopover hints={hints} />
      </div>
      <TourOverlay />
    </div>
  )
}
