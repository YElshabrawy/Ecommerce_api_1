const router = require('express').Router();

router.get('/usertest', (req, res) =>{
    console.log('User Router');
    res.send('User Router');
})

router.post('/userpost', (req, res) =>{
    const username = req.body.username;
    console.log(`Welcome ${username}!`);
    res.send(`Welcome ${username}!`)
})

module.exports = router;