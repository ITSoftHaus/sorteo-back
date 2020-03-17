export default interface IFileLoader {

    filePath: string;
    fileBuffer: Buffer;

    load(): any;
    getZipFileFromUrl(url: string)
}