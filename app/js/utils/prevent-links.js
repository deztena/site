function preventLinks(links) {
  console.log(links)
  links.map(link => {
    if (link) {
      link.on('click', e => e.preventDefault())
    }
  })
}