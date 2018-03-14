var lineProcessorApp = function () {
    "use strict";

    var model = {
        targets: data.targets,
        templates: data.templates,
        line: null,
        lineProcessed: [],
        lineWordsOnly: [],
        words: 0,
        letters: 0,
        longestWordCount: 0,
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

    function setWordCount(line) {
        model.words = line.length;
    }

    function getWordCount(line) {
        // Returns the number of
        // words <num>. Takes in
        // the line <array>.
        if (typeof line === "object") {
            return line.length;
        }
    }

    function setLettersCount(count) {
        model.letters = count;
    }

    function getLettersCount(line) {
        // Returns the number of
        // letters <num>. Takes in
        // the line <str>.
        var count = 0;
        var re = /[a-zA-Z]/;
        var index = 0;
        var len = line.length;

        while (index < len) {
            if (line[index].search(re) === 0) {
                count += 1;
            }
            index += 1;
        }
        return count;
    }

    function getWords(procLine) {
        // Takes in the processed
        // line <array>. Removes
        // anything that is not a
        // letter. Returns the
        // line with words only <array>.
        var words = [];
        var index = 0;
        var strIndex = 0;
        var len = procLine.length;
        var re = /[a-zA-Z]/;
        var temp = "";

        while (index < len) {
            // the entire array
            while (strIndex < procLine[index].length) {
                if ( procLine[index][strIndex].search(re) === 0) {
                    temp += procLine[index][strIndex];
                }
                strIndex += 1;
            }
            words.push(temp);
            temp = "";
            strIndex = 0;
            index += 1;
        }
        return words;
    }

    function setLongest(l) {
        model.longestWordCount = l;
    }

    function getLongestWord(words) {
        // Returns the count of the
        // longest word in use <num>,
        // could be many. Takes in
        // an array of words from
        // the original line of words.
        var longest = 0;
        var counts = [];
        var index = 0;
        var len = words.length;

        while (index < len) {
            counts.push(words[index].length);
            index += 1;
        }

        counts.sort(function(a, b){ return a - b });
        longest = counts[counts.length - 1];

        return longest;
    }

    // view
    function render(m) {
        var template = m.templates[0];
        var dataEl = m.targets.results[0];
        var html = "";

        // data
        html = template.replace("%header%", "words:");
        html = html.replace("%data%", m.words.toString());
        html += template.replace("%header%", "letters:");
        html = html.replace("%data%", m.letters.toString());
        html += template.replace("%header%", "length of longest word:");
        html = html.replace("%data%", m.longestWordCount.toString());
        // html += template.replace("%header%", "total:");
        // html = html.replace("%data%", m.total);

        dataEl.innerHTML = html;
    }

    function init() {
        var longest = 0;
        setLine(model.targets.lineIn.value.trim());
        setLineProcessed(model.line);
        setWordCount(model.lineProcessed);
        setLettersCount(getLettersCount(model.line));
        longest = getLongestWord(getWords(model.lineProcessed));
        setLongest(longest);


        render(model);
        console.log(model);
    }

    model.targets.process.addEventListener("click", function () {
        init();
    }, false);

    init();
};
lineProcessorApp(data);