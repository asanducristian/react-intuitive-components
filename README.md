# react-intuitive-ui

> The most intuitive ui components on the market.

**Just kidding.** This library is full of components meticulously crafted to **annoy** users. Every single aspect that feels like a bug? It’s not a bug—it’s a _feature_. Specifically designed to make data input as frustrating as possible.


## Install
Oh, come on. You know this already:

```bash
npm install --save react-intuitive-components
```

## Usage

## Usage

1. Import.
2. Implement.
3. Enjoy watching your customers rage-quit.

### Example

```tsx
import { ButtonGoodLuck, DatePickerStopper } from 'react-intuitive-ui';

// Example usage
<ButtonGoodLuck
    maxEscapes={5}
    onStop={() => console.log("Finally stopped escaping!")}
    buttonLabel="Click Me If You Can"
    onClick={() => console.log("Click!")}
/>;

<DatePickerStopper
    selectLabel="Select"
    resetLabel="Reset"
    submitLabel="Submit"
    onSubmit={(date) => console.log("Selected Date:", date)}
/>;
```

## License

MIT © [asanducristian](https://github.com/asanducristian)
