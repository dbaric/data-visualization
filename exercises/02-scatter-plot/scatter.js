async function crtajScatter() {
  const dataset = await d3.json("vrijeme.json");
  console.log(dataset.length, dataset[0]);

  const xAccessor = d => (d.dewPoint - 32) * 5 / 9;
  const yAccessor = d => d.humidity * 100;

  const dimenzije = {
    sirina: 820, visina: 520,
    margine: { top: 30, right: 30, bottom: 70, left: 70 }
  };
  const grSirina = dimenzije.sirina - dimenzije.margine.left - dimenzije.margine.right;
  const grVisina = dimenzije.visina - dimenzije.margine.top - dimenzije.margine.bottom;

  const svg = d3.select("#okvir")
    .append("svg")
    .attr("viewBox", `0 0 ${dimenzije.sirina} ${dimenzije.visina}`);
  const granice = svg.append("g")
    .attr("transform", `translate(${dimenzije.margine.left},${dimenzije.margine.top})`);

  const xSkala = d3.scaleLinear()
    .domain(d3.extent(dataset, xAccessor))
    .range([0, grSirina])
    .nice();
  const ySkala = d3.scaleLinear()
    .domain(d3.extent(dataset, yAccessor))
    .range([grVisina, 0])
    .nice();
  const skalaBoje = d3.scaleSequential(d3.interpolateBlues).domain([0, 1]);

  granice.append("g")
    .attr("transform", `translate(0,${grVisina})`)
    .call(d3.axisBottom(xSkala));
  granice.append("g").call(d3.axisLeft(ySkala));
  granice.append("text")
    .attr("x", grSirina / 2)
    .attr("y", grVisina + 50)
    .attr("text-anchor", "middle")
    .text("Temperatura rosišta (°C)");
  granice.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -grVisina / 2)
    .attr("y", -50)
    .attr("text-anchor", "middle")
    .text("Relativna vlažnost (%)");

  function crtajTocke(podaci) {
    const vezani = granice.selectAll("circle.tocka").data(podaci, d => d.date);
    console.log("enter", vezani.enter().size(), "update", vezani.size(), "exit", vezani.exit().size());
    vezani.join("circle")
      .attr("class", "tocka")
      .attr("cx", d => xSkala(xAccessor(d)))
      .attr("cy", d => ySkala(yAccessor(d)))
      .attr("r", 5)
      .attr("fill", d => skalaBoje(d.cloudCover))
      .attr("stroke", "#8298a8")
      .attr("fill-opacity", 0.8);
  }

  crtajTocke(dataset.slice(0, 200));
  console.log("circles", granice.selectAll("circle.tocka").size());
  crtajTocke(dataset);
  console.log("circles", granice.selectAll("circle.tocka").size());

  const legenda = granice.append("g")
    .attr("transform", `translate(${grSirina - 150},${grVisina - 90})`);
  [0, 0.5, 1].forEach((v, i) => {
    legenda.append("circle")
      .attr("cx", 6)
      .attr("cy", i * 22)
      .attr("r", 6)
      .attr("fill", skalaBoje(v))
      .attr("stroke", "#8298a8");
    legenda.append("text")
      .attr("x", 20)
      .attr("y", i * 22 + 4)
      .text(`${v * 100} % oblačnosti`);
  });
}

crtajScatter().catch(console.error);
