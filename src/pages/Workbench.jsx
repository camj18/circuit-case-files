import React from 'react'
import Breadboard from '../components/Breadboard'
import ArduinoBoard from '../components/ArduinoBoard'
import ComponentPanel from '../components/ComponentPanel'

export default function Workbench() {
  return (
    <div className="flex gap-4">
      <ComponentPanel />
      <div className="flex flex-col flex-1 gap-4">
        <div className="flex flex-1 gap-4">
          <Breadboard />
          <ArduinoBoard />
        </div>
        <button className="self-start px-3 py-1 bg-accent text-white rounded">
          Hint
        </button>
      </div>
    </div>
  )
}
