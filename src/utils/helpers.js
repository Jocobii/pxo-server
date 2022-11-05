const plainObject = (e) => JSON.parse(JSON.stringify(e));
const generateCode = () => Math.floor(100_000 + Math.random() * 900_000);

module.exports = {
    plainObject,
    generateCode,
};
