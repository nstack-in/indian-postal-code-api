const knex = require('knex');
const PIN_CODE_TABLE = 'pincodes';

var db = knex({
    client: 'sqlite3',
    connection: {
        filename: './db/data.sqlite'
    },
    useNullAsDefault: true
});

function welcome(req, res) {
    return res.json({
        'message': 'Read the docs',
        'data': [],
    });
}

async function listStates(req, res) {
    let data = await db(PIN_CODE_TABLE)
        .groupBy('state')
        .orderBy('state')
        .whereNotNull('Pincode');

    const status = data.length == 0 ? 404 : 200;

    return res.status(status).json({
        'message': 'List of one Post Office from each state',
        'data': data
    });
}
async function listDistricts(req, res) {
    const state = req.params.state;

    let data = await db(PIN_CODE_TABLE)
        .groupBy('DistrictsName')
        .where({ state })
        .orderBy('DistrictsName')
        .whereNotNull('Pincode');
    const status = data.length == 0 ? 404 : 200;


    return res.status(status).json({
        'message': `List of one Post Office from all district of ${state} State`,
        'data': data
    });
}
async function listCity(req, res) {
    const state = req.params.state;
    const DistrictsName = req.params.DistrictsName;

    let data = await db(PIN_CODE_TABLE)
        .groupBy('city')
        .where({ state })
        .where({ DistrictsName })
        .orderBy('city')
        .whereNotNull('Pincode');

    const status = data.length == 0 ? 404 : 200;

    return res.status(status).json({
        'message': `List of one Post Office from ${DistrictsName} District`,
        'data': data
    });
}
async function listPostOffice(req, res) {
    const state = req.params.state;
    const DistrictsName = req.params.DistrictsName;
    const city = req.params.city;

    let data = await db(PIN_CODE_TABLE)
        .where({ state })
        .where({ DistrictsName })
        .where({ city })
        .orderBy('PostOfficeName')
        .whereNotNull('Pincode');
    const status = data.length == 0 ? 404 : 200;

    return res.status(status).json({
        'message': `List of all Post Office from ${city} City`,
        'data': data
    });
}
async function findPostOffice(req, res) {
    const Pincode = req.params.Pincode;
    let data = await db(PIN_CODE_TABLE)
        .where({ Pincode });
    const status = data.length == 0 ? 404 : 200;

    return res.status(status).json({
        // Not checking if PIN is number or not
        'message': Pincode.length != 6
            ? `Indian PIN Code are of 6 character only`
            : `Post Office Detail of ${Pincode}`,
        'data': data.length == 1 ? data[0] : {}
    });
}


module.exports = {
    welcome,
    listStates,
    listDistricts,
    listCity,
    listPostOffice,
    findPostOffice
}