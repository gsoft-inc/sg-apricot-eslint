# Class components are forbidden. Use a Functional Component instead. (no-class-components)

Class component still exist for legacy reasons. However, there is only a few reason for them to be used anymore, otherwise, Functional Components are the way to go.

The full documentation can be found here https://gsoftdev.atlassian.net/wiki/spaces/SGSAAS/pages/759562520.

## Rule Details

This rule aims to ensure that all the components in Sharegate Apricot are Functional Components.

Examples of **incorrect** code for this rule:

```js
export class MyClassComponent extends Component {
    render() {
        return <div>{children}</div>;
    }
}

export class MyClassComponent extends PureComponent {
    render() {
        return <div>{children}</div>;
    }
}
```

Examples of **correct** code for this rule:

```js
export const MyClassComponent = (children) => {
        return <div>{children}</div>;
};
```


## When Not To Use It

If you do not want to enforce Functional Components in your codebase, you can safely disable this rule.