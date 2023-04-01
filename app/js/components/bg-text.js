import throttle from "lodash/throttle";

const renderBgText = ({ renderTo, letter}) => {
  let rows = []
  let rowHeight = 0
  let letterWidth = 0
  let wrapperHeight = 0
  let wrapperWidth = 0

  const getRowPart = (offset) => {
    const row = $('<p>').append(new Array(letterWidth ? Math.ceil(wrapperWidth / letterWidth) + 2 : 1)
      .fill(1)
      .map(
        (_, index) => $('<span>', {text: ' ' + letter})
      )
    )

    return row
  }

  const getRow = (reverse = false) => {
    const offset = (Math.random() * (300 - 20) + 20)
    const rowWrapper = $('<div>').css('height', rowHeight)
    let beforeRow = getRowPart()
    let afterRow = getRowPart()
    let row = getRowPart((Math.random() * (2 - 1) + 1) === 1 ? offset * -1 : offset)

    rowWrapper.append(row)
    row.before(beforeRow)
    row.after(afterRow)

    const setAnimation = (_beforeRow, _row, _afterRow, before, middle, after) => {
      const offsetBeforeLeft = before ? before : (reverse ? (offset - _row.width()) : (offset + _row.width()))
      const offsetMiddleLeft = middle ? middle : offset
      const offsetAfterLeft = after ? after : (reverse ? (offset + _row.width()) : (offset - _row.width()))

      const direction = reverse ? -1 : 1
      const rowWidth = reverse ? -_row.width() : _row.width()
      const duration = 25000

      _beforeRow.css('left', `${offsetBeforeLeft}px`)
      _row.css('left', `${offsetMiddleLeft}px`)
      _afterRow.css('left', `${offsetAfterLeft}px`)

      _beforeRow.animate({
        left: (offsetBeforeLeft + rowWidth)
      }, duration, 'linear')

      _row.animate({
        left: (offsetMiddleLeft + rowWidth)
      }, {
        duration: duration,
        easing: 'linear',
        complete() {
          _afterRow.stop()
          _beforeRow.stop()
          _row.stop()
          if (reverse) {
            setAnimation(_row, _beforeRow, _afterRow)
          } else {
            setAnimation(_afterRow, _beforeRow, _row)
          }
        }
      })
      _afterRow.animate({
        left: (offsetAfterLeft + rowWidth)
      }, {
        duration: duration,
        easing: 'linear',
      })
    }

    setImmediate(() => {
      setAnimation(beforeRow, row, afterRow)
    })

    return rowWrapper
  }

  const wrapper = renderTo

  function updateState() {
    const testElement = $('<p>').append($('<span>', { text: letter })).appendTo(wrapper.css('transform', 'translateX(-50%)'))

    rowHeight = testElement.height()
    letterWidth = testElement.children().width()
    wrapperHeight = wrapper.height()
    wrapperWidth = wrapper.width()

    testElement.remove()
  }

  function updateRows() {
    updateState()

    rows.forEach(row => row.remove())
    rows = new Array(Math.floor(wrapperHeight / rowHeight)).fill(0).map((_, index) => getRow(index % 2 === 0))
    wrapper.append(rows)
  }

  window.addEventListener('resize', throttle(() => updateRows(), 500))

  wrapper.css('opacity', 0)

  const intervalId = setInterval(() => {
    updateRows()

    setImmediate(() => {
      if (rows.length > 1) {
        clearInterval(intervalId)
        wrapper.animate({
          opacity: 1
        }, {
          duration: 200
        })
      }
    })
  }, 100)
}

window.renderBgText = renderBgText