import { useEffect, useRef } from 'react';
import * as Blockly from 'blockly';

export default function CodeEditor() {
  const blocklyRef = useRef(null);

  useEffect(() => {
    if (blocklyRef.current) {
      Blockly.inject(blocklyRef.current, { toolbox: '<xml></xml>' });
    }
  }, []);

  return (
    <div className="p-4">
      <div className="h-96" ref={blocklyRef}></div>
    </div>
  );
}
