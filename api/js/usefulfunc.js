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
        ,textOut = ''
        ,base64bin;

      if(pad > -1){
        txt64 = txt64.substr(0, pad);
      }
      var ln = txt64.length;
      for(var i = 0; i < ln; i++){
        dec64 = base64Alfabet.indexOf(txt64[i]);
        base64bin = base10TobaseX(dec64, 2).toString();
        //set the binary result to 6 bits
        var bln = base64bin.length;
        for(bln; bln < 6; bln++){
          base64bin = '0'+base64bin;
        }
        binStr += base64bin;
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
          dec = Math.floor((dec/base));
        }
        if(dec > 0) baseOut += 1;
        else baseOut += 0;
        baseOut = reverseStr(baseOut);
        return baseOut;
      }
      function reverseStr(str){
        return str.split("").reverse().join("");
      }
    }
  }

})();