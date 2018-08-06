/* eslint-disable
  no-param-reassign
*/
const fs = require('fs');
const path = require('path');

const Ajv = require('ajv');
const ajvKeywords = require('ajv-keywords');

const ValidationError = require('./ValidationError');

const ajv = new Ajv({
  allErrors: true,
  useDefaults: true,
  errorDataPath: 'property',
});

ajvKeywords(ajv, ['instanceof', 'typeof']);

const validateOptions = (schema, options, name) => {
  if (typeof schema === 'string') {
    schema = fs.readFileSync(path.resolve(schema), 'utf8');
    schema = JSON.parse(schema);
  }

  if (!ajv.validate(schema, options)) {
    throw new ValidationError(ajv.errors, name);
  }

  return true;
};

module.exports = validateOptions;
