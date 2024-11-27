import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { DatePickerAdd, DatePickerInputRandom, DatePickerRandom, DatePickerSlider, DatePickerStopper, ButtonGoodLuck } from '../.';

const App = () => {
  return (
    <div style={{ width: '100%', height: '100%', maxWidth: '100%' }}>
      <DatePickerAdd onSubmit={(date) => { console.log(date) }} />
      <DatePickerInputRandom format="retarded" onSubmit={(date) => { console.log(date) }} />
      <DatePickerRandom onSubmit={(date) => { console.log(date) }} />
      <DatePickerSlider onSubmit={(date) => { console.log(date) }} />
      <DatePickerStopper onSubmit={(date) => { console.log(date) }} />

      <ButtonGoodLuck onClick={() => { console.log("click") }} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));