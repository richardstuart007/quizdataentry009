//
//  Browser Port (9002) ==> Server REMOTE server
//
exports.SERVER_REMOTE = 'REMOTE'
exports.URL_REMOTE = 'https://quizserver009-production.up.railway.app'
//
//  Browser Port (9012) ==> Server LOCAL Port (9001) ==> Server REMOTE server
//
exports.SERVER_LOCAL_REMOTE = 'LOCAL==>REMOTE'
exports.URL_LOCAL_REMOTE = 'http://localhost:9001'
//
//  Browser Port (8002) ==> Server LOCAL Port (8001)
//
exports.SERVER_LOCAL = 'LOCAL'
exports.URL_LOCAL = 'http://localhost:8001'
//
//  Tables
//
exports.URL_TABLES = '/QuizTables'
exports.SQL_TABLE_QUESTIONS = 'questions'
exports.SQL_TABLE_BIDDING = 'bidding'
exports.SQL_TABLE_HANDS = 'hands'
exports.SQL_TABLE_OWNER = 'owner'
exports.SQL_TABLE_GROUP1 = 'group1'
exports.SQL_TABLE_GROUP2 = 'group2'
exports.SQL_TABLE_GROUP3 = 'group3'
exports.SQL_TABLE_REFLINKS = 'reflinks'
//
//  Other Parameters
//
exports.SQL_ROWS = 2000
exports.VALIDATE_ON_CHANGE = false
