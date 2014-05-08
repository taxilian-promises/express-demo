function parseErrorPaths (err) {
    var ret = [];
    err.errors.forEach(function(error) {
        if(error.path) {
            ret.push(error.path);
        }
    });
    return ret;
}

function mongoError(err) {
    var errorPaths = [],
        ret        = null,
        results    = null;

    console.log("Called");

    switch(err.name) {
        case 'MongoError':
            if(err.code === 11000 || err.code === 11001) { // 11000 is new item, 11001 is existing item
                results = {type:'DuplicateKey', data: [err.err], code: 409};
                ret     = {result: results, code: 409};
            } else {
                results = {type:'MongoError', data: ['Unknown'], code: 500};
                ret     = {result: results, code: 500};
            }
            break;
        case 'ValidationError':
            errorPaths = parseErrorPaths(err);
            if(errorPaths.length) {
                results = {type:'ValidationError', data: errorPaths, code: 400};
                ret     = {result: results, code: 400};
            } else {
                results = {type:'ValidationError', data: ['Unknown'], code: 500};
                ret     = {result: results, code: 500};
            }
            break;
        case 'CastError':
            results = {type:'CastError', data: [err.type, err.value], code: 500};
            ret     = {result: results, code: 500};
            break;
        default:
            return null;
    }
    return ret;
}

module.exports = mongoError;
