// Aguarda o carregamento completo do DOM antes de executar o código
document.addEventListener('DOMContentLoaded', function () {
    // Cria um gráfico Highcharts dentro do elemento com o ID 'container'
    const chart = Highcharts.chart('container', {
        // Configurações gerais do gráfico de colunas
        chart: {
            type: 'column',
            // Adiciona um evento de carga para o gráfico
            events: {
                load: function () {
                    // Chama a função para adicionar imagens sobre as colunas
                    addImages(this);
                }
            }
        },
        // Configurações do título do gráfico
        title: {
            text: 'Fruit Consumption'
        },
        // Configurações do eixo X (categorias)
        xAxis: {
            categories: ['Apples', 'Bananas', 'Oranges']
        },
        // Configurações do eixo Y
        yAxis: {
            title: {
                text: 'Fruit eaten'
            }
        },
        // Configurações das séries de dados (colunas)
        series: [{
            name: 'Jane',
            data: [1, 10, 4],
            pointPlacement: 'between' // Adiciona o ponto entre as colunas
        }, {
            name: 'John',
            data: [5, 7, 3],
            pointPlacement: 'between'
        }]
    });

    // Função para adicionar imagens sobre as colunas no gráfico
    function addImages(chart) {
        // Obtém as séries de dados e as categorias do eixo X
        const series = chart.series;
        const categories = chart.xAxis[0].categories;

        // Itera sobre cada série e ponto de dados para adicionar imagens
        series.forEach((s, seriesIndex) => {
            s.points.forEach((point, pointIndex) => {
                // Calcula as coordenadas X e Y do ponto no gráfico
                const x = point.plotX + chart.plotLeft;
                const y = point.plotY + chart.plotTop;

                // Obtém o caminho da imagem correspondente à categoria
                const imagePath = getImagePath(categories[pointIndex]);

                // Cria e adiciona a imagem no gráfico
                const image = chart.renderer.image(imagePath, x - 20, y - 40, 40, 40)
                    .attr({
                        zIndex: 100,
                        'data-series-index': seriesIndex,
                        'data-point-index': pointIndex,
                        opacity: 0
                    })
                    .add();

                // Adiciona eventos de mouseover e mouseout para mostrar e ocultar a imagem
                point.graphic.on('mouseover', function () {
                    image.attr({
                        opacity: 1
                    });
                }).on('mouseout', function () {
                    image.attr({
                        opacity: 0
                    });
                });
            });
        });
    }

    // Função para obter o caminho da imagem com base na categoria
    function getImagePath(category) {
        // Mapeia cada categoria para o caminho da imagem correspondente
        const imageMap = {
            'Apples': 'imagem/cachorro.jpg',
            'Bananas': 'imagem/gato.jpg',
            'Oranges': 'imagem/passaro.jpg'
            // Adicione mais mapeamentos conforme necessário
        };

        return imageMap[category];
    }
});
