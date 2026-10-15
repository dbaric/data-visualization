async function crtajGraf() {
  const dataset = await d3.json('vrijeme.json')

  const datumParser = d3.timeParse('%Y-%m-%d')
  const datumAccessor = d => datumParser(d.date)
  const tempAccessor = d => (Number(d.temperatureMax) - 32) * 5 / 9

  const dimenzije = {
    sirina: 960, visina: 520,
    margine: {
      top: 35, right: 28,
      bottom: 68, left: 72
    }
  }
  const grSirina = dimenzije.sirina
    - dimenzije.margine.left - dimenzije.margine.right
  const grVisina = dimenzije.visina
    - dimenzije.margine.top - dimenzije.margine.bottom

  const svg = d3.select('#sadrzaj')
    .append('svg')
    .attr('viewBox', `0 0 ${dimenzije.sirina} ${dimenzije.visina}`)
    .attr('width', dimenzije.sirina)
    .attr('height', dimenzije.visina)
  const granice = svg.append('g')
    .attr('transform',
      `translate(${dimenzije.margine.left},${dimenzije.margine.top})`)

  const xSkala = d3.scaleTime()
    .domain(d3.extent(dataset, datumAccessor))
    .range([0, grSirina])
  const ySkala = d3.scaleLinear()
    .domain(d3.extent(dataset, tempAccessor))
    .nice()
    .range([grVisina, 0])

  const generatorLinije = d3.line()
    .x(d => xSkala(datumAccessor(d)))
    .y(d => ySkala(tempAccessor(d)))
  granice.append('path')
    .datum(dataset)
    .attr('d', generatorLinije)
    .attr('fill', 'none')
    .attr('stroke', '#148b75')
    .attr('stroke-width', 2.5)

  const xOs = d3.axisBottom(xSkala)
    .ticks(d3.timeMonth.every(2))
    .tickFormat(d3.timeFormat('%b'))
  const yOs = d3.axisLeft(ySkala).ticks(7)
  granice.append('g')
    .attr('transform', `translate(0,${grVisina})`)
    .call(xOs)
  granice.append('g').call(yOs)

  granice.append('text')
    .attr('x', grSirina / 2)
    .attr('y', grVisina + 53)
    .attr('text-anchor', 'middle')
    .text('Datum (2018.)')
  granice.append('text')
    .attr('transform', 'rotate(-90)')
    .attr('x', -grVisina / 2)
    .attr('y', -51)
    .attr('text-anchor', 'middle')
    .text('Maksimalna dnevna temperatura (°C)')

  const nulaY = ySkala(0)
  granice.insert('rect', ':first-child')
    .attr('x', 0)
    .attr('y', nulaY)
    .attr('width', grSirina)
    .attr('height', grVisina - nulaY)
    .attr('fill', '#e7f4ff')

  const dvadesetPetY = ySkala(25)
  granice.insert('rect', ':first-child')
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', grSirina)
    .attr('height', dvadesetPetY)
    .attr('fill', '#ffe9e9')
}

crtajGraf()
