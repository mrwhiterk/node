var Profile = require("./profile.js");
var renderer = require("./renderer.js");
var querystring = require("querystring");
var commonHeaders = {'Content-Type': 'text/html'};

//Handle HTTP route GET / and POST / i.e. Home
function home(request, response) {
    //if url === "/" && GET
    if (request.url === "/") {
        if(request.method.toLowerCase() === "get") {
            //show search
            response.writeHead(200, commonHeaders);
            renderer.view("header", {}, response);
            renderer.view("search", {}, response);
            renderer.view("footer", {}, response);
            response.end();

        } else {
            //if url== "/" && POST

            //get the post data from body
            request.on("data", function(postBody) {
                //extract the username
                var query = querystring.parse(postBody.toString());
                //redirect to /:username
                response.writeHead(303, { "Location": "/" + query.username });
                response.end();
            });

        }
    }

}

//Handle HTTP route GET /:username i.e. /chalkers
function user(request, response) {
    //if url == "/...."
    var username = request.url.replace("/", "");
    if (username.length > 0) {
        response.writeHead(200, commonHeaders);
        renderer.view("header", {}, response);

        //get json from treehouse
        var studentProfile = new Profile(username);
        //on "end"
        studentProfile.on("end", function(ProfileJSON) {
            //show profile

            //Store the values which we need
            var values = {
                avatarUrl: ProfileJSON.gravatar_url,
                username: ProfileJSON.profile_name,
                badges: ProfileJSON.badges.length,
                javascriptPoints: ProfileJSON.points.JavaScript
            };
            //Simple response
            renderer.view("profile", values, response);
            renderer.view("footer", {}, response);
            response.end();
        });
        //on "error"
        studentProfile.on("error", function(error) {
            //show error
            renderer.view("error", {errorMessage: error.message}, response); 
            renderer.view("search", {}, response);
            renderer.view("footer", {}, response);
            response.end();
            
        });
    }
}

module.exports.home = home;
module.exports.user = user;