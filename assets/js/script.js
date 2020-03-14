const form = document.getElementById('form')
form.addEventListener('submit', handleSubmit)

function handleSubmit(event) {
    //para a pagina não atualizar quando dar um submit
    event.preventDefault()

    //pegando dados do input
    const gender = getSelectedValue('gender')
    const age = Number(document.getElementById('age').value)
    const weight = Number(document.getElementById('weight').value)
    const height = Number(document.getElementById('height').value)
    const activityLevel = getSelectedValue('activity_level')

    //condicional para aplicar a fórmula (tnb = taxa metabolica basal)
    const tnb = Math.round(
        gender === 'female' ?
        (655 + (9.6 * weight) + (1.8 * height) - (4.7 * age)) :
        (66 + (13.7 * weight) + (5 * height) - (6.8 * age))
    )

    const maintenance = Math.round((tnb - Number(activityLevel)))
    const loseWeight = maintenance - 450
    const gainWeght = maintenance + 450

    //renderizando os dados no html
    const layout = `
    <h2>Aqui está o resultado:</h2>

    <div class="result-content">
      <ul>
        <li>
          Seu metabolismo basal é de <strong>${tnb} calorias</strong>.
        </li>
        <li>
          Para manter o seu peso você precisa consumir em média <strong>${maintenance} calorias</strong>.
        </li>
        <li>
          Para perder peso você precisa consumir em média <strong>${loseWeight} calorias</strong>.
        </li>
        <li>
          Para ganhar peso você precisa consumir em média <strong>${gainWeght} calorias</strong>.
        </li>
      </ul>
    </div>
    `

    const result = document.getElementById('result')
    result.innerHTML = layout
}

/**função que recebe o id e retorna o valor do elemento select selecionado */
function getSelectedValue(id) {
    const select = document.getElementById(id)
    return select.options[select.selectedIndex].value
}