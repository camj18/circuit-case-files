import { useState } from 'react';
import Breadboard from '../components/Breadboard';
import ComponentPanel from '../components/ComponentPanel';
import ArduinoBoard from '../components/ArduinoBoard';
import AnimatedScene from '../components/AnimatedScene';
import SignalVisualizer from '../components/SignalVisualizer';
import { exampleMicTrace } from '../logic/signalSimulation';

export default function Workbench() {
  const [signal] = useState(exampleMicTrace());

  return (
    <div className="p-4 space-y-4">
      <div className="flex gap-4">
        <ComponentPanel />
        <Breadboard />
        <ArduinoBoard />
      </div>
      <div className="flex gap-4">
        <AnimatedScene />
        <SignalVisualizer data={signal} />
      </div>
    </div>
  );
}
