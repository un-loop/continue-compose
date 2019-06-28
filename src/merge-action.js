module.exports = (action) => (input) =>
    Promise.resolve(input)
    .then(action)
    .then(Object.assign.bind(this, {}, input));
