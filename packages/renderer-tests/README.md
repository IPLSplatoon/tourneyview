# @tourneyview/renderer-tests

Includes a suite of test cases made to speed up manual testing of bracket graphics made using [@tourneyview/renderer](https://www.npmjs.com/package/@tourneyview/renderer)

## Usage

```ts
import '@tourneyview/renderer/css/base.css';
import '@tourneyview/renderer-tests/css/base.css';
import { BracketRenderer, D3BracketAnimator } from '@tourneyview/renderer';
import { installTestHarness } from '@tourneyview/renderer-tests';

const renderer = new BracketRenderer({
    animator: new D3BracketAnimator()
});
document.body.appendChild(renderer.getElement());
installTestHarness(renderer);
```
