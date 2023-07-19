# tourneyview

Does things with tournament data.

## Why?

I need to:

- Get information a given tournament
- Know what teams are playing in it
- See how those teams are doing at any given stage of the tournament

## Packages

- `common` for shared logic & types
- `importer` for gathering tournament data from various sources
- `renderer` for visualizing tournament data

## Usage

### Using a bundler

An ESM bundle (`dist/index.mjs`) is supplied by each package for use with bundlers (e.g. Webpack):

```ts
// Import base styles
import '@tourneyview/renderer/css/base.css';
import { EliminationRenderer, D3BracketAnimator } from '@tourneyview/renderer';
import { BattlefyImporter } from '@tourneyview/importer';

const renderer = new EliminationRenderer(1000, 1000, {
    animator: new D3BracketAnimator()
});
const importer = new BattlefyImporter();

importer.getMatches({ id: '62fe9a5bc19ee145a2efa31a' }).then(matches => {
   renderer.setData(matches); 
});

document.body.appendChild(renderer.getElement());
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
    <!-- Ensure dependencies are loaded beforehand; the renderer requires d3 and the importer requires axios -->
    <script src="https://cdn.jsdelivr.net/npm/d3@7"></script>
    <script src="https://cdn.jsdelivr.net/npm/axios@1.1.2/dist/axios.min.js"></script>
    <script src="@tourneyview/renderer/dist/index.iife.js"></script>
    <script src="@tourneyview/importer/dist/index.iife.js"></script>
    <script>
        const renderer = new TourneyviewRenderer.EliminationRenderer(1000, 1000, {
            animator: new TourneyviewRenderer.D3BracketAnimator()
        });
        document.body.appendChild(renderer.getElement());

        const importer = new TourneyviewRenderer.BattlefyImporter();

        importer.getMatches({ id: '643ad67d227ec44112fbaeb6' }).then(matches => {
            renderer.setData(matches);
        });
    </script>
</body>
```

