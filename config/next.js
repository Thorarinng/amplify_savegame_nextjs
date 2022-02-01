const env = process.env.NODE_ENV;

let uri;

if (env === "development") uri = `http://localhost:3000/`;
else {
  uri = `/`;
}

export default uri;
