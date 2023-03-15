import BgText from '../../html/components/bgr-text.twig'
import uniqueId from "lodash/uniqueId";
import throttle from "lodash/throttle";

const renderBgText = (letter) => {
  const wrapperId = uniqueId('wrapper-id-')
  let rows = []
  let rowHeight = 0
  let letterWidth = 0
  let wrapperHeight = 0
  let wrapperWidth = 0

  const getRowPart = (offset) => {
    const row = $('<p>').append(new Array(letterWidth ? Math.ceil(wrapperWidth / letterWidth) : 1)
      .fill(1)
      .map(
        (_, index) => $('<span>', {text: ' ' + letter})
      )
    )

    return row
  }

  const getRow = () => {
    const offset = (Math.random() * (300 - 20) + 20)
    const rowWrapper = $('<div>').css('height', rowHeight)
    let beforeRow = getRowPart()
    let afterRow = getRowPart()
    let row = getRowPart((Math.random() * (2 - 1) + 1) === 1 ? offset * -1 : offset)

    rowWrapper.append(row)
    row.before(beforeRow)
    row.after(afterRow)

    const setAnimation = (_beforeRow, _row, _afterRow, before, middle, after) => {
      const offsetBeforeLeft = before ? before : offset - _row.width()
      const offsetMiddleLeft = middle ? middle : offset
      const offsetAfterLeft = after ? after : offset + _row.width()

      _beforeRow.css('left', `${offsetBeforeLeft}px`)
      _row.css('left', `${offsetMiddleLeft}px`)
      _afterRow.css('left', `${offsetAfterLeft}px`)

      _beforeRow.animate({
        left: offsetBeforeLeft + _row.width()
      }, 10000, 'linear')

      _row.animate({
        left: offsetMiddleLeft + _row.width()
      }, {
        duration: 10000,
        easing: 'linear',
        complete(animation, progress, remainingMs) {
          _afterRow.stop()
          _beforeRow.stop()
          _row.stop()
          setAnimation(_afterRow, _beforeRow, _row)
        }
      })
      _afterRow.animate({
        left: offsetAfterLeft + _row.width()
      }, {
        duration: 10000,
        easing: 'linear',
      })
    }

    setImmediate(() => {
      setAnimation(beforeRow, row, afterRow)
    })

    return rowWrapper
  }

  document.write(BgText({
    wrapperId
  }))

  const wrapper = $(`#${wrapperId}`)

  function updateState() {
    const testElement = $('<p>').append($('<span>', { text: letter })).appendTo(wrapper.css('transform', 'translateX(-100%)'))

    rowHeight = testElement.height()
    letterWidth = testElement.children().width()
    wrapperHeight = wrapper.height()
    wrapperWidth = wrapper.width()

    testElement.remove()
  }

  function updateRows() {
    updateState()

    rows.forEach(row => row.remove())
    rows = new Array(Math.floor(wrapperHeight / rowHeight)).fill(0).map(() => getRow())
    wrapper.append(rows)
  }

  window.addEventListener('resize', throttle(() => updateRows(), 500))

  updateRows()
}

window.renderBgText = renderBgText