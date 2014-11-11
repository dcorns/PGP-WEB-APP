/**
 * Created by dcorns on 11/10/14.
 */
'use strict';
module.exports = function(obj){
  return {
    buildSurvey: function(){
      obj.name = window.sessionStorage.getItem('name');
      obj.ta = window.sessionStorage.getItem('ta');
      obj.student = window.sessionStorage.getItem('student');
      obj.course = window.sessionStorage.getItem('course');
      obj.rtg1 = window.sessionStorage.getItem('rtg1');
      obj.rtg2 = window.sessionStorage.getItem('rtg2');
      obj.rtg3 = window.sessionStorage.getItem('rtg3');
      obj.rtg4 = window.sessionStorage.getItem('rtg4');
      obj.rtg5 = window.sessionStorage.getItem('rtg5');
      obj.rtg6 = window.sessionStorage.getItem('rtg6');
      obj.rtg7 = window.sessionStorage.getItem('rtg7');
      obj.note = window.sessionStorage.getItem('note');
      obj.goal = window.sessionStorage.getItem('goal');
      obj.goal2 = window.sessionStorage.getItem('goal2');
      obj.goal3 = window.sessionStorage.getItem('goal3');
      obj.goal4 = window.sessionStorage.getItem('goal4');
      obj.goal5 = window.sessionStorage.getItem('goal5');
      obj.rtgComplete = window.sessionStorage.getItem('rtgComplete');
      return obj;
    }
  }
};