import * as fs from 'fs';
import * as glob from 'glob';
import * as md5 from 'md5';

export class TypeScriptTools {

    files: Array<{
        fileName?: string,
        buffer?: Buffer,
        md5Sum?: any,
    }> = [];

    constructor() {
    };

    async readAndCompareMD5Sum() {
        if (process.env.TYPE === 'md5') {
            glob(`${process.env.FILE_SUBSTRING}*.js`, (error, globFiles) => {
                console.log(error);
                console.log(globFiles);
                globFiles.forEach(async (file: string) => {
                    this.files.push({ fileName: file });
                    this.files.push({ buffer: (this.convertToBuffer5(file)) ?? Buffer.from('') });
                    console.log(this.compareBuffers(this.files));
                });
            });
            this.compareBuffers(this.files);
        }
    }

    compareBuffers(bufferFiles: typeof this.files): any {
        let condition: boolean = false;
        for (let i = 0; i < bufferFiles.length; i++) {
            condition = (i < bufferFiles.length) ? (bufferFiles[i].buffer?.compare(bufferFiles[i + 1].buffer ?? Buffer.from('')) === 0) ? true : false : false;
            if (condition === false) {
                i = bufferFiles.length;
                return condition;
                // continue;
            }
            console.log(i)
            i++;
        }
        return condition;
    }

    convertToBuffer5(filePath: string): Buffer | null {
        let convBuffer: Buffer | null = null;
        convBuffer = fs.readFileSync(filePath);
        return convBuffer ?? null;
    }
}