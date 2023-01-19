import fs from 'node:fs';
import path from 'node:path';

import yaml from 'js-yaml';

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
