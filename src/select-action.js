module.exports = (selector) => (action) => (input) =>
    Promise.resolve(selector(input))
    .then(action)
