const getFileFormat = (filename:string) => {
    const splittedStrings = filename.split('.')
    return splittedStrings[splittedStrings.length - 1]
}

export default getFileFormat
