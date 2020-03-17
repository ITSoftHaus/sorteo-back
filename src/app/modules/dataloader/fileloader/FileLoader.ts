import fs from "fs";
import IFileLoader from "./IFileLoader";
import * as httpcli from "typed-rest-client/HttpClient";
import { IHeaders, IRequestOptions } from "typed-rest-client/Interfaces";
import * as path from 'path';

export default class FileLoader implements IFileLoader {

    filePath: string;
    fileBuffer: Buffer;
    http: httpcli.HttpClient;

    headers: IHeaders = {
        'Content-Type': 'application/x-zip-compressed',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
        'Connection': 'keep-alive',
        'Accept-Encoding': 'gzip, deflate'
    };
    
    options: IRequestOptions = {
        headers: this.headers,
        keepAlive: true,
        allowRetries: true,
        allowRedirects: true,
        maxRedirects: 10
    }

    constructor(filePath: string) {
        this.filePath = filePath;
        this.http = new httpcli.HttpClient('Chrome', null, this.options);
    }

    private readDataFromFile(): void {
        this.fileBuffer = fs.readFileSync(this.filePath);
    }

    public load(): void {
        this.readDataFromFile();
    }

    public getDataLoaded(): Buffer {
        return this.fileBuffer;
    }

    public async getZipFileFromUrl(url: string): Promise<unknown> {

        const client = this.http;
        const response = await client.get(url);
        const filePath = this.filePath;
        const file: NodeJS.WritableStream = fs.createWriteStream(path.resolve(__dirname + '/../../../../../files/sorteo.zip'));

        this.validaResponse(response);

        return this.criarArquivo({ file, response, filePath });
    }

    private async criarArquivo({ file, response, filePath }: 
        { file: NodeJS.WritableStream; response: any; filePath: string; }): Promise<unknown> {
        try {
            return new Promise((resolve, reject) => {
                file.on("error", (err) => reject(err));
                const stream = response.message.pipe(file);
                console.info('Promessa: ' + response.message.pipe(file));
                stream.on("close", () => {
                    try {
                        resolve(filePath);
                    }
                    catch (err) {
                        reject(err);
                    }
                });
            });
        }
        catch (error) {
            throw error;
        }
    }

    private validaResponse(response) {
        if (response.message.statusCode !== 200) {
            console.info(response.message.url);
            const err: Error = new Error(`Resposta HTTP inesperada: ${response.message.statusCode}`);
            err["httpStatusCode"] = response.message.statusCode;
            throw err;
        }
    }
}