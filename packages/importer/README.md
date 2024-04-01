# @tourneyview/importer

Gathers tournament data from various sources.

## Supported platforms

- [start.gg](https://www.start.gg/) using `StartggImporter`
  - Double & Single Elimination brackets
  - Swiss brackets
  - Round Robin brackets
- [Battlefy](https://battlefy.com/) using `BattlefyImporter`
  - Double & Single Elimination brackets
  - Swiss brackets
  - Round Robin brackets

## Usage

### Using a bundler

An ESM bundle (`dist/index.mjs`) is supplied for use with bundlers (e.g. Webpack):

```ts
import { BattlefyImporter } from '@tourneyview/importer';

const importer = new BattlefyImporter();

importer.getMatches({ id: '62fe9a5bc19ee145a2efa31a' }).then(matches => {
   console.log('Loaded tournament data:', matches);
});
```

### Without a bundler

Using tourneyview without a bundler is largely untested for the time being. Feel free to file an issue if something isn't working as expected.  
When working without a builder, use the IIFE bundles of tourneyview (`dist/index.iife.js`) after loading the necessary dependencies:

```html
<head>
    <meta charset="UTF-8">
    <title>tourneyview</title>
</head>
<body>
    <!-- Ensure dependencies are loaded beforehand -->
    <script src="https://cdn.jsdelivr.net/npm/axios@1.1.2/dist/axios.min.js"></script>
    <script src="@tourneyview/importer/dist/index.iife.js"></script>
    <script>
        const importer = new TourneyviewRenderer.BattlefyImporter();

        importer.getMatches({ id: '62fe9a5bc19ee145a2efa31a' }).then(matches => {
            console.log('Loaded tournament data:', matches);
        });
    </script>
</body>
```
