import { departmentsData } from '../src/data/departmentsData';

const json = JSON.stringify(departmentsData, null, 2);
await Bun.write('/home/z/my-project/src/data/departments.json', json);
console.log('Extracted departments:', Object.keys(departmentsData).join(', '));
