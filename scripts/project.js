'use strict';

function Project(rawDataObject) {
  for (var key in rawDataObject) {
    this[key] = rawDataObject[key];
  }
}

Project.all = [];

Project.prototype.toHtml = function() {
  var template = $('#project-template').html();
  var templateRender = Handlebars.compile(template);

  return templateRender(this);
}

Project.loadAll = function(rawData) {
  rawData.sort(function(a, b) {
    return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
  });

  rawData.forEach(function(projectObject){
    Project.all.push(new Project(projectObject));
  });
}


Project.fetchAll = function() {
  if (localStorage.rawData) {
    // When rawData is already in localStorage,
    // we can load it with the .loadAll function above,
    // and then render the index page (using the proper method on the articleView object).
    Project.loadAll(JSON.parse(localStorage.rawData)); //TODO: What do we pass in to loadAll()?
    //TODO: What method do we call to render the index page?
    projectView.initIndexPage();
  } else {
    // TODO: When we don't already have the rawData,
    // we need to retrieve the JSON file from the server with AJAX (which jQuery method is best for this?),
    // cache it in localStorage so we can skip the server call next time,
    // then load all the data into Article.all with the .loadAll function above,
    // and then render the index page.
    $.getJSON('/projectObject.json').done(function(rawData){
      Project.loadAll(rawData);
      localStorage.setItem('rawData', JSON.stringify(rawData));
      projectView.initIndexPage();
    });
  }
}
