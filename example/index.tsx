import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { DatePickerAdd, DatePickerInputRandom, DatePickerRandom, DatePickerSlider, DatePickerStopper, ButtonChaseMe, ReverseTextInput, ButtonRussianRoulette, MagicCursorProvider, ReverseScrollProvider, MouseTrailProvider, ButtonExtraLongClick, ButtonFlashbang, LaggyInput, SideScrollProvider, MathCaptcha, InfiniteScrollProvider } from '../.';

const App = () => {
  const [captchaOpened, setCaptchaOpened] = React.useState(false);
  return (


    // <ReverseScrollProvider>
    // <MouseTrailProvider maxTrailLength={100}>
    // <SideScrollProvider>
    // <MagicCursorProvider intervalTime={1000}>
    <InfiniteScrollProvider>
      <div style={{ backgroundColor: 'gray', width: '100%', height: '100%', maxWidth: '100%' }}>
        <DatePickerAdd style={'dark'} onSubmit={(date) => { console.log(date) }} />
        <DatePickerInputRandom format="retarded" onSubmit={(date) => { console.log(date) }} />
        <DatePickerRandom onSubmit={(date) => { console.log(date) }} />
        <DatePickerSlider onSubmit={(date) => { console.log(date) }} />
        <DatePickerStopper onSubmit={(date) => { console.log(date) }} />

        <ButtonChaseMe onClick={() => { console.log("click") }} />
        <ButtonRussianRoulette onFavorable={() => { console.log("favorable") }} />
        <ButtonExtraLongClick clickTime={10000} onLongClick={() => { console.log("long click") }} onNotLongEnoughClick={() => { console.log("not so long click") }} />
        <ButtonFlashbang flashDuration={2000} onClick={() => { console.log("flashbanged") }} />

        <ReverseTextInput onChange={(value) => { console.log(value) }} />
        <LaggyInput onChange={(value) => { console.log(value) }} />

        {captchaOpened && (
          <MathCaptcha noQuestionAnswered={() => { console.log("no q answered"); setCaptchaOpened(false) }} onMonkey={() => { console.log("MONKEY IQ"); setCaptchaOpened(false) }} onStupid={() => { console.log("STUPID IQ"); setCaptchaOpened(false) }} onAverage={() => { console.log("AVERAGE IQ"); setCaptchaOpened(false) }} onGenius={() => { console.log("GENIUS IQ"); setCaptchaOpened(false) }} />
        )}
      </div>
    </InfiniteScrollProvider>
    // </MagicCursorProvider>
    // </SideScrollProvider>
    // </MouseTrailProvider>
    //     </ReverseScrollProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));