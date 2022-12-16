/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable unicorn/consistent-function-scoping */
/* eslint-disable unicorn/no-array-reduce */
/* eslint-disable unicorn/prefer-module */
// const fs = require('node:fs');
import yaml from 'js-yaml';
import fs from 'node:fs';
import path from 'node:path';

const saveZoneYaml = (zoneKey: string, zone: any) => {
  const zonePath = path.resolve(__dirname, `../../config/zones/${zoneKey}.yaml`);
  const sortObjectByKey = (object: any) =>
    Object.keys(object)
      .sort()
      .reduce((result, key) => {
        result[key] = object[key];
        return result;
      }, {});
  fs.writeFile(zonePath, yaml.dump(sortObjectByKey(zone)), (error) => {
    if (error) {
      console.error(error);
    }
  });
};

export { saveZoneYaml };
