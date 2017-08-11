/**
 * Connection URI for a Mongo database that will hold our
 * application's persistent data.
 *
 * @todo Update to match the path of your actual database.
 * @module config/database
 */
module.exports = process.env.MONGODB_URI || 'mongodb://localhost:27017/abaclasses';
