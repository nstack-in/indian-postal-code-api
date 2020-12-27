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
        .distinct(['state']);

    return res.json({
        'message': 'List of States',
        'data': data
    });
}
async function listDistricts(req, res) {
    const state = req.params.state;

    let data = await db(PIN_CODE_TABLE)
        .distinct(['DistrictsName', 'state'])
        .where({ state });

    return res.json({
        'message': `List of Districts in ${state}`,
        'data': data
    });
}
async function listCity(req, res) {
    const state = req.params.state;
    const DistrictsName = req.params.DistrictsName;

    let data = await db(PIN_CODE_TABLE)
        .distinct(['city', 'DistrictsName', 'state'])
        .where({ state })
        .where({ DistrictsName });

    return res.json({
        'message': `List of city in ${DistrictsName}, ${state}`,
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
        .where({ city });

    return res.json({
        'message': `List of Post Office in ${city}, ${DistrictsName}, ${state}`,
        'data': data
    });
}
async function findPostOffice(req, res) {
    const Pincode = req.params.Pincode;
    let data = await db(PIN_CODE_TABLE)
        .where({ Pincode });

    return res.json({
        'message': 'List of States',
        'data': data
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