import throttle from "lodash/throttle";

const renderBgText = ({ renderTo, letter}) => {
  let rows = []
  let rowHeight = 0
  let letterWidth = 0

  const getRowPart = (offset, reverse) => {
    const text = new Array(4)
        .fill(1).map(() => letter).join(' ')

    const translateX = reverse ? `${offset * 2}px` : `${offset * 2}px`
    const marginLeft = reverse ? `-${offset * 6}px` : `-${offset * 6}px`

    return $('<p>', {class: reverse ? 'reverse' : ''}).attr('data-text', text)
        .css('transform', `translateX(${translateX})`)
        .css('margin-left', marginLeft)

  }

  const getRow = (reverse = false) => {
    const offset = (Math.random() * (150 - 10) + 10)
    const rowWrapper = $('<div>')
    let row = getRowPart(offset, reverse)

    rowWrapper.append(row)

    return rowWrapper
  }

  const wrapper = renderTo

  function updateRows() {
    rows.forEach(row => row.remove())
    rows = new Array(Math.floor(5)).fill(0).map((_, index) => getRow(index % 2 === 0, index))
    wrapper.append(rows)
  }

  window.addEventListener('resize', throttle(() => updateRows(), 500))

  setImmediate(() => {
    updateRows()
  })}

window.renderBgText = renderBgText