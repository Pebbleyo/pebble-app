/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var Vector2 = require('vector2');
var Vibe = require('ui/vibe');

var testData = [
  {title: "Option1"},
  {title: "Option2"},
  {title: "Option3"},
  {title: "Option4"},
  {title: "Option5"}
];

function Pebblyo() {
  this.menu=0;
  this.currentIndex=0;
}

function PebblyoMenu(data) {
  this.data = data;
  console.log('initalizaing items array');
  this.items = [];
  for(var i=0; i<data.length; i++) {
    console.log('adding element to items array');
    this.items.push(new PebblyoElement(data[i]));
  }
}

function PebblyoElement(data) {
  console.log('creating Pebblyo Element');
  this.index = data.index;
  this.title = data.title;
}

UI.Window.prototype.clear = function() {
  var window = this;
  window.each(function(el) {
      window.remove(el);
  });
};

UI.Window.prototype.refresh = function(data, index) {
  this.clear();
  this.load(data, index);
};

UI.Window.prototype.load = function(data, index) {
  for(var i=0; i < data.items.length; i++) {
    var color;
    var bg;
    if (i==index) {
      color = 'white';
      bg = 'black';
    } else {
      color = 'black';
      bg = 'white';
    }
    console.log('adding text elements to screen');
    var textEl = new UI.Text({
      position: new Vector2(0, 30*i),
      size: new Vector2(144, 40),
      text: data.items[i].title,
      color: color,
      backgroundColor: bg,
      font:'GOTHIC_28_BOLD',
      textOverflow:'wrap',
      textAlign:'left'
    });
    this.add(textEl);
  }
};
var window = new UI.Window({
  backgroundColor: 'white'
});
var pebblyo = new Pebblyo();

UI.Window.prototype.scrollDown = function() {
  if (pebblyo.currentIndex<pebblyo.menu.items.length-1) {
    pebblyo.currentIndex++;
    window.refresh(pebblyo.menu, pebblyo.currentIndex);  
  } else {
    Vibe.vibrate('short');
  }
};
UI.Window.prototype.scrollUp = function() {
  if (pebblyo.currentIndex>0) {
    pebblyo.currentIndex--;
    window.refresh(pebblyo.menu, pebblyo.currentIndex);  
  } else {
    Vibe.vibrate('short');
  }
};

UI.Window.prototype.jumpTo = function(i) {
  if (0 <= i <= pebblyo.menu.items.length-1) {
    pebblyo.currentIndex = i;
    window.refresh(pebblyo.menu, pebblyo.currentIndex);
  }
};

Pebble.addEventListener("appmessage", function(e) {
  console.log("Received message: " + e.payload);
});

Pebble.addEventListener("ready",function(e) {
  console.log('creating window');
  console.log('creating menu');
  pebblyo.menu = new PebblyoMenu(testData);
  window.load(pebblyo.menu, pebblyo.currentIndex);
  console.log('show menu');
  window.show();
  
  setTimeout(function(){window.scrollDown();}, 200);
  setTimeout(function(){window.scrollDown();}, 400);
  setTimeout(function(){window.scrollDown();}, 600);
  setTimeout(function(){window.scrollDown();}, 800);
  setTimeout(function(){window.scrollDown();}, 1000);
  setTimeout(function(){window.scrollUp();}, 1200);
  setTimeout(function(){window.scrollUp();}, 1400);
  setTimeout(function(){window.scrollUp();}, 1600);
  setTimeout(function(){window.scrollUp();}, 1800);
  setTimeout(function(){window.scrollUp();}, 2000);
  setTimeout(function(){window.jumpTo(3);}, 2200);
});