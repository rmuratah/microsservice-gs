const xlsx = require('xlsx')
const files = ["3-1-1", "3-1-2", "3-2-1", "3-2-2", "3-3-2", "3-3-3", "3-3-4", "3-3-5", "3-4-1", "3-4-2", "3-6-1", "3-7-2", "3-9-2", "3-9-3"]
const path = require('path');

const getMetas = () => ["3-1", "3-2", "3-3", "3-4", "3-5", "3-6", "3-7", "3-8", "3-9"]

const getObjetivos = () =>
    [[
        "Até 2030, reduzir a taxa de mortalidade materna global para menos de 70 mortes por 100.000 nascidos vivos.",
        "Até 2030, reduzir a razão de mortalidade materna para no máximo 30 mortes por 100.000 nascidos vivos.",
        "3-1"
    ], [
        "Até 2030, acabar com as mortes evitáveis de recém-nascidos e crianças menores de 5 anos, com todos os países objetivando reduzir a mortalidade neonatal para pelo menos 12 por 1.000 nascidos vivos e a mortalidade de crianças menores de 5 anos para pelo menos 25 por 1.000 nascidos vivos.",
        "Até 2030, enfrentar as mortes evitáveis de recém-nascidos e crianças menores de 5 anos, objetivando reduzir a mortalidade neonatal para no máximo 5 por mil nascidos vivos e a mortalidade de crianças menores de 5 anos para no máximo 8 por mil nascidos vivos. ",
        "3-2"
    ], [
        "Até 2030, acabar com as epidemias de AIDS, tuberculose, malária e doenças tropicais negligenciadas, e combater a hepatite, doenças transmitidas pela água, e outras doenças transmissíveis.",
        "Até 2030 acabar, como problema de saúde pública, com as epidemias de AIDS, tuberculose, malária, hepatites virais, doenças negligenciadas, doenças transmitidas pela água, arboviroses transmitidas pelo aedes aegypti e outras doenças transmissíveis.",
        "3-3"
    ], [
        "Até 2030, reduzir em um terço a mortalidade prematura por doenças não transmissíveis via prevenção e tratamento, e promover a saúde mental e o bem-estar.",
        "Até 2030, reduzir em um terço a mortalidade prematura por doenças não transmissíveis via prevenção e tratamento, promover a saúde mental e o bem-estar, a saúde do trabalhador e da trabalhadora, e prevenir o suicídio, alterando significativamente a tendência de aumento.",
        "3-4"
    ], [
        "Reforçar a prevenção e o tratamento do abuso de substâncias, incluindo o abuso de drogas entorpecentes e uso nocivo do álcool.",
        "Reforçar a prevenção e o tratamento dos problemas decorrentes do uso de substâncias, incluindo o abuso de drogas entorpecentes e uso nocivo do álcool.",
        "3-5"
    ], [
        "Até 2020, reduzir pela metade as mortes e os ferimentos globais por acidentes em estradas.",
        "Até 2030, reduzir pela metade as mortes e lesões por acidentes no trânsito.",
        "3-6"
    ], [
        "Até 2030, assegurar o acesso universal aos serviços de saúde sexual e reprodutiva, s.incluindo o planejamento familiar, informação e educação, bem como a integração s.da saúde reprodutiva em estratégias e programas nacionais.",
        "Até 2030, assegurar o acesso universal aos serviços e insumos de saúde sexual e s.reprodutiva, incluindo o planejamento reprodutivo, à informação e educação, bem s.como a integração da saúde reprodutiva em estratégias e programas nacionais.",
        "3-7"
    ], [
        "Atingir a cobertura universal de saúde, incluindo a proteção do risco financeiro, o acesso a serviços de saúde essenciais de qualidade e o acesso a medicamentos e vacinas essenciais seguros, eficazes, de qualidade e a preços acessíveis para todos.",
        "Assegurar, por meio do Sistema Único de Saúde (SUS), a cobertura universal de saúde, o acesso a serviços essenciais de saúde de qualidade em todos os níveis de atenção e o acesso a medicamentos e vacinas essenciais seguros, eficazes e de qualidade que estejam incorporados ao rol de produtos oferecidos pelo SUS.",
        "3-8"
    ], [
        "Até 2030, reduzir substancialmente o número de mortes e doenças por produtos químicos perigosos, contaminação e poluição do ar e água do solo",
        "Meta mantida sem alteração.",
        "3-9"
    ]]

function getIndicadores() {
    const data = []

    files.forEach((file) => {
        const filePath = path.join(__dirname, 'datasets', `${file}.xlsx`)
        const dataset = xlsx.utils.sheet_to_json(xlsx.readFile(filePath).Sheets[xlsx.readFile(filePath).SheetNames[0]])
        data.push
            ([
                file,
                Object.values(Object.values(dataset)[0])[0],
                file.slice(0, 3)
            ])
    })

    return data
}

function getODS() {

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
    getMetas,
    getObjetivos,
    getIndicadores,
    getODS
}