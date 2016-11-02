//var dots = require("dot").process({path: "views"});
var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var moment = require('moment');
var tags = hexo.extend.tag;
var Nbrite = require('nbrite');

// Find template
function getTemplate() {
  return path.join(__dirname, 'eventbrite-template.html');
}

function getToken() {

  var confPath = path.join('eventbrite.json');

  console.log("Finding conf file in " + confPath);

  var config = JSON.parse(fs.readFileSync(confPath).toString().trim());

  return config.token;

}

function beatifyDate(event) {

  event.start.date = moment(event.start.local).format("dddd, MMMM Do YYYY, h:mm:ss a");

  return event;
}

function howManyTime(event) {

  event.duration = moment(event.end.local).diff(event.start.local, 'minutes');

  return event;
}

function eventbrite(args, content) {

  const EVENTBRITE_ACCESS_TOKEN = getToken();

  var nbrite = new Nbrite({token: EVENTBRITE_ACCESS_TOKEN });
  var filePath = getTemplate();

  var template = _.template(fs.readFileSync(filePath).toString().trim());
  //
  var model = {};

  return nbrite.get('/users/me/owned_events', { status: 'live' }).then(function (res) {
      if (res.events) {
        var compiledMap = template({
          events: res.events
                          .map(beatifyDate)
                          .map(howManyTime)

        });
        return compiledMap;
      }

      return "";
  });

}

tags.register('eventbrite', eventbrite, {
  async: true
});
