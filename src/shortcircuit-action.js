module.exports = (shortcircut) => (action) => (input) =>
    shortcircut(input) ? Promise.resolve(input)
    :  Promise.resolve(input)
            .then(action)
