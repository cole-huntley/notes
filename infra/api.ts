import { table } from "./storage";
// Create the API
export const api = new sst.aws.ApiGatewayV2("Api", {  //creating an API Gateway V2 instance
  transform: {  //telling API the given props need to be applied to all routes in the API
    route: {
      handler: {
        link: [table],  //linking to the DynamoDB table
      },
      args: {
        auth: { iam: true }
      },
    }
  }
});
api.route("GET /notes", "packages/functions/src/list.main");
api.route("POST /notes", "packages/functions/src/create.main"); //creating a POST route for /notes
api.route("GET /notes/{id}", "packages/functions/src/get.main"); //creating a GET route for /notes/{id}
api.route("PUT /notes/{id}", "packages/functions/src/update.main"); //creating a PUT route for /notes/{id}
api.route("DELETE /notes/{id}", "packages/functions/src/delete.main"); //creating a DELETE route for /notes/{id}