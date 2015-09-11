# From <b>Zero</b> to <b>Sassy</b><br> in <b>2 Sessions</b>&hellip;

## Installing <small>&amp;</small> Compiling

### Node-sass

Used to have fewer features (not anymore!)

Much faster than Ruby Sass

Task runner integration:

* [node-sass](https://www.npmjs.com/package/node-sass)
* [gulp-sass](https://www.npmjs.com/package/gulp-sass)
* [grunt-sass](https://www.npmjs.com/package/grunt-sass)

### Ruby Sass

Standalone Ruby gem: [sass](https://rubygems.org/gems/sass/versions/3.4.18)

#### Install
```sh
gem install sass
```

#### Compile
```
sass input.scss:output.css
```

Task runner integration:

* [gulp-ruby-sass](https://www.npmjs.com/package/gulp-ruby-sass)
* [grunt-contrib-sass](https://www.npmjs.com/package/grunt-contrib-scss)

## File Organization

### Partials

Break your giant CSS file into smaller, modular partials.

Prefix your partials&#8217; filenames with `_`.

```
/scss
| – /base
     | – _variables.scss
     | – _functions.scss
| – /modules
     | – _header.scss
     | – _footer.scss
| – style.scss
```

### Partials

Call your partials from your primary Sass file.

```
@import 'base/variables';
@import 'base/functions';

@import 'modules/header';
@import 'modules/footer';
```

### Nesting

Nesting selectors automatically creates compound selectors

```
.page-header {
  // styles

  h1 {
    // styles
  }

  a {
    // styles
  }
}
```

### Nesting

```
.page-header {
  // styles
}

.page-header h1 {
  // styles
}

.page-header a {
  // styles
}
```

### Reverse Nesting

Use `&` to &#8220;move&#8221; the current selector context

```
.page-header {
  .media-page & {
    // styles
  }
}

.media-page .page-header {
  // styles
}
```

### Chained Nesting

```
a {
  &:hover,
  &:active,
  &:focus {
    // styles
  }
}

a:hover, a:active, a:focus {
  // styles
}
```

<h2 class="code-title">Code Time!</h2>

## Variables

### Simple Variables

Data types include `string`, `color`, `number`, `boolean`, `null`

```
$color-blue: #003366;

.blue-element {
  color: $color-blue;
}
```

### Lists

Comma- or space-separated lists

Optional parenthesis wrappers

```
$font-sizes: small, p, pull-quote, subheading, heading, hero;

$ff-sans: Proxima Nova, proxima-nova, Verdana, sans-serif;

$box-shadow: 1px 1px 2px rgba(0, 0, 0, .5);
```

### Maps

Array/object: key-value pairs

```
$social-media: (
  facebook: #3b5998,
  twitter: #00aced,
  google-plus: #dd4b39,
  linkedin: #007bb6
);
```

### Flags / Scope

Similar to `!important` in CSS, Sass has flags to tell the compiler how overrideable a variable&#8217;s value is.

Normally, variables follow the cascade: if you reassign a variable&#8217;s value, any following uses of that variable will have the new value.

### Flags / Scope

#### Default

It doesn&#8217;t matter where you redefine this variable (earlier or later), a `!default` will always give way to any other value assignment.

```
$column-count: 12 !default;
```

### Flags / Scope

#### Global

Variables within functions are scoped: use `!global` to override an external variable from within a function.

```
@function change-size($percentage) {
  $size: $size * percentage !global;
  @return $size;
}
```

<h2 class="code-title">Code Time!</h2>

## Logic

### If conditions

```
@if lightness($bg-color) > 50% {
  color: $color-gray-dark;
} @else {
  color: $color-cream;
}
```

### Each Loops

#### With Lists

```
$i: 1;
@each $size in $font-sizes {
  .fs-#{$size} {
    $scale: power($interval, $i);
    font-size: $base * $scale;
  }
  $i: $i + 1;
}
```

### Each Loops

#### With Maps

```
@each $name, $color in $social-media {
  .sm-link[href*="#{$name}"] {
    background-color: $color;
  }
}
```

### For Loops

`to` stops before the final number

```
@for $i from 1 to 5 {
  li:nth-child(#{$i}) {
    &::before {
      content: '#{$i}';
    }
  }
}
```

### For Loops

`through` includes the final number

```
@for $i from 1 through 5 {
  li:nth-child(#{$i}) {
    &::before {
      content: '#{$i}';
    }
  }
}
```

### While Loops

```
@while $line-height < $vertical-rhythm {
  $line-height: $line-height * 2;
}
```

## Functions

### Built-in Functions

Manipulate input and return a value

Use them in the value side of a property declaration

### Colors

* `darken($blue, 5%)`
* `lighten($blue, 7.5%)`
* `mix($blue, $shadow, 40%)`
* `rgba($blue, .5)`

### Colors

#### Sass Input
```
$blue: #003366;
$shadow: #000102;
$blue-shadow: mix($blue, $shadow, 40%);

.button-blue {
  background-color: $blue;
  border: 2px solid darken($blue, 5%);
  box-shadow: 0 2px 2px rgba($blue-shadow, .85);
}
```

### Colors

#### CSS Output
```
.button-blue {
  background-color: #003366;
  border: 2px solid #00264d;
  box-shadow: 0 2px 2px rgba(0, 21, 42, 0.85);
}
```

### Strings

* `str-length($string)`
* `str-index($string, $substring)`
* `str-slice($string, $start, [$end])`

### Math

* `percentage($number)`
* `round($number)`
* `random([$limit])`

### Lists

* `length($list)`
* `nth($list, $number)`
* `join($list1, $list2)`
* `append($list, $item)`
* `index($list, $value)`

### Maps

* `map-get($map, $key)`
* `map-remove($map, $keys…)`
* `map-keys($map)`
* `map-values($map)`
* `map-has-key($key)`
* `map-merge($map1, $map1)`

### Maps

```
$social-media: (
  facebook: #3b5998,
  twitter: #00aced,
  google-plus: #dd4b39,
  linkedin: #007bb6
);
```

### Maps

```
.facebook {
  color: map-get($social-media, 'facebook');
}
```

### Maps

```
$more-social-media: (
  amazon: #ff9900,
  instagram: #3f729b
);

$social-media: map-merge(
  $social-media,
  $more-social-media
);
```

### Custom Functions

```
$colors: ( … );

@function get-color($color) {
  @if map-has-key($colors, $color) {
    @return map-get($colors, $color);
  }
}
```

### Custom Functions

```
@function power($x, $n) {
  $return: 1;
  @if $n > 0 {
    @for $i from 1 through $n {
      $return: $return * $x;
    }
  } @else if $n < 0 {
    @for $i from $n to 0 {
      $return: $return / $x;
    }
  }
  @return $return;
}
```

<h2 class="code-title">Code Time!</h2>

## Language Constructs

### Mixins

Accepts zero or more arguments and outputs desired result

### Mixins: No Arguments

```
@mixin clearfix {
  &::after {
    clear: both;
    content: "";
    display: table;
  }
}

.content {
  @include clearfix;
}
```

### Mixins: Arguments

```
@mixin button($color: $color-blue) {
  background-color: $color;
  border: 2px solid darken($color, 5%);
}

.button {
  @include button;
}
.button.red {
  @include button($color-red);
}
```

### Mixins: Content, No Arguments

```
@mixin no-flex {
  .no-flexbox & {
    @content;
  }
}
.flex-div {
  display: flex;
  @include no-flex {
    display: table;
  }
}
```

### Mixins: Content, Arguments

```
@mixin mq($breakpoint) {
  @media (min-width: $breakpoint) {
    @content;
  }
}

body {
  @include mq(900px) {
    font-size: 1.2em;
  }
}
```

### Extends

Adds a selector to a previous selector&#8217;s declaration block

```
.card {
  padding: 15px 20px;
  background-color: #fff;
  border: 1px solid #ccc;
  box-shadow: 0 2px 2px -1px #222;
}

.image-card {
  @extend .card;
  border-color: #cc4;
}
```

### Extends

```
.card, .image-card {
  padding: 15px 20px;
  background-color: #fff;
  border: 1px solid #ccc;
  box-shadow: 0 2px 2px -1px #222;
}

.image-card {
  border-color: #cc4;
}
```

### Placeholders

`%selector` creates a &#8220;silent&#8221; declaration block that won&#8217;t be compiled unless a real selector extends it.

```
%card { … }

.image-card {
  @extend %card;
  border-color: #cc4;
}

.search-card {
  @extend %card;
}
```

### Directives

#### Error

Stops the compiler with a fatal error

```
@error 'Sorry, this is what went wrong: [message]';
```

### Directives

#### Warn

Allows the compiler to continue, but sends a warning message to the developer&#8217;s console

```
@warn 'The `border-radius()` mixin will be deprecated in version 2.0.';
```

### Directives

#### Debug

Sends any message to the console: useful for debugging your own work

```
@debug $math-value;
```

<h2 class="code-title">Code Time!</h2>

## Libraries

### Extra Mixins / Functions

#### Bourbon

[bourbon.io](http://bourbon.io)

### Grids

#### Susy

[susy.oddbird.net](http://susy.oddbird.net/)

#### Singularity

[singularity.gs](http://singularity.gs)

#### Neat

[neat.bourbon.io](http://neat.bourbon.io/)

### Typography

#### TypeTuner

[typetuner.com](http://typetuner.com)

#### Modular Scale

[modularscale.com](http://www.modularscale.com/)

#### Sassline

[sassline.com](https://sassline.com/)