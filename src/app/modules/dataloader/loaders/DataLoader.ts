import * as path from 'path';

import IDataLouder from './IDataLoader';
import FileLoader from '../fileloader/FileLoader';

import tabletojson from "tabletojson";

export default class DataLoader implements IDataLouder {
    
    /**
     * Store da applicação onde ficarão os files loaders da aplicação
     */    
    static readonly ROOT_FILES_LOADERS = path.resolve(__dirname + './../../../../../files/');

    /**
     * Arquivo default do filelouder
     */
    static readonly DEFAULT_FILE_LOADER = "fileloader.json";

    filePath: string;
    fileBuffer: Buffer;
    jsonFile: object[];
    loader: FileLoader;
    tabletojson: any;

    constructor(fileName = DataLoader.DEFAULT_FILE_LOADER) {
        this.setup(fileName);
        this.load();
    }

    private setup(fileName: string): void {
        this.filePath = DataLoader.ROOT_FILES_LOADERS + "/" + fileName;
        this.loader = new FileLoader(this.filePath);
    }

    private load(): void {
        this.loadFileBuffer();
    }

    private loadFileBuffer(): void {
        this.loader.load();
        this.setFileBuffer();
        this.setFileToJsnon();
    }

    private setFileBuffer(): void {
        this.fileBuffer = this.loader.getDataLoaded();
    }

    private setFileToJsnon(): void {
        this.jsonFile = tabletojson.convert(this.fileBuffer);
    }

    public getDataLoaded(): object[] {       
        return this.jsonFile;
    }

    public getFileBufferLoaded(): Buffer {        
        return this.fileBuffer;
    }

    public getZipFileFromUrl(url: string) {
        this.loader.getZipFileFromUrl(url);
    }
    
}
