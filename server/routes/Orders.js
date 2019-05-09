const executeCtrl = require('./executeQuery');
module.exports = {
    GetOrders: (req, res) => { //ddd
        executeCtrl.selectQuery(`SELECT * FROM Orders`).then(result => { 

            let allPromise = [];
            for (let q of result) {
                allPromise.push(executeCtrl.selectQuery(`SELECT * FROM order_items oi 
                LEFT JOIN items i 
                ON  i.id = oi.item_id
                where oi.order_id = ${q.id}`))
            }
            Promise.all(allPromise).then(items => {
                for (let i = 0; i < items.length; i++) {
                    result[i].items = items[i];
                }
                console.log(result)
            return res.status(200).json({ 'status': 200,Items:result});
        }).catch(err => {
            res.status(302).json({
                'status': 302,
                'error': err
            });
        })
        }).catch(err => {
            console.log('error ', err)
            return res.status(302).json({ 'status': 302, 'error': err });
        })
    },
    AddOrder: (req, res) => { 
        let userData = req.body.userData
        let data = req.body
         data.orderBy = userData.id
        delete data.userData
        executeCtrl.insertQuery(`INSERT INTO  Orders SET ?`, data).then(ress => {
            InsertOrderList(res.insertId, data).then(done => {
                return res.status(200).json({ 'status': 200,success:true});
            }, err => {
                console.log('InsertAnswers Error ', err)
                reject()
            })
         }).catch(err => {
             console.log('error ', err)
             return res.status(302).json({ 'status': 302, 'error': err });
         })
     },
     UpdateOrder: (req, res) => { 
        let userData = req.body.userData
        let data = {
            status:req.body.status
        }
        executeCtrl.insertQuery(`UPDATE Orders SET ? WHERE id =${OrderId}`, data).then(ress => {

             return res.status(200).json({ 'status': 200,success:true});
         }).catch(err => {
             console.log('error ', err)
             return res.status(302).json({ 'status': 302, 'error': err });
         })
     },

}
function InsertOrderList(OrderId, List) {
    return new Promise((resolve, reject) => {
        for (b of List) {
            console.log('b answer', b)
            let list = {
                order_id: OrderId,
                item_id: b.item,
                quantity:'1'
            }
            executeCtrl.insertQuery(`INSERT INTO order_items SET ?`, list).then(an => {
                resolve()
            }).catch(err => {
                reject()
                return res.status(302).json({ 'status': 302, 'error': err });
            })
        }
    })
}