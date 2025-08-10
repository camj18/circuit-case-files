import React, { useEffect, useRef, useState } from 'react';
import Blockly from 'blockly';

const CodeEditor = ({ spl, sampleIndex, onLog }) => {
  const blocklyDiv = useRef(null);
  const workspaceRef = useRef(null);
  const codeRef = useRef('');
  const [running, setRunning] = useState(false);

  useEffect(() => {
    const toolbox = `
      <xml xmlns="https://developers.google.com/blockly/xml">
        <block type="read_spl"></block>
        <block type="spl_greater"></block>
        <block type="controls_if"></block>
        <block type="logic_compare"></block>
        <block type="math_number"></block>
        <block type="led"></block>
        <block type="buzzer"></block>
      </xml>
    `;

    workspaceRef.current = Blockly.inject(blocklyDiv.current, { toolbox });

    Blockly.Blocks['read_spl'] = {
      init: function () {
        this.appendDummyInput().appendField('read SPL');
        this.setOutput(true, 'Number');
        this.setColour(230);
        this.setTooltip('Read sound pressure level from microphone');
      }
    };
    Blockly.JavaScript['read_spl'] = function () {
      return ['SPL_VALUE', Blockly.JavaScript.ORDER_ATOMIC];
    };

    Blockly.Blocks['spl_greater'] = {
      init: function () {
        this.appendValueInput('THRESH').setCheck('Number').appendField('SPL >');
        this.setOutput(true, 'Boolean');
        this.setColour(210);
        this.setTooltip('Compare SPL to threshold');
      }
    };
    Blockly.JavaScript['spl_greater'] = function (block) {
      const value = Blockly.JavaScript.valueToCode(block, 'THRESH', Blockly.JavaScript.ORDER_NONE) || 0;
      return [`SPL_VALUE > ${value}`, Blockly.JavaScript.ORDER_ATOMIC];
    };

    Blockly.Blocks['led'] = {
      init: function () {
        this.appendValueInput('STATE').setCheck('Boolean').appendField('set LED');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(160);
        this.setTooltip('Control LED');
      }
    };
    Blockly.JavaScript['led'] = function (block) {
      const state = Blockly.JavaScript.valueToCode(block, 'STATE', Blockly.JavaScript.ORDER_NONE) || 'false';
      return `if(${state}) logEvent({type: 'alarm', component: 'led', state: true, index: SAMPLE_INDEX});\n`;
    };

    Blockly.Blocks['buzzer'] = {
      init: function () {
        this.appendValueInput('STATE').setCheck('Boolean').appendField('set buzzer');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(20);
        this.setTooltip('Control buzzer');
      }
    };
    Blockly.JavaScript['buzzer'] = function (block) {
      const state = Blockly.JavaScript.valueToCode(block, 'STATE', Blockly.JavaScript.ORDER_NONE) || 'false';
      return `if(${state}) logEvent({type: 'alarm', component: 'buzzer', state: true, index: SAMPLE_INDEX});\n`;
    };
  }, []);

  const run = () => {
    codeRef.current = Blockly.JavaScript.workspaceToCode(workspaceRef.current);
    setRunning(true);
  };

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => {
      const SPL_VALUE = spl;
      const SAMPLE_INDEX = sampleIndex;
      const logEvent = e => onLog(e); // eslint-disable-line no-unused-vars
      try {
        eval(codeRef.current);
      } catch (e) {
        console.error(e);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [running, spl, sampleIndex, onLog]);

  return (
    <div className="code-editor">
      <div ref={blocklyDiv} style={{ height: 300, width: 400 }} />
      <button onClick={run}>Run</button>
    </div>
  );
};

export default CodeEditor;
