const cors = require('cors');
const express = require('express');
const path = require('path');

const port = process.env.PORT || 8080;

const app = express();

// Allow cross origin requests.
app.use(cors());

app.get('/api/vcs/prs', (req, res) => {
    res.redirect('https://api.github.com/repos/nodejs/node/pulls?state=all');
});

app.use(express.static(path.join(__dirname, 'build')))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"))
})


app.listen(port, () => {
    console.log(`Listening on ${port}...`);
});
