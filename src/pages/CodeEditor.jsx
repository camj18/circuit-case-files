import React, { useEffect, useRef, useState } from 'react'
import Blockly from 'blockly'
import 'blockly/blocks'
import 'blockly/javascript'

export default function CodeEditor() {
  const blocklyDiv = useRef(null)
  const workspaceRef = useRef(null)
  const [textMode, setTextMode] = useState(false)
  const [code, setCode] = useState('')
  const [log, setLog] = useState([])

  useEffect(() => {
    workspaceRef.current = Blockly.inject(blocklyDiv.current, {
      toolbox: `<xml xmlns="https://developers.google.com/blockly/xml">
        <block type="controls_if"></block>
        <block type="logic_compare"></block>
        <block type="math_number"></block>
        <block type="text_print"></block>
      </xml>`,
    })
  }, [])

  const generateCode = () => {
    const generated = Blockly.JavaScript.workspaceToCode(workspaceRef.current)
    setCode(generated)
    return generated
  }

  const run = () => {
    const generated = generateCode()
    const output = []
    const original = console.log
    console.log = (...args) => output.push(args.join(' '))
    try {
      eval(generated)
    } catch (e) {
      output.push(`Error: ${e.message}`)
    }
    console.log = original
    setLog(output)
  }

  const reset = () => {
    workspaceRef.current.clear()
    setLog([])
    setCode('')
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <button
          onClick={run}
          className="px-3 py-1 bg-primary text-white rounded"
        >
          Run
        </button>
        <button
          onClick={reset}
          className="px-3 py-1 bg-secondary text-white rounded"
        >
          Reset
        </button>
        <button
          onClick={() => {
            generateCode()
            setTextMode((m) => !m)
          }}
          className="px-3 py-1 bg-accent text-white rounded"
        >
          {textMode ? 'Blocks' : 'Text'}
        </button>
      </div>
      <div className="flex gap-4">
        <div
          ref={blocklyDiv}
          className={`flex-1 h-72 ${textMode ? 'hidden' : 'block'}`}
        ></div>
        {textMode && (
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 h-72 border p-2 font-mono"
          />
        )}
      </div>
      <div className="border p-2 h-32 overflow-auto bg-black text-green-400 text-sm">
        {log.map((l, i) => (
          <div key={i}>{l}</div>
        ))}
      </div>
    </div>
  )
}
