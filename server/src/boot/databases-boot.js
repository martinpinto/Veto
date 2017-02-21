module.exports = function() {
    
    var databases = config.database.couchdb.databases;

    if (databases !== 'undefined') {
        for (var i = 0; i < databases.length; i++) {
            var database = databases[i];
            if (nano.db.use(database) !== 'undefined') {
                nano.db.create(database);
                console.log('[couchdb] Created database \'' + database + '\'');
            }
            
            // test data available?
            var couchDBJSONTestData = JSON.parse(require('fs').readFileSync('./couchdb_test_data.json', 'utf8'));
            if (couchDBJSONTestData !== undefined) {
                var elements = couchDBJSONTestData.elements;
                if (elements !== 'undefined') {
                    for (var i = 0; i < elements.length; i++) {
                        var element = elements[i];
                        if (element.database === database) {
                            var db = nano.use(database);
                            db.insert(element.content, function(err, body) {
                                if (err) {
                                    if (err.statusCode !== 409) {
                                        console.log('[couchdb] Failed to insert entry!');
                                        console.log(err);    
                                    } else {
                                        console.log('[couchdb] Entry already exists!');
                                    }
                                } else {
                                    console.log('[couchdb] Inserted entry');
                                    console.log(body);
                                }
                            });
                        }
                    }    
                }
            }
        }
    }
};