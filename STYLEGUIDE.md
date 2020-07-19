#thenewboston Rules for SASS/SCSS

- [Introduction] (#introduction)
- [Key Problems to address] (#key-problems-to-address)
- [Rules Overview] (#rules-overview)
- [Rules Explanation] (#rules-explanation)

## Introduction

Introduction text... TODO

## Key Problems to Address

TODO

## Rules Overview

1) Follow BEM (Block-Element-Modifier) convention in combination of the SASS Ampersand (&) to minimize specificity.

2) The base DOM element of every React component will be the same as the name of the component (in the same casing, ie CapitalCase). Every other block/element/modifier should follow the kebab-case-naming-convention.

3) Only use Class & Pseudo-class/element selectors (no element/id selectors)

4) Minimize SCSS Nesting. There should be at most one level of a new block declaration within the base DOM element of a given component.

5) no `!important`

## Rules Explanation

```
1) Follow BEM (Block-Element-Modifier) convention in combination 
of the SASS Ampersand (&) to minimize specificity.
```

_You can read about [BEM here](https://css-tricks.com/bem-101/) and about the [SASS Ampersand here](https://css-tricks.com/the-sass-ampersand/). Once you know the basics about the two, you can read about why [SASS+BEM is so good](https://css-tricks.com/using-sass-control-scope-bem-naming/)._

example:

_LeftNav/index.tsx_
```
return (
   <div className="LeftNav">
      <div 
         className={clsx("LeftNav__nav", {
            "LeftNav__nav--active": selected === "home"
         })}
      >Home</div>
   </div>
)
```

_LeftNav/LeftNav.scss_
```
.LeftNav {
   &__nav {
      color: var(--color-primary);

      &--active {
         font-weight: bold;
      }
   }
}
```

_The above scss compiles down to:_
```
.LeftNav__nav {
	color: var(--color-primary);
}

.LeftNav__nav--active {
	font-weight: bold;
}
```

---
---

```
2) The base DOM element of every React component will be the same as 
the name of the component (in the same casing, ie CapitalCase). Every 
other block/element/modifier should follow the kebab-case-naming-convention.
```

example:

_LeftNav/index.tsx_
```
return (
   <div className="LeftNav">
      <div className="LeftNav__element">...</div>
   </div>
)
```

_LeftNav/LeftNav.scss_
```
.LeftNav {
   display: flex;

   &__element {
      font-weight: bold;
   }
}
```


This is to ensure that the css for a given component is scoped to only the component itself. Only the base DOM elements will ever follow the CapitalCase convention. This way, if there is a block element that is not a base DOM element, it will never have the potential to adopt the styling of a component with the same name.

To show this, suppose we had a `Products` component that had it's own version of a `left-nav`:

_Products/index.tsx_
```
return (
   <div className="Products">
      <div className="left-nav">...</div>
      ...
   </div>
)
```

If our `LeftNav` component didn't adopt the Capital case convention, then this `left-nav` block div will apply all styling defined within the `LeftNav.scss` file.

With this naming convention, the only way we will have styling overlaps across different components is if we have one or more components of the same name. Therefore, we must always strive to create components with unique names.

---
---

```
3) Only use Class & Pseudo-class/element selectors (no element/id selectors)
```

These are not allowed:
```
#left-nav {
   ...
}

.LeftNav {
   a {
      color: var(--color-primary);
   }
}
```

The only exception to this is that you may use `element` selectors to on a global stylesheet to override default behaviors of a particular element. But this should be done very sparingly.

---
---

```
4) Minimize SCSS Nesting. There should be at most one level of a new 
block declaration within the base DOM element of a given component.
```

Example:

_`left-nav` is one level nested within `Products`. This is fine:_
```
return (
   <div className="Products">
      <div className="left-nav">
         <div className="left-nav__nav">nav</div>
      </div>
      ...
   </div>
)


.Products {
   .left-nav {
      &__nav {
         color: var(--color-primary);
      }
   }
}
```

_The following is too much nesting. Don't do this:_
```
return (
   <div className="Products">
      <div className="left-container">
         <div className="nav">...</div>
      </div>
   </div>
)


.Products {
   .left-container {
      .nav {
         color: var(--color-primary);
      }
   }
}
```

Instead of the above, try redefining one of the blocks as an element instead:
```
return (
   <div className="Products">
      <div className="Products__left-container">
         <div className="nav">...</div>
      </div>
   </div>
)

.Products {
   &__left-container {
      ...
   }

   .nav {
      color: var(--color-primary);
   }
}
```

---
---

```
5) no `!important`
```

Self-explanatory. As long as we are following all of these rules, there shouldn't be a reason for us to use `!important` in our CSS.
