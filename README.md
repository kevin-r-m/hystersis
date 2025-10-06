## Smoothed Loading With Hystersis

> This is an proof of concept and very much a work in progress.

Exploring strategies to _smooth_ out loading when the requests length may be volatile. I dislike flashing that may occur with loading states when network requests are between fast and slow. This is an exploration into resolving that.

Potential use cases:

- Developing a mobile application and have concerns with internet speed.
- Working with a backend that you may not control that sees spike usage.

### Example: useSmoothLoading Hook

`useSmoothLoading` provides a smooth loading indicator for async UI states, ensuring the loader appears only after a delay and remains visible for a minimum time.

```tsx
import { useSmoothLoading } from "./src/hooks/useSmoothLoading";

function MyComponent({ isLoading }) {
  const isLoaderShown = useSmoothLoading(isLoading, {
    showDelay: 500, // ms to wait before showing loader
    minVisible: 400, // ms loader stays visible once shown
    hideDelay: 200, // ms cushion before hiding
  });

  return <div>{isLoaderShown ? <div>Loading...</div> : <div>Loaded!</div>}</div>;
}
```

**Parameters:**

- `isLoading`: boolean indicating if your async operation is in progress
- `showDelay`: (optional) ms to wait before showing loader (default: 500)
- `minVisible`: (optional) ms loader stays visible once shown (default: 400)
- `hideDelay`: (optional) ms cushion before hiding (default: 200)

**Returns:**

- `isLoaderShown`: boolean, true if loader should be visible

## Contributing

Pull requests are welcome. For major changes, please open an issue first.

## License

[MIT](LICENSE)
