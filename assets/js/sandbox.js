var urlParams;
(window.onpopstate = function () {
    var match,
        pl     = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        query  = window.location.search.substring(1);

    urlParams = {};
    while (match = search.exec(query))
       urlParams[decode(match[1])] = decode(match[2]);
})();

document.addEventListener('DOMContentLoaded', function(){

	editor = ace.edit("editor");
	//	editor.setTheme("ace/theme/monokai");
	editor.getSession().setMode("ace/mode/javascript");
  editor.getSession().setTabSize(2);
	editor.getSession().on('change', function(e) {
    try {
			for(var i in Berry.instances){
				Berry.instances[i].destroy();
			}
      $('.target').berry(
      	$.extend({autoFocus: false, actions: false, name: 'myForm'}, JSON.parse(editor.getValue())) ).delay('change', function(){
        var json = this.toJSON();
        if(this.options.template){

          $('.result').html("<pre>"+this.options.template.render(this.toJSON())+"</pre>");
        }else{
				  $('.result').html("<pre>"+JSON.stringify(json, undefined, "\t")+"</pre>");
        }
        // location.hash = '#'+$.param(json);
			}, true);
    } catch (e) {
        return false;
    }
	});
	var stuff = JSON.parse(($.jStorage.get('form') || "{}"));
	for(var i in stuff){
		delete stuff[i].widgetType;
	}
  $('#'+(urlParams['example'] || 'example')).click();
	//editor.setValue(JSON.stringify({fields: stuff}, undefined, "\t"));
});


$('#builder').on('click',function() {
      var stuff = JSON.parse($.jStorage.get('form'));
      for(var i in stuff){
        delete stuff[i].widgetType;
      }
  editor.setValue(JSON.stringify({"fields": stuff}, undefined, "\t"));
});




$('#example').on('click', function(e) {
  debugger;
 editor.setValue(JSON.stringify(forms.example, undefined, "\t"));
});
$('#basic').on('click', function() {
  editor.setValue(JSON.stringify(forms.basic, undefined, "\t"));
});
$('#conditional').on('click', function(){
  editor.setValue(JSON.stringify(forms.conditional, undefined, "\t"));
});
$('#duplicate').on('click', function(){
  editor.setValue(JSON.stringify(forms.duplicate, undefined, "\t"));
});
$('#nonfields').on('click', function() {
  editor.setValue(JSON.stringify(forms.nonfields, undefined, "\t"));
});
$('#auto').on('click', function() {
  editor.setValue(JSON.stringify(forms.auto, undefined, "\t"));
});


forms = {
  "auto": {
    "fields": {
      "Text": {},
      "Text 2": "",
      "Color": "color",
      "Options 1": ["hello"],
      "Options 2": ["hello","goodbye"],
      "Options 3": ["hello", "more","Another", "dasdf"],
      "Options 5": ["hello", "more","Another", "final","past"],
      "Is?": {"type": "checkbox"}
    }
  },
  "nonfields": {
    "attributes":{"name": "John Doe", "candy": "Other"},
    "inline": true,
    "fields": [
      {
        "label": "Name"
      },
      {
        "label": "Title"
      },
      {
        "label": "Favorite Candy",
        "name": "candy",
        "type": "select",
        "value": "",
        "choices": [
          "Lolipops",
          "Chocolate",
          "Other"
        ]
      }
    ]
  },
  "duplicate": {
    "fields": [
      {
        "label": "Name"
      },
      {
        "label": "Title"
      },
      {"name": "fc_container", "legend": "Favorite Candies", "fields": {
        "fc": {"label":false, "multiple": {"duplicate": true, "max": 4, "min": 2}, "fields": {
          "Candy Type": {}
        }
      }}}
    ]
  },
  "conditional": {
    "fields": [
      {
        "label": "Name"
      },
      {
        "label": "Title"
      },
      {
        "label": "Favorite Candy",
        "name": "candy",
        "choices": [
          "Lolipops",
          "Chocolate",
          "Other"
        ]
      },
      {"label": "Reason", "type": "textarea", "show": {"matches": {"name": "candy", "value": "Chocolate"}}}  
    ]
  },
  "basic": {
    "fields": [
      {
        "label": "Name"
      },
      {
        "label": "Job Title",
        "name": "title"
      },
      {
        "label": "Favorite State",
        "choices": "data/states.json"
      }
    ]
  },
  "example": {      
    "attributes": {"first_name": "John", "name_last": "Doe"},
    "fields":[
      {"label": "First Name"}, 
      {"label": "Last Name", "name": "name_last"},
      {"label": "Age", "type": "number"},
      {"label": "Favorite Color", "type": "color"}
    ]
  }
}