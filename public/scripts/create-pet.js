function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(res => res.json())
        .then(states => {
            for (const state of states) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }
        })
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text


    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
        .then(res => res.json())
        .then(cities => {
            for (const city of cities) {
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }

            citySelect.disabled = false
        })

}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)


// Itens de coleta
// pegar todos os li`s
const species = document.querySelectorAll(".species-grid li")

for (const specie of species) {
    specie.addEventListener("click", handleSectedSpecie)
}

const collectedSpecies = document.querySelector("input[name=species]")

let selectedSpecies = []

function handleSectedSpecie(event) {
    const specieLi = event.target

    // adicionar ou nremover uma classe com javascript
    specieLi.classList.toggle("selected")

    const specieId = specieLi.dataset.id

    // console.log('SPECIE ID: ', specieId)

    // verificar se existem itens selecionados, se sim
    // pegar os itens selecionados

    const alreadySelected = selectedSpecies.findIndex(specie => {
        const specieFound = specie == specieId // isso será true ou false
        return specieFound
    })

    // se já estiver selecionado, tirar da selecao
    if (alreadySelected >= 0) {
        // tirar da seleção
        const filteredSpecies = selectedSpecies.filter(specie => {
            const specieIsDifferent = specie != specieId // false
            return specieIsDifferent
        })

        selectedSpecies = filteredSpecies
    } else {
        // se não estiver selecionado 
        // adicionar à selecao
        selectedSpecies.push(specieId)
    }

    // console.log('selectedSpecies: ', selectedSpecies)

    // atualizar o campo escondido com os dados selecionados
    collectedSpecies.value = selectedSpecies

}