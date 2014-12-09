/**
 * Created by dcorns on 10/4/14.
 */
'use strict';
module.exports = (function(){
  return{
    convert64RFC2045ToAscii256: function(txt64){
      txt64 = txt64.substr(txt64.indexOf(' ')+1);
      var base64Alfabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
      //Check for padding
        ,pad = txt64.indexOf('=')
        ,dec64
        ,binStr = ''
        ,binStrLn
        ,asciiByte
        ,asciiNum
        ,textOut = '';

      console.log('uf18 pad: '+ pad);
      if(pad > -1){
        txt64 = txt64.substr(0, pad + 1);
      }
      var ln = txt64.length;
      console.log('24 '+ln);
      for(var i = 0; i < ln; i++){
        dec64 = base64Alfabet.indexOf(txt64[i]);
        binStr += base10TobaseX(dec64, 2).toString();
        console.log('uf24'); console.log('dec64: '+dec64+' binStr: '+ binStr);
        binStrLn = binStr.length;
        if(binStrLn > 7){
          asciiByte = binStr.substr(0,8);
          binStr = binStr.substr(8);
          asciiNum = parseInt(asciiByte, 2);
          textOut += String.fromCharCode(asciiNum);
        }

      }
      return textOut;
      function base10TobaseX(dec, base){
        //only base 2 for now
        if (base > 2 || base < 2) return null;
        var baseOut = ''
          ,modal;
        //Can divide by base or subtract powers of base find which is faster
        //divide method
        while(dec >= base){
          modal = (dec%base).toString();
          baseOut += modal;
          dec = (dec/base).toFixed(0);
        }
        if(modal === 1) baseOut += 1;
        baseOut = reverseStr(baseOut);
        return baseOut;
      }
      function reverseStr(str){
        return str.split("").reverse().join("");
      }


    }
  }

})();