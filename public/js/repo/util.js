var Utils = (function() {
    return {
        getBarData: function(data) {
            var items = data.children;
            var result = {
                    labels: [],
                    series: []
                },
                values = [];

            items.forEach(function(item) {
                result.labels.push(item.name);
                values.push(item.children.length);
            })

            result.series.push({
                label: 'Projects count',
                values: values
            })

            return result;
        }
    }
}())