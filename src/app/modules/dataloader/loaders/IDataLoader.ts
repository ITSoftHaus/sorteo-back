import FileLoader from '../fileloader/FileLoader';

export default interface IDataLouder {

    filePath: string;
    fileBuffer: Buffer;
    jsonFile: object[];
    loader: FileLoader;

    getDataLoaded(): object[];
    getZipFileFromUrl(url: string);
    getDataLoaded(): any;
    getFileBufferLoaded(): Buffer;
}