const MAGIC_NUMBERS = {
    jpg: [
        /^FFD8FFE0/,
        /^FFD8FFEE/,
        /^FFD8FFE1.{4}4578696600000/,
    ], png: [
        /^89504E470D0A1A0A/
    ]
}

const checkFile = async (req, res, next) => {
    if (req.file) {
        const buffer = req.file.buffer

        const magicNumber = buffer.slice(0, 12).toString("hex").toUpperCase();

        for (const [fileType, patterns] of Object.entries(MAGIC_NUMBERS)) {
            for (const pattern of patterns) {
                if (pattern.test(magicNumber)) {
                    req.file.fileType = fileType;
                    return next();
                }
            }
        }
    }
    return res.status(500).json({ error: "Invalid File Type" });
}
module.exports = checkFile;

