# Relative path to parent directories in import statements are not allowed. (no-relative-path-to-parent-directory)

This rule is useful for enforcing tree-like folder structures instead of complex graph-like folder structures. While this restriction might be a departure from Node's default resolution style, it can lead large, complex codebases to be easier to maintain.

## Rule Details

This rule aims to ensure that there is no relative parent imports in components.

Examples of **incorrect** code for this rule:

```js
import { MyComponent } from "../components/MyComponent";
```

Examples of **correct** code for this rule:

```js
import { MyComponent } from "@features/components/MyComponent";
```


## When Not To Use It

If you don't need to prevent relative path to parent directories in import statements, you can safely disable this rule.