# @tourneyview/renderer

Visualizes tournament data.

## Features

- Rendering tournaments brackets using `BracketRenderer`
  - Supported bracket types:
    - Double and Single Elimination
    - Round Robin
    - Swiss

## Usage

### Using a bundler

An ESM bundle (`dist/index.mjs`) is supplied by each package for use with bundlers (e.g. Webpack):

```ts
// Import base styles
import '@tourneyview/renderer/css/base.css';
import { EliminationRenderer, D3BracketAnimator } from '@tourneyview/renderer';

const renderer = new EliminationRenderer(1000, 1000, {
    animator: new D3BracketAnimator()
});
document.body.appendChild(renderer.getElement());

renderer.setData(/* Tournament data */);
```

### Without a bundler

Using tourneyview without a bundler is largely untested for the time being. Feel free to file an issue if something isn't working as expected.  
When working without a builder, use the IIFE bundles of tourneyview (`dist/index.iife.js`) after loading the necessary dependencies:

```html
<head>
    <meta charset="UTF-8">
    <title>tourneyview</title>
    <!-- Import base styles -->
    <link rel="stylesheet" href="@tourneyview/renderer/css/base.css">
</head>
<body>
    <!-- Ensure dependencies are loaded beforehand -->
    <script src="https://cdn.jsdelivr.net/npm/d3@7"></script>
    <script src="@tourneyview/renderer/dist/index.iife.js"></script>
    <script>
        const renderer = new TourneyviewRenderer.BracketRenderer({
            animator: new TourneyviewRenderer.D3BracketAnimator()
        });
        document.body.appendChild(renderer.getElement());

        renderer.setData(/* Tournament data */);
    </script>
</body>
```
