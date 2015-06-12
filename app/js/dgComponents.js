/**
 * dgComponents
 * Created by dcorns on 6/9/15.
 */
'use strict';
var dgComponents = {};

dgComponents.superSelect = function(obj){
  var proto = Object.create(HTMLElement.prototype);
  proto.showAll = false;
  proto.createdCallback = function(){
    var shadowdom = this.createShadowRoot();
    //console.dir(shadowdom);

    //console.dir(shadowdom.host.dataset);
    //console.dir(this.shadowRoot.children);


    shadowdom.innerHTML = '<section><input><button>*</button><input type="number" value="5"><ol></ol><section></section></section>';

    //var subHTML = this.shadowRoot.children;
    var sSelect = this.shadowRoot.firstChild, sSKids = sSelect.children, searchTxt = sSKids[0], preferenceBtn = sSKids[1], numItemsToDisplay = sSKids[2], itemList = sSKids[3], sSDescriptions = sSKids[4];
    //Set Internal Styles
    numItemsToDisplay.style.width = '30px';
    var listStyle = sSelect.style;
    listStyle.display = 'block'; listStyle.borderStyle = 'solid'; listStyle.borderWidth = '3';
    //Add event listeners for sub elements
    searchTxt.addEventListener('keyup', function(e){
      console.log(e.target.value);
    });
    searchTxt.addEventListener('mouseenter', function(e){
      e.target.style.backgroundColor = 'grey';
    });
    searchTxt.addEventListener('mouseout', function(e){
      e.target.style.backgroundColor = 'white';
    });
    searchTxt.addEventListener('click', function(e){
      e.target.style.backgroundColor = 'white';
    });
    preferenceBtn.addEventListener('click', function(e){
      var showAll = e.target.parentNode.parentNode.host.showAll;
      if(showAll){
        e.target.parentNode.parentNode.host.showAll = false;
        preferenceBtn.innerHTML = '*'
      }
      else{
        e.target.parentNode.parentNode.host.showAll = true;
        preferenceBtn.innerHTML = '@'
      }
      console.log(showAll);
    });

    numItemsToDisplay.addEventListener('change', function(e){
      console.log(e.target.value);
      //var x = e.target.parentNode.host.dataset.items;
      //console.dir(obj[x]);
    });
    loadDefaults();
    function loadDefaults(){
      var data = shadowdom.host.dataset, items =obj[data.items], filters = obj[data.filters], titles = obj[data.titles];
      var extraTitles = false; if(titles.length > 1) extraTitles = true;
      if(titles){
        var len = items.length, c = 0, el;
        for(c;c<len;c++){
          el = document.createElement('li');
          el.innerHTML = items[c][titles[0]];
          if(extraTitles){
            var len2 = titles.length, c2 = 1;
            for(c2;c2<len2;c2++){
              el.setAttribute('data-' + titles[c2], items[c][titles[c2]]);
              console.log('title= ' + titles[c2] + ' = ' + items[c][titles[c2]]);
            }
            el.addEventListener('mouseenter', function(e){
              e.target.style.backgroundColor = 'grey';
              var data = e.target.dataset;
              console.dir(data);
              var sSDescKids = sSDescriptions.children;
              for(var prop in data){
                if(data.hasOwnProperty(prop)){
                  c2 = 0;  len2 = sSDescKids.length;
                  for(c2;c2<len2;c2++){
                    if(prop === sSDescKids[c2].innerHTML.toLowerCase()){
                      c2++;
                      sSDescKids[c2].innerHTML = data[prop];
                    }
                  }
                }
              }

            });
            el.addEventListener('mouseout', function(e){e.target.style.backgroundColor = 'white';});
          }
          else{
            el.addEventListener('mouseenter', function(e){e.target.style.backgroundColor = 'grey';});
            el.addEventListener('mouseout', function(e){e.target.style.backgroundColor = 'white';});
          }
          itemList.appendChild(el);
        }
        if(extraTitles){
          var descData;
          len = titles.length; c = 1;
          for(c;c<len;c++){
            el = document.createElement('label');
            el.innerHTML = titles[c];
            el.style.display = 'block';
            descData = document.createElement('label');
            sSDescriptions.appendChild(el);
            sSDescriptions.appendChild(descData);
          }
        }
      }
    }

  };

  document.registerElement('super-select', {prototype: proto});

};

module.exports = function (app){
  app.dgComponents = dgComponents;
};