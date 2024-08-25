# CLIPPO | Styles 🎨

Print style utils such as colors, gradients, images, icons, links, tables, columns, QRs code hightlight etc. Built for CLIPPO and designed for CLI and backend tools

[![License](https://img.shields.io/github/license/pigeonposse/@clippo/styles?color=green&style=for-the-badge&logoColor=white)](/LICENSE)
[![Version](https://img.shields.io/npm/v/@clippo/styles?color=blue&style=for-the-badge&logoColor=white)](https://www.npmjs.com/package/@clippo/styles)

## Installation

```bash
npm i @clippo/styles
# or
pnpm i @clippo/styles
# or
yarn add @clippo/styles
```

## Functions

### box()

```ts
function box(text: string, options?: Options): string
```

Creates a styled box around the provided text.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `text` | `string` | The text inside the box. |
| `options`? | `Options` | - |

#### Returns

`string`

- The text with the styled box around it.

The box.

#### Param

The text to display inside the box.

#### Param

Optional configuration options for the box.

#### See

<https://www.npmjs.com/package/boxen>

#### Examples

```ts
const boxedText = box('This is a boxed text', { padding: 1 });
console.log(boxedText);
```

```js
import boxen from 'boxen';

console.log(boxen('unicorn', {padding: 1}));
// ┌─────────────┐
// │             │
// │   unicorn   │
// │             │
// └─────────────┘

console.log(boxen('unicorn', {padding: 1, margin: 1, borderStyle: 'double'}));
//
// ╔═════════════╗
// ║             ║
// ║   unicorn   ║
// ║             ║
// ╚═════════════╝
//
```

***

### color()

```ts
function color(...text: unknown[]): string
```

Provides colors for terminal output using picocolors.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| ...`text` | `unknown`[] |

#### Returns

`string`

#### Example

```ts
console.log(color.green('This text is green'));
```

***

### columns()

```ts
function columns(data: any[] | Record<string, any>, options?: GlobalOptions): string
```

Formats data into aligned columns for better readability.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | `any`[] \| `Record`\<`string`, `any`\> | The data to format into columns. |
| `options`? | `GlobalOptions` | Optional configuration options for column formatting. |

#### Returns

`string`

- The text with the data formatted into columns.

#### See

<https://www.npmjs.com/package/columnify>

#### Example

```ts
// data for columns
const data = [
    {
        name: 'mod1',
        description: 'some description which happens to be far larger than the max',
        version: '0.0.1',
    },
    {
        name: 'module-two',
        description: 'another description larger than the max',
        version: '0.2.0',
    }
];

// set columns with custom config
const columnText = columns(data, {
    showHeaders: false,
    minWidth: 20,
    config: {
        description: {
            maxWidth: 30
        }
    }
});

// print columns
console.log(columnText);
```

***

### font()

```ts
function font(txt: string, font?: Fonts): string
```

Generates ASCII art text using the specified font.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `txt` | `string` | The text to render as ASCII art. |
| `font`? | `Fonts` | The font to use for rendering. Defaults to 'Standard'. |

#### Returns

`string`

- The ASCII art text.

#### Example

```ts
const asciiText = font('Hello, World!', '3-D');
console.log(asciiText);
```

***

### gradient()

```ts
function gradient(
   txt: string, 
   colors: GradientColors, 
   opts?: GradientOpts): string
```

Generates a gradient string with the specified colors.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `txt` | `string` | The text to apply the gradient to. |
| `colors` | [`GradientColors`](index.md#gradientcolors) | An array of color names or hex values. |
| `opts`? | [`GradientOpts`](index.md#gradientopts) | Custom opts. |

#### Returns

`string`

- The text with the applied gradient.

#### Example

```ts
// Example usage:
const gradientText = gradient('Gradient Text', ['red', 'yellow', 'green']);
console.log(gradientText);
```

***

### highlight()

```ts
function highlight(code: string, opts?: HighlightOptions): string
```

Highlights the given code using CLI highlighting.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `code` | `string` | The code to highlight. |
| `opts`? | `HighlightOptions` | Optional options for highlighting. |

#### Returns

`string`

- The highlighted code.

#### Example

```ts
const code = `
function greet(name) {
    return 'Hello, ' + name + '!';
}
console.log(greet('World'));
`;

const highlightedCode = highlight(code, { language: 'javascript' });
console.log(highlightedCode);
```

***

### link()

```ts
function link(text: string, url: string): string
```

Creates a clickable hyperlink in the terminal, if supported.
If terminal doesn't support clickable links, returns the URL string.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `text` | `string` | The text to display as the link. |
| `url` | `string` | The URL to link to. |

#### Returns

`string`

- The clickable hyperlink or URL string.

#### Example

```ts
const linkedText = link('Visit Clippo docs', 'https://clippo.pigeonposse.com');
console.log(linkedText);
```

***

### table()

```ts
function table(data: unknown[][], userConfig?: TableUserConfig): string
```

Generates a text-based table from the provided data array.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | `unknown`[][] | The data to display in the table. |
| `userConfig`? | `TableUserConfig` | - |

#### Returns

`string`

- The text-based table.

#### See

<https://www.npmjs.com/package/table>

#### Example

```ts
const data = [
    ['Name', 'Age', 'Country'],
    ['John', 30, 'USA'],
    ['Alice', 25, 'UK'],
    ['Bob', 35, 'Canada'],
];
const tableText = table(data);
console.log(tableText);
```

## Type Aliases

### Fonts

```ts
type Fonts: figlet.Fonts;
```

***

### GradientColors

```ts
type GradientColors: string[] | {
  color: string;
  pos: number;
 }[];
```

***

### GradientOpts

```ts
type GradientOpts: {
  hsvSpin: "short" | "long";
  interpolation: "rgb" | "hsv";
};
```

#### Type declaration

| Name | Type | Description |
| ------ | ------ | ------ |
| `hsvSpin` | `"short"` \| `"long"` | Used only in the case of HSV interpolation. Because hue can be considered as a circle, there are two ways to go from a color to another color. HsvSpin can be either short or long, depending on if you want to take the shortest or the longest way between two colors. Defaults to short. Case insensitive. |
| `interpolation` | `"rgb"` \| `"hsv"` | The gradient can be generated using RGB or HSV interpolation. HSV usually produces brighter colors. Interpolation can be set to rgb for RGB interpolation, orhsv for HSV interpolation. Defaults to rgb. Case insentitive. |

***

### HighlightOpts

```ts
type HighlightOpts: Parameters<typeof highlight>[1];
```

## Variables

### icon

```ts
const icon: {
  almostEqual: string;
  arrowDown: string;
  arrowLeft: string;
  arrowLeftRight: string;
  arrowRight: string;
  arrowUp: string;
  arrowUpDown: string;
  bullet: string;
  checkboxCircleOff: string;
  checkboxCircleOn: string;
  checkboxOff: string;
  checkboxOn: string;
  circle: string;
  circleCircle: string;
  circleCross: string;
  circleDotted: string;
  circleDouble: string;
  circleFilled: string;
  circlePipe: string;
  circleQuestionMark: string;
  cross: string;
  dot: string;
  ellipsis: string;
  fiveEighths: string;
  fiveSixths: string;
  fourFifths: string;
  greaterOrEqual: string;
  hamburger: string;
  heart: string;
  home: string;
  identical: string;
  infinity: string;
  info: string;
  lessOrEqual: string;
  line: string;
  lineBackslash: string;
  lineBold: string;
  lineCross: string;
  lineDashed0: string;
  lineDashed1: string;
  lineDashed10: string;
  lineDashed11: string;
  lineDashed12: string;
  lineDashed13: string;
  lineDashed14: string;
  lineDashed15: string;
  lineDashed2: string;
  lineDashed3: string;
  lineDashed4: string;
  lineDashed5: string;
  lineDashed6: string;
  lineDashed7: string;
  lineDashed8: string;
  lineDashed9: string;
  lineDouble: string;
  lineDownBoldLeft: string;
  lineDownBoldLeftBold: string;
  lineDownBoldLeftBoldRight: string;
  lineDownBoldLeftBoldRightBold: string;
  lineDownBoldLeftRight: string;
  lineDownBoldLeftRightBold: string;
  lineDownBoldRight: string;
  lineDownBoldRightBold: string;
  lineDownDoubleLeft: string;
  lineDownDoubleLeftDouble: string;
  lineDownDoubleLeftDoubleRightDouble: string;
  lineDownDoubleLeftRight: string;
  lineDownDoubleRight: string;
  lineDownDoubleRightDouble: string;
  lineDownLeft: string;
  lineDownLeftArc: string;
  lineDownLeftBold: string;
  lineDownLeftBoldRight: string;
  lineDownLeftBoldRightBold: string;
  lineDownLeftDouble: string;
  lineDownLeftDoubleRightDouble: string;
  lineDownLeftRight: string;
  lineDownLeftRightBold: string;
  lineDownRight: string;
  lineDownRightArc: string;
  lineDownRightBold: string;
  lineDownRightDouble: string;
  lineSlash: string;
  lineUpBoldDownBoldLeft: string;
  lineUpBoldDownBoldLeftBold: string;
  lineUpBoldDownBoldLeftBoldRight: string;
  lineUpBoldDownBoldLeftBoldRightBold: string;
  lineUpBoldDownBoldLeftRight: string;
  lineUpBoldDownBoldLeftRightBold: string;
  lineUpBoldDownBoldRight: string;
  lineUpBoldDownBoldRightBold: string;
  lineUpBoldDownLeft: string;
  lineUpBoldDownLeftBold: string;
  lineUpBoldDownLeftBoldRight: string;
  lineUpBoldDownLeftBoldRightBold: string;
  lineUpBoldDownLeftRight: string;
  lineUpBoldDownLeftRightBold: string;
  lineUpBoldDownRight: string;
  lineUpBoldDownRightBold: string;
  lineUpBoldLeft: string;
  lineUpBoldLeftBold: string;
  lineUpBoldLeftBoldRight: string;
  lineUpBoldLeftBoldRightBold: string;
  lineUpBoldLeftRight: string;
  lineUpBoldLeftRightBold: string;
  lineUpBoldRight: string;
  lineUpBoldRightBold: string;
  lineUpDoubleDownDoubleLeft: string;
  lineUpDoubleDownDoubleLeftDouble: string;
  lineUpDoubleDownDoubleLeftDoubleRightDouble: string;
  lineUpDoubleDownDoubleLeftRight: string;
  lineUpDoubleDownDoubleRight: string;
  lineUpDoubleDownDoubleRightDouble: string;
  lineUpDoubleLeft: string;
  lineUpDoubleLeftDouble: string;
  lineUpDoubleLeftDoubleRightDouble: string;
  lineUpDoubleLeftRight: string;
  lineUpDoubleRight: string;
  lineUpDoubleRightDouble: string;
  lineUpDownBoldLeft: string;
  lineUpDownBoldLeftBold: string;
  lineUpDownBoldLeftBoldRight: string;
  lineUpDownBoldLeftBoldRightBold: string;
  lineUpDownBoldLeftRight: string;
  lineUpDownBoldLeftRightBold: string;
  lineUpDownBoldRight: string;
  lineUpDownBoldRightBold: string;
  lineUpDownLeft: string;
  lineUpDownLeftBold: string;
  lineUpDownLeftBoldRight: string;
  lineUpDownLeftBoldRightBold: string;
  lineUpDownLeftDouble: string;
  lineUpDownLeftDoubleRightDouble: string;
  lineUpDownLeftRight: string;
  lineUpDownLeftRightBold: string;
  lineUpDownRight: string;
  lineUpDownRightBold: string;
  lineUpDownRightDouble: string;
  lineUpLeft: string;
  lineUpLeftArc: string;
  lineUpLeftBold: string;
  lineUpLeftBoldRight: string;
  lineUpLeftBoldRightBold: string;
  lineUpLeftDouble: string;
  lineUpLeftDoubleRightDouble: string;
  lineUpLeftRight: string;
  lineUpLeftRightBold: string;
  lineUpRight: string;
  lineUpRightArc: string;
  lineUpRightBold: string;
  lineUpRightDouble: string;
  lineVertical: string;
  lineVerticalBold: string;
  lineVerticalDashed0: string;
  lineVerticalDashed1: string;
  lineVerticalDashed10: string;
  lineVerticalDashed11: string;
  lineVerticalDashed2: string;
  lineVerticalDashed3: string;
  lineVerticalDashed4: string;
  lineVerticalDashed5: string;
  lineVerticalDashed6: string;
  lineVerticalDashed7: string;
  lineVerticalDashed8: string;
  lineVerticalDashed9: string;
  lineVerticalDouble: string;
  lozenge: string;
  lozengeOutline: string;
  musicNote: string;
  musicNoteBeamed: string;
  mustache: string;
  nodejs: string;
  notEqual: string;
  oneEighth: string;
  oneFifth: string;
  oneHalf: string;
  oneNinth: string;
  oneQuarter: string;
  oneSeventh: string;
  oneSixth: string;
  oneTenth: string;
  oneThird: string;
  play: string;
  pointer: string;
  pointerSmall: string;
  questionMarkPrefix: string;
  radioOff: string;
  radioOn: string;
  sevenEighth: string;
  smiley: string;
  square: string;
  squareBottom: string;
  squareCenter: string;
  squareDarkShade: string;
  squareLeft: string;
  squareLightShade: string;
  squareMediumShade: string;
  squareRight: string;
  squareSmall: string;
  squareSmallFilled: string;
  squareTop: string;
  star: string;
  subscriptEight: string;
  subscriptFive: string;
  subscriptFour: string;
  subscriptNine: string;
  subscriptOne: string;
  subscriptSeven: string;
  subscriptSix: string;
  subscriptThree: string;
  subscriptTwo: string;
  subscriptZero: string;
  threeEighths: string;
  threeFifths: string;
  threeQuarters: string;
  tick: string;
  triangleDown: string;
  triangleDownSmall: string;
  triangleLeft: string;
  triangleLeftSmall: string;
  triangleRight: string;
  triangleRightSmall: string;
  triangleUp: string;
  triangleUpOutline: string;
  triangleUpSmall: string;
  twoFifths: string;
  twoThirds: string;
  warning: string;
 } = figures;
```

Unicode symbols with fallbacks for older terminals.

#### Type declaration

| Name | Type |
| ------ | ------ |
| `almostEqual` | `string` |
| `arrowDown` | `string` |
| `arrowLeft` | `string` |
| `arrowLeftRight` | `string` |
| `arrowRight` | `string` |
| `arrowUp` | `string` |
| `arrowUpDown` | `string` |
| `bullet` | `string` |
| `checkboxCircleOff` | `string` |
| `checkboxCircleOn` | `string` |
| `checkboxOff` | `string` |
| `checkboxOn` | `string` |
| `circle` | `string` |
| `circleCircle` | `string` |
| `circleCross` | `string` |
| `circleDotted` | `string` |
| `circleDouble` | `string` |
| `circleFilled` | `string` |
| `circlePipe` | `string` |
| `circleQuestionMark` | `string` |
| `cross` | `string` |
| `dot` | `string` |
| `ellipsis` | `string` |
| `fiveEighths` | `string` |
| `fiveSixths` | `string` |
| `fourFifths` | `string` |
| `greaterOrEqual` | `string` |
| `hamburger` | `string` |
| `heart` | `string` |
| `home` | `string` |
| `identical` | `string` |
| `infinity` | `string` |
| `info` | `string` |
| `lessOrEqual` | `string` |
| `line` | `string` |
| `lineBackslash` | `string` |
| `lineBold` | `string` |
| `lineCross` | `string` |
| `lineDashed0` | `string` |
| `lineDashed1` | `string` |
| `lineDashed10` | `string` |
| `lineDashed11` | `string` |
| `lineDashed12` | `string` |
| `lineDashed13` | `string` |
| `lineDashed14` | `string` |
| `lineDashed15` | `string` |
| `lineDashed2` | `string` |
| `lineDashed3` | `string` |
| `lineDashed4` | `string` |
| `lineDashed5` | `string` |
| `lineDashed6` | `string` |
| `lineDashed7` | `string` |
| `lineDashed8` | `string` |
| `lineDashed9` | `string` |
| `lineDouble` | `string` |
| `lineDownBoldLeft` | `string` |
| `lineDownBoldLeftBold` | `string` |
| `lineDownBoldLeftBoldRight` | `string` |
| `lineDownBoldLeftBoldRightBold` | `string` |
| `lineDownBoldLeftRight` | `string` |
| `lineDownBoldLeftRightBold` | `string` |
| `lineDownBoldRight` | `string` |
| `lineDownBoldRightBold` | `string` |
| `lineDownDoubleLeft` | `string` |
| `lineDownDoubleLeftDouble` | `string` |
| `lineDownDoubleLeftDoubleRightDouble` | `string` |
| `lineDownDoubleLeftRight` | `string` |
| `lineDownDoubleRight` | `string` |
| `lineDownDoubleRightDouble` | `string` |
| `lineDownLeft` | `string` |
| `lineDownLeftArc` | `string` |
| `lineDownLeftBold` | `string` |
| `lineDownLeftBoldRight` | `string` |
| `lineDownLeftBoldRightBold` | `string` |
| `lineDownLeftDouble` | `string` |
| `lineDownLeftDoubleRightDouble` | `string` |
| `lineDownLeftRight` | `string` |
| `lineDownLeftRightBold` | `string` |
| `lineDownRight` | `string` |
| `lineDownRightArc` | `string` |
| `lineDownRightBold` | `string` |
| `lineDownRightDouble` | `string` |
| `lineSlash` | `string` |
| `lineUpBoldDownBoldLeft` | `string` |
| `lineUpBoldDownBoldLeftBold` | `string` |
| `lineUpBoldDownBoldLeftBoldRight` | `string` |
| `lineUpBoldDownBoldLeftBoldRightBold` | `string` |
| `lineUpBoldDownBoldLeftRight` | `string` |
| `lineUpBoldDownBoldLeftRightBold` | `string` |
| `lineUpBoldDownBoldRight` | `string` |
| `lineUpBoldDownBoldRightBold` | `string` |
| `lineUpBoldDownLeft` | `string` |
| `lineUpBoldDownLeftBold` | `string` |
| `lineUpBoldDownLeftBoldRight` | `string` |
| `lineUpBoldDownLeftBoldRightBold` | `string` |
| `lineUpBoldDownLeftRight` | `string` |
| `lineUpBoldDownLeftRightBold` | `string` |
| `lineUpBoldDownRight` | `string` |
| `lineUpBoldDownRightBold` | `string` |
| `lineUpBoldLeft` | `string` |
| `lineUpBoldLeftBold` | `string` |
| `lineUpBoldLeftBoldRight` | `string` |
| `lineUpBoldLeftBoldRightBold` | `string` |
| `lineUpBoldLeftRight` | `string` |
| `lineUpBoldLeftRightBold` | `string` |
| `lineUpBoldRight` | `string` |
| `lineUpBoldRightBold` | `string` |
| `lineUpDoubleDownDoubleLeft` | `string` |
| `lineUpDoubleDownDoubleLeftDouble` | `string` |
| `lineUpDoubleDownDoubleLeftDoubleRightDouble` | `string` |
| `lineUpDoubleDownDoubleLeftRight` | `string` |
| `lineUpDoubleDownDoubleRight` | `string` |
| `lineUpDoubleDownDoubleRightDouble` | `string` |
| `lineUpDoubleLeft` | `string` |
| `lineUpDoubleLeftDouble` | `string` |
| `lineUpDoubleLeftDoubleRightDouble` | `string` |
| `lineUpDoubleLeftRight` | `string` |
| `lineUpDoubleRight` | `string` |
| `lineUpDoubleRightDouble` | `string` |
| `lineUpDownBoldLeft` | `string` |
| `lineUpDownBoldLeftBold` | `string` |
| `lineUpDownBoldLeftBoldRight` | `string` |
| `lineUpDownBoldLeftBoldRightBold` | `string` |
| `lineUpDownBoldLeftRight` | `string` |
| `lineUpDownBoldLeftRightBold` | `string` |
| `lineUpDownBoldRight` | `string` |
| `lineUpDownBoldRightBold` | `string` |
| `lineUpDownLeft` | `string` |
| `lineUpDownLeftBold` | `string` |
| `lineUpDownLeftBoldRight` | `string` |
| `lineUpDownLeftBoldRightBold` | `string` |
| `lineUpDownLeftDouble` | `string` |
| `lineUpDownLeftDoubleRightDouble` | `string` |
| `lineUpDownLeftRight` | `string` |
| `lineUpDownLeftRightBold` | `string` |
| `lineUpDownRight` | `string` |
| `lineUpDownRightBold` | `string` |
| `lineUpDownRightDouble` | `string` |
| `lineUpLeft` | `string` |
| `lineUpLeftArc` | `string` |
| `lineUpLeftBold` | `string` |
| `lineUpLeftBoldRight` | `string` |
| `lineUpLeftBoldRightBold` | `string` |
| `lineUpLeftDouble` | `string` |
| `lineUpLeftDoubleRightDouble` | `string` |
| `lineUpLeftRight` | `string` |
| `lineUpLeftRightBold` | `string` |
| `lineUpRight` | `string` |
| `lineUpRightArc` | `string` |
| `lineUpRightBold` | `string` |
| `lineUpRightDouble` | `string` |
| `lineVertical` | `string` |
| `lineVerticalBold` | `string` |
| `lineVerticalDashed0` | `string` |
| `lineVerticalDashed1` | `string` |
| `lineVerticalDashed10` | `string` |
| `lineVerticalDashed11` | `string` |
| `lineVerticalDashed2` | `string` |
| `lineVerticalDashed3` | `string` |
| `lineVerticalDashed4` | `string` |
| `lineVerticalDashed5` | `string` |
| `lineVerticalDashed6` | `string` |
| `lineVerticalDashed7` | `string` |
| `lineVerticalDashed8` | `string` |
| `lineVerticalDashed9` | `string` |
| `lineVerticalDouble` | `string` |
| `lozenge` | `string` |
| `lozengeOutline` | `string` |
| `musicNote` | `string` |
| `musicNoteBeamed` | `string` |
| `mustache` | `string` |
| `nodejs` | `string` |
| `notEqual` | `string` |
| `oneEighth` | `string` |
| `oneFifth` | `string` |
| `oneHalf` | `string` |
| `oneNinth` | `string` |
| `oneQuarter` | `string` |
| `oneSeventh` | `string` |
| `oneSixth` | `string` |
| `oneTenth` | `string` |
| `oneThird` | `string` |
| `play` | `string` |
| `pointer` | `string` |
| `pointerSmall` | `string` |
| `questionMarkPrefix` | `string` |
| `radioOff` | `string` |
| `radioOn` | `string` |
| `sevenEighth` | `string` |
| `smiley` | `string` |
| `square` | `string` |
| `squareBottom` | `string` |
| `squareCenter` | `string` |
| `squareDarkShade` | `string` |
| `squareLeft` | `string` |
| `squareLightShade` | `string` |
| `squareMediumShade` | `string` |
| `squareRight` | `string` |
| `squareSmall` | `string` |
| `squareSmallFilled` | `string` |
| `squareTop` | `string` |
| `star` | `string` |
| `subscriptEight` | `string` |
| `subscriptFive` | `string` |
| `subscriptFour` | `string` |
| `subscriptNine` | `string` |
| `subscriptOne` | `string` |
| `subscriptSeven` | `string` |
| `subscriptSix` | `string` |
| `subscriptThree` | `string` |
| `subscriptTwo` | `string` |
| `subscriptZero` | `string` |
| `threeEighths` | `string` |
| `threeFifths` | `string` |
| `threeQuarters` | `string` |
| `tick` | `string` |
| `triangleDown` | `string` |
| `triangleDownSmall` | `string` |
| `triangleLeft` | `string` |
| `triangleLeftSmall` | `string` |
| `triangleRight` | `string` |
| `triangleRightSmall` | `string` |
| `triangleUp` | `string` |
| `triangleUpOutline` | `string` |
| `triangleUpSmall` | `string` |
| `twoFifths` | `string` |
| `twoThirds` | `string` |
| `warning` | `string` |

#### See

<https://github.com/sindresorhus/figures/blob/main/index.js>

#### Example

```ts
console.log( 
  icon.warning, 
  icon.cross, 
  icon.arrowDown, 
  icon.bullet 
)
```

## Examples

```js
import {
 box, 
 table, 
 columns,
} from '@clippo/styles'

console.log( box( 'v1.0.0', {
 title   : 'collect',
 padding : 2,
} ) )

console.log( table( [
 [
  '0A', '0B', '0C',
 ],
 [
  '1A', '1B', '1C',
 ],
 [
  '2A', '2B', '2C',
 ],
] ) )
  
console.log( columns( [
 {
  name        : 'mod1',
  description : 'some description which happens to be far larger than the max',
  version     : '0.0.1',
 }, {
  name        : 'module-two',
  description : 'another description larger than the max',
  version     : '0.2.0',
 },
], {
 minWidth : 20,
 config   : {
  description : {
   maxWidth : 30,
  },
 },
} ) )
```

## More info

- [Documentation](https://clippo.pigeonposse.com/)
- [Installation](https://clippo.pigeonposse.com/guide/getting-started#installation)

## 👨‍💻 Development

**CLIPPO** is an open-source project and its development is open to anyone who wants to participate.

[![Issues](https://img.shields.io/badge/Issues-grey?style=for-the-badge)](https://github.com/pigeonposse/clippo/issues)
[![Pull requests](https://img.shields.io/badge/Pulls-grey?style=for-the-badge)](https://github.com/pigeonposse/clippo/pulls)
[![Read more](https://img.shields.io/badge/Read%20more-grey?style=for-the-badge)](https://clippo.pigeonposse.com/)

## ☕ Donate

Help us to develop more interesting things.

[![Donate](https://img.shields.io/badge/Donate-grey?style=for-the-badge)](https://pigeonposse.com/?popup=donate)

## 📜 License

This software is licensed with **[GPL-3.0](/LICENSE)**.

[![Read more](https://img.shields.io/badge/Read-more-grey?style=for-the-badge)](/LICENSE)

## 🐦 About us

*PigeonPosse* is a ✨ **code development collective** ✨ focused on creating practical and interesting tools that help developers and users enjoy a more agile and comfortable experience. Our projects cover various programming sectors and we do not have a thematic limitation in terms of projects.

[![More](https://img.shields.io/badge/Read-more-grey?style=for-the-badge)](https://github.com/pigeonposse)

### Collaborators

|                                                                                    | Name        | Role         | GitHub                                         |
| ---------------------------------------------------------------------------------- | ----------- | ------------ | ---------------------------------------------- |
| <img src="https://github.com/angelespejo.png?size=72" alt="Angelo" style="border-radius:100%"/> | Angelo |   Author & Development   | [@Angelo](https://github.com/angelespejo) |
| <img src="https://github.com/PigeonPosse.png?size=72" alt="PigeonPosse" style="border-radius:100%"/> | PigeonPosse | Collective | [@PigeonPosse](https://github.com/PigeonPosse) |

<br>
<p align="center">

[![Web](https://img.shields.io/badge/Web-grey?style=for-the-badge&logoColor=white)](https://pigeonposse.com)
[![About Us](https://img.shields.io/badge/About%20Us-grey?style=for-the-badge&logoColor=white)](https://pigeonposse.com?popup=about)
[![Donate](https://img.shields.io/badge/Donate-pink?style=for-the-badge&logoColor=white)](https://pigeonposse.com/?popup=donate)
[![Github](https://img.shields.io/badge/Github-black?style=for-the-badge&logo=github&logoColor=white)](https://github.com/pigeonposse)
[![Twitter](https://img.shields.io/badge/Twitter-black?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/pigeonposse_)
[![Instagram](https://img.shields.io/badge/Instagram-black?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/pigeon.posse/)
[![Medium](https://img.shields.io/badge/Medium-black?style=for-the-badge&logo=medium&logoColor=white)](https://medium.com/@pigeonposse)

</p>

<!--
██████╗ ██╗ ██████╗ ███████╗ ██████╗ ███╗   ██╗
██╔══██╗██║██╔════╝ ██╔════╝██╔═══██╗████╗  ██║
██████╔╝██║██║  ███╗█████╗  ██║   ██║██╔██╗ ██║
██╔═══╝ ██║██║   ██║██╔══╝  ██║   ██║██║╚██╗██║
██║     ██║╚██████╔╝███████╗╚██████╔╝██║ ╚████║
╚═╝     ╚═╝ ╚═════╝ ╚══════╝ ╚═════╝ ╚═╝  ╚═══╝
                                               
██████╗  ██████╗ ███████╗███████╗███████╗      
██╔══██╗██╔═══██╗██╔════╝██╔════╝██╔════╝      
██████╔╝██║   ██║███████╗███████╗█████╗        
██╔═══╝ ██║   ██║╚════██║╚════██║██╔══╝        
██║     ╚██████╔╝███████║███████║███████╗      
╚═╝      ╚═════╝ ╚══════╝╚══════╝╚══════╝      
                                               
█████╗█████╗█████╗█████╗█████╗█████╗█████╗     
╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝     
                                               
 ██████╗██╗     ██╗██████╗ ██████╗  ██████╗    
██╔════╝██║     ██║██╔══██╗██╔══██╗██╔═══██╗   
██║     ██║     ██║██████╔╝██████╔╝██║   ██║   
██║     ██║     ██║██╔═══╝ ██╔═══╝ ██║   ██║   
╚██████╗███████╗██║██║     ██║     ╚██████╔╝   
 ╚═════╝╚══════╝╚═╝╚═╝     ╚═╝      ╚═════╝    
                                                
REPOSITORY: https://github.com/pigeonposse/clippo
AUTHORS: 
	- Angelo (https://github.com/angelespejo)

BY PigeonPosse 🐦🌈

-->
