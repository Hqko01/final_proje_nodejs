const express = require('express');
const routes = require('./routes/index');
const authRoutes = require('./routes/auth/index');
const profileRoutes = require('./routes/profile/index');
const mongoose = require('mongoose')
const app = express();
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/users'));

app.use('/', routes)
app.use('/auth', authRoutes)
app.use('/profile', profileRoutes) 

/* app.get('/all', (req, res) => {
    users.find()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        })
})
 */
app.use((req, res) => {
    res.status(404).send('404')
})

const uri = "mongodb+srv://hqkko0:hsbJCGPCELBFAFM6@educationtree.gbluwlx.mongodb.net/?retryWrites=true&w=majority&appName=EducationTree";
mongoose.connect(uri)
  .then((result) => app.listen(process.env.PORT || 3330, function () {
    console.log('http://localhost:3330', 'Mongo bağlantısı başarılı sistem hazır.')
  }))
  .catch((err) => console.log(err))
