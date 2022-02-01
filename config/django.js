const env = process.env.NODE_ENV;

let uri;

if (env === "development") uri = "http://localhost:8000/";
else {
  uri = "http://savegame-env.eba-fijpimur.eu-west-2.elasticbeanstalk.com/";
}
uri = "http://savegame-env.eba-fijpimur.eu-west-2.elasticbeanstalk.com/";

export default uri;
