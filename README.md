# Ember Smart Text

No more manually adjusting container widths to get rid of those pesky widows! You can now tell your designer you've got them covered. Ember Smart Text works by utilizing `Canvas.measureText()` and a little math to figure out where to insert line-breaks to nuke those widows. 

## Installation

TODO

`ember install ember-smart-text`

## Usage

TODO

### <p>

```handlebars
{{#smart-text/p}}My sweet paragraph that doesn't have widows!{{/smart-text/p}}
```

### <h1>, <h2>, <h3>, etc.

```handlebars
{{#smart-text/h1}}Very Important Heading{{/smart-text/h1}}

{{#smart-text/h2}}Another Poignant Heading{{/smart-text/h2}}

{{#smart-text/h3}}The Last Heading{{/smart-text/h3}}
```

## Running

* `ember server`
* Visit dummy app at http://localhost:4200.

## Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
