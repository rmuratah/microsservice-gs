const xlsx = require('xlsx')
const files = ["3-1-1", "3-1-2", "3-2-1", "3-2-2", "3-3-2", "3-3-3", "3-3-4", "3-3-5", "3-4-1", "3-4-2", "3-6-1", "3-7-2", "3-9-2", "3-9-3"]
const path = require('path');

function getData() {

    const data = []

    files.forEach((file) => {
        const filePath = path.join(__dirname, 'datasets', `${file}.xlsx`)
        const dataset = xlsx.utils.sheet_to_json(xlsx.readFile(filePath).Sheets[xlsx.readFile(filePath).SheetNames[0]])

        dataset.slice(2).map((value) => (
            Object.values(value).slice(1).forEach((taxa, index) => (
                data.push
                    ([
                        `${file}`,
                        Object.values(value)[0],
                        taxa,
                        parseInt(Object.values(dataset[1]).slice(1)[index])
                    ])
            ))
        ))
    })

    return data
}

module.exports = {
    getData,
}