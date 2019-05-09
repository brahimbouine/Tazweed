const executeCtrl = require('./executeQuery');
module.exports = {
    GetItems: (req, res) => { //ddd
        console.log(req.body)
        executeCtrl.selectQuery(`SELECT * FROM Items`).then(result => { 
            return res.status(200).json({ 'status': 200,Items:result});
        }).catch(err => {
            console.log('error ', err)
            return res.status(302).json({ 'status': 302, 'error': err });
        })
    },
    addItems: (req, res) => { 
        console.log(req.body)
        let data = req.body;
        executeCtrl.insertQuery(`INSERT INTO  Items SET ?`, data).then(ress => {
           return res.status(200).json({ 'status': 200,success:true});
         }).catch(err => {
             console.log('error ', err)
             return res.status(302).json({ 'status': 302, 'error': err });
         })
     }

}