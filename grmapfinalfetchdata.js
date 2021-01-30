    const api_url = "https://covid-19-greece.herokuapp.com/refugee-camps";
        (async () => {
            const response = await fetch(api_url);
            const data = await response.json();
            window.raw_data = data["refugee-camps"];
            imageSeries.data = raw_data;
//Total All camps
var sumcases = raw_data.reduce((accumulator, currentValue) => accumulator + currentValue.total_confirmed_cases, 0);
document.getElementById("sumcasesid").innerHTML = sumcases;
//total tests
var sumtests = raw_data.reduce((accumulator, currentValue) => accumulator + currentValue.total_samples, 0);
document.getElementById("sumtestsid").innerHTML = sumtests;


            var totalMainlandCases = raw_data
                .filter((i) => i.area_type_gr === "Ηπειρωτική")
                .reduce((a, b) => a + b.total_confirmed_cases, 0);
            var totalIslandCases = raw_data
                .filter((i) => i.area_type_gr === "Νησιωτική")
                .reduce((a, b) => a + b.total_confirmed_cases, 0);
            chart.data = [{
                "area_type_gr": "Ηπειρωτική",
                "total_confirmed_cases": totalMainlandCases//THE SUM OF total_confirmed_cases in mainland
            }, {
                "area_type_gr": "Νησιωτική",
                "total_confirmed_cases": totalIslandCases////THE SUM OF total_confirmed_cases in island
            }];

            var list = raw_data
                .sort((a, b) => b.total_confirmed_cases - a.total_confirmed_cases)
                .slice(0, 5);

            var html = "";
            for (var i = 0; i < list.length; i++) {
                var row = list[i];
                html += "<tr>";
                html += `<td>${row.name_gr}</td>`;
                html += `<td>${row.total_confirmed_cases}</td>`;
                html += `<td>${row.total_samples}</td>`;
                html += "</tr>";
            }

            document.getElementById("t5Data").innerHTML = html;
        })();