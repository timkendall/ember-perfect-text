import Ember from 'ember';
import injectService from 'ember-service/inject';
import layout from '../templates/components/perfect-text';

export default Ember.Component.extend({
  layout,
  //windowResize: injectService(),
  
  _rawText: null,
  
  didInsertElement() {
    this._super();
    this.setupMeasuring();
    // TEMPORARY
    this.beautify();
  },
  
  willDestroy() {
    this._super();
  },
  
  setupMeasuring() {
    const rawText = this.$().text();
    const computedStyles = this.getStyles();
    
    // Note: Use computed font styles to create accurate measurment tool
    this.createTextRuler(computedStyles.fontSize, 'Avenir Next');
    this.set('computedStyles', computedStyles);
    this.set('_rawText', rawText);
    
    Ember.Logger.debug('perfect-text:computed fontSize', computedStyles.fontSize);
  },
  
  onWindowResize: Ember.observer('windowResize.width', function() {
    /** TODO: Either run a debounced function here or assume `windowResize.width`
        events are debounced already. */
  }),
  
  beautify(width, fontStyle) {
    const rawText = this.get('_rawText');
    const words = this.createWords(rawText);
    const lines = this.createLines(words);
    
    // If there's a widow!
    if (lines[lines.length - 1].words.length === 1) {
      const secondToLastLine = lines[lines.length - 2];
      const lastWordOfIt = secondToLastLine.words[secondToLastLine.words.length - 1];
      
      lastWordOfIt.text = `<br> ${lastWordOfIt.text}`;
      
      const fixedText = lines.reduce((string, line) => {
        const wordsText = line.words.map(word => word.text)
        return string + ' ' + wordsText.join(' ') + ' '
      }, '')
      
    
      this.set('fixedText', fixedText)
    }
  },

  createWords(text) {  
    return text.split(' ').map((word, index) => {
      const width = this.measureStringSingleLineWidth(word);
      
      return { position: index, text: word, width }
    });
  },

  createLines(words) {
    // Width of container containing our text
    const widthOfSpace = Math.ceil(this.get('widthOfSpace'));
    const { width } = this.get('computedStyles');
    const containerWidth = parseFloat( width.replace('px', '') )
    
    console.log('containerWidth', containerWidth)
    
    // TODO: Use Observables or something to clean this up
    const lines = []
    
    let line = { position: 0, words: [], width: 0 };
    words.forEach((word, index) => {
      const roundedWidth = Math.ceil(word.width) + 5;
      
      if (line.width + roundedWidth + widthOfSpace > containerWidth) {
        lines.push(line);
        line = { position: line.position + 1, words: [ word ], width: roundedWidth + widthOfSpace };
      } else {
        line.width += roundedWidth + widthOfSpace;
        line.words.push(word)
      }
    })

    if (line.words.length >= 1) {
      lines.push(line)
    }
    
    console.log('lines', lines)
    return lines;
  },


  measureStringSingleLineWidth(text) {
    const ctx = this.get('ctx');
    
    if (ctx) {
      return ctx.measureText(text).width;
    } else {
      throw new Error('No Canvas context was created for measurements.');
    }
  },

  createTextRuler(fontSize, fontFamily) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    // Set this for accurate measurements
    ctx.font = `${fontSize} ${fontFamily}`;
    
    this.set('ctx', ctx);
    this.set('widthOfSpace', this.measureStringSingleLineWidth(' '));
  },

  getStyles() {
    const element = this.get('element');
    return window.getComputedStyle(element);
  }
});
