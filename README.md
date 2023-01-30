## TODOs

- We might want to use https://github.com/pmndrs/react-three-next for building the final package (since leaving React in the production build does not sound like an effective solution)
- Use 2D image as a fallback for cases when user has a very old browser, or has JS disabled

## Usage

```html
<iframe src="https://mia-lisa-3d.vercel.app" height="90" width="90" title="Mia Lisa (3D Logo)" style="border: none"></iframe>
```

> Remember to set the `class` attribute if you have one. Also, the iframe is interactive, so if you have it wrapped in a link, like `<a>` — the link won't work out of the box.