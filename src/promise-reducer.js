module.exports = (accumulator, action) =>
    Promise.resolve(accumulator)
    .then(action);
