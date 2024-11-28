# react-intuitive-components

> The most intuitive ui components on the market.

**Just kidding.** This library is full of components meticulously crafted to **annoy** users. Every single aspect that feels like a bug? It’s not a bug—it’s a _feature_. Specifically designed to make data input as frustrating as possible.


## Install
Oh, come on. You know this already:

```bash
# Using NPM
npm install react-intuitive-components

# Using Yarn
yarn add react-intuitive-components

# Using PNPM
pnpm add react-intuitive-components
```

## Usage

1. Import.
2. Implement.
3. Enjoy watching your customers rage-quit.

### Example

```tsx
import { ButtonChaseMe, DatePickerStopper } from 'react-intuitive-components';

// Example usage
<ButtonChaseMe
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


## FAQ

**Q: Why would I use this library?**  
A: To challenge your users and keep them on their toes. Or maybe you secretly hate them. I won’t judge.

**Q: How do I contribute?**  
A: Contribute?! To this? Contributions are always welcome! Whether you have a brilliant idea to make the library even more "intuitive" (read: frustrating) or want to fix something, I’d love your input. Here's how you can contribute:

1. Fork the repository.
2. Create a new branch for your feature or fix:
   ```bash
   git checkout -b your-branch-name
   ```
3. Make your changes, ensuring they align with the library's *unique philosophy*.
4. Test your changes thoroughly to ensure the chaos remains consistent.
5. Commit your changes with a descriptive message:
   ```bash
   git commit -m "Add an amazing new feature"
   ```
6. Push to your fork:
   ```bash
   git push origin your-branch-name
   ```
7. Open a pull request and describe your changes.

I’ll review your contribution and, if it fits the vibe, merge it in. Let’s keep the fun going together!


## License

MIT © [asanducristian](https://github.com/asanducristian)
