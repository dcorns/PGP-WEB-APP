/**
 * dgComponents
 * Created by dcorns on 6/9/15.
 */
'use strict';
var dgComponents = {};

dgComponents.superSelect = function(){
  var proto = Object.create(HTMLElement.prototype);
  proto.showAll = false;
  proto.createdCallback = function(){
    var shadowdom = this.createShadowRoot();
    console.dir(shadowdom);
    console.dir(this.shadowRoot.children);
    var subHTML = this.shadowRoot.children;
    shadowdom.innerHTML = '<input><button>*</button><input type="number" value="5">';
    //Set Internal Styles
    subHTML[2].style.width = '30px';
    //Add event listeners for sub elements
    subHTML[0].addEventListener('keyup', function(e){
      console.log(e.target.value);
    });
    subHTML[1].addEventListener('click', function(e){
      var showAll = e.target.parentNode.host.showAll;
      if(showAll){
        e.target.parentNode.host.showAll = false;
        e.target.innerHTML = '*'
      }
      else{
        e.target.parentNode.host.showAll = true;
        e.target.innerHTML = '@'
      }
      console.log(showAll);
    });

    subHTML[2].addEventListener('change', function(e){
      console.log(e.target.value);
    });
  };
  document.registerElement('super-select', {prototype: proto});
};

module.exports = function (app){
  app.dgComponents = dgComponents;
};