const {isAvailable} = require('./metadata');
const CONCURRENCY = 150;

async function coldStartMetadata () {
  const arr = [];
  for (let i = 0; i < CONCURRENCY; i++) {
    arr.push(isAvailable());
  }
  // Promise.all waits for all operations to finish, performing them in
  // parallel.
  return Promise.all(arr).then((result) => {
    console.info(JSON.stringify(result), null, 2);
  });
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

