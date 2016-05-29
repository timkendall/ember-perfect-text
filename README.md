# Ember Perfect Text

*UNDER DEVELOPMENT*

No more manually adjusting container widths to get rid of those pesky widows! You can now tell your designer you've got them covered. Ember Perfect Text works by utilizing `Canvas.measureText()` and a little math to figure out where to insert line-breaks to nuke those widows. 

## Installation

TODO

`ember install ember-perfect-text`

## Usage

TODO

### Paragraphs

```handlebars
{{#perfect-text tagName="p"}}My sweet paragraph that doesn't have widows!{{/perfect-text}}
```

### Headings

```handlebars
{{#perfect-text tagName="h1"}}Very Important Heading{{/perfect-text}}

{{#perfect-text tagName="h2"}}Another Poignant Heading{{/perfect-text}}

{{#perfect-text tagName="h3"}}The Last Heading{{/perfect-text}}
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
