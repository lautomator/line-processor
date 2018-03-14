var lineProcessorApp = function () {
    "use strict";

    var model = {
        targets: data.targets,
        templates: data.templates,
        line: null,
        lineProcessed: [],
        words: 0,
        letters: 0,
        longestWord: null,
        mostVowels: {
            word: null,
            vowels: [],
            count: 0
        },
        numbers: 0
    };

    function setLine(uin) {
        // Sets the user input to
        // the model <str>. Takes
        // in the user input from
        // the text area <str>
        model.line = uin;
    }

    function setLineProcessed(uin) {
        // Sets the line split into
        // an array of substrings. Takes
        // in the user input stored in the
        // model <str>.
        if (uin !== null) {
            model.lineProcessed = uin.split(" ");
        }
    }

    function render(model) {
        // var template = model.templates[0];
        // var dataEl = model.targets.results[0];
        // var fieldsEl = model.targets.fields;
        // var html = "";

        // // fields
        // fieldsEl[0].value = model.sizeOfArray.toString();
        // fieldsEl[1].value = model.minRandom.toString();
        // fieldsEl[2].value = model.maxRandom.toString();

        // // data
        // html = template.replace("%header%", "collection size:");
        // html = html.replace("%data%", model.sizeOfArray);
        // html += template.replace("%header%", "low/high:");
        // html = html.replace("%data%", (model.minRandom.toString() + "/" + model.maxRandom.toString()));
        // html += template.replace("%header%", "collection:");
        // html = html.replace("%data%", model.collection.toString().replace(/,/g, " "));
        // html += template.replace("%header%", "total:");
        // html = html.replace("%data%", model.total);
        // dataEl.innerHTML = html;
    }

    function init() {
        if (model.line === null) {
            setLine(model.targets.lineIn.value.trim());
        }
        setLineProcessed(model.line);
        console.log(model.lineProcessed);


    }

    model.targets.process.addEventListener("click", function () {
        // Gets the text from the text area <str> when
        // the "process" button is pressed. Returns a trimmed
        //  line of text <str>.
        setLine(model.targets.lineIn.value.trim());
        init();
    }, false);

    init();
};
lineProcessorApp(data);