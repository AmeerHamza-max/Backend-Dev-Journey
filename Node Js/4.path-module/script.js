const path=require('path');
console.log('Directory Name',path.dirname(__filename));
console.log('File Name',path.basename(__filename));
console.log('File extension',path.extname(__filename));
const joinPath=path.join('/user','documents','node','projects');
console.log(joinPath);

const resolvePath=path.resolve('user','documents','node','projects');
console.log(resolvePath);

const normalizePath=path.normalize('/user/.documents/../node/projects');
console.log(normalizePath);

