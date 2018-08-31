// #########CLIENT SIDE CODE#########
/*
  createBlocks(filename, id)
  @param filename: the name of the file with or without the '.html' extension
  @param id: the id of the divider of where to dump the html
*/
var createBlocks = function(filename, id){
  // Set up html resource directory
  var htmllib = "html/";
  // Boolean to check for the extension.
  var extBool = filename.endsWith(".html");
  // Formatted file name declaration.
  var fmtName = "";
  if (extBool){
    fmtName = filename;
  } else {
    fmtName = filename + ".html";
  }
  $(function(){
    try {
      $("#" + id).load(htmllib + fmtName);
    } catch(err) {
      alert("OOPS! Something went wrong loading resource: " + fmtName);
    }
  });
};

// #########CLIENT SIDE CODE#########
/*
  loadJSON(jsonname, htmlname, id)
  @param jsonname: the name of the file with or without the '.json' extension
  @param htmlname: the name of the file with or without the '.html' extension
                      htmlname must also be a template
  @param id: the id of where to dump the html templates
*/
var loadJSON = function(jsonname, htmlfile, id){
  // Set up json resource directory
  var jsonlib = "json/";
  // Boolean to check for the extension.
  var extBoolJSON = jsonname.endsWith(".json");
  // Formatted file name declaration.
  var fmtName = "";
  // Format JSON filename
  if (extBoolJSON){
    fmtName = jsonname;
  } else {
    fmtName = jsonname + ".json";
  }
  // Try to get json file loaded
  try {
    $.getJSON(jsonlib + fmtName, function(json) {
      unpack(json, createBlocksWithJson, htmlfile, id);
    });
  } catch(err) {
    alert("OOPS! Something went wrong loading resource: " + fmtName);
  }
};

/*
  unpack(json, callback, html, id)
  @param json: json object to be unpacked into html container
  @param callback: callback function that will be called with the parameters
                  html, id, and json (this function must have this signature)
  @param html: html container
  @param id: where to unload the html and containers on the page
*/
var unpack = function(json, callback, html, id){
  // unpack the properties inside a json object
  for (prop in json){
    // Check if json was the property we are looking at
    // Just to make sure we are not including prototypes
    if(json.hasOwnProperty(prop)){
      // Use callback function with specified method signature
      callback(html, id, json[prop]);
    }
  }
};

var createBlocksWithJson = function(filename, id, json){
  // Set up html resource directory
  var htmllib = "html/"
  // Boolean to check for the extension.
  var extBool = filename.endsWith(".html");
  // Formatted file name declaration.
  var fmtName = "";
  // Create formatted file name
  if (extBool){
    fmtName = filename;
  } else {
    fmtName = filename + ".html";
  }
  $(function(){
    // Try to load html and then use setAndUnpack to create html container
    // filled with json data
    try {
      $.get(htmllib + fmtName, function(html){
        setAndUnpack(json, html, id);

      });
    } catch(err) {
      alert("OOPS! Something went wrong loading resource: " + fmtName);
    }
  });
};

var setAndUnpack = function(json, html, id){
  //Set up template
  template = $(html);
  var current_name = ''
  // Iterate through json properties
  for (prop in json){
    // Guard to make sure that this property is not a prototyped prop.
    if(json.hasOwnProperty(prop)){
      // Add data to html template
      if(prop == 'img_src'){
        template.children().filter('.' + prop).css("background", "url(" +
                                     JSON.stringify(json[prop]).replace(/"/g,'')
                                     + ") no-repeat");
      } else {
        template.children().filter('.' + prop).append(json[prop]);
      }
      if(prop == 'name') {
        current_name = json[prop].replace(/ /g,'');
      }
    }
  }
  if (current_name == 'F.ColtDeWolfIV'){
    current_name = 'colt'
  }
  template.filter('.modal').attr('id',current_name);
  // Set up modal stuff
  var modal = template.filter('.modal');
  var modal_fields = modal.children().filter('.modal-dialog');
  modal_fields = modal_fields.children().filter('.modal-content');
  modal_fields = modal_fields.children().filter('.modal-body');
  for (prop in json){
    if(json.hasOwnProperty(prop)){
      // Add data to html template
      if(prop == 'img_src'){
        modal_fields.children().filter('.modal_img').attr("src",
                                     JSON.stringify(json[prop]).replace(/"/g,'')
                                     );
      } else {
        modal_fields.children().filter('.modal_'+prop).append(json[prop]);
      }
    }
  }

  // Add finished html to the virtual div and then once that is done
  // tear down virtual DOM.
  temphtml = $('<div/>').append(template.clone()).remove().html();
  // Finish off by appending the generated json container to the selected html
  // container
  $('#'+id).append(temphtml);
};
