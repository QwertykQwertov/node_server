const toCurrency = price => {
  return new Intl.NumberFormat('ru-RU', {
    currency: 'rub',
    style: 'currency'
  }).format(price)
}

document.querySelectorAll('.price').forEach(node => {
  node.textContent = toCurrency(node.textContent)
})


const $card = document.querySelector('#card')
if ($card) {
  $card.addEventListener('click', (e) => {
    const id = e.target.dataset.id
    if (e.target.classList.contains('js-remove')) {
      fetch(`/card/remove/${id}`, {
        method: 'DELETE'
      }).then(res => res.json())
        .then(card => {
          if (card.courses.length) {
            const html = card.courses.map(course => {
              return `
              <tr>
                <td>${course.title}</td>
                <td>${course.count}</td>
                <td><button class="bth btn-small js-remove" data-id="${course.id}">Удалить</button></td>
              </tr>`
            }).join('')
            $card.querySelector('tbody').innerHTML = html
            $card.querySelector('.price').textContent = toCurrency(card.total)
          } else {
            $card.innerHTML = '<p>Корзина пуста</p>'
          }
        })
    }
  })
}