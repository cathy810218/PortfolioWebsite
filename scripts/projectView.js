'use strict'

var projectView = {};

projectView.handleMainNav = function() {
  $('.main-nav').on('click', '.tab', function() {
    $('.tab-content').hide();
    $('#' + $(this).data('content')).fadeIn();
  });
  $('.main-nav .tab:first').click();
};

projectView.initIndexPage = function() {
  projectView.handleMainNav();
  Project.all.forEach(function(project){
    $('#projects').append(project.toHtml());
  });

};
