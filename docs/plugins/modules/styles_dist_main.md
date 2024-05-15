# Module: styles/dist/main

## Type Aliases

### Fonts

Ƭ **Fonts**: `figlet_2.Fonts`

___

### GradientColors

Ƭ **GradientColors**: `string`[] \| \{ `color`: `string` ; `pos`: `number`  }[]

___

### GradientOpts

Ƭ **GradientOpts**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `hsvSpin?` | ``"short"`` \| ``"long"`` | Used only in the case of HSV interpolation. Because hue can be considered as a circle, there are two ways to go from a color to another color. HsvSpin can be either short or long, depending on if you want to take the shortest or the longest way between two colors. Defaults to short. Case insensitive. |
| `interpolation?` | ``"rgb"`` \| ``"hsv"`` | The gradient can be generated using RGB or HSV interpolation. HSV usually produces brighter colors. Interpolation can be set to rgb for RGB interpolation, orhsv for HSV interpolation. Defaults to rgb. Case insentitive. |

___

### HighlightOpts

Ƭ **HighlightOpts**: `Parameters`\<typeof `highlight_2`\>[``1``]

## Variables

### icon

• `Const` **icon**: `Object`

Unicode symbols with fallbacks for older terminals.

**`See`**

https://github.com/sindresorhus/figures/blob/main/index.js

**`Example`**

```ts
console.log(
  icon.warning,
  icon.cross,
  icon.arrowDown,
  icon.bullet
)
```

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `almostEqual` | `string` | - |
| `arrowDown` | `string` | - |
| `arrowLeft` | `string` | - |
| `arrowLeftRight` | `string` | - |
| `arrowRight` | `string` | - |
| `arrowUp` | `string` | - |
| `arrowUpDown` | `string` | - |
| `bullet` | `string` | - |
| `checkboxCircleOff` | `string` | - |
| `checkboxCircleOn` | `string` | - |
| `checkboxOff` | `string` | - |
| `checkboxOn` | `string` | - |
| `circle` | `string` | - |
| `circleCircle` | `string` | - |
| `circleCross` | `string` | - |
| `circleDotted` | `string` | - |
| `circleDouble` | `string` | - |
| `circleFilled` | `string` | - |
| `circlePipe` | `string` | - |
| `circleQuestionMark` | `string` | - |
| `cross` | `string` | - |
| `dot` | `string` | - |
| `ellipsis` | `string` | - |
| `fiveEighths` | `string` | - |
| `fiveSixths` | `string` | - |
| `fourFifths` | `string` | - |
| `greaterOrEqual` | `string` | - |
| `hamburger` | `string` | - |
| `heart` | `string` | - |
| `home` | `string` | - |
| `identical` | `string` | - |
| `infinity` | `string` | - |
| `info` | `string` | - |
| `lessOrEqual` | `string` | - |
| `line` | `string` | - |
| `lineBackslash` | `string` | - |
| `lineBold` | `string` | - |
| `lineCross` | `string` | - |
| `lineDashed0` | `string` | - |
| `lineDashed1` | `string` | - |
| `lineDashed10` | `string` | - |
| `lineDashed11` | `string` | - |
| `lineDashed12` | `string` | - |
| `lineDashed13` | `string` | - |
| `lineDashed14` | `string` | - |
| `lineDashed15` | `string` | - |
| `lineDashed2` | `string` | - |
| `lineDashed3` | `string` | - |
| `lineDashed4` | `string` | - |
| `lineDashed5` | `string` | - |
| `lineDashed6` | `string` | - |
| `lineDashed7` | `string` | - |
| `lineDashed8` | `string` | - |
| `lineDashed9` | `string` | - |
| `lineDouble` | `string` | - |
| `lineDownBoldLeft` | `string` | - |
| `lineDownBoldLeftBold` | `string` | - |
| `lineDownBoldLeftBoldRight` | `string` | - |
| `lineDownBoldLeftBoldRightBold` | `string` | - |
| `lineDownBoldLeftRight` | `string` | - |
| `lineDownBoldLeftRightBold` | `string` | - |
| `lineDownBoldRight` | `string` | - |
| `lineDownBoldRightBold` | `string` | - |
| `lineDownDoubleLeft` | `string` | - |
| `lineDownDoubleLeftDouble` | `string` | - |
| `lineDownDoubleLeftDoubleRightDouble` | `string` | - |
| `lineDownDoubleLeftRight` | `string` | - |
| `lineDownDoubleRight` | `string` | - |
| `lineDownDoubleRightDouble` | `string` | - |
| `lineDownLeft` | `string` | - |
| `lineDownLeftArc` | `string` | - |
| `lineDownLeftBold` | `string` | - |
| `lineDownLeftBoldRight` | `string` | - |
| `lineDownLeftBoldRightBold` | `string` | - |
| `lineDownLeftDouble` | `string` | - |
| `lineDownLeftDoubleRightDouble` | `string` | - |
| `lineDownLeftRight` | `string` | - |
| `lineDownLeftRightBold` | `string` | - |
| `lineDownRight` | `string` | - |
| `lineDownRightArc` | `string` | - |
| `lineDownRightBold` | `string` | - |
| `lineDownRightDouble` | `string` | - |
| `lineSlash` | `string` | - |
| `lineUpBoldDownBoldLeft` | `string` | - |
| `lineUpBoldDownBoldLeftBold` | `string` | - |
| `lineUpBoldDownBoldLeftBoldRight` | `string` | - |
| `lineUpBoldDownBoldLeftBoldRightBold` | `string` | - |
| `lineUpBoldDownBoldLeftRight` | `string` | - |
| `lineUpBoldDownBoldLeftRightBold` | `string` | - |
| `lineUpBoldDownBoldRight` | `string` | - |
| `lineUpBoldDownBoldRightBold` | `string` | - |
| `lineUpBoldDownLeft` | `string` | - |
| `lineUpBoldDownLeftBold` | `string` | - |
| `lineUpBoldDownLeftBoldRight` | `string` | - |
| `lineUpBoldDownLeftBoldRightBold` | `string` | - |
| `lineUpBoldDownLeftRight` | `string` | - |
| `lineUpBoldDownLeftRightBold` | `string` | - |
| `lineUpBoldDownRight` | `string` | - |
| `lineUpBoldDownRightBold` | `string` | - |
| `lineUpBoldLeft` | `string` | - |
| `lineUpBoldLeftBold` | `string` | - |
| `lineUpBoldLeftBoldRight` | `string` | - |
| `lineUpBoldLeftBoldRightBold` | `string` | - |
| `lineUpBoldLeftRight` | `string` | - |
| `lineUpBoldLeftRightBold` | `string` | - |
| `lineUpBoldRight` | `string` | - |
| `lineUpBoldRightBold` | `string` | - |
| `lineUpDoubleDownDoubleLeft` | `string` | - |
| `lineUpDoubleDownDoubleLeftDouble` | `string` | - |
| `lineUpDoubleDownDoubleLeftDoubleRightDouble` | `string` | - |
| `lineUpDoubleDownDoubleLeftRight` | `string` | - |
| `lineUpDoubleDownDoubleRight` | `string` | - |
| `lineUpDoubleDownDoubleRightDouble` | `string` | - |
| `lineUpDoubleLeft` | `string` | - |
| `lineUpDoubleLeftDouble` | `string` | - |
| `lineUpDoubleLeftDoubleRightDouble` | `string` | - |
| `lineUpDoubleLeftRight` | `string` | - |
| `lineUpDoubleRight` | `string` | - |
| `lineUpDoubleRightDouble` | `string` | - |
| `lineUpDownBoldLeft` | `string` | - |
| `lineUpDownBoldLeftBold` | `string` | - |
| `lineUpDownBoldLeftBoldRight` | `string` | - |
| `lineUpDownBoldLeftBoldRightBold` | `string` | - |
| `lineUpDownBoldLeftRight` | `string` | - |
| `lineUpDownBoldLeftRightBold` | `string` | - |
| `lineUpDownBoldRight` | `string` | - |
| `lineUpDownBoldRightBold` | `string` | - |
| `lineUpDownLeft` | `string` | - |
| `lineUpDownLeftBold` | `string` | - |
| `lineUpDownLeftBoldRight` | `string` | - |
| `lineUpDownLeftBoldRightBold` | `string` | - |
| `lineUpDownLeftDouble` | `string` | - |
| `lineUpDownLeftDoubleRightDouble` | `string` | - |
| `lineUpDownLeftRight` | `string` | - |
| `lineUpDownLeftRightBold` | `string` | - |
| `lineUpDownRight` | `string` | - |
| `lineUpDownRightBold` | `string` | - |
| `lineUpDownRightDouble` | `string` | - |
| `lineUpLeft` | `string` | - |
| `lineUpLeftArc` | `string` | - |
| `lineUpLeftBold` | `string` | - |
| `lineUpLeftBoldRight` | `string` | - |
| `lineUpLeftBoldRightBold` | `string` | - |
| `lineUpLeftDouble` | `string` | - |
| `lineUpLeftDoubleRightDouble` | `string` | - |
| `lineUpLeftRight` | `string` | - |
| `lineUpLeftRightBold` | `string` | - |
| `lineUpRight` | `string` | - |
| `lineUpRightArc` | `string` | - |
| `lineUpRightBold` | `string` | - |
| `lineUpRightDouble` | `string` | - |
| `lineVertical` | `string` | - |
| `lineVerticalBold` | `string` | - |
| `lineVerticalDashed0` | `string` | - |
| `lineVerticalDashed1` | `string` | - |
| `lineVerticalDashed10` | `string` | - |
| `lineVerticalDashed11` | `string` | - |
| `lineVerticalDashed2` | `string` | - |
| `lineVerticalDashed3` | `string` | - |
| `lineVerticalDashed4` | `string` | - |
| `lineVerticalDashed5` | `string` | - |
| `lineVerticalDashed6` | `string` | - |
| `lineVerticalDashed7` | `string` | - |
| `lineVerticalDashed8` | `string` | - |
| `lineVerticalDashed9` | `string` | - |
| `lineVerticalDouble` | `string` | - |
| `lozenge` | `string` | - |
| `lozengeOutline` | `string` | - |
| `musicNote` | `string` | - |
| `musicNoteBeamed` | `string` | - |
| `mustache` | `string` | - |
| `nodejs` | `string` | - |
| `notEqual` | `string` | - |
| `oneEighth` | `string` | - |
| `oneFifth` | `string` | - |
| `oneHalf` | `string` | - |
| `oneNinth` | `string` | - |
| `oneQuarter` | `string` | - |
| `oneSeventh` | `string` | - |
| `oneSixth` | `string` | - |
| `oneTenth` | `string` | - |
| `oneThird` | `string` | - |
| `play` | `string` | - |
| `pointer` | `string` | - |
| `pointerSmall` | `string` | - |
| `questionMarkPrefix` | `string` | - |
| `radioOff` | `string` | - |
| `radioOn` | `string` | - |
| `sevenEighth` | `string` | - |
| `smiley` | `string` | - |
| `square` | `string` | - |
| `squareBottom` | `string` | - |
| `squareCenter` | `string` | - |
| `squareDarkShade` | `string` | - |
| `squareLeft` | `string` | - |
| `squareLightShade` | `string` | - |
| `squareMediumShade` | `string` | - |
| `squareRight` | `string` | - |
| `squareSmall` | `string` | Export types that can be used from outside. |
| `squareSmallFilled` | `string` | - |
| `squareTop` | `string` | - |
| `star` | `string` | - |
| `subscriptEight` | `string` | - |
| `subscriptFive` | `string` | - |
| `subscriptFour` | `string` | - |
| `subscriptNine` | `string` | - |
| `subscriptOne` | `string` | - |
| `subscriptSeven` | `string` | - |
| `subscriptSix` | `string` | - |
| `subscriptThree` | `string` | - |
| `subscriptTwo` | `string` | - |
| `subscriptZero` | `string` | - |
| `threeEighths` | `string` | - |
| `threeFifths` | `string` | - |
| `threeQuarters` | `string` | - |
| `tick` | `string` | - |
| `triangleDown` | `string` | - |
| `triangleDownSmall` | `string` | - |
| `triangleLeft` | `string` | - |
| `triangleLeftSmall` | `string` | - |
| `triangleRight` | `string` | - |
| `triangleRightSmall` | `string` | - |
| `triangleUp` | `string` | - |
| `triangleUpOutline` | `string` | - |
| `triangleUpSmall` | `string` | - |
| `twoFifths` | `string` | - |
| `twoThirds` | `string` | - |
| `warning` | `string` | - |

## Functions

### box

▸ **box**(`text`, `options?`): `string`

Creates a styled box around the provided text.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `text` | `string` | The text to display inside the box. |
| `options?` | `Options` | Optional configuration options for the box. |

#### Returns

`string`

- The text with the styled box around it.

**`See`**

https://www.npmjs.com/package/boxen

**`Example`**

```ts
const boxedText = box('This is a boxed text', { padding: 1 });
console.log(boxedText);
```

___

### color

▸ **color**(`...text`): `string`

Provides colors for terminal output using picocolors.

#### Parameters

| Name | Type |
| :------ | :------ |
| `...text` | `unknown`[] |

#### Returns

`string`

**`Example`**

```ts
console.log(color.green('This text is green'));
```

___

### columns

▸ **columns**(`data`, `options?`): `string`

Formats data into aligned columns for better readability.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `any`[] \| `Record`\<`string`, `any`\> | The data to format into columns. |
| `options?` | `GlobalOptions` | Optional configuration options for column formatting. |

#### Returns

`string`

- The text with the data formatted into columns.

**`See`**

https://www.npmjs.com/package/columnify

**`Example`**

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

___

### font

▸ **font**(`txt`, `font?`): `string`

Generates ASCII art text using the specified font.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `txt` | `string` | The text to render as ASCII art. |
| `font?` | `Fonts` | The font to use for rendering. Defaults to 'Standard'. |

#### Returns

`string`

- The ASCII art text.

**`Example`**

```ts
const asciiText = font('Hello, World!', '3-D');
console.log(asciiText);
```

___

### gradient

▸ **gradient**(`txt`, `colors`, `opts?`): `string`

Generates a gradient string with the specified colors.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `txt` | `string` | The text to apply the gradient to. |
| `colors` | [`GradientColors`](styles_dist_main.md#gradientcolors) | An array of color names or hex values. |
| `opts?` | [`GradientOpts`](styles_dist_main.md#gradientopts) | Custom opts. |

#### Returns

`string`

- The text with the applied gradient.

**`Example`**

```ts
// Example usage:
const gradientText = gradient('Gradient Text', ['red', 'yellow', 'green']);
console.log(gradientText);
```

___

### highlight

▸ **highlight**(`code`, `opts?`): `string`

Highlights the given code using CLI highlighting.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `code` | `string` | The code to highlight. |
| `opts?` | `HighlightOptions` | Optional options for highlighting. |

#### Returns

`string`

- The highlighted code.

**`Example`**

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

___

### link

▸ **link**(`text`, `url`): `string`

Creates a clickable hyperlink in the terminal, if supported.
If terminal doesn't support clickable links, returns the URL string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `text` | `string` | The text to display as the link. |
| `url` | `string` | The URL to link to. |

#### Returns

`string`

- The clickable hyperlink or URL string.

**`Example`**

```ts
const linkedText = link('Visit Clippo docs', 'https://clippo.pigeonposse.com');
console.log(linkedText);
```

___

### table

▸ **table**(`data`, `userConfig?`): `string`

Generates a text-based table from the provided data array.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `unknown`[][] | The data to display in the table. |
| `userConfig?` | `TableUserConfig` | - |

#### Returns

`string`

- The text-based table.

**`See`**

https://www.npmjs.com/package/table

**`Example`**

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
