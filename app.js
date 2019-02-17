const   express     = require('express'),
        bodyParser  = require('body-parser'),
        mongoose    = require('mongoose');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
.connect("mongodb://example:exampleuser123@ds337985.mlab.com:37985/charing", { useNewUrlParser: true })
.catch(err => console.log(err));

mongoose.set('useFindAndModify', false);

const organizationSchema = new mongoose.Schema({
    name: String,
    location: String,
    tag: [String]
});

const orgs = mongoose.model("Organization", organizationSchema);

const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

const user = mongoose.model("User", userSchema);

app.get('/', (req, res) => {
    res.send({
        accept: 200,
    });
});

app.get('/organizations', (req, res) => {
    orgs
    .find(req.query ? req.query : {})
    .lean()
    .exec()
    .then(orgs => res.send(orgs))
    .catch(err => console.log(err));
});

app.post('/organizations', (req, res) => {
    orgs
    .create(req.body.organization)
    .then((campground, err) => {
        if (err) {
            console.log('error');
            res.sendStatus(403);
        } else {
            res.sendStatus(200);
        }
    });
});

app.post('/register', (req, res) => {
    user
    .create(req.body.user)
    .then((user, err) => {
        if (err) {
            console.log(err);
            res.sendStatus(403);
        } else {
            res.sendStatus(200);
        }
    });
});

app.post('/login', (req, res) => {
    user
    .create(req.body.user)
    .then((user, err) => {
        if (err) {
            console.log(err);
            res.sendStatus(403);
        } else {
            res.send({
                accept: 200,
            });
        }
    });
});

app.listen(process.env.PORT || 3000, () => console.log(`Server listening on port ${process.env.PORT || 3000}`));