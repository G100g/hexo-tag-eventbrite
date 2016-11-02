# hexo-tag-eventbrite

Version: 0.0.1

Compatible with Hexo Version 3

## Infos

Insert this tag in your content to retrieve and display "live" events from you Eventbrite account.

```
{% eventbrite %}
```

To get your Personal Token see the official documentation
https://www.eventbrite.com/developer/v3/reference/authentication/#ebapi-personal-token

Put your token in a json file using token key

```
{
  "token": "MYPERSONALTOKEN"
}
```

and save file in your site root using **eventbrite.json** name.

> Inspired from https://github.com/the-simian/hexo-tag-googlemaps
