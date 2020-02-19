const {isAvailable} = require('./metadata');
const CONCURRENCY = 150;

function coldStartMetadata () {
  const arr = [];
  const start = Date.now();
  for (let i = 0; i < CONCURRENCY; i++) {
    isAvailable();
  }
  console.info(`SUCCESS ${Date.now() - start}`);
}

coldStartMetadata();

/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.helloWorld = async (req, res) => {
  await coldStartMetadata();
  let message = req.query.message || req.body.message || 'Hello World!';
  res.status(200).send(message);
};
