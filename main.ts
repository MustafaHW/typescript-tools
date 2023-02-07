import { TypeScriptTools } from './typescript_tools';
import * as dotenv from 'dotenv';

function runApp() {
    dotenv.config();
    new TypeScriptTools().readAndCompareMD5Sum();
    console.log('running');
}
runApp();