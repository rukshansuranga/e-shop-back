const getTableData = (req, res, db) => {
    db.select('*').from('table1')
        .then(item => {
            if (item.length) {
                res.json(item);
            } else {
                res.json({ dataExist: 'false' });
            }
        })
        .catch(err => res.status(400).json({ dbError: 'db error' }))
}


const postTableData = (req, res, db) => {
    const { first, last, email, phone, location, hobby } = req.body;
    const added = new Date();
    db('table1').insert({ first, last, email, phone, location, hobby, added })
        .returning('*')
        .then(item => {
            res.json(item);
        })
        .catch(err => res.status(400).json({ dbError: 'db error' }));
}


const putTableData = (req, res, db) => {
    const { id } = req.body;
    db('table1').where({ id }).update({ first, last, email, phone, location, hobby })
        .returning('*')
        .then(item => {
            res.json(item);
        })
        .catch(err => res.status(400).json({ dbError: 'db error' }));
}

const deleteTableData = (req, res, db) => {
    const { id } = req.body;
    db('table1').where({ id }).del()
        .returning('*')
        .then(item => {
            res.json(item);
        })
        .catch(err => res.status(400).json({ dbError: 'db error' }));
}

module.exports = {
    getTableData,
    postTableData,
    putTableData,
    deleteTableData
}