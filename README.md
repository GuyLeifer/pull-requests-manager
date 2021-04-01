# Trust-IT Home Assignment
Hi there!

In this home assignment you'll be developing a dashboard for Pull Requests.
We provided you with a simple API to fetch PRs from the [node](https://github.com/nodejs/node) github repo.

### Requirements
The client should display a list of all PRs fetched from the server.
Each PR should display the following properties:
- PR number.
- Title.
- Description.
- Author (name + picture).
- Status (Draft/Open/Closed).
- Labels.
- Creation Date.

We should be able to filter by:
- PR status (Draft/Open/Closed).
- Labels.

We should be able to sort(asc/desc) by:
- PR number.
- Title.

The dashboard should be designed as you see fit :)
You're also free to use any library you want to. As for the framework, we prefer *React*.

### What we're looking for
- Separation of concerns - good directory/component structure.
- Readable code.

### Developing

To run the server, run `npm run dev` on the server folder.
The route for the API is *[http://localhost:8080]/api/vcs/prs*.

To run the client in development mode, run `npm start` on the client folder

### Production

You can see the production mode on *[https://pull-requests-manager.uc.r.appspot.com/]

-- *Trust-IT R&D*
